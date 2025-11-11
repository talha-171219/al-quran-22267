import { useParams, useNavigate } from "react-router-dom";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, ChevronLeft, ChevronRight, Bookmark, Clock, Users } from "lucide-react";
import { hajjData } from "@/data/hajj";
import { HajjAudioPlayer } from "@/components/hajj/HajjAudioPlayer";
import { useState, useEffect } from "react";
import { setStepCompleted, isStepCompleted, toggleStepBookmark, isStepBookmarked } from "@/utils/hajjStorage";
import { toast } from "sonner";

const HajjStepDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const step = hajjData.steps.find(s => s.slug === slug);
  const stepIndex = hajjData.steps.findIndex(s => s.slug === slug);
  const [completed, setCompleted] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (step) {
      setCompleted(isStepCompleted(step.slug));
      setBookmarked(isStepBookmarked(step.slug));
    }
  }, [step]);

  if (!step) {
    return <div>ধাপ পাওয়া যায়নি</div>;
  }

  const handleComplete = () => {
    setStepCompleted(step.slug, !completed);
    setCompleted(!completed);
    toast.success(completed ? 'সম্পন্ন চিহ্ন সরানো হয়েছে' : 'সম্পন্ন হিসাবে চিহ্নিত');
  };

  const handleBookmark = () => {
    toggleStepBookmark(step.slug);
    setBookmarked(!bookmarked);
  };

  const getImageSrc = (imageName: string) => {
    try {
      return new URL(`../assets/${imageName}.jpg`, import.meta.url).href;
    } catch {
      return '';
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar 
        title={step.title_bn} 
        showBack 
        action={
          <Button variant="ghost" size="icon" onClick={handleBookmark}>
            <Bookmark className={bookmarked ? "fill-primary text-primary" : ""} />
          </Button>
        }
      />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {step.images.map((img, idx) => (
          <img key={idx} src={getImageSrc(img)} alt={step.title_bn} className="w-full rounded-lg shadow-lg" />
        ))}

        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="secondary" className="gap-1">
              <Clock className="h-3 w-3" />
              {step.duration_minutes} মিনিট
            </Badge>
            {step.crowd_level && (
              <Badge variant="outline" className="gap-1">
                <Users className="h-3 w-3" />
                {step.crowd_level === 'high' ? 'অধিক ভিড়' : step.crowd_level === 'medium' ? 'মাঝারি ভিড়' : 'কম ভিড়'}
              </Badge>
            )}
          </div>

          <div>
            <h3 className="font-semibold mb-2">সংক্ষিপ্ত বিবরণ</h3>
            <p className="text-muted-foreground">{step.summary_bn}</p>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <p className="text-2xl font-arabic text-center leading-loose">{step.arabic_text}</p>
            <p className="text-sm text-center text-muted-foreground italic">{step.transliteration}</p>
            <p className="text-sm text-center">{step.translation_bn}</p>
          </div>

          {step.audio && <HajjAudioPlayer audioUrl={step.audio} title={step.title_bn} />}

          <div>
            <h3 className="font-semibold mb-2">💡 টিপস ও পরামর্শ</h3>
            <ul className="space-y-2">
              {step.tips_bn.map((tip, idx) => (
                <li key={idx} className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <Button onClick={handleComplete} className="w-full" variant={completed ? "outline" : "default"}>
            {completed ? <CheckCircle2 className="mr-2" /> : <Circle className="mr-2" />}
            {completed ? 'সম্পন্ন হয়েছে' : 'সম্পন্ন হিসাবে চিহ্নিত করুন'}
          </Button>
        </Card>

        <div className="flex gap-2">
          {stepIndex > 0 && (
            <Button variant="outline" className="flex-1" onClick={() => navigate(`/hajj/steps/${hajjData.steps[stepIndex - 1].slug}`)}>
              <ChevronLeft className="mr-2" /> পূর্ববর্তী
            </Button>
          )}
          {stepIndex < hajjData.steps.length - 1 && (
            <Button className="flex-1" onClick={() => navigate(`/hajj/steps/${hajjData.steps[stepIndex + 1].slug}`)}>
              পরবর্তী <ChevronRight className="ml-2" />
            </Button>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default HajjStepDetail;
