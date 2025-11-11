import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/card";
import { Image } from "lucide-react";

const Gallery = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="Gallery - গ্যালারি" showBack />

      <main className="max-w-lg mx-auto px-4 py-8">
        <Card className="p-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="p-6 bg-gradient-to-br from-rose-500 to-red-600 rounded-full">
              <Image className="h-12 w-12 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Islamic Gallery</h3>
              <p className="text-sm text-muted-foreground">
                Islamic images and media gallery coming soon
              </p>
            </div>
          </div>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default Gallery;
