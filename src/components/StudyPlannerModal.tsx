import React, { useState } from 'react';

interface StudyPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudyPlannerModal: React.FC<StudyPlannerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [subject, setSubject] = useState('');
  const [days, setDays] = useState('7');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span>🎯</span> Criar Plano de Estudos
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-lg font-bold p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <label className="block text-xs text-slate-400 mb-1">Matéria ou Tópico</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Ex: Matemática para o ENEM"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">Duração (dias)</label>
            <input
              type="number"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800/50"
          >
            Cancelar
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-500/20"
          >
            Gerar Plano
          </button>
        </div>
      </div>
    </div>
  );
};
