import React from 'react';
import { Home, Swords, BookOpen, PenTool, Target, User } from 'lucide-react';

interface BottomNavigationBarProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const BottomNavigationBar: React.FC<BottomNavigationBarProps> = ({
  activeTab,
  onTabChange,
}) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'arena', label: 'Arena ⚔️', icon: Swords },
    { id: 'conteudos', label: 'Conteúdos', icon: BookOpen },
    { id: 'redacao', label: 'Redação', icon: PenTool },
    { id: 'simulados', label: 'Simulados', icon: Target },
    { id: 'perfil', label: 'Perfil', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-md border-t border-slate-800 max-w-lg mx-auto">
      <div className="grid grid-cols-6 h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center gap-1 transition-all ${
                isActive
                  ? 'text-purple-400 font-bold scale-105'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon
                size={18}
                className={isActive ? 'stroke-[2.5]' : 'stroke-[1.75]'}
              />
              <span className="text-[9px] truncate max-w-full px-0.5">
                {item.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full -mt-0.5 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

