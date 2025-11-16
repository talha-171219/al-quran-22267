import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Pause, Radio } from "lucide-react";

export interface GojolItem {
  id: string;
  title: string;
  author?: string;
  src: string;
}

interface Props {
  item: GojolItem;
  isPlaying: boolean;
  onPlay: (item: GojolItem) => void;
  onPause: () => void;
}

const GojolCard: React.FC<Props> = ({ item, isPlaying, onPlay, onPause }) => {
  return (
    <Card className="p-4 rounded-2xl shadow-md bg-gradient-to-br from-primary/5 to-background/50 border border-primary/10">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
            <Radio className="h-6 w-6 text-primary" />
          </div>

          <div>
            <h3 className="font-semibold text-base">{item.title}</h3>
            {item.author && <p className="text-sm text-muted-foreground">{item.author}</p>}
          </div>
        </div>

        <div>
          {isPlaying ? (
            <Button variant="default" onClick={onPause} className="h-10 w-10 p-0">
              <Pause className="h-5 w-5" />
            </Button>
          ) : (
            <Button variant="default" onClick={() => onPlay(item)} className="h-10 w-10 p-0">
              <Play className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default GojolCard;
