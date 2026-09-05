import React from 'react';

interface OpcoesGeraisModalProps {
  isOpen: boolean;
  historyCount: number;
  studyStreak: number;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenProfile: () => void;
  onOpenHistory: () => void;
  onOpenHelp: () => void;
  onOpenOnboarding: () => void;
  onClose: () => void;
}

export const OpcoesGeraisModal: React.FC<OpcoesGeraisModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">Opções Gerais</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        </div>
        <button
          onClick={onClose}
          className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-medium transition"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};
