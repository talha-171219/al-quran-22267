import { TopBar } from '@/components/layout/TopBar';
import { BottomNav } from '@/components/layout/BottomNav';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NasheedCardPremium from '@/components/gojol/NasheedCardPremium';
import { useVideoPlayer } from '@/contexts/VideoPlayerContext';
import FullVideoPlayer from '@/components/video/FullVideoPlayer';

type VideoSpec = {
  id: string;
  title?: string;
  thumbnail?: string;
};

const Rukaiyah = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState<VideoSpec[]>([]);
  const [featured, setFeatured] = useState<VideoSpec | null>(null);
  const { current, mode, playVideo } = useVideoPlayer();

  useEffect(() => {
    // Fetch featured (if any) and regular list. Featured is optional and stays pinned at the top.
    fetch('/gojol/lectures_rukaiyah_featured.json')
      .then(r => r.ok ? r.json() : { items: [] })
      .then(data => {
        const first = (data.items || [])[0];
        if (first) {
          setFeatured({
            id: first.id,
            title: first.title || 'Featured Lecture',
            thumbnail: first.thumbnail || `https://i.ytimg.com/vi/${first.id}/hqdefault.jpg`
          });
        }
      })
      .catch(() => {
        // ignore if no featured file
        setFeatured(null);
      });

    fetch('/gojol/lectures_rukaiyah.json')
      .then(r => r.ok ? r.json() : { items: [] })
      .then(data => {
        const list = (data.items || []).map((it: any) => ({
          id: it.id || it.snippet?.resourceId?.videoId || it.youtubeId,
          title: it.title || it.snippet?.title || 'Lecture',
          thumbnail: it.thumbnail || it.snippet?.thumbnails?.high?.url || ''
        }));
        setVideos(list);
      })
      .catch(err => {
        console.error('Failed to load Rukaiyah videos:', err);
        setVideos([]);
      });
  }, []);

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="Rukaiyah" showBack />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        <Card className="p-4">
          {current && mode === 'full' ? (
            <div className="mb-4">
              <FullVideoPlayer />
            </div>
          ) : null}
          <h2 className="text-lg font-semibold mb-2">Rukaiyah</h2>
          <p className="text-sm text-muted-foreground mb-4">Pinned lecture at top — additional videos appear below</p>

          {/* Featured/pinned video (if present) */}
          {featured ? (
            <div className="mb-4">
              <div className="text-xs text-muted-foreground mb-2">Featured</div>
              <NasheedCardPremium
                key={featured.id}
                item={{ id: featured.id, title: featured.title || 'Featured Lecture', subtitle: undefined, thumbnail: featured.thumbnail || `https://i.ytimg.com/vi/${featured.id}/hqdefault.jpg`, youtubeId: featured.id }}
                onPlay={(youtubeId: string) => playVideo({ id: youtubeId, title: featured.title, thumbnail: featured.thumbnail, embedUrl: `https://www.youtube.com/embed/${youtubeId}` }, 'inline')}
              />
            </div>
          ) : null}

          {videos.length === 0 ? (
            <div className="text-sm text-muted-foreground">No additional videos yet. Provide a playlist JSON at <code>/gojol/lectures_rukaiyah.json</code> or give me the playlist link and I'll add the videos.</div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {videos.map(v => (
                <NasheedCardPremium
                  key={v.id}
                  item={{ id: v.id, title: v.title || 'Lecture', subtitle: undefined, thumbnail: v.thumbnail || '', youtubeId: v.id }}
                  onPlay={(youtubeId: string) => playVideo({ id: youtubeId, title: v.title, thumbnail: v.thumbnail, embedUrl: `https://www.youtube.com/embed/${youtubeId}` }, 'inline')}
                />
              ))}
            </div>
          )}
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

export default Rukaiyah;
