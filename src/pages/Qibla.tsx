import { useState, useEffect, useRef } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/card";
import { MapPin, Navigation2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CalibrationWizard } from "@/components/qibla/CalibrationWizard";

const Qibla = () => {
  const [qiblaDirection, setQiblaDirection] = useState<number | null>(null);
  const [heading, setHeading] = useState<number>(0);
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [showCalibration, setShowCalibration] = useState(false);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [compassCalibrated, setCompassCalibrated] = useState(false);
  const lastVibrateTime = useRef<number>(0);
  const wasAligned = useRef<boolean>(false);

  const calculateQibla = async (lat: number, lon: number) => {
    try {
      // Use Aladhan API for accurate Qibla calculation
      const response = await fetch(
        `https://api.aladhan.com/v1/qibla/${lat}/${lon}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch Qibla direction');
      }

      const data = await response.json();
      const qiblaDirection = data.data.direction;

      // Calculate distance using Haversine formula
      const kaabaLat = 21.4225;
      const kaabaLon = 39.8262;
      const R = 6371; // Earth's radius in km
      const phi = lat * Math.PI / 180;
      const phiK = kaabaLat * Math.PI / 180;
      const dLat = (kaabaLat - lat) * Math.PI / 180;
      const dLon = (kaabaLon - lon) * Math.PI / 180;
      const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(phi) * Math.cos(phiK) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const dist = R * c;

      setDistance(dist);
      return qiblaDirection;
    } catch (error) {
      console.error('Error calculating Qibla:', error);
      toast.error("কিবলা দিক নির্ণয়ে সমস্যা হয়েছে");
      return null;
    }
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      toast.error("আপনার ব্রাউজার লোকেশন সাপোর্ট করে না");
      return;
    }

    toast.loading("লোকেশন খুঁজছি...", { id: "location" });

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude, accuracy: posAccuracy } = position.coords;
        setLocation({ lat: latitude, lon: longitude });
        setAccuracy(posAccuracy);
        const direction = await calculateQibla(latitude, longitude);
        if (direction !== null) {
          setQiblaDirection(direction);
          setPermissionGranted(true);
          toast.success("কিবলা নির্দেশনা খুঁজে পাওয়া গেছে", { id: "location" });
        }
      },
      (error) => {
        console.error("Location error:", error);
        toast.error("লোকেশন অনুমতি প্রয়োজন", { id: "location" });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  useEffect(() => {
    let compassHandler: ((event: DeviceOrientationEvent) => void) | null = null;

    const requestPermissionAndSetup = async () => {
      // For iOS 13+ devices, need to request permission
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        try {
          const permission = await (DeviceOrientationEvent as any).requestPermission();
          if (permission === 'granted') {
            setCompassCalibrated(true);
          }
        } catch (error) {
          console.error('Device orientation permission denied:', error);
        }
      } else {
        setCompassCalibrated(true);
      }

      // Set up orientation listener
      if ('DeviceOrientationEvent' in window) {
        compassHandler = (event: DeviceOrientationEvent) => {
          if (event.alpha !== null) {
            // Normalize heading to 0-360 range
            let newHeading = event.alpha;
            
            // For Android devices, use webkitCompassHeading if available
            if ((event as any).webkitCompassHeading) {
              newHeading = (event as any).webkitCompassHeading;
            } else {
              // iOS returns alpha relative to device, adjust for magnetic north
              newHeading = 360 - event.alpha;
            }
            
            setHeading(newHeading);
          }
        };
        
        window.addEventListener('deviceorientation', compassHandler, true);
      }
    };

    requestPermissionAndSetup();

    return () => {
      if (compassHandler) {
        window.removeEventListener('deviceorientation', compassHandler, true);
      }
    };
  }, []);

  const relativeDirection = qiblaDirection !== null ? (qiblaDirection - heading + 360) % 360 : 0;
  const isAligned = Math.abs(relativeDirection) < 3 || Math.abs(relativeDirection) > 357;
  const rotationNeeded = relativeDirection > 180 ? -(360 - relativeDirection) : relativeDirection;
  
  // Get compass accuracy level
  const getAccuracyLevel = () => {
    if (!accuracy) return "unknown";
    if (accuracy < 10) return "excellent";
    if (accuracy < 30) return "good";
    if (accuracy < 50) return "fair";
    return "poor";
  };

  const getAccuracyColor = () => {
    const level = getAccuracyLevel();
    switch (level) {
      case "excellent": return "text-green-600";
      case "good": return "text-emerald-600";
      case "fair": return "text-amber-600";
      case "poor": return "text-red-600";
      default: return "text-muted-foreground";
    }
  };

  // Haptic vibration feedback when aligned
  useEffect(() => {
    if (!permissionGranted || qiblaDirection === null) return;

    const now = Date.now();
    
    // Vibrate when becoming aligned (and not already aligned)
    if (isAligned && !wasAligned.current && now - lastVibrateTime.current > 2000) {
      if ('vibrate' in navigator) {
        // Strong triple pulse pattern for perfect alignment
        navigator.vibrate([200, 100, 200, 100, 200]);
        lastVibrateTime.current = now;
        toast.success("✓ কিবলা দিক সঠিক!", {
          description: "মক্কার দিকে মুখ করছেন",
          duration: 2000
        });
      }
    }
    
    // Gentle vibration when getting close (within 10 degrees)
    if (!isAligned && Math.abs(rotationNeeded) < 10 && Math.abs(rotationNeeded) > 3 && now - lastVibrateTime.current > 3000) {
      if ('vibrate' in navigator) {
        navigator.vibrate(50);
        lastVibrateTime.current = now;
      }
    }
    
    wasAligned.current = isAligned;
  }, [isAligned, permissionGranted, qiblaDirection, rotationNeeded]);

  const getInstructionText = () => {
    if (!permissionGranted) {
      return "অনুগ্রহ করে লোকেশন অনুমতি দিন";
    }
    
    if (!compassCalibrated) {
      return "দয়া করে কম্পাস ক্যালিব্রেট করুন";
    }
    
    if (isAligned) {
      return "✓ সঠিক দিকে - মক্কার দিকে মুখ করছেন";
    }
    
    const degrees = Math.abs(Math.round(rotationNeeded));
    const direction = rotationNeeded > 0 ? "ডানে" : "বামে";
    return `${degrees}° ${direction} ঘুরান`;
  };

  const getCardinalDirection = (deg: number) => {
    const dirs = ['উত্তর', 'উত্তর-পূর্ব', 'পূর্ব', 'দক্ষিণ-পূর্ব', 'দক্ষিণ', 'দক্ষিণ-পশ্চিম', 'পশ্চিম', 'উত্তর-পশ্চিম'];
    const index = Math.round(deg / 45) % 8;
    return dirs[index];
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="Qibla" showBack />

      <main className="max-w-lg mx-auto px-4 py-4 space-y-4">
        {/* Top Info Card - Real-time Metrics */}
        {location && qiblaDirection !== null && (
          <Card className="overflow-hidden border-border shadow-lg">
            {/* Live Compass Info Bar */}
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 p-3 border-b border-border">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Device</p>
                  <p className="text-lg font-bold text-foreground">{Math.round(heading)}°</p>
                  <p className="text-[9px] text-muted-foreground">{getCardinalDirection(heading)}</p>
                </div>
                <div className="border-x border-border">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Qibla</p>
                  <p className="text-lg font-bold text-primary">{Math.round(qiblaDirection)}°</p>
                  <p className="text-[9px] text-muted-foreground">{getCardinalDirection(qiblaDirection)}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Offset</p>
                  <p className={`text-lg font-bold ${isAligned ? 'text-green-600' : 'text-amber-600'}`}>
                    {Math.abs(Math.round(rotationNeeded))}°
                  </p>
                  <p className="text-[9px] text-muted-foreground">
                    {isAligned ? "Aligned" : rotationNeeded > 0 ? "Turn Right" : "Turn Left"}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Location & Distance Info */}
            <div className="grid grid-cols-2 gap-px bg-border">
              <div className="bg-card p-3 space-y-1">
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">Distance</p>
                <p className="text-xl font-bold text-foreground">
                  {distance ? distance.toFixed(1) : "---"}
                  <span className="text-xs font-normal text-muted-foreground ml-1">KM</span>
                </p>
                <p className="text-[9px] text-muted-foreground">to Mecca</p>
              </div>
              <div className="bg-card p-3 space-y-1">
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">Accuracy</p>
                <p className={`text-xl font-bold ${getAccuracyColor()}`}>
                  {accuracy ? `±${accuracy.toFixed(0)}m` : "---"}
                </p>
                <p className="text-[9px] text-muted-foreground capitalize">{getAccuracyLevel()}</p>
              </div>
            </div>

            {/* Coordinates */}
            <div className="bg-muted/30 p-2 text-center">
              <p className="text-[9px] text-muted-foreground">
                📍 {location.lat.toFixed(6)}°, {location.lon.toFixed(6)}°
              </p>
            </div>
          </Card>
        )}

        {/* Main Compass Card */}
        <Card className="relative overflow-hidden p-6 sm:p-8 border-border shadow-lg">
          <div className="flex flex-col items-center space-y-4 sm:space-y-6">
            {/* Compass Container */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 mx-auto">
              {/* Compass outer ring - Emerald theme */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(145deg, hsl(var(--primary)), hsl(var(--primary-light)))',
                  boxShadow: '0 8px 32px hsla(var(--primary) / 0.3), inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.2)'
                }}
              />
              
              {/* Inner bezel */}
              <div 
                className="absolute inset-2 rounded-full"
                style={{
                  background: 'linear-gradient(145deg, #f0fdf4, #dcfce7)',
                  boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.15)'
                }}
              >
                {/* Compass face */}
                <div 
                  className="absolute inset-4 rounded-full overflow-visible bg-gradient-to-br from-white via-emerald-50/50 to-emerald-100/30"
                  style={{
                    boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.1)'
                  }}
                >
                  {/* Cardinal directions */}
                  {['N', 'E', 'S', 'W'].map((dir, idx) => {
                    const angle = idx * 90;
                    const distance = 95;
                    const x = Math.cos((angle - 90) * Math.PI / 180) * distance;
                    const y = Math.sin((angle - 90) * Math.PI / 180) * distance;
                    
                    return (
                      <div
                        key={dir}
                        className="absolute top-1/2 left-1/2"
                        style={{
                          transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                        }}
                      >
                        <span className={`font-bold text-base ${dir === 'N' ? 'text-red-600' : 'text-emerald-800'}`}>
                          {dir}
                        </span>
                      </div>
                    );
                  })}
                  
                  {/* Degree marks */}
                  {Array.from({ length: 36 }).map((_, i) => {
                    const angle = i * 10;
                    const isMajor = i % 3 === 0;
                    const length = isMajor ? 14 : 8;
                    const width = isMajor ? 2 : 1;
                    
                    return (
                      <div
                        key={i}
                        className="absolute top-1/2 left-1/2 origin-left"
                        style={{
                          transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(105px)`,
                          width: `${length}px`,
                          height: `${width}px`,
                          background: `hsl(var(--primary))`,
                          opacity: isMajor ? 0.6 : 0.3,
                          borderRadius: '2px'
                        }}
                      />
                    );
                  })}
                  
                  {/* Rotating compass needle - rotates with device */}
                  <div 
                    className="absolute inset-0 flex items-center justify-center transition-transform duration-200 ease-out"
                    style={{ transform: `rotate(${-heading}deg)`, zIndex: 10 }}
                  >
                    {/* Needle */}
                    <div className="absolute flex flex-col items-center">
                      {/* North pointer (Red) - Always points to magnetic north */}
                      <div 
                        className="w-3 h-20 rounded-t-full"
                        style={{
                          background: 'linear-gradient(to bottom, #ef4444, #dc2626)',
                          boxShadow: '0 2px 8px rgba(239,68,68,0.4), inset 0 1px 2px rgba(255,255,255,0.5)'
                        }}
                      />
                      
                      {/* South pointer (Gray) */}
                      <div 
                        className="w-3 h-20 rounded-b-full"
                        style={{
                          background: 'linear-gradient(to top, #9ca3af, #d1d5db)',
                          boxShadow: '0 2px 8px rgba(156,163,175,0.3), inset 0 1px 2px rgba(255,255,255,0.5)'
                        }}
                      />
                      
                      {/* Center dot */}
                      <div 
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 shadow-lg"
                        style={{ border: '2px solid #6b7280' }}
                      />
                    </div>
                  </div>
                  
                  {/* Qibla Direction Indicator - Always points to Qibla */}
                  {qiblaDirection !== null && (
                    <div 
                      className="absolute inset-0 flex items-center justify-center transition-transform duration-200 ease-out"
                      style={{ transform: `rotate(${qiblaDirection - heading}deg)`, zIndex: 15 }}
                    >
                      <div className="absolute flex flex-col items-center">
                        {/* Qibla direction pointer */}
                        <div 
                          className={`w-2 h-24 rounded-t-full transition-all duration-300 ${
                            isAligned ? 'opacity-100 scale-110' : 'opacity-70'
                          }`}
                          style={{
                            background: isAligned 
                              ? 'linear-gradient(to bottom, hsl(var(--primary)), hsl(var(--primary-light)))' 
                              : 'linear-gradient(to bottom, hsl(var(--primary) / 0.7), transparent)',
                            boxShadow: isAligned ? '0 0 20px hsla(var(--primary) / 0.8)' : 'none'
                          }}
                        />
                        
                        {/* Kaaba Icon at Qibla direction */}
                        <div 
                          className="absolute -top-2 left-1/2 -translate-x-1/2"
                        >
                          <div 
                            className={`p-2 rounded-lg transition-all duration-300 ${
                              isAligned 
                                ? 'bg-primary scale-125 shadow-xl shadow-primary/50' 
                                : 'bg-primary/80 shadow-lg'
                            }`}
                          >
                            <svg 
                              className="w-5 h-5 text-white" 
                              fill="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.18l6 3.75v7.5l-6 3.75-6-3.75v-7.5l6-3.75z"/>
                              <rect x="8" y="10" width="8" height="8" rx="1"/>
                            </svg>
                            {isAligned && (
                              <>
                                <div className="absolute inset-0 rounded-lg bg-primary animate-ping opacity-75" />
                                <div className="absolute -inset-1 rounded-lg bg-primary/30 blur-md animate-pulse" />
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Current heading indicator - shows device direction */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-card/95 backdrop-blur-sm px-3 py-1.5 rounded-full border-2 border-border shadow-lg" style={{ zIndex: 25 }}>
                    <p className="text-xs font-bold text-foreground">
                      {Math.round(heading)}° {getCardinalDirection(heading)}
                    </p>
                  </div>
                  
                  {/* Qibla direction display - shows where Qibla is */}
                  {qiblaDirection !== null && (
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-primary/95 backdrop-blur-sm px-3 py-1.5 rounded-full border-2 border-primary-light shadow-lg" style={{ zIndex: 25 }}>
                      <p className="text-xs font-bold text-white flex items-center gap-1">
                        🕋 {Math.round(qiblaDirection)}°
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Status Bar */}
            <div 
              className={`w-full rounded-xl p-4 transition-all duration-500 ${
                isAligned 
                  ? 'bg-primary/10 border-2 border-primary' 
                  : 'bg-muted border-2 border-border'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full ${isAligned ? 'bg-primary' : 'bg-amber-500'} flex-shrink-0`}>
                  {isAligned && <div className="w-2.5 h-2.5 rounded-full bg-primary animate-ping" />}
                </div>
                <p className={`text-sm font-semibold flex-1 text-center ${isAligned ? 'text-primary' : 'text-foreground'}`}>
                  {getInstructionText()}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            {!permissionGranted ? (
              <Button 
                onClick={getLocation} 
                size="lg"
                className="w-full gap-2"
              >
                <MapPin className="h-5 w-5" />
                লোকেশন অনুমতি দিন
              </Button>
            ) : (
              <Button 
                onClick={() => setShowCalibration(true)}
                variant="outline"
                size="lg"
                className="w-full gap-2"
              >
                <Settings className="h-5 w-5" />
                ক্যালিব্রেট করুন
              </Button>
            )}
          </div>
        </Card>

        {/* Tips Card */}
        <Card className="p-4 bg-muted/50 border-dashed border-border">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-xl">💡</span>
            </div>
            <div className="flex-1 space-y-2">
              <h4 className="font-semibold text-sm text-foreground">ক্যালিব্রেশন টিপস</h4>
              <ul className="text-xs text-muted-foreground space-y-1.5">
                <li>• ফোন সমতল রাখুন মাটির সমান্তরালে</li>
                <li>• ৮ আকৃতিতে ফোন ঘুরিয়ে ক্যালিব্রেট করুন</li>
                <li>• ধাতব বস্তু থেকে দূরে থাকুন</li>
                <li>• খোলা জায়গায় ব্যবহার করুন</li>
              </ul>
            </div>
          </div>
        </Card>
      </main>

      {/* Calibration Wizard Modal */}
      {showCalibration && (
        <CalibrationWizard onClose={() => setShowCalibration(false)} />
      )}

      <BottomNav />
    </div>
  );
};

export default Qibla;
