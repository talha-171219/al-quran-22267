import { useParams, Link } from "react-router-dom";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, ChevronRight } from "lucide-react";
import { hadithCollections } from "@/data/hadiths";
import { getBukhariChapters } from "@/services/bukhariApi";
import { getTirmidhiChapters } from "@/services/tirmidhiApi";
import { useEffect, useState } from "react";

// Chapter data for non-implemented books
const muslimChapters = [
  { id: "1", nameBangla: "ঈমান", nameEnglish: "Book of Faith", hadithCount: 0 },
  { id: "2", nameBangla: "পবিত্রতা", nameEnglish: "Book of Purification", hadithCount: 0 },
  { id: "3", nameBangla: "সালাত", nameEnglish: "Book of Prayer", hadithCount: 0 },
  { id: "4", nameBangla: "যাকাত", nameEnglish: "Book of Zakat", hadithCount: 0 },
];

const HadithBook = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const collection = hadithCollections.find((c) => c.id === bookId);
  const [chapters, setChapters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChapters = async () => {
      setLoading(true);
      try {
        if (bookId === "bukhari") {
          const bukhariChapters = await getBukhariChapters();
          setChapters(bukhariChapters);
        } else if (bookId === "tirmidhi") {
          const tirmidhiChapters = await getTirmidhiChapters();
          setChapters(tirmidhiChapters);
        } else if (bookId === "muslim") {
          setChapters(muslimChapters);
        }
      } catch (error) {
        console.error("Failed to load chapters:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadChapters();
  }, [bookId]);

  if (!collection) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <TopBar title="হাদিস" showBack />
        <div className="max-w-lg mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground">হাদিস সংকলন পাওয়া যায়নি</p>
        </div>
        <BottomNav />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <TopBar title={collection?.nameBangla || "হাদিস"} showBack />
        <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
          {/* Main Loading Card with Percentage */}
          <Card className="overflow-hidden border-2 border-primary/20">
            <CardContent className="pt-8 pb-6">
              <div className="flex flex-col items-center gap-6">
                <div className="relative">
                  <div className="h-20 w-20 bg-primary/20 rounded-2xl flex items-center justify-center">
                    <BookOpen className="h-10 w-10 text-primary animate-pulse" />
                  </div>
                </div>
                
                <div className="text-center space-y-2 w-full">
                  <p className="text-base font-semibold text-primary">হাদিস গ্রন্থ লোড হচ্ছে...</p>
                  <p className="text-sm text-muted-foreground">অনুগ্রহ করে অপেক্ষা করুন</p>
                </div>
                
                {/* Progress with Percentage */}
                <div className="w-full space-y-2">
                  <Progress value={60} className="h-2" />
                  <p className="text-center text-lg font-bold text-primary">৬০%</p>
                </div>
                
                {/* Loading dots */}
                <div className="flex gap-1">
                  <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="h-2 w-2 bg-primary rounded-full animate-bounce"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Skeleton Chapter Cards */}
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <Card 
                key={i} 
                className="animate-pulse border-l-4 border-l-primary/30"
                style={{animationDelay: `${i * 0.1}s`}}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="h-5 bg-muted rounded-lg w-3/4"></div>
                      <div className="h-4 bg-muted/70 rounded w-1/2"></div>
                      <div className="h-7 bg-muted/50 rounded-full w-28"></div>
                    </div>
                    <div className="h-5 w-5 bg-muted rounded ml-4"></div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title={collection.nameBangla} showBack />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {/* Header Card */}
        <Card className="bg-gradient-primary text-primary-foreground border-2">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="h-8 w-8" />
              <div>
                <h2 className="text-xl font-bold">{collection.nameBangla}</h2>
                <p className="text-sm text-primary-foreground/80">
                  {collection.description}
                </p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-white/20 text-sm">
              মোট অধ্যায়: {chapters.length.toLocaleString("bn-BD")}
            </div>
          </CardContent>
        </Card>

        {/* Chapters List */}
        <div className="space-y-3">
          {chapters.map((chapter) => (
            <Link
              key={chapter.id}
              to={`/hadith/book/${bookId}/chapter/${chapter.id}`}
              className="block"
            >
              <Card className="hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer border-l-4 border-l-primary">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">
                        {chapter.nameBangla}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {chapter.nameEnglish}
                      </p>
                      {chapter.hadithCount > 0 && (
                        <Badge variant="secondary" className="mt-2">
                          {chapter.hadithCount.toLocaleString("bn-BD")} টি হাদিস
                        </Badge>
                      )}
                      {chapter.hadithCount === 0 && (
                        <Badge variant="outline" className="mt-2">
                          শীঘ্রই যুক্ত হবে
                        </Badge>
                      )}
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default HadithBook;
