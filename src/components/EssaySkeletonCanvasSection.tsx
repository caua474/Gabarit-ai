import React from 'react';

export const EssaySkeletonCanvasSection: React.FC<{ onSendToAnalyzer?: (s: any) => void }> = () => {
  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
      <h2 className="text-xl font-bold text-white">📐 Esqueleto & Projeto de Texto</h2>
      <p className="text-sm text-slate-400">Estruture introdução, D1, D2 e conclusão antes de escrever.</p>
    </div>
  );
};
