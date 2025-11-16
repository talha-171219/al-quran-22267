import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import ImageCard from "@/components/ImageCard";
import { islamicImages } from "@/data/islamicImages";
import { islamicQuotesData } from "@/data/islamicQuotesData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Copy } from "lucide-react";

const StorePage = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="Store - স্টোর" showBack />

      <main className="max-w-lg mx-auto px-4 py-8">
        <Tabs defaultValue="images" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="images">Islamic Images</TabsTrigger>
            <TabsTrigger value="quotes">Islamic Quotes</TabsTrigger>
          </TabsList>
          <TabsContent value="images">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {islamicImages.map((image) => (
                <ImageCard key={image.id} image={image} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="quotes">
            <div className="space-y-4">
              {islamicQuotesData.map((quoteItem) => {
                const handleCopy = async () => {
                  try {
                    await navigator.clipboard.writeText(quoteItem.quote);
                    // simple feedback
                    alert("Quote copied to clipboard");
                  } catch (e) {
                    console.error("Copy failed", e);
                    alert("Failed to copy quote");
                  }
                };

                const handleShare = async () => {
                  if (navigator.share) {
                    try {
                      await navigator.share({
                        title: "Islamic Quote",
                        text: quoteItem.quote,
                      });
                    } catch (e) {
                      console.error("Share failed", e);
                      alert("Failed to share quote");
                    }
                  } else {
                    // fallback: copy to clipboard
                    try {
                      await navigator.clipboard.writeText(quoteItem.quote);
                      alert("Share not supported — quote copied instead");
                    } catch (e) {
                      alert("Share not supported and copy failed");
                    }
                  }
                };

                return (
                  <Card key={quoteItem.id}>
                    <CardContent className="p-4">
                      <p className="text-sm text-white">{quoteItem.quote}</p>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2 p-2">
                      <Button variant="ghost" size="sm" onClick={handleCopy}>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                      <Button variant="ghost" size="sm" onClick={handleShare}>
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <BottomNav />
    </div>
  );
};

export default StorePage;
