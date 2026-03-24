import { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { ZurichCard, ZurichButton } from '../../components/ui/ZurichUI';
import { useAppStore } from '../../store/useAppStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReflexLab() {
  const [progress, setProgress] = useState(100);
  const { lab, recordReaction, setPage } = useAppStore();
  const [questionId, setQuestionId] = useState(0);

  // Mock progress countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev > 0 ? prev - 1 : 100));
    }, 50);
    return () => clearInterval(timer);
  }, []);

  const handleAnswer = (answer: string) => {
    const time = Math.floor(Math.random() * 400) + 300;
    recordReaction(time);
    setProgress(100);
    setQuestionId(prev => prev + 1); // Trigger new question animation
    console.log(`Answered: ${answer} in ${time}ms`);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Lab Header */}
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ChevronLeft 
            size={20} 
            className="text-muted cursor-pointer" 
            onClick={() => setPage('dashboard')}
          />
          <h1 className="text-xl font-display text-white italic tracking-tighter">REFLEX_LAB</h1>
        </div>
        <div className="text-right">
          <motion.div 
            key={lab.combo}
            initial={{ scale: 1.2, color: '#007aff' }}
            animate={{ scale: 1, color: '#007aff' }}
            className="text-[10px] font-mono uppercase tracking-widest font-bold"
          >
            COMBO: X{lab.combo}
          </motion.div>
          <div className="text-[10px] font-mono text-muted uppercase">THRESHOLD: {lab.reactionThreshold}MS</div>
        </div>
      </header>

      {/* Drill Focus Area with AnimatePresence (12 Principles: Anticipation) */}
      <ZurichCard className="relative p-0 overflow-hidden bg-surface-bright border-none h-48 flex items-center justify-center">
        {/* Top Progress Bar (12 Principles: Slow In and Soft Out) */}
        <motion.div 
          className="absolute top-0 left-0 h-[2px] bg-accent"
          animate={{ width: `${progress}%` }}
          transition={{ ease: "linear", duration: 0.05 }}
        />
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={questionId}
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="p-8 text-center space-y-4"
          >
            <p className="text-[10px] font-mono text-muted uppercase tracking-[0.3em]">Neural Drift Active</p>
            <h2 className="text-2xl font-mono font-bold text-white leading-tight tracking-tight">
              The early bird catches the...
            </h2>
          </motion.div>
        </AnimatePresence>
      </ZurichCard>

      {/* Options Grid (12 Principles: Staging) */}
      <div className="grid gap-3">
        {['WORM', 'SUNRISE', 'COFFEE', 'OPPORTUNITY'].map((opt, i) => (
          <ZurichButton 
            key={opt}
            variant={i === 0 ? "secondary" : "ghost"} 
            className="justify-start text-left px-8 py-5 h-auto relative overflow-hidden group"
            onClick={() => handleAnswer(opt)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 + 0.2 }}
          >
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent transform -translate-x-full group-hover:translate-x-0 transition-transform" />
            <span className={`${i === 0 ? "text-accent" : "text-muted"} mr-4 font-mono font-bold`}>
              {String.fromCharCode(65 + i)}
            </span> 
            {opt}
          </ZurichButton>
        ))}
      </div>

      {/* Performance Readout */}
      <footer className="pt-4 space-y-2">
        <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest text-muted">
          <span>Processing...</span>
          <motion.span 
            key={lab.lastReaction}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={lab.lastReaction < 700 ? "text-accent font-bold" : ""}
          >
            {lab.lastReaction}MS ({lab.lastReaction < 700 ? 'EXCELLENT' : 'GOOD'})
          </motion.span>
        </div>
        <div className="h-[1px] w-full bg-white/5" />
      </footer>
    </div>
  );
}
