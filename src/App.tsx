import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";
import { surahPreloader } from "@/utils/surahPreloader";
import { hadithPreloader } from "@/utils/hadithPreloader";
import { versionManager } from "@/utils/versionManager";
import { initializeMidnightRefresh } from "@/utils/prayerTimesRefresh";
import { UpdateNotification } from "@/components/pwa/UpdateNotification";
import { InstallPromptModal } from "@/components/pwa/InstallPromptModal";
import { OfflineIndicator } from "@/components/layout/OfflineIndicator";
import { AudioProvider } from "@/contexts/AudioContext";
import { MiniPlayer } from "@/components/audio/MiniPlayer";
import { WelcomeScreen } from "@/components/welcome/WelcomeScreen";
import { toast } from "sonner";
import Home from "./pages/Home";
import Surahs from "./pages/Surahs";
import SurahDetail from "./pages/SurahDetail";
import Bookmarks from "./pages/Bookmarks";
import Settings from "./pages/Settings";
import Quran from "./pages/Quran";
import Audio from "./pages/Audio";
import Dua from "./pages/Dua";
import Zakat from "./pages/Zakat";
import PrayerTimes from "./pages/PrayerTimes";
import Tasbih from "./pages/Tasbih";
import Tafsir from "./pages/Tafsir";
import Qibla from "./pages/Qibla";
import IslamicAI from "./pages/IslamicAI";
import InstallApp from "./pages/InstallApp";
import PrayerTracker from "./pages/PrayerTracker";
import Azkar from "./pages/Azkar";
import NotFound from "./pages/NotFound";
import Hadith from "./pages/Hadith";
import HadithBook from "./pages/HadithBook";
import HadithChapter from "./pages/HadithChapter";
import HadithDetailPage from "./pages/HadithDetailPage";
import HadithBookmarks from "./pages/HadithBookmarks";
import HadithSearch from "./pages/HadithSearch";
import DatePrayerTimes from "./pages/DatePrayerTimes";
import IslamicBooks from "./pages/IslamicBooks";
import ArifAzadBooks from "./pages/ArifAzadBooks";
import SaimumSeries from "./pages/SaimumSeries";
import Explore from "./pages/Explore";
import Hajj from "./pages/Hajj";
import HajjGuide from "./pages/HajjGuide";
import HajjSteps from "./pages/HajjSteps";
import HajjStepDetail from "./pages/HajjStepDetail";
import HajjDuas from "./pages/HajjDuas";
import MosqueFinder from "./pages/MosqueFinder";
import Gojol from "./pages/Gojol";
import HajjChecklistPage from "./pages/HajjChecklistPage";
import HajjMaps from "./pages/HajjMaps";
import HajjFAQ from "./pages/HajjFAQ";
import HajjCalendar from "./pages/HajjCalendar";
import Fasting from "./pages/Fasting";
import FastingGuide from "./pages/FastingGuide";
import FastingTiming from "./pages/FastingTiming";
import FastingDuas from "./pages/FastingDuas";
import FastingSteps from "./pages/FastingSteps";
import FastingTips from "./pages/FastingTips";
import FastingTracker from "./pages/FastingTracker";
import FastingFAQ from "./pages/FastingFAQ";
import LaylatulQadr from "./pages/LaylatulQadr";
import Itikaf from "./pages/Itikaf";
import NinetyNineNames from "./pages/NinetyNineNames";
import Shahada from "./pages/Shahada";
import Salah from "./pages/Salah";
import Namaz from "./pages/Namaz";
import Gallery from "./pages/Gallery";
import StorePage from "./pages/StorePage";
import IslamicNames from "./pages/IslamicNames";
import NotificationSettings from "./pages/NotificationSettings";
import MoreDuas from "./pages/MoreDuas";
import DuaCategoryDetail from "./pages/DuaCategoryDetail";

const queryClient = new QueryClient();

