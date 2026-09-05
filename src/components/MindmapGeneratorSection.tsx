import React from 'react';

export const MindmapGeneratorSection: React.FC<{ onStudyTopic?: () => void }> = () => {
  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
      <h2 className="text-xl font-bold text-white">🧠 Gerador de Mapas Mentais IA</h2>
      <p className="text-sm text-slate-400">Visualize as conexões entre tópicos de forma visual.</p>
    </div>
  );
};
