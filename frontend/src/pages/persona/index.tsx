import { useState } from 'react';
import { Send, User, ChevronLeft } from 'lucide-react';
import { ZurichCard } from '../../components/ui/ZurichUI';

interface Message {
  id: number;
  role: 'ai' | 'user';
  content: string;
  timestamp: string;
}

export default function PersonaSquad() {
  const [messages] = useState<Message[]>([
    { id: 1, role: 'ai', content: "Hello! I'm SARA. Ready to practice your English today? What's on your mind?", timestamp: '14:02' },
    { id: 2, role: 'user', content: "I want to talk about my travel plans for next summer.", timestamp: '14:03' },
    { id: 3, role: 'ai', content: "That sounds exciting! Where are you planning to go? Have you decided on a specific destination yet?", timestamp: '14:03' }
  ]);

  return (
    <div className="flex flex-col h-[calc(100vh-180px)]">
      {/* Persona Header */}
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <ChevronLeft size={20} className="text-muted cursor-pointer" />
          <div className="w-10 h-10 bg-accent flex items-center justify-center">
            <User size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-base font-display text-white">SARA // AI MENTOR</h1>
            <p className="text-[10px] font-mono text-accent uppercase tracking-widest">PERSUASIVE ENGINE ACTIVE</p>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] space-y-1`}>
              <div className={`p-4 ${
                msg.role === 'user' 
                ? 'bg-accent text-white' 
                : 'bg-surface-bright text-silver border border-white/5'
              }`}>
                <p className="text-sm leading-relaxed">{msg.content}</p>
              </div>
              <p className={`text-[10px] font-mono text-muted uppercase ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                {msg.role.toUpperCase()} // {msg.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <footer className="mt-6">
        <ZurichCard className="p-0 border-none bg-surface-bright">
          <div className="flex items-center px-4">
            <input 
              type="text" 
              placeholder="輸入訊息 (ENGLISH ONLY)..."
              className="flex-1 bg-transparent py-4 text-sm text-white focus:outline-none font-sans"
            />
            <button className="p-2 text-accent hover:text-white transition-colors">
              <Send size={18} />
            </button>
          </div>
        </ZurichCard>
        <p className="mt-2 text-[10px] font-mono text-muted uppercase tracking-widest text-center">
          Powered by Reflex OS // Low Latency Mode
        </p>
      </footer>
    </div>
  );
}
