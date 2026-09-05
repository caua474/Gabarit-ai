import React from 'react';

interface SubjectCatalogSectionProps {
  onSelectTopicAction?: (materia: string, topico: string, acao: string) => void;
}

export const SubjectCatalogSection: React.FC<SubjectCatalogSectionProps> = () => {
  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
      <h2 className="text-xl font-bold text-white">🗂️ Catálogo Geral de Matérias</h2>
      <p className="text-sm text-slate-400">Ciências da Natureza, Humanas, Linguagens e Matemática.</p>
    </div>
  );
};
