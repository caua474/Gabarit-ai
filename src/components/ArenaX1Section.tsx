import React from 'react';

export const ArenaX1Section: React.FC<{ onAddXP?: (amount: number) => void }> = ({ onAddXP }) => {
  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-center space-y-4">
      <h2 className="text-xl font-bold text-white">⚔️ Arena de Batalha 1v1</h2>
      <p className="text-sm text-slate-400">Dispute questões com outros vestibulandos e ganhe XP!</p>
      <button
        onClick={() => onAddXP && onAddXP(100)}
        className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl text-sm transition"
      >
        Jogar Partida Rápida (+100 XP)
      </button>
    </div>
  );
};
