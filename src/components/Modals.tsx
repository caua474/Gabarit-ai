import React, { useState } from 'react';
import { X, Trophy, Crown, History, Send, CheckCircle } from 'lucide-react';
import { StudyMaterial } from '../types';

interface GabiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GabiModal: React.FC<GabiModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { sender: 'gabi', text: 'Olá! Sou a professora Gabi IA. Como posso te ajudar nos estudos hoje?' },
  ]);
  const [input, setInput] = useState('');

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'gabi',
          text: `Ótima pergunta sobre "${userMsg}"! Vamos resolver isso juntos passo a passo...`,
        },
      ]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md h-[500px] flex flex-col overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-purple-600/30 border border-purple-500/50 flex items-center justify-center text-purple-300 font-bold text-xs">
              🧑‍🏫
            </div>
            <div>
              <h3 className="text-xs font-bold text-white">Professora Gabi IA</h3>
              <span className="text-[10px] text-emerald-400">Online agora</span>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-3 text-xs ${
                  msg.sender === 'user'
                    ? 'bg-purple-600 text-white rounded-br-none'
                    : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSend} className="p-3 border-t border-slate-800 bg-slate-950 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tire sua dúvida com a Gabi..."
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-500 text-white p-2.5 rounded-xl transition"
          >
            <Send size={14} />
          </button>
        </form>
      </div>
    </div>
  );
};

interface RankingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RankingModal: React.FC<RankingModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const ranking = [
    { rank: 1, name: 'Lucas Silva', xp: '12.450 XP', avatar: '🥇' },
    { rank: 2, name: 'Beatriz Costa', xp: '10.890 XP', avatar: '🥈' },
    { rank: 3, name: 'Matheus Lima', xp: '9.320 XP', avatar: '🥉' },
    { rank: 4, name: 'Você', xp: '4.000 XP', avatar: '👤' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-5 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Trophy size={18} className="text-amber-400" /> Ranking Semanal Geral
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-2">
          {ranking.map((item) => (
            <div
              key={item.rank}
              className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                item.name === 'Você'
                  ? 'bg-purple-950/50 border-purple-500/60 font-bold text-white'
                  : 'bg-slate-950 border-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-base">{item.avatar}</span>
                <div>
                  <span className="block font-bold">{item.name}</span>
                  <span className="text-[10px] text-slate-400">Posição #{item.rank}</span>
                </div>
              </div>
              <span className="bg-slate-800 text-amber-300 font-extrabold px-2.5 py-1 rounded-lg border border-slate-700">
                {item.xp}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface ProModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProModal: React.FC<ProModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-amber-500/40 rounded-2xl w-full max-w-md p-5 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
            <Crown size={18} /> GabaritaAí PRO
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <p className="text-xs text-slate-300">
          Desbloqueie acesso ilimitado a todas as ferramentas com IA do aplicativo.
        </p>

        <div className="space-y-2">
          {[
            'Geração ilimitada de Resumos e Questões',
            'Correções completas de Redação ENEM',
            'Acesso prioritário à Professora Gabi IA',
            'Simulados TRI ilimitados sem anúncios',
          ].map((benefit, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-slate-200">
              <CheckCircle size={14} className="text-emerald-400 shrink-0" />
              <span>{benefit}</span>
            </div>
          ))}
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Assinatura Anual</span>
          <span className="text-2xl font-extrabold text-amber-400 block mt-1">R$ 9,90 / mês</span>
        </div>

        <button
          onClick={() => alert('Redirecionando para chave PIX de pagamento...')}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-extrabold text-xs py-3 rounded-xl hover:opacity-95 transition shadow-lg"
        >
          Assinar Plano PRO com PIX
        </button>
      </div>
    </div>
  );
};

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  materials: StudyMaterial[];
}

export const HistoryModal: React.FC<HistoryModalProps> = ({ isOpen, onClose, materials }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-5 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <History size={18} className="text-purple-400" /> Histórico Recente
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-2 max-h-60 overflow-y-auto">
          {materials.length === 0 ? (
            <p className="text-xs text-slate-500 text-center py-4">Nenhum histórico encontrado.</p>
          ) : (
            materials.map((item) => (
              <div key={item.id} className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs">
                <span className="font-bold text-white block">{item.title}</span>
                <span className="text-[10px] text-purple-300">{item.subject || 'Geral'}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

