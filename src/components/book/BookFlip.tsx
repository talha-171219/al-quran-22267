import { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import HTMLFlipBook from "react-pageflip";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize,
  Minimize,
  Volume2,
  VolumeX,
  X,
  ChevronsLeft,
  ChevronsRight,
  RotateCcw,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure PDF.js worker - use CDN for reliability
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

const MOBILE_BREAKPOINT = 768;

interface BookFlipProps {
  pdfUrl: string;
  title: string;
  onClose: () => void;
}

export const BookFlip = ({ pdfUrl, title, onClose }: BookFlipProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BREAKPOINT);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const bookRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    console.log("📘 BookFlip initialized with PDF:", pdfUrl);
    console.log("🔧 PDF.js Worker:", pdfjs.GlobalWorkerOptions.workerSrc);
    console.log("📦 PDF.js Version:", pdfjs.version);
    
    // Reset states on PDF change
    setLoading(true);
    setLoadError(false);
    setNumPages(0);
  }, [pdfUrl]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") previousPage();
      if (e.key === "ArrowRight") nextPage();
      if (e.key === "Escape" && isFullscreen) toggleFullscreen();
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentPage, numPages, isFullscreen]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    console.log("✅✅✅ PDF LOADED SUCCESSFULLY:", numPages, "pages");
    setNumPages(numPages);
    setLoading(false);
    setLoadError(false);
    toast.success(`বই সফলভাবে লোড হয়েছে! মোট ${numPages} পৃষ্ঠা`);
  };

  const onDocumentLoadError = (error: any) => {
    console.error("❌❌❌ PDF LOAD ERROR:", error);
    console.error("❌ Error Details:", {
      message: error?.message,
      name: error?.name,
      stack: error?.stack,
      pdfUrl: pdfUrl
    });
    setLoadError(true);
    setLoading(false);
    toast.error(`PDF লোড করতে ব্যর্থ: ${error?.message || 'Unknown error'}`);
  };

  const onDocumentLoadProgress = ({ loaded, total }: { loaded: number; total: number }) => {
    const progress = Math.round((loaded / total) * 100);
    console.log(`📄 Loading PDF: ${progress}% (${loaded.toLocaleString()}/${total.toLocaleString()} bytes)`);
  };

  const playFlipSound = () => {
    if (!soundEnabled) return;
    
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const ctx = audioContextRef.current;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.value = 800;
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.1);
    } catch (error) {
      console.error("Audio error:", error);
    }
  };

  const nextPage = () => {
    if (!bookRef.current) return;
    bookRef.current.pageFlip().flipNext();
    playFlipSound();
  };

  const previousPage = () => {
    if (!bookRef.current) return;
    bookRef.current.pageFlip().flipPrev();
    playFlipSound();
  };

  const goToFirstPage = () => {
    if (!bookRef.current) return;
    bookRef.current.pageFlip().flip(0);
    playFlipSound();
  };

  const goToLastPage = () => {
    if (!bookRef.current) return;
    bookRef.current.pageFlip().flip(numPages - 1);
    playFlipSound();
  };

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    
    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
    }
  };

  const handleFlip = (e: any) => {
    setCurrentPage(e.data);
    playFlipSound();
  };

  const pageWidth = isMobile ? 350 : 450;
  const pageHeight = isMobile ? 500 : 650;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-background flex flex-col"
      id="book-container"
    >
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
          <h2 className="text-lg font-semibold text-foreground truncate max-w-xs">
            {title}
          </h2>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? "Mute" : "Unmute"}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 overflow-hidden bg-gradient-to-b from-background to-muted/20">
        {/* Hidden Document loader */}
        <div style={{ display: 'none' }}>
          <Document 
            file={pdfUrl} 
            onLoadSuccess={onDocumentLoadSuccess} 
            onLoadError={onDocumentLoadError}
            onLoadProgress={onDocumentLoadProgress}
            options={{
              cMapUrl: `https://cdnjs.cloudflare.com/ajax/libs/pdfjs-dist/${pdfjs.version}/cmaps/`,
              cMapPacked: true,
              standardFontDataUrl: `https://cdnjs.cloudflare.com/ajax/libs/pdfjs-dist/${pdfjs.version}/standard_fonts/`,
            }}
          >
            <div />
          </Document>
        </div>

        {loading && !loadError && (
          <div className="text-center space-y-4 animate-fade-in">
            <div className="relative">
              <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto" />
              <div className="absolute inset-0 w-16 h-16 rounded-full bg-primary/10 animate-pulse mx-auto"></div>
            </div>
            <div className="space-y-2">
              <p className="text-xl font-bold text-foreground">📖 বই লোড হচ্ছে...</p>
              <p className="text-sm text-muted-foreground">অনুগ্রহ করে অপেক্ষা করুন</p>
            </div>
          </div>
        )}

        {loadError && (
          <div className="text-center space-y-4 animate-fade-in">
            <div className="text-7xl mb-4 animate-bounce">📚</div>
            <div className="space-y-2">
              <p className="text-xl font-bold text-destructive">বই লোড করতে ব্যর্থ</p>
              <p className="text-sm text-muted-foreground">দুঃখিত, এই বইটি বর্তমানে লোড করা যাচ্ছে না।</p>
              <p className="text-xs text-muted-foreground">পরে আবার চেষ্টা করুন বা অন্য বই নির্বাচন করুন।</p>
            </div>
            <Button onClick={onClose} variant="outline" className="mt-4">
              ফিরে যান
            </Button>
          </div>
        )}

        {!loading && !loadError && numPages > 0 && (
          <div className="flipbook-container animate-fade-in" style={{ perspective: "2000px" }}>
            {isMobile ? (
              // Mobile: Single Page with Zoom
              <TransformWrapper
                  initialScale={1}
                  minScale={0.8}
                  maxScale={3}
                  wheel={{ step: 0.15 }}
                  pinch={{ step: 5 }}
                  doubleClick={{ mode: "zoomIn" }}
                >
                {({ zoomIn, zoomOut, resetTransform }) => (
                  <div>
                    <div className="mb-4 flex justify-center gap-2">
                      <Button size="sm" onClick={() => zoomOut()} variant="outline">
                        <ZoomOut className="w-4 h-4" />
                      </Button>
                      <Button size="sm" onClick={() => resetTransform()} variant="outline">
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                      <Button size="sm" onClick={() => zoomIn()} variant="outline">
                        <ZoomIn className="w-4 h-4" />
                      </Button>
                    </div>
                    <TransformComponent>
                      <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
                        <Page
                          pageNumber={currentPage + 1}
                          width={pageWidth}
                          renderMode="canvas"
                          scale={1.8}
                          renderTextLayer={true}
                          renderAnnotationLayer={false}
                        />
                      </div>
                    </TransformComponent>
                  </div>
                )}
              </TransformWrapper>
            ) : (
              // Desktop: Flipbook
              <HTMLFlipBook
                ref={bookRef}
                width={pageWidth}
                height={pageHeight}
                size="stretch"
                minWidth={300}
                maxWidth={500}
                minHeight={400}
                maxHeight={700}
                showCover={true}
                flippingTime={800}
                usePortrait={false}
                startPage={0}
                drawShadow={true}
                className="book-flip"
                onFlip={handleFlip}
                startZIndex={0}
                autoSize={true}
                maxShadowOpacity={0.5}
                mobileScrollSupport={true}
                clickEventForward={true}
                useMouseEvents={true}
                swipeDistance={30}
                showPageCorners={true}
                disableFlipByClick={false}
                style={{}}
              >
                {Array.from({ length: numPages }, (_, index) => (
                  <div key={index} className="page-wrapper bg-white shadow-xl">
                    <Page
                      pageNumber={index + 1}
                      width={pageWidth}
                      renderMode="canvas"
                      scale={1.5}
                      renderTextLayer={true}
                      renderAnnotationLayer={false}
                      className="book-page"
                    />
                  </div>
                ))}
              </HTMLFlipBook>
            )}
          </div>
        )}
      </div>

      {/* Controls */}
      {!loading && !loadError && numPages > 0 && (
        <div className="bg-card border-t border-border px-4 py-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={goToFirstPage}
                disabled={currentPage === 0}
              >
                <ChevronsLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={previousPage}
                disabled={currentPage === 0}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm font-medium text-foreground">
                {isMobile ? (
                  `Page ${currentPage + 1} of ${numPages}`
                ) : (
                  `Page ${currentPage + 1}-${Math.min(currentPage + 2, numPages)} of ${numPages}`
                )}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={nextPage}
                disabled={currentPage >= numPages - 1}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={goToLastPage}
                disabled={currentPage >= numPages - 1}
              >
                <ChevronsRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
