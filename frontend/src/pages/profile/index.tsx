import { useState } from 'react';
import { User, Settings, Shield, Award, BarChart3, ChevronLeft, ChevronDown, ChevronUp, Eye, EyeOff, Check } from 'lucide-react';
import { ZurichCard, ZurichButton } from '../../components/ui/ZurichUI';
import { useAppStore } from '../../store/useAppStore';
import type { AIProvider } from '../../store/useAppStore';

// ─── Provider config ───────────────────────────────────────────────────────────

const PROVIDERS: { id: AIProvider; name: string; models: string[]; recommended: string }[] = [
  {
    id: 'anthropic',
    name: 'Anthropic',
    recommended: 'claude-haiku-4-5-20251001',
    models: ['claude-haiku-4-5-20251001', 'claude-sonnet-4-6', 'claude-opus-4-6'],
  },
  {
    id: 'openai',
    name: 'OpenAI',
    recommended: 'gpt-4o-mini',
    models: ['gpt-4o-mini', 'gpt-4o', 'gpt-4-turbo'],
  },
  {
    id: 'google',
    name: 'Google',
    recommended: 'gemini-1.5-flash',
    models: ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-2.0-flash'],
  },
];

// ─── API Settings Panel ────────────────────────────────────────────────────────

function ApiSettingsPanel() {
  const { apiSettings, updateApiSettings, getDefaultModel } = useAppStore();
  const [showKey, setShowKey] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [saved, setSaved] = useState(false);
  const [localKey, setLocalKey] = useState(apiSettings.apiKey);
  const [localModel, setLocalModel] = useState(apiSettings.model);

  const currentProvider = PROVIDERS.find((p) => p.id === apiSettings.provider)!;

  const handleProviderChange = (provider: AIProvider) => {
    const defaultModel = getDefaultModel(provider);
    setLocalModel(defaultModel);
    updateApiSettings({ provider, model: defaultModel });
  };

  const handleSave = () => {
    updateApiSettings({ apiKey: localKey, model: localModel });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <ZurichCard className="bg-surface-bright border-none space-y-5">
      <div className="flex items-center gap-2">
        <Settings size={14} className="text-accent" />
        <h2 className="text-xs font-mono text-white uppercase tracking-widest">AI 引擎設定</h2>
      </div>

      {/* Provider Selection */}
      <div className="space-y-2">
        <p className="text-[9px] font-mono text-muted uppercase tracking-widest">選擇 Provider</p>
        <div className="grid grid-cols-3 gap-2">
          {PROVIDERS.map((p) => (
            <button
              key={p.id}
              onClick={() => handleProviderChange(p.id)}
              className={`py-2 px-3 border font-mono text-[10px] uppercase tracking-widest transition-all ${
                apiSettings.provider === p.id
                  ? 'border-accent text-accent bg-accent/10'
                  : 'border-white/10 text-muted hover:border-white/30 hover:text-white'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
        <p className="text-[9px] font-mono text-muted/60">
          推薦模型：{currentProvider.recommended}
        </p>
      </div>

      {/* API Key */}
      <div className="space-y-2">
        <p className="text-[9px] font-mono text-muted uppercase tracking-widest">API Key</p>
        <div className="flex gap-2">
          <input
            type={showKey ? 'text' : 'password'}
            value={localKey}
            onChange={(e) => setLocalKey(e.target.value)}
            placeholder={`貼上你的 ${currentProvider.name} API Key`}
            className="flex-1 bg-transparent border border-white/10 px-3 py-2 text-xs font-mono text-white placeholder-muted/40 focus:outline-none focus:border-accent/50 transition-colors"
          />
          <button
            onClick={() => setShowKey(!showKey)}
            className="px-3 border border-white/10 text-muted hover:text-white transition-colors"
          >
            {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        </div>
        <p className="text-[9px] font-mono text-muted/50">Key 僅存在本機 localStorage，不會上傳至任何伺服器</p>
      </div>

      {/* Advanced: model selector */}
      <div className="space-y-2">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-1 text-[9px] font-mono text-muted uppercase tracking-widest hover:text-white transition-colors"
        >
          進階設定
          {showAdvanced ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
        </button>
        {showAdvanced && (
          <div className="space-y-1">
            <p className="text-[9px] font-mono text-muted/60 uppercase tracking-widest">模型</p>
            <select
              value={localModel}
              onChange={(e) => setLocalModel(e.target.value)}
              className="w-full bg-surface border border-white/10 px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-accent/50 transition-colors"
            >
              {currentProvider.models.map((m) => (
                <option key={m} value={m} className="bg-surface">
                  {m}{m === currentProvider.recommended ? ' （推薦）' : ''}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Save */}
      <ZurichButton
        variant={saved ? 'primary' : 'secondary'}
        size="sm"
        className="w-full"
        onClick={handleSave}
      >
        {saved ? (
          <span className="flex items-center gap-2 justify-center"><Check size={12} /> 已儲存</span>
        ) : '儲存設定'}
      </ZurichButton>
    </ZurichCard>
  );
}

// ─── Main Profile ──────────────────────────────────────────────────────────────

export default function Profile() {
  const { user, lessonHistory, setPage } = useAppStore();
  const completedLessons = lessonHistory.length;

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
            { label: '完成主題數', value: `${completedLessons}`, rank: completedLessons >= 5 ? 'S' : completedLessons >= 3 ? 'A' : 'B' },
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
          <h3 className="text-2xl font-display text-white">{Math.round(90 + user.streak / 10)}</h3>
        </ZurichCard>
      </section>

      {/* API Settings */}
      <ApiSettingsPanel />

      {/* Menu Options */}
      <div className="space-y-2">
        {[
          { icon: <Award size={18} />, label: '成就勳章', detail: '12 UNLOCKED' },
          { icon: <BarChart3 size={18} />, label: '訓練日誌', detail: `${user.streak} DAYS RECORD` },
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
