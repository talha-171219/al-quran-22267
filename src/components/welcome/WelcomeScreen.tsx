import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
interface WelcomeScreenProps {
  onComplete: () => void;
}
export const WelcomeScreen = ({
  onComplete
}: WelcomeScreenProps) => {
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a] animate-in fade-in duration-500">
      <div className="max-w-2xl mx-auto px-6 text-center space-y-8">
        {/* Arabic Calligraphy */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{
          fontFamily: 'Traditional Arabic, serif'
        }}>
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </h1>
          <p className="text-xl md:text-2xl text-white/90" style={{
          fontFamily: 'Traditional Arabic, serif'
        }}>
            السلام عليكم ورحمة الله وبركاته — أهلاً وسهلاً بكم في تطبيق القرآن
          </p>
        </div>

        {/* App Name */}
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          DeenSphereX
        </h2>

        {/* Bengali Welcome Text */}
        <div className="space-y-4 text-white/80 leading-relaxed">
          <p className="text-lg md:text-xl">
            আলহামদুলিল্লাহ — আমাদের কোরআন অ্যাপে আপনাকে আন্তরিকভাবে স্বাগত।
          </p>
          <p className="text-base md:text-lg">এখানে আপনি কোরআনের পুরো অনুবাদ, তাজবীদসহ পাঠ, সূরা-অনুসারে সার্চ, বুদ্ধিমান বুকমার্ক, প্রিমিয়াম এআই বট, আপনার নামাজের সময়সূচি ও দোয়া ফিচারগুলো এবং কাছাকাছি মসজিদ ফাইন্ডার-সহ অনেক সুবিধা পাবেন।</p>
          <p className="text-base md:text-lg">
            ফিচারগুলো সঠিকভাবে ব্যবহার করার জন্য দয়া করে অ্যাপটিকে লোকেশন এবং নোটিফিকেশন অনুমতি দিন।
          </p>
          <p className="text-lg md:text-xl font-semibold text-white">
        </p>
        </div>

        {/* Arrow Button */}
        <div className="pt-8">
          <Button onClick={onComplete} size="lg" className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
            <ArrowRight className="w-8 h-8 text-white" />
          </Button>
        </div>
      </div>
    </div>;
};