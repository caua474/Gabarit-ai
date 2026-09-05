import React from 'react';

export type PrimaryTab =
  | 'home'
  | 'arena'
  | 'conteudos'
  | 'redacao_ia'
  | 'simulados_treino'
  | 'perfil_gamificacao'
  | 'opcoes_hub';

interface BottomNavigationBarProps {
  activePrimaryTab: PrimaryTab;
  onSelectPrimaryTab: (tab: PrimaryTab) => void;
}

export const BottomNavigationBar: React.FC<BottomNavigationBarProps> = ({
  activePrimaryTab,
  onSelectPrimaryTab,
}) => {
  const tabs: { id: PrimaryTab; label: string; icon: string }[] = [
    { id: 'home', label: 'Início', icon: '🏠' },
    { id: 'arena', label: 'Arena X1', icon: '⚔️' },
    { id: 'conteudos', label: 'Estudos', icon: '📚' },
    { id: 'redacao_ia', label: 'Redação', icon: '✍️' },
    { id: 'simulados_treino', label: 'Simulados', icon: '🎯' },
    { id: 'perfil_gamificacao', label: 'Perfil', icon: '🏆' },
    { id: 'opcoes_hub', label: 'Opções', icon: '⚙️' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur border-t border-slate-800 px-2 py-1.5 flex justify-around items-center">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onSelectPrimaryTab(tab.id)}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition ${
            activePrimaryTab === tab.id
              ? 'text-indigo-400 font-semibold scale-105'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span className="text-lg">{tab.icon}</span>
          <span className="text-[10px] tracking-tight">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};
