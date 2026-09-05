import React from 'react';

export const AutoFlashcardsSection: React.FC<{ onAddXp?: (xp: number) => void }> = () => {
  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
      <h2 className="text-xl font-bold text-white">⚡ Flashcards Inteligentes com Repetição Espaçada</h2>
      <p className="text-sm text-slate-400">Sistema Leitner para memorização de longo prazo.</p>
    </div>
  );
};
