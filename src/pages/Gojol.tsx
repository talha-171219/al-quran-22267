import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, ImageIcon } from "lucide-react";

const Gojol = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="Islamic Gojol" showBack />

      <main className="max-w-lg mx-auto px-4 py-8 space-y-6">
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/20 rounded-full">
              <ImageIcon className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">Islamic Gojol • গজল</h3>
              <p className="text-sm text-muted-foreground">এই পেজে গজল সম্পর্কিত কন্টেন্ট যোগ করা হবে।</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 text-center">
          <Bookmark className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="font-semibold text-lg mb-2">COMING SOON</h3>
          <p className="text-muted-foreground mb-4">গজল কন্টেন্ট শীঘ্রই যোগ করা হবে।</p>
          <Button variant="ghost" size="sm">আপডেট নোটিফাই</Button>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default Gojol;
