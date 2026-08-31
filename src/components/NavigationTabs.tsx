import React from 'react';

interface NavigationTabsProps {
  activePrimaryTab: string;
  setActivePrimaryTab: (tab: string) => void;
  activeSecondaryTab: string;
  setActiveSecondaryTab: (tab: string) => void;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activePrimaryTab,
  setActivePrimaryTab,
  activeSecondaryTab,
  setActiveSecondaryTab,
}) => {
  const primaryTabs = [
    { id: 'materials', label: 'Materiais', icon: '📚' },
    { id: 'plans', label: 'Planos de Estudo', icon: '🎯' },
    { id: 'gabi', label: 'Tutor IA', icon: '✨' },
  ];

  return (
    <div className="w-full mb-6 flex flex-col gap-3">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        {primaryTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActivePrimaryTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              activePrimaryTab === tab.id
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
