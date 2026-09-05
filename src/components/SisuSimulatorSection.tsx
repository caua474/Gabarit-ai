import React from 'react';

export const SisuSimulatorSection: React.FC<{ onGoToStudy?: () => void }> = () => {
  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
      <h2 className="text-xl font-bold text-white">🎓 Simulador SiSU com Pesos e Cotas</h2>
      <p className="text-sm text-slate-400">Calcule suas chances em Medicina, Direito, Engenharia e mais.</p>
    </div>
  );
};
