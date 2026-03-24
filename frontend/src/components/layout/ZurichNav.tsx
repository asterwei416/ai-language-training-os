import { Compass, MessageSquare, Scan, Zap, User } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const NavItem = ({ icon, label, isActive, onClick }: NavItemProps) => (
  <button
    onClick={onClick}
    className={cn(
      "flex flex-1 flex-col items-center justify-center gap-1 py-2 transition-colors",
      "border-b-2",
      isActive ? "border-accent text-accent" : "border-transparent text-muted hover:text-white"
    )}
  >
    {icon}
    <span className="text-[10px] font-medium tracking-tight">{label}</span>
  </button>
);

export const ZurichNav = ({ 
  activeTab = '訓練', 
  onTabChange 
}: { 
  activeTab?: string; 
  onTabChange?: (id: string) => void 
}) => {
  const tabs = [
    { id: '探索', icon: <Compass size={20} />, label: '探索' },
    { id: '對話', icon: <MessageSquare size={20} />, label: '對話' },
    { id: '掃描', icon: <Scan size={20} />, label: '掃描' },
    { id: '訓練', icon: <Zap size={20} />, label: '訓練' },
    { id: '我的', icon: <User size={20} />, label: '我的' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 flex w-full bg-surface border-t border-white/5 safe-area-bottom z-50">
      {tabs.map((tab) => (
        <NavItem
          key={tab.id}
          icon={tab.icon}
          label={tab.label}
          isActive={activeTab === tab.id}
          onClick={() => onTabChange?.(tab.id)}
        />
      ))}
    </nav>
  );
};
