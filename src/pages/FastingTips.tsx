import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fastingTips } from "@/data/fasting";

const FastingTips = () => {
  const categories = {
    all: "সব টিপস",
    sehri: "সাহরী",
    iftar: "ইফতার",
    health: "স্বাস্থ্য",
    nutrition: "পুষ্টি",
    behavior: "আচরণ"
  };

  const getTipsByCategory = (category: string) => {
    if (category === 'all') return fastingTips;
    return fastingTips.filter(tip => tip.category === category);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="স্বাস্থ্য ও টিপস" showBack />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Header Card */}
        <Card className="bg-gradient-primary text-primary-foreground">
          <CardContent className="pt-6">
            <p className="text-center">
              রোযা রেখে সুস্থ থাকার এবং ইবাদত সঠিকভাবে করার উপায়
            </p>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full grid grid-cols-3 lg:grid-cols-6">
            {Object.entries(categories).map(([key, label]) => (
              <TabsTrigger key={key} value={key} className="text-xs">
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.keys(categories).map((category) => (
            <TabsContent key={category} value={category} className="space-y-4 mt-4">
              {getTipsByCategory(category).map((tip) => (
                <Card key={tip.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <span className="text-2xl">{tip.icon}</span>
                      {tip.title_bn}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {tip.description_bn}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          ))}
        </Tabs>

        {/* Doctor's Advice Card */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              🏥 ডাক্তারের পরামর্শ
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm leading-relaxed">
              <strong>গর্ভবতী ও স্তন্যদানকারী মা:</strong> নিজের ও সন্তানের স্বাস্থ্যের কথা চিন্তা করে ডাক্তারের পরামর্শ নিন।
            </p>
            <p className="text-sm leading-relaxed">
              <strong>দীর্ঘমেয়াদী রোগী:</strong> ডায়াবেটিস, হৃদরোগ বা কিডনি রোগীরা অবশ্যই ডাক্তারের পরামর্শ নিয়ে রোযা রাখুন।
            </p>
            <p className="text-sm leading-relaxed">
              <strong>জরুরি:</strong> রোযায় অসুস্থ বোধ করলে দ্রুত রোযা ভেঙে চিকিৎসা নিন। পরে কাজা করা যাবে।
            </p>
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default FastingTips;
