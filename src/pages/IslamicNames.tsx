import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { islamicNames, categories } from "@/data/islamicNames";
import { Search, User } from "lucide-react";

const IslamicNames = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedGender, setSelectedGender] = useState<"all" | "male" | "female">("all");

  const filteredNames = islamicNames.filter((name) => {
    const matchesSearch =
      name.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      name.arabic.includes(searchQuery) ||
      name.meaningBengali.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory =
      selectedCategory === "All" || name.category === selectedCategory;
    
    const matchesGender =
      selectedGender === "all" || name.gender === selectedGender;

    return matchesSearch && matchesCategory && matchesGender;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="Islamic Names • ইসলামিক নাম" showBack />

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Header Section */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2 text-foreground">ইসলামিক নামের সংগ্রহ</h1>
          <p className="text-muted-foreground">
            আরবি নাম এবং তাদের অর্থ • Collection of Islamic Names
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="নাম বা অর্থ খুঁজুন... Search by name or meaning"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Gender Filter */}
        <div className="flex gap-2 mb-4 justify-center">
          <Badge
            variant={selectedGender === "all" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedGender("all")}
          >
            সব • All
          </Badge>
          <Badge
            variant={selectedGender === "male" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedGender("male")}
          >
            ছেলে • Male
          </Badge>
          <Badge
            variant={selectedGender === "female" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedGender("female")}
          >
            মেয়ে • Female
          </Badge>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Names Grid */}
        {filteredNames.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredNames.map((name) => (
              <Card key={name.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className={`h-5 w-5 ${name.gender === 'male' ? 'text-blue-500' : 'text-pink-500'}`} />
                      <span className="text-xl">{name.name}</span>
                    </div>
                    <span className="text-2xl font-arabic">{name.arabic}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">অর্থ (Meaning):</p>
                    <p className="text-foreground">{name.meaningBengali}</p>
                    <p className="text-sm text-muted-foreground italic">{name.meaning}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="secondary" className="text-xs">
                      {name.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {name.gender === 'male' ? 'ছেলে • Male' : 'মেয়ে • Female'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">কোনো নাম পাওয়া যায়নি</p>
            <p className="text-muted-foreground">No names found</p>
          </div>
        )}

        {/* Total Count */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          মোট {filteredNames.length} টি নাম পাওয়া গেছে • Showing {filteredNames.length} names
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default IslamicNames;
