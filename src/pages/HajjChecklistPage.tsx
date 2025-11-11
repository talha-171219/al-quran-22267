import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { HajjChecklist } from "@/components/hajj/HajjChecklist";

const HajjChecklistPage = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="হজের চেকলিস্ট" showBack />

      <main className="max-w-lg mx-auto px-4 py-6">
        <HajjChecklist />
      </main>

      <BottomNav />
    </div>
  );
};

export default HajjChecklistPage;
