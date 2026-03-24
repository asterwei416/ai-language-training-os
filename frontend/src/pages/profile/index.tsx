import { User, Settings, Shield, Award, BarChart3, ChevronLeft } from 'lucide-react';
import { ZurichCard } from '../../components/ui/ZurichUI';
import { useAppStore } from '../../store/useAppStore';

export default function Profile() {
  const { user, lab, setPage } = useAppStore();

  return (
    <div className="flex flex-col gap-6">
      {/* Profile Header */}
      <header className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <ChevronLeft 
            size={20} 
            className="text-muted cursor-pointer" 
            onClick={() => setPage('dashboard')}
          />
          <div className="w-12 h-12 bg-surface-bright flex items-center justify-center border border-white/5">
            <User size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-display text-white">{user.name}</h1>
            <p className="text-[10px] font-mono text-accent uppercase tracking-widest">Premium Member // ID: {user.id}</p>
          </div>
        </div>
        <div className="p-2 bg-surface-bright border border-white/5">
          <Settings size={20} className="text-muted" />
        </div>
      </header>

      {/* Skills Radar / Metrics Summary */}
      <ZurichCard className="bg-surface-bright border-none">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 size={16} className="text-accent" />
          <h2 className="text-xs font-mono text-white uppercase tracking-widest">能力分佈 (Core Metrics)</h2>
        </div>
        <div className="grid grid-cols-2 gap-y-4 gap-x-8">
          {[
            { label: '反應速度', value: `${lab.lastReaction}ms`, rank: lab.lastReaction < 700 ? 'S' : 'A' },
            { label: '語法準確率', value: '94%', rank: 'S' },
            { label: '詞彙廣度', value: '4.2K', rank: 'B+' },
            { label: '發音清晰度', value: '88%', rank: 'B' },
          ].map((stat) => (
            <div key={stat.label} className="space-y-1">
              <div className="flex justify-between items-end">
                <span className="text-[10px] text-muted uppercase font-mono">{stat.label}</span>
                <span className="text-xs font-mono text-accent">{stat.rank}</span>
              </div>
              <p className="text-base font-display text-white">{stat.value}</p>
            </div>
          ))}
        </div>
      </ZurichCard>

      {/* Certification / CEFR */}
      <section className="grid grid-cols-2 gap-4">
        <ZurichCard variant="outline" className="border-accent/40 bg-accent/5">
          <Award size={20} className="text-accent mb-2" />
          <p className="text-[10px] font-mono text-muted uppercase">當前等級</p>
          <h3 className="text-2xl font-display text-white">CEFR {user.cefr}</h3>
        </ZurichCard>
        <ZurichCard variant="outline">
          <Shield size={20} className="text-muted mb-2" />
          <p className="text-[10px] font-mono text-muted uppercase">語言防禦力</p>
          <h3 className="text-2xl font-display text-white">{90 + user.streak/10}</h3>
        </ZurichCard>
      </section>

      {/* Menu Options */}
      <div className="space-y-2">
        {[
          { icon: <Award size={18} />, label: '成就勳章', detail: '12 UNLOCKED' },
          { icon: <BarChart3 size={18} />, label: '訓練日誌', detail: `${user.streak} DAYS RECORD` },
          { icon: <Settings size={18} />, label: '系統校準', detail: 'AUTO-OPTIMIZE' },
        ].map((item) => (
          <ZurichCard key={item.label} className="py-4 hover:bg-surface-bright cursor-pointer border-transparent">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-muted">{item.icon}</div>
                <span className="text-sm text-white">{item.label}</span>
              </div>
              <span className="text-[10px] font-mono text-muted uppercase">{item.detail}</span>
            </div>
          </ZurichCard>
        ))}
      </div>

      {/* System Status Footer */}
      <footer className="mt-auto opacity-30 pt-6">
        <p className="text-[10px] font-mono text-center uppercase tracking-[0.3em]">Reflex OS Neural Engine // Rev 4.0.2</p>
      </footer>
    </div>
  );
}
