import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Info } from "lucide-react";
import { hajjData } from "@/data/hajj";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import mapMakkah from "@/assets/map-makkah.jpg";
import mapMina from "@/assets/map-mina.jpg";

const HajjMaps = () => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const getImageSrc = (imageName: string) => {
    return imageName === "map-makkah" ? mapMakkah : mapMina;
  };

  const locations = [
    {
      id: "kaaba",
      name_bn: "কাবা শরীফ",
      description_bn: "ইসলামের পবিত্রতম স্থান যেখানে তাওয়াফ করা হয়",
      position: { top: "45%", left: "50%" }
    },
    {
      id: "safa_marwa",
      name_bn: "সাফা ও মারওয়া",
      description_bn: "সাঈ করার জন্য দুই পাহাড়ের মধ্যে হাঁটা হয়",
      position: { top: "65%", left: "30%" }
    },
    {
      id: "mina",
      name_bn: "মিনা",
      description_bn: "তাঁবু শহর যেখানে হাজিরা অবস্থান করেন এবং জামরাতে কঙ্কর নিক্ষেপ করেন",
      position: { top: "30%", left: "70%" }
    },
    {
      id: "arafah",
      name_bn: "আরাফাহ",
      description_bn: "হজের সবচেয়ে গুরুত্বপূর্ণ দিন যেখানে হাজিরা দোয়ায় রত থাকেন",
      position: { top: "20%", left: "85%" }
    },
    {
      id: "muzdalifah",
      name_bn: "মুযদালিফাহ",
      description_bn: "আরাফাহ থেকে মিনার মধ্যবর্তী স্থান যেখানে রাত কাটানো হয়",
      position: { top: "25%", left: "78%" }
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="হজের মানচিত্র" showBack />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Info Card */}
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="flex gap-3">
            <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              মানচিত্রের উপর ট্যাপ করে বিভিন্ন স্থানের বিবরণ দেখুন
            </p>
          </div>
        </Card>

        {/* Map Images with Annotations */}
        {hajjData.maps.map((map) => (
          <Card key={map.id} className="overflow-hidden">
            <div className="relative">
              <img
                src={getImageSrc(map.image)}
                alt={map.name_bn}
                className="w-full h-auto"
              />
              <div className="absolute top-4 left-4 right-4">
                <Badge className="bg-background/90 backdrop-blur-sm">
                  {map.name_bn}
                </Badge>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm text-muted-foreground">
                {map.description_bn}
              </p>
            </div>
          </Card>
        ))}

        {/* Key Locations */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">প্রধান স্থানসমূহ</h2>
          {locations.map((location) => (
            <Card
              key={location.id}
              className="p-4 cursor-pointer hover:shadow-lg transition-all"
              onClick={() => setSelectedLocation(location.id)}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{location.name_bn}</h3>
                  <p className="text-sm text-muted-foreground">
                    {location.description_bn}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Map Info */}
        <Card className="p-5 bg-gradient-to-br from-card to-card/50">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            দূরত্ব তথ্য
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">মক্কা থেকে মিনা:</span>
              <span className="font-medium">৭ কিমি</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">মিনা থেকে আরাফাহ:</span>
              <span className="font-medium">১৪ কিমি</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">আরাফাহ থেকে মুযদালিফাহ:</span>
              <span className="font-medium">৯ কিমি</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">মুযদালিফাহ থেকে মিনা:</span>
              <span className="font-medium">৭ কিমি</span>
            </div>
          </div>
        </Card>
      </main>

      {/* Location Detail Dialog */}
      <Dialog open={!!selectedLocation} onOpenChange={() => setSelectedLocation(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {locations.find(l => l.id === selectedLocation)?.name_bn}
            </DialogTitle>
            <DialogDescription>
              {locations.find(l => l.id === selectedLocation)?.description_bn}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
};

export default HajjMaps;
