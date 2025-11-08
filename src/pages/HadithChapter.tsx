import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, X, Bookmark } from "lucide-react";
import { 
  getChapterHadiths as getBukhariChapterHadiths, 
  prefetchNextPage as prefetchBukhariNextPage 
} from "@/services/bukhariApi";
import { 
  getChapterHadiths as getTirmidhiChapterHadiths, 
  prefetchNextPage as prefetchTirmidhiNextPage 
} from "@/services/tirmidhiApi";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const HadithChapter = () => {
  const { bookId, chapterId } = useParams<{ bookId: string; chapterId: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  const [userId, setUserId] = useState<string | null>(null);
  const [hadiths, setHadiths] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Get user ID
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id || null);
    };
    getUser();
  }, []);

  // Load bookmarks
  useEffect(() => {
    const loadBookmarks = async () => {
      if (!userId) return;
      
      const { data } = await supabase
        .from("hadith_bookmarks")
        .select("hadith_id")
        .eq("user_id", userId);

      if (data) {
        setBookmarks(new Set(data.map((b) => b.hadith_id)));
      }
    };
    loadBookmarks();
  }, [userId]);

  // Load hadiths for chapter with prefetching (initial load: 20 for fast render)
  useEffect(() => {
    if (!bookId || !chapterId) return;
    if (bookId !== "bukhari" && bookId !== "tirmidhi") return;
    
    const loadHadiths = async () => {
      setLoading(true);
      try {
        // Load first 20 hadiths for instant display
        const getChapterHadiths = bookId === "bukhari" ? getBukhariChapterHadiths : getTirmidhiChapterHadiths;
        const { hadiths: fetchedHadiths, hasMore: more } = await getChapterHadiths(chapterId, 1, 20);
        setHadiths(fetchedHadiths);
        setHasMore(more);
        setPage(1);
        
        // Prefetch next page in background for smooth scroll
        if (more) {
          const prefetchNextPage = bookId === "bukhari" ? prefetchBukhariNextPage : prefetchTirmidhiNextPage;
          prefetchNextPage(chapterId, 2, 20);
        }
      } catch (error) {
        toast.error("হাদিস লোড করতে সমস্যা হয়েছে");
      } finally {
        setLoading(false);
      }
    };
    
    loadHadiths();
  }, [bookId, chapterId]);

  // Infinite scroll - load 20 hadiths at a time for smooth experience
  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore || searchQuery || !bookId || !chapterId) return;
    if (bookId !== "bukhari" && bookId !== "tirmidhi") return;
    
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const getChapterHadiths = bookId === "bukhari" ? getBukhariChapterHadiths : getTirmidhiChapterHadiths;
      const { hadiths: moreHadiths, hasMore: more } = await getChapterHadiths(chapterId, nextPage, 20);
      setHadiths((prev) => [...prev, ...moreHadiths]);
      setPage(nextPage);
      setHasMore(more);
      
      // Prefetch next page in background
      if (more) {
        const prefetchNextPage = bookId === "bukhari" ? prefetchBukhariNextPage : prefetchTirmidhiNextPage;
        prefetchNextPage(chapterId, nextPage + 1, 20);
      }
    } catch (error) {
      console.error("Load more error:", error);
      toast.error("আরো হাদিস লোড করতে সমস্যা হয়েছে");
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, hasMore, page, bookId, chapterId, searchQuery]);

  // Setup intersection observer for infinite scroll
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore && hadiths.length > 0) {
          console.log("Loading more hadiths...", { page, totalHadiths: hadiths.length });
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: "200px" }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMore, hasMore, loadingMore, hadiths.length, page]);

  // Filter hadiths by search
  const filteredHadiths = searchQuery.trim()
    ? hadiths.filter((h) =>
        h.bangla.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.arabic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.hadithNumber.includes(searchQuery)
      )
    : hadiths;

  // সহীহ বুখারী - বাংলা অধ্যায়ের নাম
  const bukhariChapterNames: Record<string, string> = {
    '1': 'ওহী শুরু হওয়ার বর্ণনা', '2': 'ঈমান', '3': 'ইলম (জ্ঞান)', '4': 'ওযু', '5': 'গোসল',
    '6': 'হায়েয', '7': 'তায়াম্মুম', '8': 'সালাত', '9': 'সালাতের ওয়াক্তসমূহ', '10': 'আযান',
    '11': 'জুমআ', '12': 'ভয়ের সালাত', '13': 'ঈদ', '14': 'বিতর', '15': 'ইস্তিসকা',
    '16': 'কুসুফ (সূর্যগ্রহণ)', '17': 'সিজদা', '18': 'সালাত সংক্ষিপ্তকরণ', '19': 'তাহাজ্জুদ', '20': 'সালাতে দুআ',
    '21': 'আমল বিল লাইল', '22': 'মসজিদসমূহের ফযিলত', '23': 'জানাযা', '24': 'যাকাত', '25': 'হজ্জ',
    '26': 'উমরা', '27': 'মুহসার', '28': 'জাযায়ে সায়েদ', '29': 'ফাযায়েলে মদীনা', '30': 'সাওম (রোযা)',
    '31': 'তারাবীহ', '32': 'ইতিকাফ', '33': 'বিক্রয়', '34': 'সালাম', '35': 'শুফআ',
    '36': 'ইজারা', '37': 'হাওয়ালা', '38': 'কাফালত', '39': 'ওয়াকালা', '40': 'কৃষিকাজ',
    '41': 'পানি সেচ', '42': 'ঋণ', '43': 'হাওয়ালা ও মাজলুম', '44': 'সন্ধি', '45': 'শর্ত',
    '46': 'অসিয়ত', '47': 'জিহাদ', '48': 'সৃষ্টির সূচনা', '49': 'আম্বিয়া কিরাম', '50': 'মানাকিব',
    '51': 'ফাযায়েলে সাহাবা', '52': 'মদীনার ফযিলত', '53': 'মাগাজি', '54': 'মানাকিবুল আনসার', '55': 'খুমুস',
    '56': 'জিযিয়া', '57': 'সৃষ্টির সূচনা', '58': 'নবীদের ঘটনা', '59': 'ফাযায়েল', '60': 'সাহাবিদের ফযিলত',
    '61': 'খায়বার যুদ্ধ', '62': 'মাগাজি বিবরণ', '63': 'মানাকিবুল আনসার', '64': 'খুমুস বন্টন', '65': 'জিযিয়া ও যুদ্ধবিরতি',
    '66': 'কুরআনের ফযিলত', '67': 'বিবাহ', '68': 'তালাক', '69': 'ভরণপোষণ', '70': 'খাদ্য',
    '71': 'আকিকা', '72': 'জবেহ ও শিকার', '73': 'কুরবানী', '74': 'পানীয়', '75': 'রোগী',
    '76': 'চিকিৎসা', '77': 'পোশাক', '78': 'আদব', '79': 'অনুমতি চাওয়া', '80': 'দুআ',
    '81': 'রিকাক', '82': 'কদর', '83': 'শপথ ও মানত', '84': 'কসম', '85': 'উত্তরাধিকার',
    '86': 'হুদুদ', '87': 'দিয়াত', '88': 'মুহারিবীন', '89': 'ফিতান', '90': 'আহকাম',
    '91': 'ইচ্ছাপূরণ', '92': 'কসম ও মানত', '93': 'তাওহীদ', '94': 'ইতিসাম', '95': 'কদর ও তাকদীর',
    '96': 'ইলম (জ্ঞানের ফযিলত)', '97': 'তাওহীদের মূলনীতি',
  };

  // জামি আত-তিরমিযি - বাংলা অধ্যায়ের নাম (৪৯টি অধ্যায়)
  const tirmidhiChapterNames: Record<string, string> = {
    '1': 'পবিত্রতা', '2': 'সালাত', '3': 'বিতর', '4': 'জুমআ', '5': 'দুই ঈদ',
    '6': 'সফর', '7': 'যাকাত', '8': 'সাওম (রোযা)', '9': 'হজ্জ', '10': 'জানাযা',
    '11': 'বিবাহ', '12': 'দুধপান', '13': 'তালাক ও লিআন', '14': 'ব্যবসা-বাণিজ্য', '15': 'বিচার-আচার',
    '16': 'দিয়াত (রক্তমূল্য)', '17': 'হুদুদ (শাস্তি)', '18': 'শিকার ও জবেহ', '19': 'কুরবানী', '20': 'মানত ও শপথ',
    '21': 'যুদ্ধ অভিযান', '22': 'জিহাদের ফযিলত', '23': 'জিহাদ', '24': 'পোশাক', '25': 'খাদ্য',
    '26': 'পানীয়', '27': 'সৎকাজ ও আত্মীয়তার সম্পর্ক', '28': 'চিকিৎসা', '29': 'মীরাস (উত্তরাধিকার)', '30': 'অসিয়ত',
    '31': 'ওয়ালা ও হাদিয়া', '32': 'তাকদীর', '33': 'ফিতনা', '34': 'স্বপ্ন', '35': 'সাক্ষী',
    '36': 'যুহুদ', '37': 'কিয়ামতের বর্ণনা', '38': 'জান্নাতের বর্ণনা', '39': 'জাহান্নামের বর্ণনা', '40': 'ঈমান',
    '41': 'ইলম (জ্ঞান)', '42': 'অনুমতি চাওয়া ও আদব', '43': 'আদব', '44': 'উপমা', '45': 'কুরআনের ফযিলত',
    '46': 'তিলাওয়াত', '47': 'তাফসীর', '48': 'দুআ', '49': 'মানাকিব (ফযিলত)',
  };

  // Select appropriate chapter names based on book
  const chapterNamesDict = bookId === 'bukhari' ? bukhariChapterNames : tirmidhiChapterNames;
  const chapterName = chapterNamesDict[chapterId || ''] || "অধ্যায়";

  const toggleBookmark = async (hadithId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!userId) {
      toast.error("বুকমার্ক করতে লগইন করুন");
      return;
    }

    if (bookmarks.has(hadithId)) {
      // Remove bookmark
      await supabase
        .from("hadith_bookmarks")
        .delete()
        .eq("user_id", userId)
        .eq("hadith_id", hadithId);

      setBookmarks((prev) => {
        const newSet = new Set(prev);
        newSet.delete(hadithId);
        return newSet;
      });
      toast.success("বুকমার্ক সরানো হয়েছে");
    } else {
      // Add bookmark
      await supabase
        .from("hadith_bookmarks")
        .insert({ user_id: userId, hadith_id: hadithId });

      setBookmarks((prev) => new Set(prev).add(hadithId));
      toast.success("বুকমার্ক যুক্ত হয়েছে");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <TopBar title="হাদিস লোড হচ্ছে..." showBack />
        <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
          {/* Fast loading progress */}
          <div className="text-center py-4">
            <div className="inline-flex items-center gap-2 text-muted-foreground mb-4">
              <div className="h-3 w-3 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="h-3 w-3 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="h-3 w-3 bg-primary rounded-full animate-bounce"></div>
            </div>
            <p className="text-sm text-muted-foreground">হাদিস লোড হচ্ছে...</p>
          </div>
          
          {/* Improved skeleton cards */}
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse border-l-4 border-l-muted" style={{animationDelay: `${i * 0.1}s`}}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="h-6 bg-muted rounded-full w-28"></div>
                  <div className="h-8 w-8 bg-muted/50 rounded"></div>
                </div>
                <div className="p-3 bg-muted/20 rounded-lg mb-3">
                  <div className="h-4 bg-muted rounded w-full mb-2"></div>
                  <div className="h-4 bg-muted rounded w-4/5"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-muted/60 rounded w-full"></div>
                  <div className="h-3 bg-muted/60 rounded w-5/6"></div>
                  <div className="h-3 bg-muted/60 rounded w-3/4"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title={chapterName} showBack />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="আরবি বা বাংলায় সার্চ করুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10 h-12"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Hadiths List */}
        <div className="space-y-4">
          {filteredHadiths.map((hadith) => (
            <Link
              key={hadith.id}
              to={`/hadith/detail/${bookId}/${chapterId}/${hadith.id}`}
              className="block"
            >
              <Card className="hover:shadow-md transition-shadow border-l-4 border-l-primary">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="secondary">হাদিস নং: {hadith.hadithNumber}</Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => toggleBookmark(hadith.id, e)}
                      className="h-8 w-8 p-0"
                    >
                      <Bookmark
                        className={`h-4 w-4 ${
                          bookmarks.has(hadith.id)
                            ? "fill-primary text-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                    </Button>
                  </div>

                  {/* Arabic Text - Preview */}
                  <div className="p-3 bg-muted/30 rounded-lg mb-3">
                    <p className="text-right text-base leading-loose font-arabic line-clamp-2" dir="rtl">
                      {hadith.arabic}
                    </p>
                  </div>

                  {/* Bangla Translation - Preview */}
                  <p className="text-sm text-foreground/80 line-clamp-3">
                    {hadith.bangla}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredHadiths.length === 0 && !loadingMore && (
          <Card className="border-dashed">
            <CardContent className="pt-6 text-center text-muted-foreground">
              <p>কোনো হাদিস খুঁজে পাওয়া যায়নি</p>
            </CardContent>
          </Card>
        )}

        {/* Smooth infinite scroll loading - appears as user scrolls */}
        {!searchQuery && hasMore && (
          <div ref={loadMoreRef} className="py-8 min-h-[200px]">
            {loadingMore ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2 text-primary mb-4">
                  <div className="h-3 w-3 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="h-3 w-3 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="h-3 w-3 bg-primary rounded-full animate-bounce"></div>
                  <span className="text-sm ml-2 font-medium">আরও হাদিস লোড হচ্ছে...</span>
                </div>
                {/* Mini skeleton while loading more */}
                {[1, 2].map((i) => (
                  <Card key={i} className="animate-pulse border-l-4 border-l-muted/50">
                    <CardContent className="pt-6">
                      <div className="h-4 bg-muted/50 rounded w-24 mb-3"></div>
                      <div className="h-16 bg-muted/30 rounded mb-2"></div>
                      <div className="h-3 bg-muted/40 rounded w-full mb-1"></div>
                      <div className="h-3 bg-muted/40 rounded w-3/4"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-full text-primary font-medium">
                  <div className="h-2 w-2 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-sm">নিচে স্ক্রল করুন আরও হাদিস দেখতে</span>
                </div>
              </div>
            )}
          </div>
        )}
        
        {!searchQuery && !hasMore && hadiths.length > 0 && (
          <div className="py-6 text-center">
            <p className="text-muted-foreground text-sm">সব হাদিস লোড হয়ে গেছে</p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default HadithChapter;
