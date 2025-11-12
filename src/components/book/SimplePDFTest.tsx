import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure worker - use unpkg CDN
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface SimplePDFTestProps {
  pdfUrl: string;
  onClose: () => void;
}

export const SimplePDFTest = ({ pdfUrl, onClose }: SimplePDFTestProps) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    console.log("✅✅✅ PDF SUCCESS:", numPages, "pages");
    setNumPages(numPages);
    setLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (err: any) => {
    console.error("❌❌❌ PDF ERROR:", err);
    console.error("Error details:", {
      message: err?.message,
      name: err?.name,
      url: pdfUrl,
    });
    setError(err?.message || "Unknown error");
    setLoading(false);
  };

  const onLoadProgress = ({ loaded, total }: { loaded: number; total: number }) => {
    const progress = Math.round((loaded / total) * 100);
    console.log(`Loading: ${progress}%`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Simple PDF Test</h2>
        <Button onClick={onClose} variant="outline">Close</Button>
      </div>

      <div className="flex-1 overflow-auto flex items-center justify-center">
        {loading && !error && (
          <div className="text-center space-y-4">
            <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary" />
            <p>Loading PDF...</p>
            <p className="text-xs text-muted-foreground">{pdfUrl}</p>
          </div>
        )}

        {error && (
          <div className="text-center space-y-4">
            <p className="text-destructive text-lg">❌ Error Loading PDF</p>
            <p className="text-sm">{error}</p>
            <p className="text-xs text-muted-foreground">{pdfUrl}</p>
          </div>
        )}

        {!loading && !error && numPages && (
          <div className="space-y-4">
            <div className="text-center">
              <p>Page {pageNumber} of {numPages}</p>
            </div>
            <div className="flex gap-2 justify-center mb-4">
              <Button 
                onClick={() => setPageNumber(p => Math.max(1, p - 1))}
                disabled={pageNumber <= 1}
              >
                Previous
              </Button>
              <Button 
                onClick={() => setPageNumber(p => Math.min(numPages, p + 1))}
                disabled={pageNumber >= numPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}

        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          onLoadProgress={onLoadProgress}
          options={{
            cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
            cMapPacked: true,
            standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
          }}
        >
          {!loading && !error && numPages && (
            <Page
              pageNumber={pageNumber}
              width={600}
              renderMode="canvas"
              scale={1.5}
            />
          )}
        </Document>
      </div>
    </div>
  );
};
