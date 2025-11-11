import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, HelpCircle } from "lucide-react";
import { hajjData } from "@/data/hajj";
import { useState } from "react";

const HajjFAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFAQs = hajjData.faq.filter(faq =>
    faq.q_bn.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.a_bn.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="প্রশ্ন ও উত্তর" showBack />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {/* Header Card */}
        <Card className="p-5 bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
          <div className="flex items-start gap-3">
            <HelpCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
            <div>
              <h2 className="font-semibold text-lg mb-1">সাধারণ প্রশ্নাবলী</h2>
              <p className="text-sm text-muted-foreground">
                হজ সংক্রান্ত প্রায়শই জিজ্ঞাসিত প্রশ্ন ও উত্তর
              </p>
            </div>
          </div>
        </Card>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="প্রশ্ন খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Badge variant="secondary">
          {filteredFAQs.length}টি প্রশ্ন
        </Badge>

        {/* FAQ Accordion */}
        <Card className="overflow-hidden">
          <Accordion type="single" collapsible className="w-full">
            {filteredFAQs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b last:border-0">
                <AccordionTrigger className="px-5 py-4 hover:bg-muted/50 text-left">
                  <span className="font-medium pr-4">{faq.q_bn}</span>
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-4">
                  <div className="pt-2 text-sm text-muted-foreground leading-relaxed bg-muted/20 p-4 rounded-lg">
                    {faq.a_bn}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>

        {filteredFAQs.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">কোনো প্রশ্ন পাওয়া যায়নি</p>
          </Card>
        )}

        {/* Additional Help */}
        <Card className="p-5 bg-gradient-to-br from-card to-card/50">
          <h3 className="font-semibold mb-2">আরও সাহায্য প্রয়োজন?</h3>
          <p className="text-sm text-muted-foreground mb-3">
            আপনার প্রশ্নের উত্তর খুঁজে পাচ্ছেন না? নিচের উৎসগুলো দেখুন:
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-primary">•</span>
              <span>হজ গাইড পড়ুন</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">•</span>
              <span>স্থানীয় ইমাম বা আলেমদের সাথে পরামর্শ করুন</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">•</span>
              <span>হজ প্রশিক্ষণ কেন্দ্রে যোগাযোগ করুন</span>
            </div>
          </div>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default HajjFAQ;
