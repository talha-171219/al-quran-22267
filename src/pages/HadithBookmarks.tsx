import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { bukhariHadiths } from "@/data/hadiths";
import { toast } from "sonner";

interface BookmarkedHadith {
  id: string;
  hadith_id: string;
}

const HadithBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<BookmarkedHadith[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id || null);
    };
    getUser();
  }, []);

  useEffect(() => {
    const loadBookmarks = async () => {
      if (!userId) return;

      const { data } = await supabase
        .from("hadith_bookmarks")
        .select("*")
        .eq("user_id", userId);

      if (data) {
        setBookmarks(data);
      }
    };
    loadBookmarks();
  }, [userId]);

  const removeBookmark = async (bookmarkId: string, hadithId: string) => {
    await supabase.from("hadith_bookmarks").delete().eq("id", bookmarkId);

    setBookmarks((prev) => prev.filter((b) => b.id !== bookmarkId));
    toast.success("বুকমার্ক সরানো হয়েছে");
  };

  const bookmarkedHadiths = bookmarks
    .map((b) => bukhariHadiths.find((h) => h.id === b.hadith_id))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="প্রিয় তালিকা" showBack />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {bookmarkedHadiths.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="pt-6 text-center">
              <Bookmark className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">কোনো বুকমার্ক নেই</p>
              <p className="text-sm text-muted-foreground mt-1">
                হাদিস বুকমার্ক করতে ⭐ আইকনে ক্লিক করুন
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {bookmarkedHadiths.map((hadith, idx) => {
              if (!hadith) return null;
              
              return (
                <Card key={hadith.id} className="border-l-4 border-l-primary">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="secondary">
                        হাদিস নং: {hadith.hadithNumber}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          removeBookmark(bookmarks[idx].id, hadith.id)
                        }
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>

                    <Link
                      to={`/hadith/detail/${hadith.bookId}/${hadith.chapterId}/${hadith.id}`}
                    >
                      <div className="p-3 bg-muted/30 rounded-lg mb-3">
                        <p
                          className="text-right text-base leading-loose font-arabic line-clamp-2"
                          dir="rtl"
                        >
                          {hadith.arabic}
                        </p>
                      </div>

                      <p className="text-sm text-foreground/80 line-clamp-3">
                        {hadith.bangla}
                      </p>

                      <p className="text-xs text-muted-foreground mt-2">
                        {hadith.chapterName}
                      </p>
                    </Link>
                  </CardContent>
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

export default HadithBookmarks;
