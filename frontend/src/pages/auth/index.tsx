import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleLogin } from '@react-oauth/google';
import { ZurichButton } from '../../components/ui/ZurichUI';
import { useAppStore } from '../../store/useAppStore';

export default function AuthPage() {
  const { authMode, setAuthMode, login, register, googleLogin } = useAppStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isLogin = authMode === 'login';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate slight delay for UX
    await new Promise((r) => setTimeout(r, 400));

    const result = isLogin
      ? login(email, password)
      : register(name, email, password);

    if (!result.success) {
      setError(result.error ?? '發生錯誤，請再試一次');
    }

    setLoading(false);
  };

  const switchMode = () => {
    setError('');
    setName('');
    setEmail('');
    setPassword('');
    setAuthMode(isLogin ? 'register' : 'login');
  };

  return (
    <div className="min-h-screen bg-deep flex flex-col">
      {/* Top bar */}
      <header className="p-6 pb-2 flex items-center gap-2">
        <div className="w-2 h-2 bg-accent" />
        <p className="text-[10px] font-mono text-muted uppercase tracking-widest">
          Reflex OS // Auth Module
        </p>
      </header>

      <div className="flex-1 flex flex-col justify-center px-6 pb-16">
        {/* Logo / Title */}
        <motion.div
          className="mb-10 space-y-1"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-4xl font-display text-white tracking-tighter">
            REFLEX<span className="text-accent">_OS</span>
          </h1>
          <p className="text-[10px] font-mono text-muted uppercase tracking-[0.25em]">
            AI Language Training System // v4.0
          </p>
        </motion.div>

        {/* Form Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={authMode}
            initial={{ opacity: 0, x: isLogin ? -24 : 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isLogin ? 24 : -24 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Mode label */}
              <p className="text-[10px] font-mono text-accent uppercase tracking-[0.3em] mb-6">
                {isLogin ? '// 登入系統' : '// 建立帳號'}
              </p>

              {/* Name field (register only) */}
              {!isLogin && (
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-muted uppercase tracking-widest">
                    名稱 (Operator Name)
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. TRIST"
                    required
                    autoComplete="off"
                    className="w-full bg-surface border border-white/10 px-4 py-3 text-sm text-white font-sans placeholder:text-muted/40 focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              )}

              {/* Email */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-muted uppercase tracking-widest">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="operator@reflexos.ai"
                  required
                  autoComplete="email"
                  className="w-full bg-surface border border-white/10 px-4 py-3 text-sm text-white font-sans placeholder:text-muted/40 focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-muted uppercase tracking-widest">
                  密碼 (Password)
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  autoComplete={isLogin ? 'current-password' : 'new-password'}
                  className="w-full bg-surface border border-white/10 px-4 py-3 text-sm text-white font-sans placeholder:text-muted/40 focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-[11px] font-mono text-red-400 uppercase tracking-widest"
                  >
                    ⚠ {error}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Submit */}
              <ZurichButton
                type="submit"
                variant="primary"
                size="lg"
                className="w-full mt-2"
                disabled={loading}
              >
                {loading
                  ? 'PROCESSING...'
                  : isLogin
                  ? 'ENTER SYSTEM'
                  : 'INITIALIZE ACCOUNT'}
              </ZurichButton>
            </form>

            {/* Divider */}
            <div className="mt-6 flex items-center gap-3">
              <div className="flex-1 h-[1px] bg-white/10" />
              <span className="text-[10px] font-mono text-muted uppercase tracking-widest">或</span>
              <div className="flex-1 h-[1px] bg-white/10" />
            </div>

            {/* Google Login */}
            <div className="mt-4 flex justify-center">
              <GoogleLogin
                theme="filled_black"
                shape="square"
                text={isLogin ? 'signin_with' : 'signup_with'}
                locale="zh-TW"
                onSuccess={(res) => {
                  if (!res.credential) return;
                  const result = googleLogin(res.credential);
                  if (!result.success) setError(result.error ?? 'Google 登入失敗');
                }}
                onError={() => setError('Google 登入失敗，請再試一次')}
              />
            </div>

            {/* Switch mode */}
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={switchMode}
                className="text-[10px] font-mono text-muted uppercase tracking-widest hover:text-accent transition-colors"
              >
                {isLogin ? '沒有帳號？建立新帳號 →' : '已有帳號？登入 →'}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="pb-8 text-center opacity-20">
        <p className="text-[10px] font-mono uppercase tracking-[0.3em]">
          Reflex OS Neural Engine // Rev 4.0.2
        </p>
      </footer>
    </div>
  );
}
