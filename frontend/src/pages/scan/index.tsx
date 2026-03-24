import { ChevronLeft, Zap, Info } from 'lucide-react';
import { ZurichCard } from '../../components/ui/ZurichUI';

export default function DailyLens() {
  return (
    <div className="flex flex-col h-[calc(100vh-180px)] -mx-6 -mt-8 relative overflow-hidden bg-black">
      {/* AR Viewport Simulation */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_90%)] z-10" />
      
      {/* Mocking Camera Image via CSS Grid/Pattern */}
      <div className="absolute inset-0 bg-[#121212] flex items-center justify-center">
        <div className="w-full h-full opacity-10" style={{ 
          backgroundImage: 'radial-gradient(white 1px, transparent 1px)', 
          backgroundSize: '20px 20px' 
        }} />
      </div>

      {/* AR Overlay Elements */}
      <div className="relative z-20 p-6 flex flex-col h-full">
        {/* Header */}
        <header className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white/10">
              <ChevronLeft size={20} className="text-white cursor-pointer" />
            </div>
            <h1 className="text-lg font-display text-white tracking-widest uppercase">Daily Lens</h1>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] font-mono text-accent uppercase tracking-tighter">Scanning Mode: Semantic</span>
            <span className="text-[10px] font-mono text-muted uppercase">SNR: 98.4%</span>
          </div>
        </header>

        {/* Scan Target Frame */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-64 h-64 border-2 border-white/20">
            {/* Corner Markers */}
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-accent" />
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-accent" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-accent" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-accent" />
            
            {/* Tracking Tag */}
            <div className="absolute top-1/2 left-full ml-4 -translate-y-1/2">
              <div className="flex items-center gap-2">
                <div className="h-[1px] w-8 bg-accent" />
                <ZurichCard className="bg-accent text-white p-3 py-2 min-w-[120px]">
                  <p className="text-[10px] font-mono uppercase text-white/70 mb-1">Detected Obj</p>
                  <p className="text-sm font-display font-bold">COFFEE MUG</p>
                  <div className="flex items-center gap-1 mt-1 text-[10px] uppercase font-mono">
                    <Zap size={8} /> 94% CONFIDENCE
                  </div>
                </ZurichCard>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <footer className="mt-auto space-y-4">
          <div className="flex justify-center gap-4">
            <button className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center p-1 group">
              <div className="w-full h-full bg-white group-active:scale-95 transition-transform" />
            </button>
          </div>
          
          <ZurichCard className="bg-white/5 border-white/10 backdrop-blur-md">
            <div className="flex gap-4 items-start">
              <Info size={16} className="text-accent mt-1" />
              <div className="space-y-1">
                <p className="text-xs text-white">點擊物體進行語義分析並加入「反射實驗室」題庫。</p>
                <p className="text-[10px] font-mono text-muted uppercase tracking-widest text-right">0/5 SCANNED TODAY</p>
              </div>
            </div>
          </ZurichCard>
        </footer>
      </div>
    </div>
  );
}
