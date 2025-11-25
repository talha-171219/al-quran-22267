import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import alQuranIcon from "@/assets/icons/al-quran-3d.png";
import prayerTimesIcon from "@/assets/icons/prayer-times-3d.png";
import hadithIcon from "@/assets/icons/hadith-3d.png";
import islamicAiIcon from "@/assets/icons/islamic-ai-3d.png";
import tasbihIcon from "@/assets/icons/digital-tasbih-3d.png";
import qiblaIcon from "@/assets/icons/qibla-finder-3d.png";
import azkarIcon from "@/assets/icons/azkar-3d.png";
import duasIcon from "@/assets/icons/duas-3d.png";
import hajjIcon from "@/assets/icons/hajj-3d.png";
import fastingIcon from "@/assets/icons/fasting-tracker-3d.png";
import mosqueFinderIcon from "@/assets/icons/mosque-finder-3d.png";
import audioIcon from "@/assets/icons/audio-recitation-3d.png";

interface TourStep {
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  icon: string;
  gradient: string;
}

const tourSteps: TourStep[] = [
  {
    title: "Welcome to DeenSphereX",
    titleBn: "DeenSphereX এ স্বাগতম",
    description: "Your complete Islamic companion app with offline support. Let's explore the amazing features!",
    descriptionBn: "অফলাইন সমর্থন সহ আপনার সম্পূর্ণ ইসলামিক সহায়ক অ্যাপ। চলুন দুর্দান্ত বৈশিষ্ট্যগুলি অন্বেষণ করি!",
    icon: alQuranIcon,
    gradient: "from-emerald-500/20 to-teal-500/20"
  },
  {
    title: "Al-Quran Reading",
    titleBn: "আল-কুরআন পাঠ",
    description: "Read all 114 Surahs with Bengali translation, Tafsir, and Audio recitation. Works completely offline!",
    descriptionBn: "বাংলা অনুবাদ, তাফসীর এবং অডিও তেলাওয়াত সহ সব ১১৪টি সূরা পড়ুন। সম্পূর্ণ অফলাইনে কাজ করে!",
    icon: alQuranIcon,
    gradient: "from-blue-500/20 to-cyan-500/20"
  },
  {
    title: "Prayer Times & Notifications",
    titleBn: "নামাজের সময় ও নোটিফিকেশন",
    description: "Get accurate prayer times for Bangladesh with Adhan notifications. Set alarms for each prayer.",
    descriptionBn: "বাংলাদেশের জন্য সঠিক নামাজের সময় পান আযান বিজ্ঞপ্তি সহ। প্রতিটি নামাজের জন্য অ্যালার্ম সেট করুন।",
    icon: prayerTimesIcon,
    gradient: "from-purple-500/20 to-pink-500/20"
  },
  {
    title: "Hadith Collection",
    titleBn: "হাদিস সংগ্রহ",
    description: "Access thousands of authentic Hadiths from Sahih Bukhari, Muslim, and Tirmidhi with Bengali translation.",
    descriptionBn: "সহীহ বুখারী, মুসলিম এবং তিরমিযী থেকে হাজার হাজার সহীহ হাদীস বাংলা অনুবাদ সহ দেখুন।",
    icon: hadithIcon,
    gradient: "from-amber-500/20 to-orange-500/20"
  },
  {
    title: "Islamic AI Assistant",
    titleBn: "ইসলামিক এআই সহায়ক",
    description: "Ask any Islamic questions and get authentic answers based on Quran and Hadith.",
    descriptionBn: "যেকোনো ইসলামিক প্রশ্ন করুন এবং কুরআন ও হাদিসের ভিত্তিতে সঠিক উত্তর পান।",
    icon: islamicAiIcon,
    gradient: "from-violet-500/20 to-purple-500/20"
  },
  {
    title: "Digital Tasbih Counter",
    titleBn: "ডিজিটাল তাসবীহ কাউন্টার",
    description: "Count your Dhikr with our beautiful digital counter. Track your daily progress and milestones.",
    descriptionBn: "আমাদের সুন্দর ডিজিটাল কাউন্টার দিয়ে আপনার যিকির গণনা করুন। আপনার দৈনিক অগ্রগতি ট্র্যাক করুন।",
    icon: tasbihIcon,
    gradient: "from-green-500/20 to-emerald-500/20"
  },
  {
    title: "Qibla Finder",
    titleBn: "কিবলা নির্ণায়ক",
    description: "Find accurate Qibla direction using your device's compass. Works offline with GPS.",
    descriptionBn: "আপনার ডিভাইসের কম্পাস ব্যবহার করে সঠিক কিবলার দিক খুঁজুন। GPS দিয়ে অফলাইনে কাজ করে।",
    icon: qiblaIcon,
    gradient: "from-teal-500/20 to-cyan-500/20"
  },
  {
    title: "Duas & Azkar",
    titleBn: "দোয়া ও আযকার",
    description: "Daily Duas, Morning/Evening Azkar, and special occasion prayers with Arabic, Bengali & English.",
    descriptionBn: "দৈনিক দোয়া, সকাল/সন্ধ্যার আযকার এবং বিশেষ উপলক্ষের দোয়া আরবি, বাংলা ও ইংরেজিতে।",
    icon: duasIcon,
    gradient: "from-rose-500/20 to-pink-500/20"
  },
  {
    title: "Hajj & Ramadan Guide",
    titleBn: "হজ্জ ও রমজান গাইড",
    description: "Complete step-by-step guides for Hajj rituals and Ramadan fasting with duas and tips.",
    descriptionBn: "হজ্জ ও রমজানের জন্য সম্পূর্ণ ধাপে ধাপে গাইড দোয়া এবং টিপস সহ।",
    icon: hajjIcon,
    gradient: "from-indigo-500/20 to-blue-500/20"
  },
  {
    title: "Mosque Finder",
    titleBn: "মসজিদ খুঁজুন",
    description: "Find nearby mosques with directions, prayer times, and save your favorites.",
    descriptionBn: "নিকটবর্তী মসজিদ খুঁজুন দিকনির্দেশ, নামাজের সময় সহ এবং আপনার পছন্দের সংরক্ষণ করুন।",
    icon: mosqueFinderIcon,
    gradient: "from-cyan-500/20 to-blue-500/20"
  },
  {
    title: "Audio Recitation",
    titleBn: "অডিও তেলাওয়াত",
    description: "Listen to beautiful Quran recitations, Islamic lectures, and Nasheeds. Download for offline playback.",
    descriptionBn: "সুন্দর কুরআন তেলাওয়াত, ইসলামিক লেকচার এবং নাশিদ শুনুন। অফলাইন প্লেব্যাকের জন্য ডাউনলোড করুন।",
    icon: audioIcon,
    gradient: "from-orange-500/20 to-red-500/20"
  },
  {
    title: "Ready to Start!",
    titleBn: "শুরু করতে প্রস্তুত!",
    description: "You're all set! Explore all features from the Home page. May Allah guide you on your spiritual journey.",
    descriptionBn: "আপনি প্রস্তুত! হোম পেজ থেকে সব বৈশিষ্ট্য অন্বেষণ করুন। আল্লাহ আপনাকে আপনার আধ্যাত্মিক যাত্রায় পথ দেখান।",
    icon: alQuranIcon,
    gradient: "from-emerald-500/20 to-teal-500/20"
  }
];

