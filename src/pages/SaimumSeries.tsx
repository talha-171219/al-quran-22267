import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PDFViewer } from "@/components/pdf/PDFViewer";

interface Book {
  id: number;
  title: string;
  titleBn: string;
  author: string;
  pdfUrl: string;
  description: string;
}

const SaimumSeries = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const books: Book[] = [
    {
      id: 1,
      title: "Oktopasher Biday",
      titleBn: "অক্টোপাশের বিদায়",
      author: "আবুল আসাদ",
      pdfUrl: "/books/saimum/saimum-01.pdf",
      description: "সাইমুম সিরিজ - ১"
    },
    {
      id: 2,
      title: "Odrisho Atongko",
      titleBn: "অদৃশ্য আতঙ্ক",
      author: "আবুল আসাদ",
      pdfUrl: "/books/saimum/saimum-02.pdf",
      description: "সাইমুম সিরিজ - ২"
    },
    {
      id: 3,
      title: "Ondhokar Afrikay",
      titleBn: "অন্ধকার আফ্রিকায়",
      author: "আবুল আসাদ",
      pdfUrl: "/books/saimum/saimum-03.pdf",
      description: "সাইমুম সিরিজ - ৩"
    },
    {
      id: 4,
      title: "Atlantiker Opare",
      titleBn: "আটলান্টিকের ওপারে",
      author: "আবুল আসাদ",
      pdfUrl: "/books/saimum/saimum-04.pdf",
      description: "সাইমুম সিরিজ - ৪"
    },
    {
      id: 5,
      title: "Operation Tel Aviv 1st",
      titleBn: "অপারেশন তেলআবিব (১ম খণ্ড)",
      author: "আবুল আসাদ",
      pdfUrl: "/books/saimum/saimum-05.pdf",
      description: "সাইমুম সিরিজ - ৫"
    },
    {
      id: 6,
      title: "Operation Tel Aviv 2nd",
      titleBn: "অপারেশন তেলআবিব (২য় খণ্ড)",
      author: "আবুল আসাদ",
      pdfUrl: "/books/saimum/saimum-06.pdf",
      description: "সাইমুম সিরিজ - ৬"
    },
    {
      id: 7,
      title: "Americay Arek Juddho",
      titleBn: "আমেরিকায় আরেক যুদ্ধ",
      author: "আবুল আসাদ",
      pdfUrl: "/books/saimum/saimum-07.pdf",
      description: "সাইমুম সিরিজ - ৭"
    },
    {
      id: 8,
      title: "Abar Sinkiang",
      titleBn: "আবার সিংকিয়াং",
      author: "আবুল আসাদ",
      pdfUrl: "/books/saimum/saimum-08.pdf",
      description: "সাইমুম সিরিজ - ৮"
    },
    {
      id: 9,
      title: "Abar Tel Avibe",
      titleBn: "আবার তেলআবিবে",
      author: "আবুল আসাদ",
      pdfUrl: "/books/saimum/saimum-09.pdf",
      description: "সাইমুম সিরিজ - ৯"
    },
    {
      id: 10,
      title: "Andalusiar Prantre",
      titleBn: "আন্দালুসিয়ার প্রান্তরে",
      author: "আবুল আসাদ",
      pdfUrl: "/books/saimum/saimum-10.pdf",
      description: "সাইমুম সিরিজ - ১০"
    }
  ];

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
  };

  const handleClosePDF = () => {
    setSelectedBook(null);
  };

  if (selectedBook) {
    return (
      <PDFViewer
        pdfUrl={selectedBook.pdfUrl}
        title={selectedBook.titleBn}
        onClose={handleClosePDF}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="সাইমুম সিরিজ" showBack />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
        <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <div className="flex items-start gap-3">
            <BookOpen className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-2 text-lg">সাইমুম সিরিজ</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                লেখক: আবুল আসাদ
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                বাংলা সাহিত্যের জনপ্রিয় গোয়েন্দা সিরিজ। মোট ৬২টি বইয়ের সংকলন।
              </p>
            </div>
          </div>
        </Card>

        <div className="space-y-3">
          {books.map((book) => (
            <Card
              key={book.id}
              className="p-4 transition-all border-l-4 border-l-primary/50 hover:shadow-lg hover:scale-[1.02] cursor-pointer"
              onClick={() => handleBookClick(book)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-base">{book.titleBn}</h4>
                    <p className="text-xs text-muted-foreground">
                      {book.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      লেখক: {book.author}
                    </p>
                  </div>
                </div>
                <Button variant="default" size="sm">
                  📖 পড়ুন
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-4 bg-muted/30 border-dashed">
          <p className="text-xs text-center text-muted-foreground">
            📚 সাইমুম সিরিজের আরো বই শীঘ্রই যোগ করা হবে...
          </p>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default SaimumSeries;
