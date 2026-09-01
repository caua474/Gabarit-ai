import React from 'react';
import { BookOpen, Target, Bot, User } from 'lucide-react';

interface NavigationTabsProps {
  activePrimaryTab: string;
  setActivePrimaryTab: (tab: string) => void;
  activeSecondaryTab?: string;
  setActiveSecondaryTab?: (tab: string) => void;
}

export function NavigationTabs({
  activePrimaryTab,
  setActivePrimaryTab,
}: NavigationTabsProps) {
  const tabs = [
    { id: 'materials', label: 'Materiais', icon: BookOpen },
    { id: 'planner', label: 'Planos de Estudo', icon: Target },
    { id: 'tutor', label: 'Tutor IA', icon: Bot },
    { id: 'perfil', label: 'Perfil & XP', icon: User },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activePrimaryTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActivePrimaryTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 shrink-0 ${
              isActive
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800/80'
            }`}
          >
            <Icon size={16} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
