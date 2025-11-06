import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/card";
import { BookText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PDFViewer } from "@/components/pdf/PDFViewer";
import { useState } from "react";

const Tafsir = () => {
  const volumes = Array.from({ length: 10 }, (_, i) => i + 1);
  const [selectedPdf, setSelectedPdf] = useState<{ url: string; title: string } | null>(null);

  const handleVolumeClick = (vol: number) => {
    const pdfUrl = `https://raw.githubusercontent.com/talha-171219/quran-v2/main/static/pdfs/tafsir_volume_${vol}.pdf`;
    setSelectedPdf({ url: pdfUrl, title: `তাফসীর ইবনে কাসীর — খণ্ড ${vol}` });
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
        <TopBar title="তাফসীর ইবনে কাসীর" showBack />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
        <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <div className="flex items-start gap-3">
            <BookText className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-2 text-lg">তাফসীর ইবনে কাসীর</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                ইবনে কাসীরের তাফসীর কুরআনের সবচেয়ে বিশুদ্ধ ও বিস্তারিত ব্যাখ্যাগ্রন্থগুলোর একটি।
                ১০টি খণ্ডে সম্পূর্ণ কুরআনের বাংলা তাফসীর পড়ুন।
              </p>
            </div>
          </div>
        </Card>

        <div className="space-y-3">
          {volumes.map((vol) => (
            <Card 
              key={vol} 
              className="p-4 hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer border-l-4 border-l-primary/50"
              onClick={() => handleVolumeClick(vol)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <BookText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">খণ্ড {vol}</h4>
                    <p className="text-sm text-muted-foreground">
                      তাফসীর ইবনে কাসীর — বাংলা
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
            📱 পিডিএফ অ্যাপের মধ্যেই খুলবে। ইন্টারনেট সংযোগ প্রয়োজন।
          </p>
        </Card>
      </main>

      <BottomNav />
      </div>
    </>
  );
};

export default Tafsir;
