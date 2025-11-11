import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { fastingDuas } from "@/data/fasting";

const FastingDuas = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDuas = fastingDuas.filter(dua =>
    dua.title_bn.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dua.translation_bn.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = {
    all: "সব দোয়া",
    niyyat: "নিয়ত",
    iftar: "ইফতার",
    general: "সাধারণ",
    "laylatul-qadr": "লাইলাতুল কদর"
  };

  const getDuasByCategory = (category: string) => {
    if (category === 'all') return filteredDuas;
    return filteredDuas.filter(dua => dua.category === category);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="নিয়ত ও দোয়া" showBack />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="দোয়া খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full grid grid-cols-3 lg:grid-cols-5">
            {Object.entries(categories).map(([key, label]) => (
              <TabsTrigger key={key} value={key} className="text-xs">
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.keys(categories).map((category) => (
            <TabsContent key={category} value={category} className="space-y-4 mt-4">
              {getDuasByCategory(category).length === 0 ? (
                <Card>
                  <CardContent className="pt-6 text-center text-muted-foreground">
                    কোন দোয়া পাওয়া যায়নি
                  </CardContent>
                </Card>
              ) : (
                getDuasByCategory(category).map((dua) => (
                  <Card key={dua.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{dua.title_bn}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Arabic Text */}
                      <div className="bg-muted/50 rounded-lg p-4">
                        <p className="text-2xl font-arabic text-right leading-loose">
                          {dua.arabic}
                        </p>
                      </div>

                      {/* Transliteration */}
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-muted-foreground">উচ্চারণ:</p>
                        <p className="text-sm italic text-foreground/80">
                          {dua.transliteration}
                        </p>
                      </div>

                      {/* Bengali Translation */}
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-muted-foreground">অর্থ:</p>
                        <p className="text-sm leading-relaxed">
                          {dua.translation_bn}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          ))}
        </Tabs>
      </main>

      <BottomNav />
    </div>
  );
};

export default FastingDuas;
