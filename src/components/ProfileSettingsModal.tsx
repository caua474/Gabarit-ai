import React from 'react';
import { UserProfile } from '../types';

export const getSavedUserProfile = (): UserProfile => {
  return {
    name: 'Estudante ENEM',
    avatar: '🎓',
    targetCourse: 'Medicina',
    targetExam: 'ENEM',
    dailyHoursGoal: 4,
    dailyQuestionsGoal: 30,
    rankTitle: 'Aspirante',
    soundEffects: true,
    notificationsEnabled: true,
    notificationTime: '19:00',
  };
};

interface ProfileSettingsModalProps {
  studyStreak: number;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenOnboarding: () => void;
  onClose: () => void;
}

export const ProfileSettingsModal: React.FC<ProfileSettingsModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">Configurações do Perfil</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        </div>
        <p className="text-sm text-slate-300">Ajuste seu curso dos sonhos, metas diárias e notificações.</p>
        <button
          onClick={onClose}
          className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium transition"
        >
          Concluir
        </button>
      </div>
    </div>
  );
};
