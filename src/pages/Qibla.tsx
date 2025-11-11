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

  console.log('Qibla component rendered', { permissionGranted, location, qiblaDirection, heading });

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
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pb-20 relative overflow-hidden">
      {/* Animated background gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <TopBar title="Qibla" showBack />

      <main className="max-w-lg mx-auto px-4 py-4 space-y-4 relative z-10">
        {/* Top Info Card - Map Style */}
        {location && (
          <Card className="relative overflow-hidden bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border-slate-700/50 shadow-2xl">
            <div className="relative h-36 overflow-hidden">
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
                  backgroundSize: '40px 40px'
                }} />
              </div>
              
              {/* Map visualization with glow effect */}
              <div className="absolute inset-0 flex items-center justify-between px-8">
                <div className="flex flex-col items-center gap-2 relative z-10">
                  <div className="relative">
                    <div className="absolute inset-0 bg-yellow-400/30 rounded-full blur-xl animate-pulse" />
                    <div className="relative w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center border-2 border-yellow-300/50 shadow-xl">
                      <svg className="w-6 h-6 text-slate-900" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L4 9v12h16V9l-8-7z"/>
                      </svg>
                    </div>
                  </div>
                  <div className="bg-slate-800/80 backdrop-blur-sm px-2 py-0.5 rounded-full border border-slate-600/50">
                    <span className="text-[10px] text-slate-300 font-medium">Mecca</span>
                  </div>
                </div>
                
                {/* Animated curved path */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                  <defs>
                    <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#eab308" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#10b981" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 100 72 Q 200 30, 300 72"
                    stroke="url(#pathGradient)"
                    strokeWidth="2.5"
                    strokeDasharray="8,6"
                    fill="none"
                    className="animate-pulse"
                  />
                </svg>
                
                <div className="flex flex-col items-center gap-2 relative z-10">
                  <div className="relative">
                    <div className="absolute inset-0 bg-emerald-400/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }} />
                    <div className="relative">
                      <MapPin className="w-12 h-12 text-emerald-400 fill-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                      <Navigation2 className="absolute top-0 right-0 w-4 h-4 text-white animate-pulse" />
                    </div>
                  </div>
                  <div className="bg-slate-800/80 backdrop-blur-sm px-2 py-0.5 rounded-full border border-slate-600/50">
                    <span className="text-[10px] text-slate-300 font-medium">You</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-px bg-slate-700/50">
              <div className="bg-slate-800/50 backdrop-blur-sm p-4 space-y-1">
                <p className="text-xs text-slate-400 font-medium">Distance</p>
                <p className="text-2xl font-bold text-white">
                  {distance ? `${distance.toFixed(1)}` : "---"}
                  <span className="text-sm font-normal text-slate-400 ml-1">KM</span>
                </p>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm p-4 space-y-1">
                <p className="text-xs text-slate-400 font-medium">Qibla Direction</p>
                <p className="text-2xl font-bold text-white">
                  {qiblaDirection !== null ? `${Math.round(qiblaDirection)}°` : "---"}
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Main Compass Card */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border-slate-700/50 shadow-2xl p-4 sm:p-8">
          {/* Background glow effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
          </div>
          
          <div className="flex flex-col items-center space-y-4 sm:space-y-6 relative z-10">
            {/* Premium Compass */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 mx-auto">
              {/* Outer glow animation */}
              <div 
                className="absolute inset-0 rounded-full animate-pulse"
                style={{
                  background: 'radial-gradient(circle, rgba(251, 191, 36, 0.15) 0%, transparent 70%)',
                  filter: 'blur(25px)',
                  animationDuration: '3s'
                }}
              />
              
              {/* Main compass ring - 3D effect */}
              <div 
                className="absolute inset-0 rounded-full shadow-2xl"
                style={{
                  background: 'linear-gradient(145deg, #f59e0b, #d97706)',
                  boxShadow: '0 10px 40px rgba(245, 158, 11, 0.4), inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.3)'
                }}
              />
              
              {/* Inner bezel */}
              <div 
                className="absolute inset-3 rounded-full"
                style={{
                  background: 'linear-gradient(145deg, #fef3c7, #fde68a)',
                  boxShadow: 'inset 0 6px 15px rgba(0,0,0,0.25), 0 2px 4px rgba(255,255,255,0.1)'
                }}
              >
                {/* Compass face */}
                <div 
                  className="absolute inset-5 rounded-full overflow-hidden"
                  style={{
                    background: 'radial-gradient(circle at 30% 30%, #fffbeb 0%, #fef3c7 40%, #fde68a 100%)',
                    boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.15)'
                  }}
                >
                  {/* Directional markers */}
                  {['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'].map((dir, idx) => {
                    const angle = idx * 45;
                    const isCardinal = idx % 2 === 0;
                    const distance = isCardinal ? 115 : 105;
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
                        <span className={`font-bold ${dir === 'N' ? 'text-red-700 text-lg' : isCardinal ? 'text-amber-800 text-base' : 'text-amber-700 text-sm'} drop-shadow-sm`}>
                          {dir}
                        </span>
                      </div>
                    );
                  })}
                  
                  {/* Degree tick marks - Premium style */}
                  {Array.from({ length: 72 }).map((_, i) => {
                    const angle = i * 5;
                    const isCardinal = i % 18 === 0;
                    const isIntercardinal = i % 9 === 0 && !isCardinal;
                    const isMajor = i % 3 === 0;
                    
                    const length = isCardinal ? 20 : isIntercardinal ? 15 : isMajor ? 10 : 6;
                    const width = isCardinal ? 2.5 : isIntercardinal ? 2 : 1.5;
                    const opacity = isCardinal ? 0.9 : isIntercardinal ? 0.7 : isMajor ? 0.5 : 0.3;
                    
                    return (
                      <div
                        key={i}
                        className="absolute top-1/2 left-1/2 origin-left"
                        style={{
                          transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(120px)`,
                          width: `${length}px`,
                          height: `${width}px`,
                          background: `linear-gradient(to right, rgba(120, 53, 15, ${opacity}), rgba(180, 83, 9, ${opacity * 0.7}))`,
                          borderRadius: '2px'
                        }}
                      />
                    );
                  })}
                  
                  {/* Rotating needle - Premium 3D effect */}
                  <div 
                    className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-out"
                    style={{ transform: `rotate(${relativeDirection}deg)` }}
                  >
                    {/* Needle shadow */}
                    <div className="absolute flex flex-col items-center" style={{ filter: 'blur(3px)', opacity: 0.3 }}>
                      <div className="w-3 h-24 bg-black rounded-t-full" style={{ transform: 'translate(2px, 2px)' }} />
                      <div className="w-3 h-24 bg-black rounded-b-full" />
                    </div>
                    
                    {/* North pointer (Red) */}
                    <div className="absolute flex flex-col items-center">
                      <div 
                        className="w-4 h-24 rounded-t-full relative"
                        style={{
                          background: 'linear-gradient(to bottom, #ef4444, #dc2626)',
                          boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.3), 0 2px 8px rgba(239,68,68,0.5)'
                        }}
                      >
                        <div className="absolute inset-0 rounded-t-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                      </div>
                      
                      {/* South pointer (Gray) */}
                      <div 
                        className="w-4 h-24 rounded-b-full relative"
                        style={{
                          background: 'linear-gradient(to top, #9ca3af, #d1d5db)',
                          boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.5), inset 0 -2px 4px rgba(0,0,0,0.2), 0 2px 8px rgba(156,163,175,0.3)'
                        }}
                      >
                        <div className="absolute inset-0 rounded-b-full bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                      </div>
                      
                      {/* Center pivot - 3D metallic */}
                      <div 
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full"
                        style={{
                          background: 'radial-gradient(circle at 30% 30%, #f3f4f6, #9ca3af)',
                          boxShadow: '0 3px 8px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.8), inset 0 -1px 2px rgba(0,0,0,0.3)',
                          border: '2px solid #6b7280'
                        }}
                      >
                        <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/50 to-transparent" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Kaaba Icon - Floating above compass */}
                  <div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 transition-all duration-500 ease-out"
                    style={{ 
                      transform: `translateX(-50%) rotate(${relativeDirection}deg) translateY(-130px)`,
                      filter: isAligned ? 'drop-shadow(0 0 12px rgba(16,185,129,0.8))' : 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
                    }}
                  >
                    <div 
                      className={`relative p-3 rounded-xl transition-all duration-300 ${
                        isAligned 
                          ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 scale-110' 
                          : 'bg-gradient-to-br from-slate-700 to-slate-800'
                      }`}
                      style={{
                        boxShadow: isAligned 
                          ? '0 8px 20px rgba(16,185,129,0.4), inset 0 1px 2px rgba(255,255,255,0.3)' 
                          : '0 4px 12px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.1)'
                      }}
                    >
                      <svg className={`w-7 h-7 ${isAligned ? 'text-white' : 'text-amber-400'}`} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.18l6 3.75v7.5l-6 3.75-6-3.75v-7.5l6-3.75z"/>
                        <rect x="8" y="10" width="8" height="8" rx="1"/>
                      </svg>
                      {isAligned && (
                        <div className="absolute inset-0 rounded-xl bg-emerald-400/30 animate-ping" />
                      )}
                    </div>
                  </div>
                  
                  {/* Light reflection overlay */}
                  <div 
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)'
                    }}
                  />
                </div>
              </div>
              
              {/* Glass shine effect */}
              <div 
                className="absolute top-0 left-0 right-1/2 bottom-1/2 rounded-full pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 70%)',
                  borderRadius: '50% 0 100% 0'
                }}
              />
            </div>

            {/* Status Bar with Animation */}
            <div 
              className={`w-full transition-all duration-500 rounded-2xl p-4 ${
                isAligned 
                  ? 'bg-gradient-to-r from-emerald-500/20 via-emerald-400/20 to-emerald-500/20 border-2 border-emerald-500/50' 
                  : 'bg-gradient-to-r from-slate-700/50 to-slate-800/50 border-2 border-slate-600/50'
              }`}
              style={{
                boxShadow: isAligned 
                  ? '0 0 30px rgba(16,185,129,0.3), inset 0 1px 2px rgba(255,255,255,0.1)' 
                  : '0 4px 12px rgba(0,0,0,0.2), inset 0 1px 2px rgba(255,255,255,0.05)'
              }}
            >
              <div className="flex items-center gap-3">
                <div className="relative flex-shrink-0">
                  <div className={`w-3 h-3 rounded-full ${isAligned ? 'bg-emerald-400' : 'bg-amber-400'} shadow-lg`} />
                  {isAligned && (
                    <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping" />
                  )}
                </div>
                <p className={`text-sm font-semibold flex-1 text-center ${isAligned ? 'text-emerald-100' : 'text-slate-200'}`}>
                  {getInstructionText()}
                </p>
              </div>
            </div>

            {/* Permission Button */}
            {!permissionGranted ? (
              <Button 
                onClick={getLocation} 
                size="lg"
                className="w-full gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 shadow-lg shadow-emerald-500/30 text-base font-semibold"
              >
                <MapPin className="h-5 w-5" />
                Enable Location Access
              </Button>
            ) : (
              <Button 
                onClick={() => setShowCalibration(true)}
                variant="outline"
                size="lg"
                className="w-full gap-2 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
              >
                <Settings className="h-5 w-5" />
                Calibrate Compass
              </Button>
            )}
          </div>
        </Card>

        {/* Tips Card - Modern Design */}
        <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border-slate-700/50 p-5 shadow-xl">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="text-xl">💡</span>
            </div>
            <div className="flex-1 space-y-3">
              <h4 className="font-bold text-white text-sm">Calibration Tips</h4>
              <ul className="text-xs text-slate-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 flex-shrink-0">▸</span>
                  <span>Keep your phone flat and parallel to the ground</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 flex-shrink-0">▸</span>
                  <span>Move phone in a figure-8 pattern to calibrate</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 flex-shrink-0">▸</span>
                  <span>Stay away from magnetic or metal objects</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 flex-shrink-0">▸</span>
                  <span>Best results in open areas away from buildings</span>
                </li>
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
