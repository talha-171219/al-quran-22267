import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import { 
  Coins, 
  Wallet, 
  TrendingUp, 
  Building, 
  CircleDollarSign,
  Info,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

interface WealthCategory {
  label: string;
  value: string;
  icon: any;
  placeholder: string;
}

const Zakat = () => {
  // Current Nisab values (approximate, in BDT)
  const NISAB_GOLD = 612000; // ~85 grams gold @ 7200 BDT/gram
  const NISAB_SILVER = 54000; // ~595 grams silver @ 90 BDT/gram
  const ZAKAT_RATE = 0.025;

  const [currency, setCurrency] = useState("BDT");
  const [wealth, setWealth] = useState({
    cash: "",
    bankBalance: "",
    gold: "",
    silver: "",
    investments: "",
    business: "",
    realEstate: "",
    others: ""
  });
  const [totalWealth, setTotalWealth] = useState(0);
  const [zakatAmount, setZakatAmount] = useState(0);
  const [isEligible, setIsEligible] = useState(false);

  const categories: WealthCategory[] = [
    { label: "নগদ টাকা", value: "cash", icon: Wallet, placeholder: "হাতে থাকা নগদ টাকা" },
    { label: "ব্যাংক ব্যালেন্স", value: "bankBalance", icon: Building, placeholder: "সকল ব্যাংক একাউন্টের মোট টাকা" },
    { label: "সোনা (মূল্য)", value: "gold", icon: Coins, placeholder: "সোনার বর্তমান মূল্য" },
    { label: "রূপা (মূল্য)", value: "silver", icon: CircleDollarSign, placeholder: "রূপার বর্তমান মূল্য" },
    { label: "বিনিয়োগ", value: "investments", icon: TrendingUp, placeholder: "শেয়ার, বন্ড, সঞ্চয়পত্র ইত্যাদি" },
    { label: "ব্যবসায়িক সম্পদ", value: "business", icon: Building, placeholder: "ব্যবসায়ের পণ্য ও সম্পদ" },
    { label: "ভাড়ার সম্পত্তি", value: "realEstate", icon: Building, placeholder: "ভাড়ায় দেওয়া সম্পত্তির বাৎসরিক আয়" },
    { label: "অন্যান্য সম্পদ", value: "others", icon: CircleDollarSign, placeholder: "অন্যান্য যাকাতযোগ্য সম্পদ" }
  ];

  useEffect(() => {
    const total = Object.values(wealth).reduce((sum, value) => {
      const num = parseFloat(value) || 0;
      return sum + num;
    }, 0);
    
    setTotalWealth(total);
    setIsEligible(total >= NISAB_SILVER);
    
    if (total >= NISAB_SILVER) {
      setZakatAmount(total * ZAKAT_RATE);
    } else {
      setZakatAmount(0);
    }
  }, [wealth]);

  const handleInputChange = (category: string, value: string) => {
    setWealth(prev => ({ ...prev, [category]: value }));
  };

  const nisabProgress = (totalWealth / NISAB_SILVER) * 100;

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="যাকাত ক্যালকুলেটর" showBack />

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Nisab Status Card */}
        <Card className="p-6 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border-primary/20">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold mb-1">মোট সম্পদ</h3>
              <p className="text-3xl font-bold text-primary">
                {currency} {totalWealth.toLocaleString()}
              </p>
            </div>
            {isEligible ? (
              <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                যাকাত ফরয
              </Badge>
            ) : (
              <Badge variant="outline">
                <AlertCircle className="w-3 h-3 mr-1" />
                নিসাবের নিচে
              </Badge>
            )}
          </div>

          {/* Nisab Progress */}
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">নিসাব অগ্রগতি</span>
              <span className="font-medium">{Math.min(nisabProgress, 100).toFixed(0)}%</span>
            </div>
            <Progress value={Math.min(nisabProgress, 100)} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>রূপার নিসাব: {currency} {NISAB_SILVER.toLocaleString()}</span>
              <span>সোনার নিসাব: {currency} {NISAB_GOLD.toLocaleString()}</span>
            </div>
          </div>

          {/* Zakat Amount Display */}
          {isEligible && (
            <div className="mt-6 p-4 bg-gradient-primary rounded-lg text-primary-foreground">
              <div className="text-center space-y-1">
                <p className="text-sm opacity-90">আপনার যাকাতের পরিমাণ</p>
                <p className="text-4xl font-bold">
                  {currency} {zakatAmount.toLocaleString('en-BD', { maximumFractionDigits: 2 })}
                </p>
                <p className="text-xs opacity-75">
                  (মোট সম্পদের ২.৫%)
                </p>
              </div>
            </div>
          )}
        </Card>

        {/* Wealth Input Tabs */}
        <Card>
          <Tabs defaultValue="assets" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="assets">সম্পদ যোগ করুন</TabsTrigger>
              <TabsTrigger value="info">যাকাত সম্পর্কে</TabsTrigger>
            </TabsList>

            <TabsContent value="assets" className="p-4 space-y-4">
              <div className="grid gap-4">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <div key={category.value} className="space-y-2">
                      <Label htmlFor={category.value} className="flex items-center gap-2">
                        {Icon && <Icon className="w-4 h-4 text-primary" />}
                        {category.label}
                      </Label>
                      <Input
                        id={category.value}
                        type="number"
                        placeholder={category.placeholder}
                        value={wealth[category.value as keyof typeof wealth]}
                        onChange={(e) => handleInputChange(category.value, e.target.value)}
                        className="text-lg"
                      />
                    </div>
                  );
                })}
              </div>

              {/* Summary Breakdown */}
              {totalWealth > 0 && (
                <Card className="p-4 bg-muted/50 border-dashed">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    সম্পদের বিস্তারিত
                  </h4>
                  <div className="space-y-2 text-sm">
                    {categories.map((category) => {
                      const amount = parseFloat(wealth[category.value as keyof typeof wealth]) || 0;
                      if (amount > 0) {
                        return (
                          <div key={category.value} className="flex justify-between">
                            <span className="text-muted-foreground">{category.label}</span>
                            <span className="font-medium">{currency} {amount.toLocaleString()}</span>
                          </div>
                        );
                      }
                      return null;
                    })}
                    <div className="pt-2 border-t flex justify-between font-semibold">
                      <span>মোট সম্পদ</span>
                      <span className="text-primary">{currency} {totalWealth.toLocaleString()}</span>
                    </div>
                  </div>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="info" className="p-4 space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-lg">যাকাত কী?</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    যাকাত ইসলামের পাঁচটি স্তম্ভের একটি। এটি একটি বাধ্যতামূলক দান যার মাধ্যমে 
                    মুসলমানদের তাদের যোগ্য সম্পদের ২.৫% অভাবী মানুষদের দিতে হয়।
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">নিসাব কী?</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    নিসাব হলো ন্যূনতম সম্পদের পরিমাণ যা থাকলে যাকাত ফরয হয়। বর্তমানে রূপার 
                    ভিত্তিতে নিসাব প্রায় ৫৯৫ গ্রাম রূপার মূল্যের সমান বা প্রায় {NISAB_SILVER.toLocaleString()} টাকা।
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">কোন সম্পদে যাকাত দিতে হয়?</h4>
                  <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside leading-relaxed">
                    <li>নগদ অর্থ ও ব্যাংক জমা</li>
                    <li>সোনা ও রূপা</li>
                    <li>ব্যবসায়িক পণ্য ও মূলধন</li>
                    <li>শেয়ার, বন্ড ও বিনিয়োগ</li>
                    <li>ভাড়ার সম্পত্তি থেকে প্রাপ্ত আয়</li>
                    <li>পশুসম্পদ (নির্দিষ্ট সংখ্যার উপরে)</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">যাকাত কখন দিতে হয়?</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    সম্পদ নিসাব পরিমাণ হওয়ার পর এক চন্দ্র বছর (৩৫৪ দিন) অতিবাহিত হলে 
                    যাকাত দেওয়া ফরয হয়। অনেকে রমজান মাসে যাকাত আদায় করতে পছন্দ করেন।
                  </p>
                </div>

                <Card className="p-4 bg-primary/5 border-primary/20">
                  <p className="text-sm text-center font-medium">
                    "তোমরা নামায কায়েম কর এবং যাকাত প্রদান কর"
                    <br />
                    <span className="text-xs text-muted-foreground mt-1 block">
                      - সূরা বাক্বারাহ: ৪৩
                    </span>
                  </p>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Quick Nisab Reference */}
        <Card className="p-4 bg-muted/30">
          <h4 className="font-semibold mb-3 text-sm">বর্তমান নিসাব মূল্য (আনুমানিক)</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <p className="text-muted-foreground">সোনা (৮৫ গ্রাম)</p>
              <p className="font-semibold text-lg">{currency} {NISAB_GOLD.toLocaleString()}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">রূপা (৫৯৫ গ্রাম)</p>
              <p className="font-semibold text-lg">{currency} {NISAB_SILVER.toLocaleString()}</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            * নিসাব মূল্য বাজার দরের উপর নির্ভর করে পরিবর্তিত হয়। সঠিক হিসাবের জন্য 
            বর্তমান বাজার মূল্য দেখে নিন।
          </p>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default Zakat;
