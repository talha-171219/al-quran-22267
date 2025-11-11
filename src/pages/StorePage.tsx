import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/card";
import { Store } from "lucide-react";

const StorePage = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="Store - স্টোর" showBack />

      <main className="max-w-lg mx-auto px-4 py-8">
        <Card className="p-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="p-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full">
              <Store className="h-12 w-12 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Islamic Store</h3>
              <p className="text-sm text-muted-foreground">
                Islamic products and resources coming soon
              </p>
            </div>
          </div>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default StorePage;
