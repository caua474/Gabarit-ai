import React, { useState } from 'react';
import { BookOpen, Sparkles, Plus, Trash2, HelpCircle, FileText } from 'lucide-react';
import { StudyMaterial, TutorPlan, ELI5Explanation } from '../types';

interface ConteudosSectionProps {
  materials: StudyMaterial[];
  tutorPlans: TutorPlan[];
  eli5Explanations: ELI5Explanation[];
  onDeleteMaterial: (id: string) => void;
  onDeleteTutorPlan: (id: string) => void;
  onDeleteELI5: (id: string) => void;
  onCreateMaterial?: (title: string, subject: string) => void;
}

export const ConteudosSection: React.FC<ConteudosSectionProps> = ({
  materials,
  tutorPlans,
  eli5Explanations,
  onDeleteMaterial,
  onDeleteTutorPlan,
  onDeleteELI5,
  onCreateMaterial,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'materiais' | 'planos' | 'descomplicar'>('materiais');
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('Matemática');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    if (onCreateMaterial) {
      onCreateMaterial(newTitle, newSubject);
    } else {
      alert(`Material "${newTitle}" gerado com sucesso!`);
    }
    setNewTitle('');
  };

  return (
    <div className="space-y-4">
      {/* Sub-abas de Navegação */}
      <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 gap-1">
        <button
          onClick={() => setActiveSubTab('materiais')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
            activeSubTab === 'materiais'
              ? 'bg-purple-600 text-white shadow'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          📚 Resumos
        </button>
        <button
          onClick={() => setActiveSubTab('planos')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
            activeSubTab === 'planos'
              ? 'bg-purple-600 text-white shadow'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          🗺️ Planos
        </button>
        <button
          onClick={() => setActiveSubTab('descomplicar')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
            activeSubTab === 'descomplicar'
              ? 'bg-purple-600 text-white shadow'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          💡 Explicações
        </button>
      </div>

      {/* Aba de Resumos */}
      {activeSubTab === 'materiais' && (
        <div className="space-y-4">
          <form onSubmit={handleCreate} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <h3 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
              <Sparkles size={15} /> Gerar Novo Resumo com IA
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Ex: Leis de Newton, Geometria Espacial..."
                className="sm:col-span-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              />
              <select
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                <option value="Matemática">Matemática</option>
                <option value="Física">Física</option>
                <option value="Química">Química</option>
                <option value="Biologia">Biologia</option>
                <option value="História">História</option>
                <option value="Geografia">Geografia</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={!newTitle.trim()}
              className="w-full bg-purple-600 hover:bg-purple-500 disabled:bg-slate-800 text-white text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 active:scale-95"
            >
              <Plus size={16} /> Criar Resumo Inteligente
            </button>
          </form>

          <div className="space-y-2">
            {materials.length === 0 ? (
              <div className="bg-slate-900/50 border border-slate-800 border-dashed rounded-2xl p-8 text-center text-slate-500 text-xs">
                Nenhum resumo salvo ainda. Crie o seu primeiro acima!
              </div>
            ) : (
              materials.map((mat) => (
                <div
                  key={mat.id}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between hover:border-slate-700 transition"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-purple-600/20 text-purple-400 flex items-center justify-center shrink-0">
                      <FileText size={16} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{mat.title}</h4>
                      <span className="text-[10px] text-purple-300 font-medium">
                        {mat.subject || 'Geral'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => onDeleteMaterial(mat.id)}
                    className="p-2 text-slate-500 hover:text-red-400 transition"
                    title="Excluir"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Aba de Planos de Estudo */}
      {activeSubTab === 'planos' && (
        <div className="space-y-2">
          {tutorPlans.length === 0 ? (
            <div className="bg-slate-900/50 border border-slate-800 border-dashed rounded-2xl p-8 text-center text-slate-500 text-xs">
              Nenhum plano de estudos ativo no momento.
            </div>
          ) : (
            tutorPlans.map((plan) => (
              <div
                key={plan.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between"
              >
                <div>
                  <h4 className="text-xs font-bold text-white">{plan.title}</h4>
                  <span className="text-[10px] text-slate-400">{plan.subject}</span>
                </div>
                <button
                  onClick={() => onDeleteTutorPlan(plan.id)}
                  className="p-2 text-slate-500 hover:text-red-400 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Aba de Explicações Simplificadas */}
      {activeSubTab === 'descomplicar' && (
        <div className="space-y-2">
          {eli5Explanations.length === 0 ? (
            <div className="bg-slate-900/50 border border-slate-800 border-dashed rounded-2xl p-8 text-center text-slate-500 text-xs">
              Nenhuma explicação simplificada salva ainda.
            </div>
          ) : (
            eli5Explanations.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-amber-300">{item.question}</h4>
                  <button
                    onClick={() => onDeleteELI5(item.id)}
                    className="text-slate-500 hover:text-red-400 transition"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">{item.explanation}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

