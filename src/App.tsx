import React, { useState, useEffect, useMemo, useRef, Suspense, lazy } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  PenTool, 
  HelpCircle, 
  Settings, 
  Award, 
  Clock, 
  CheckCircle2, 
  Flame, 
  Search,
  Bot,
  BrainCircuit,
  Volume2,
  VolumeX,
  Play,
  RotateCcw,
  RefreshCw,
  Bell,
  Menu,
  X,
  GraduationCap,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Sliders,
  Maximize2,
  Minimize2,
  Radio,
  Zap,
  Target,
  Swords,
  Smartphone,
  Calendar,
  Eye,
  Info,
  Layers,
  MapPin,
  FileCheck,
  AlertTriangle,
  Download,
  Share2
} from 'lucide-react';
import { StudySchedule, Flashcard, EssayFeedback, AppSettings, SimuladoExam, QuestionFeedback } from './types';
import { getStoredSchedule, saveSchedule, getStoredSettings, saveSettings } from './utils/db';
import { playSound } from './utils/audio';
import { AMBIENT_SOUNDS, AmbientSoundType, playAmbientSound, stopAmbientSound, setAmbientVolume } from './utils/ambientAudio';
import { exportSummaryToPDF } from './utils/pdfExport';
import { StudyPlannerSection } from './components/StudyPlannerSection';
import { SubjectCatalogSection } from './components/SubjectCatalogSection';
import { EssayLabSection } from './components/EssayLabSection';
import { QuickDoubtSection } from './components/QuickDoubtSection';
import { PerformanceDailyTipSection } from './components/PerformanceDailyTipSection';
import { DailyPersonalizedKnowledgePillSection } from './components/DailyPersonalizedKnowledgePillSection';
import { HeaderGlobalSearch } from './components/HeaderGlobalSearch';
import { DigitalLibrarySection } from './components/DigitalLibrarySection';
import { MindmapGeneratorSection } from './components/MindmapGeneratorSection';
import { WeeklyGoalProgressWidget } from './components/WeeklyGoalProgressWidget';
import { FloatingPomodoroMiniWidget } from './components/FloatingPomodoroMiniWidget';
import { NotificationCenterModal } from './components/NotificationCenterModal';
import { FlashcardsSection } from './components/FlashcardsSection';
import { SimuladoSection } from './components/SimuladoSection';
import { DiagnosticTestSection } from './components/DiagnosticTestSection';
import { StudyMethodologySection } from './components/StudyMethodologySection';

// Lazy loaded feature sections
const QuizBattleSection = lazy(() => import('./components/QuizBattleSection').then(m => ({ default: m.QuizBattleSection })));
const ArenaX1Section = lazy(() => import('./components/ArenaX1Section').then(m => ({ default: m.ArenaX1Section })));
const ReelsQuestionFeedSection = lazy(() => import('./components/ReelsQuestionFeedSection').then(m => ({ default: m.ReelsQuestionFeedSection })));
const ExamCountdownSection = lazy(() => import('./components/ExamCountdownSection').then(m => ({ default: m.ExamCountdownSection })));
const SisuSimulatorSection = lazy(() => import('./components/SisuSimulatorSection').then(m => ({ default: m.SisuSimulatorSection })));
const RedacaoNota1000Section = lazy(() => import('./components/RedacaoNota1000Section').then(m => ({ default: m.RedacaoNota1000Section })));
const TriScoreCalculatorSection = lazy(() => import('./components/TriScoreCalculatorSection').then(m => ({ default: m.TriScoreCalculatorSection })));
const StudyGroupRoomsSection = lazy(() => import('./components/StudyGroupRoomsSection').then(m => ({ default: m.StudyGroupRoomsSection })));
const GamifiedAchievementsModal = lazy(() => import('./components/GamifiedAchievementsModal').then(m => ({ default: m.GamifiedAchievementsModal })));
const KeyboardShortcutsModal = lazy(() => import('./components/KeyboardShortcutsModal').then(m => ({ default: m.KeyboardShortcutsModal })));
const SettingsModal = lazy(() => import('./components/SettingsModal').then(m => ({ default: m.SettingsModal })));

