import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { OfflineStatusBanner } from './components/OfflineStatusBanner';
import { NavigationTabs } from './components/NavigationTabs';
import { BentoResults } from './components/BentoResults';
import { GabiAssistantModal } from './components/GabiAssistantModal';
import { StudyPlannerModal } from './components/StudyPlannerModal';
import { AIStudioPlayground } from './components/AIStudioPlayground';
import { UpgradeModal } from './components/UpgradeModal';
import { StudyMaterial } from './types';
import { X, Zap } from 'lucide-react';

interface StudyPlan {
  id: string;
  title: string;
  duration: number;
  createdAt: string;
}

const DEFAULT_MATERIALS: StudyMaterial[] = [
  {
    id: '1',
    title: 'Resumo de Trigonometria Avançada',
    subject: 'Matemática',
    content: 'Estudo detalhado sobre seno, cosseno e tangente aplicados a triângulos retângulos e equações circulares.',
    createdAt: 'Hoje',
    tags: ['EM', 'ENEM', 'Fórmulas'],
  },
  {
    id: '2',
    title: 'Introdução à Genética e Mendel',
    subject: 'Biologia',
    content: 'Primeira e segunda lei de Mendel, quadros de Punnett e hereditariedade de grupos sanguíneos ABO.',
    createdAt: 'Ontem',
    tags: ['Biologia', 'Genética'],
  },
];

export function App() {
  const [activePrimaryTab, setActivePrimaryTab] = useState('materials');
  const [activeSecondaryTab, setActiveSecondaryTab] = useState('all');
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [newContent, setNewContent] = useState('');

  const [plans, setPlans] = useState<StudyPlan[]>(() => {
    const saved = localStorage.getItem('gabarita_plans');
    return saved ? JSON.parse(saved) : [];
  });

  const [materials, setMaterials] = useState<StudyMaterial[]>(() => {
    const saved = localStorage.getItem('gabarita_materials');
    return saved ? JSON.parse(saved) : DEFAULT_MATERIALS;
  });

  useEffect(() => {
    localStorage.setItem('gabarita_plans', JSON.stringify(plans));
  }, [plans]);

  useEffect(() => {
    localStorage.setItem('gabarita_materials', JSON.stringify(materials));
  }, [materials]);

  const handleAddPlan = (newPlan: StudyPlan) => {
    setPlans((prev) => [newPlan, ...prev]);
  };

  const handleCreateMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSubject.trim()) return;

    const newMat: StudyMaterial = {
      id: Date.now().toString(),
      title: newTitle,
      subject: newSubject,
      content: newContent || 'Sem conteúdo adicional.',
      createdAt: 'Hoje',
      tags: [newSubject],
    };

    setMaterials((prev) => [newMat, ...prev]);
    setNewTitle('');
    setNewSubject('');
    setNewContent('');
    setIsCreateModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Banner Offline */}
      <OfflineStatusBanner />

      {/* Header */}
      <Header
        onOpenAssistant={() => setIsAssistantOpen(true)}
        onOpenPlanner={() => setIsPlannerOpen(true)}
      />

      {/* Banner Promocional PRO */}
      <div className="bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-slate-900 border-b border-indigo-500/20 px-4 py-2.5 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-indigo-300">
          <Zap size={15} className="text-amber-400 fill-amber-400 shrink-0" />
          <span><strong>GabaritaAI Pro:</strong> Perguntas ilimitadas, leitor de imagem e modelo Gemini 1.5 Pro por R$ 5,00/mês.</span>
        </div>
        <button
          onClick={() => setIsUpgradeOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3 py-1 rounded-lg text-xs transition-colors shrink-0 shadow-sm"
        >
          Seja PRO R$ 5,00
        </button>
      </div>

      {/* Conteúdo Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        <NavigationTabs
          activePrimaryTab={activePrimaryTab}
          setActivePrimaryTab={setActivePrimaryTab}
          activeSecondaryTab={activeSecondaryTab}
          setActiveSecondaryTab={setActiveSecondaryTab}
        />

        {activePrimaryTab === 'playground' ? (
          <AIStudioPlayground />
        ) : (
          <BentoResults
            materials={materials}
            activeSecondaryTab={activeSecondaryTab}
            onSelectMaterial={() => {}}
            onOpenCreateModal={() => setIsCreateModalOpen(true)}
          />
        )}
      </main>

      {/* Modais */}
      <GabiAssistantModal
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        onOpenUpgrade={() => setIsUpgradeOpen(true)}
      />

      <StudyPlannerModal
        isOpen={isPlannerOpen}
        onClose={() => setIsPlannerOpen(false)}
        onAddPlan={handleAddPlan}
      />

      <UpgradeModal
        isOpen={isUpgradeOpen}
        onClose={() => setIsUpgradeOpen(false)}
        onSuccess={() => alert('Plano Pro Ativado com sucesso!')}
      />

      {/* Modal Criar Material */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Criar Novo Material de Estudo</h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateMaterial} className="space-y-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Título</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ex: Fórmulas de Física - Cinemática"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Matéria / Disciplina</label>
                <input
                  type="text"
                  required
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="Ex: Física"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Conteúdo / Anotações</label>
                <textarea
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Escreva os tópicos principais ou resumo aqui..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                >
                  Salvar Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
