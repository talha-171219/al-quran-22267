import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Database, 
  Trash2, 
  RefreshCw, 
  HardDrive,
  BookOpen,
  Music,
  Calendar,
  FileText
} from "lucide-react";
import { toast } from "sonner";
import { verseCache } from "@/utils/verseCache";
import { hadithCache } from "@/utils/hadithCache";
import { audioCache } from "@/utils/audioCache";

interface CacheStats {
  name: string;
  icon: any;
  count: number;
  size: string;
  canClear: boolean;
  clearFn: () => Promise<void>;
}

export const CacheManagement = () => {
  const [cacheStats, setCacheStats] = useState<CacheStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalSize, setTotalSize] = useState("0 MB");

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const estimateCacheSize = async (): Promise<number> => {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      const estimate = await navigator.storage.estimate();
      return estimate.usage || 0;
    }
    return 0;
  };

  const loadCacheStats = async () => {
    setIsLoading(true);
    try {
      // Get verse cache count
      const cachedSurahs = await verseCache.getAllCachedSurahs();
      
      // Get hadith cache count
      const cachedBukhariChapters = await hadithCache.getAllCachedChapters('bukhari');
      const cachedMuslimChapters = await hadithCache.getAllCachedChapters('muslim');
      const cachedTirmidhiChapters = await hadithCache.getAllCachedChapters('tirmidhi');
      const totalHadithChapters = cachedBukhariChapters.length + cachedMuslimChapters.length + cachedTirmidhiChapters.length;
      
      // Get audio cache count
      const cachedAudio = await audioCache.getAllCached();
      
      // Estimate total cache size
      const totalBytes = await estimateCacheSize();
      setTotalSize(formatBytes(totalBytes));

      const stats: CacheStats[] = [
        {
          name: "কুরআন সূরা",
          icon: BookOpen,
          count: cachedSurahs.length,
          size: `${cachedSurahs.length} সূরা`,
          canClear: true,
          clearFn: async () => {
            // Clear each surah individually since there's no clearAll method
            return new Promise<void>((resolve, reject) => {
              const request = indexedDB.open('quran-verse-cache', 1);
              request.onsuccess = () => {
                const db = request.result;
                const tx = db.transaction(['surah-verses'], 'readwrite');
                const store = tx.objectStore('surah-verses');
                
                // Clear all entries
                const clearRequest = store.clear();
                clearRequest.onsuccess = () => {
                  toast.success("কুরআন ক্যাশ পরিষ্কার হয়েছে");
                  resolve();
                };
                clearRequest.onerror = () => reject(clearRequest.error);
              };
              request.onerror = () => reject(request.error);
            });
          }
        },
        {
          name: "হাদিস",
          icon: FileText,
          count: totalHadithChapters,
          size: `${totalHadithChapters} অধ্যায়`,
          canClear: true,
          clearFn: async () => {
            await hadithCache.clearAll();
            toast.success("হাদিস ক্যাশ পরিষ্কার হয়েছে");
          }
        },
        {
          name: "অডিও",
          icon: Music,
          count: cachedAudio.length,
          size: `${cachedAudio.length} ফাইল`,
          canClear: true,
          clearFn: async () => {
            await audioCache.clearAll();
            toast.success("অডিও ক্যাশ পরিষ্কার হয়েছে");
          }
        },
        {
          name: "নামাজের সময়",
          icon: Calendar,
          count: 0,
          size: "স্বয়ংক্রিয়",
          canClear: false,
          clearFn: async () => {}
        }
      ];

      setCacheStats(stats);
    } catch (error) {
      console.error("Error loading cache stats:", error);
      toast.error("ক্যাশ তথ্য লোড করতে সমস্যা হয়েছে");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCacheStats();
  }, []);

  const handleClearCache = async (cache: CacheStats) => {
    try {
      await cache.clearFn();
      await loadCacheStats(); // Reload stats
    } catch (error) {
      console.error("Error clearing cache:", error);
      toast.error("ক্যাশ পরিষ্কার করতে সমস্যা হয়েছে");
    }
  };

  const handleClearAllCaches = async () => {
    try {
      await Promise.all(
        cacheStats
          .filter(cache => cache.canClear)
          .map(cache => cache.clearFn())
      );
      
      // Also clear browser caches
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(name => caches.delete(name)));
      }
      
      toast.success("সমস্ত ক্যাশ পরিষ্কার হয়েছে");
      await loadCacheStats();
    } catch (error) {
      console.error("Error clearing all caches:", error);
      toast.error("সমস্ত ক্যাশ পরিষ্কার করতে সমস্যা হয়েছে");
    }
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Database className="h-5 w-5 text-primary" />
          <div>
            <h3 className="font-semibold">ক্যাশ ম্যানেজমেন্ট</h3>
            <p className="text-xs text-muted-foreground">মোট: {totalSize}</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={loadCacheStats}
          disabled={isLoading}
        >
          {isLoading ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className="space-y-2">
        {cacheStats.map((cache, index) => {
          const Icon = cache.icon;
          return (
            <div 
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-3 flex-1">
                <Icon className="h-4 w-4 text-primary" />
                <div className="flex-1">
                  <div className="font-medium text-sm">{cache.name}</div>
                  <div className="text-xs text-muted-foreground">{cache.size}</div>
                </div>
                {cache.count > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {cache.count}
                  </Badge>
                )}
              </div>
              {cache.canClear && cache.count > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleClearCache(cache)}
                  className="ml-2"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              )}
            </div>
          );
        })}
      </div>

      <Button 
        variant="destructive" 
        className="w-full"
        onClick={handleClearAllCaches}
        disabled={isLoading || cacheStats.every(c => c.count === 0)}
      >
        <HardDrive className="mr-2 h-4 w-4" />
        সমস্ত ক্যাশ পরিষ্কার করুন
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        ⚠️ ক্যাশ পরিষ্কার করলে অফলাইন কন্টেন্ট মুছে যাবে
      </p>
    </Card>
  );
};
