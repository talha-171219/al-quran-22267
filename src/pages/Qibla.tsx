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
  const lastVibrateTime = useRef<number>(0);
  const wasAligned = useRef<boolean>(false);

  const calculateQibla = (lat: number, lon: number) => {
    // Kaaba coordinates
    const kaabaLat = 21.4225;
    const kaabaLon = 39.8262;

    const phiK = kaabaLat * Math.PI / 180;
    const lambdaK = kaabaLon * Math.PI / 180;
    const phi = lat * Math.PI / 180;
    const lambda = lon * Math.PI / 180;

    const qibla = Math.atan2(
      Math.sin(lambdaK - lambda),
      Math.cos(phi) * Math.tan(phiK) - Math.sin(phi) * Math.cos(lambdaK - lambda)
    );

    // Calculate distance using Haversine formula
    const R = 6371; // Earth's radius in km
    const dLat = (kaabaLat - lat) * Math.PI / 180;
    const dLon = (kaabaLon - lon) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(phi) * Math.cos(phiK) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const dist = R * c;

    setDistance(dist);
    return (qibla * 180 / Math.PI + 360) % 360;
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      toast.error("আপনার ব্রাউজার লোকেশন সাপোর্ট করে না");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lon: longitude });
        const direction = calculateQibla(latitude, longitude);
        setQiblaDirection(direction);
        setPermissionGranted(true);
        toast.success("কিবলা নির্দেশনা খুঁজে পাওয়া গেছে");
      },
      () => {
        toast.error("লোকেশন অনুমতি প্রয়োজন");
      }
    );
  };

  useEffect(() => {
    if ('DeviceOrientationEvent' in window) {
      const handleOrientation = (event: DeviceOrientationEvent) => {
        if (event.alpha !== null) {
          setHeading(360 - event.alpha);
        }
      };
      window.addEventListener('deviceorientation', handleOrientation);
      return () => window.removeEventListener('deviceorientation', handleOrientation);
    }
  }, []);

  const relativeDirection = qiblaDirection !== null ? (qiblaDirection - heading + 360) % 360 : 0;
  const isAligned = Math.abs(relativeDirection) < 5 || Math.abs(relativeDirection) > 355;
  const rotationNeeded = relativeDirection > 180 ? -(360 - relativeDirection) : relativeDirection;

  // Haptic vibration feedback when aligned
  useEffect(() => {
    if (!permissionGranted || qiblaDirection === null) return;

    const now = Date.now();
    
    // Vibrate when becoming aligned (and not already aligned)
    if (isAligned && !wasAligned.current && now - lastVibrateTime.current > 1000) {
      if ('vibrate' in navigator) {
        // Triple pulse pattern for success
        navigator.vibrate([100, 50, 100, 50, 100]);
        lastVibrateTime.current = now;
        toast.success("মক্কার দিকে সারিবদ্ধ! 🕋", {
          duration: 2000
        });
      }
    }
    
    wasAligned.current = isAligned;
  }, [isAligned, permissionGranted, qiblaDirection]);

  const getInstructionText = () => {
    if (!permissionGranted) {
      return "অনুগ্রহ করে লোকেশন অনুমতি দিন";
    }
    
    if (Math.abs(heading) < 10 && Math.abs(rotationNeeded) > 10) {
      return "ফোনটি সমতল রাখুন";
    }
    
    if (isAligned) {
      return "আপনি এখন মক্কার দিকে মুখ করছেন";
    }
    
    const degrees = Math.abs(Math.round(rotationNeeded));
    const direction = rotationNeeded > 0 ? "ডানে" : "বামে";
    return `ফোনটি ${degrees}° ${direction} ঘুরান`;
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="Qibla" showBack />

      <main className="max-w-lg mx-auto px-4 py-4 space-y-4">
        {/* Top Info Card - Map Style */}
        {location && (
          <Card className="overflow-hidden border-border shadow-lg">
            <div className="relative h-32 bg-gradient-to-br from-primary/10 to-primary/5">
              {/* Map visualization */}
              <div className="absolute inset-0 flex items-center justify-between px-8">
                <div className="flex flex-col items-center gap-2">
                  <div className="relative">
                    <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-5 h-5 text-slate-900" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L4 9v12h16V9l-8-7z"/>
                      </svg>
                    </div>
                  </div>
                  <span className="text-[10px] text-muted-foreground font-medium">Mecca</span>
                </div>
                
                {/* Curved path */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <path
                    d="M 80 64 Q 200 30, 320 64"
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                    strokeDasharray="6,4"
                    fill="none"
                    opacity="0.5"
                  />
                </svg>
                
                <div className="flex flex-col items-center gap-2">
                  <div className="relative">
                    <MapPin className="w-10 h-10 text-primary fill-primary/20" />
                  </div>
                  <span className="text-[10px] text-muted-foreground font-medium">You</span>
                </div>
              </div>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-medium">Distance from Mecca</p>
                <p className="text-xl font-bold text-foreground">
                  {distance ? `${distance.toFixed(1)} KM` : "---"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-medium">Qibla Direction</p>
                <p className="text-xl font-bold text-foreground">
                  {qiblaDirection !== null ? `${Math.round(qiblaDirection)}°` : "---"}
                </p>
              </div>
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
                  
                  {/* Rotating compass needle */}
                  <div 
                    className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-out"
                    style={{ transform: `rotate(${relativeDirection}deg)`, zIndex: 10 }}
                  >
                    {/* Needle */}
                    <div className="absolute flex flex-col items-center">
                      {/* North pointer (Red) */}
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
                  
                  {/* Kaaba Icon - Fixed positioning */}
                  <div 
                    className="absolute top-1/2 left-1/2 transition-all duration-500 ease-out pointer-events-none"
                    style={{ 
                      transform: `translate(-50%, -50%) rotate(${relativeDirection}deg) translateY(-110px)`,
                      zIndex: 20
                    }}
                  >
                    <div 
                      className={`p-2.5 rounded-lg transition-all duration-300 ${
                        isAligned 
                          ? 'bg-primary scale-110 shadow-lg' 
                          : 'bg-muted border-2 border-border'
                      }`}
                    >
                      <svg 
                        className={`w-6 h-6 ${isAligned ? 'text-white' : 'text-primary'}`} 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.18l6 3.75v7.5l-6 3.75-6-3.75v-7.5l6-3.75z"/>
                        <rect x="8" y="10" width="8" height="8" rx="1"/>
                      </svg>
                      {isAligned && (
                        <div className="absolute inset-0 rounded-lg bg-primary animate-ping opacity-75" />
                      )}
                    </div>
                  </div>
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
