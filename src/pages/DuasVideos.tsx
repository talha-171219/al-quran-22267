import React, { useEffect, useState } from 'react';
import NasheedCardPremium from '@/components/gojol/NasheedCardPremium';
import { useNavigate } from 'react-router-dom';

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
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-4">Duas Videos</h2>
      {loading ? <div className="text-slate-400">Loading...</div> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(it => <NasheedCardPremium key={it.id} item={it} onPlay={handlePlay} />)}
        </div>
      )}
    </div>
  );
}
