import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAudio } from "@/contexts/AudioContext";

type ArabicItem = {
  id: string;
  title: string;
  artist?: string;
  src?: string;
};

const ARABIC_KEY = "gojol_arabic_sources";

const initialArabic: ArabicItem[] = [
  { id: "1", title: "Jannah", artist: "Muad ft. Zain Bhikha" },
  { id: "2", title: "Ya Quluban", artist: "Abdullah Al Sinani" },
  { id: "3", title: "The Way of Tears", artist: "Muhammad Al Muqit" },
  { id: "4", title: "Safati Nadra", artist: "Noureddine Khourchid" },
  { id: "5", title: "Ya Adheeman", artist: "Ahmed Bukhatir" },
  { id: "6", title: "A is for Allah", artist: "Yusuf Islam" },
  { id: "7", title: "Ya Ashiqol Musfatah" },
  { id: "8", title: "An Nabi Sallo Aleh", artist: "Hajj Muhammad Owais Raza Qadri" }
];

const GojolArabic = () => {
  const navigate = useNavigate();
  const { playTrack } = useAudio();
  const [items, setItems] = useState<ArabicItem[]>(initialArabic);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(ARABIC_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Record<string, string>;
        setItems((prev) => prev.map(i => ({ ...i, src: saved[i.id] })));
      }
    } catch (e) {
      // ignore parse errors
    }
  }, []);

  const setSource = (id: string) => {
    const url = window.prompt("Paste direct MP3 URL for this track (must be a direct .mp3 link):");
    if (!url) return;
    const updated = items.map(i => i.id === id ? { ...i, src: url } : i);
    setItems(updated);
    // persist mapping id -> url
    const mapping: Record<string,string> = {};
    updated.forEach(it => { if (it.src) mapping[it.id] = it.src; });
    localStorage.setItem(ARABIC_KEY, JSON.stringify(mapping));
  };

  const play = (it: ArabicItem) => {
    if (!it.src) {
      const ok = window.confirm("No source set for this item. Would you like to set a URL now?");
      if (ok) return setSource(it.id);
      return;
    }
    playTrack({ id: `arabic-${it.id}`, title: `${it.title} — ${it.artist || ""}`, src: it.src });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="Arabic Gojol" showBack />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-2">আরবী গজল</h2>
          <p className="text-sm text-muted-foreground mb-4">নীচে আপনাে তালিকাভুক্ত গজলের নাম দেখুন। প্রত্যেকটি আইটেমে একটি "Set source" বোতাম আছে যেখানে আপনি সরাসরি MP3 ইউআরএল পেস্ট করে দিতে পারবেন। এটি প্লেয়ারকে সরাসরি ওই URL থেকে প্লে করবে (প্লেয়ারের সঙ্গে ইন্টিগ্রেটেড)।</p>
          <div className="space-y-3">
            {items.map(it => (
              <div key={it.id} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{it.title}</div>
                  <div className="text-xs text-muted-foreground">{it.artist}</div>
                  {it.src ? <div className="text-xs text-foreground/60 truncate max-w-sm">Source: {it.src}</div> : null}
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" onClick={() => play(it)}>{it.src ? 'Play' : 'Set & Play'}</Button>
                  <Button size="sm" variant="ghost" onClick={() => setSource(it.id)}>Set source</Button>
                </div>
              </div>
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
