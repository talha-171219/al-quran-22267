import { ArrowRight } from "lucide-react";

interface WelcomeScreenProps {
  onComplete: () => void;
}

export const WelcomeScreen = ({ onComplete }: WelcomeScreenProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-background animate-in fade-in duration-700">
      <div className="max-w-2xl w-full mx-auto px-6 md:px-8 text-center space-y-8 animate-in slide-in-from-bottom duration-1000">
        
        {/* Arabic Calligraphy - Bismillah */}
        <div className="space-y-6 animate-in fade-in duration-1000 delay-300">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-arabic font-bold text-primary drop-shadow-lg animate-in zoom-in duration-700 delay-500"
          >
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </h1>
        </div>

        {/* App Name */}
        <div className="animate-in fade-in-up duration-1000 delay-700">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-wide">
            DeenSphereX
          </h2>
        </div>

        {/* Developer Credit */}
        <div className="animate-in fade-in-up duration-1000 delay-900">
          <p className="text-base md:text-lg text-muted-foreground font-light">
            Designed and Developed by <span className="text-secondary font-semibold">Monirul Hasan Talha</span> ✨
          </p>
        </div>

        {/* Bengali Welcome Text - Shortened */}
        <div className="space-y-3 text-muted-foreground leading-relaxed animate-in fade-in-up duration-1000 delay-1100 max-w-xl mx-auto">
          <p className="text-sm md:text-base">
            কোরআন, হাদিস, নামাজের সময়সূচি, দোয়া, এআই চ্যাটবট এবং আরও অনেক ইসলামিক ফিচার এক অ্যাপে।
          </p>
        </div>

        {/* Arrow Button */}
        <div className="pt-6 animate-in fade-in-up duration-1000 delay-1300">
          <button
            onClick={onComplete}
            className="group relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-primary via-primary-light to-primary-glow hover:from-primary-light hover:via-primary-glow hover:to-primary shadow-lg hover:shadow-primary/50 transition-all duration-500 hover:scale-110 animate-pulse mx-auto"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/30 to-transparent opacity-50" />
            <ArrowRight className="relative z-10 w-8 h-8 md:w-10 md:h-10 text-primary-foreground mx-auto group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
};
