import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Mosque } from "@/utils/mosqueStorage";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface MosqueMapProps {
  mosques: Mosque[];
  userLocation: { lat: number; lon: number } | null;
  onMosqueSelect: (mosque: Mosque) => void;
}

const MosqueMap = ({ mosques, userLocation, onMosqueSelect }: MosqueMapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current || !userLocation) return;

    // Initialize map only once
    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView(
        [userLocation.lat, userLocation.lon],
        13
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(mapRef.current);
    }

    // Clear existing markers
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        mapRef.current?.removeLayer(layer);
      }
    });

    // Add user location marker
    const userIcon = L.divIcon({
      html: `<div style="background-color: #3b82f6; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
      className: "",
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    });

    L.marker([userLocation.lat, userLocation.lon], { icon: userIcon })
      .addTo(mapRef.current)
      .bindPopup("<b>আপনার অবস্থান</b>");

    // Add mosque markers
    const mosqueIcon = L.divIcon({
      html: `<div style="background-color: #0f766e; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
      className: "",
      iconSize: [12, 12],
      iconAnchor: [6, 6],
    });

    mosques.forEach((mosque) => {
      const marker = L.marker([mosque.lat, mosque.lon], { icon: mosqueIcon })
        .addTo(mapRef.current!)
        .bindPopup(
          `<div style="text-align: center;">
            <b>${mosque.name}</b><br/>
            <small>${mosque.distance?.toFixed(2)} কিমি</small><br/>
            <button 
              onclick="window.dispatchEvent(new CustomEvent('mosque-select', { detail: '${mosque.id}' }))"
              style="margin-top: 4px; padding: 4px 8px; background: #0f766e; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;"
            >
              বিস্তারিত দেখুন
            </button>
          </div>`
        );

      marker.on("click", () => {
        mapRef.current?.setView([mosque.lat, mosque.lon], 15);
      });
    });

    // Fit bounds to show all markers
    if (mosques.length > 0) {
      const bounds = L.latLngBounds([
        [userLocation.lat, userLocation.lon],
        ...mosques.map((m) => [m.lat, m.lon] as [number, number]),
      ]);
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }

    // Listen for mosque selection from popup
    const handleMosqueSelect = (e: Event) => {
      const customEvent = e as CustomEvent;
      const mosque = mosques.find((m) => m.id === customEvent.detail);
      if (mosque) {
        onMosqueSelect(mosque);
      }
    };

    window.addEventListener("mosque-select", handleMosqueSelect);

    return () => {
      window.removeEventListener("mosque-select", handleMosqueSelect);
    };
  }, [mosques, userLocation, onMosqueSelect]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <Card className="overflow-hidden">
      <div
        ref={mapContainerRef}
        className="w-full h-[500px]"
        style={{ background: "#f0f0f0" }}
      />
    </Card>
  );
};

export default MosqueMap;
