import React, { useState, useEffect } from 'react';
import NasheedCardPremium from '@/components/gojol/NasheedCardPremium';
import { useNavigate } from 'react-router-dom';

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
    // open top mini player / route to detailed player if desired
    navigate(`/gojol/arabic?play=${youtubeId}`);
  }

  return (
    <div className="p-6">
      <header className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-white">Nasheed Videos (YouTube)</h1>
            <p className="text-sm text-slate-300">Premium Arabic Nasheeds — curated</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-3 py-2 bg-emerald-700 rounded text-white">Download</button>
            <button className="px-3 py-2 bg-transparent border border-slate-700 rounded text-white">•••</button>
          </div>
        </div>
      </header>

      <main>
        {loading ? (
          <div className="text-slate-400">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((it) => (
              <NasheedCardPremium key={it.id} item={it} onPlay={handlePlay} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
