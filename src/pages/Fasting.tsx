import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/card";
import { Wheat } from "lucide-react";

const Fasting = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="Fasting - রোজা" showBack />

      <main className="max-w-lg mx-auto px-4 py-8">
        <Card className="p-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="p-6 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full">
              <Wheat className="h-12 w-12 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Fasting Guide</h3>
              <p className="text-sm text-muted-foreground">
                Ramadan and fasting information coming soon
              </p>
            </div>
          </div>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default Fasting;
