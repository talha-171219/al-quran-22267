import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Calendar, CheckCircle2, Heart } from "lucide-react";
import { itikafInfo } from "@/data/fasting";
import itikafImage from "@/assets/itikaf.jpg";

const Itikaf = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="ইতিকাফ" showBack />

      {/* Banner */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={itikafImage} 
          alt="Itikaf" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-primary-foreground">
          <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
            <Building2 className="h-6 w-6" />
            {itikafInfo.title_bn}
          </h1>
        </div>
      </div>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Description */}
        <Card className="bg-gradient-primary text-primary-foreground">
          <CardContent className="pt-6 space-y-3">
            <p className="text-center leading-relaxed">
              {itikafInfo.description_bn}
            </p>
            <div className="flex justify-center">
              <Badge variant="secondary" className="gap-2">
                <Calendar className="h-3 w-3" />
                {itikafInfo.duration_bn}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Rules */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              ইতিকাফের নিয়ম
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {itikafInfo.rules.map((rule, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-bold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <span className="text-sm text-muted-foreground">{rule}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Benefits */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              ইতিকাফের ফজিলত
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {itikafInfo.benefits_bn.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Heart className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Tips Card */}
        <Card>
          <CardHeader>
            <CardTitle>ইতিকাফের প্রস্তুতি</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h4 className="font-semibold text-sm mb-2">শারীরিক প্রস্তুতি:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-5 list-disc">
                <li>মসজিদে থাকার জন্য প্রয়োজনীয় জিনিসপত্র সাথে নিন</li>
                <li>পরিষ্কার কাপড়, বিছানা, ব্যক্তিগত স্বাস্থ্যবিধি সামগ্রী</li>
                <li>কুরআন, দোয়ার বই, নোটবুক</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">মানসিক প্রস্তুতি:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-5 list-disc">
                <li>পরিবার ও কাজের সব দায়িত্ব সেরে আসুন</li>
                <li>মসজিদে নিভৃতে ইবাদতের মানসিকতা তৈরি করুন</li>
                <li>লাইলাতুল কদর খোঁজার দৃঢ় সংকল্প নিন</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Note */}
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <p className="text-sm text-center text-muted-foreground leading-relaxed">
              ইতিকাফ রমজানের শেষ দশকের একটি গুরুত্বপূর্ণ সুন্নত। এটি লাইলাতুল কদর পাওয়ার সর্বোত্তম উপায়। আল্লাহ আমাদের সবাইকে ইতিকাফ করার তাওফিক দান করুন।
            </p>
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default Itikaf;
