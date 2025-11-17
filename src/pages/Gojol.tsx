import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, ImageIcon, BookOpen, Music } from "lucide-react";
import { Link } from "react-router-dom";
import headerImg from "@/assets/explore-banner.jpg";
import YouTubePreview from "@/components/gojol/YouTubePreview";

const Gojol = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="Islamic Gojol" showBack />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Header area replaced with a short-style video preview (autoplay when visible) */}
        <div className="relative h-44 rounded-lg overflow-hidden">
          <YouTubePreview
            videoUrl="https://youtu.be/-uzp4xkqTRg?si=Y2gyonpJyrcrVDqN"
            visibilityThreshold={0.4}
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        {/* Sections as buttons */}
        <div className="grid grid-cols-1 gap-4">
          <Card className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-md">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Arabic Nasheed • আরবী নাশিদ</h3>
                <p className="text-sm text-muted-foreground">আরবীতে গজল তালিকা এবং টেক্সট</p>
              </div>
            </div>
            <Link to="/gojol/arabic">
              <Button size="sm">Open</Button>
            </Link>
          </Card>

          <Card className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-md">
                <ImageIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Bangla Gojol • বাংলা গজল</h3>
                <p className="text-sm text-muted-foreground">বাংলা অনুবাদসহ গজল তালিকা</p>
              </div>
            </div>
            <Link to="/gojol/bangla">
              <Button size="sm">Open</Button>
            </Link>
          </Card>

          <Card className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-md">
                <Music className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Simple Sound Gojol • সিম্পল সাউন্ড</h3>
                <p className="text-sm text-muted-foreground">সহজ সাউন্ড প্লেয়ারের মাধ্যমে গজল শুনুন</p>
              </div>
            </div>
            <Link to="/gojol/sound">
              <Button size="sm">Open</Button>
            </Link>
          </Card>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Gojol;
