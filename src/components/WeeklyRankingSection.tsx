import React from 'react';

export const WeeklyRankingSection: React.FC<{ onStudyClick?: () => void }> = () => {
  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
      <h2 className="text-xl font-bold text-white">🏆 Ranking Semanal da Liga</h2>
      <p className="text-sm text-slate-400">Dispute o topo contra outros estudantes de todo o Brasil.</p>
    </div>
  );
};
