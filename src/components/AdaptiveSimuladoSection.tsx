import React from 'react';

export const AdaptiveSimuladoSection: React.FC<{ onAddXp?: (xp: number) => void }> = () => {
  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
      <h2 className="text-xl font-bold text-white">⚡ Simulado Adaptativo</h2>
      <p className="text-sm text-slate-400">Dificuldade que se ajusta ao seu nível de acerto.</p>
    </div>
  );
};
