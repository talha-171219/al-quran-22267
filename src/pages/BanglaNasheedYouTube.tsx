import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import YouTubeGojolCard from "@/components/gojol/YouTubeGojolCard";

type VideoSpec = {
  id: string; // video id
  title?: string;
  artist?: string;
  embedUrl: string; // https://www.youtube.com/embed/ID
  thumbnail?: string;
};

const BanglaNasheedYouTube = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState<VideoSpec[]>([]);

  useEffect(() => {
    // Load any pre-fetched Bangla playlist JSON at public/gojol/playlist_bangla.json
    fetch('/gojol/playlist_bangla.json')
      .then(r => r.ok ? r.json() : null)
      .then((pl) => {
        if (pl && Array.isArray(pl.items)) {
          const fromPl = pl.items.map((it: any) => ({ id: it.id, title: it.title, artist: it.artist, embedUrl: `https://www.youtube.com/embed/${it.id}`, thumbnail: it.thumbnail }));
          setVideos(fromPl);
        } else {
          setVideos([]);
        }
      })
      .catch(() => setVideos([]));
  }, []);

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="Bangla Nasheed (YouTube)" showBack />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-2">Bangla Nasheed (YouTube)</h2>
          <p className="text-sm text-muted-foreground mb-4">Bangla nasheed YouTube videos. Add a `public/gojol/playlist_bangla.json` file to preload a playlist.</p>
          <div className="grid grid-cols-1 gap-4">
            {videos.map(v => (
              <YouTubeGojolCard key={v.id} title={v.title || 'YouTube Video'} embedUrl={v.embedUrl} thumbnailUrl={v.thumbnail} artist={v.artist} />
            ))}
          </div>
        </Card>

        <div className="flex gap-2">
          <Button onClick={() => navigate(-1)} variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default BanglaNasheedYouTube;
