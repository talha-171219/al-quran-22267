import { useParams, Link } from "react-router-dom";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
        <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
          {/* Loading header with progress animation */}
          <Card className="overflow-hidden">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 bg-primary/20 rounded-lg animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-5 bg-muted rounded w-2/3 mb-2"></div>
                  <div className="h-4 bg-muted/60 rounded w-1/2"></div>
                </div>
              </div>
              <div className="h-1 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary animate-[progress_1s_ease-in-out_infinite]" style={{width: '40%'}}></div>
              </div>
            </CardContent>
          </Card>
          
          {/* Fast skeleton cards with staggered animation */}
          <div className="text-center py-2">
            <div className="inline-flex items-center gap-2 text-muted-foreground">
              <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="h-2 w-2 bg-primary rounded-full animate-bounce"></div>
              <span className="text-sm ml-2">অধ্যায় লোড হচ্ছে...</span>
            </div>
          </div>
          
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse" style={{animationDelay: `${i * 0.1}s`}}>
              <div className="p-6 border-l-4 border-l-muted">
                <div className="h-5 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-muted/70 rounded w-1/2 mb-3"></div>
                <div className="h-6 bg-muted/50 rounded-full w-24"></div>
              </div>
            </Card>
          ))}
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
