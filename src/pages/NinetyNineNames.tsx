import { useState, useRef } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Play, Pause, Volume2 } from "lucide-react";
import { ninetyNineNames, categories } from "@/data/ninetyNineNames";
import asmaUlHusnaImage from "@/assets/asma-ul-husna.png";

const NinetyNineNames = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("সকল");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const filteredNames = ninetyNineNames.filter((name) => {
    const matchesSearch =
      name.arabic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      name.transliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
      name.bengali.toLowerCase().includes(searchQuery.toLowerCase()) ||
      name.meaning.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "সকল" || name.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="আল্লাহর ৯৯ নাম" showBack backPath="/explore" />

      <main className="max-w-lg mx-auto px-4 py-6">
        {/* Header Image */}
        <div className="mb-6">
          <img
            src={asmaUlHusnaImage}
            alt="Asma Ul Husna"
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Audio Player */}
        <Card className="p-4 mb-6 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                size="icon"
                onClick={toggleAudio}
                className="rounded-full bg-primary hover:bg-primary/90"
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </Button>
              <div>
                <p className="font-semibold text-sm">আল্লাহর ৯৯ নাম</p>
                <p className="text-xs text-muted-foreground">সম্পূর্ণ অডিও</p>
              </div>
            </div>
            <Volume2 className="h-5 w-5 text-muted-foreground" />
          </div>
          <audio
            ref={audioRef}
            src="/99-names.mp3"
            onEnded={() => setIsPlaying(false)}
            onPause={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
          />
        </Card>

        {/* Search */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="নাম বা অর্থ অনুসন্ধান করুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Names Grid */}
        <div className="grid grid-cols-1 gap-4">
          {filteredNames.map((name) => (
            <Card
              key={name.number}
              className="p-4 hover:shadow-lg transition-shadow bg-gradient-to-br from-card to-card/50"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                  {name.number}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-arabic mb-1 text-foreground">
                    {name.arabic}
                  </h3>
                  <p className="text-sm text-primary font-semibold mb-1">
                    {name.transliteration}
                  </p>
                  <p className="text-sm font-medium mb-1">{name.bengali}</p>
                  <p className="text-sm text-muted-foreground">{name.meaning}</p>
                  <Badge variant="secondary" className="mt-2 text-xs">
                    {name.category}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredNames.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">কোন নাম পাওয়া যায়নি</p>
          </Card>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default NinetyNineNames;
