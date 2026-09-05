import React from 'react';

export const StudyStatisticsSection: React.FC = () => {
  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
      <h2 className="text-xl font-bold text-white">📊 Estatísticas & Desempenho</h2>
      <p className="text-sm text-slate-400">Horas estudadas, taxa de acerto e evolução semanal.</p>
    </div>
  );
};
