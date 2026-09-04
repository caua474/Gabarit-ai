import React from 'react';

interface NavigationTabsProps {
  activePill: string;
  onSelectPill: (pillId: string) => void;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activePill,
  onSelectPill,
}) => {
  const topPills = [
    { id: 'bento', label: '🍱 Bento AI' },
    { id: 'banca', label: '🏛️ Banca IA' },
    { id: 'calendario', label: '📅 Calendário' },
    { id: 'flashcards', label: '🎴 Flashcards' },
    { id: 'ranking', label: '🏆 Ranking' },
    { id: 'professora', label: '🧑‍🏫 Professora IA' },
    { id: 'pro', label: '💎 Plano PRO' },
    { id: 'graficos', label: '📈 Gráficos TRI' },
  ];

  return (
    <section className="p-4 max-w-lg mx-auto">
      <div className="grid grid-cols-2 gap-2">
        {topPills.map((pill) => (
          <button
            key={pill.id}
            onClick={() => onSelectPill(pill.id)}
            className={`py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all border ${
              activePill === pill.id
                ? 'bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-600/30'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <span>{pill.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

