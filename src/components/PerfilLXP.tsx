import React from 'react';

interface PerfilXPProps {
  userName: string;
  userXP: number;
  level: number;
  levelTitle: string;
  streakDays: number;
  onOpenSettings: () => void;
  onNavigateToRedacao: () => void;
  onNavigateToSimulados: () => void;
}

export default function PerfilXP({
  userName,
  userXP,
  level,
  levelTitle,
  streakDays,
  onOpenSettings,
}: PerfilXPProps) {
  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-xl font-bold text-white">
            🎓
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{userName}</h2>
            <p className="text-xs text-indigo-400">Nível {level} • {levelTitle}</p>
          </div>
        </div>
        <button
          onClick={onOpenSettings}
          className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 text-sm"
        >
          ⚙️ Ajustes
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3 pt-2">
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
          <span className="text-xs text-slate-400">Total de XP</span>
          <p className="text-lg font-bold text-amber-400">{userXP} XP</p>
        </div>
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
          <span className="text-xs text-slate-400">Ofensiva</span>
          <p className="text-lg font-bold text-orange-400">🔥 {streakDays} dias</p>
        </div>
      </div>
    </div>
  );
}
