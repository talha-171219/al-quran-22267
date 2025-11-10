import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, X, Loader2, Search } from "lucide-react";
import { toast } from "sonner";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
  pdfUrl: string;
  title: string;
  onClose: () => void;
}

export const PDFViewer = ({ pdfUrl, title, onClose }: PDFViewerProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageInput, setPageInput] = useState<string>("1");
  const [loading, setLoading] = useState<boolean>(true);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
    toast.success(`${numPages} পৃষ্ঠা লোড সম্পন্ন হয়েছে`);
  };

  const onDocumentLoadError = (error: Error) => {
    setLoading(false);
    toast.error("পিডিএফ লোড করতে সমস্যা হয়েছে");
    console.error("PDF load error:", error);
  };

  const changePage = (offset: number) => {
    setPageNumber((prevPageNumber) => {
      const newPage = prevPageNumber + offset;
      if (newPage < 1) return 1;
      if (newPage > numPages) return numPages;
      setPageInput(String(newPage));
      return newPage;
    });
  };

  const handlePageJump = () => {
    const targetPage = parseInt(pageInput);
    if (isNaN(targetPage)) {
      toast.error("সঠিক পৃষ্ঠা নম্বর লিখুন");
      return;
    }
    if (targetPage < 1 || targetPage > numPages) {
      toast.error(`পৃষ্ঠা নম্বর ১ থেকে ${numPages} এর মধ্যে হতে হবে`);
      return;
    }
    setPageNumber(targetPage);
    toast.success(`পৃষ্ঠা ${targetPage} এ চলে গেছে`);
  };

  const handlePageInputChange = (value: string) => {
    setPageInput(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handlePageJump();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Header */}
      <div className="bg-card border-b px-4 py-3 flex items-center justify-between">
        <div className="flex-1">
          <h2 className="font-semibold text-lg truncate">{title}</h2>
          {!loading && (
            <p className="text-sm text-muted-foreground">
              পৃষ্ঠা {pageNumber} / {numPages}
            </p>
          )}
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Controls */}
      <div className="bg-card border-b px-4 py-2 flex items-center justify-center gap-2 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          onClick={() => changePage(-1)}
          disabled={pageNumber <= 1 || loading}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <span className="text-sm font-medium px-2">
          {pageNumber} / {numPages || "..."}
        </span>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => changePage(1)}
          disabled={pageNumber >= numPages || loading}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        <div className="border-l mx-2 h-6" />

        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={pageInput}
            onChange={(e) => handlePageInputChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="পৃষ্ঠা"
            className="w-20 h-8 text-sm"
            disabled={loading}
            min={1}
            max={numPages}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={handlePageJump}
            disabled={loading}
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* PDF Content */}
      <div className="flex-1 overflow-auto bg-muted/30 p-4">
        <div className="max-w-4xl mx-auto">
          {loading && (
            <Card className="p-8 flex flex-col items-center justify-center gap-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <div className="text-center space-y-2">
                <p className="font-semibold">পিডিএফ লোড হচ্ছে...</p>
                <p className="text-sm text-muted-foreground">অনুগ্রহ করে অপেক্ষা করুন</p>
              </div>
            </Card>
          )}
          
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading=""
            className="flex justify-center"
          >
            <Page
              pageNumber={pageNumber}
              scale={1.0}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              className="shadow-lg"
            />
          </Document>
        </div>
      </div>
    </div>
  );
};
