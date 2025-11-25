import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { surahList } from "@/data/surahs";
import { SEOHelmet } from "@/components/SEOHelmet";

const Surahs = () => {
  const [search, setSearch] = useState("");

  const filteredSurahs = surahList.filter(
    (surah) =>
      surah.name.toLowerCase().includes(search.toLowerCase()) ||
      surah.banglaName.toLowerCase().includes(search.toLowerCase()) ||
      surah.banglaMeaning.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <SEOHelmet 
        title="Al-Quran Surahs"
        description="Read and explore all 114 Surahs of the Holy Quran with Bengali translation and meaning. Complete Quran with Tajweed and audio recitation."
        keywords="Quran Surahs, Al-Quran, Bengali Quran, Quran Translation, Surah List, Islamic App"
        canonicalUrl="/surahs"
      />
      <div className="min-h-screen bg-background pb-20">
        <TopBar title="Surahs" showBack />

      <main className="max-w-lg mx-auto px-4 py-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search surahs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="space-y-2">
          {filteredSurahs.map((surah) => (
            <Link key={surah.number} to={`/surah/${surah.number}`}>
              <Card className="p-4 hover:shadow-md transition-all cursor-pointer hover:border-primary/30">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-gradient-primary text-primary-foreground rounded-lg font-bold">
                    {surah.number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div>
                        <h3 className="font-semibold">{surah.banglaName}</h3>
                        <p className="text-xs text-muted-foreground">{surah.name}</p>
                      </div>
                      <span className="text-xl font-arabic text-primary">
                        {surah.arabicName}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{surah.banglaMeaning}</span>
                      <span>•</span>
                      <span>{surah.verses} আয়াত</span>
                    </div>
                  </div>
                  <Badge
                    variant={surah.revelation === "Meccan" ? "default" : "secondary"}
                    className="flex-shrink-0"
                  >
                    {surah.revelation}
                  </Badge>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
    </>
  );
};

export default Surahs;