interface AppTourProps {
  onComplete: () => void;
}

export const AppTour = ({ onComplete }: AppTourProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const step = tourSteps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === tourSteps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      handleClose();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirstStep) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  const handleSkip = () => {
    handleClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/95 backdrop-blur-md animate-fade-in">
      <Card className={`w-full max-w-lg bg-gradient-to-br ${step.gradient} border-border/50 shadow-2xl animate-scale-in`}>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {tourSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentStep
                        ? "w-8 bg-primary"
                        : index < currentStep
                        ? "w-1.5 bg-primary/50"
                        : "w-1.5 bg-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground ml-2">
                {currentStep + 1} / {tourSteps.length}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Icon */}
          <div className="flex justify-center animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
              <img
                src={step.icon}
                alt={step.title}
                className="relative w-32 h-32 object-contain drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Content */}
          <div className="text-center space-y-3 animate-fade-in">
            <h2 className="text-2xl font-bold text-foreground">
              {step.titleBn}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {step.descriptionBn}
            </p>
            <p className="text-xs text-muted-foreground/70 italic">
              {step.description}
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleSkip}
              className="flex-1"
            >
              Skip Tour
            </Button>
            
            <div className="flex gap-2">
              {!isFirstStep && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePrev}
                  className="h-10 w-10"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              )}
              
              <Button
                onClick={handleNext}
                className="h-10 px-6 bg-primary hover:bg-primary/90"
              >
                {isLastStep ? (
                  "Start Exploring"
                ) : (
                  <>
                    Next <ChevronRight className="h-4 w-4 ml-1" />
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Hint text */}
          {isLastStep && (
            <p className="text-center text-xs text-muted-foreground animate-fade-in">
              🌙 May Allah bless your journey with knowledge and faith
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};
