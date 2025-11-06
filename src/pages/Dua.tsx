import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Copy, BookmarkPlus, Bookmark as BookmarkIcon } from "lucide-react";
import { duaList } from "@/data/duas";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const Dua = () => {
  const [search, setSearch] = useState("");
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [showBookmarked, setShowBookmarked] = useState(false);

  const filteredDuas = (showBookmarked ? duaList.filter(d => bookmarks.includes(d.id)) : duaList).filter(
    (dua) =>
      dua.arabic.includes(search) ||
      dua.bangla.toLowerCase().includes(search.toLowerCase()) ||
      (dua.category && dua.category.toLowerCase().includes(search.toLowerCase()))
  );

  const toggleBookmark = (id: number) => {
    setBookmarks(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
    toast.success(bookmarks.includes(id) ? "বুকমার্ক সরানো হয়েছে" : "বুকমার্ক যুক্ত হয়েছে");
  };

  const copyDua = async (dua: typeof duaList[0]) => {
    try {
      await navigator.clipboard.writeText(`${dua.arabic}\n\n${dua.bangla}`);
      toast.success("কপি করা হয়েছে");
    } catch {
      toast.error("কপি ব্যর্থ হয়েছে");
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="দু'আ ও আজকার" showBack />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="দু'আ খুঁজুন..."
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

        {filteredDuas.map((dua) => (
          <Card key={dua.id} className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm text-muted-foreground">
                দু'আ #{dua.id}
              </h3>
              {dua.category && <Badge variant="secondary">{dua.category}</Badge>}
            </div>
            <div className="text-right py-4 px-2 bg-muted/30 rounded-lg">
              <p className="text-2xl leading-loose font-arabic text-primary">
                {dua.arabic}
              </p>
            </div>
            <p className="text-sm leading-relaxed">
              {dua.bangla}
            </p>
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleBookmark(dua.id)}
                className="gap-2"
              >
                {bookmarks.includes(dua.id) ? (
                  <BookmarkIcon className="h-4 w-4 fill-current" />
                ) : (
                  <BookmarkPlus className="h-4 w-4" />
                )}
                {bookmarks.includes(dua.id) ? "বুকমার্ক করা" : "বুকমার্ক"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyDua(dua)}
                className="gap-2"
              >
                <Copy className="h-4 w-4" />
                কপি
              </Button>
            </div>
          </Card>
        ))}
      </main>

      <BottomNav />
    </div>
  );
};

export default Dua;
