import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const NinetyNineNames = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="99 Names - আল্লাহর ৯৯ নাম" showBack />

      <main className="max-w-lg mx-auto px-4 py-8">
        <Card className="p-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="p-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full">
              <Star className="h-12 w-12 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Allah's 99 Names</h3>
              <p className="text-sm text-muted-foreground">
                Names and attributes of Allah coming soon
              </p>
            </div>
          </div>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default NinetyNineNames;
