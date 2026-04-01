import { Zap, BookOpen, Scan, Users, ChevronRight } from 'lucide-react';
import { ZurichCard } from '../../components/ui/ZurichUI';
import { useAppStore } from '../../store/useAppStore';

interface ModuleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  accent?: string;
  onClick?: () => void;
}

const ModuleCard = ({ title, description, icon, accent = "text-accent", onClick }: ModuleCardProps) => (
  <ZurichCard 
    className="group cursor-pointer hover:bg-surface-bright border-l-2 border-transparent hover:border-accent active:scale-[0.99] transition-all"
    onClick={onClick}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className={`p-3 bg-white/5 ${accent}`}>
          {icon}
        </div>
        <div>
          <h3 className="font-display text-base text-white">{title}</h3>
          <p className="text-xs text-muted uppercase font-mono tracking-tight">{description}</p>
        </div>
      </div>
      <ChevronRight size={18} className="text-muted group-hover:text-accent transition-colors" />
    </div>
  </ZurichCard>
);

export default function Dashboard({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { user, lessonHistory } = useAppStore();
  const completedLessons = lessonHistory.length;

  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <section className="space-y-1">
        <h1 className="text-3xl font-display text-white tracking-tighter">策略儀表板</h1>
        <p className="text-xs font-mono text-muted uppercase tracking-[0.2em]">Reflex OS // {user.id}</p>
      </section>

      {/* Main Modules Grid */}
      <section className="grid gap-4">
        <ModuleCard 
          title="反射實驗室 (Reflex Lab)"
          description={`意群切塊訓練 // ${completedLessons} 主題完成`}
          icon={<Zap size={24} />}
          onClick={() => onNavigate('lab')}
        />
        <ModuleCard 
          title="沈浸式劇情 (Epic Journey)"
          description="當前任務：倫敦街頭 // STAGE 4"
          icon={<BookOpen size={24} />}
          onClick={() => onNavigate('epic')}
        />
        <ModuleCard 
          title="實境掃描儀 (Daily Lens)"
          description="AR 物件辨識 // READY"
          icon={<Scan size={24} />}
          onClick={() => onNavigate('scan')}
        />
        <ModuleCard 
          title="角色對話空間 (Persona Squad)"
          description="在線導師：SARA // ENGLISH ONLY"
          icon={<Users size={24} />}
          onClick={() => onNavigate('persona')}
        />
      </section>

      {/* Stats Summary */}
      <section className="pt-4 border-t border-white/5">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-muted uppercase tracking-widest">系統評級</span>
            <div className="text-2xl font-display text-accent">CEFR {user.cefr}</div>
          </div>
          <div className="text-right space-y-1">
            <span className="text-[10px] font-mono text-muted uppercase tracking-widest">今日進度</span>
            <div className="text-sm font-mono text-white">{user.progress}% COMPLETE</div>
          </div>
        </div>
        <div className="mt-2 h-[1px] w-full bg-white/10">
          <div className="h-full bg-accent transition-all duration-500" style={{ width: `${user.progress}%` }} />
        </div>
      </section>
    </div>
  );
}
