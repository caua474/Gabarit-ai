import React from 'react';

interface BibliotecaSectionProps {
  onAskGabi?: (prompt: string) => void;
  onOpenMindmapTab?: () => void;
}

export const BibliotecaSection: React.FC<BibliotecaSectionProps> = ({ onAskGabi }) => {
  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
      <h2 className="text-xl font-bold text-white">📖 Biblioteca Digital ENEM</h2>
      <p className="text-sm text-slate-400">Materiais, resumos e guias completos por disciplina.</p>
      <button
        onClick={() => onAskGabi && onAskGabi('Como estudar biologia para o ENEM?')}
        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium transition"
      >
        Pedir Dica de Estudo à Profa. Gabi
      </button>
    </div>
  );
};
