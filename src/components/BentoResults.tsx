import React from 'react';
import { StudyMaterial } from '../types';

interface BentoResultsProps {
  materials: StudyMaterial[];
  onSelectMaterial: (material: StudyMaterial) => void;
}

export const BentoResults: React.FC<BentoResultsProps> = ({
  materials,
  onSelectMaterial,
}) => {
  if (materials.length === 0) {
    return (
      <div className="w-full p-8 text-center bg-slate-900/40 rounded-2xl border border-slate-800">
        <p className="text-slate-400 text-sm">Nenhum material encontrado. Gere seu primeiro conteúdo com a Gabi!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {materials.map((item) => (
        <div
          key={item.id}
          onClick={() => onSelectMaterial(item)}
          className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 transition-all cursor-pointer flex flex-col justify-between gap-4 group"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                {item.subject}
              </span>
              <span className="text-xs text-slate-500">{item.createdAt}</span>
            </div>
            <h3 className="font-bold text-slate-100 group-hover:text-indigo-400 transition-colors line-clamp-2">
              {item.title}
            </h3>
            <p className="text-xs text-slate-400 mt-2 line-clamp-3">
              {item.content}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {item.tags?.map((tag, idx) => (
              <span key={idx} className="text-[10px] text-slate-500 bg-slate-800/60 px-2 py-0.5 rounded">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

