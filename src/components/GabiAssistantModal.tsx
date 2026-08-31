import React, { useState } from 'react';
import { GabiAvatar } from './GabiAvatar';

interface GabiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GabiAssistantModal: React.FC<GabiAssistantModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [prompt, setPrompt] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <GabiAvatar size={36} />
            <div>
              <h2 className="text-base font-bold text-white">Assistente Gabi</h2>
              <p className="text-xs text-emerald-400">Online e pronta para ajudar</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-lg font-bold p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="min-h-[150px] bg-slate-950/50 rounded-xl p-4 border border-slate-800/60 text-sm text-slate-300">
          Olá! Como posso ajudar nos seus estudos hoje?
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Digite sua dúvida..."
            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <button
            type="button"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-all cursor-pointer"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

