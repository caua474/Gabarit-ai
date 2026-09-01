import React, { useState } from 'react';
import { X, Target, Sparkles } from 'lucide-react';

interface StudyPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPlan?: (newPlan: { id: string; title: string; duration: number; createdAt: string }) => void;
}

export function StudyPlannerModal({ isOpen, onClose, onAddPlan }: StudyPlannerModalProps) {
  const [topic, setTopic] = useState('');
  const [days, setDays] = useState('7');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    if (onAddPlan) {
      onAddPlan({
        id: Date.now().toString(),
        title: topic,
        duration: Number(days) || 7,
        createdAt: 'Hoje',
      });
    }

    setTopic('');
    setDays('7');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden p-6">
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 text-indigo-400 font-bold">
            <Target size={20} />
            <h3 className="text-white text-lg">Criar Plano de Estudos</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              Matéria ou Tópico
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Ex: Matemática para o ENEM"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              Duração (dias)
            </label>
            <input
              type="number"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              min="1"
              max="90"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-2.5 rounded-xl text-sm font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles size={16} />
              Gerar Plano
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
