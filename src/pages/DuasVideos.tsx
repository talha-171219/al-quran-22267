import React, { useEffect, useState } from 'react';
import NasheedCardPremium from '@/components/gojol/NasheedCardPremium';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '@/components/layout/BottomNav';
import { TopBar } from '@/components/layout/TopBar';

export default function DuasVideos() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    fetch('/gojol/duas_playlist.json')
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        const arr = (data.items || []).map((it: any) => ({
          id: it.id,
          title: it.snippet?.title || it.title || 'Dua',
          thumbnail: it.snippet?.thumbnails?.high?.url || '',
          youtubeId: it.snippet?.resourceId?.videoId || it.id
        }));
        setItems(arr);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
    return () => { mounted = false; };
  }, []);

  function handlePlay(youtubeId: string) {
    navigate(`/gojol/arabic?play=${youtubeId}`);
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="Duas Videos" showBack />
      <main className="p-4 max-w-lg mx-auto">
        {loading ? (
          <div className="text-muted-foreground text-center py-8">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {items.map(it => <NasheedCardPremium key={it.id} item={it} onPlay={handlePlay} />)}
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  );
}
