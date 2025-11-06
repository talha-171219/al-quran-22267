import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bookmark, Share2, Copy, Loader2 } from "lucide-react";
import { getHadithByNumber } from "@/services/bukhariApi";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const HadithDetailPage = () => {
  const { bookId, chapterId, hadithId } = useParams<{
    bookId: string;
    chapterId: string;
    hadithId: string;
  }>();

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [hadith, setHadith] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Get user ID
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id || null);
    };
    getUser();
  }, []);

  // Load hadith data
  useEffect(() => {
    if (bookId !== "bukhari" || !hadithId) {
      setLoading(false);
      return;
    }
    
    const loadHadith = async () => {
      setLoading(true);
      try {
        const fetchedHadith = await getHadithByNumber(hadithId);
        setHadith(fetchedHadith);
      } catch (error) {
        toast.error("হাদিস লোড করতে সমস্যা হয়েছে");
      } finally {
        setLoading(false);
      }
    };
    
    loadHadith();
  }, [bookId, hadithId]);

  // Load bookmark status
  useEffect(() => {
    const loadBookmark = async () => {
      if (!userId || !hadithId) return;

      const { data } = await supabase
        .from("hadith_bookmarks")
        .select("id")
        .eq("user_id", userId)
        .eq("hadith_id", hadithId)
        .single();

      setIsBookmarked(!!data);
    };
    loadBookmark();
  }, [userId, hadithId]);

  const toggleBookmark = async () => {
    if (!userId) {
      toast.error("বুকমার্ক করতে লগইন করুন");
      return;
    }

    if (isBookmarked) {
      await supabase
        .from("hadith_bookmarks")
        .delete()
        .eq("user_id", userId)
        .eq("hadith_id", hadithId);

      setIsBookmarked(false);
      toast.success("বুকমার্ক সরানো হয়েছে");
    } else {
      await supabase
        .from("hadith_bookmarks")
        .insert({ user_id: userId, hadith_id: hadithId });

      setIsBookmarked(true);
      toast.success("বুকমার্ক যুক্ত হয়েছে");
    }
  };

  const copyText = () => {
    if (!hadith) return;

    const text = `${hadith.arabic}\n\n${hadith.bangla}\n\nসূত্র: ${hadith.reference}`;
    navigator.clipboard.writeText(text);
    toast.success("কপি করা হয়েছে");
  };

  const shareHadith = async () => {
    if (!hadith) return;

    const text = `${hadith.arabic}\n\n${hadith.bangla}\n\nসূত্র: ${hadith.reference}`;

    if (navigator.share) {
      try {
        await navigator.share({ text });
      } catch (err) {
        copyText();
      }
    } else {
      copyText();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <TopBar title="হাদিস বিস্তারিত" showBack />
        <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
          {/* Header skeleton */}
          <Card className="animate-pulse bg-gradient-primary">
            <div className="h-24"></div>
          </Card>
          {/* Action buttons skeleton */}
          <div className="flex gap-2">
            <div className="flex-1 h-10 bg-muted rounded animate-pulse"></div>
            <div className="h-10 w-20 bg-muted rounded animate-pulse"></div>
            <div className="h-10 w-20 bg-muted rounded animate-pulse"></div>
          </div>
          {/* Content skeleton */}
          <Card className="animate-pulse">
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-24"></div>
                <div className="h-32 bg-muted/50 rounded"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-32"></div>
                <div className="h-24 bg-muted/30 rounded"></div>
              </div>
            </div>
          </Card>
        </div>
        <BottomNav />
      </div>
    );
  }

  if (!hadith) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <TopBar title="হাদিস বিস্তারিত" showBack />
        <div className="max-w-lg mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground">হাদিস পাওয়া যায়নি</p>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="হাদিস বিস্তারিত" showBack />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {/* Header Info */}
        <Card className="bg-gradient-primary text-primary-foreground border-2">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">{hadith.chapterEnglish}</h2>
                <p className="text-sm text-primary-foreground/80">
                  {hadith.reference}
                </p>
              </div>
              <Badge variant="secondary" className="bg-white/20">
                হাদিস নং: {hadith.hadithNumber}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleBookmark}
            className="flex-1"
          >
            <Bookmark
              className={`h-4 w-4 mr-2 ${
                isBookmarked ? "fill-primary" : ""
              }`}
            />
            {isBookmarked ? "সেভ করা হয়েছে" : "সেভ করুন"}
          </Button>
          <Button variant="outline" size="sm" onClick={copyText}>
            <Copy className="h-4 w-4 mr-2" />
            কপি
          </Button>
          <Button variant="outline" size="sm" onClick={shareHadith}>
            <Share2 className="h-4 w-4 mr-2" />
            শেয়ার
          </Button>
        </div>

        {/* Hadith Content */}
        <Card>
          <CardContent className="pt-6 space-y-6">
            {/* Arabic Text */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary mb-3">
                <span>আরবি মূল</span>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="text-right text-xl leading-loose font-arabic" dir="rtl">
                  {hadith.arabic}
                </p>
              </div>
            </div>

            {/* Bangla Translation */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary mb-3">
                <span>বাংলা অনুবাদ</span>
              </div>
              <p className="text-base leading-relaxed text-foreground">
                {hadith.bangla}
              </p>
            </div>

            {/* Reference */}
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold">সূত্র:</span> {hadith.reference}
              </p>
            </div>
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default HadithDetailPage;
