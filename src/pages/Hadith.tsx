import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollText, Search, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";
import { hadithCollections } from "@/data/hadiths";
import { cn } from "@/lib/utils";

const Hadith = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="হাদিস শরীফ" showBack />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {/* Quick Access Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Link to="/hadith/search">
            <Card className="bg-primary/10 border-2 border-primary/20 hover:border-primary/40 transition-all cursor-pointer">
              <CardContent className="pt-6 text-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="p-3 bg-primary/20 rounded-full">
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                  <span className="font-semibold text-primary">খুঁজুন</span>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/hadith/bookmarks">
            <Card className="bg-accent/10 border-2 border-accent/20 hover:border-accent/40 transition-all cursor-pointer">
              <CardContent className="pt-6 text-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="p-3 bg-accent/20 rounded-full">
                    <Bookmark className="h-6 w-6 text-accent" />
                  </div>
                  <span className="font-semibold text-accent">প্রিয় তালিকা</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Header Card */}
        <Card className="border-2 bg-gradient-primary text-primary-foreground">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-3">
              <div className="p-4 bg-white/10 rounded-full">
                <ScrollText className="h-10 w-10" />
              </div>
            </div>
            <CardTitle className="text-2xl">হাদিসের বইসমূহ</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              সহীহ হাদিসের নির্ভরযোগ্য সংকলন
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Hadith Collections */}
        <div className="space-y-3">
          {hadithCollections.map((collection, index) => (
            <Link
              key={collection.id}
              to={`/hadith/book/${collection.id}`}
              className="block"
            >
              <Card
                className={cn(
                  "transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
                  "border-2 hover:border-primary/30 cursor-pointer",
                  index === 0 && "bg-gradient-to-br from-primary/5 to-transparent"
                )}
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                      {collection.nameBangla.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">
                        {collection.nameBangla}
                      </CardTitle>
                      <CardDescription className="text-sm mb-2">
                        {collection.description}
                      </CardDescription>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <ScrollText className="h-3 w-3" />
                        <span>মোট হাদিস: {collection.totalHadith.toLocaleString('bn-BD')}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>

        {/* Info Card */}
        <Card className="bg-muted/50 border-dashed">
          <CardContent className="pt-6 text-center text-sm text-muted-foreground">
            <p>
              আরও হাদিস সংকলন শীঘ্রই যুক্ত হবে ইনশাআল্লাহ
            </p>
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default Hadith;
