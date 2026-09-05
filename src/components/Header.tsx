import React from 'react';
import { StudyMaterial, TutorPlan, ELI5Explanation } from '../types';

interface HeaderProps {
  historyCount: number;
  studyStreak: number;
  theme: 'light' | 'dark';
  canGoBack?: boolean;
  onGoBack?: () => void;
  onToggleTheme: () => void;
  onOpenHistory: () => void;
  onOpenHelp: () => void;
  onOpenGabi: () => void;
  onOpenPro: () => void;
  onOpenProfile: () => void;
  onOpenRanking: () => void;
  onOpenFlashcards: () => void;
  onOpenCalendar: () => void;
  onOpenBanca: () => void;
  onOpenGraficosTri: () => void;
  onOpenOnboarding: () => void;
  onOpenOpcoesPage: () => void;
  onResetView: () => void;
  materials: StudyMaterial[];
  tutorPlans: TutorPlan[];
  eli5Explanations: ELI5Explanation[];
  onSelectMaterial: (mat: StudyMaterial) => void;
  onSelectTutorPlan: (plan: TutorPlan) => void;
  onSelectELI5: (eli5: ELI5Explanation) => void;
  onNavigate: (primary: any, sub?: any) => void;
  onOpenModal: (modal: string) => void;
  onSelectFlashcardTopic: (topic: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  studyStreak,
  theme,
  onToggleTheme,
  onOpenProfile,
  onOpenGabi,
  onOpenPro,
  onResetView,
}) => {
  return (
    <header className="w-full bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3 cursor-pointer" onClick={onResetView}>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white shadow-md">
          G
        </div>
        <span className="font-bold text-lg text-white tracking-tight">GabaritaAí</span>
        <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-medium border border-amber-500/30">
          🔥 {studyStreak} dias
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenGabi}
          className="px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition"
        >
          Profa. Gabi IA
        </button>
        <button
          onClick={onOpenPro}
          className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 transition"
        >
          PRO
        </button>
        <button
          onClick={onToggleTheme}
          className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition"
          title="Alternar tema"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <button
          onClick={onOpenProfile}
          className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-sm font-semibold text-slate-200"
        >
          👤
        </button>
      </div>
    </header>
  );
};
