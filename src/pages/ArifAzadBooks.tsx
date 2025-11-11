import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
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

const ArifAzadBooks = () => {
  const [selectedPdf, setSelectedPdf] = useState<{
    url: string;
    title: string;
  } | null>(null);

  const books: Book[] = [
    {
      id: 1,
      title: "Paradoxical Sajid Part 1",
      titleBn: "প্যারাডক্সিক্যাল সাজিদ",
      author: "Arif Azad",
      authorBn: "আরিফ আজাদ",
      description: "একটি চমৎকার ইসলামিক উপন্যাস যা জীবনের প্যারাডক্স নিয়ে আলোচনা করে।",
      pdfUrl: "/books/paradoxical-sajid-1.pdf"
    },
    {
      id: 2,
      title: "Paradoxical Sajid Part 2",
      titleBn: "প্যারাডক্সিক্যাল সাজিদ ২",
      author: "Arif Azad",
      authorBn: "আরিফ আজাদ",
      description: "প্যারাডক্সিক্যাল সাজিদের দ্বিতীয় পর্ব।",
      pdfUrl: "/books/paradoxical-sajid-2.pdf"
    },
    {
      id: 3,
      title: "Jibon Jekhane Jemon",
      titleBn: "জীবন যেখানে যেমন",
      author: "Arif Azad",
      authorBn: "আরিফ আজাদ",
      description: "জীবনের বিভিন্ন দিক নিয়ে একটি চমৎকার বই।",
      pdfUrl: "/books/jibon-jekhane-jemon.pdf"
    },
    {
      id: 4,
      title: "Bela Furabar Age",
      titleBn: "বেলা ফুরাবার আগে",
      author: "Arif Azad",
      authorBn: "আরিফ আজাদ",
      description: "সময় শেষ হওয়ার আগে করণীয় নিয়ে একটি অনুপ্রেরণামূলক বই।",
      pdfUrl: "/books/bela-furabar-age.pdf"
    },
    {
      id: 5,
      title: "Prottyaborton",
      titleBn: "প্রত্যাবর্তন",
      author: "Arif Azad",
      authorBn: "আরিফ আজাদ",
      description: "জীবনের প্রত্যাবর্তন ও আল্লাহর দিকে ফিরে আসার গল্প।",
      pdfUrl: "/books/prottyaborton-arif-azad.pdf"
    },
    {
      id: 6,
      title: "Maa O Baba",
      titleBn: "মা ও বাবা",
      author: "Arif Azad",
      authorBn: "আরিফ আজাদ",
      description: "মা-বাবার প্রতি সন্তানের দায়িত্ব ও ভালোবাসা নিয়ে।",
      pdfUrl: "/books/maa-o-baba-arif-azad.pdf"
    },
    {
      id: 7,
      title: "Adhar Rater Musafir",
      titleBn: "আঁধার রাতের মুসাফির",
      author: "Nasim Hejazi",
      authorBn: "নাসিম হেযাজী",
      description: "অন্ধকার রাতের যাত্রী - একটি আধ্যাত্মিক উপন্যাস।",
      pdfUrl: "/books/adhar-rater-musafir-nasim-hejaji.pdf"
    },
    {
      id: 8,
      title: "Ahban",
      titleBn: "আহ্বান: আধুনিক মননে আলোর পরশ",
      author: "Mizanur Rahman Azhari",
      authorBn: "মিজানুর রহমান আজহারি",
      description: "আধুনিক মননে ইসলামের আলোর পরশ।",
      pdfUrl: "/books/ahban-adhunik-monone-mizanur-rahman-azhari.pdf"
    }
  ];

  const handleBookClick = (book: Book) => {
    if (book.pdfUrl) {
      setSelectedPdf({
        url: book.pdfUrl,
        title: book.titleBn
      });
    }
  };

  return (
    <>
      {selectedPdf && (
        <PDFViewer 
          pdfUrl={selectedPdf.url} 
          title={selectedPdf.title} 
          onClose={() => setSelectedPdf(null)} 
        />
      )}
      
      <div className="min-h-screen bg-background pb-20">
        <TopBar title="আরিফ আজাদ বই সমগ্রী" showBack />

        <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
          <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <div className="flex items-start gap-3">
              <BookOpen className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2 text-lg">আরিফ আজাদ</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  জনপ্রিয় ইসলামিক লেখক আরিফ আজাদের বইগুলো পড়ুন। তাঁর লেখায় পাবেন জীবনের নানা প্রশ্নের উত্তর।
                </p>
              </div>
            </div>
          </Card>

          <div className="space-y-3">
            {books.map(book => (
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
                      <h4 className="font-semibold text-lg">{book.titleBn}</h4>
                      <p className="text-sm text-muted-foreground">
                        {book.authorBn}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {book.description}
                      </p>
                    </div>
                  </div>
                  <Button variant="default" size="sm" className="gap-2">
                    📖 পড়ুন
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-4 bg-muted/30 border-dashed">
            <p className="text-xs text-center text-muted-foreground">
              📱 পিডিএফ অ্যাপের মধ্যেই খুলবে। অফলাইনেও পড়তে পারবেন।
            </p>
          </Card>
        </main>

        <BottomNav />
      </div>
    </>
  );
};

export default ArifAzadBooks;
