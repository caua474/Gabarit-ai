import React, { useState } from 'react';
import React, { useState } from 'react';
import { Header } from './components/Header';
import { OfflineStatusBanner } from './components/OfflineStatusBanner';
import { NavigationTabs } from './components/NavigationTabs';
import { BentoResults } from './components/BentoResults';
import { GabiAssistantModal } from './components/GabiAssistantModal';
import { StudyPlannerModal } from './components/StudyPlannerModal';
import { StudyMaterial } from './types';

export function App() {
  const [activePrimaryTab, setActivePrimaryTab] = useState('materials');
  const [activeSecondaryTab, setActiveSecondaryTab] = useState('all');
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<StudyMaterial | null>(null);

  // Dados de exemplo para exibição
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

        {activePrimaryTab === 'materials' && (
          <BentoResults
            materials={sampleMaterials}
            onSelectMaterial={(mat) => setSelectedMaterial(mat)}
          />
        )}

        {activePrimaryTab === 'plans' && (
          <div className="p-8 bg-slate-900/40 rounded-2xl border border-slate-800 text-center">
            <h2 className="text-lg font-bold text-white mb-2">Seus Planos de Estudo</h2>
            <p className="text-slate-400 text-sm mb-4">Você ainda não gerou nenhum plano personalizado.</p>
            <button
              onClick={() => setIsPlannerOpen(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm transition-all"
            >
              Criar Novo Plano
            </button>
          </div>
        )}

        {activePrimaryTab === 'gabi' && (
          <div className="p-8 bg-slate-900/40 rounded-2xl border border-slate-800 text-center">
            <h2 className="text-lg font-bold text-white mb-2">Tutor IA - Gabi</h2>
            <p className="text-slate-400 text-sm mb-4">Tire dúvidas, peça resumos e tire fotos das suas questões.</p>
            <button
              onClick={() => setIsAssistantOpen(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm transition-all"
            >
              Abrir Chat com a Gabi
            </button>
          </div>
        )}
      {activePrimaryTab === 'profile' && (
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
      />
    </div>
  );
}

export default App;