const App = () => {
  const [isInitializing, setIsInitializing] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Initialize app and start preloading content
    const initializeApp = async () => {
      try {
        // Check if welcome screen should be shown
        const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
        const storedVersion = localStorage.getItem('appVersion');
        const currentVersion = versionManager.getCurrentVersion();

        // Show welcome if first time OR version changed
        if (!hasSeenWelcome || storedVersion !== currentVersion) {
          setShowWelcome(true);
          setIsInitializing(false);
          return;
        }

        // Start preloading all surahs, hadiths, and duas in the background
        const preloadPromises = [
          surahPreloader.checkAndResume(),
          hadithPreloader.checkAndResume(),
        ];

        // Don't await - let it run in background
        Promise.all(preloadPromises).then(() => {
          console.log('Background data refresh completed');
        }).catch(err => {
          console.error('Background refresh error:', err);
        });

        // Initialize automatic midnight refresh for prayer times
        initializeMidnightRefresh();

        setIsInitializing(false);
      } catch (error) {
        console.error('App initialization error:', error);
        setIsInitializing(false);
      }
    };
    
    initializeApp();
  }, []);

  const handleWelcomeComplete = async () => {
    // Save flags
    const currentVersion = versionManager.getCurrentVersion();
    localStorage.setItem('hasSeenWelcome', 'true');
    localStorage.setItem('appVersion', currentVersion);
    
    // Hide welcome and continue initialization
    setShowWelcome(false);
    setIsInitializing(true);

    try {
      // Now preload data
      const preloadPromises = [
        surahPreloader.checkAndResume(),
        hadithPreloader.checkAndResume(),
      ];

      Promise.all(preloadPromises).then(() => {
        console.log('Background data refresh completed');
      }).catch(err => {
        console.error('Background refresh error:', err);
      });

      initializeMidnightRefresh();
    } catch (error) {
      console.error('Initialization error:', error);
    } finally {
      setIsInitializing(false);
    }
  };

  // Show welcome screen if needed
  if (showWelcome) {
    return <WelcomeScreen onComplete={handleWelcomeComplete} />;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" storageKey="theme">
      <QueryClientProvider client={queryClient}>
        <AudioProvider>
          <BrowserRouter>
            <UpdateNotification />
            <InstallPromptModal />
            <OfflineIndicator />
            <MiniPlayer />
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/surahs" element={<Surahs />} />
            <Route path="/surah/:id" element={<SurahDetail />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/quran" element={<Quran />} />
            <Route path="/audio" element={<Audio />} />
            <Route path="/dua" element={<Dua />} />
          <Route path="/hadith" element={<Hadith />} />
          <Route path="/hadith/search" element={<HadithSearch />} />
          <Route path="/hadith/book/:bookId" element={<HadithBook />} />
          <Route path="/hadith/book/:bookId/chapter/:chapterId" element={<HadithChapter />} />
          <Route path="/hadith/detail/:bookId/:chapterId/:hadithId" element={<HadithDetailPage />} />
          <Route path="/hadith/bookmarks" element={<HadithBookmarks />} />
            <Route path="/zakat" element={<Zakat />} />
            <Route path="/calendar" element={<PrayerTimes />} />
            <Route path="/calendar/date/:date" element={<DatePrayerTimes />} />
            <Route path="/tasbih" element={<Tasbih />} />
            <Route path="/tafsir" element={<Tafsir />} />
          <Route path="/books" element={<IslamicBooks />} />
          <Route path="/books/arif-azad" element={<ArifAzadBooks />} />
          <Route path="/books/saimum-series" element={<SaimumSeries />} />
            <Route path="/qibla" element={<Qibla />} />
            <Route path="/ai" element={<IslamicAI />} />
            <Route path="/install" element={<InstallApp />} />
            <Route path="/prayer-tracker" element={<PrayerTracker />} />
            <Route path="/azkar" element={<Azkar />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/more-duas" element={<MoreDuas />} />
            <Route path="/more-duas/:slug" element={<DuaCategoryDetail />} />
            <Route path="/hajj" element={<Hajj />} />
            <Route path="/hajj/guide" element={<HajjGuide />} />
            <Route path="/hajj/steps" element={<HajjSteps />} />
            <Route path="/hajj/steps/:slug" element={<HajjStepDetail />} />
            <Route path="/hajj/duas" element={<HajjDuas />} />
            <Route path="/hajj/checklist" element={<HajjChecklistPage />} />
            <Route path="/hajj/maps" element={<HajjMaps />} />
            <Route path="/hajj/faq" element={<HajjFAQ />} />
            <Route path="/hajj/calendar" element={<HajjCalendar />} />
            <Route path="/fasting" element={<Fasting />} />
            <Route path="/fasting/guide" element={<FastingGuide />} />
            <Route path="/fasting/timing" element={<FastingTiming />} />
            <Route path="/fasting/duas" element={<FastingDuas />} />
            <Route path="/fasting/steps" element={<FastingSteps />} />
            <Route path="/fasting/tips" element={<FastingTips />} />
            <Route path="/fasting/tracker" element={<FastingTracker />} />
            <Route path="/fasting/faq" element={<FastingFAQ />} />
            <Route path="/fasting/laylatul-qadr" element={<LaylatulQadr />} />
            <Route path="/fasting/itikaf" element={<Itikaf />} />
            <Route path="/99-names" element={<NinetyNineNames />} />
            <Route path="/mosque-finder" element={<MosqueFinder />} />
            <Route path="/gojol" element={<Gojol />} />
            <Route path="/shahada" element={<Shahada />} />
            <Route path="/salah" element={<Salah />} />
            <Route path="/namaz" element={<Namaz />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/store" element={<StorePage />} />
            <Route path="/islamic-names" element={<IslamicNames />} />
            <Route path="/notifications" element={<NotificationSettings />} />
            <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
            <Sonner />
          </BrowserRouter>
        </AudioProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
