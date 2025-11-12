import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mosque } from "@/utils/mosqueStorage";
import { MapPin, Navigation, Heart } from "lucide-react";
import { mosqueStorage } from "@/utils/mosqueStorage";
import { cn } from "@/lib/utils";

interface MosqueListProps {
  mosques: Mosque[];
  onMosqueSelect: (mosque: Mosque) => void;
  onToggleFavorite: (mosque: Mosque) => void;
  onGetDirections: (mosque: Mosque) => void;
}

const MosqueList = ({
  mosques,
  onMosqueSelect,
  onToggleFavorite,
  onGetDirections,
}: MosqueListProps) => {
  return (
    <div className="space-y-4">
      {mosques.map((mosque) => {
        const isFavorite = mosqueStorage.isFavorite(mosque.id);
        
        return (
          <Card
            key={mosque.id}
            className="p-4 hover:shadow-lg transition-all duration-300 cursor-pointer animate-fade-in"
            onClick={() => onMosqueSelect(mosque)}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{mosque.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {mosque.address}
                    </p>
                    {mosque.distance && (
                      <div className="flex items-center gap-2 text-sm text-primary">
                        <Navigation className="h-4 w-4" />
                        <span className="font-medium">
                          {mosque.distance.toFixed(2)} কিমি দূরে
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      onGetDirections(mosque);
                    }}
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    দিকনির্দেশনা
                  </Button>
                  <Button
                    size="sm"
                    variant={isFavorite ? "default" : "outline"}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(mosque);
                    }}
                    className={cn(
                      "transition-colors",
                      isFavorite && "bg-red-500 hover:bg-red-600"
                    )}
                  >
                    <Heart
                      className={cn("h-4 w-4", isFavorite && "fill-current")}
                    />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default MosqueList;
