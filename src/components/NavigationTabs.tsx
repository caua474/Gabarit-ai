import React from 'react';
import { BookOpen, Calendar, Bot, User, Cpu } from 'lucide-react';

interface NavigationTabsProps {
  activePrimaryTab: string;
  setActivePrimaryTab: (tab: string) => void;
  activeSecondaryTab: string;
  setActiveSecondaryTab: (tab: string) => void;
}

export function NavigationTabs({
  activePrimaryTab,
  setActivePrimaryTab,
}: NavigationTabsProps) {
  const tabs = [
    { id: 'materials', label: 'Materiais', icon: BookOpen },
    { id: 'planner', label: 'Planos de Estudo', icon: Calendar },
    { id: 'tutor', label: 'Tutor IA', icon: Bot },
    { id: 'aistudio', label: 'AI Studio', icon: Cpu },
    { id: 'perfil', label: 'Perfil & XP', icon: User },
  ];

  return (
    <div className="flex flex-wrap gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activePrimaryTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActivePrimaryTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              isActive
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Icon size={16} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
