import { create } from 'zustand';

// ─── User ─────────────────────────────────────────────────────────────────────

interface UserProfile {
  id: string;
  name: string;
  email: string;
  cefr: string;
  progress: number;
  streak: number;
}

// ─── Lab (Lesson-based) ───────────────────────────────────────────────────────

export interface LessonSession {
  lessonId: string;
  currentSentenceIndex: number;         // 0–9
  revealedSentences: number[];          // indices where answer was revealed
  readAloudSentences: number[];         // indices where user confirmed read-aloud
  completed: boolean;
}

export interface LessonRecord {
  lessonId: string;
  completedAt: string; // ISO date string
}

// ─── localStorage ─────────────────────────────────────────────────────────────

const USERS_KEY = 'reflex_users';
const SESSION_KEY = 'reflex_session';
const LESSON_HISTORY_KEY = 'reflex_lesson_history';
const API_SETTINGS_KEY = 'reflex_api_settings';
const CUSTOM_LESSONS_KEY = 'reflex_custom_lessons';

interface StoredUser {
  id: string;
  name: string;
  email: string;
  password: string;
  cefr: string;
  progress: number;
  streak: number;
}

function getStoredUsers(): StoredUser[] {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); }
  catch { return []; }
}

function saveStoredUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getSession(): UserProfile | null {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); }
  catch { return null; }
}

function saveSession(user: UserProfile) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

function getLessonHistory(): LessonRecord[] {
  try { return JSON.parse(localStorage.getItem(LESSON_HISTORY_KEY) || '[]'); }
  catch { return []; }
}

function saveLessonHistory(history: LessonRecord[]) {
  localStorage.setItem(LESSON_HISTORY_KEY, JSON.stringify(history));
}

// ─── API Settings ──────────────────────────────────────────────────────────────

export type AIProvider = 'anthropic' | 'openai' | 'google';

export interface ApiSettings {
  provider: AIProvider;
  apiKey: string;
  model: string;
}

const DEFAULT_MODELS: Record<AIProvider, string> = {
  anthropic: 'claude-haiku-4-5-20251001',
  openai: 'gpt-4o-mini',
  google: 'gemini-1.5-flash',
};

function getApiSettings(): ApiSettings {
  try {
    const stored = JSON.parse(localStorage.getItem(API_SETTINGS_KEY) || 'null');
    if (stored) return stored;
  } catch { /* empty */ }
  return { provider: 'anthropic', apiKey: '', model: DEFAULT_MODELS.anthropic };
}

function saveApiSettings(settings: ApiSettings) {
  localStorage.setItem(API_SETTINGS_KEY, JSON.stringify(settings));
}

// ─── Custom Lessons ────────────────────────────────────────────────────────────

import type { Lesson } from '../data/labLessons';

function getCustomLessons(): Lesson[] {
  try { return JSON.parse(localStorage.getItem(CUSTOM_LESSONS_KEY) || '[]'); }
  catch { return []; }
}

function saveCustomLessons(lessons: Lesson[]) {
  localStorage.setItem(CUSTOM_LESSONS_KEY, JSON.stringify(lessons));
}

// ─── State ────────────────────────────────────────────────────────────────────

const existingSession = getSession();

interface AppState {
  currentPage: string;
  isAuthenticated: boolean;
  authMode: 'login' | 'register';
  user: UserProfile;

  // Lab
  lessonHistory: LessonRecord[];
  lessonSession: LessonSession | null;
  customLessons: Lesson[];

  // API Settings
  apiSettings: ApiSettings;

  // Auth
  setAuthMode: (mode: 'login' | 'register') => void;
  login: (email: string, password: string) => { success: boolean; error?: string };
  register: (name: string, email: string, password: string) => { success: boolean; error?: string };
  googleLogin: (credential: string) => { success: boolean; error?: string };
  logout: () => void;

  // App
  setPage: (page: string) => void;
  updateUser: (updates: Partial<UserProfile>) => void;

  // API Settings
  updateApiSettings: (updates: Partial<ApiSettings>) => void;
  getDefaultModel: (provider: AIProvider) => string;

  // Lab
  startLesson: (lessonId: string) => void;
  revealAnswer: () => void;
  confirmReadAloud: () => void;
  exitLesson: () => void;
  addCustomLesson: (lesson: Lesson) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  currentPage: 'dashboard',
  isAuthenticated: !!existingSession,
  authMode: 'login',

  user: existingSession ?? {
    id: '', name: '', email: '', cefr: 'A1', progress: 0, streak: 0,
  },

  lessonHistory: getLessonHistory(),
  lessonSession: null,
  customLessons: getCustomLessons(),
  apiSettings: getApiSettings(),

  // ── Auth ─────────────────────────────────────────────────────────────────────

  setAuthMode: (mode) => set({ authMode: mode }),

