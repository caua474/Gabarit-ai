import React from 'react';
import { StudyMaterial, TutorPlan, ELI5Explanation } from '../types';

interface HistoryModalProps {
  materials: StudyMaterial[];
  tutorPlans: TutorPlan[];
  eli5Explanations: ELI5Explanation[];
  onSelectMaterial: (m: StudyMaterial) => void;
  onSelectTutorPlan: (p: TutorPlan) => void;
  onSelectELI5: (e: ELI5Explanation) => void;
  onDeleteMaterial: (id: string) => Promise<void>;
  onDeleteTutorPlan: (id: string) => Promise<void>;
  onDeleteELI5: (id: string) => Promise<void>;
  onClearHistory: (cat: string) => Promise<void>;
  onClose: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">Histórico de Estudos</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        </div>
        <p className="text-sm text-slate-300">Aqui ficam salvos seus materiais, resumos e flashcards gerados.</p>
        <button
          onClick={onClose}
          className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-medium transition"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};
