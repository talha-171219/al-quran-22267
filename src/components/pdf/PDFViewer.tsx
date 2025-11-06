import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, X, Loader2 } from "lucide-react";
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
  const [scale, setScale] = useState<number>(1.0);
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
      return newPage;
    });
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 3.0));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.5));
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

        <Button
          variant="outline"
          size="sm"
          onClick={handleZoomOut}
          disabled={loading}
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        
        <span className="text-sm font-medium px-2">
          {Math.round(scale * 100)}%
        </span>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleZoomIn}
          disabled={loading}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
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
              scale={scale}
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
