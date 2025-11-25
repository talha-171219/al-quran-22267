import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Copy, BookmarkPlus, Bookmark as BookmarkIcon, Volume2, ChevronRight } from "lucide-react";
import { duaCategories } from "@/data/duas";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const Dua = () => {
  const [search, setSearch] = useState("");
  const [bookmarks, setBookmarks] = useState<number[]>(() => {
    const saved = localStorage.getItem("dua-bookmarks");
    return saved ? JSON.parse(saved) : [];
  });
  const [showBookmarked, setShowBookmarked] = useState(false);
  const [openCategories, setOpenCategories] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    setOpenCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const filteredCategories = duaCategories.map(category => ({
    ...category,
    duas: category.duas.filter(dua => {
      const matchesSearch = search === "" ||
        dua.arabic.includes(search) ||
        dua.bangla.toLowerCase().includes(search.toLowerCase()) ||
        dua.transliteration?.toLowerCase().includes(search.toLowerCase());
      
      const matchesBookmark = !showBookmarked || bookmarks.includes(dua.id);
      
      return matchesSearch && matchesBookmark;
    })
  })).filter(category => category.duas.length > 0);

  const toggleBookmark = (id: number) => {
    const newBookmarks = bookmarks.includes(id)
      ? bookmarks.filter(i => i !== id)
      : [...bookmarks, id];
    
    setBookmarks(newBookmarks);
    localStorage.setItem("dua-bookmarks", JSON.stringify(newBookmarks));
    toast.success(bookmarks.includes(id) ? "বুকমার্ক সরানো হয়েছে" : "বুকমার্ক যুক্ত হয়েছে");
  };

  const copyDua = async (dua: any) => {
    try {
      await navigator.clipboard.writeText(`${dua.arabic}\n\n${dua.bangla}`);
      toast.success("কপি করা হয়েছে");
    } catch {
      toast.error("কপি ব্যর্থ হয়েছে");
    }
  };

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    } else {
      toast.error("অডিও বাজানো সমর্থিত নয়");
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="দোয়া সমূহ" showBack />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {/* Header Card */}
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5">
          <h2 className="text-xl font-bold mb-2">হিসনুল মুসলিম</h2>
          <p className="text-sm text-muted-foreground">
            দৈনন্দিন জীবনের প্রয়োজনীয় দোয়া ও জিকির
          </p>
        </Card>

        {/* Search and Filter */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="দোয়া খুঁজুন..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button
            variant={showBookmarked ? "default" : "outline"}
            onClick={() => setShowBookmarked(!showBookmarked)}
          >
            <BookmarkIcon className="h-4 w-4" />
          </Button>
        </div>

        {/* Categories */}
        {filteredCategories.map((category) => (
          <Collapsible
            key={category.id}
            open={openCategories.includes(category.id)}
            onOpenChange={() => toggleCategory(category.id)}
          >
            <Card>
              <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{category.icon}</span>
                  <div className="text-left">
                    <h3 className="font-semibold">{category.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {category.duas.length} টি দোয়া
                    </p>
                  </div>
                </div>
                <ChevronRight 
                  className={`h-5 w-5 transition-transform ${
                    openCategories.includes(category.id) ? "rotate-90" : ""
                  }`}
                />
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <div className="p-4 pt-0 space-y-4">
                  {category.duas.map((dua) => (
                    <Card key={dua.id} className="p-4 space-y-3 bg-muted/30">
                      <div className="flex items-start justify-between gap-2">
                        {dua.reference && (
                          <Badge variant="outline" className="text-xs">
                            {dua.reference}
                          </Badge>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 flex-shrink-0"
                          onClick={() => toggleBookmark(dua.id)}
                        >
                          {bookmarks.includes(dua.id) ? (
                            <BookmarkIcon className="h-4 w-4 fill-current text-primary" />
                          ) : (
                            <BookmarkPlus className="h-4 w-4" />
                          )}
                        </Button>
                      </div>

                      <div className="text-right flex items-start justify-between gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => playAudio(dua.arabic)}
                          className="flex-shrink-0"
                        >
                          <Volume2 className="h-4 w-4" />
                        </Button>
                        <p className="text-xl leading-loose font-arabic text-primary flex-1">
                          {dua.arabic}
                        </p>
                      </div>

                      {dua.transliteration && (
                        <div className="text-sm text-muted-foreground italic bg-background/50 p-2 rounded">
                          {dua.transliteration}
                        </div>
                      )}

                      <p className="text-sm leading-relaxed">
                        {dua.bangla}
                      </p>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyDua(dua)}
                        className="w-full gap-2"
                      >
                        <Copy className="h-4 w-4" />
                        কপি করুন
                      </Button>
                    </Card>
                  ))}
                </div>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        ))}

        {filteredCategories.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">কোনো দোয়া পাওয়া যায়নি</p>
          </Card>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Dua;
