import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { useState } from "react";
import { BookFlip } from "@/components/book/BookFlip";

const books = [
  {
    id: 1,
    title: "সহজ কুরআন দোয়া সেকশন",
    titleEnglish: "Easy Quran Dua Section",
    pdfUrl: "/books/sahoj-quran-dua.pdf",
    description: "কুরআন থেকে সহজ দোয়া সংকলন",
  },
];

const BookViewPage = () => {
  const [selectedBook, setSelectedBook] = useState<typeof books[0] | null>(null);

  if (selectedBook) {
    return (
      <BookFlip
        pdfUrl={selectedBook.pdfUrl}
        title={selectedBook.title}
        onClose={() => setSelectedBook(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="Book View" showBack />

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-bold text-foreground">📚 Islamic Book Flipbook</h1>
          <p className="text-muted-foreground">Read with beautiful page-turning experience</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {books.map((book) => (
            <Card
              key={book.id}
              className="p-6 hover:shadow-xl transition-all duration-300 border-2 border-border/50 hover:border-primary/50 bg-card/80 backdrop-blur-sm"
            >
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-1">
                      {book.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {book.titleEnglish}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {book.description}
                    </p>
                  </div>
                </div>

                <Button
                  onClick={() => setSelectedBook(book)}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Read Now
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default BookViewPage;
