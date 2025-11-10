import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/card";
import { BookOpen, Library } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
const IslamicBooks = () => {
  const navigate = useNavigate();

  // Book sections for different authors/series
  interface BookSection {
    id: number;
    title: string;
    titleBn: string;
    description: string;
    path: string;
    bookCount: number;
  }

  const bookSections: BookSection[] = [
    {
      id: 1,
      title: "Arif Azad Books Collection",
      titleBn: "আরিফ আজাদ বই সমগ্রী",
      description: "আরিফ আজাদ এর সকল বই এক জায়গায়",
      path: "/books/arif-azad",
      bookCount: 4
    },
    {
      id: 2,
      title: "Saimum Series (1-62)",
      titleBn: "সাইমুম সিরিজ (১-৬২)",
      description: "সাইমুম সিরিজের সম্পূর্ণ সংগ্রহ",
      path: "/books/saimum-series",
      bookCount: 62
    }
  ];
  const handleSectionClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
        <TopBar title="ইসলামী বই" showBack />

        <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
          <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <div className="flex items-start gap-3">
              <Library className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2 text-lg">ইসলামী বইয়ের সংগ্রহ</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">ইসলামী উপন্যাস  এর উল্লেখযোগ্য বইগুলো এখানে পাবেন। পিডিএফ ফরম্যাটে পড়ুন এবং জ্ঞান অর্জন করুন।</p>
              </div>
            </div>
          </Card>

          <div className="space-y-3">
            {bookSections.map(section => (
              <Card 
                key={section.id} 
                className="p-4 transition-all border-l-4 border-l-primary/50 hover:shadow-lg hover:scale-[1.02] cursor-pointer"
                onClick={() => handleSectionClick(section.path)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg">{section.titleBn}</h4>
                      <p className="text-sm text-muted-foreground">
                        {section.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        মোট বই: {section.bookCount}টি
                      </p>
                    </div>
                  </div>
                  <Button variant="default" size="sm" className="gap-2">
                    📖 দেখুন
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-4 bg-muted/30 border-dashed">
            <p className="text-xs text-center text-muted-foreground">
              📚 বিভিন্ন লেখক ও সিরিজের বই সংগ্রহ। পড়ুন এবং জ্ঞান অর্জন করুন।
            </p>
          </Card>
        </main>

        <BottomNav />
      </div>
  );
};

export default IslamicBooks;