  login: (email, password) => {
    const users = getStoredUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) return { success: false, error: '帳號或密碼錯誤' };
    const profile: UserProfile = {
      id: found.id, name: found.name, email: found.email,
      cefr: found.cefr, progress: found.progress, streak: found.streak,
    };
    saveSession(profile);
    set({ isAuthenticated: true, user: profile, currentPage: 'dashboard' });
    return { success: true };
  },

  register: (name, email, password) => {
    const users = getStoredUsers();
    if (users.find((u) => u.email.toLowerCase() === email.toLowerCase()))
      return { success: false, error: '此 Email 已被註冊' };
    const newUser: StoredUser = {
      id: `TR-${String(users.length + 1).padStart(3, '0')}`,
      name: name.toUpperCase().replace(/\s+/g, '_'),
      email, password, cefr: 'A1', progress: 0, streak: 0,
    };
    saveStoredUsers([...users, newUser]);
    const profile: UserProfile = {
      id: newUser.id, name: newUser.name, email: newUser.email,
      cefr: newUser.cefr, progress: newUser.progress, streak: newUser.streak,
    };
    saveSession(profile);
    set({ isAuthenticated: true, user: profile, currentPage: 'dashboard' });
    return { success: true };
  },

  googleLogin: (credential) => {
    try {
      const payload = JSON.parse(atob(credential.split('.')[1]));
      const email: string = payload.email ?? '';
      const googleName: string = payload.name ?? email.split('@')[0];
      const users = getStoredUsers();
      let found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (!found) {
        found = {
          id: `TR-${String(users.length + 1).padStart(3, '0')}`,
          name: googleName.toUpperCase().replace(/\s+/g, '_'),
          email, password: '', cefr: 'A1', progress: 0, streak: 0,
        };
        saveStoredUsers([...users, found]);
      }
      const profile: UserProfile = {
        id: found.id, name: found.name, email: found.email,
        cefr: found.cefr, progress: found.progress, streak: found.streak,
      };
      saveSession(profile);
      set({ isAuthenticated: true, user: profile, currentPage: 'dashboard' });
      return { success: true };
    } catch {
      return { success: false, error: 'Google 登入失敗，請再試一次' };
    }
  },

  logout: () => {
    clearSession();
    set({
      isAuthenticated: false, authMode: 'login',
      user: { id: '', name: '', email: '', cefr: 'A1', progress: 0, streak: 0 },
      lessonSession: null, currentPage: 'dashboard',
    });
  },

  // ── App ──────────────────────────────────────────────────────────────────────

  setPage: (page) => set({ currentPage: page }),

  updateUser: (updates) =>
    set((state) => {
      const updated = { ...state.user, ...updates };
      saveSession(updated);
      return { user: updated };
    }),

  updateApiSettings: (updates) =>
    set((state) => {
      const updated = { ...state.apiSettings, ...updates };
      // If provider changed, reset model to default for that provider
      if (updates.provider && updates.provider !== state.apiSettings.provider) {
        updated.model = DEFAULT_MODELS[updates.provider];
      }
      saveApiSettings(updated);
      return { apiSettings: updated };
    }),

  getDefaultModel: (provider) => DEFAULT_MODELS[provider],

  // ── Lab ──────────────────────────────────────────────────────────────────────

  startLesson: (lessonId) =>
    set({
      lessonSession: {
        lessonId,
        currentSentenceIndex: 0,
        revealedSentences: [],
        readAloudSentences: [],
        completed: false,
      },
    }),

  revealAnswer: () =>
    set((state) => {
      if (!state.lessonSession) return {};
      const idx = state.lessonSession.currentSentenceIndex;
      const already = state.lessonSession.revealedSentences.includes(idx);
      if (already) return {};
      return {
        lessonSession: {
          ...state.lessonSession,
          revealedSentences: [...state.lessonSession.revealedSentences, idx],
        },
      };
    }),

  confirmReadAloud: () => {
    const state = get();
    if (!state.lessonSession) return;

    const { lessonSession } = state;
    const idx = lessonSession.currentSentenceIndex;
    const readAloud = [...lessonSession.readAloudSentences, idx];
    const nextIdx = idx + 1;
    const isLast = nextIdx >= 10;

    if (isLast) {
      // Mark lesson as complete
      const record: LessonRecord = {
        lessonId: lessonSession.lessonId,
        completedAt: new Date().toISOString(),
      };
      const history = [...state.lessonHistory, record];
      saveLessonHistory(history);
      set({
        lessonHistory: history,
        lessonSession: { ...lessonSession, readAloudSentences: readAloud, completed: true },
      });
    } else {
      set({
        lessonSession: {
          ...lessonSession,
          readAloudSentences: readAloud,
          currentSentenceIndex: nextIdx,
          revealedSentences: lessonSession.revealedSentences, // keep previous, new sentence is fresh
        },
      });
    }
  },

  exitLesson: () => set({ lessonSession: null }),

  addCustomLesson: (lesson) =>
    set((state) => {
      // Avoid duplicates by id
      const filtered = state.customLessons.filter((l) => l.id !== lesson.id);
      const updated = [lesson, ...filtered];
      saveCustomLessons(updated);
      return { customLessons: updated };
    }),
}));
