import { useState, useEffect } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/card";
import { MapPin, Compass as CompassIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Qibla = () => {
  const [qiblaDirection, setQiblaDirection] = useState<number | null>(null);
  const [heading, setHeading] = useState<number>(0);
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20 pb-20">
      <TopBar title="Qibla" showBack />

      <main className="max-w-lg mx-auto px-4 py-4 space-y-4">
        {/* Map Card */}
        {location && (
          <Card className="relative overflow-hidden bg-slate-900 border-slate-800">
            <div className="relative h-32 bg-gradient-to-br from-slate-800 to-slate-900">
              {/* Simple map visualization */}
              <div className="absolute inset-0 flex items-center justify-between px-6">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center border-2 border-yellow-500">
                    <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L4 9v12h16V9l-8-7z"/>
                    </svg>
                  </div>
                  <span className="text-[10px] text-slate-400">Saudi Arabia</span>
                </div>
                
                {/* Curved path */}
                <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
                  <path
                    d="M 80 64 Q 200 20, 320 64"
                    stroke="#22c55e"
                    strokeWidth="2"
                    strokeDasharray="6,4"
                    fill="none"
                    opacity="0.8"
                  />
                </svg>
                
                <div className="flex flex-col items-center gap-1 relative" style={{ zIndex: 2 }}>
                  <div className="relative">
                    <MapPin className="w-8 h-8 text-green-500 fill-green-500" />
                    <div className="absolute -top-1 -right-1">
                      <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L15 8.5L22 9.3L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.3L9 8.5L12 2Z"/>
                      </svg>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {location.lat > 0 ? "N" : "S"} {Math.abs(location.lat).toFixed(1)}°
                  </span>
                </div>
              </div>
            </div>
            
            {/* Distance and angle info */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-slate-900/50">
              <div className="space-y-1">
                <p className="text-xs text-slate-400">Distance from Mecca</p>
                <p className="text-lg font-bold text-white">
                  {distance ? `${distance.toFixed(1)}KM` : "---"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-slate-400">Device's Angle to Qibla</p>
                <p className="text-lg font-bold text-white">
                  {qiblaDirection !== null ? `${Math.round(qiblaDirection)}°` : "---"}
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Compass Card */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background p-8">
          <div className="flex flex-col items-center space-y-6">
            {/* Main Compass */}
            <div className="relative w-72 h-72">
              {/* Outer glow */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(251, 191, 36, 0.1) 0%, transparent 70%)',
                  filter: 'blur(20px)'
                }}
              />
              
              {/* Compass outer ring - golden gradient */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
                  boxShadow: '0 8px 32px rgba(251, 191, 36, 0.3), inset 0 1px 0 rgba(255,255,255,0.4)'
                }}
              />
              
              {/* Inner shadow ring */}
              <div 
                className="absolute inset-2 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 50%, #fde68a 100%)',
                  boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.2)'
                }}
              >
                {/* Compass face */}
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-amber-50 via-amber-100 to-amber-200 shadow-inner">
                  {/* Cardinal directions */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2">
                    <span className="text-sm font-bold text-amber-900">N</span>
                  </div>
                  <div className="absolute top-1/2 right-3 -translate-y-1/2">
                    <span className="text-sm font-bold text-amber-700">E</span>
                  </div>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
                    <span className="text-sm font-bold text-amber-700">S</span>
                  </div>
                  <div className="absolute top-1/2 left-3 -translate-y-1/2">
                    <span className="text-sm font-bold text-amber-700">W</span>
                  </div>
                  
                  {/* Intercardinal directions */}
                  <div className="absolute top-8 right-8">
                    <span className="text-xs font-semibold text-amber-600">NE</span>
                  </div>
                  <div className="absolute bottom-8 right-8">
                    <span className="text-xs font-semibold text-amber-600">SE</span>
                  </div>
                  <div className="absolute bottom-8 left-8">
                    <span className="text-xs font-semibold text-amber-600">SW</span>
                  </div>
                  <div className="absolute top-8 left-8">
                    <span className="text-xs font-semibold text-amber-600">NW</span>
                  </div>
                  
                  {/* Tick marks */}
                  {Array.from({ length: 72 }).map((_, i) => {
                    const angle = (i * 5) - 90;
                    const isCardinal = i % 18 === 0;
                    const isIntercardinal = i % 9 === 0 && !isCardinal;
                    const length = isCardinal ? 16 : isIntercardinal ? 12 : 6;
                    const width = isCardinal ? 2 : 1;
                    const opacity = isCardinal ? 0.8 : isIntercardinal ? 0.6 : 0.3;
                    
                    return (
                      <div
                        key={i}
                        className="absolute top-1/2 left-1/2 origin-left"
                        style={{
                          transform: `rotate(${angle}deg) translateX(110px)`,
                          width: `${length}px`,
                          height: `${width}px`,
                          backgroundColor: `rgba(120, 53, 15, ${opacity})`
                        }}
                      />
                    );
                  })}
                  
                  {/* Compass needle - rotates based on Qibla direction */}
                  <div 
                    className="absolute inset-0 flex items-center justify-center transition-transform duration-300"
                    style={{ transform: `rotate(${relativeDirection}deg)` }}
                  >
                    {/* Needle shadow */}
                    <div className="absolute w-2 h-32 bg-black/20 rounded-full blur-sm" style={{ transform: 'translateX(2px) translateY(2px)' }} />
                    
                    {/* Needle */}
                    <div className="relative flex flex-col items-center">
                      <div className="w-3 h-20 bg-gradient-to-b from-red-600 to-red-700 rounded-t-full shadow-lg" />
                      <div className="w-3 h-20 bg-gradient-to-t from-gray-300 to-gray-400 rounded-b-full shadow-lg" />
                      
                      {/* Center circle */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-br from-gray-200 to-gray-400 rounded-full shadow-lg border-2 border-gray-500" />
                    </div>
                  </div>
                  
                  {/* Kaaba icon at top (pointing to Qibla) */}
                  <div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 transition-transform duration-300"
                    style={{ transform: `translateX(-50%) translateY(-4px) rotate(${relativeDirection}deg) translateY(-100px)` }}
                  >
                    <div className="bg-slate-800 p-2 rounded-lg shadow-xl border-2 border-slate-600">
                      <svg className="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.18l6 3.75v7.5l-6 3.75-6-3.75v-7.5l6-3.75z"/>
                        <rect x="8" y="10" width="8" height="8" rx="1"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Status indicator dot */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                    <div className={`w-3 h-3 rounded-full ${isAligned ? 'bg-green-500' : 'bg-orange-500'} shadow-lg`}>
                      {isAligned && (
                        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Light reflection */}
              <div 
                className="absolute top-0 left-0 right-0 h-24 rounded-t-full"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 100%)',
                  pointerEvents: 'none'
                }}
              />
            </div>

            {/* Instruction Text */}
            <div className="flex items-center gap-3 bg-muted/50 rounded-full px-6 py-3 min-h-[56px]">
              <div className={`w-2 h-2 rounded-full ${isAligned ? 'bg-green-500' : 'bg-orange-500'} flex-shrink-0`} />
              <p className="text-sm font-medium text-foreground text-center">
                {getInstructionText()}
              </p>
            </div>

            {/* Permission Button */}
            {!permissionGranted && (
              <Button 
                onClick={getLocation} 
                size="lg"
                className="w-full gap-2"
              >
                <MapPin className="h-5 w-5" />
                লোকেশন অনুমতি দিন
              </Button>
            )}
          </div>
          
          {/* Small compass indicator - bottom right */}
          <div className="absolute bottom-4 right-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center shadow-lg">
                <div 
                  className="transition-transform duration-300"
                  style={{ transform: `rotate(${-heading}deg)` }}
                >
                  <CompassIcon className="w-6 h-6 text-red-500" />
                </div>
              </div>
              {isAligned && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
              )}
            </div>
          </div>
        </Card>

        {/* Tips Card */}
        <Card className="p-4 bg-muted/30 border-dashed">
          <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
            <span>💡</span>
            <span>টিপস:</span>
          </h4>
          <ul className="text-xs text-muted-foreground space-y-1.5">
            <li>• সর্বোত্তম ফলাফলের জন্য ফোন সমতল রাখুন</li>
            <li>• ক্যালিব্রেট করতে ফোন ৮ আকারে ঘুরান</li>
            <li>• ধাতব বস্তু বা ইলেকট্রনিক্স থেকে দূরে থাকুন</li>
            <li>• খোলা জায়গায় ব্যবহার করুন</li>
          </ul>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default Qibla;
