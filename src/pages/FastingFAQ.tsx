import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search } from "lucide-react";
import { fastingFAQs } from "@/data/fasting";

const FastingFAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFAQs = fastingFAQs.filter(faq =>
    faq.question_bn.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer_bn.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = {
    all: "সব প্রশ্ন",
    rules: "নিয়ম-কানুন",
    health: "স্বাস্থ্য",
    women: "মহিলা",
    travel: "ভ্রমণ",
    general: "সাধারণ"
  };

  const getFAQsByCategory = (category: string) => {
    if (category === 'all') return filteredFAQs;
    return filteredFAQs.filter(faq => faq.category === category);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="প্রশ্নোত্তর" showBack />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="প্রশ্ন খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

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
            <TabsContent key={category} value={category} className="mt-4">
              {getFAQsByCategory(category).length === 0 ? (
                <Card className="p-6 text-center text-muted-foreground">
                  কোন প্রশ্ন পাওয়া যায়নি
                </Card>
              ) : (
                <Accordion type="single" collapsible className="space-y-2">
                  {getFAQsByCategory(category).map((faq) => (
                    <AccordionItem
                      key={faq.id}
                      value={faq.id}
                      className="border rounded-lg px-4 bg-card"
                    >
                      <AccordionTrigger className="text-left hover:no-underline">
                        <span className="font-semibold">{faq.question_bn}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                        {faq.answer_bn}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </main>

      <BottomNav />
    </div>
  );
};

export default FastingFAQ;
