import React from 'react';
import { PrimaryTab } from './BottomNavigationBar';
import { AbaAtiva } from './NavigationTabs';

interface HomeHubCategoriesProps {
  onNavigate: (primary: PrimaryTab, sub?: AbaAtiva) => void;
}

export const HomeHubCategories: React.FC<HomeHubCategoriesProps> = ({ onNavigate }) => {
  const cards = [
    { title: 'Arena X1', icon: '⚔️', primary: 'arena' as PrimaryTab, sub: 'arena_x1' as AbaAtiva },
    { title: 'Redação IA', icon: '✍️', primary: 'redacao_ia' as PrimaryTab, sub: 'redacao' as AbaAtiva },
    { title: 'Simulados TRI', icon: '🎯', primary: 'simulados_treino' as PrimaryTab, sub: 'simulado_tri' as AbaAtiva },
    { title: 'Flashcards', icon: '⚡', primary: 'conteudos' as PrimaryTab, sub: 'flashcards' as AbaAtiva },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
      {cards.map((c) => (
        <div
          key={c.title}
          onClick={() => onNavigate(c.primary, c.sub)}
          className="p-4 bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl cursor-pointer transition flex flex-col items-center text-center group"
        >
          <span className="text-3xl mb-2 group-hover:scale-110 transition">{c.icon}</span>
          <h3 className="text-sm font-semibold text-white">{c.title}</h3>
        </div>
      ))}
    </div>
  );
};