export function App() {
  const [activeTab, setActiveTab] = useState<'planner' | 'catalog' | 'essay' | 'doubt' | 'flashcards' | 'simulado' | 'diagnostic' | 'library' | 'mindmap' | 'quiz_battle' | 'arena_x1' | 'reels' | 'countdown' | 'sisu' | 'redacao_modelos' | 'tri' | 'study_rooms' | 'methodology'>('planner');
  const [schedule, setSchedule] = useState<StudySchedule | null>(null);
  const [settings, setSettings] = useState<AppSettings>({
    geminiApiKey: '',
    soundEnabled: true,
    hapticsEnabled: true,
    dailyGoalHours: 4,
    theme: 'dark'
  });
  
  // Pomodoro timer state
  const [pomodoroMinutes, setPomodoroMinutes] = useState(25);
  const [pomodoroSeconds, setPomodoroSeconds] = useState(0);
  const [isPomodoroRunning, setIsPomodoroRunning] = useState(false);
  const [pomodoroMode, setPomodoroMode] = useState<'focus' | 'short_break' | 'long_break'>('focus');
  const [pomodoroCyclesCompleted, setPomodoroCyclesCompleted] = useState(0);
  const [isMiniPomodoroOpen, setIsMiniPomodoroOpen] = useState(false);
  
  // Ambient Sound state
  const [currentAmbientSound, setCurrentAmbientSound] = useState<AmbientSoundType>('none');
  const [ambientVolume, setAmbientVolumeState] = useState(0.5);
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false);
  const [isAmbientMenuOpen, setIsAmbientMenuOpen] = useState(false);
  
  // Modals & Floating Tools
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [streakDays, setStreakDays] = useState(7);
  const [userLevel, setUserLevel] = useState(12);
  const [userXp, setUserXp] = useState(2850);
  const [userXpNextLevel, setUserXpNextLevel] = useState(3500);

  // Load initial data
  useEffect(() => {
    async function loadData() {
      const storedSched = await getStoredSchedule();
      if (storedSched) setSchedule(storedSched);

      const storedSet = await getStoredSettings();
      if (storedSet) setSettings(storedSet);

      const storedStreak = localStorage.getItem('gabaritai_streak_days');
      if (storedStreak) setStreakDays(parseInt(storedStreak, 10));

      const storedXp = localStorage.getItem('gabaritai_user_xp');
      if (storedXp) {
        const xp = parseInt(storedXp, 10);
        setUserXp(xp);
        const lvl = Math.floor(xp / 250) + 1;
        setUserLevel(lvl);
        setUserXpNextLevel((lvl) * 250);
      }
    }
    loadData();
  }, []);

  // Keyboard shortcut listener (? for shortcuts, p for pomodoro, etc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        setIsShortcutsOpen(prev => !prev);
      } else if (e.altKey && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        setIsPomodoroRunning(prev => !prev);
      } else if (e.altKey && (e.key === '1')) {
        e.preventDefault();
        setActiveTab('planner');
      } else if (e.altKey && (e.key === '2')) {
        e.preventDefault();
        setActiveTab('simulado');
      } else if (e.altKey && (e.key === '3')) {
        e.preventDefault();
        setActiveTab('essay');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Pomodoro countdown timer effect
  useEffect(() => {
    let interval: any = null;
    if (isPomodoroRunning) {
      interval = setInterval(() => {
        if (pomodoroSeconds > 0) {
          setPomodoroSeconds(prev => prev - 1);
        } else if (pomodoroMinutes > 0) {
          setPomodoroMinutes(prev => prev - 1);
          setPomodoroSeconds(59);
        } else {
          // Timer finished
          if (settings.soundEnabled) playSound('victory');
          if (pomodoroMode === 'focus') {
            const nextCycles = pomodoroCyclesCompleted + 1;
            setPomodoroCyclesCompleted(nextCycles);
            addXp(50);
            if (nextCycles % 4 === 0) {
              setPomodoroMode('long_break');
              setPomodoroMinutes(15);
            } else {
              setPomodoroMode('short_break');
              setPomodoroMinutes(5);
            }
          } else {
            setPomodoroMode('focus');
            setPomodoroMinutes(25);
          }
          setIsPomodoroRunning(false);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPomodoroRunning, pomodoroMinutes, pomodoroSeconds, pomodoroMode, pomodoroCyclesCompleted, settings.soundEnabled]);

  const addXp = (amount: number) => {
    setUserXp(prev => {
      const nextXp = prev + amount;
      localStorage.setItem('gabaritai_user_xp', nextXp.toString());
      const nextLvl = Math.floor(nextXp / 250) + 1;
      if (nextLvl > userLevel) {
        setUserLevel(nextLvl);
        setUserXpNextLevel(nextLvl * 250);
        if (settings.soundEnabled) playSound('achievement');
      }
      return nextXp;
    });
  };

  const handleSelectTopicFromSearch = (topicName: string, areaName?: string) => {
    setActiveTab('catalog');
  };

  const handleToggleAmbient = (sound: AmbientSoundType) => {
    if (currentAmbientSound === sound && isAmbientPlaying) {
      stopAmbientSound();
      setIsAmbientPlaying(false);
      setCurrentAmbientSound('none');
    } else {
      stopAmbientSound();
      playAmbientSound(sound, ambientVolume);
      setCurrentAmbientSound(sound);
      setIsAmbientPlaying(true);
    }
  };

  const handleAmbientVolumeChange = (vol: number) => {
    setAmbientVolumeState(vol);
    setAmbientVolume(vol);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white font-sans antialiased">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveTab('planner')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-lg text-white tracking-tight">Gabarit<span className="text-indigo-400">AI</span></span>
                  <span className="text-[10px] uppercase font-black bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded border border-indigo-500/30">ENEM 2026</span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium">Sua aprovação com Inteligência Artificial</p>
              </div>
            </button>
          </div>

          {/* Central Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <HeaderGlobalSearch onSelectTopic={handleSelectTopicFromSearch} />
          </div>

          {/* Right Action Widgets */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Gamified Streak & XP */}
            <button 
              onClick={() => setIsAchievementsOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 hover:border-amber-500/50 hover:bg-slate-800 transition-all text-xs font-semibold text-amber-300"
              title="Ver Conquistas e Nível"
            >
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400/20 animate-pulse" />
              <span>{streakDays} dias</span>
              <span className="text-slate-600">|</span>
              <span className="text-indigo-300">Nv. {userLevel}</span>
            </button>

            {/* Ambient Sound Selector */}
            <div className="relative">
              <button 
                onClick={() => setIsAmbientMenuOpen(prev => !prev)}
                className={`p-2 rounded-lg border transition-all text-xs flex items-center gap-1.5 ${
                  isAmbientPlaying 
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400' 
                    : 'bg-slate-800/80 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                }`}
                title="Sons de Foco e Ruído Branco"
              >
                {isAmbientPlaying ? (
                  <>
                    <Volume2 className="w-4 h-4 animate-bounce text-emerald-400" />
                    <span className="hidden sm:inline capitalize text-[11px]">{currentAmbientSound}</span>
                  </>
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
              </button>

              {/* Ambient Sound Dropdown */}
              {isAmbientMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 p-3 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                    <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <Radio className="w-3.5 h-3.5 text-indigo-400" /> Sons para Concentração
                    </span>
                    {isAmbientPlaying && (
                      <button 
                        onClick={() => handleToggleAmbient(currentAmbientSound)}
                        className="text-[10px] text-rose-400 hover:underline"
                      >
                        Parar Som
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 mb-3">
                    {AMBIENT_SOUNDS.map(sound => (
                      <button
                        key={sound.id}
                        onClick={() => handleToggleAmbient(sound.id)}
                        className={`px-2.5 py-2 text-xs rounded-lg text-left transition-all border ${
                          currentAmbientSound === sound.id && isAmbientPlaying
                            ? 'bg-indigo-600 text-white border-indigo-500 font-medium'
                            : 'bg-slate-800/60 text-slate-300 border-slate-700/50 hover:bg-slate-800'
                        }`}
                      >
                        <div className="text-[11px] font-bold">{sound.name}</div>
                        <div className="text-[9px] opacity-70 truncate">{sound.description}</div>
                      </button>
                    ))}
                  </div>
                  {isAmbientPlaying && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>Volume</span>
                        <span>{Math.round(ambientVolume * 100)}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="1" 
                        step="0.05"
                        value={ambientVolume}
                        onChange={(e) => handleAmbientVolumeChange(parseFloat(e.target.value))}
                        className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Pomodoro Quick Pill */}
            <button
              onClick={() => setIsMiniPomodoroOpen(prev => !prev)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono font-bold transition-all ${
                isPomodoroRunning 
                  ? 'bg-indigo-500/10 border-indigo-500/40 text-indigo-300' 
                  : 'bg-slate-800/80 border-slate-700/60 text-slate-300 hover:bg-slate-800'
              }`}
              title="Pomodoro Timer"
            >
              <Clock className={`w-3.5 h-3.5 ${isPomodoroRunning ? 'text-indigo-400 animate-spin' : 'text-slate-400'}`} />
              <span>{String(pomodoroMinutes).padStart(2, '0')}:{String(pomodoroSeconds).padStart(2, '0')}</span>
            </button>

            {/* Notification Center */}
            <button 
              onClick={() => setIsNotificationsOpen(true)}
              className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:text-white transition-all relative"
              title="Notificações e Avisos ENEM"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full ring-2 ring-slate-900" />
            </button>

            {/* Settings */}
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
              title="Configurações e Chave de IA"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="p-2 rounded-lg bg-slate-800 md:hidden text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>

        {/* Global Navigation Tabs (Desktop) */}
        <div className="hidden md:flex border-t border-slate-800/60 bg-slate-900/50 px-4 sm:px-6 lg:px-8 overflow-x-auto scrollbar-none">
          <nav className="flex space-x-1 py-1.5 text-xs font-semibold">
            {[
              { id: 'planner', label: 'Cronograma IA', icon: BookOpen },
              { id: 'simulado', label: 'Simulado ENEM', icon: FileCheck },
              { id: 'essay', label: 'Laboratório Redação', icon: PenTool },
              { id: 'catalog', label: 'Matérias & Raio-X', icon: Layers },
              { id: 'mindmap', label: 'Mapas Mentais', icon: BrainCircuit },
              { id: 'flashcards', label: 'Flashcards', icon: Sparkles },
              { id: 'doubt', label: 'Tira-Dúvidas IA', icon: Bot },
              { id: 'arena_x1', label: 'Arena 1v1', icon: Swords },
              { id: 'quiz_battle', label: 'Quiz Battle', icon: Zap },
              { id: 'reels', label: 'Reels de Questões', icon: Smartphone },
              { id: 'sisu', label: 'Simulador SISU', icon: TrendingUp },
              { id: 'redacao_modelos', label: 'Redações 1000', icon: Award },
              { id: 'tri', label: 'Calculadora TRI', icon: Target },
              { id: 'countdown', label: 'Contagem Provas', icon: Calendar },
              { id: 'study_rooms', label: 'Salas de Estudo', icon: Radio },
              { id: 'library', label: 'Biblioteca Digital', icon: BookOpen },
              { id: 'diagnostic', label: 'Teste Diagnóstico', icon: ShieldCheck },
              { id: 'methodology', label: 'Método de Estudos', icon: GraduationCap },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all whitespace-nowrap ${
                    isActive 
                      ? 'bg-indigo-600 text-white shadow-sm font-bold' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl p-4 overflow-y-auto">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
            <span className="font-bold text-lg text-white">Menu de Navegação</span>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg bg-slate-800 text-slate-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-4">
            <HeaderGlobalSearch onSelectTopic={(topic) => {
              setMobileMenuOpen(false);
              handleSelectTopicFromSearch(topic);
            }} />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'planner', label: 'Cronograma IA', icon: BookOpen },
              { id: 'simulado', label: 'Simulado ENEM', icon: FileCheck },
              { id: 'essay', label: 'Laboratório Redação', icon: PenTool },
              { id: 'catalog', label: 'Matérias & Raio-X', icon: Layers },
              { id: 'mindmap', label: 'Mapas Mentais', icon: BrainCircuit },
              { id: 'flashcards', label: 'Flashcards', icon: Sparkles },
              { id: 'doubt', label: 'Tira-Dúvidas IA', icon: Bot },
              { id: 'arena_x1', label: 'Arena 1v1', icon: Swords },
              { id: 'quiz_battle', label: 'Quiz Battle', icon: Zap },
              { id: 'reels', label: 'Reels de Questões', icon: Smartphone },
              { id: 'sisu', label: 'Simulador SISU', icon: TrendingUp },
              { id: 'redacao_modelos', label: 'Redações 1000', icon: Award },
              { id: 'tri', label: 'Calculadora TRI', icon: Target },
              { id: 'countdown', label: 'Contagem Provas', icon: Calendar },
              { id: 'study_rooms', label: 'Salas de Estudo', icon: Radio },
              { id: 'library', label: 'Biblioteca Digital', icon: BookOpen },
              { id: 'diagnostic', label: 'Teste Diagnóstico', icon: ShieldCheck },
              { id: 'methodology', label: 'Método de Estudos', icon: GraduationCap },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 p-3 rounded-xl text-left text-xs font-semibold transition-all border ${
                    isActive
                      ? 'bg-indigo-600 text-white border-indigo-500'
                      : 'bg-slate-900 text-slate-300 border-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Top Info Highlights */}
        {activeTab === 'planner' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <WeeklyGoalProgressWidget completedHours={2.5} targetHours={settings.dailyGoalHours * 6} />
            <DailyPersonalizedKnowledgePillSection onOpenTopic={handleSelectTopicFromSearch} />
            <PerformanceDailyTipSection onOpenDoubt={() => setActiveTab('doubt')} />
          </div>
        )}

        {/* Tab Router Switch */}
        <Suspense fallback={
          <div className="min-h-[400px] flex flex-col items-center justify-center gap-3 text-slate-400">
            <RefreshCw className="w-8 h-8 animate-spin text-indigo-500" />
            <p className="text-sm font-medium">Carregando módulo...</p>
          </div>
        }>
          {activeTab === 'planner' && (
            <StudyPlannerSection 
              schedule={schedule}
              onScheduleUpdate={(newSched) => {
                setSchedule(newSched);
                saveSchedule(newSched);
              }}
              onNavigateToTopic={handleSelectTopicFromSearch}
            />
          )}

          {activeTab === 'simulado' && (
            <SimuladoSection 
              onExamCompleted={(xpEarned) => addXp(xpEarned)}
              apiKey={settings.geminiApiKey}
            />
          )}

          {activeTab === 'essay' && (
            <EssayLabSection 
              apiKey={settings.geminiApiKey}
              onXpEarned={(xp) => addXp(xp)}
            />
          )}

          {activeTab === 'catalog' && (
            <SubjectCatalogSection 
              onGenerateMindmap={(topic) => {
                setActiveTab('mindmap');
              }}
            />
          )}

          {activeTab === 'mindmap' && (
            <MindmapGeneratorSection 
              apiKey={settings.geminiApiKey}
            />
          )}

          {activeTab === 'flashcards' && (
            <FlashcardsSection 
              apiKey={settings.geminiApiKey}
              onCardMastered={() => addXp(15)}
            />
          )}

          {activeTab === 'doubt' && (
            <QuickDoubtSection 
              apiKey={settings.geminiApiKey}
            />
          )}

          {activeTab === 'arena_x1' && (
            <ArenaX1Section 
              onVictory={(xp) => addXp(xp)}
            />
          )}

          {activeTab === 'quiz_battle' && (
            <QuizBattleSection 
              onVictory={(xp) => addXp(xp)}
            />
          )}

          {activeTab === 'reels' && (
            <ReelsQuestionFeedSection 
              onCorrectAnswer={() => addXp(20)}
            />
          )}

          {activeTab === 'sisu' && (
            <SisuSimulatorSection />
          )}

          {activeTab === 'redacao_modelos' && (
            <RedacaoNota1000Section />
          )}

          {activeTab === 'tri' && (
            <TriScoreCalculatorSection />
          )}

          {activeTab === 'countdown' && (
            <ExamCountdownSection />
          )}

          {activeTab === 'study_rooms' && (
            <StudyGroupRoomsSection 
              userName="Estudante Nota 1000"
            />
          )}

          {activeTab === 'library' && (
            <DigitalLibrarySection />
          )}

          {activeTab === 'diagnostic' && (
            <DiagnosticTestSection 
              onTestComplete={() => {
                setActiveTab('planner');
                addXp(100);
              }}
            />
          )}

          {activeTab === 'methodology' && (
            <StudyMethodologySection />
          )}
        </Suspense>
      </main>

      {/* Floating Pomodoro Full Mini-Widget */}
      {isMiniPomodoroOpen && (
        <FloatingPomodoroMiniWidget 
          minutes={pomodoroMinutes}
          seconds={pomodoroSeconds}
          isRunning={isPomodoroRunning}
          mode={pomodoroMode}
          cyclesCompleted={pomodoroCyclesCompleted}
          onToggleStart={() => setIsPomodoroRunning(prev => !prev)}
          onReset={() => {
            setIsPomodoroRunning(false);
            setPomodoroMinutes(pomodoroMode === 'focus' ? 25 : pomodoroMode === 'short_break' ? 5 : 15);
            setPomodoroSeconds(0);
          }}
          onChangeMode={(newMode) => {
            setPomodoroMode(newMode);
            setIsPomodoroRunning(false);
            setPomodoroMinutes(newMode === 'focus' ? 25 : newMode === 'short_break' ? 5 : 15);
            setPomodoroSeconds(0);
          }}
          onClose={() => setIsMiniPomodoroOpen(false)}
        />
      )}

      {/* Global Modals */}
      <Suspense fallback={null}>
        {isSettingsOpen && (
          <SettingsModal 
            settings={settings}
            onSave={(newSettings) => {
              setSettings(newSettings);
              saveSettings(newSettings);
              setIsSettingsOpen(false);
            }}
            onClose={() => setIsSettingsOpen(false)}
          />
        )}

        {isAchievementsOpen && (
          <GamifiedAchievementsModal 
            userLevel={userLevel}
            userXp={userXp}
            userXpNextLevel={userXpNextLevel}
            streakDays={streakDays}
            onClose={() => setIsAchievementsOpen(false)}
          />
        )}

        {isShortcutsOpen && (
          <KeyboardShortcutsModal 
            onClose={() => setIsShortcutsOpen(false)}
          />
        )}

        {isNotificationsOpen && (
          <NotificationCenterModal 
            onClose={() => setIsNotificationsOpen(false)}
          />
        )}
      </Suspense>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 GabaritAI - Plataforma Aberta de Alta Performance para o ENEM.</p>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <button onClick={() => setIsShortcutsOpen(true)} className="hover:text-indigo-400 underline">
              Atalhos de Teclado (?)
            </button>
            <span>•</span>
            <button onClick={() => setActiveTab('methodology')} className="hover:text-indigo-400 underline">
              Como Funciona o Ciclo de Estudos
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
