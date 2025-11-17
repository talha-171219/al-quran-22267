import { TopBar } from '@/components/layout/TopBar';
import { BottomNav } from '@/components/layout/BottomNav';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

type VideoSpec = {
  id: string;
  title?: string;
  thumbnail?: string;
};

export default function Lectures() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="Lectures" showBack />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        <h2 className="text-lg font-semibold mb-2">Islamic Lectures</h2>
        <p className="text-sm text-muted-foreground mb-4">Choose a speaker to view their lectures</p>

        {/* Speakers quick links - only names, no videos on this page */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link to="/lectures/ahmadullah" className="rounded-xl overflow-hidden bg-card p-4 flex items-center gap-3 hover:shadow-lg transition">
            <div className="w-14 h-14 bg-slate-700 rounded-md flex items-center justify-center text-slate-300 text-lg">A</div>
            <div>
              <div className="text-base font-semibold text-foreground">Sheikh Ahmadullah</div>
              <div className="text-xs text-muted-foreground">Lectures</div>
            </div>
          </Link>

          <Link to="/lectures/mizanur-rahman-azhari" className="rounded-xl overflow-hidden bg-card p-4 flex items-center gap-3 hover:shadow-lg transition">
            <div className="w-14 h-14 bg-slate-700 rounded-md flex items-center justify-center text-slate-300 text-lg">M</div>
            <div>
              <div className="text-base font-semibold text-foreground">Mizanur Rahman Azhari</div>
              <div className="text-xs text-muted-foreground">Lectures</div>
            </div>
          </Link>
          
          <Link to="/lectures/rukaiyah" className="rounded-xl overflow-hidden bg-card p-4 flex items-center gap-3 hover:shadow-lg transition">
            <div className="w-14 h-14 bg-slate-700 rounded-md flex items-center justify-center text-slate-300 text-lg">R</div>
            <div>
              <div className="text-base font-semibold text-foreground">Rukaiyah</div>
              <div className="text-xs text-muted-foreground">Long lectures</div>
            </div>
          </Link>
        </div>

        <div className="flex gap-2">
          <Button onClick={() => navigate(-1)} variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
            <div className="w-16 h-16 bg-slate-700 rounded-md flex items-center justify-center text-slate-300">M</div>
