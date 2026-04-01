import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, Volume2, Mic, MicOff, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZurichCard, ZurichButton } from '../../components/ui/ZurichUI';
import { useAppStore } from '../../store/useAppStore';
import { LESSONS, getAvailableLessons, getLessonById } from '../../data/labLessons';
import { generateLesson } from '../../data/generateLesson';

// ─── Speech helpers ───────────────────────────────────────────────────────────

function speakText(text: string): Promise<void> {
  return new Promise((resolve) => {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-US';
    utter.rate = 0.85;
    utter.pitch = 1;
    // Prefer a natural English voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(
      (v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha'))
    );
    if (preferred) utter.voice = preferred;
    utter.onend = () => resolve();
    utter.onerror = () => resolve();
    window.speechSynthesis.speak(utter);
  });
}

function normalizeSpeech(text: string): string {
  return text
    .toLowerCase()
    .replace(/[.,!?;:'"()\-–—]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function calcMatchScore(original: string, spoken: string): number {
  const origWords = normalizeSpeech(original).split(' ');
  const spokenWords = new Set(normalizeSpeech(spoken).split(' '));
  const matched = origWords.filter((w) => spokenWords.has(w)).length;
  return Math.round((matched / origWords.length) * 100);
}

// SpeechRecognition type shim
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

// ─── Topic Select ─────────────────────────────────────────────────────────────

function TopicSelect({ onBack }: { onBack: () => void }) {
  const { lessonHistory, startLesson, customLessons, addCustomLesson, apiSettings, setPage } = useAppStore();
  const completedIds = lessonHistory.map((r) => r.lessonId);
  const available = getAvailableLessons(completedIds);
  const allBuiltIn = LESSONS;

  const [customTopic, setCustomTopic] = useState('');
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError] = useState('');

  const handleGenerate = async () => {
    if (!customTopic.trim()) return;
    if (!apiSettings.apiKey.trim()) {
      setGenError('請先到個人頁面設定 API Key');
      return;
    }
    setGenerating(true);
    setGenError('');
    try {
      const lesson = await generateLesson(apiSettings, customTopic.trim());
      addCustomLesson(lesson);
      startLesson(lesson.id);
    } catch (err) {
      setGenError(err instanceof Error ? err.message : '生成失敗，請再試一次');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-center gap-2">
        <ChevronLeft size={20} className="text-muted cursor-pointer" onClick={onBack} />
        <h1 className="text-xl font-display text-white italic tracking-tighter">REFLEX_LAB</h1>
      </header>

      <div className="space-y-1">
        <p className="text-[10px] font-mono text-accent uppercase tracking-[0.3em]">// 選擇今日主題</p>
        <p className="text-[10px] font-mono text-muted uppercase tracking-widest">
          已完成 {completedIds.length} / {allBuiltIn.length} 內建主題
        </p>
      </div>

      {/* AI Custom Topic */}
      <ZurichCard className="bg-accent/5 border border-accent/20 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-accent" />
          <p className="text-[10px] font-mono text-accent uppercase tracking-widest">AI 自訂主題生成</p>
        </div>
        <div className="flex gap-2">
          <input
            value={customTopic}
            onChange={(e) => setCustomTopic(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !generating && handleGenerate()}
            placeholder="輸入任何主題，例如：第一次面試"
            disabled={generating}
            className="flex-1 bg-transparent border border-white/10 px-3 py-2 text-xs font-mono text-white placeholder-muted/40 focus:outline-none focus:border-accent/50 transition-colors disabled:opacity-40"
          />
          <button
            onClick={handleGenerate}
            disabled={generating || !customTopic.trim()}
            className="px-4 py-2 bg-accent text-black font-mono text-[10px] uppercase tracking-widest hover:bg-accent/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {generating ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
            {generating ? '生成中...' : '生成'}
          </button>
        </div>
        {genError && (
          <div className="flex items-start gap-2">
            <AlertCircle size={12} className="text-red-400 mt-0.5 flex-shrink-0" />
            <p className="text-[10px] font-mono text-red-400">{genError}</p>
            {genError.includes('API Key') && (
              <button
                onClick={() => setPage('profile')}
                className="ml-auto text-[10px] font-mono text-accent underline whitespace-nowrap"
              >
                前往設定
              </button>
            )}
          </div>
        )}
        <p className="text-[9px] font-mono text-muted/50">
          使用你的 {apiSettings.provider === 'anthropic' ? 'Anthropic' : apiSettings.provider === 'openai' ? 'OpenAI' : 'Google'} API Key // {apiSettings.model}
        </p>
      </ZurichCard>

      {/* Custom lessons history */}
      {customLessons.length > 0 && (
        <div className="space-y-2">
          <p className="text-[9px] font-mono text-muted uppercase tracking-[0.3em]">// 已生成的自訂課程</p>
          {customLessons.map((lesson) => {
            const done = completedIds.includes(lesson.id);
            return (
              <ZurichCard
                key={lesson.id}
                className={`transition-all border-l-2 ${
                  done
                    ? 'opacity-40 grayscale cursor-not-allowed border-transparent'
                    : 'cursor-pointer hover:bg-surface-bright hover:border-accent border-transparent'
                }`}
                onClick={() => !done && startLesson(lesson.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-accent/70 uppercase tracking-tighter">AI // {lesson.level}</span>
                      {done && <CheckCircle size={10} className="text-accent" />}
                    </div>
                    <h3 className="text-sm font-display text-white uppercase">{lesson.topic}</h3>
                    <p className="text-[10px] font-mono text-muted">{lesson.topicEn}</p>
                  </div>
                  {!done && <ChevronRight size={16} className="text-muted" />}
                </div>
              </ZurichCard>
            );
          })}
        </div>
      )}

      {/* Built-in lessons */}
      <div className="space-y-2">
        <p className="text-[9px] font-mono text-muted uppercase tracking-[0.3em]">// 內建課程</p>
        {allBuiltIn.map((lesson) => {
          const done = completedIds.includes(lesson.id);
          return (
            <ZurichCard
              key={lesson.id}
              className={`transition-all border-l-2 ${
                done
                  ? 'opacity-40 grayscale cursor-not-allowed border-transparent'
                  : 'cursor-pointer hover:bg-surface-bright hover:border-accent border-transparent'
              }`}
              onClick={() => !done && startLesson(lesson.id)}
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-accent uppercase tracking-tighter">{lesson.level}</span>
                    {done && <CheckCircle size={10} className="text-accent" />}
                  </div>
                  <h3 className="text-sm font-display text-white uppercase">{lesson.topic}</h3>
                  <p className="text-[10px] font-mono text-muted">{lesson.topicEn}</p>
                </div>
                {!done && <ChevronRight size={16} className="text-muted" />}
              </div>
            </ZurichCard>
          );
        })}
      </div>
    </div>
  );
}

// ─── Drill View ───────────────────────────────────────────────────────────────

type SpeechPhase = 'idle' | 'tts_playing' | 'waiting_user' | 'recording' | 'result';

function DrillView() {
  const { lessonSession, revealAnswer, confirmReadAloud, exitLesson, customLessons } = useAppStore();

  const [speechPhase, setSpeechPhase] = useState<SpeechPhase>('idle');
  const [matchScore, setMatchScore] = useState<number | null>(null);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  if (!lessonSession) return null;
  const lesson = getLessonById(lessonSession.lessonId) ?? customLessons.find((l) => l.id === lessonSession.lessonId);
  if (!lesson) return null;

  const { currentSentenceIndex, revealedSentences, completed } = lessonSession;
  const sentence = lesson.sentences[currentSentenceIndex];
  const isRevealed = revealedSentences.includes(currentSentenceIndex);
  const progress = Math.round((currentSentenceIndex / lesson.sentences.length) * 100);

  if (completed) return <CompletedView lesson={lesson as ReturnType<typeof getLessonById>} onExit={exitLesson} />;

  // ── TTS demo ────────────────────────────────────────────────────────────────
  const handleListen = async () => {
    setSpeechPhase('tts_playing');
    setMatchScore(null);
    setTranscript('');
    await speakText(sentence.original);
    setSpeechPhase('waiting_user');
  };

  // ── STT record ──────────────────────────────────────────────────────────────
  const handleStartRecording = () => {
    const SRConstructor = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SRConstructor) {
      alert('您的瀏覽器不支援語音辨識，請使用 Chrome 或 Edge。');
      return;
    }
    const recognition = new SRConstructor();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (e) => {
      const spoken = e.results[0][0].transcript;
      setTranscript(spoken);
      const score = calcMatchScore(sentence.original, spoken);
      setMatchScore(score);
      setSpeechPhase('result');
    };
    recognition.onerror = () => setSpeechPhase('waiting_user');
    recognition.onend = () => {
      if (speechPhase === 'recording') setSpeechPhase('waiting_user');
    };

    recognitionRef.current = recognition;
    recognition.start();
    setSpeechPhase('recording');
  };

  const handleStopRecording = () => {
    recognitionRef.current?.stop();
    setSpeechPhase('waiting_user');
  };

  // ── Next sentence ────────────────────────────────────────────────────────────
  const handleNext = () => {
    setSpeechPhase('idle');
    setMatchScore(null);
    setTranscript('');
    confirmReadAloud();
  };

  const scoreColor = matchScore === null ? '' : matchScore >= 80 ? 'text-accent' : matchScore >= 50 ? 'text-yellow-400' : 'text-red-400';
  const scoreLabel = matchScore === null ? '' : matchScore >= 80 ? '發音吻合 ✓' : matchScore >= 50 ? '部分吻合，再試一次' : '差距較大，建議再練';

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ChevronLeft size={20} className="text-muted cursor-pointer" onClick={exitLesson} />
          <h1 className="text-xl font-display text-white italic tracking-tighter">REFLEX_LAB</h1>
        </div>
        <span className="text-[10px] font-mono text-accent uppercase tracking-widest">
          {currentSentenceIndex + 1} / {lesson.sentences.length}
        </span>
      </header>

      {/* Progress bar */}
      <div className="h-[2px] w-full bg-white/5">
        <motion.div
          className="h-full bg-accent"
          animate={{ width: `${progress}%` }}
          transition={{ ease: 'easeOut', duration: 0.4 }}
        />
      </div>

      <p className="text-[9px] font-mono text-muted uppercase tracking-[0.3em]">
        {lesson.level} // {lesson.topicEn}
      </p>

      {/* Sentence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSentenceIndex}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="space-y-4"
        >
          <ZurichCard className="bg-surface-bright border-none py-8 text-center space-y-3">
            <p className="text-[9px] font-mono text-muted uppercase tracking-[0.3em]">感受意群，找出自然停頓的地方</p>
            <p className="text-lg font-sans text-white leading-relaxed px-2">{sentence.original}</p>
          </ZurichCard>

          {/* Answer chunks */}
          <AnimatePresence>
            {isRevealed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <ZurichCard className="bg-transparent border border-accent/30 space-y-4 py-5">
                  <p className="text-[9px] font-mono text-accent uppercase tracking-[0.3em]">意群切法</p>
                  <div className="space-y-3">
                    {sentence.chunks.map((chunk, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <span className="mt-1 flex-shrink-0 w-5 h-5 bg-accent/10 flex items-center justify-center text-[9px] font-mono text-accent">
                          {i + 1}
                        </span>
                        <div className="space-y-1">
                          <p className="text-sm font-sans text-white">{chunk.text}</p>
                          <p className="text-[9px] font-mono text-accent/70 uppercase tracking-widest">{chunk.label}</p>
                          {chunk.explanation && (
                            <p className="text-[10px] font-sans text-muted/80 leading-relaxed pt-0.5">{chunk.explanation}</p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </ZurichCard>

                {/* Translation */}
                <div className="px-1 space-y-1">
                  <p className="text-[9px] font-mono text-muted/60 uppercase tracking-widest">中文翻譯</p>
                  <p className="text-sm font-sans text-muted leading-relaxed">{sentence.translation}</p>
                </div>

                {/* Sentence Pattern Card */}
                {sentence.pattern && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <ZurichCard className="bg-accent/5 border border-accent/20 space-y-4 py-5">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono text-accent uppercase tracking-[0.3em]">句型複利法</span>
                        <div className="h-[1px] flex-1 bg-accent/20" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-[9px] font-mono text-muted/60 uppercase tracking-widest">句型骨架</p>
                        <p className="text-sm font-mono text-accent">{sentence.pattern.skeleton}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[9px] font-mono text-muted/60 uppercase tracking-widest">功能說明</p>
                        <p className="text-xs font-sans text-white/80 leading-relaxed">{sentence.pattern.function}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[9px] font-mono text-muted/60 uppercase tracking-widest">複利例句</p>
                        {sentence.pattern.examples.map((ex, i) => (
                          <div key={i} className="pl-3 border-l border-accent/30 space-y-0.5">
                            <p className="text-xs font-sans text-white">{ex.en}</p>
                            <p className="text-[10px] font-sans text-muted/70">{ex.zh}</p>
                          </div>
                        ))}
                      </div>
                    </ZurichCard>
                  </motion.div>
                )}

                {/* TTS + STT section */}
                <ZurichCard className="bg-transparent border border-white/10 space-y-4 py-5">
                  <p className="text-[9px] font-mono text-muted uppercase tracking-[0.3em]">朗讀練習</p>

                  {/* Step 1: Listen */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-white">① 聽示範</p>
                      <p className="text-[9px] font-mono text-muted uppercase">系統朗讀一次</p>
                    </div>
                    <button
                      onClick={handleListen}
                      disabled={speechPhase === 'tts_playing' || speechPhase === 'recording'}
                      className={`flex items-center gap-2 px-4 py-2 border font-mono text-[10px] uppercase tracking-widest transition-colors ${
                        speechPhase === 'tts_playing'
                          ? 'border-accent text-accent animate-pulse'
                          : 'border-white/20 text-muted hover:text-white hover:border-white/40'
                      }`}
                    >
                      <Volume2 size={14} />
                      {speechPhase === 'tts_playing' ? '播放中...' : '聽示範'}
                    </button>
                  </div>

                  <div className="h-[1px] bg-white/5" />

                  {/* Step 2: Record */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-white">② 你來說</p>
                      <p className="text-[9px] font-mono text-muted uppercase">跟著說一遍</p>
                    </div>
                    {speechPhase !== 'recording' ? (
                      <button
                        onClick={handleStartRecording}
                        disabled={speechPhase === 'tts_playing'}
                        className="flex items-center gap-2 px-4 py-2 border border-white/20 text-muted hover:text-white hover:border-white/40 font-mono text-[10px] uppercase tracking-widest transition-colors disabled:opacity-30"
                      >
                        <Mic size={14} />
                        開始說
                      </button>
                    ) : (
                      <button
                        onClick={handleStopRecording}
                        className="flex items-center gap-2 px-4 py-2 border border-red-400 text-red-400 animate-pulse font-mono text-[10px] uppercase tracking-widest"
                      >
                        <MicOff size={14} />
                        停止
                      </button>
                    )}
                  </div>

                  {/* Result */}
                  <AnimatePresence>
                    {speechPhase === 'result' && matchScore !== null && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-2 pt-1"
                      >
                        <div className="flex items-center justify-between">
                          <p className={`text-xs font-mono uppercase tracking-widest ${scoreColor}`}>
                            {scoreLabel}
                          </p>
                          <p className={`text-xl font-display ${scoreColor}`}>{matchScore}%</p>
                        </div>
                        {transcript && (
                          <p className="text-[10px] font-mono text-muted">
                            辨識：「{transcript}」
                          </p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </ZurichCard>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* Action buttons */}
      <div className="space-y-3 pt-1">
        {!isRevealed ? (
          <ZurichButton variant="secondary" size="lg" className="w-full" onClick={revealAnswer}>
            公布答案
          </ZurichButton>
        ) : (
          <ZurichButton
            variant="primary"
            size="lg"
            className="w-full"
            onClick={handleNext}
            disabled={speechPhase === 'tts_playing' || speechPhase === 'recording'}
          >
            {currentSentenceIndex < lesson.sentences.length - 1
              ? '下一句 →'
              : '完成今日訓練 ✓'}
          </ZurichButton>
        )}
      </div>
    </div>
  );
}

// ─── Completed View ───────────────────────────────────────────────────────────

function CompletedView({ lesson, onExit }: { lesson: ReturnType<typeof getLessonById>; onExit: () => void }) {
  if (!lesson) return null;
  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-center gap-2">
        <ChevronLeft size={20} className="text-muted cursor-pointer" onClick={onExit} />
        <h1 className="text-xl font-display text-white italic tracking-tighter">REFLEX_LAB</h1>
      </header>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
        <ZurichCard className="bg-surface-bright border-none text-center py-10 space-y-3 border-l-4 border-accent">
          <CheckCircle size={32} className="text-accent mx-auto" />
          <p className="text-[10px] font-mono text-muted uppercase tracking-[0.3em]">今日訓練完成</p>
          <h2 className="text-2xl font-display text-white">{lesson.topic}</h2>
          <p className="text-[10px] font-mono text-accent uppercase tracking-widest">10 句 // 全部完成</p>
        </ZurichCard>

        <div className="space-y-3">
          <p className="text-[9px] font-mono text-muted uppercase tracking-[0.3em]">// 今日句子回顧</p>
          {lesson.sentences.map((s) => (
            <ZurichCard key={s.id} className="bg-transparent border border-white/5 py-4 space-y-2">
              <p className="text-[9px] font-mono text-accent uppercase tracking-widest">
                {s.id.toString().padStart(2, '0')}
              </p>
              <div className="flex flex-wrap gap-x-1 gap-y-1">
                {s.chunks.map((chunk, i) => (
                  <span key={i} className="text-xs font-sans text-silver">
                    {chunk.text}
                    {i < s.chunks.length - 1 && <span className="text-accent/40 mx-1">/</span>}
                  </span>
                ))}
              </div>
            </ZurichCard>
          ))}
        </div>

        <ZurichButton variant="primary" size="lg" className="w-full" onClick={onExit}>
          返回主題選擇
        </ZurichButton>
      </motion.div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function ReflexLab() {
  const { setPage, lessonSession } = useAppStore();

  return (
    <div className="flex flex-col gap-6">
      <AnimatePresence mode="wait">
        {!lessonSession ? (
          <motion.div key="select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <TopicSelect onBack={() => setPage('dashboard')} />
          </motion.div>
        ) : (
          <motion.div key="drill" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <DrillView />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
