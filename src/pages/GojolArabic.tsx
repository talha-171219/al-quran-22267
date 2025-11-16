import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import YouTubeGojolCard from "@/components/gojol/YouTubeGojolCard";
import { useVideoPlayer } from '@/contexts/VideoPlayerContext';
import FullVideoPlayer from '@/components/video/FullVideoPlayer';

type VideoSpec = {
  id: string; // video id
  title?: string;
  artist?: string;
  embedUrl: string; // https://www.youtube.com/embed/ID
  thumbnail?: string;
};

function extractVideoId(input: string) {
  if (!input) return null;
  // If iframe HTML provided
  const srcMatch = input.match(/src=["']([^"']+)["']/);
  const src = srcMatch ? srcMatch[1] : input;
  // patterns
  const patterns = [
    /v=([\w-]{11})/, // watch?v=
    /youtu\.be\/([\w-]{11})/, // short
    /embed\/([\w-]{11})/ // embed
  ];
  for (const p of patterns) {
    const m = src.match(p);
    if (m) return m[1];
  }
  // fallback: last 11 chars if seems like id
  const possible = src.replace(/[^0-9A-Za-z_-]/g, '');
  if (possible.length >= 11) return possible.slice(-11);
  return null;
}


const GojolArabic = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState<VideoSpec[]>([]);

  useEffect(() => {
    // Load any pre-fetched playlist JSON dropped into public/gojol/playlist_sample.json
    Promise.all([
      fetch('/gojol/gojol_arabic_new_videos.json').then(r => r.ok ? r.json() : { items: [] }),
      fetch('/gojol/gojol_arabic_playlist.json').then(r => r.ok ? r.json() : { items: [] }),
    ])
      .then(([newVideos, playlistVideos]) => {
        const combinedVideos = [
          ...(newVideos.items || []),
          ...(playlistVideos.items || []),
        ].map((it: any) => ({
          id: it.id,
          title: it.title,
          artist: it.artist,
          embedUrl: `https://www.youtube.com/embed/${it.id}`,
          thumbnail: it.thumbnail
        }));
        setVideos(combinedVideos);
      })
      .catch((error) => {
        console.error("Failed to load videos:", error);
        setVideos([]);
      });
  }, []);

  const { current, mode } = useVideoPlayer();

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="Nasheed Video" showBack />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        <Card className="p-4">
          {/* Full player area - shows when a video is active in full mode */}
          {current && mode === 'full' ? (
            <div className="mb-4">
              <FullVideoPlayer />
            </div>
          ) : null}

          <h2 className="text-lg font-semibold mb-2">Nasheed Videos (YouTube)</h2>
          <p className="text-sm text-muted-foreground mb-4"></p>
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

export default GojolArabic;
