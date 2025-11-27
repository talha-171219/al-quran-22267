import React, { useState, useEffect } from 'react';
import NasheedCardPremium from '@/components/gojol/NasheedCardPremium';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '@/components/layout/BottomNav';
import { TopBar } from '@/components/layout/TopBar';

const samplePlaylistPath = '/gojol/gojol_arabic_playlist.json';

export default function NasheedPremium() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    fetch(samplePlaylistPath)
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        const arr = (data.items || []).map((it: any) => ({
          id: it.id || it.videoId || it.snippet?.resourceId?.videoId,
          title: it.snippet?.title || it.title || 'Nasheed',
          thumbnail: it.snippet?.thumbnails?.high?.url || it.thumbnail || '',
          youtubeId: it.snippet?.resourceId?.videoId || it.id
        }));
        setItems(arr);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
    return () => { mounted = false; };
  }, []);

  function handlePlay(youtubeId: string) {
    setPlayingId(youtubeId);
    navigate(`/gojol/arabic?play=${youtubeId}`);
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="Nasheed Videos" showBack />
      <main className="p-4 max-w-lg mx-auto">
        {loading ? (
          <div className="text-muted-foreground text-center py-8">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {items.map((it) => (
              <NasheedCardPremium key={it.id} item={it} onPlay={handlePlay} />
            ))}
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  );
}
