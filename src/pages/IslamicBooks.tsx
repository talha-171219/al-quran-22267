import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/card";
import { BookOpen, Library } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PDFViewer } from "@/components/pdf/PDFViewer";
import { useState } from "react";
interface Book {
  id: number;
  title: string;
  titleBn: string;
  author: string;
  authorBn: string;
  description: string;
  pdfUrl: string;
}
const IslamicBooks = () => {
  const [selectedPdf, setSelectedPdf] = useState<{
    url: string;
    title: string;
  } | null>(null);

  // Placeholder books - PDFs will be added later
  const books: Book[] = [{
    id: 1,
    title: "Sample Book 1",
    titleBn: "ইসলামী বই ১",
    author: "Author Name",
    authorBn: "লেখক",
    description: "বইয়ের সংক্ষিপ্ত বিবরণ এখানে থাকবে।",
    pdfUrl: "" // Will be added later
  }];
  const handleBookClick = (book: Book) => {
    if (book.pdfUrl) {
      setSelectedPdf({
        url: book.pdfUrl,
        title: book.titleBn
      });
    }
  };
  return <>
      {selectedPdf && <PDFViewer pdfUrl={selectedPdf.url} title={selectedPdf.title} onClose={() => setSelectedPdf(null)} />}
      
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
            {books.length > 0 ? books.map(book => <Card key={book.id} className={`p-4 transition-all border-l-4 border-l-primary/50 ${book.pdfUrl ? 'hover:shadow-lg hover:scale-[1.02] cursor-pointer' : 'opacity-60'}`} onClick={() => book.pdfUrl && handleBookClick(book)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <BookOpen className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">{book.titleBn}</h4>
                        <p className="text-sm text-muted-foreground">
                          {book.authorBn}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {book.description}
                        </p>
                      </div>
                    </div>
                    {book.pdfUrl ? <Button variant="default" size="sm" className="gap-2">
                        📖 পড়ুন
                      </Button> : <Button variant="outline" size="sm" disabled>
                        শীঘ্রই
                      </Button>}
                  </div>
                </Card>) : <Card className="p-8 text-center">
                <Library className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">
                  বই যুক্ত করা হচ্ছে...
                </p>
              </Card>}
          </div>

          <Card className="p-4 bg-muted/30 border-dashed">
            <p className="text-xs text-center text-muted-foreground">
              📱 পিডিএফ অ্যাপের মধ্যেই খুলবে। ইন্টারনেট সংযোগ প্রয়োজন।
            </p>
          </Card>
        </main>

        <BottomNav />
      </div>
    </>;
};
export default IslamicBooks;