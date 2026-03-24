import { create } from 'zustand';

interface UserProfile {
  id: string;
  name: string;
  cefr: string;
  progress: number;
  streak: number;
}

interface LabStats {
  reactionThreshold: number;
  lastReaction: number;
  combo: number;
}

interface AppState {
  currentPage: string;
  user: UserProfile;
  lab: LabStats;
  
  // Actions
  setPage: (page: string) => void;
  updateUser: (updates: Partial<UserProfile>) => void;
  updateLab: (updates: Partial<LabStats>) => void;
  recordReaction: (time: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentPage: 'dashboard',
  user: {
    id: 'TR-001',
    name: 'TRIST_REFLEX',
    cefr: 'C1',
    progress: 85,
    streak: 15
  },
  lab: {
    reactionThreshold: 800,
    lastReaction: 650,
    combo: 12
  },

  setPage: (page) => set({ currentPage: page }),
  
  updateUser: (updates) => set((state) => ({ 
    user: { ...state.user, ...updates } 
  })),
  
  updateLab: (updates) => set((state) => ({ 
    lab: { ...state.lab, ...updates } 
  })),

  recordReaction: (time) => set((state) => ({
    lab: {
      ...state.lab,
      lastReaction: time,
      combo: time < state.lab.reactionThreshold ? state.lab.combo + 1 : 0
    }
  }))
}));
