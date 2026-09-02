import React from 'react';
import { X, Tag, Calendar } from 'lucide-react';
import { StudyMaterial } from '../types';

interface MaterialDetailModalProps {
  material: StudyMaterial | null;
  onClose: () => void;
}

export function MaterialDetailModal({ material, onClose }: MaterialDetailModalProps) {
  if (!material) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        
        {/* Header do Modal */}
        <div className="p-6 border-b border-slate-800 flex justify-between items-start">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-lg">
              {material.subject}
            </span>
            <h2 className="text-xl font-bold text-white mt-2">{material.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="p-6 overflow-y-auto space-y-4 text-slate-300 text-sm leading-relaxed">
          <p className="whitespace-pre-line">{material.content}</p>

          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Tag size={14} className="text-slate-500" />
              <div className="flex flex-wrap gap-1.5">
                {material.tags.map((tag, idx) => (
                  <span key={idx} className="bg-slate-800 text-slate-300 text-xs px-2 py-0.5 rounded-md">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Calendar size={13} />
              <span>{material.createdAt}</span>
            </div>
          </div>
        </div>

        {/* Rodapé */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-medium transition-colors"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
}
