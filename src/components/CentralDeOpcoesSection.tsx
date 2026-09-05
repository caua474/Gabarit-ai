import React from 'react';
import { UserProfile } from '../types';

interface CentralDeOpcoesSectionProps {
  userProfile?: UserProfile;
  studyStreak: number;
  historyCount: number;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenProfile: () => void;
  onOpenHistory: () => void;
  onOpenHelp: () => void;
  onOpenOnboarding: () => void;
  onOpenGabi: () => void;
  onOpenPro: () => void;
  onGoHome: () => void;
}

export const CentralDeOpcoesSection: React.FC<CentralDeOpcoesSectionProps> = ({
  onOpenProfile,
  onOpenHistory,
  onOpenHelp,
  onOpenPro,
}) => {
  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h2 className="text-xl font-bold text-white">⚙️ Central de Configurações</h2>
      <div className="space-y-2">
        <button onClick={onOpenProfile} className="w-full text-left p-3 bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-800 text-sm text-white">
          👤 Meu Perfil de Estudos
        </button>
        <button onClick={onOpenHistory} className="w-full text-left p-3 bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-800 text-sm text-white">
          🕒 Histórico de Materiais
        </button>
        <button onClick={onOpenHelp} className="w-full text-left p-3 bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-800 text-sm text-white">
          ❓ Como Funciona o GabaritaAí
        </button>
        <button onClick={onOpenPro} className="w-full text-left p-3 bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 rounded-xl border border-amber-500/30 text-sm text-amber-300 font-medium">
          ⭐ Assinatura PRO
        </button>
      </div>
    </div>
  );
};
