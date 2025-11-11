import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Bookmark, Volume2 } from "lucide-react";
import { hajjData } from "@/data/hajj";
import { HajjAudioPlayer } from "@/components/hajj/HajjAudioPlayer";
import { isDuaBookmarked, toggleDuaBookmark } from "@/utils/hajjStorage";
import { cn } from "@/lib/utils";

const HajjDuas = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarkedDuas, setBookmarkedDuas] = useState<Set<string>>(
    new Set(hajjData.duas.filter(d => isDuaBookmarked(d.id)).map(d => d.id))
  );

  const handleBookmark = (duaId: string) => {
    toggleDuaBookmark(duaId);
    setBookmarkedDuas(prev => {
      const newSet = new Set(prev);
      if (newSet.has(duaId)) {
        newSet.delete(duaId);
      } else {
        newSet.add(duaId);
      }
      return newSet;
    });
  };

  const filteredDuas = hajjData.duas.filter(dua => 
    dua.title_bn.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dua.arabic.includes(searchQuery) ||
    dua.transliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dua.translation_bn.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="দোয়া ও তালবিয়াহ" showBack />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="দোয়া খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Stats */}
        <div className="flex gap-2">
          <Badge variant="secondary">
            মোট {hajjData.duas.length}টি দোয়া
          </Badge>
          <Badge variant="secondary">
            {bookmarkedDuas.size}টি বুকমার্ক
          </Badge>
        </div>

        {/* Duas List */}
        <div className="space-y-4">
          {filteredDuas.map((dua) => (
            <Card key={dua.id} className="p-5 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{dua.title_bn}</h3>
                    {dua.audio && (
                      <Badge variant="outline" className="gap-1">
                        <Volume2 className="h-3 w-3" />
                      </Badge>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleBookmark(dua.id)}
                  className="shrink-0"
                >
                  <Bookmark
                    className={cn(
                      "h-5 w-5 transition-all",
                      bookmarkedDuas.has(dua.id) && "fill-primary text-primary"
                    )}
                  />
                </Button>
              </div>

              {/* Arabic Text */}
              <div className="bg-muted/30 p-4 rounded-lg">
                <p className="text-2xl font-arabic text-right leading-loose">
                  {dua.arabic}
                </p>
              </div>

              {/* Transliteration */}
              <div className="bg-primary/5 p-3 rounded-lg">
                <p className="text-sm italic text-muted-foreground">
                  {dua.transliteration}
                </p>
              </div>

              {/* Bengali Translation */}
              <div className="pt-2 border-t">
                <p className="text-sm font-medium text-foreground">
                  {dua.translation_bn}
                </p>
              </div>

              {/* Audio Player */}
              {dua.audio && (
                <HajjAudioPlayer
                  audioUrl={dua.audio}
                  title={dua.title_bn}
                  compact
                />
              )}
            </Card>
          ))}
        </div>

        {filteredDuas.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">কোনো দোয়া পাওয়া যায়নি</p>
          </Card>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default HajjDuas;
