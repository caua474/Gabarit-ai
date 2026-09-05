import React from 'react';
import { UserProfile } from '../types';

interface OnboardingModalProps {
  onSaveProfile?: (profile: UserProfile) => void;
  onOpenProfile?: () => void;
  onClose: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4">
        <h3 className="text-lg font-bold text-white">Bem-vindo ao GabaritaAí!</h3>
        <p className="text-sm text-slate-300">Sua plataforma completa de preparação inteligente para o ENEM.</p>
        <button
          onClick={onClose}
          className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium transition"
        >
          Começar Agora
        </button>
      </div>
    </div>
  );
};
