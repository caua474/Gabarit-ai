import React, { useState, useEffect } from 'react';
import { X, Send, Bot, User, Sparkles, Loader2, Zap, Lock } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'gabi';
  text: string;
  timestamp: string;
}

interface GabiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenUpgrade?: () => void;
}

const MAX_FREE_QUESTIONS = 3;

export function GabiAssistantModal({ isOpen, onClose, onOpenUpgrade }: GabiAssistantModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'gabi',
      text: 'Olá! Sou a Tutora Gabi. Como posso te ajudar com seus estudos hoje?',
      timestamp: 'Agora',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [usageCount, setUsageCount] = useState<number>(() => {
    const saved = localStorage.getItem('gabarita_gabi_usage');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [isVip, setIsVip] = useState<boolean>(() => {
    return localStorage.getItem('gabarita_is_vip') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('gabarita_gabi_usage', usageCount.toString());
  }, [usageCount]);

  useEffect(() => {
    const checkVipStatus = () => {
      setIsVip(localStorage.getItem('gabarita_is_vip') === 'true');
    };
    checkVipStatus();
    window.addEventListener('storage', checkVipStatus);
    return () => window.removeEventListener('storage', checkVipStatus);
  }, []);

  if (!isOpen) return null;

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (!isVip && usageCount >= MAX_FREE_QUESTIONS) {
      if (onOpenUpgrade) onOpenUpgrade();
      return;
    }

    const userMsgText = input.trim();
    const newUserMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: userMsgText,
      timestamp: 'Agora',
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInput('');
    setIsLoading(true);

    if (!isVip) {
      setUsageCount((prev) => prev + 1);
    }

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) throw new Error('Chave VITE_GEMINI_API_KEY não configurada.');

      const systemPrompt = "Você é a Tutora Gabi, especialista no ENEM e vestibulares.";

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              { parts: [{ text: `[Instrução de Sistema: ${systemPrompt}]\n\nPergunta: ${userMsgText}` }] }
            ],
          }),
        }
      );

      const data = await res.json();
      const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Não consegui entender sua dúvida.';

      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), sender: 'gabi', text: answer, timestamp: 'Agora' },
      ]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), sender: 'gabi', text: `Erro: ${err.message}`, timestamp: 'Agora' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full h-[600px] flex flex-col shadow-2xl overflow-hidden relative">
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
              G
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-sm">Tutora Gabi</h3>
                {isVip ? (
                  <span className="bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                    <Zap size={10} className="fill-current" /> PRO
                  </span>
                ) : (
                  <span className="bg-slate-800 text-slate-400 text-[10px] px-2 py-0.5 rounded-full font-medium">
                    Grátis ({MAX_FREE_QUESTIONS - usageCount} restante(s))
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">IA de Ajuda para o ENEM</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/50">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-900/50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'gabi' && (
                <div className="w-8 h-8 rounded-full bg-indigo-600/30 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shrink-0 text-xs font-bold">
                  <Bot size={16} />
                </div>
              )}
              <div className={`max-w-[80%] rounded-2xl p-3 text-xs sm:text-sm whitespace-pre-wrap ${msg.sender === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-bl-none'}`}>
                {msg.text}
              </div>
              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 text-xs font-bold">
                  <User size={16} />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 justify-start items-center text-slate-400 text-xs italic">
              <Loader2 size={16} className="animate-spin text-indigo-400" />
              <span>Gabi está pensando...</span>
            </div>
          )}
        </div>

        <div className="p-3 bg-slate-950 border-t border-slate-800">
          {!isVip && usageCount >= MAX_FREE_QUESTIONS ? (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 flex items-center justify-between gap-2">
              <span className="text-xs text-amber-300 flex items-center gap-1">
                <Lock size={14} /> Limite diário atingido.
              </span>
              <button onClick={onOpenUpgrade} className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1">
                <Sparkles size={12} /> Assinar R$ 5,00
              </button>
            </div>
          ) : (
            <form onSubmit={handleSend} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Digite sua dúvida aqui..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
              />
              <button type="submit" disabled={isLoading || !input.trim()} className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold">
                <Send size={15} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

