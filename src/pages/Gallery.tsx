import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { 
  MapPin, 
  Palette, 
  Leaf, 
  Calendar as CalendarIcon, 
  Quote,
  Image as ImageIcon,
  Download,
  Heart
} from "lucide-react";
import kaabaBanner from "@/assets/kaaba-banner.jpg";
import mosqueImage from "@/assets/mosque-sunset.jpg";
import arafah from "@/assets/arafah.jpg";
import tawaf from "@/assets/tawaf.jpg";
import sai from "@/assets/sai.jpg";
import muzdalifah from "@/assets/muzdalifah.jpg";
import laylatul from "@/assets/laylatul-qadr.jpg";
import itikaf from "@/assets/itikaf.jpg";
import asmaUlHusna from "@/assets/asma-ul-husna.png";

const galleryData = {
  places: [
    {
      id: 1,
      image: kaabaBanner,
      title: "কাবা শরীফ",
      title_ar: "الكعبة المشرفة",
      description: "পবিত্র কাবা শরীফ, মসজিদুল হারাম, মক্কা।",
      location: "মক্কা, সৌদি আরব",
      category: "Holy Places"
    },
    {
      id: 2,
      image: arafah,
      title: "আরাফাতের ময়দান",
      title_ar: "عرفات",
      description: "হজ্বের সবচেয়ে গুরুত্বপূর্ণ স্থান আরাফাতের ময়দান।",
      location: "মক্কা, সৌদি আরব",
      category: "Hajj"
    },
    {
      id: 3,
      image: tawaf,
      title: "তাওয়াফ",
      title_ar: "الطواف",
      description: "কাবা ঘরের চারপাশে তাওয়াফরত হাজীদের দৃশ্য।",
      location: "মক্কা, সৌদি আরব",
      category: "Hajj"
    },
    {
      id: 4,
      image: sai,
      title: "সাফা-মারওয়া সায়ী",
      title_ar: "السعي",
      description: "সাফা ও মারওয়া পাহাড়ের মধ্যে সায়ী।",
      location: "মক্কা, সৌদি আরব",
      category: "Hajj"
    },
    {
      id: 5,
      image: muzdalifah,
      title: "মুজদালিফা",
      title_ar: "مزدلفة",
      description: "হজ্বের সময় মুজদালিফায় অবস্থান।",
      location: "মক্কা, সৌদি আরব",
      category: "Hajj"
    }
  ],
  art: [
    {
      id: 1,
      image: asmaUlHusna,
      title: "আল্লাহর ৯৯ নাম",
      title_ar: "أسماء الله الحسنى",
      description: "আল্লাহর সুন্দরতম নামসমূহের ক্যালিগ্রাফি।",
      category: "Calligraphy"
    }
  ],
  nature: [
    {
      id: 1,
      image: mosqueImage,
      title: "সূর্যাস্তে মসজিদ",
      description: "সূর্যাস্তের সময় মসজিদের প্রশান্তিময় দৃশ্য।",
      category: "Nature"
    }
  ],
  events: [
    {
      id: 1,
      image: laylatul,
      title: "লাইলাতুল কদর",
      title_ar: "ليلة القدر",
      description: "হাজার মাসের চেয়ে শ্রেষ্ঠ রাত - লাইলাতুল কদর।",
      category: "Ramadan"
    },
    {
      id: 2,
      image: itikaf,
      title: "ইতিকাফ",
      title_ar: "الاعتكاف",
      description: "রমজানের শেষ দশকে মসজিদে ইতিকাফ।",
      category: "Ramadan"
    }
  ],
  quotes: [
    {
      id: 1,
      text: "নিশ্চয়ই কষ্টের সঙ্গে স্বস্তিও আছে।",
      text_ar: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
      reference: "সূরা ইনশিরাহ ৯৪:৬",
      category: "Quran"
    },
    {
      id: 2,
      text: "আর তোমরা ধৈর্য ও সালাতের মাধ্যমে সাহায্য চাও।",
      text_ar: "وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ",
      reference: "সূরা বাকারা ২:৪৫",
      category: "Quran"
    },
    {
      id: 3,
      text: "যে ব্যক্তি তার ভাইয়ের প্রয়োজন পূরণ করে, আল্লাহ তার প্রয়োজন পূরণ করেন।",
      text_ar: "مَنْ كَانَ فِي حَاجَةِ أَخِيهِ كَانَ اللَّهُ فِي حَاجَتِهِ",
      reference: "সহীহ বুখারী",
      category: "Hadith"
    }
  ]
};

