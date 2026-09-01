import React, { useState } from 'react';
import PerfilXP from './components/PerfilXP';
import { Header } from './components/Header';
import { OfflineStatusBanner } from './components/OfflineStatusBanner';
import { NavigationTabs } from './components/NavigationTabs';
import { BentoResults } from './components/BentoResults';
import { GabiAssistantModal } from './components/GabiAssistantModal';
import { StudyPlannerModal } from './components/StudyPlannerModal';
import { StudyMaterial } from './types';
import { Calendar, Clock, Sparkles } from 'lucide-react';

interface StudyPlan {
  id: string;
  title: string;
  duration: number;
  createdAt: string;
}

export function App() {
  const [activePrimaryTab, setActivePrimaryTab] = useState('materials');
  const [activeSecondaryTab, setActiveSecondaryTab] = useState('all');
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<StudyMaterial | null>(null);

  const [plans, setPlans] = useState<StudyPlan[]>([]);

  const sampleMaterials: StudyMaterial[] = [
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

  const handleAddPlan = (newPlan: StudyPlan) => {
    setPlans((prev) => [newPlan, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      <Header
        onOpenAssistant={() => setIsAssistantOpen(true)}
        onOpenPlanner={() => setIsPlannerOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <OfflineStatusBanner />

        <div className="flex justify-between items-center mb-6">
          <NavigationTabs
            activePrimaryTab={activePrimaryTab}
            setActivePrimaryTab={setActivePrimaryTab}
            activeSecondaryTab={activeSecondaryTab}
            setActiveSecondaryTab={setActiveSecondaryTab}
          />
        </div>

        {/* Materiais */}
        {activePrimaryTab === 'materials' && (
          <BentoResults
            materials={sampleMaterials}
            onSelectMaterial={(material) => setSelectedMaterial(material)}
          />
        )}

        {/* Planos de Estudo */}
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

        {/* Tutor IA */}
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

        {/* Perfil & XP */}
        {activePrimaryTab === 'perfil' && (
          <PerfilXP />
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
    </div>
  );
}

export default App;
