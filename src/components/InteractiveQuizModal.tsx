import React from 'react';
import { StudyMaterial } from '../types';

interface InteractiveQuizModalProps {
  material: StudyMaterial;
  onShare?: (score: number, total: number, topic: string) => void;
  onCompleted?: () => void;
  onClose: () => void;
}

export const InteractiveQuizModal: React.FC<InteractiveQuizModalProps> = ({ onClose, onCompleted }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">Quiz Rápido</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        </div>
        <p className="text-sm text-slate-300">Responda as questões geradas sobre o material.</p>
        <button
          onClick={() => {
            if (onCompleted) onCompleted();
            onClose();
          }}
          className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium transition"
        >
          Concluir (+50 XP)
        </button>
      </div>
    </div>
  );
};