const categories = [
  { id: "all", label: "সবগুলো", icon: ImageIcon },
  { id: "places", label: "পবিত্র স্থান", icon: MapPin },
  { id: "art", label: "ক্যালিগ্রাফি", icon: Palette },
  { id: "nature", label: "প্রকৃতি", icon: Leaf },
  { id: "events", label: "ইভেন্ট", icon: CalendarIcon },
  { id: "quotes", label: "উক্তি", icon: Quote }
];

const Gallery = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const allImages = [
    ...galleryData.places,
    ...galleryData.art,
    ...galleryData.nature,
    ...galleryData.events
  ];

  const filterImages = () => {
    switch (activeTab) {
      case "places":
        return galleryData.places;
      case "art":
        return galleryData.art;
      case "nature":
        return galleryData.nature;
      case "events":
        return galleryData.events;
      case "quotes":
        return [];
      default:
        return allImages;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="Gallery - গ্যালারি" showBack backPath="/explore" />

      {/* Hero Section */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10" />
        <img
          src={kaabaBanner}
          alt="Gallery Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
          <ImageIcon className="h-12 w-12 text-white mb-2" />
          <h1 className="text-2xl font-bold text-white">ইসলামিক গ্যালারি</h1>
          <p className="text-sm text-white/90">পবিত্র স্থান, শিল্প ও অনুপ্রেরণা</p>
        </div>
      </div>

      <main className="max-w-lg mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full flex-wrap h-auto gap-2 bg-muted/50 p-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <TabsTrigger
                  key={cat.id}
                  value={cat.id}
                  className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-xs">{cat.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          <TabsContent value={activeTab} className="mt-6 space-y-4">
            {activeTab === "quotes" ? (
              // Quotes Section
              <div className="space-y-4">
                {galleryData.quotes.map((quote) => (
                  <Card key={quote.id} className="p-6 hover:shadow-lg transition-all">
                    <div className="space-y-4">
                      <Quote className="h-8 w-8 text-primary/30" />
                      <p className="text-2xl font-arabic text-center leading-loose text-foreground">
                        {quote.text_ar}
                      </p>
                      <p className="text-lg text-center text-foreground leading-relaxed">
                        {quote.text}
                      </p>
                      <div className="flex items-center justify-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {quote.reference}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {quote.category}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              // Image Gallery
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filterImages().map((item) => (
                  <Card
                    key={item.id}
                    className="overflow-hidden hover:shadow-lg transition-all group"
                  >
                    <AspectRatio ratio={4 / 3}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </AspectRatio>
                    <div className="p-4 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">
                            {item.title}
                          </h3>
                          {('title_ar' in item && item.title_ar) ? (
                            <p className="text-sm font-arabic text-muted-foreground">
                              {item.title_ar as string}
                            </p>
                          ) : null}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="shrink-0"
                          onClick={() => toggleFavorite(item.id)}
                        >
                          <Heart
                            className={`h-4 w-4 ${
                              favorites.includes(item.id)
                                ? "fill-red-500 text-red-500"
                                : ""
                            }`}
                          />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                      {('location' in item && item.location) ? (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>{item.location as string}</span>
                        </div>
                      ) : null}
                      <div className="flex items-center justify-between pt-2">
                        <Badge variant="secondary" className="text-xs">
                          {item.category}
                        </Badge>
                        <Button variant="ghost" size="sm" className="h-8 text-xs">
                          <Download className="h-3 w-3 mr-1" />
                          সংরক্ষণ
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Info Card */}
        <Card className="mt-6 bg-gradient-to-br from-primary/5 to-transparent border-primary/20 p-4">
          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="font-semibold text-foreground">📱 অফলাইন সাপোর্ট</p>
            <p>প্রথমবার দেখার পর ছবিগুলো অফলাইনে দেখা যাবে।</p>
            <p className="text-xs">সকল ছবি ও কন্টেন্ট ইসলামিক শিক্ষা ও অনুপ্রেরণার জন্য।</p>
          </div>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default Gallery;
