import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Mosque } from "@/utils/mosqueStorage";

interface MosqueMapViewProps {
  mosques: Mosque[];
  userLocation: { lat: number; lon: number };
  onMosqueSelect: (mosque: Mosque) => void;
}

const MosqueMapView = ({ mosques, userLocation, onMosqueSelect }: MosqueMapViewProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Generate markers for all mosques
  const generateMapUrl = () => {
    // Create a bounding box that includes user location and all mosques
    const lats = [userLocation.lat, ...mosques.slice(0, 20).map(m => m.lat)];
    const lons = [userLocation.lon, ...mosques.slice(0, 20).map(m => m.lon)];
    
    const minLat = Math.min(...lats) - 0.01;
    const maxLat = Math.max(...lats) + 0.01;
    const minLon = Math.min(...lons) - 0.01;
    const maxLon = Math.max(...lons) + 0.01;

    // Center point
    const centerLat = (minLat + maxLat) / 2;
    const centerLon = (minLon + maxLon) / 2;

    return `https://www.openstreetmap.org/export/embed.html?bbox=${minLon}%2C${minLat}%2C${maxLon}%2C${maxLat}&layer=mapnik&marker=${centerLat}%2C${centerLon}`;
  };

  return (
    <div className="space-y-4">
      {/* Interactive Map */}
      <Card className="overflow-hidden">
        <div className="relative">
          <iframe
            ref={iframeRef}
            width="100%"
            height="400"
            frameBorder="0"
            scrolling="no"
            src={generateMapUrl()}
            className="border-0"
            title="Mosque Map"
          />
          <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs font-medium">আপনার অবস্থান</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Actions on Map */}
      <div className="grid grid-cols-2 gap-3">
        <a
          href={`https://www.google.com/maps/search/mosque/@${userLocation.lat},${userLocation.lon},15z`}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-primary/10 to-primary/5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <div>
                <p className="font-semibold text-sm">Google Maps</p>
                <p className="text-xs text-muted-foreground">বড় ম্যাপে দেখুন</p>
              </div>
            </div>
          </Card>
        </a>

        <a
          href={`https://www.openstreetmap.org/#map=15/${userLocation.lat}/${userLocation.lon}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-emerald-500/10 to-emerald-500/5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <div>
                <p className="font-semibold text-sm">OpenStreetMap</p>
                <p className="text-xs text-muted-foreground">বিস্তারিত দেখুন</p>
              </div>
            </div>
          </Card>
        </a>
      </div>

      {/* Nearby Mosques List with Mini Maps */}
      <div className="space-y-3 mt-6">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          কাছের মসজিদসমূহ ({mosques.length > 20 ? '২০টি' : `${mosques.length}টি`})
        </h3>
        
        {mosques.slice(0, 20).map((mosque, index) => (
          <Card
            key={mosque.id}
            className="p-4 hover:shadow-lg transition-all cursor-pointer animate-fade-in"
            onClick={() => onMosqueSelect(mosque)}
          >
            <div className="flex gap-4">
              {/* Rank Badge */}
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  {index + 1}
                </div>
              </div>

              {/* Mosque Info */}
              <div className="flex-1 space-y-2">
                <h4 className="font-semibold text-base leading-tight">{mosque.name}</h4>
                <p className="text-sm text-muted-foreground leading-snug">
                  📍 {mosque.address}
                </p>
                {mosque.distance && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-full font-medium text-xs">
                      📏 {mosque.distance.toFixed(2)} কিমি দূরে
                    </span>
                    <span className="text-xs text-muted-foreground">
                      (প্রায় {Math.round(mosque.distance * 10)} মিনিট)
                    </span>
                  </div>
                )}
              </div>

              {/* Direction Arrow */}
              <div className="flex-shrink-0 flex items-center">
                <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Card>
        ))}

        {mosques.length === 0 && (
          <Card className="p-8 text-center">
            <svg className="w-16 h-16 mx-auto mb-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-muted-foreground">
              কাছাকাছি কোনো মসজিদ পাওয়া যায়নি
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MosqueMapView;
