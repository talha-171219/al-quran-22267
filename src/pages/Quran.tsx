import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

const Quran = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="Al-Quran" showBack />

      <main className="max-w-lg mx-auto px-4 py-8">
        <Card className="p-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="p-6 bg-gradient-primary rounded-full">
              <BookOpen className="h-12 w-12 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Quran Reader</h3>
              <p className="text-sm text-muted-foreground">
                Full Quran reading experience coming soon
              </p>
            </div>
          </div>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default Quran;
