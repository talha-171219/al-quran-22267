import { useState, useEffect } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/card";
import { Compass, Navigation, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Qibla = () => {
  const [qiblaDirection, setQiblaDirection] = useState<number | null>(null);
  const [heading, setHeading] = useState<number>(0);
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);

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
          setHeading(event.alpha);
        }
      };
      window.addEventListener('deviceorientation', handleOrientation);
      return () => window.removeEventListener('deviceorientation', handleOrientation);
    }
  }, []);

  const getDirectionText = (degree: number) => {
    if (degree >= 337.5 || degree < 22.5) return "N";
    if (degree >= 22.5 && degree < 67.5) return "NE";
    if (degree >= 67.5 && degree < 112.5) return "E";
    if (degree >= 112.5 && degree < 157.5) return "SE";
    if (degree >= 157.5 && degree < 202.5) return "S";
    if (degree >= 202.5 && degree < 247.5) return "SW";
    if (degree >= 247.5 && degree < 292.5) return "W";
    return "NW";
  };

  const relativeDirection = qiblaDirection !== null ? (qiblaDirection - heading + 360) % 360 : 0;

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="কিবলা নির্দেশক" showBack />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Instructions Card */}
        <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <Compass className="h-5 w-5 text-primary" />
            কিবলা খুঁজতে নির্দেশাবলী
          </h3>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>প্রথমে "লোকেশন অনুমতি দিন" বাটনে ক্লিক করুন</li>
            <li>আপনার ফোন সমতল রেখে ধরুন</li>
            <li>লাল তীর কিবলার দিক নির্দেশ করবে</li>
            <li>কম্পাস ঘুরান যতক্ষণ না তীর উপরের দিকে নির্দেশ করে</li>
            <li>নীল কম্পাস উত্তর দিক নির্দেশ করে</li>
          </ul>
        </Card>

        <Card className="p-8 bg-gradient-to-br from-background to-muted/20">
          <div className="text-center space-y-6">
            {/* Compass with Cardinal Directions */}
            <div className="relative w-64 h-64 mx-auto">
              {/* Outer rings */}
              <div className="absolute inset-0 rounded-full border-4 border-primary/20 shadow-lg" />
              <div className="absolute inset-4 rounded-full border-2 border-primary/40" />
              <div className="absolute inset-8 rounded-full border border-primary/20" />
              
              {/* Cardinal directions */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs font-bold text-destructive">N</div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-bold text-muted-foreground">S</div>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">E</div>
              <div className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">W</div>
              
              {/* Compass needle (rotates with device) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Compass 
                  className="h-40 w-40 text-primary transition-transform duration-300 drop-shadow-lg" 
                  style={{ transform: `rotate(${-heading}deg)` }}
                />
              </div>
              
              {/* Qibla direction arrow (fixed to Qibla) */}
              {qiblaDirection !== null && (
                <div 
                  className="absolute top-4 left-1/2 -translate-x-1/2 transition-transform duration-300"
                  style={{ 
                    transform: `translate(-50%, 0) rotate(${relativeDirection}deg)`,
                    transformOrigin: '50% 110px'
                  }}
                >
                  <Navigation className="h-10 w-10 text-destructive fill-destructive drop-shadow-lg" />
                </div>
              )}
              
              {/* Center dot */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full shadow-lg" />
            </div>

            {/* Direction Display */}
            <div className="space-y-3">
              {qiblaDirection !== null ? (
                <>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">কিবলার দিক</p>
                    <p className="text-4xl font-bold text-primary">
                      {Math.round(qiblaDirection)}°
                    </p>
                    <p className="text-lg text-muted-foreground mt-1">
                      {getDirectionText(qiblaDirection)} দিকে
                    </p>
                  </div>
                  
                  {location && (
                    <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>অবস্থান: {location.lat.toFixed(4)}, {location.lon.toFixed(4)}</span>
                    </div>
                  )}
                  
                  {/* Distance/accuracy indicator */}
                  <div className="flex items-center justify-center gap-2 text-xs">
                    <div className={`w-2 h-2 rounded-full ${Math.abs(relativeDirection) < 10 ? 'bg-green-500' : Math.abs(relativeDirection) < 45 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                    <span className="text-muted-foreground">
                      {Math.abs(relativeDirection) < 10 ? 'কিবলার দিকে সঠিক' : Math.abs(relativeDirection) < 45 ? 'প্রায় সঠিক' : 'আরো ঘুরান'}
                    </span>
                  </div>
                </>
              ) : (
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">দিক</p>
                  <p className="text-4xl font-bold text-muted-foreground">---</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    নিচের বাটনে ক্লিক করুন
                  </p>
                </div>
              )}
            </div>

            <Button 
              onClick={getLocation} 
              size="lg"
              className="gap-2 w-full text-lg py-6"
            >
              <Navigation className="h-5 w-5" />
              লোকেশন অনুমতি দিন
            </Button>
          </div>
        </Card>

        {/* Additional Tips */}
        <Card className="p-4 bg-muted/30 border-dashed">
          <h4 className="font-semibold text-sm mb-2">💡 টিপস:</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• ফোনের কম্পাস ক্যালিব্রেট করতে ফোন ৮ আকারে ঘুরান</li>
            <li>• ধাতব বস্তু বা ইলেকট্রনিক্স থেকে দূরে রাখুন</li>
            <li>• সবচেয়ে ভালো ফলাফলের জন্য খোলা জায়গায় ব্যবহার করুন</li>
          </ul>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default Qibla;
