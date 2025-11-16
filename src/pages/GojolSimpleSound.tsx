import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GojolSimpleSound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="Simple Sound Gojol" showBack />

      <main className="max-w-lg mx-auto px-4 py-8 space-y-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-2">Simple Sound Gojol</h2>
          <p className="text-sm text-muted-foreground mb-4">এখানে সিম্পল প্লেয়ার এবং অডিও তালিকা থাকবে।</p>
          <div className="flex gap-2">
            <Button onClick={() => navigate(-1)} variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </Button>
          </div>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default GojolSimpleSound;
