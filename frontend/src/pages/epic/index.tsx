import { MapPin, ChevronLeft, Lock, Star } from 'lucide-react';
import { ZurichCard } from '../../components/ui/ZurichUI';

interface MissionNode {
  id: number;
  title: string;
  location: string;
  status: 'completed' | 'current' | 'locked';
  difficulty: string;
}

export default function EpicJourney() {
  const missions: MissionNode[] = [
    { id: 1, title: '機場抵達 (Arrival)', location: 'HEATHROW AIRPORT', status: 'completed', difficulty: 'A1' },
    { id: 2, title: '飯店入住 (Check-in)', location: 'CENTRAL LONDON', status: 'completed', difficulty: 'A2' },
    { id: 3, title: '地鐵迷蹤 (The Tube)', location: 'OXFORD CIRCUS', status: 'current', difficulty: 'B1' },
    { id: 4, title: '商務會議 (Briefing)', location: 'THE CITY', status: 'locked', difficulty: 'B2' },
    { id: 5, title: '晚宴外交 (Gala)', location: 'WESTMINSTER', status: 'locked', difficulty: 'C1' },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Epic Header */}
      <header className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <ChevronLeft size={20} className="text-muted cursor-pointer" />
          <h1 className="text-xl font-display text-white">Epic Journey</h1>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-mono text-accent uppercase tracking-widest">
            CHAPTER 1: LONDON FOG
          </div>
        </div>
      </header>

      {/* Strategy Map (Vertical Timeline) */}
      <div className="relative pl-8 space-y-12 py-4">
        {/* Map Line */}
        <div className="absolute left-[15px] top-0 bottom-0 w-[2px] bg-white/5" />
        
        {missions.map((mission) => (
          <div key={mission.id} className="relative">
            {/* Node Marker */}
            <div className={`absolute -left-[24px] w-4 h-4 z-10 ${
              mission.status === 'completed' ? 'bg-accent' : 
              mission.status === 'current' ? 'bg-white border-4 border-accent animate-pulse' : 
              'bg-surface-bright border border-white/20'
            }`} />
            
            <ZurichCard className={`transition-all ${
              mission.status === 'locked' ? 'opacity-40 grayscale' : 'hover:bg-surface-bright cursor-pointer'
            }`}>
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-accent uppercase tracking-tighter">LV. {mission.difficulty}</span>
                    {mission.status === 'completed' && <Star size={10} className="text-accent fill-accent" />}
                  </div>
                  <h3 className="text-base font-display text-white uppercase">{mission.title}</h3>
                  <div className="flex items-center gap-1 text-[10px] font-mono text-muted uppercase">
                    <MapPin size={10} /> {mission.location}
                  </div>
                </div>
                {mission.status === 'locked' && <Lock size={16} className="text-muted" />}
              </div>
            </ZurichCard>
          </div>
        ))}
      </div>

      {/* Progress Sync */}
      <footer className="pt-4 border-t border-white/5">
        <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest text-muted">
          <span>戰略同步：已更新</span>
          <span>COMPLETION: 42%</span>
        </div>
      </footer>
    </div>
  );
}
