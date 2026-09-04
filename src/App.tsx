import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNavigationBar } from './components/BottomNavigationBar';
import { NavigationTabs } from './components/NavigationTabs';
import { DashboardPrincipal } from './components/DashboardPrincipal';
import { ArenaX1Section } from './components/ArenaX1Section';
import { RedacaoCorretor } from './components/RedacaoCorretor';
import { SimuladosSection } from './components/SimuladosSection';
import { ConteudosSection } from './components/ConteudosSection';
import { ProfileSection } from './components/ProfileSection';
import { GabiModal, RankingModal, ProModal, HistoryModal } from './components/Modals';
import {
  getAllMaterials,
  getAllTutorPlans,
  getAllELI5Explanations,
  deleteMaterial,
  deleteTutorPlan,
  deleteELI5Explanation,
} from './utils/db';
import { audioFx } from './utils/audio';
import { StudyMaterial, TutorPlan, ELI5Explanation, UserProfile } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [activePill, setActivePill] = useState<string>('');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  // Controle dos Modais
  const [isGabiOpen, setIsGabiOpen] = useState(false);
  const [isRankingOpen, setIsRankingOpen] = useState(false);
  const [isProOpen, setIsProOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Estados dos dados
  const [dailyQuestions, setDailyQuestions] = useState(12);
  const [studyStreak, setStudyStreak] = useState(7);
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [tutorPlans, setTutorPlans] = useState<TutorPlan[]>([]);
  const [eli5Explanations, setEli5Explanations] = useState<ELI5Explanation[]>([]);

  const [profile, setProfile] = useState<UserProfile>({
    name: 'Estudante',
    targetExam: 'ENEM 2026',
    targetCourse: 'Medicina',
    dailyQuestionsGoal: 20,
    streakDays: 7,
  });

  // Carrega materiais do IndexedDB ao iniciar
  useEffect(() => {
    async function loadData() {
      try {
        const m = await getAllMaterials();
        const p = await getAllTutorPlans();
        const e = await getAllELI5Explanations();
        setMaterials(m);
        setTutorPlans(p);
        setEli5Explanations(e);
      } catch (err) {
        console.error('Erro ao carregar dados do IndexedDB:', err);
      }
    }
    loadData();
  }, []);

  const handleAddQuestion = (count: number) => {
    setDailyQuestions((prev) => prev + count);
    audioFx.playSuccess();
  };

  const handleResetQuestions = () => {
    setDailyQuestions(0);
    audioFx.playClick();
  };

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    audioFx.playClick();
  };

  const handleDeleteMaterialItem = async (id: string) => {
    await deleteMaterial(id);
    setMaterials((prev) => prev.filter((item) => item.id !== id));
    audioFx.playClick();
  };

  const handleDeleteTutorPlanItem = async (id: string) => {
    await deleteTutorPlan(id);
    setTutorPlans((prev) => prev.filter((item) => item.id !== id));
    audioFx.playClick();
  };

  const handleDeleteELI5Item = async (id: string) => {
    await deleteELI5Explanation(id);
    setEli5Explanations((prev) => prev.filter((item) => item.id !== id));
    audioFx.playClick();
  };

  const handleSelectPill = (pillId: string) => {
    setActivePill(pillId);
    audioFx.playClick();

    if (pillId === 'professora') setIsGabiOpen(true);
    if (pillId === 'ranking') setIsRankingOpen(true);
    if (pillId === 'pro') setIsProOpen(true);
    if (pillId === 'bento') setActiveTab('conteudos');
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'} font-sans pb-20`}>
      <Header
        historyCount={materials.length}
        studyStreak={studyStreak}
        theme={theme}
        canGoBack={activeTab !== 'home'}
        onGoBack={() => setActiveTab('home')}
        onToggleTheme={handleToggleTheme}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenHelp={() => setIsGabiOpen(true)}
        onOpenGabi={() => setIsGabiOpen(true)}
        onOpenPro={() => setIsProOpen(true)}
        onOpenProfile={() => setActiveTab('perfil')}
        onOpenRanking={() => setIsRankingOpen(true)}
        onOpenFlashcards={() => setActiveTab('conteudos')}
        onOpenCalendar={() => setActiveTab('home')}
        onOpenBanca={() => setActiveTab('simulados')}
        onOpenGraficosTri={() => setActiveTab('home')}
        onOpenOnboarding={() => setActiveTab('perfil')}
        onOpenOpcoesPage={() => setActiveTab('perfil')}
        onResetView={() => setActiveTab('home')}
        materials={materials}
        tutorPlans={tutorPlans}
        eli5Explanations={eli5Explanations}
        onSelectMaterial={() => {}}
        onSelectTutorPlan={() => {}}
        onSelectELI5={() => {}}
      />

      <NavigationTabs activePill={activePill} onSelectPill={handleSelectPill} />

      <main className="p-4 max-w-lg mx-auto">
        {activeTab === 'home' && (
          <DashboardPrincipal
            dailyQuestions={dailyQuestions}
            dailyQuestionsGoal={profile.dailyQuestionsGoal || 20}
            onAddQuestion={handleAddQuestion}
            onResetQuestions={handleResetQuestions}
            onOpenProfile={() => setActiveTab('perfil')}
            onSelectSubject={() => setActiveTab('simulados')}
          />
        )}

        {activeTab === 'arena' && <ArenaX1Section />}

        {activeTab === 'redacao' && <RedacaoCorretor />}

        {activeTab === 'simulados' && <SimuladosSection />}

        {activeTab === 'conteudos' && (
          <ConteudosSection
            materials={materials}
            tutorPlans={tutorPlans}
            eli5Explanations={eli5Explanations}
            onDeleteMaterial={handleDeleteMaterialItem}
            onDeleteTutorPlan={handleDeleteTutorPlanItem}
            onDeleteELI5={handleDeleteELI5Item}
          />
        )}

        {activeTab === 'perfil' && (
          <ProfileSection profile={profile} onUpdateProfile={setProfile} />
        )}
      </main>

      <BottomNavigationBar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          audioFx.playClick();
        }}
      />

      {/* Popups e Modais */}
      <GabiModal isOpen={isGabiOpen} onClose={() => setIsGabiOpen(false)} />
      <RankingModal isOpen={isRankingOpen} onClose={() => setIsRankingOpen(false)} />
      <ProModal isOpen={isProOpen} onClose={() => setIsProOpen(false)} />
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        materials={materials}
      />
    </div>
  );
}
