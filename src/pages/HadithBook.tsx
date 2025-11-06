import { useParams, Link } from "react-router-dom";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ChevronRight } from "lucide-react";
import { hadithCollections } from "@/data/hadiths";
import { getBukhariChapters } from "@/services/bukhariApi";
import { useEffect, useState } from "react";

// Chapter data for non-Bukhari books
const muslimChapters = [
  { id: "1", nameBangla: "ঈমান অধ্যায়", nameEnglish: "Book of Faith", hadithCount: 0 },
  { id: "2", nameBangla: "পবিত্রতা অধ্যায়", nameEnglish: "Book of Purification", hadithCount: 0 },
  { id: "3", nameBangla: "নামাজ অধ্যায়", nameEnglish: "Book of Prayer", hadithCount: 0 },
  { id: "4", nameBangla: "জাকাত অধ্যায়", nameEnglish: "Book of Zakat", hadithCount: 0 },
];

const tirmidhiChapters = [
  { id: "1", nameBangla: "পবিত্রতা অধ্যায়", nameEnglish: "Book of Purification", hadithCount: 0 },
  { id: "2", nameBangla: "নামাজ অধ্যায়", nameEnglish: "Book of Prayer", hadithCount: 0 },
  { id: "3", nameBangla: "জাকাত অধ্যায়", nameEnglish: "Book of Zakat", hadithCount: 0 },
];

const HadithBook = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const collection = hadithCollections.find((c) => c.id === bookId);
  const [bukhariChapters, setBukhariChapters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (bookId === "bukhari") {
      getBukhariChapters()
        .then((chapters) => {
          setBukhariChapters(chapters);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          // Silent fail - will show empty state
        });
    } else {
      setLoading(false);
    }
  }, [bookId]);

  const chapters =
    bookId === "bukhari"
      ? bukhariChapters
      : bookId === "muslim"
      ? muslimChapters
      : tirmidhiChapters;

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
          {/* Header skeleton */}
          <Card className="animate-pulse bg-gradient-primary">
            <div className="h-32"></div>
          </Card>
          {/* Chapter skeletons */}
          {[1, 2, 3, 4, 5].map((i) => (
            <Card key={i} className="animate-pulse">
              <div className="p-6">
                <div className="h-5 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-muted/70 rounded w-1/2"></div>
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
