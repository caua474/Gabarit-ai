import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import  Header  from './components/Header';
//import { NavigationTabs, AbaAtiva } from './components/NavigationTabs';
//import { OfflineStatusBanner } from './components/OfflineStatusBanner';
//import { ProgressStatsCard } from './components/ProgressStatsCard';
//import { PopularTopicsSection } from './components/PopularTopicsSection';
//import { DayNightModeSection } from './components/DayNightModeSection';
//import { TextInputSection } from './components/TextInputSection';
//import { BentoResults } from './components/BentoResults';
//import { TutorPlanSection } from './components/TutorPlanSection';
//import { ELI5Section } from './components/ELI5Section';
//import { HistoryModal } from './components/HistoryModal';
//import { HowItWorksModal } from './components/HowItWorksModal';
//import { InteractiveQuizModal } from './components/InteractiveQuizModal';
//import { GabiAssistantModal } from './components/GabiAssistantModal';
//import { ProSubscriptionModal } from './components/ProSubscriptionModal';
//import { ProfileSettingsModal } from './components/ProfileSettingsModal';
//import { OnboardingModal, hasSeenOnboarding } from './components/OnboardingModal';
//import { UserGoalFocusCard } from './components/UserGoalFocusCard';
//import { getSavedUserProfile } from './components/ProfileSettingsModal';
//import { UserProfile } from './types';
//import { EssayAnalyzerSection } from './components/EssayAnalyzerSection';
//import { DailyStudyTipModal } from './components/DailyStudyTipModal';
//import { WeeklyRankingSection } from './components/WeeklyRankingSection';
//import { FlashcardGeneratorModal } from './components/FlashcardGeneratorModal';
//import { StudyCalendarModal } from './components/StudyCalendarModal';
//import { QuizBattleSection } from './components/QuizBattleSection';
//import { SimuladoTriSection } from './components/SimuladoTriSection';
//import { QuestionScannerSection } from './components/QuestionScannerSection';
//import { RepertoriosCoringaSection } from './components/RepertoriosCoringaSection';
//import { WidgetSimulationCard } from './components/WidgetSimulationCard';
//import { AulaODomingoSection } from './components/AulaODomingoSection';
//import { CronogramaInteligenteSection } from './components/CronogramaInteligenteSection';
//import { SubjectCatalogSection } from './components/SubjectCatalogSection';
//import { PerformanceDailyTipSection } from './components/PerformanceDailyTipSection';
//import { SisuSimulatorSection } from './components/SisuSimulatorSection';
//import { MindmapGeneratorSection } from './components/MindmapGeneratorSection';
//import { FeynmanAudioSection } from './components/FeynmanAudioSection';
//import { EnemPrintableSheetModal } from './components/EnemPrintableSheetModal';
//import { SocialShareStoryModal } from './components/SocialShareStoryModal';
//import { PomodoroFocusSection } from './components/PomodoroFocusSection';
//import { AudioPodcastsSection } from './components/AudioPodcastsSection';
//import { CadernoDeErrosSection } from './components/CadernoDeErrosSection';
//import { ParentPerformanceReportModal } from './components/ParentPerformanceReportModal';
//import { ReelsQuestionFeedSection } from './components/ReelsQuestionFeedSection';
//import { EssaySkeletonCanvasSection } from './components/EssaySkeletonCanvasSection';
//import { KnowledgePillsSection } from './components/KnowledgePillsSection';
//import { AdaptiveSimuladoSection } from './components/AdaptiveSimuladoSection';
//import { HotEssayRadarSection } from './components/HotEssayRadarSection';
//import { LeitnerSpacedRepetitionSection } from './components/LeitnerSpacedRepetitionSection';
//import { DataSaverOfflineSection } from './components/DataSaverOfflineSection';
//import { MascotEvolutivoSection } from './components/MascotEvolutivoSection';
//import { CheatSheetGeneratorSection } from './components/CheatSheetGeneratorSection';
//import { BancaPersonalitySelectorModal } from './components/BancaPersonalitySelectorModal';
//import { DevilAdvocateSection } from './components/DevilAdvocateSection';
//import { AutoFlashcardsSection } from './components/AutoFlashcardsSection';
//import { C5InterventionDetectorSection } from './components/C5InterventionDetectorSection';
//import { WeeklyRoutinePlannerSection } from './components/WeeklyRoutinePlannerSection';
//import { TestStrategyGabaritoSection } from './components/TestStrategyGabaritoSection';
//import { OpticalAnswerSheetScannerSection } from './components/OpticalAnswerSheetScannerSection';
//import { ExamAmbientSoundPlayer } from './components/ExamAmbientSoundPlayer';
//import { EmergencyFinal30DaysSection } from './components/EmergencyFinal30DaysSection';
//import { EnemGlossarySection } from './components/EnemGlossarySection';
//import { StudyStatisticsSection } from './components/StudyStatisticsSection';
//import { DailyGoalsWidget } from './components/DailyGoalsWidget';
//import { BibliotecaSection } from './components/BibliotecaSection';
//import { ArenaX1Section } from './components/ArenaX1Section';
//import { CentralDeOpcoesSection } from './components/CentralDeOpcoesSection';
//import { QuickQuizTriTooltip } from './components/QuickQuizTriTooltip';
//import { BottomNavigationBar, PrimaryTab } from './components/BottomNavigationBar';
//import {
  //getNotificationSettings,
  //saveNotificationSettings,
// sendStreakReminderNotification,
  //getNotificationPermission,
 // isTodayStudyCompleted,
//} from './utils/notifications';
import { StudyMaterial, TutorPlan, ELI5Explanation } from './types';
//import { GabiAvatar } from './components/GabiAvatar';
//import * as db from './utils/db';
import { AlertCircle, GraduationCap, Sparkles, BookOpen, Calendar, Lightbulb, Zap, PenTool, Trophy, Swords, Share2, BookText, Calculator, ChevronDown, Timer, Keyboard } from 'lucide-react';

const STREAK_KEY = 'assistente_estudos_bento_streak_v1';
const LAST_DATE_KEY = 'assistente_estudos_bento_last_date_v1';
const THEME_KEY = 'assistente_estudos_theme_v1';

const tabContentVariants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.985,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    y: -16,
    scale: 0.99,
    transition: {
      duration: 0.2,
      ease: [0.7, 0, 0.84, 0] as const,
    },
  },
};

