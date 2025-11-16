import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import GojolCard, { GojolItem } from "@/components/gojol/GojolCard";
import { useAudio } from "@/contexts/AudioContext";
import { useState } from "react";

const initialItems: GojolItem[] = [
  { id: "hasbi_rabbi_jallallah", title: "Hasbi Rabbi Jallallah", author: "Kalarab Shilpigosthi", src: "/gojol/Hasbi_Rabbi_Jallallah.mp3" },
  { id: "salam_official", title: "Salam Official Song", author: "Kalarab Shilpigosthi", src: "/gojol/Salam_Official_Song.mp3" },
  { id: "allah_allah", title: "Allah Allah Islamic Song", author: "Kalarab Shilpigosthi", src: "/gojol/Allah_Allah_Islamic_Song.mp3" },
  { id: "hridoy_majhe_mala", title: "Hridoy Majhe Mala Gath", author: "Kalarab Shilpigosthi", src: "/gojol/Hridoy_Majhe_Mala_Gath.mp3" },
  { id: "ami_dekhini_tomay", title: "Ami Dekhini Tomay", author: "Kalarab Shilpigosthi", src: "/gojol/Ami_Dekhini_Tomay.mp3" },
  { id: "baba_koto_din", title: "Baba Koto Din Holo Dekhini Tor", author: "Kalarab", src: "/gojol/Baba_Koto_Din_Holo_Dekhini_Tor.mp3" },
  { id: "hothat_azrail", title: "Hothat Azrail Pathaiya Toke", author: "Kalarab Shilpigosthi", src: "/gojol/Hothat_Azrail_Pathaiya_Toke.mp3" },
  { id: "o_modinar_bulbuli", title: "O Modinar Bulbuli", author: "Kalarab Shilpigosthi", src: "/gojol/O_Modinar_Bulbuli.mp3" },
  { id: "allahor_voy", title: "Allahor Voy", author: "Kalarab", src: "/gojol/Allahor_Voy.mp3" },
  { id: "rongin_prithibi", title: "Rongin E Prithibi Charite Hoibe", author: "Kalarab (Sayed Ahmad)", src: "/gojol/Rongin_E_Prithibi_Charite_Hoibe.mp3" },
  { id: "salat_kayem", title: "Salat Kayem Koro", author: "Kalarab Shilpigosthi", src: "/gojol/Salat_Kayem_Koro.mp3" },
  { id: "tri_vuboner_priyo", title: "Tri Vuboner Priyo Muhammad", author: "Kalarab", src: "/gojol/Tri_Vuboner_Priyo_Muhammad.mp3" },
];

const GojolBangla = () => {
  const navigate = useNavigate();
  const [items] = useState<GojolItem[]>(initialItems);
  const { playTrack, togglePlay, currentTrack, isPlaying, hidePlayer } = useAudio();

  const handlePlay = (item: GojolItem) => {
    playTrack({ id: item.id, title: item.title, src: item.src });
  };

  const handlePause = () => {
    togglePlay();
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="Bangla Gojol MP3" showBack />

      <main className="max-w-lg mx-auto px-4 py-8 space-y-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-2">বাংলা গজল MP3</h2>
          <p className="text-sm text-muted-foreground mb-4">নিচের কার্ডে প্লে বাটনে ট্যাপ করে অডিও শুরু করুন।</p>
          <div className="flex gap-2">
            <Button onClick={() => navigate(-1)} variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </Button>
          </div>
        </Card>

        <div className="space-y-4">
          {items.map(item => (
            <GojolCard
              key={item.id}
              item={item}
              isPlaying={isPlaying && currentTrack?.type === 'custom' && currentTrack.id === item.id}
              onPlay={handlePlay}
              onPause={handlePause}
            />
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default GojolBangla;
