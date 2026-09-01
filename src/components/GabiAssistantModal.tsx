import React, { useState } from 'react';
import { X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'gabi';
  text: string;
}

interface GabiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GabiAssistantModal({ isOpen, onClose }: GabiAssistantModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'gabi',
      text: 'Olá! Como posso ajudar nos seus estudos hoje?',
    },
  ]);
  const [inputText, setInputText] = useState('');

  if ((!isOpen) return null;

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText,
    };

    setMessages((prev) => [...prev, userMsg]);
    const currentInput = inputText;
    setInputText('');

    // Resposta automática da Gabi
    setTimeout(() => {
      const gabiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'gabi',
        text: `Entendi a sua dúvida sobre "${currentInput}". Estou aqui para te ajudar a gabaritar esse assunto! Que tal resolvermos um exemplo juntos?`,
      };
      setMessages((prev) => [...prev, gabiMsg]);
    }, 800);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden flex flex-col h-[500px]">
        
        {/* Cabeçalho */}
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Bot size={20} />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Assistente Gabi</h3>
              <p className="text-xs text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Online e pronta para ajudar
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Mensagens */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${
                msg.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs text-white shrink-0 ${
                  msg.sender === 'user' ? 'bg-indigo-600' : 'bg-slate-800 text-indigo-400'
                }`}
              >
                {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div
                className={`p-3 rounded-2xl max-w-[80%] text-sm ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-slate-800/80 text-slate-200 border border-slate-700/50 rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Campo de Entrada */}
        <div className="p-3 border-t border-slate-800 bg-slate-900/50">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Digite sua dúvida..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white p-2.5 rounded-xl transition-colors flex items-center justify-center shrink-0"
            >
              <Send size={18} />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
