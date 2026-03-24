import { useAppStore } from './store/useAppStore';
import { ZurichNav } from './components/layout/ZurichNav';
import Dashboard from './pages/dashboard';
import ReflexLab from './pages/lab';
import PersonaSquad from './pages/persona';
import DailyLens from './pages/scan';
import EpicJourney from './pages/epic';
import Profile from './pages/profile';

function App() {
  const { currentPage, setPage } = useAppStore();

  const renderPage = () => {
    switch (currentPage) {
      case 'lab': return <ReflexLab />;
      case 'persona': return <PersonaSquad />;
      case 'scan': return <DailyLens />;
      case 'epic': return <EpicJourney />;
      case 'profile': return <Profile />;
      default: return <Dashboard onNavigate={(page: string) => setPage(page)} />;
    }
  };

  return (
    <div className="min-h-screen pb-24 bg-deep">
      {/* Top Header Placeholder (Global) */}
      <header className="p-6 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-accent" />
          <p className="text-[10px] font-mono text-muted uppercase tracking-widest">Reflex OS // System Online</p>
        </div>
      </header>

      <main className="px-6">
        {renderPage()}
      </main>

      {/* Global Navigation */}
      <ZurichNav 
        activeTab={
          currentPage === 'lab' ? '訓練' : 
          currentPage === 'persona' ? '對話' : 
          currentPage === 'scan' ? '掃描' : 
          currentPage === 'profile' ? '我的' : 
          '探索'
        } 
        onTabChange={(tab: string) => {
          if (tab === '訓練') setPage('lab');
          if (tab === '探索') setPage('dashboard');
          if (tab === '對話') setPage('persona');
          if (tab === '掃描') setPage('scan');
          if (tab === '我的') setPage('profile');
        }} 
      />
    </div>
  );
}

export default App;
