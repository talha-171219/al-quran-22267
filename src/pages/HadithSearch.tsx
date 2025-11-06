import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, X, Bookmark, Loader2 } from "lucide-react";
import { searchHadiths } from "@/services/bukhariApi";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const HadithSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  const [userId, setUserId] = useState<string | null>(null);

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

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error("অনুগ্রহ করে সার্চ করার জন্য কিছু লিখুন");
      return;
    }

    setLoading(true);
    setSearched(true);
    
    try {
      const foundHadiths = await searchHadiths(searchQuery);
      setResults(foundHadiths);
      
      if (foundHadiths.length === 0) {
        toast.info("কোনো হাদিস পাওয়া যায়নি");
      }
    } catch (error) {
      toast.error("সার্চ করতে সমস্যা হয়েছে");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleBookmark = async (hadithId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!userId) {
      toast.error("বুকমার্ক করতে লগইন করুন");
      return;
    }

    if (bookmarks.has(hadithId)) {
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
      await supabase
        .from("hadith_bookmarks")
        .insert({ user_id: userId, hadith_id: hadithId });

      setBookmarks((prev) => new Set(prev).add(hadithId));
      toast.success("বুকমার্ক যুক্ত হয়েছে");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="হাদিস খুঁজুন" showBack />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {/* Search Input */}
        <Card className="border-2 border-primary/20">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="আরবি, বাংলা বা হাদিস নম্বর লিখুন..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-10 pr-10 h-12 text-base"
                  disabled={loading}
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setResults([]);
                      setSearched(false);
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <X className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                  </button>
                )}
              </div>
              
              <Button 
                onClick={handleSearch} 
                disabled={loading || !searchQuery.trim()}
                className="w-full h-11"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    খুঁজছি...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    সার্চ করুন
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Search Tips */}
        {!searched && (
          <Card className="bg-muted/30 border-dashed">
            <CardContent className="pt-6">
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground mb-2">সার্চ টিপস:</p>
                <ul className="space-y-1.5 list-disc list-inside">
                  <li>আরবি বা বাংলা টেক্সট দিয়ে সার্চ করুন</li>
                  <li>হাদিস নম্বর দিয়ে সরাসরি খুঁজুন</li>
                  <li>সর্বোচ্চ ৫০টি ফলাফল দেখানো হবে</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">হাদিস খুঁজছি...</p>
            </div>
          </div>
        )}

        {/* Search Results */}
        {!loading && searched && results.length > 0 && (
          <>
            <div className="flex items-center justify-between px-1">
              <p className="text-sm text-muted-foreground">
                {results.length.toLocaleString('bn-BD')}টি হাদিস পাওয়া গেছে
              </p>
            </div>
            
            <div className="space-y-4">
              {results.map((hadith) => (
                <Link
                  key={hadith.id}
                  to={`/hadith/detail/bukhari/${hadith.chapterNumber}/${hadith.id}`}
                  className="block"
                >
                  <Card className="hover:shadow-md transition-shadow border-l-4 border-l-primary">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex flex-col gap-1">
                          <Badge variant="secondary">হাদিস নং: {hadith.hadithNumber}</Badge>
                          <span className="text-xs text-muted-foreground">
                            অধ্যায়: {hadith.chapterNumber}
                          </span>
                        </div>
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
                        <p className="text-right text-base leading-loose font-arabic line-clamp-3" dir="rtl">
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
          </>
        )}

        {/* No Results */}
        {!loading && searched && results.length === 0 && (
          <Card className="border-dashed">
            <CardContent className="pt-6 text-center">
              <div className="flex flex-col items-center gap-3 py-8">
                <div className="p-4 bg-muted/50 rounded-full">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-semibold mb-1">কোনো হাদিস পাওয়া যায়নি</p>
                  <p className="text-sm text-muted-foreground">
                    অন্য শব্দ দিয়ে চেষ্টা করুন
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default HadithSearch;
