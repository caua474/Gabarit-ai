import React from 'react';
import { Bot, Target, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenAssistant: () => void;
  onOpenPlanner: () => void;
}

export function Header({ onOpenAssistant, onOpenPlanner }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-indigo-600/30">
            G
          </div>
          <div>
            <h1 className="font-bold text-white text-base leading-tight flex items-center gap-1.5">
              GabaritaAI
              <span className="text-[10px] bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-1.5 py-0.5 rounded-md font-medium">
                PRO
              </span>
            </h1>
            <p className="text-[11px] text-slate-400">Seu tutor inteligente para exames</p>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenPlanner}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <Target size={15} className="text-indigo-400" />
            <span className="hidden sm:inline">Plano de Estudos</span>
          </button>

          <button
            onClick={onOpenAssistant}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20"
          >
            <Bot size={15} />
            <span>Falar com Gabi</span>
            <Sparkles size={12} className="text-indigo-200" />
          </button>
        </div>

      </div>
    </header>
  );
}

export default Header;

