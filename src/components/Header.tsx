import React, { useState } from 'react';
import { 
  Search, Bell, Sun, Moon, Flame, Trophy, Calendar, 
  Sparkles, History, HelpCircle, User, ArrowLeft, Crown,
  BookOpen, SlidersHorizontal
} from 'lucide-react';
import { StudyMaterial, TutorPlan, ELI5Explanation } from '../types';

interface HeaderProps {
  historyCount: number;
  studyStreak: number;
  theme: 'light' | 'dark';
  canGoBack: boolean;
  onGoBack: () => void;
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
  onSelectTutorPlan: () => void;
  onSelectELI5: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  historyCount,
  studyStreak,
  theme,
  canGoBack,
  onGoBack,
  onToggleTheme,
  onOpenHistory,
  onOpenHelp,
  onOpenGabi,
  onOpenPro,
  onOpenProfile,
  onOpenRanking,
  onOpenCalendar,
  onOpenOpcoesPage,
  onResetView,
}) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        {/* Lado Esquerdo: Logo ou Voltar */}
        <div className="flex items-center gap-2">
          {canGoBack ? (
            <button
              onClick={onGoBack}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition flex items-center gap-1 text-xs font-semibold"
            >
              <ArrowLeft size={16} />
              <span>Voltar</span>
            </button>
          ) : (
            <button
              onClick={onResetView}
              className="flex items-center gap-2 group text-left"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition transform">
                📖
              </div>
              <div>
                <h1 className="font-bold text-base tracking-tight bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent">
                  GabaritaAí
                </h1>
                <p className="text-[10px] text-indigo-400 font-medium">
                  Inteligência para o ENEM
                </p>
              </div>
            </button>
          )}
        </div>

        {/* Lado Direito: Ações rápidas */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Contador de Streak */}
          <button
            onClick={onOpenCalendar}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold hover:bg-amber-500/20 transition"
            title="Sua Ofensiva de Estudos"
          >
            <Flame size={15} className="fill-amber-400 text-amber-500 animate-pulse" />
            <span>{studyStreak}d</span>
          </button>

          {/* Botão PRO */}
          <button
            onClick={onOpenPro}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-xs font-extrabold hover:opacity-95 transition shadow-sm"
          >
            <Crown size={14} />
            <span>PRO</span>
          </button>

          {/* Histórico */}
          <button
            onClick={onOpenHistory}
            className="relative p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white transition"
            title="Histórico de Materiais"
          >
            <History size={18} />
            {historyCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-purple-600 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                {historyCount > 9 ? '9+' : historyCount}
              </span>
            )}
          </button>

          {/* Ranking */}
          <button
            onClick={onOpenRanking}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white transition"
            title="Ranking Semanal"
          >
            <Trophy size={18} />
          </button>

          {/* Alternar Tema */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-amber-400 hover:text-amber-300 transition"
            title="Alternar Tema"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Opções / Perfil */}
          <button
            onClick={onOpenOpcoesPage}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white transition"
            title="Opções Gerais"
          >
            <SlidersHorizontal size={18} />
          </button>

          {/* Perfil */}
          <button
            onClick={onOpenProfile}
            className="w-8 h-8 rounded-xl bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center text-indigo-300 font-bold text-xs hover:bg-indigo-600/50 transition"
            title="Meu Perfil"
          >
            <User size={16} />
          </button>
        </div>
      </div>
    </header>
  );
};

