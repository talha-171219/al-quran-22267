import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { BottomNav } from "@/components/layout/BottomNav";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
        <div className="text-center space-y-6">
          <div className="text-8xl font-bold text-primary/20">404</div>
          <h1 className="text-2xl font-bold text-foreground">পৃষ্ঠা খুঁজে পাওয়া যায়নি</h1>
          <p className="text-muted-foreground max-w-md">
            দুঃখিত, আপনি যে পৃষ্ঠাটি খুঁজছেন তা বিদ্যমান নেই বা সরানো হয়েছে।
          </p>
          <Button asChild className="mt-4">
            <Link to="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              হোম পেইজে ফিরে যান
            </Link>
          </Button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default NotFound;
