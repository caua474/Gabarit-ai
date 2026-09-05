import React from 'react';

interface StudyCalendarModalProps {
  studyStreak: number;
  onUpdateStreak?: (streak: number) => void;
  onClose: () => void;
}

export const StudyCalendarModal: React.FC<StudyCalendarModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">Calendário de Ofensiva</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        </div>
        <p className="text-sm text-slate-300">Mantenha a constância diária para manter sua sequência ativa.</p>
        <button
          onClick={onClose}
          className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium transition"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};
