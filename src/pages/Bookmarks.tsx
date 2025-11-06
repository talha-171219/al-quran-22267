import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookmarkCheck, Trash2 } from "lucide-react";
import { surahList } from "@/data/surahs";
import { toast } from "sonner";

const Bookmarks = () => {
  const [bookmarkedVerses, setBookmarkedVerses] = useState<string[]>([]);

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

    // Listen for storage changes
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

  const removeBookmark = (verseKey: string) => {
    const updated = bookmarkedVerses.filter(v => v !== verseKey);
    setBookmarkedVerses(updated);
    try {
      localStorage.setItem("bookmarked-verses", JSON.stringify(updated));
      toast.success("বুকমার্ক সরানো হয়েছে");
    } catch (error) {
      console.error("Error removing bookmark:", error);
      toast.error("বুকমার্ক মুছতে সমস্যা হয়েছে");
    }
  };

  const clearAll = () => {
    setBookmarkedVerses([]);
    try {
      localStorage.setItem("bookmarked-verses", JSON.stringify([]));
      toast.success("সব বুকমার্ক সরানো হয়েছে");
    } catch (error) {
      console.error("Error clearing bookmarks:", error);
      toast.error("বুকমার্ক মুছতে সমস্যা হয়েছে");
    }
  };

  if (bookmarkedVerses.length === 0) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <TopBar title="বুকমার্ক" />

        <main className="max-w-lg mx-auto px-4 py-8">
          <Card className="p-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="p-6 bg-muted rounded-full">
                <BookmarkCheck className="h-12 w-12 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">কোন বুকমার্ক নেই</h3>
                <p className="text-sm text-muted-foreground">
                  আপনার প্রিয় আয়াত বুকমার্ক করুন
                </p>
              </div>
            </div>
          </Card>
        </main>

        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="বুকমার্ক" />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {bookmarkedVerses.length} টি বুকমার্ক করা আয়াত
          </p>
          <Button variant="ghost" size="sm" onClick={clearAll}>
            সব মুছুন
          </Button>
        </div>

        <div className="space-y-3">
          {bookmarkedVerses.map((verseKey) => {
            const [surahNum, verseNum] = verseKey.split("-").map(Number);
            const surah = surahList.find(s => s.number === surahNum);
            
            if (!surah) return null;

            return (
              <Card key={verseKey} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <Link 
                    to={`/surah/${surahNum}`}
                    className="flex-1"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{surah.banglaName}</Badge>
                        <span className="text-sm text-muted-foreground">
                          আয়াত {verseNum}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {surah.banglaMeaning}
                      </p>
                    </div>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      removeBookmark(verseKey);
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Bookmarks;
