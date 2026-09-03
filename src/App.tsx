import { UpgradeModal } from './components/UpgradeModal';
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { OfflineStatusBanner } from './components/OfflineStatusBanner';
import { NavigationTabs } from './components/NavigationTabs';
import { BentoResults } from './components/BentoResults';
import { GabiAssistantModal } from './components/GabiAssistantModal';
import { StudyPlannerModal } from './components/StudyPlannerModal';
import { AIStudioPlayground } from './components/AIStudioPlayground';
import { StudyMaterial } from './types';
import { Calendar, Clock, Sparkles, Plus, User, X } from 'lucide-react';

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

  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false); // <-- ADICIONE ESTA LINHA AQUI
export function App() {
  const [activePrimaryTab, setActivePrimaryTab] = useState('materials');
  const [activeSecondaryTab, setActiveSecondaryTab] = useState('all');
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<StudyMaterial | null>(null);

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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      <Header
        onOpenAssistant={() => setIsAssistantOpen(true)}
        onOpenPlanner={() => setIsPlannerOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <OfflineStatusBanner />

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <NavigationTabs
            activePrimaryTab={activePrimaryTab}
            setActivePrimaryTab={setActivePrimaryTab}
            activeSecondaryTab={activeSecondaryTab}
            setActiveSecondaryTab={setActiveSecondaryTab}
          />

          {activePrimaryTab === 'materials' && (
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 shrink-0 shadow-lg shadow-indigo-600/20"
            >
              <Plus size={16} />
              Novo Material
            </button>
          )}
        </div>

        {activePrimaryTab === 'materials' && (
          <BentoResults
            materials={materials}
            onSelectMaterial={(material) => setSelectedMaterial(material)}
          />
        )}

        {activePrimaryTab === 'planner' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div>
                <h2 className="text-xl font-bold text-white">Seus Planos de Estudo</h2>
                <p className="text-slate-400 text-sm">Organize suas metas de revisão e cronograma pro ENEM.</p>
              </div>
              <button
                onClick={() => setIsPlannerOpen(true)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 shrink-0"
              >
                <Sparkles size={16} />
                Criar Novo Plano
              </button>
            </div>

            {plans.length === 0 ? (
              <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-8 text-center">
                <p className="text-slate-400 text-sm mb-4">Você ainda não gerou nenhum plano personalizado.</p>
                <button
                  onClick={() => setIsPlannerOpen(true)}
                  className="bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30 border border-indigo-500/30 px-5 py-2.5 rounded-xl font-medium transition-colors text-sm"
                >
                  Criar Primeiro Plano
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plans.map((plan) => (
                  <div key={plan.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-white text-base">{plan.title}</h3>
                      <span className="text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2.5 py-1 rounded-lg flex items-center gap-1">
                        <Clock size={12} />
                        {plan.duration} dias
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-xs mt-4">
                      <Calendar size={14} />
                      Criado {plan.createdAt}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activePrimaryTab === 'tutor' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
            <h2 className="text-xl font-bold text-white mb-2">Tutor IA - Gabi</h2>
            <p className="text-slate-400 text-sm mb-6">Tire dúvidas, peça resumos e tire fotos das suas questões.</p>
            <button
              onClick={() => setIsAssistantOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-medium transition-colors"
            >
              Abrir Chat com a Gabi
            </button>
          </div>
        )}

        {activePrimaryTab === 'aistudio' && <AIStudioPlayground />}

        {activePrimaryTab === 'perfil' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <User size={32} />
            </div>
            <h2 className="text-xl font-bold text-white mb-1">Perfil do Estudante</h2>
            <p className="text-slate-400 text-sm mb-4">Acompanhe seu progresso e nível de XP.</p>
            <div className="inline-block bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl text-xs text-indigo-300">
              Nível 1 • 150 XP
            </div>
          </div>
        )}
      </main>

      <GabiAssistantModal
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
      />

      <StudyPlannerModal
        isOpen={isPlannerOpen}
        onClose={() => setIsPlannerOpen(false)}
        onAddPlan={handleAddPlan}
      />

      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>
            <h3 className="text-lg font-bold text-white mb-4">Novo Material de Estudo</h3>
            <form onSubmit={handleCreateMaterial} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Título</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ex: Resumo de Física Quântica"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Matéria</label>
                <input
                  type="text"
                  required
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="Ex: Física"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Conteúdo</label>
                <textarea
                  rows={3}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Digite as anotações..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 rounded-xl text-sm transition-colors"
              >
                Salvar Material
              </button>
            </form>
          </div>
        </div>
      )}

      {selectedMaterial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 relative">
            <button
              onClick={() => setSelectedMaterial(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>
            <span className="text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2.5 py-1 rounded-lg">
              {selectedMaterial.subject}
            </span>
            <h3 className="text-xl font-bold text-white mt-3 mb-2">{selectedMaterial.title}</h3>
            <p className="text-slate-300 text-sm whitespace-pre-wrap">{selectedMaterial.content}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
