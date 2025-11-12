import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import islamicFrame from "@/assets/islamic-frame-border.png";

interface WelcomeScreenProps {
  onComplete: () => void;
}

export const WelcomeScreen = ({ onComplete }: WelcomeScreenProps) => {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] via-[#0f172a] to-[#000000] animate-in fade-in duration-700"
    >
      {/* Islamic Frame Border */}
      <div 
        className="absolute inset-0 bg-contain bg-center bg-no-repeat opacity-40 animate-in zoom-in duration-1000"
        style={{
          backgroundImage: `url(${islamicFrame})`,
        }}
      />
      
      {/* Content Container */}
      <div className="relative max-w-3xl mx-auto px-8 text-center space-y-8 animate-in slide-in-from-bottom duration-1000">
        
        {/* Arabic Calligraphy - Main Bismillah */}
        <div className="space-y-6 animate-in fade-in-up duration-1000 delay-300">
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-[#D4AF37] via-[#F4E4C1] to-[#D4AF37] bg-clip-text text-transparent mb-4 drop-shadow-2xl"
            style={{ 
              fontFamily: 'Traditional Arabic, serif',
              textShadow: '0 0 20px rgba(212, 175, 55, 0.3)'
            }}
          >
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </h1>
          
          {/* Arabic Welcome Text */}
          <p
            className="text-xl md:text-2xl lg:text-3xl bg-gradient-to-r from-[#C9A961] to-[#E8D4A0] bg-clip-text text-transparent"
            style={{ 
              fontFamily: 'Traditional Arabic, serif',
              textShadow: '0 0 15px rgba(201, 169, 97, 0.2)'
            }}
          >
            أهلاً مال رحمة الله وبركاته — سهلاً يكتب تعطي القرآن
          </p>
        </div>

        {/* App Name */}
        <div className="animate-in fade-in-up duration-1000 delay-500">
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#D4AF37] via-[#F4E4C1] to-[#D4AF37] bg-clip-text text-transparent tracking-wide"
            style={{
              textShadow: '0 0 30px rgba(212, 175, 55, 0.4)'
            }}
          >
            DeenSphereX
          </h2>
        </div>

        {/* Developer Credit */}
        <div className="animate-in fade-in-up duration-1000 delay-700">
          <p className="text-lg md:text-xl text-gray-300/90 font-light tracking-wide">
            Designed and Developed by <span className="text-[#D4AF37] font-semibold">Monirul hasan talha</span> ✨
          </p>
        </div>

        {/* Bengali Welcome Text */}
        <div className="space-y-5 text-gray-200/90 leading-relaxed animate-in fade-in-up duration-1000 delay-900 max-w-2xl mx-auto">
          <p className="text-base md:text-lg">
            এখানে আপনি কোরআনের পুরো অনুবাদ, তাজবীদসহ পাঠ, সূরা-অনুসারে সার্চ, বুকমার্ক, প্রিমিয়াম এআই বট, আপনার নামাজের সময়সূচি ও দোয়া ফিচারগুলো এবং কাছাকাছি মসজিদ ফাইন্ডার-সহ অনেক সুবিধা পাবেন।
          </p>
          <p className="text-base md:text-lg text-gray-300/80">
            ফিচারগুলো সঠিকভাবে ব্যবহার করার জন্য দয়া করে অ্যাপটিকে লোকেশন এবং নোটিফিকেশন অনুমতি দিন।
          </p>
        </div>

        {/* Glossy 3D Arrow Button */}
        <div className="pt-10 animate-in fade-in-up duration-1000 delay-1100">
          <button
            onClick={onComplete}
            className="group relative w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700 hover:from-blue-500 hover:via-blue-600 hover:to-blue-800 shadow-2xl hover:shadow-blue-500/50 transition-all duration-500 hover:scale-110 animate-pulse"
            style={{
              boxShadow: '0 10px 40px rgba(59, 130, 246, 0.5), inset 0 -8px 16px rgba(0, 0, 0, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.3)'
            }}
          >
            {/* Glossy highlight */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/40 to-transparent opacity-50" />
            
            {/* Arrow Icon */}
            <ArrowRight className="relative z-10 w-10 h-10 text-white mx-auto group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
};
