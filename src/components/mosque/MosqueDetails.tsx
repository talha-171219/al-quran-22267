import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mosque } from "@/utils/mosqueStorage";
import { MapPin, Navigation, Heart, ExternalLink } from "lucide-react";
import { mosqueStorage } from "@/utils/mosqueStorage";
import { cn } from "@/lib/utils";

interface MosqueDetailsProps {
  mosque: Mosque;
  userLocation: { lat: number; lon: number } | null;
  onClose: () => void;
  onToggleFavorite: (mosque: Mosque) => void;
  onGetDirections: (mosque: Mosque) => void;
}

const MosqueDetails = ({
  mosque,
  userLocation,
  onClose,
  onToggleFavorite,
  onGetDirections,
}: MosqueDetailsProps) => {
  const isFavorite = mosqueStorage.isFavorite(mosque.id);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            মসজিদের বিবরণ
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Mosque Name */}
          <div>
            <h2 className="text-2xl font-bold mb-2">{mosque.name}</h2>
            <p className="text-muted-foreground">{mosque.address}</p>
          </div>

          {/* Distance Info */}
          {mosque.distance && (
            <div className="flex items-center gap-2 p-4 bg-primary/10 rounded-lg">
              <Navigation className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">দূরত্ব</p>
                <p className="font-semibold text-lg">
                  {mosque.distance.toFixed(2)} কিলোমিটার
                </p>
              </div>
            </div>
          )}

          {/* Map Preview */}
          <div className="rounded-lg overflow-hidden border">
            <iframe
              width="100%"
              height="200"
              frameBorder="0"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                mosque.lon - 0.01
              }%2C${mosque.lat - 0.01}%2C${mosque.lon + 0.01}%2C${
                mosque.lat + 0.01
              }&layer=mapnik&marker=${mosque.lat}%2C${mosque.lon}`}
              style={{ border: 0 }}
            />
          </div>

          {/* Coordinates */}
          <div className="text-sm text-muted-foreground space-y-1">
            <p>
              <strong>অক্ষাংশ:</strong> {mosque.lat.toFixed(6)}
            </p>
            <p>
              <strong>দ্রাঘিমাংশ:</strong> {mosque.lon.toFixed(6)}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              className="flex-1"
              onClick={() => {
                onGetDirections(mosque);
                onClose();
              }}
            >
              <Navigation className="h-4 w-4 mr-2" />
              দিকনির্দেশনা পান
            </Button>
            <Button
              variant={isFavorite ? "default" : "outline"}
              onClick={() => onToggleFavorite(mosque)}
              className={cn(
                "transition-colors",
                isFavorite && "bg-red-500 hover:bg-red-600"
              )}
            >
              <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/search/?api=1&query=${mosque.lat},${mosque.lon}`,
                  "_blank"
                )
              }
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>

          {/* Additional Info */}
          <div className="text-xs text-muted-foreground text-center pt-2 border-t">
            <p>
              মসজিদের তথ্য OpenStreetMap থেকে নেওয়া হয়েছে। তথ্য যাচাই করে নিন।
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MosqueDetails;
