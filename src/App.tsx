import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { useEffect } from "react";
import { surahPreloader } from "@/utils/surahPreloader";
import { hadithPreloader } from "@/utils/hadithPreloader";
import { UpdateNotification } from "@/components/pwa/UpdateNotification";
import Home from "./pages/Home";
import Surahs from "./pages/Surahs";
import SurahDetail from "./pages/SurahDetail";
import Bookmarks from "./pages/Bookmarks";
import Settings from "./pages/Settings";
import Quran from "./pages/Quran";
import Audio from "./pages/Audio";
import Dua from "./pages/Dua";
import Zakat from "./pages/Zakat";
import Calendar from "./pages/Calendar";
import Tasbih from "./pages/Tasbih";
import Tafsir from "./pages/Tafsir";
import Qibla from "./pages/Qibla";
import IslamicAI from "./pages/IslamicAI";
import InstallApp from "./pages/InstallApp";
import NotFound from "./pages/NotFound";
import Hadith from "./pages/Hadith";
import HadithBook from "./pages/HadithBook";
import HadithChapter from "./pages/HadithChapter";
import HadithDetailPage from "./pages/HadithDetailPage";
import HadithBookmarks from "./pages/HadithBookmarks";
import HadithSearch from "./pages/HadithSearch";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Start preloading all surahs and hadiths immediately on app launch
    const startPreloading = async () => {
      await surahPreloader.startPreloading();
      await hadithPreloader.startPreloading();
    };
    
    startPreloading();
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <UpdateNotification />
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
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/tasbih" element={<Tasbih />} />
            <Route path="/tafsir" element={<Tafsir />} />
            <Route path="/qibla" element={<Qibla />} />
            <Route path="/ai" element={<IslamicAI />} />
            <Route path="/install" element={<InstallApp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
          <Sonner />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
