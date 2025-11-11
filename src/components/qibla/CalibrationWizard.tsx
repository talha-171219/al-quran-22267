import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Smartphone, RotateCw, CheckCircle2 } from "lucide-react";

interface CalibrationWizardProps {
  onClose: () => void;
}

export const CalibrationWizard = ({ onClose }: CalibrationWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "কম্পাস ক্যালিব্রেশন",
      description: "সঠিক দিক নির্দেশনার জন্য আপনার ফোনের কম্পাস ক্যালিব্রেট করুন",
      instruction: "শুরু করতে 'পরবর্তী' বাটনে ক্লিক করুন",
      icon: <Smartphone className="w-16 h-16 text-emerald-400" />
    },
    {
      title: "ফোন সমতল রাখুন",
      description: "আপনার ফোনটি মাটির সমান্তরালে রাখুন",
      instruction: "ফোনের স্ক্রীন উপরের দিকে থাকবে",
      animation: "phone-flat"
    },
    {
      title: "৮ আকৃতি তৈরি করুন",
      description: "আপনার কব্জি ব্যবহার করে বাতাসে ৮ আঁকুন",
      instruction: "ফোন সমতল রেখে ৩-৪ বার পুনরাবৃত্তি করুন",
      animation: "figure-8"
    },
    {
      title: "ক্যালিব্রেশন সম্পন্ন!",
      description: "আপনার কম্পাস এখন সঠিকভাবে ক্যালিব্রেট করা হয়েছে",
      instruction: "এখন আপনি সঠিক কিবলা দিক পাবেন",
      icon: <CheckCircle2 className="w-16 h-16 text-emerald-400" />
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-emerald-600 to-emerald-700 p-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-white font-bold text-lg">ক্যালিব্রেশন গাইড</h2>
          <div className="flex gap-1 mt-3">
            {steps.map((_, idx) => (
              <div
                key={idx}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  idx <= currentStep ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Animation Area */}
          <div className="flex items-center justify-center h-48">
            {steps[currentStep].icon ? (
              <div className="animate-in zoom-in duration-500">
                {steps[currentStep].icon}
              </div>
            ) : steps[currentStep].animation === "phone-flat" ? (
              <div className="relative animate-in zoom-in duration-500">
                <div className="w-32 h-48 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl border-4 border-slate-600 shadow-2xl animate-pulse">
                  <div className="absolute inset-4 bg-slate-900 rounded-xl flex items-center justify-center">
                    <Smartphone className="w-12 h-12 text-emerald-400" />
                  </div>
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-40 h-2 bg-slate-700/50 rounded-full blur-sm" />
              </div>
            ) : steps[currentStep].animation === "figure-8" ? (
              <div className="relative w-48 h-48 animate-in zoom-in duration-500">
                {/* Animated phone doing figure-8 */}
                <div className="absolute inset-0">
                  <div 
                    className="absolute top-1/2 left-1/2 w-20 h-32 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl border-2 border-slate-600 shadow-xl"
                    style={{
                      animation: 'figure8 4s ease-in-out infinite',
                      transformOrigin: 'center'
                    }}
                  >
                    <div className="absolute inset-2 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                      <RotateCw className="w-6 h-6 text-emerald-400 animate-spin" style={{ animationDuration: '2s' }} />
                    </div>
                  </div>
                  
                  {/* Figure-8 path trail */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                    <path
                      d="M 100 60 Q 130 80, 130 100 Q 130 120, 100 140 Q 70 120, 70 100 Q 70 80, 100 60"
                      stroke="rgba(16, 185, 129, 0.3)"
                      strokeWidth="3"
                      strokeDasharray="8,4"
                      fill="none"
                      className="animate-pulse"
                    />
                  </svg>
                </div>
              </div>
            ) : null}
          </div>

          {/* Text Content */}
          <div className="text-center space-y-3 animate-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-xl font-bold text-white">
              {steps[currentStep].title}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {steps[currentStep].description}
            </p>
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
              <p className="text-emerald-200 text-sm font-medium">
                💡 {steps[currentStep].instruction}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-3 pt-2">
            {currentStep > 0 && (
              <Button
                onClick={prevStep}
                variant="outline"
                className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                পূর্ববর্তী
              </Button>
            )}
            <Button
              onClick={nextStep}
              className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white shadow-lg"
            >
              {currentStep === steps.length - 1 ? 'সম্পন্ন' : 'পরবর্তী'}
            </Button>
          </div>
        </div>
      </Card>

      <style>{`
        @keyframes figure8 {
          0%, 100% {
            transform: translate(-50%, -50%) translate(0, -30px) rotate(0deg);
          }
          25% {
            transform: translate(-50%, -50%) translate(30px, 0) rotate(90deg);
          }
          50% {
            transform: translate(-50%, -50%) translate(0, 30px) rotate(180deg);
          }
          75% {
            transform: translate(-50%, -50%) translate(-30px, 0) rotate(270deg);
          }
        }
      `}</style>
    </div>
  );
};