export default function App() {
  const [activePrimaryTab, setActivePrimaryTab] = useState<PrimaryTab>('home');
  const [abaAtiva, setAbaAtiva] = useState<AbaAtiva>('flashcards');
  const [isPomodoroModalOpen, setIsPomodoroModalOpen] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfile>(() => getSavedUserProfile());

  const handleSelectPrimaryTab = (tab: PrimaryTab) => {
    setActivePrimaryTab(tab);
    if (tab === 'arena') {
      setAbaAtiva('arena_x1');
    } else if (tab === 'conteudos') {
      if (!['flashcards', 'biblioteca', 'catalogo', 'glossario_enem', 'mapas_mentais', 'pilulas_conhecimento', 'audio_podcasts', 'auto_flashcards', 'duvidas'].includes(abaAtiva)) {
        setAbaAtiva('flashcards');
      }
    } else if (tab === 'redacao_ia') {
      if (!['redacao', 'c5_intervencao', 'repertorio', 'esquema_redacao', 'radar_redacao', 'advogado_diabo'].includes(abaAtiva)) {
        setAbaAtiva('redacao');
      }
    } else if (tab === 'simulados_treino') {
      if (!['simulado_tri', 'simulado_adaptativo', 'reels_feed', 'arena_x1', 'desafios', 'caderno_erros', 'corretor_gabarito', 'estratégia_chute', 'som_ambiente'].includes(abaAtiva)) {
        setAbaAtiva('simulado_tri');
      }
    } else if (tab === 'perfil_gamificacao') {
      if (!['estatisticas_estudo', 'mascote_xp', 'ranking', 'reta_final', 'planner_rotina', 'sisu_simulator', 'folha_vespera'].includes(abaAtiva)) {
        setAbaAtiva('estatisticas_estudo');
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToModule = (primaryTab: PrimaryTab, subTool?: AbaAtiva) => {
    setActivePrimaryTab(primaryTab);
    if (subTool) {
      setAbaAtiva(subTool);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Check URL query parameters for battle challenges
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.has('battle') || params.has('sala') || params.has('arena')) {
        setActivePrimaryTab('arena');
        setAbaAtiva('arena_x1');
      }
    } catch {
      // ignore
    }
  }, []);
  
  // IndexedDB Stored History States
  const [history, setHistory] = useState<StudyMaterial[]>([]);
  const [tutorPlans, setTutorPlans] = useState<TutorPlan[]>([]);
  const [eli5Explanations, setEli5Explanations] = useState<ELI5Explanation[]>([]);

  const [currentMaterial, setCurrentMaterial] = useState<StudyMaterial | null>(null);
  const [currentTutorPlan, setCurrentTutorPlan] = useState<TutorPlan | null>(null);
  const [currentELI5Explanation, setCurrentELI5Explanation] = useState<ELI5Explanation | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isTutorLoading, setIsTutorLoading] = useState(false);
  const [isELI5Loading, setIsELI5Loading] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<
    'history' | 'help' | 'quiz' | 'gabi' | 'pro' | 'profile' | 'flashcards' | 'calendar' | 'onboarding' | 'printable_sheet' | 'social_story' | null
  >(null);
  const [gabiInitialPrompt, setGabiInitialPrompt] = useState<string | null>(null);
  const [socialStoryData, setSocialStoryData] = useState<{
    type: 'redacao' | 'mascote' | 'streak' | 'quiz';
    data: any;
  }>({
    type: 'streak',
    data: { streakDays: 14, courseTarget: 'Medicina' }
  });
  const [isParentReportOpen, setIsParentReportOpen] = useState<boolean>(false);
  const [isBancaModalOpen, setIsBancaModalOpen] = useState<boolean>(false);
  const [studyStreak, setStudyStreak] = useState<number>(1);
  const [isQuizMenuOpen, setIsQuizMenuOpen] = useState<boolean>(false);
  const [isTriTooltipOpen, setIsTriTooltipOpen] = useState<boolean>(false);
  const [todayQuizzesCount, setTodayQuizzesCount] = useState<number>(0);
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const triHoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isLongPressTriggeredRef = useRef<boolean>(false);
  const quizMenuRef = useRef<HTMLDivElement | null>(null);

  const refreshTodayQuizzesCount = async () => {
    try {
      const results = await db.getAllQuizResults();
      const todayStr = new Date().toISOString().split('T')[0];
      const count = results.filter((r) => r.createdAt && r.createdAt.startsWith(todayStr)).length;
      setTodayQuizzesCount(count);
    } catch (err) {
      console.error('Erro ao buscar contagem de quizzes de hoje:', err);
    }
  };

  // Close quiz dropdown or TRI tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (quizMenuRef.current && !quizMenuRef.current.contains(event.target as Node)) {
        setIsQuizMenuOpen(false);
        setIsTriTooltipOpen(false);
      }
    };
    if (isQuizMenuOpen || isTriTooltipOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isQuizMenuOpen, isTriTooltipOpen]);

  // Auto-open Onboarding Tour for new users
  useEffect(() => {
    if (!hasSeenOnboarding()) {
      const timer = setTimeout(() => {
        setActiveModal('onboarding');
      }, 600);
      return () => clearTimeout(timer);
    }
  }, []);

  // Track unread study reminders count for Gabi FAB avatar badge
  const [unreadStudyRemindersCount, setUnreadStudyRemindersCount] = useState<number>(() => {
    try {
      const todayStr = new Date().toDateString();
      const viewedToday = localStorage.getItem('gabi_study_reminder_viewed_date') === todayStr;
      const isCompleted = isTodayStudyCompleted();
      if (!isCompleted && !viewedToday) {
        return 1;
      }
      return 0;
    } catch {
      return 1;
    }
  });

  // State to control Gabi Quick Action menu with Framer Motion slide-up transition
  const [isGabiQuickMenuOpen, setIsGabiQuickMenuOpen] = useState(false);

  // Clear Gabi badge when Gabi assistant modal is opened
  useEffect(() => {
    if (activeModal === 'gabi') {
      try {
        localStorage.setItem('gabi_study_reminder_viewed_date', new Date().toDateString());
      } catch (e) {
        console.error(e);
      }
      setUnreadStudyRemindersCount(0);
    }
  }, [activeModal]);

  // Global keyboard shortcut to toggle Gabi assistant modal (Alt + G or Ctrl + G / Cmd + G)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if 'g' or 'G' was pressed along with Alt, Ctrl, or Cmd (Meta)
      if ((event.altKey || event.ctrlKey || event.metaKey) && (event.key === 'g' || event.key === 'G')) {
        event.preventDefault();
        setActiveModal((prev) => (prev === 'gabi' ? null : 'gabi'));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Theme state stored in localStorage
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_KEY);
      if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
      }
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    try {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      console.error('Erro ao salvar tema no localStorage:', e);
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Load initial IndexedDB data & streak
  useEffect(() => {
    async function loadIndexedDBData() {
      try {
        await db.migrateFromLocalStorage();

        const [loadedMaterials, loadedTutorPlans, loadedELI5] = await Promise.all([
          db.getAllMaterials(),
          db.getAllTutorPlans(),
          db.getAllELI5Explanations(),
        ]);

        setHistory(loadedMaterials);
        setTutorPlans(loadedTutorPlans);
        setEli5Explanations(loadedELI5);
        await refreshTodayQuizzesCount();

        if (loadedMaterials.length > 0 && !currentMaterial) {
          setCurrentMaterial(loadedMaterials[0]);
        }
        if (loadedTutorPlans.length > 0 && !currentTutorPlan) {
          setCurrentTutorPlan(loadedTutorPlans[0]);
        }
        if (loadedELI5.length > 0 && !currentELI5Explanation) {
          setCurrentELI5Explanation(loadedELI5[0]);
        }
      } catch (e) {
        console.error('Erro ao carregar dados do IndexedDB:', e);
      }
    }

    loadIndexedDBData();

    try {
      const savedStreak = localStorage.getItem(STREAK_KEY);
      if (savedStreak) {
        setStudyStreak(parseInt(savedStreak, 10) || 1);
      }

      const lastDate = localStorage.getItem(LAST_DATE_KEY);
      const today = new Date().toDateString();
      if (lastDate && lastDate !== today) {
        const last = new Date(lastDate);
        const now = new Date();
        const diffDays = Math.round((now.getTime() - last.getTime()) / (1000 * 3600 * 24));
        if (diffDays > 1) {
          setStudyStreak(1);
          localStorage.setItem(STREAK_KEY, '1');
        }
      }
    } catch (e) {
      console.error('Erro ao carregar streak:', e);
    }
  }, []);

  // Background Push Notification Reminder Scheduler
  useEffect(() => {
    const checkNotificationSchedule = () => {
      const settings = getNotificationSettings();
      if (!settings.enabled || getNotificationPermission() !== 'granted') return;

      const now = new Date();
      const currentHoursMinutes = `${String(now.getHours()).padStart(2, '0')}:${String(
        now.getMinutes()
      ).padStart(2, '0')}`;
      const todayKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
        now.getDate()
      ).padStart(2, '0')}`;

      if (currentHoursMinutes === settings.time && settings.lastSentDate !== todayKey) {
        const isCompleted = isTodayStudyCompleted();
        const isStreakAtRisk = !isCompleted;
        sendStreakReminderNotification(studyStreak, isStreakAtRisk);
        saveNotificationSettings({
          ...settings,
          lastSentDate: todayKey,
        });
      }
    };

    // Run initial check and set up 30-second interval
    checkNotificationSchedule();
    const interval = setInterval(checkNotificationSchedule, 30000);
    return () => clearInterval(interval);
  }, [studyStreak]);

  const updateStreak = () => {
    const today = new Date().toDateString();
    const lastDate = localStorage.getItem(LAST_DATE_KEY);

    if (lastDate !== today) {
      const newStreak = studyStreak + 1;
      setStudyStreak(newStreak);
      localStorage.setItem(STREAK_KEY, newStreak.toString());
      localStorage.setItem(LAST_DATE_KEY, today);
    }
  };

  const handleSummarize = async (text: string, focusTopic?: string) => {
    if (!navigator.onLine) {
      setError('Você está offline no momento. O gerador de IA precisa de internet, mas você pode consultar todo o seu histórico gravado no IndexedDB!');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, focusTopic }),
      });

      const json = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(json.error || 'Não foi possível processar o texto com a IA.');
      }

      const data = json.data;

      let title = text.trim().split('\n')[0].replace(/^#+\s*/, '').slice(0, 45);
      if (focusTopic) {
        title = `Estudo: ${focusTopic}`;
      } else if (title.length < 5) {
        title = `Texto de Estudo - ${new Date().toLocaleDateString('pt-BR')}`;
      }

      const newMaterial: StudyMaterial = {
        id: Date.now().toString(),
        title,
        originalText: text,
        resumoDireto: data.resumoDireto || 'Resumo gerado com sucesso.',
        pontosPrincipais: data.pontosPrincipais || [],
        perguntas: data.perguntas || [],
        flashcards: data.flashcards || [],
        rawText: data.rawText || '',
        createdAt: new Date().toISOString(),
        focusTopic,
      };

      // Save into IndexedDB
      await db.saveMaterial(newMaterial);

      const updatedHistory = [newMaterial, ...history];
      setHistory(updatedHistory);
      setCurrentMaterial(newMaterial);

      updateStreak();
    } catch (err: any) {
      console.error('Erro ao resumir:', err);
      setError(err.message || 'Ocorreu um erro ao conectar com o serviço de IA.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateTutorPlan = async (
    materia: string,
    serieAno: string,
    objetivo: string,
    tempoDisponivel: string
  ) => {
    if (!navigator.onLine) {
      setError('Você está offline no momento. O gerador de IA precisa de internet, mas você pode consultar todos os planos do tutor gravados no IndexedDB!');
      return;
    }

    setIsTutorLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/tutor-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ materia, serieAno, objetivo, tempoDisponivel }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Erro ao gerar o plano do tutor.');
      }

      const newPlan: TutorPlan = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        materia,
        serieAno,
        objetivo,
        tempoDisponivel,
        cronograma: json.data.cronograma || [],
        aulaResumo: json.data.aulaResumo || '',
        questoes: json.data.questoes || [],
        gabaritoComentado: json.data.gabaritoComentado || '',
      };

      // Save into IndexedDB
      await db.saveTutorPlan(newPlan);

      const updatedPlans = [newPlan, ...tutorPlans];
      setTutorPlans(updatedPlans);
      setCurrentTutorPlan(newPlan);
      updateStreak();
    } catch (err: any) {
      console.error('Erro no plano do tutor:', err);
      setError(err.message || 'Ocorreu um erro ao gerar o plano de estudos.');
    } finally {
      setIsTutorLoading(false);
    }
  };

  const handleExplainELI5 = async (duvida: string) => {
    if (!navigator.onLine) {
      setError('Você está offline no momento. O gerador de IA precisa de internet, mas você pode consultar todas as suas explicações gravadas no IndexedDB!');
      return;
    }

    setIsELI5Loading(true);
    setError(null);

    try {
      const res = await fetch('/api/explain-eli5', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ duvida }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Erro ao descomplicar sua dúvida.');
      }

      const newExplanation: ELI5Explanation = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        duvida,
        analogiaSimples: json.data.analogiaSimples || '',
        passoAPasso: json.data.passoAPasso || [],
        dicaDeOuro: json.data.dicaDeOuro || '',
      };

      // Save into IndexedDB
      await db.saveELI5Explanation(newExplanation);

      const updatedELI5 = [newExplanation, ...eli5Explanations];
      setEli5Explanations(updatedELI5);
      setCurrentELI5Explanation(newExplanation);
      updateStreak();
    } catch (err: any) {
      console.error('Erro na explicação ELI5:', err);
      setError(err.message || 'Ocorreu um erro ao gerar a explicação simplificada.');
    } finally {
      setIsELI5Loading(false);
    }
  };

  type QuizMode = 'rapido' | 'definicoes' | 'formulas';

  const handleStartQuickQuiz = (mode: QuizMode = 'rapido') => {
    let targetMaterial: StudyMaterial;

    if (mode === 'definicoes') {
      if (history.length > 0) {
        const recent = history[0];
        targetMaterial = {
          ...recent,
          id: 'quiz_def_' + Date.now(),
          title: `Quiz de Definições: ${recent.title}`,
          perguntas: [
            {
              pergunta: `Qual a definição e significado do conceito central abordado em "${recent.title}"?`,
              resposta:
                recent.pontosPrincipais?.[0] ||
                recent.resumoDireto ||
                'Conceito estrutural abordado pelo material de estudo.',
            },
            {
              pergunta: `Defina os termos técnicos e vocabulário chave relacionados a "${recent.title}".`,
              resposta:
                recent.pontosPrincipais?.[1] ||
                recent.resumoDireto ||
                'Terminologias fundamentais aplicadas na disciplina.',
            },
            {
              pergunta: `Como a Professora Gabi sintetiza a definição prática deste conteúdo para o ENEM?`,
              resposta:
                recent.pontosPrincipais?.[2] ||
                recent.resumoDireto ||
                'Compreensão de definições teóricas e distinções conceituais.',
            },
          ],
        };
      } else {
        targetMaterial = {
          id: 'quiz_def_default',
          title: 'Quiz de Definições: Conceitos & Glossário do ENEM',
          originalText: 'Definições conceituais fundamentais para o ENEM.',
          resumoDireto: 'Glossário e termos-chave essenciais em Ciências da Natureza e Humanas.',
          pontosPrincipais: [
            'Quimiossíntese vs Fotossíntese',
            'Biomagnificação Trófica e Bioacumulação',
            'Cidadania e Direitos Civis, Políticos e Sociais (T.H. Marshall)',
          ],
          perguntas: [
            {
              pergunta: 'Defina o que é Quimiossíntese e diferencie-a da Fotossíntese.',
              resposta:
                'Quimiossíntese é a produção de matéria orgânica a partir da oxidação de substâncias minerais inorgânicas sem luz solar (realizada por bactérias autótrofas em ambientes abissais ou solo).',
            },
            {
              pergunta: 'Qual a definição ecológica exata de Biomagnificação Trófica?',
              resposta:
                'É o acúmulo progressivo de compostos tóxicos não biodegradáveis (como mercúrio e pesticidas) ao longo dos níveis tróficos, atingindo concentração máxima nos predadores de topo.',
            },
            {
              pergunta: 'Segundo a sociologia de T.H. Marshall, como se definem os Direitos Sociais?',
              resposta:
                'São garantias do Estado para assegurar um padrão mínimo de bem-estar econômico e segurança social, englobando direito à educação, saúde, previdência e moradia digna.',
            },
          ],
          flashcards: [],
          rawText: '',
          createdAt: new Date().toISOString(),
          focusTopic: 'Definições ENEM',
        };
      }
    } else if (mode === 'formulas') {
      if (history.length > 0) {
        const recent = history[0];
        targetMaterial = {
          ...recent,
          id: 'quiz_form_' + Date.now(),
          title: `Quiz de Fórmulas: ${recent.title}`,
          perguntas: [
            {
              pergunta: `Qual a fórmula ou relação matemática e quantitativa fundamental em "${recent.title}"?`,
              resposta:
                recent.pontosPrincipais?.[0] ||
                'Aplicação de relações quantitativas e grandezas proporcionais.',
            },
            {
              pergunta: `Como calcular as variáveis e grandezas principais envolvidas em "${recent.title}"?`,
              resposta:
                recent.pontosPrincipais?.[1] ||
                'Substituição nas equações fundamentais e conversão correta de unidades no SI.',
            },
            {
              pergunta: `Qual a relação de proporcionalidade direta/inversa entre as grandezas de "${recent.title}"?`,
              resposta:
                recent.pontosPrincipais?.[2] ||
                'Análise dimensional e comportamento gráfico das funções matemáticas associadas.',
            },
          ],
        };
      } else {
        targetMaterial = {
          id: 'quiz_form_default',
          title: 'Quiz de Fórmulas: Equações Fundamentais para o ENEM & Vestibulares',
          originalText: 'Formulário essencial de Física, Química e Matemática.',
          resumoDireto: 'Fixação das equações mais recorrentes nas provas de Ciências da Natureza e Matemática.',
          pontosPrincipais: [
            'Equação Fundamental da Ondulatória (v = λ · f)',
            'Equação de Clapeyron dos Gases Ideais (P · V = n · R · T)',
            'Trabalho de uma Força e Energia Cinética (W = F · d · cosθ & Ec = mv²/2)',
          ],
          perguntas: [
            {
              pergunta: 'Qual é a Equação Fundamental da Ondulatória e o que representa cada grandeza no SI?',
              resposta:
                'v = λ · f, onde v é velocidade de propagação (m/s), λ é o comprimento de onda (metros) e f é a frequência (Hertz, Hz).',
            },
            {
              pergunta: 'Como é expressa a Equação de Clapeyron (Gases Ideais) e qual o valor usual da constante R?',
              resposta:
                'P · V = n · R · T, onde R ≈ 0,082 atm·L/(mol·K) ou 8,31 J/(mol·K).',
            },
            {
              pergunta: 'Qual a fórmula para o cálculo do Trabalho de uma Força constante e da Energia Cinética?',
              resposta:
                'Trabalho: W = F · d · cos(θ) em Joules (J). Energia Cinética: Ec = (m · v²) / 2 em Joules (J).',
            },
          ],
          flashcards: [],
          rawText: '',
          createdAt: new Date().toISOString(),
          focusTopic: 'Fórmulas Exatas ENEM',
        };
      }
    } else {
      // Standard quick quiz ('rapido')
      if (history.length > 0) {
        const recent = history[0];
        const qs =
          recent.perguntas && recent.perguntas.length >= 3
            ? recent.perguntas.slice(0, 3)
            : recent.perguntas && recent.perguntas.length > 0
            ? [
                ...recent.perguntas,
                {
                  pergunta: `Qual o conceito central abordado no tema "${recent.title}"?`,
                  resposta:
                    recent.pontosPrincipais?.[0] ||
                    recent.resumoDireto ||
                    'Compreensão aprofundada das definições e fundamentos teóricos.',
                },
                {
                  pergunta: `Como o conteúdo de "${recent.title}" é contextualizado em provas e vestibulares?`,
                  resposta:
                    recent.pontosPrincipais?.[1] ||
                    'Resolução crítica com análise de situações práticas e enunciados interdisciplinares.',
                },
              ].slice(0, 3)
            : [
                {
                  pergunta: `O que é fundamental compreender sobre "${recent.title}"?`,
                  resposta:
                    recent.resumoDireto ||
                    'Compreensão aprofundada dos conceitos-chave e aplicações.',
                },
                {
                  pergunta: `Qual o principal ponto destacado pela Professora Gabi neste conteúdo?`,
                  resposta:
                    recent.pontosPrincipais?.[0] || 'Domínio teórico e resolução prática.',
                },
                {
                  pergunta: `Qual a aplicação prática mais relevante deste estudo?`,
                  resposta:
                    recent.pontosPrincipais?.[1] ||
                    'Resolução de questões de vestibulares e interpretação contextualizada.',
                },
              ];

        targetMaterial = {
          ...recent,
          id: 'quick_quiz_' + Date.now(),
          title: `Desafio da Professora Gabi: ${recent.title}`,
          perguntas: qs.slice(0, 3),
        };
      } else if (tutorPlans.length > 0) {
        const plan = tutorPlans[0];
        const qs =
          plan.questoes && plan.questoes.length > 0
            ? plan.questoes.slice(0, 3).map((q) => ({
                pergunta: q.pergunta,
                resposta: `${q.respostaCorreta} — ${q.explicacaoGabarito}`,
              }))
            : [
                {
                  pergunta: `Qual o foco principal do plano de ${plan.materia}?`,
                  resposta: plan.objetivo,
                },
                {
                  pergunta: `Qual o resumo da aula estruturada para ${plan.materia}?`,
                  resposta: plan.aulaResumo || plan.objetivo,
                },
                {
                  pergunta: `Qual o gabarito comentado recomendado pela Professora Gabi?`,
                  resposta: plan.gabaritoComentado || 'Revisão ativa e prática constante.',
                },
              ];

        targetMaterial = {
          id: 'quick_quiz_' + Date.now(),
          title: `Desafio da Professora Gabi: ${plan.materia} (${plan.serieAno})`,
          originalText: plan.objetivo,
          resumoDireto: plan.aulaResumo || plan.objetivo,
          pontosPrincipais: plan.cronograma?.map((c) => `${c.etapa}: ${c.descricao}`) || [plan.objetivo],
          perguntas: qs.slice(0, 3),
          flashcards: [],
          rawText: '',
          createdAt: new Date().toISOString(),
          focusTopic: plan.materia,
        };
      } else if (eli5Explanations.length > 0) {
        const exp = eli5Explanations[0];
        targetMaterial = {
          id: 'quick_quiz_' + Date.now(),
          title: `Desafio da Professora Gabi: ${exp.duvida}`,
          originalText: exp.duvida,
          resumoDireto: exp.analogiaSimples,
          pontosPrincipais: exp.passoAPasso || [exp.dicaDeOuro],
          perguntas: [
            {
              pergunta: `Como explicar de forma simples a dúvida: "${exp.duvida}"?`,
              resposta: exp.analogiaSimples,
            },
            {
              pergunta: `Qual é o primeiro passo para resolver ou entender "${exp.duvida}"?`,
              resposta: exp.passoAPasso?.[0] || exp.analogiaSimples,
            },
            {
              pergunta: `Qual a Dica de Ouro da Professora Gabi sobre este conceito?`,
              resposta: exp.dicaDeOuro,
            },
          ],
          flashcards: [],
          rawText: '',
          createdAt: new Date().toISOString(),
          focusTopic: exp.duvida,
        };
      } else {
        // Default initial study topic: Fotossíntese & Bioenergética (Biologia ENEM)
        targetMaterial = {
          id: 'quick_quiz_default',
          title: 'Desafio da Professora Gabi: Fotossíntese & Energia (Biologia)',
          originalText: 'Fotossíntese e produção de energia celular.',
          resumoDireto:
            'Fixação de conceitos fundamentais da fase fotoquímica e ciclo de Calvin.',
          pontosPrincipais: [
            'Fase fotoquímica nos tilacoides com produção de ATP e NADPH',
            'Fotólise da água liberando oxigênio para a atmosfera',
            'Ciclo de Calvin com fixação de CO2 e síntese de glicose',
          ],
          perguntas: [
            {
              pergunta:
                'Em qual organela das células vegetais ocorre a fotossíntese e qual o principal pigmento responsável pela absorção da luz solar?',
              resposta:
                'Ocorre nos cloroplastos, utilizando a clorofila como pigmento fotorreceptor.',
            },
            {
              pergunta:
                'De onde provém o gás oxigênio (O2) liberado para a atmosfera durante a fase fotoquímica da fotossíntese?',
              resposta:
                'Provém da fotólise da água (quebra da molécula de H2O pela energia luminosa).',
            },
            {
              pergunta:
                'Qual o papel fundamental do Ciclo de Calvin (fase química/escura) na nutrição das plantas?',
              resposta:
                'Fixar o dióxido de carbono (CO2) para produzir carboidratos (como glicose), consumindo o ATP e NADPH gerados na fase clara.',
            },
          ],
          flashcards: [],
          rawText: '',
          createdAt: new Date().toISOString(),
          focusTopic: 'Biologia ENEM',
        };
      }
    }

    setCurrentMaterial(targetMaterial);
    setActiveModal('quiz');
  };

  // Global keyboard shortcut to trigger Quick Quiz ('q' or 'Q' when not typing in form controls)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const isTyping =
        activeEl &&
        (activeEl.tagName === 'INPUT' ||
          activeEl.tagName === 'TEXTAREA' ||
          activeEl.tagName === 'SELECT' ||
          (activeEl as HTMLElement).isContentEditable);

      if (isTyping) return;

      if (
        (event.key === 'q' || event.key === 'Q') &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey
      ) {
        if (!activeModal || activeModal === 'history') {
          event.preventDefault();
          handleStartQuickQuiz('rapido');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [history, tutorPlans, eli5Explanations, activeModal]);

  const handleShareQuizPerformance = async () => {
    try {
      const results = await db.getAllQuizResults();
      const latest = results && results.length > 0 ? results[0] : null;
      const topic =
        latest?.topico ||
        latest?.materia ||
        history[0]?.title ||
        'Fotossíntese & Bioenergética (Biologia)';
      const score = latest ? latest.acertos : 3;
      const total = latest ? latest.totalQuestoes : 3;
      const percent = latest ? latest.porcentagem : 100;

      setSocialStoryData({
        type: 'quiz',
        data: {
          quizScore: score,
          quizTotal: total,
          quizTopic: topic,
          quizPercent: percent,
          streakDays: studyStreak,
          courseTarget: getSavedUserProfile()?.targetCourse || 'Medicina / Federal',
        },
      });
      setActiveModal('social_story');
    } catch {
      setSocialStoryData({
        type: 'quiz',
        data: {
          quizScore: 3,
          quizTotal: 3,
          quizTopic: history[0]?.title || 'Fotossíntese & Bioenergética (Biologia)',
          quizPercent: 100,
          streakDays: studyStreak,
          courseTarget: getSavedUserProfile()?.targetCourse || 'Aprovação no ENEM 2026',
        },
      });
      setActiveModal('social_story');
    }
  };

  const handleDeleteMaterial = async (id: string) => {
    try {
      await db.deleteMaterial(id);
      const updated = history.filter((item) => item.id !== id);
      setHistory(updated);
      if (currentMaterial?.id === id) {
        setCurrentMaterial(updated[0] || null);
      }
    } catch (err) {
      console.error('Erro ao excluir do IndexedDB:', err);
    }
  };

  const handleDeleteTutorPlan = async (id: string) => {
    try {
      await db.deleteTutorPlan(id);
      const updated = tutorPlans.filter((plan) => plan.id !== id);
      setTutorPlans(updated);
      if (currentTutorPlan?.id === id) {
        setCurrentTutorPlan(updated[0] || null);
      }
    } catch (err) {
      console.error('Erro ao excluir plano do IndexedDB:', err);
    }
  };

  const handleDeleteELI5 = async (id: string) => {
    try {
      await db.deleteELI5Explanation(id);
      const updated = eli5Explanations.filter((exp) => exp.id !== id);
      setEli5Explanations(updated);
      if (currentELI5Explanation?.id === id) {
        setCurrentELI5Explanation(updated[0] || null);
      }
    } catch (err) {
      console.error('Erro ao excluir explicação do IndexedDB:', err);
    }
  };

  const handleClearHistory = async (category: 'materials' | 'tutor' | 'eli5' | 'all') => {
    try {
      if (category === 'materials') {
        if (confirm('Deseja realmente apagar todos os resumos do IndexedDB?')) {
          await db.clearAllMaterials();
          setHistory([]);
          setCurrentMaterial(null);
        }
      } else if (category === 'tutor') {
        if (confirm('Deseja realmente apagar todos os planos do tutor do IndexedDB?')) {
          await db.clearAllTutorPlans();
          setTutorPlans([]);
          setCurrentTutorPlan(null);
        }
      } else if (category === 'eli5') {
        if (confirm('Deseja realmente apagar todas as explicações ELI5 do IndexedDB?')) {
          await db.clearAllELI5Explanations();
          setEli5Explanations([]);
          setCurrentELI5Explanation(null);
        }
      } else if (category === 'all') {
        if (confirm('Deseja realmente apagar TODO o histórico do IndexedDB?')) {
          await db.clearEntireDatabase();
          setHistory([]);
          setTutorPlans([]);
          setEli5Explanations([]);
          setCurrentMaterial(null);
          setCurrentTutorPlan(null);
          setCurrentELI5Explanation(null);
        }
      }
    } catch (err) {
      console.error('Erro ao limpar histórico do IndexedDB:', err);
    }
  };

  const totalHistoryCount = history.length + tutorPlans.length + eli5Explanations.length;

  return (
    <div
      style={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden' }}
      className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-[#f8fafc] dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans select-none antialiased transition-colors duration-200 box-border"
    >
      {/* Offline Banner */}
      <OfflineStatusBanner />

      {/* Header Bar */}
      <Header
        historyCount={totalHistoryCount}
        studyStreak={studyStreak}
        theme={theme}
        canGoBack={activePrimaryTab !== 'home'}
        onGoBack={() => handleSelectPrimaryTab('home')}
        onToggleTheme={handleToggleTheme}
        onOpenHistory={() => setActiveModal('history')}
        onOpenHelp={() => setActiveModal('help')}
        onOpenGabi={() => setActiveModal('gabi')}
        onOpenPro={() => setActiveModal('pro')}
        onOpenProfile={() => setActiveModal('profile')}
        onOpenRanking={() => navigateToModule('perfil_gamificacao', 'ranking')}
        onOpenFlashcards={() => setActiveModal('flashcards')}
        onOpenCalendar={() => setActiveModal('calendar')}
        onOpenBanca={() => setIsBancaModalOpen(true)}
        onOpenGraficosTri={() => navigateToModule('perfil_gamificacao', 'estatisticas_estudo')}
        onOpenOnboarding={() => setActiveModal('onboarding')}
        onOpenOpcoesPage={() => handleSelectPrimaryTab('opcoes_hub')}
        onResetView={() => handleSelectPrimaryTab('home')}
        materials={history}
        tutorPlans={tutorPlans}
        eli5Explanations={eli5Explanations}
        onSelectMaterial={(mat) => {
          navigateToModule('conteudos', 'flashcards');
          setCurrentMaterial(mat);
        }}
        onSelectTutorPlan={(plan) => {
          navigateToModule('conteudos', 'cronograma');
          setCurrentTutorPlan(plan);
        }}
        onSelectELI5={(exp) => {
          navigateToModule('conteudos', 'duvidas');
          setCurrentELI5Explanation(exp);
        }}
      />

      {/* Main App Container with Bottom Padding for Navigation Bar */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 pb-28">
        {/* ABA DEDICADA: CENTRAL DE OPÇÕES & CONFIGURAÇÕES (ACESSADA DIRETAMENTE PELOS 3 PONTINHOS DO TOPO) */}
        {activePrimaryTab === 'opcoes_hub' && (
          <CentralDeOpcoesSection
            userProfile={userProfile}
            studyStreak={studyStreak}
            historyCount={totalHistoryCount}
            theme={theme}
            onToggleTheme={handleToggleTheme}
            onOpenProfile={() => setActiveModal('profile')}
            onOpenHistory={() => setActiveModal('history')}
            onOpenHelp={() => setActiveModal('help')}
            onOpenOnboarding={() => setActiveModal('onboarding')}
            onOpenGabi={() => setActiveModal('gabi')}
            onOpenPro={() => setActiveModal('pro')}
            onGoHome={() => handleSelectPrimaryTab('home')}
          />
        )}

        {/* ABA 1: HOME (Dashboard Central) */}
        {activePrimaryTab === 'home' && (
          <div className="space-y-8 animate-in fade-in">
            {/* Header Greeting Banner */}
            <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-indigo-800/40">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="bg-indigo-500/20 text-indigo-300 font-extrabold text-[10px] uppercase px-2.5 py-0.5 rounded-full border border-indigo-400/30">
                      🚀 GabaritaAí Dashboard
                    </span>
                    <span className="bg-emerald-500/20 text-emerald-300 font-bold text-[10px] uppercase px-2 py-0.5 rounded-full border border-emerald-400/30">
                      🔥 Ofensiva {studyStreak} Dias
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">
                    Olá, {userProfile.name || 'Estudante'}! Pronto para Gabaritar Hoje?
                  </h2>
                  <p className="text-xs sm:text-sm text-indigo-200 font-medium">
                    Acesse todos os seus módulos de estudo, simulações com TRI real e correção de redação em um único lugar.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveModal('help')}
                    className="px-4 py-3 rounded-2xl bg-indigo-600/70 hover:bg-indigo-600 text-white font-extrabold text-xs transition border border-indigo-400/30 flex items-center gap-1.5 cursor-pointer active:scale-95 shadow-md"
                  >
                    <span>💡</span>
                    <span>Tutorial Rápido</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => navigateToModule('simulados_treino', 'simulado_tri')}
                    className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs hover:scale-105 transition shadow-lg cursor-pointer shrink-0"
                  >
                    📝 Iniciar Simulado TRI Agora
                  </button>
                </div>
              </div>
            </div>

            {/* PAINEL FOCADO NA META DO USUÁRIO */}
            <UserGoalFocusCard
              userProfile={userProfile}
              onEditGoal={() => setActiveModal('onboarding')}
              onOpenTutorial={() => setActiveModal('help')}
              onNavigateToRedacao={() => navigateToModule('redacao_ia', 'redacao')}
              onNavigateToSimulado={() => navigateToModule('simulados_treino', 'simulado_tri')}
            />

            {/* ASSISTENTE GABI IA BANNER CARD */}
            <div
              id="home-gabi-assistant-card"
              className="bg-gradient-to-r from-purple-900/90 via-indigo-950 to-slate-900 rounded-3xl p-5 sm:p-6 text-white border border-purple-500/40 shadow-xl relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5 relative z-10">
                <GabiAvatar size={48} showOnlineStatus={true} statusBadgeSize={10} />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm sm:text-base font-black text-white">Professora Gabi IA</h3>
                    <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-400/30 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Disponível
                    </span>
                  </div>
                  <p className="text-xs text-purple-200/90 font-medium mt-0.5">
                    Tire dúvidas em tempo real, peça explicações sobre matérias ou envie foto de questões para a Professora Gabi.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap sm:flex-nowrap items-start gap-2.5 shrink-0 z-10">
                <div ref={quizMenuRef} className="relative flex flex-col items-center sm:items-start gap-1">
                  <div className="flex items-center gap-1.5">
                    <motion.button
                      id="home-gabi-quick-quiz-button"
                      type="button"
                      initial={{ opacity: 0, x: 60 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      onClick={() => {
                        if (isLongPressTriggeredRef.current) {
                          isLongPressTriggeredRef.current = false;
                          return;
                        }
                        handleStartQuickQuiz('rapido');
                      }}
                      onMouseEnter={() => {
                        if (triHoverTimerRef.current) {
                          clearTimeout(triHoverTimerRef.current);
                        }
                        triHoverTimerRef.current = setTimeout(() => {
                          setIsTriTooltipOpen(true);
                        }, 250);
                      }}
                      onMouseDown={() => {
                        isLongPressTriggeredRef.current = false;
                        longPressTimerRef.current = setTimeout(() => {
                          isLongPressTriggeredRef.current = true;
                          setIsTriTooltipOpen(true);
                        }, 420);
                      }}
                      onMouseUp={() => {
                        if (longPressTimerRef.current) {
                          clearTimeout(longPressTimerRef.current);
                          longPressTimerRef.current = null;
                        }
                      }}
                      onMouseLeave={() => {
                        if (triHoverTimerRef.current) {
                          clearTimeout(triHoverTimerRef.current);
                          triHoverTimerRef.current = null;
                        }
                        if (longPressTimerRef.current) {
                          clearTimeout(longPressTimerRef.current);
                          longPressTimerRef.current = null;
                        }
                        // Allow small buffer before closing tooltip
                        setTimeout(() => {
                          setIsTriTooltipOpen(false);
                        }, 180);
                      }}
                      onTouchStart={() => {
                        isLongPressTriggeredRef.current = false;
                        longPressTimerRef.current = setTimeout(() => {
                          isLongPressTriggeredRef.current = true;
                          setIsTriTooltipOpen(true);
                        }, 420);
                      }}
                      onTouchEnd={() => {
                        if (longPressTimerRef.current) {
                          clearTimeout(longPressTimerRef.current);
                          longPressTimerRef.current = null;
                        }
                      }}
                      onTouchCancel={() => {
                        if (longPressTimerRef.current) {
                          clearTimeout(longPressTimerRef.current);
                          longPressTimerRef.current = null;
                        }
                      }}
                      className="relative overflow-hidden px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/40 hover:scale-105 transition-all duration-300 ease-out cursor-pointer flex items-center gap-1.5 active:scale-95 border border-transparent group select-none animate-subtle-pulse"
                      title={`Quiz Rápido • Passe o mouse ou segure para ver o impacto no cálculo TRI • ${todayQuizzesCount} ${todayQuizzesCount === 1 ? 'quiz completado hoje' : 'quizzes completados hoje'}`}
                    >
                      {/* Soft shimmer streak traversing periodically every 5 seconds */}
                      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                        <div className="w-3/5 h-full bg-gradient-to-r from-transparent via-white/60 to-transparent absolute top-0 left-0 animate-shimmer-5s" />
                      </div>

                      <span className="text-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 z-1">⚡</span>
                      <span className="z-1">Quiz Rápido</span>
                      <span className="z-1 bg-slate-950/15 text-slate-950 font-black text-[10px] px-1.5 py-0.5 rounded-full transition-colors group-hover:bg-slate-950/25 flex items-center gap-0.5" title="Quiz cronometrado com 3 questões adaptativas TRI">
                        <Timer className="w-2.5 h-2.5 inline-block opacity-90 stroke-[2.5]" />
                        <span>3 Qs</span>
                      </span>
                      {/* Subtle TRI Info Indicator */}
                      <span
                        id="home-gabi-quick-quiz-tri-indicator"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsTriTooltipOpen((prev) => !prev);
                        }}
                        className="z-1 text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md bg-slate-950/20 hover:bg-slate-950/35 text-slate-950 border border-slate-950/20 cursor-pointer flex items-center gap-0.5 transition-colors"
                        title="Clique ou passe o mouse para entender a pontuação TRI"
                      >
                        <span>TRI</span>
                      </span>
                      {/* Subtle keyboard shortcut indicator */}
                      <kbd
                        id="home-gabi-quick-quiz-shortcut-badge"
                        className="z-1 hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[9px] font-mono font-black text-slate-950/90 bg-slate-950/15 group-hover:bg-slate-950/25 border border-slate-950/20 rounded-md shadow-2xs transition-colors"
                        title="Atalho global de teclado: pressione 'Q' para iniciar"
                      >
                        <Keyboard className="w-2.5 h-2.5 opacity-80" />
                        <span>Q</span>
                      </kbd>
                      {/* Dynamic daily completed quizzes counter badge from local database */}
                      <span
                        id="home-gabi-today-quizzes-counter"
                        className={`z-1 text-[10px] font-black px-1.5 py-0.5 rounded-full flex items-center gap-1 transition-all ${
                          todayQuizzesCount > 0
                            ? 'bg-emerald-950/25 text-slate-950 border border-emerald-900/30 shadow-xs'
                            : 'bg-slate-950/10 text-slate-950/75'
                        }`}
                        title={`${todayQuizzesCount} ${todayQuizzesCount === 1 ? 'quiz diário concluído hoje' : 'quizzes diários concluídos hoje'} (dados do banco local IndexedDB)`}
                      >
                        {todayQuizzesCount > 0 ? (
                          <>
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 animate-pulse inline-block" />
                            <span>{todayQuizzesCount} {todayQuizzesCount === 1 ? 'feito' : 'feitos'}</span>
                          </>
                        ) : (
                          <span>0 hoje</span>
                        )}
                      </span>
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsQuizMenuOpen((prev) => !prev);
                        }}
                        title="Abrir seleção de modos de quiz"
                        className="z-1 flex items-center justify-center cursor-pointer p-0.5 rounded-md hover:bg-slate-950/10 text-slate-950/80 hover:text-slate-950"
                      >
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${isQuizMenuOpen ? 'rotate-180' : ''}`}
                        />
                      </span>
                    </motion.button>

                    <button
                      id="home-gabi-share-quiz-button"
                      type="button"
                      onClick={handleShareQuizPerformance}
                      className="p-2.5 sm:px-3 sm:py-2.5 rounded-2xl bg-purple-900/80 hover:bg-purple-800 text-purple-200 hover:text-white border border-purple-400/30 hover:border-purple-300 shadow-md shadow-purple-950/40 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 group"
                      title="Compartilhar desempenho no quiz nas redes sociais"
                      aria-label="Compartilhar desempenho do quiz"
                    >
                      <Share2 className="w-3.5 h-3.5 text-purple-300 group-hover:text-white shrink-0" />
                      <span className="text-[11px] font-black hidden xs:inline sm:inline">Compartilhar</span>
                    </button>
                  </div>

                  {/* Dropdown Menu on Long Press */}
                  <AnimatePresence>
                    {isQuizMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 top-full mt-2 w-72 bg-slate-900/95 backdrop-blur-xl border border-purple-500/40 rounded-2xl shadow-2xl p-2 z-50 text-white divide-y divide-slate-800"
                      >
                        <div className="px-3 py-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-extrabold uppercase tracking-wider text-purple-300">Modos de Quiz</span>
                            <span className="text-[9px] bg-purple-500/20 text-purple-200 px-1.5 py-0.5 rounded-md font-semibold border border-purple-400/20">3 Perguntas</span>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-0.5">Selecione o estilo do desafio com a Professora Gabi:</p>
                        </div>

                        <div className="py-1 space-y-1">
                          <button
                            type="button"
                            onClick={() => {
                              setIsQuizMenuOpen(false);
                              handleStartQuickQuiz('rapido');
                            }}
                            className="w-full text-left p-2.5 rounded-xl hover:bg-amber-500/15 border border-transparent hover:border-amber-500/30 transition flex items-start gap-2.5 group cursor-pointer"
                          >
                            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 mt-0.5 font-bold group-hover:scale-110 transition">
                              ⚡
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-black text-amber-300">Quiz Rápido</span>
                                <span className="text-[9px] text-amber-400 font-bold bg-amber-400/10 px-1.5 py-0.2 rounded">Padrão</span>
                              </div>
                              <p className="text-[11px] text-slate-300 leading-tight mt-0.5">Questões interdisciplinares e revisão do tema recente.</p>
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setIsQuizMenuOpen(false);
                              handleStartQuickQuiz('definicoes');
                            }}
                            className="w-full text-left p-2.5 rounded-xl hover:bg-sky-500/15 border border-transparent hover:border-sky-500/30 transition flex items-start gap-2.5 group cursor-pointer"
                          >
                            <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-300 flex items-center justify-center shrink-0 mt-0.5 font-bold group-hover:scale-110 transition">
                              📖
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-black text-sky-300">Quiz de Definições</span>
                                <span className="text-[9px] text-sky-400 font-bold bg-sky-400/10 px-1.5 py-0.2 rounded">Conceitos</span>
                              </div>
                              <p className="text-[11px] text-slate-300 leading-tight mt-0.5">Termos-chave, conceitos teóricos e glossário do ENEM.</p>
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setIsQuizMenuOpen(false);
                              handleStartQuickQuiz('formulas');
                            }}
                            className="w-full text-left p-2.5 rounded-xl hover:bg-emerald-500/15 border border-transparent hover:border-emerald-500/30 transition flex items-start gap-2.5 group cursor-pointer"
                          >
                            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5 font-bold group-hover:scale-110 transition">
                              📐
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-black text-emerald-300">Quiz de Fórmulas</span>
                                <span className="text-[9px] text-emerald-400 font-bold bg-emerald-400/10 px-1.5 py-0.2 rounded">Exatas</span>
                              </div>
                              <p className="text-[11px] text-slate-300 leading-tight mt-0.5">Equações de Física, Química e relações Matemáticas.</p>
                            </div>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* TRI TOOLTIP EXPLICATIVO (HOVER OU TOQUE LONGO) */}
                  <QuickQuizTriTooltip
                    isOpen={isTriTooltipOpen}
                    onClose={() => setIsTriTooltipOpen(false)}
                    onStartQuiz={() => handleStartQuickQuiz('rapido')}
                  />

                  <span className="text-[10px] font-semibold text-amber-200/90 tracking-tight text-center sm:text-left px-1">
                    Desafio rápido (3 perguntas) • {todayQuizzesCount} {todayQuizzesCount === 1 ? 'concluído hoje' : 'concluídos hoje'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveModal('gabi')}
                  className="px-4 py-2.5 rounded-2xl bg-purple-600/60 hover:bg-purple-600 text-white font-black text-xs border border-purple-400/30 shadow-md hover:scale-105 transition cursor-pointer flex items-center gap-1.5 active:scale-95"
                >
                  <span>💬</span>
                  <span>Falar com a Gabi</span>
                </button>
              </div>
            </div>

            {/* METAS DIÁRIAS COM BARRA CIRCULAR */}
            <DailyGoalsWidget
              onNavigateTab={(tab) => {
                if (tab === 'redacao') navigateToModule('redacao_ia', 'redacao');
                else if (tab === 'simulado_tri') navigateToModule('simulados_treino', 'simulado_tri');
                else if (tab === 'modo_foco') setIsPomodoroModalOpen(true);
              }}
            />

            {/* Progress & Stats Card with Recharts Chart */}
            <ProgressStatsCard
              materials={history}
              tutorPlans={tutorPlans}
              eli5Explanations={eli5Explanations}
              studyStreak={studyStreak}
              onOpenCalendar={() => setActiveModal('calendar')}
              onOpenSocialStory={(type, data) => {
                setSocialStoryData({ type, data });
                setActiveModal('social_story');
              }}
            />

            {/* ATALHOS RÁPIDOS DA HOME (QUICK SHORTCUTS GRID) */}
            <div className="space-y-3">
              <h3 className="text-sm font-black uppercase text-slate-400 tracking-wider flex items-center gap-2">
                <span>⚡</span> Atalhos Rápidos da Central
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                <button
                  type="button"
                  onClick={() => navigateToModule('conteudos', 'flashcards')}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 shadow-xs hover:shadow-md transition text-left cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xl mb-2 group-hover:scale-110 transition">
                    📚
                  </div>
                  <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">
                    Biblioteca & Resumos
                  </h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Flashcards e Fichamentos
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => navigateToModule('redacao_ia', 'redacao')}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-rose-500/50 shadow-xs hover:shadow-md transition text-left cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-xl mb-2 group-hover:scale-110 transition">
                    ✍️
                  </div>
                  <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">
                    Redação & IA Gabi
                  </h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Correção ENEM e C5
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => navigateToModule('simulados_treino', 'simulado_tri')}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 shadow-xs hover:shadow-md transition text-left cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xl mb-2 group-hover:scale-110 transition">
                    📝
                  </div>
                  <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">
                    Simulados TRI
                  </h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Provas reais com TRI
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => navigateToModule('simulados_treino', 'corretor_gabarito')}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 shadow-xs hover:shadow-md transition text-left cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xl mb-2 group-hover:scale-110 transition">
                    📸
                  </div>
                  <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">
                    Scanner Gabarito
                  </h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Correção por foto
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => navigateToModule('perfil_gamificacao', 'mascote_xp')}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500/50 shadow-xs hover:shadow-md transition text-left cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-xl mb-2 group-hover:scale-110 transition">
                    🦁
                  </div>
                  <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">
                    Mascote & Níveis XP
                  </h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Evolução do Gabaritão
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveModal('help')}
                  className="p-4 rounded-2xl bg-gradient-to-br from-indigo-900/40 via-slate-900 to-indigo-950 border border-indigo-500/40 hover:border-amber-400 shadow-xs hover:shadow-md transition text-left cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xl mb-2 group-hover:scale-110 transition shadow-inner">
                    💡
                  </div>
                  <h4 className="font-extrabold text-xs text-white">
                    Tutorial Rápido
                  </h4>
                  <p className="text-[10px] text-indigo-200 mt-0.5">
                    Guia da Plataforma
                  </p>
                </button>
              </div>
            </div>

            {/* COMPONENTE DE WIDGET (TELA INICIAL DO CELULAR) */}
            <WidgetSimulationCard
              studyStreak={studyStreak}
              onOpenQuizOfDay={() => setActiveModal('quiz')}
            />

            {/* DICA DO DIA BASEADA NO DESEMPENHO */}
            <PerformanceDailyTipSection
              onActionSelect={(materia, topico, acao) => {
                if (acao === 'flashcards') {
                  handleSummarize(`Estudo e resumo focado no tópico ${topico} de ${materia} para o ENEM.`, topico);
                  navigateToModule('conteudos', 'flashcards');
                } else if (acao === 'cronograma') {
                  handleGenerateTutorPlan(materia, '3º Ano (EM)', `Aprofundar ${topico}`, '45 min');
                  navigateToModule('conteudos', 'cronograma');
                } else if (acao === 'simulado') {
                  navigateToModule('simulados_treino', 'simulado_tri');
                }
              }}
            />

            {/* Popular Topics Section */}
            <PopularTopicsSection
              onSelectTopic={(materia, objetivo) => {
                handleGenerateTutorPlan(materia, '3º Ano (EM)', objetivo, '45 min');
                navigateToModule('conteudos', 'cronograma');
              }}
              onSelectELI5Topic={(duvida) => {
                handleExplainELI5(duvida);
                navigateToModule('conteudos', 'duvidas');
              }}
            />

            {/* Day Night Mode Selector */}
            <DayNightModeSection theme={theme} onToggleTheme={handleToggleTheme} onSetTheme={(t) => setTheme(t)} />
          </div>
        )}

        {/* SECONDARY SCREEN NAVIGATION BAR (FOR CONTEÚDOS, REDAÇÃO, SIMULADOS, PERFIL) */}
        {activePrimaryTab !== 'home' && activePrimaryTab !== 'opcoes_hub' && (
          <div className="space-y-4 animate-in fade-in">
            {/* Header indicator for secondary tabs */}
            <div className="flex items-center justify-between bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-md border border-slate-800">
              <div className="flex items-center space-x-2">
                <span className="text-lg">
                  {activePrimaryTab === 'conteudos' && '📚'}
                  {activePrimaryTab === 'redacao_ia' && '✍️'}
                  {activePrimaryTab === 'simulados_treino' && '📝'}
                  {activePrimaryTab === 'perfil_gamificacao' && '👤'}
                </span>
                <span className="font-extrabold text-xs tracking-wider uppercase text-indigo-300">
                  {activePrimaryTab === 'conteudos' && 'ABA 2: CONTEÚDOS & BIBLIOTECA DIGITAL'}
                  {activePrimaryTab === 'redacao_ia' && 'ABA 3: REDAÇÃO & CENTRAL GABI IA'}
                  {activePrimaryTab === 'simulados_treino' && 'ABA 4: SIMULADOS & TREINO PRÁTICO'}
                  {activePrimaryTab === 'perfil_gamificacao' && 'ABA 5: PERFIL, GAMIFICAÇÃO & RELATÓRIOS'}
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleSelectPrimaryTab('home')}
                className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                ← Voltar para Home
              </button>
            </div>

            {/* Filter Pills Navigation */}
            <NavigationTabs
              abaAtiva={abaAtiva}
              setAbaAtiva={(aba) => setAbaAtiva(aba)}
              primaryTab={activePrimaryTab}
            />

            {/* ABA 3: GABI ASSISTANT PROMINENT BANNER */}
            {activePrimaryTab === 'redacao_ia' && (
              <div
                id="redacao-gabi-assistant-banner"
                className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-purple-900/80 via-slate-900 to-indigo-950 text-white border border-purple-500/40 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in"
              >
                <div className="flex items-center gap-3">
                  <GabiAvatar size={40} />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs sm:text-sm font-black text-white">Dúvida sobre Redação ou Matéria?</h4>
                      <span className="bg-purple-500/30 text-purple-200 text-[9px] font-bold px-2 py-0.5 rounded-full border border-purple-400/30">
                        Professora Gabi
                      </span>
                    </div>
                    <p className="text-[11px] text-purple-200/80 font-medium">
                      Converse diretamente com a Professora Gabi para tirar dúvidas pontuais ou pedir feedback de repertório.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveModal('gabi')}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-md shadow-purple-600/30 hover:scale-105 transition cursor-pointer flex items-center gap-1.5 shrink-0 active:scale-95"
                >
                  <span>💬</span>
                  <span>Falar com a Professora Gabi</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Error notification banner */}
        {error && (
          <div className="p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-2xl flex items-start space-x-3 text-rose-800 dark:text-rose-200 text-xs font-semibold animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-bold text-sm text-rose-900 dark:text-rose-100">Ops! Algo deu errado ao processar.</p>
              <p className="mt-0.5">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-rose-600 dark:text-rose-400 hover:text-rose-900 dark:hover:text-rose-100 font-bold underline text-xs"
            >
              Fechar
            </button>
          </div>
        )}

        {/* ⚡ PLANO PRO MAIN ENGINES SWITCHER BAR & MODULE CONTENT */}
        {activePrimaryTab !== 'home' && activePrimaryTab !== 'opcoes_hub' && (
          <>
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 rounded-3xl border border-amber-500/30 shadow-xl space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
            <div className="flex items-center space-x-2">
              <span className="bg-amber-500 text-slate-950 font-black text-[10px] uppercase px-2.5 py-0.5 rounded-full tracking-wider">
                ⚡ Plano PRO GabaritaAí
              </span>
              <h3 className="text-sm font-extrabold text-white">
                3 Motores Principais de Inteligência Artificial
              </h3>
            </div>
            <p className="text-xs text-slate-300 font-medium">
              Escolha qual motor usar agora para alavancar sua preparação:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            <button
              onClick={() => {
                setAbaAtiva('reels_feed');
                document.getElementById('tab-content-area')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`p-3 rounded-2xl border text-left transition flex items-center justify-between cursor-pointer ${
                abaAtiva === 'reels_feed'
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-black shadow-lg shadow-amber-500/20'
                  : 'bg-indigo-600/30 hover:bg-indigo-600/50 border-indigo-500/40 text-white'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">📱</span>
                <div>
                  <div className="text-xs font-bold">1. Feed Reels</div>
                  <div className="text-[10px] opacity-80">Questões Curtas</div>
                </div>
              </div>
            </button>

            <button
              onClick={() => {
                setAbaAtiva('esquema_redacao');
                document.getElementById('tab-content-area')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`p-3 rounded-2xl border text-left transition flex items-center justify-between cursor-pointer ${
                abaAtiva === 'esquema_redacao'
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-black shadow-lg shadow-amber-500/20'
                  : 'bg-rose-600/30 hover:bg-rose-600/50 border-rose-500/40 text-white'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">✍️</span>
                <div>
                  <div className="text-xs font-bold">2. Canvas Redação</div>
                  <div className="text-[10px] opacity-80">4 Passos Guiados</div>
                </div>
              </div>
            </button>

            <button
              onClick={() => {
                setAbaAtiva('pilulas_conhecimento');
                document.getElementById('tab-content-area')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`p-3 rounded-2xl border text-left transition flex items-center justify-between cursor-pointer ${
                abaAtiva === 'pilulas_conhecimento'
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-black shadow-lg shadow-amber-500/20'
                  : 'bg-amber-600/30 hover:bg-amber-600/50 border-amber-500/40 text-white'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">💡</span>
                <div>
                  <div className="text-xs font-bold">3. Pílulas 30s</div>
                  <div className="text-[10px] opacity-80">Hacks de Estudo</div>
                </div>
              </div>
            </button>

            <button
              onClick={() => {
                setAbaAtiva('redacao');
                document.getElementById('tab-content-area')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`p-3 rounded-2xl border text-left transition flex items-center justify-between cursor-pointer ${
                abaAtiva === 'redacao'
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-black shadow-lg shadow-amber-500/20'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-200'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">📝</span>
                <div>
                  <div className="text-xs font-bold">4. Corretor IA</div>
                  <div className="text-[10px] opacity-80">Nota 0-1000</div>
                </div>
              </div>
            </button>

            <button
              onClick={() => {
                setAbaAtiva('simulado_tri');
                document.getElementById('tab-content-area')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`p-3 rounded-2xl border text-left transition flex items-center justify-between cursor-pointer ${
                abaAtiva === 'simulado_tri'
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-black shadow-lg shadow-amber-500/20'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-200'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">📊</span>
                <div>
                  <div className="text-xs font-bold">5. Simulado TRI</div>
                  <div className="text-[10px] opacity-80">Nota Oficial</div>
                </div>
              </div>
            </button>

            <button
              onClick={() => setIsParentReportOpen(true)}
              className="p-3 rounded-2xl border text-left transition flex items-center justify-between cursor-pointer bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 border-purple-400 text-white font-bold shadow-lg"
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">👨‍👩‍👧</span>
                <div>
                  <div className="text-xs font-black">6. Relatório Pais</div>
                  <div className="text-[10px] opacity-90 text-purple-200">PDF Mensal</div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* MODE TABS CONTENT WITH FRAMER MOTION TRANSITIONS */}
        <div id="tab-content-area" className="scroll-mt-24">
          <AnimatePresence mode="wait">
            {/* MODE 1: RESUMOS & FLASHCARDS */}
            {abaAtiva === 'flashcards' && (
            <motion.div
              key="flashcards"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-8"
            >
              <TextInputSection onSummarize={handleSummarize} isLoading={isLoading} />

              {currentMaterial ? (
                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                      Visualização do Material de Estudo
                    </h2>
                  </div>
                  <BentoResults
                    material={currentMaterial}
                    onNewText={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    onOpenFlashcardsModal={() => setActiveModal('quiz')}
                    onSelectMaterial={(material) => setCurrentMaterial(material)}
                  />
                </section>
              ) : (
                <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 sm:p-12 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/30 dark:shadow-none text-center space-y-4 max-w-2xl mx-auto">
                  <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mx-auto border border-indigo-100 dark:border-indigo-800/80 shadow-sm">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Pronto para transformar seus estudos?
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                    Cole qualquer texto longo ou selecione um dos exemplos acima para gerar instantaneamente o <strong>⚡ Resumo Direto</strong>, os <strong>📌 4 Pontos Principais</strong>, as <strong>📝 3 Perguntas de Teste</strong> e os <strong>🎴 Flashcards Interativos</strong>.
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {/* MODE: BIBLIOTECA & CONTEÚDOS (📚) */}
          {abaAtiva === 'biblioteca' && (
            <motion.div
              key="biblioteca"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <BibliotecaSection
                onAskGabi={(prompt) => {
                  setGabiInitialPrompt(prompt);
                  setActiveModal('gabi');
                }}
                onOpenMindmapTab={() => {
                  setAbaAtiva('mapas_mentais');
                  const contentArea = document.getElementById('tab-content-area');
                  if (contentArea) {
                    contentArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              />
            </motion.div>
          )}

          {/* MODE: FEED REELS DE QUESTÕES */}
          {abaAtiva === 'reels_feed' && (
            <motion.div
              key="reels_feed"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ReelsQuestionFeedSection onAddXp={() => setStudyStreak((s) => s + 1)} />
            </motion.div>
          )}

          {/* MODE: ESQUELETO GUIADO DE REDAÇÃO */}
          {abaAtiva === 'esquema_redacao' && (
            <motion.div
              key="esquema_redacao"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <EssaySkeletonCanvasSection
                onSendToAnalyzer={() => {
                  setAbaAtiva('redacao');
                }}
              />
            </motion.div>
          )}

          {/* MODE: CENTRAL DE PÍLULAS DO CONHECIMENTO */}
          {abaAtiva === 'pilulas_conhecimento' && (
            <motion.div
              key="pilulas_conhecimento"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <KnowledgePillsSection />
            </motion.div>
          )}

          {/* MODE: MODO ÁUDIO & PODCASTS */}
          {abaAtiva === 'audio_podcasts' && (
            <motion.div
              key="audio_podcasts"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <AudioPodcastsSection />
            </motion.div>
          )}

          {/* MODE: TESTE VERBAL FEYNMAN */}
          {abaAtiva === 'feynman_audio' && (
            <motion.div
              key="feynman_audio"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <FeynmanAudioSection />
            </motion.div>
          )}

          {/* MODE: CADERNO DE ERROS AUTOMÁTICO */}
          {abaAtiva === 'caderno_erros' && (
            <motion.div
              key="caderno_erros"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <CadernoDeErrosSection
                onAddXp={() => setStudyStreak((s) => s + 1)}
              />
            </motion.div>
          )}

          {/* MODE: SIMULADO ADAPTATIVO INTELIGENTE */}
          {abaAtiva === 'simulado_adaptativo' && (
            <motion.div
              key="simulado_adaptativo"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <AdaptiveSimuladoSection
                onAddXp={(xp) => setStudyStreak((s) => s + Math.max(1, Math.floor(xp / 50)))}
              />
            </motion.div>
          )}

          {/* MODE: RADAR DE TEMAS QUENTES DE REDAÇÃO */}
          {abaAtiva === 'radar_redacao' && (
            <motion.div
              key="radar_redacao"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <HotEssayRadarSection />
            </motion.div>
          )}

          {/* MODE: GLOSSÁRIO DO EDITAL & CONCEITOS COMPLEXOS */}
          {abaAtiva === 'glossario_enem' && (
            <motion.div
              key="glossario_enem"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <EnemGlossarySection />
            </motion.div>
          )}

          {/* MODE: ESTATÍSTICAS DE ESTUDO & GRÁFICOS RECHARTS */}
          {abaAtiva === 'estatisticas_estudo' && (
            <motion.div
              key="estatisticas_estudo"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <StudyStatisticsSection />
            </motion.div>
          )}

          {/* MODE: GERENCIADOR DE REVISÃO ESPAÇADA LEITNER */}
          {abaAtiva === 'revisao_leitner' && (
            <motion.div
              key="revisao_leitner"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <LeitnerSpacedRepetitionSection
                onAddXp={(xp) => setStudyStreak((s) => s + Math.max(1, Math.floor(xp / 50)))}
              />
            </motion.div>
          )}

          {/* MODE: MODO ECONOMIA & DOWNLOADS OFFLINE */}
          {abaAtiva === 'modo_economia' && (
            <motion.div
              key="modo_economia"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <DataSaverOfflineSection />
            </motion.div>
          )}

          {/* MODE: MASCOTE EVOLUTIVO E SISTEMA DE XP */}
          {abaAtiva === 'mascote_xp' && (
            <motion.div
              key="mascote_xp"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <MascotEvolutivoSection
                userXp={750}
                studyStreak={studyStreak}
                onOpenSocialStory={(type, data) => {
                  setSocialStoryData({ type, data });
                  setActiveModal('social_story');
                }}
              />
            </motion.div>
          )}

          {/* MODE: GERADOR DE FOLHA DE VÉSPERA (CHEAT SHEET) */}
          {abaAtiva === 'folha_vespera' && (
            <motion.div
              key="folha_vespera"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <CheatSheetGeneratorSection />
            </motion.div>
          )}

          {/* MODE: MODO ADVOGADO DO DIABO (DEBATE DE REDAÇÃO) */}
          {abaAtiva === 'advogado_diabo' && (
            <motion.div
              key="advogado_diabo"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <DevilAdvocateSection />
            </motion.div>
          )}

          {/* MODE: GERADOR AUTOMÁTICO DE FLASHCARDS POR CONTEÚDO OU FOTO */}
          {abaAtiva === 'auto_flashcards' && (
            <motion.div
              key="auto_flashcards"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <AutoFlashcardsSection onAddXp={(xp) => setStudyStreak((s) => s + 1)} />
            </motion.div>
          )}

          {/* MODE: DETECTOR DE ELEMENTOS DA PROPOSTA DE INTERVENÇÃO (C5 REDAÇÃO) */}
          {abaAtiva === 'c5_intervencao' && (
            <motion.div
              key="c5_intervencao"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <C5InterventionDetectorSection />
            </motion.div>
          )}

          {/* MODE: PLANNER DE ROTINA E CRONOGRAMA SEMANAL */}
          {abaAtiva === 'planner_rotina' && (
            <motion.div
              key="planner_rotina"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <WeeklyRoutinePlannerSection />
            </motion.div>
          )}

          {/* MODE: GUIA DE ESTRATÉGIA DE PROVA E CHUTE MATEMÁTICO */}
          {abaAtiva === 'estratégia_chute' && (
            <motion.div
              key="estratégia_chute"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <TestStrategyGabaritoSection />
            </motion.div>
          )}

          {/* MODE: CORRETOR VISUAL DE CARTÃO-RESPOSTA FÍSICO */}
          {abaAtiva === 'corretor_gabarito' && (
            <motion.div
              key="corretor_gabarito"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <OpticalAnswerSheetScannerSection />
            </motion.div>
          )}

          {/* MODE: SIMULADOR DE AMBIENTE E SOM DE PROVA */}
          {abaAtiva === 'som_ambiente' && (
            <motion.div
              key="som_ambiente"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ExamAmbientSoundPlayer />
            </motion.div>
          )}

          {/* MODE: MODO RETA FINAL (PLANO DE EMERGÊNCIA 30 DIAS PARETO) */}
          {abaAtiva === 'reta_final' && (
            <motion.div
              key="reta_final"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <EmergencyFinal30DaysSection />
            </motion.div>
          )}

          {/* MODE: CATÁLOGO DO EDITAL E DISCIPLINAS */}
          {abaAtiva === 'catalogo' && (
            <motion.div
              key="catalogo"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <SubjectCatalogSection
                onSelectTopicAction={(materia, topicoNome, acao) => {
                  if (acao === 'flashcard') {
                    handleSummarize(`Estudo focado no tópico ${topicoNome} de ${materia} para o ENEM.`, topicoNome);
                    setAbaAtiva('flashcards');
                  } else if (acao === 'duvida') {
                    setAbaAtiva('duvidas');
                  } else if (acao === 'simulado') {
                    setAbaAtiva('simulado_tri');
                  }
                }}
              />
            </motion.div>
          )}

          {/* MODE: SIMULADOR DE SISU E NOTA DE CORTE */}
          {abaAtiva === 'sisu_simulator' && (
            <motion.div
              key="sisu_simulator"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <SisuSimulatorSection
                onGoToStudy={(materia) => {
                  setAbaAtiva('flashcards');
                  handleSummarize(`Revisão e estudo intensivo da matéria ${materia} para elevar a pontuação no SISU.`, materia);
                }}
              />
            </motion.div>
          )}

          {/* MODE: GERADOR DE MAPAS MENTAIS */}
          {abaAtiva === 'mapas_mentais' && (
            <motion.div
              key="mapas_mentais"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <MindmapGeneratorSection
                onStudyTopic={(materia, topico) => {
                  setAbaAtiva('flashcards');
                  handleSummarize(`Estudo e resumo do mapa mental do tópico ${topico} de ${materia}.`, topico);
                }}
              />
            </motion.div>
          )}

          {/* MODE: MODO FOCO POMODORO GAMIFICADO */}
          {abaAtiva === 'modo_foco' && (
            <motion.div
              key="modo_foco"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <PomodoroFocusSection
                onAddXp={(amount) => {
                  // Add bonus XP to streak/level
                  setStudyStreak((s) => s + 1);
                }}
              />
            </motion.div>
          )}

          {/* MODE 2: COACH & CRONOGRAMA INTELIGENTE */}
          {abaAtiva === 'cronograma' && (
            <motion.div
              key="cronograma"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-8"
            >
              <CronogramaInteligenteSection />
              <TutorPlanSection
                onGeneratePlan={handleGenerateTutorPlan}
                isLoading={isTutorLoading}
                currentPlan={currentTutorPlan}
              />
            </motion.div>
          )}

          {/* MODE: BANCO DE REPERTÓRIOS CORINGA */}
          {abaAtiva === 'repertorio' && (
            <motion.div
              key="repertorio"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <RepertoriosCoringaSection />
            </motion.div>
          )}

          {/* MODE: SIMULADO AULÃO DE DOMINGO (AO VIVO) */}
          {abaAtiva === 'aulao_domingo' && (
            <motion.div
              key="aulao_domingo"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <AulaODomingoSection />
            </motion.div>
          )}

          {/* MODE 3: SCANNER TIRA-DÚVIDAS 3 PASSOS & ELI5 */}
          {abaAtiva === 'duvidas' && (
            <motion.div
              key="duvidas"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-8"
            >
              <QuestionScannerSection />
              <ELI5Section
                onExplain={handleExplainELI5}
                isLoading={isELI5Loading}
                explanation={currentELI5Explanation}
              />
            </motion.div>
          )}

          {/* MODE 4: ANÁLISE DE REDAÇÃO ENEM & COESÃO */}
          {abaAtiva === 'redacao' && (
            <motion.div
              key="redacao"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <EssayAnalyzerSection />
            </motion.div>
          )}

          {/* MODE 5: SIMULADO TRI COM NOTA ESTIMADA */}
          {abaAtiva === 'simulado_tri' && (
            <motion.div
              key="simulado_tri"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <SimuladoTriSection />
            </motion.div>
          )}

          {/* MODE 5: RANKING SEMANAL DE ESTUDANTES */}
          {abaAtiva === 'ranking' && (
            <motion.div
              key="ranking"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <WeeklyRankingSection onStudyClick={() => setAbaAtiva('cronograma')} />
            </motion.div>
          )}

          {/* MODE: ARENA X1 (DUELOS & QUIZZES COMPETITIVOS ⚔️) */}
          {(abaAtiva === 'arena_x1' || abaAtiva === 'desafios' || activePrimaryTab === 'arena') && (
            <motion.div
              key="arena_x1"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ArenaX1Section
                onAddXP={(xp) => {
                  setStudyStreak((s) => s + 1);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </>
    )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 mt-12 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium text-slate-600 dark:text-slate-300">Assistente e Tutor Inteligente de Estudos</span>
          </div>
          <p className="text-slate-400 dark:text-slate-500">
            Resumos instantâneos • Cronograma de Estudos • Flashcards • Explicação ELI5
          </p>
        </div>
      </footer>


      {/* Modals */}
      {activeModal === 'history' && (
        <HistoryModal
          materials={history}
          tutorPlans={tutorPlans}
          eli5Explanations={eli5Explanations}
          onSelectMaterial={(mat) => {
            setAbaAtiva('flashcards');
            setCurrentMaterial(mat);
          }}
          onSelectTutorPlan={(plan) => {
            setAbaAtiva('cronograma');
            setCurrentTutorPlan(plan);
          }}
          onSelectELI5={(exp) => {
            setAbaAtiva('duvidas');
            setCurrentELI5Explanation(exp);
          }}
          onDeleteMaterial={handleDeleteMaterial}
          onDeleteTutorPlan={handleDeleteTutorPlan}
          onDeleteELI5={handleDeleteELI5}
          onClearHistory={handleClearHistory}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'help' && (
        <HowItWorksModal
          onClose={() => setActiveModal(null)}
          onNavigateModule={(primaryTab, subTool) => {
            setActiveModal(null);
            navigateToModule(primaryTab as PrimaryTab, subTool as AbaAtiva);
          }}
        />
      )}

      {activeModal === 'quiz' && currentMaterial && (
        <InteractiveQuizModal
          material={currentMaterial}
          onClose={() => {
            refreshTodayQuizzesCount();
            setActiveModal(null);
          }}
          onCompleted={() => {
            refreshTodayQuizzesCount();
          }}
          onShare={(score, total, topic) => {
            setSocialStoryData({
              type: 'quiz',
              data: {
                quizScore: score,
                quizTotal: total,
                quizTopic: topic || currentMaterial.title,
                quizPercent: Math.round((score / total) * 100),
                streakDays: studyStreak,
                courseTarget: getSavedUserProfile()?.targetCourse || 'Medicina / Federal',
              },
            });
            setActiveModal('social_story');
          }}
        />
      )}

      {activeModal === 'gabi' && (
        <GabiAssistantModal
          initialPrompt={gabiInitialPrompt}
          onClose={() => {
            setGabiInitialPrompt(null);
            setActiveModal(null);
          }}
          onNavigateShortcut={(atalho) => {
            if (atalho === 'tela_assinatura') {
              setActiveModal('pro');
            } else if (atalho === 'tela_perfil') {
              setActiveModal('profile');
            }
          }}
        />
      )}

      {activeModal === 'pro' && (
        <ProSubscriptionModal onClose={() => setActiveModal(null)} />
      )}

      {activeModal === 'profile' && (
        <ProfileSettingsModal
          onClose={() => {
            setUserProfile(getSavedUserProfile());
            setActiveModal(null);
          }}
          studyStreak={studyStreak}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          onOpenOnboarding={() => setActiveModal('onboarding')}
          onLogout={() => {
            setActiveModal(null);
          }}
        />
      )}

      {activeModal === 'onboarding' && (
        <OnboardingModal
          onClose={() => setActiveModal(null)}
          onOpenProfile={() => setActiveModal('profile')}
          onSaveProfile={(updatedProfile) => {
            setUserProfile(updatedProfile);
          }}
        />
      )}

      {activeModal === 'flashcards' && (
        <FlashcardGeneratorModal onClose={() => setActiveModal(null)} />
      )}

      {activeModal === 'calendar' && (
        <StudyCalendarModal
          studyStreak={studyStreak}
          onUpdateStreak={(newStreak) => {
            setStudyStreak(newStreak);
            try {
              localStorage.setItem(STREAK_KEY, newStreak.toString());
            } catch (e) {
              console.error('Erro ao salvar streak no localStorage:', e);
            }
          }}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'printable_sheet' && (
        <EnemPrintableSheetModal onClose={() => setActiveModal(null)} />
      )}

      {activeModal === 'social_story' && (
        <SocialShareStoryModal
          type={socialStoryData.type}
          data={socialStoryData.data}
          onClose={() => setActiveModal(null)}
        />
      )}

      {/* Auto-opening Daily Study Tip Modal */}
      <DailyStudyTipModal />

      {/* Parent Performance Report Modal */}
      {isParentReportOpen && (
        <ParentPerformanceReportModal
          onClose={() => setIsParentReportOpen(false)}
          studyStreak={studyStreak}
        />
      )}

      {/* Banca Personality Selector Modal */}
      <BancaPersonalitySelectorModal
        isOpen={isBancaModalOpen}
        onClose={() => setIsBancaModalOpen(false)}
      />

      {/* Floating Pomodoro Focus Modal */}
      {isPomodoroModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-2xl p-6 relative border border-slate-200 dark:border-slate-800 shadow-2xl my-8">
            <button
              type="button"
              onClick={() => setIsPomodoroModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white p-2 rounded-full bg-slate-100 dark:bg-slate-800 font-bold text-xs cursor-pointer z-10"
            >
              ✕ Fechar
            </button>
            <PomodoroFocusSection
              onAddXp={() => {
                setStudyStreak((s) => s + 1);
              }}
            />
          </div>
        </div>
      )}

      {/* FLOATING ACTION BUTTON (FAB) & INTERACTIVE HOVER MENU */}
      <div
        style={{ bottom: '100px' }}
        className="fixed right-4 sm:right-6 z-[99999] pointer-events-auto flex flex-col items-end group"
        onMouseEnter={() => setIsGabiQuickMenuOpen(true)}
        onMouseLeave={() => setIsGabiQuickMenuOpen(false)}
        onFocus={() => setIsGabiQuickMenuOpen(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setIsGabiQuickMenuOpen(false);
          }
        }}
      >
        {/* INTERACTIVE HOVER TOOLTIP / DROPDOWN MENU WITH FRAMER MOTION SLIDE-UP */}
        <AnimatePresence>
          {isGabiQuickMenuOpen && (
            <motion.div
              id="floating-gabi-quick-actions-menu"
              key="floating-gabi-quick-actions-menu"
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{
                duration: 0.28,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mb-3 w-[calc(100vw-2rem)] max-w-xs sm:w-[420px] bg-slate-900/98 dark:bg-slate-900/98 backdrop-blur-xl border border-slate-700/70 rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 shadow-2xl shadow-black/80 text-white z-[100000] origin-bottom-right"
              role="menu"
              aria-label="Ações rápidas da Gabi IA"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <GabiAvatar size={32} showOnlineStatus={false} />
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-white tracking-tight">
                      Professora Gabi ✨
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      Ações Rápidas de Estudo
                    </span>
                  </div>
                </div>
                <span className="text-[9px] bg-emerald-500/20 text-emerald-300 font-extrabold px-2 py-0.5 rounded-full border border-emerald-400/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online
                </span>
              </div>

              {/* Quick Action Grid: Strictly 1 Column on Mobile (< 640px), 2 Columns on Desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                <button
                  id="quick-action-summarize"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setGabiInitialPrompt(
                      `Gabi, por favor faça um resumo didático dos principais pontos, fórmulas e conceitos desta área de estudos (${activePrimaryTab}).`
                    );
                    setActiveModal('gabi');
                    setIsGabiQuickMenuOpen(false);
                  }}
                  className="w-full text-left sm:text-center p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-800/80 hover:bg-indigo-950/80 border border-slate-700/60 hover:border-indigo-400/60 transition-all duration-200 ease-out flex flex-row sm:flex-col items-center sm:justify-center gap-3 sm:gap-2 text-xs text-slate-200 hover:text-white cursor-pointer hover:scale-[1.01] active:scale-[0.98] origin-center shadow-xs hover:shadow-md hover:shadow-indigo-950/40 group/item"
                >
                  <div className="w-10 h-10 sm:w-10 sm:h-10 rounded-xl bg-indigo-500/15 group-hover/item:bg-indigo-500/25 border border-indigo-400/25 flex items-center justify-center text-lg sm:text-xl shrink-0 group-hover/item:scale-110 transition-transform">
                    📄
                  </div>
                  <div className="flex flex-col min-w-0 sm:items-center">
                    <span className="font-black text-white text-xs sm:text-[13px] leading-tight">
                      Resumir Página
                    </span>
                    <span className="text-[10px] text-slate-300 sm:text-slate-400 group-hover/item:text-slate-200 font-medium mt-0.5 leading-tight line-clamp-2">
                      Síntese dos tópicos atuais
                    </span>
                  </div>
                </button>

                <button
                  id="quick-action-explain"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setGabiInitialPrompt(
                      'Gabi, pode me explicar um conceito complexo de forma simples, com analogias práticas e macetes para o ENEM?'
                    );
                    setActiveModal('gabi');
                    setIsGabiQuickMenuOpen(false);
                  }}
                  className="w-full text-left sm:text-center p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-800/80 hover:bg-indigo-950/80 border border-slate-700/60 hover:border-indigo-400/60 transition-all duration-200 ease-out flex flex-row sm:flex-col items-center sm:justify-center gap-3 sm:gap-2 text-xs text-slate-200 hover:text-white cursor-pointer hover:scale-[1.01] active:scale-[0.98] origin-center shadow-xs hover:shadow-md hover:shadow-indigo-950/40 group/item"
                >
                  <div className="w-10 h-10 sm:w-10 sm:h-10 rounded-xl bg-indigo-500/15 group-hover/item:bg-indigo-500/25 border border-indigo-400/25 flex items-center justify-center text-lg sm:text-xl shrink-0 group-hover/item:scale-110 transition-transform">
                    🧠
                  </div>
                  <div className="flex flex-col min-w-0 sm:items-center">
                    <span className="font-black text-white text-xs sm:text-[13px] leading-tight">
                      Explicar Conceito
                    </span>
                    <span className="text-[10px] text-slate-300 sm:text-slate-400 group-hover/item:text-slate-200 font-medium mt-0.5 leading-tight line-clamp-2">
                      Didática e analogias simples
                    </span>
                  </div>
                </button>

                <button
                  id="quick-action-doubt"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setGabiInitialPrompt(
                      'Gabi, tenho uma dúvida rápida sobre os estudos e exercícios. Pode me ajudar?'
                    );
                    setActiveModal('gabi');
                    setIsGabiQuickMenuOpen(false);
                  }}
                  className="w-full text-left sm:text-center p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-800/80 hover:bg-indigo-950/80 border border-slate-700/60 hover:border-indigo-400/60 transition-all duration-200 ease-out flex flex-row sm:flex-col items-center sm:justify-center gap-3 sm:gap-2 text-xs text-slate-200 hover:text-white cursor-pointer hover:scale-[1.01] active:scale-[0.98] origin-center shadow-xs hover:shadow-md hover:shadow-indigo-950/40 group/item"
                >
                  <div className="w-10 h-10 sm:w-10 sm:h-10 rounded-xl bg-indigo-500/15 group-hover/item:bg-indigo-500/25 border border-indigo-400/25 flex items-center justify-center text-lg sm:text-xl shrink-0 group-hover/item:scale-110 transition-transform">
                    ⚡
                  </div>
                  <div className="flex flex-col min-w-0 sm:items-center">
                    <span className="font-black text-white text-xs sm:text-[13px] leading-tight">
                      Dúvida Rápida
                    </span>
                    <span className="text-[10px] text-slate-300 sm:text-slate-400 group-hover/item:text-slate-200 font-medium mt-0.5 leading-tight line-clamp-2">
                      Pergunta instantânea
                    </span>
                  </div>
                </button>

                <button
                  id="quick-action-quiz"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setGabiInitialPrompt(
                      'Gabi, pode gerar 3 questões inéditas no padrão ENEM/Vestibulares com gabarito comentado para eu treinar agora?'
                    );
                    setActiveModal('gabi');
                    setIsGabiQuickMenuOpen(false);
                  }}
                  className="w-full text-left sm:text-center p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-800/80 hover:bg-indigo-950/80 border border-slate-700/60 hover:border-indigo-400/60 transition-all duration-200 ease-out flex flex-row sm:flex-col items-center sm:justify-center gap-3 sm:gap-2 text-xs text-slate-200 hover:text-white cursor-pointer hover:scale-[1.01] active:scale-[0.98] origin-center shadow-xs hover:shadow-md hover:shadow-indigo-950/40 group/item"
                >
                  <div className="w-10 h-10 sm:w-10 sm:h-10 rounded-xl bg-indigo-500/15 group-hover/item:bg-indigo-500/25 border border-indigo-400/25 flex items-center justify-center text-lg sm:text-xl shrink-0 group-hover/item:scale-110 transition-transform">
                    🎯
                  </div>
                  <div className="flex flex-col min-w-0 sm:items-center">
                    <span className="font-black text-white text-xs sm:text-[13px] leading-tight">
                      Treinar Questões
                    </span>
                    <span className="text-[10px] text-slate-300 sm:text-slate-400 group-hover/item:text-slate-200 font-medium mt-0.5 leading-tight line-clamp-2">
                      Mini quiz rápido com a Gabi
                    </span>
                  </div>
                </button>
              </div>

              {/* Footer with shortcut info */}
              <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                <span>Atalho rápido:</span>
                <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-[9px] font-mono text-slate-300">
                  Alt + G
                </kbd>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FLOATING ACTION BUTTON */}
        <button
          id="floating-gabi-assistant-button"
          type="button"
          onClick={() => {
            setGabiInitialPrompt(null);
            setActiveModal((prev) => (prev === 'gabi' ? null : 'gabi'));
            setUnreadStudyRemindersCount(0);
            try {
              localStorage.setItem('gabi_study_reminder_viewed_date', new Date().toDateString());
            } catch (e) {
              console.error(e);
            }
          }}
          style={{ gap: '8px' }}
          className="flex items-center px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 hover:from-indigo-500 hover:to-purple-600 text-white font-black text-xs sm:text-sm shadow-xl shadow-black/40 border border-indigo-400/40 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer animate-in fade-in slide-in-from-bottom-5"
          title="Abrir Central Gabi IA - Tutora e Assistente Virtual (Atalho: Alt + G ou Ctrl + G)"
          aria-label="Falar com a Gabi IA (Atalho: Alt + G ou Ctrl + G)"
        >
          <div className="relative flex items-center justify-center shrink-0">
            <GabiAvatar
              size={36}
              showOnlineStatus={true}
              statusBadgeSize={8}
              alt="Gabi IA"
            />

            {/* Red Notification Counter Badge for Pending Study Reminders */}
            {unreadStudyRemindersCount > 0 && (
              <span
                id="gabi-study-reminder-badge"
                className="absolute -top-1.5 -right-1.5 min-w-4 h-4 px-1 rounded-full bg-rose-600 text-white text-[9px] font-black flex items-center justify-center border-2 border-slate-900 shadow-md animate-bounce"
                title={`${unreadStudyRemindersCount} lembrete de estudo pendente`}
              >
                {unreadStudyRemindersCount}
              </span>
            )}
          </div>
          <span className="tracking-tight text-white drop-shadow-xs font-black text-xs sm:text-sm pr-0.5 whitespace-nowrap">
            Gabi IA
          </span>
        </button>
      </div>

      {/* FIXED BOTTOM NAVIGATION BAR */}
      <BottomNavigationBar
        activePrimaryTab={activePrimaryTab}
        onSelectPrimaryTab={handleSelectPrimaryTab}
      />
    </div>
  );
}
