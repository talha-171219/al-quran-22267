import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookmarkPlus, Bookmark, Volume2 } from "lucide-react";
import { surahList } from "@/data/surahs";
import { toast } from "sonner";
import { verseCache, Verse as CachedVerse } from "@/utils/verseCache";

interface Verse {
  numberInSurah: number;
  text: string;
  translation: string;
}

const SurahDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookmarkedVerses, setBookmarkedVerses] = useState<string[]>([]);
  
  const surah = surahList.find(s => s.number === Number(id));

  useEffect(() => {
    const loadBookmarks = () => {
      try {
        const stored = localStorage.getItem("bookmarked-verses");
        if (stored) {
          const parsed = JSON.parse(stored);
          setBookmarkedVerses(parsed);
        }
      } catch (error) {
        console.error("Error loading bookmarks:", error);
        setBookmarkedVerses([]);
      }
    };
    loadBookmarks();

    // Listen for storage changes from other tabs/windows
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "bookmarked-verses" && e.newValue) {
        try {
          setBookmarkedVerses(JSON.parse(e.newValue));
        } catch (error) {
          console.error("Error updating bookmarks:", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const loadVerses = async () => {
      if (!id) return;
      setLoading(true);
      const surahNum = Number(id);

      // 1) Try cache first for instant offline reading
      try {
        const cached = await verseCache.getVerses(surahNum);
        if (cached && cached.length) {
          setVerses(cached as CachedVerse[]);
        }
      } catch {}

      // 2) Fetch fresh data (will also cache)
      try {
        const [arabicRes, bengaliRes] = await Promise.all([
          fetch(`https://api.alquran.cloud/v1/surah/${id}/ar.alafasy`),
          fetch(`https://api.alquran.cloud/v1/surah/${id}/bn.bengali`)
        ]);
        
        const [arabicData, bengaliData] = await Promise.all([
          arabicRes.json(),
          bengaliRes.json()
        ]);

        const combined: Verse[] = arabicData.data.ayahs.map((ayah: any, idx: number) => ({
          numberInSurah: ayah.numberInSurah,
          text: ayah.text,
          translation: bengaliData.data.ayahs[idx]?.text || ""
        }));

        setVerses(combined);
        // Save to cache for offline use
        await verseCache.saveVerses(surahNum, combined);
      } catch (error) {
        if (!verses.length) {
          toast.info("অফলাইনে ক্যাশ না থাকায় নতুন ডেটা আনতে পারিনি");
        } else {
          toast.success("অফলাইন ক্যাশ থেকে দেখানো হচ্ছে");
        }
      } finally {
        setLoading(false);
      }
    };

    loadVerses();
  }, [id]);

  const toggleBookmark = (verseKey: string) => {
    const updated = bookmarkedVerses.includes(verseKey)
      ? bookmarkedVerses.filter(v => v !== verseKey)
      : [...bookmarkedVerses, verseKey];
    
    setBookmarkedVerses(updated);
    try {
      localStorage.setItem("bookmarked-verses", JSON.stringify(updated));
      toast.success(updated.includes(verseKey) ? "বুকমার্ক যুক্ত হয়েছে" : "বুকমার্ক সরানো হয়েছে");
    } catch (error) {
      console.error("Error saving bookmark:", error);
      toast.error("বুকমার্ক সেভ করতে সমস্যা হয়েছে");
    }
  };

  const playAudio = () => {
    navigate(`/audio?surah=${id}`);
  };

  if (!surah) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <TopBar title="সূরা খুঁজে পাওয়া যায়নি" showBack />
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title={surah.banglaName} showBack />

      <main className="max-w-lg mx-auto px-4 py-4 space-y-4">
        <Card className="p-6 bg-gradient-primary text-primary-foreground">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-arabic mb-2">{surah.arabicName}</h1>
            <h2 className="text-xl font-semibold">{surah.banglaName}</h2>
            <p className="text-sm opacity-90">{surah.banglaMeaning}</p>
            <div className="flex items-center justify-center gap-4 pt-2">
              <Badge variant="secondary" className="bg-white/20 text-white">
                {surah.verses} আয়াত
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white">
                {surah.revelation}
              </Badge>
            </div>
          </div>
        </Card>

        <Button onClick={playAudio} className="w-full gap-2">
          <Volume2 className="h-4 w-4" />
          তেলাওয়াত শুনুন
        </Button>

        {loading ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">আয়াত লোড হচ্ছে...</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {verses.map((verse) => {
              const verseKey = `${id}-${verse.numberInSurah}`;
              const isBookmarked = bookmarkedVerses.includes(verseKey);
              
              return (
                <Card key={verse.numberInSurah} className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      {verse.numberInSurah}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleBookmark(verseKey)}
                    >
                      {isBookmarked ? (
                        <Bookmark className="h-4 w-4 fill-current text-primary" />
                      ) : (
                        <BookmarkPlus className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  
                  <div className="text-right py-4 px-2 bg-muted/30 rounded-lg">
                    <p className="text-2xl leading-loose font-arabic text-primary">
                      {verse.text}
                    </p>
                  </div>
                  
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {verse.translation}
                  </p>
                </Card>
              );
            })}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default SurahDetail;
