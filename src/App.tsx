import React, { useState } from 'react';
import { 
  Home, Swords, BookOpen, PenTool, Target, User, Search, Bell, 
  Sparkles, Calendar, Layers, Trophy, Bot, Crown, BarChart2, 
  Flame, Plus, Settings, Volume2, Moon, Play, CheckCircle2, 
  MessageSquare, X, ChevronRight, Zap, RefreshCw, HelpCircle
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [activeTopPill, setActiveTopPill] = useState('bento');
  const [dailyQuestions, setDailyQuestions] = useState(0);
  const [isGabiOpen, setIsGabiOpen] = useState(false);
  const [desiredCourse, setDesiredCourse] = useState('Medicina');
  const [targetExam, setTargetExam] = useState('ENEM 2026');
  const [dailyHoursGoal, setDailyHoursGoal] = useState('4h');
  const [dailyQuestionsGoal, setDailyQuestionsGoal] = useState(20);

  const topPills = [
    { id: 'bento', label: '🍱 Bento AI', icon: Sparkles },
    { id: 'banca', label: '🏛️ Banca IA', icon: Bot },
    { id: 'calendario', label: '📅 Calendário', icon: Calendar },
    { id: 'flashcards', label: '🎴 Flashcards', icon: Layers },
    { id: 'ranking', label: '🏆 Ranking', icon: Trophy },
    { id: 'professora', label: '🧑‍🏫 Professora IA', icon: User },
    { id: 'pro', label: '💎 Plano PRO', icon: Crown },
    { id: 'graficos', label: '📈 Gráficos TRI', icon: BarChart2 },
  ];

  const subjects = [
    { name: 'Matemática', icon: '📐' },
    { name: 'Biologia', icon: '🧬' },
    { name: 'Física', icon: '⚡' },
    { name: 'Química', icon: '🧪' },
    { name: 'História', icon: '📜' },
    { name: 'Geografia', icon: '🌍' },
    { name: 'Filosofia', icon: '🏛️' },
    { name: 'Sociologia', icon: '👥' },
  ];

  return (
    <div className="min-h-screen bg-[#090d16] text-gray-100 font-sans pb-24 select-none">
      {/* Header Fixo Topo */}
      <header className="sticky top-0 z-40 bg-[#0d1322]/90 backdrop-blur-md border-b border-[#1b253b] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/30">
            📖
          </div>
          <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            GabaritaAí
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full hover:bg-[#182238] text-gray-400 hover:text-white transition">
            <Search size={18} />
          </button>
          <button className="p-2 rounded-full hover:bg-[#182238] text-gray-400 hover:text-white transition relative">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-pink-500 rounded-full animate-ping" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-pink-500 rounded-full" />
          </button>
          <button 
            onClick={() => setActiveTab('perfil')}
            className="w-8 h-8 rounded-full bg-purple-600/30 border border-purple-500/50 flex items-center justify-center text-purple-300 font-semibold text-xs"
          >
            <User size={16} />
          </button>
        </div>
      </header>

      {/* Grid de Pílulas do Topo (2 Colunas) */}
      <section className="p-4 max-w-lg mx-auto">
        <div className="grid grid-cols-2 gap-2">
          {topPills.map((pill) => (
            <button
              key={pill.id}
              onClick={() => setActiveTopPill(pill.id)}
              className={`py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all border ${
                activeTopPill === pill.id
                  ? 'bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-600/30'
                  : 'bg-[#121a2d] border-[#1e2a45] text-gray-300 hover:bg-[#18233c]'
              }`}
            >
              <span>{pill.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Conteúdo Dinâmico das Abas */}
      <main className="max-w-lg mx-auto px-4 space-y-6">

        {/* TAB HOME */}
        {activeTab === 'home' && (
          <>
            {/* Meta Diária de Estudos */}
            <div className="bg-[#111827] border border-[#1f293d] rounded-2xl p-5 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                  <Target size={14} /> Meta Personalizada
                </span>
                <div className="flex gap-2">
                  <button className="text-[11px] text-gray-400 hover:text-white bg-[#1a2336] px-2.5 py-1 rounded-md border border-[#26334d]">
                    Ocultar Gráfico
                  </button>
                  <button className="text-[11px] text-purple-300 hover:text-purple-200 bg-[#1a2336] px-2.5 py-1 rounded-md border border-[#26334d]">
                    Editar Meta
                  </button>
                </div>
              </div>

              <div className="text-center my-4">
                <h2 className="text-lg font-bold text-white">Meta Diária de Estudos</h2>
                <p className="text-xs text-purple-300 font-semibold mt-1">
                  {dailyQuestions} de {dailyQuestionsGoal} Questões
                </p>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Faltam {Math.max(0, dailyQuestionsGoal - dailyQuestions)} questões para completar sua meta diária!
                </p>

                <div className="flex justify-center gap-2 mt-4">
                  <button 
                    onClick={() => setDailyQuestions(prev => prev + 1)}
                    className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition shadow-lg shadow-purple-600/20"
                  >
                    + +1 Questão
                  </button>
                  <button 
                    onClick={() => setDailyQuestions(prev => prev + 5)}
                    className="bg-[#1c263c] hover:bg-[#253350] text-gray-200 text-xs font-bold px-3.5 py-2 rounded-xl border border-[#2b3a58] transition"
                  >
                    + +5 Questões
                  </button>
                  <button 
                    onClick={() => setDailyQuestions(0)}
                    className="bg-[#1c263c] hover:bg-[#253350] text-gray-300 text-xs font-bold px-3.5 py-2 rounded-xl border border-[#2b3a58] transition"
                  >
                    ✏️ Personalizar
                  </button>
                </div>
              </div>

              {/* Anel de Progresso Circular */}
              <div className="flex flex-col items-center justify-center my-6">
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="56" cy="56" r="46" stroke="#1f293d" strokeWidth="10" fill="transparent" />
                    <circle 
                      cx="56" cy="56" r="46" 
                      stroke="#8b5cf6" 
                      strokeWidth="10" 
                      fill="transparent" 
                      strokeDasharray={289}
                      strokeDashoffset={289 - (289 * Math.min(100, (dailyQuestions / dailyQuestionsGoal) * 100)) / 100}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-xl font-extrabold text-white">
                      {Math.round(Math.min(100, (dailyQuestions / dailyQuestionsGoal) * 100))}%
                    </span>
                    <span className="block text-[9px] uppercase tracking-widest text-gray-400 font-bold">Progresso</span>
                  </div>
                </div>
              </div>

              {/* Gráfico dos 7 Dias */}
              <div className="border-t border-[#1b253b] pt-4 mt-2">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
                    <BarChart2 size={14} className="text-emerald-400" /> PROGRESSO DOS ÚLTIMOS 7 DIAS
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-gray-400 mb-4">
                  <span className="text-emerald-400 font-medium">🔥 3 de 7 metas batidas</span>
                  <span>📊 Total: 99 questões</span>
                </div>

                {/* Barras do Gráfico */}
                <div className="flex items-end justify-between h-28 gap-2 pt-2 px-1">
                  {[
                    { day: 'Sáb', val: 26, status: 'hit' },
                    { day: 'Dom', val: 14, status: 'progress' },
                    { day: 'Seg', val: 20, status: 'hit' },
                    { day: 'Ter', val: 5, status: 'progress' },
                    { day: 'Qua', val: 20, status: 'hit' },
                    { day: 'Qui', val: 14, status: 'progress' },
                    { day: 'Hoje', val: dailyQuestions, status: dailyQuestions >= dailyQuestionsGoal ? 'hit' : 'progress' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <div 
                        style={{ height: `${Math.min(100, (item.val / 28) * 100)}%` }}
                        className={`w-full rounded-t-md transition-all duration-300 ${
                          item.status === 'hit' 
                            ? 'bg-emerald-500 shadow-lg shadow-emerald-500/20' 
                            : 'bg-indigo-600'
                        }`}
                      />
                      <span className="text-[10px] text-gray-400 font-medium">{item.day}</span>
                    </div>
                  ))}
                </div>

                {/* Legenda do Gráfico */}
                <div className="flex items-center justify-between text-[10px] text-gray-400 mt-4 border-t border-[#1b253b] pt-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" /> Meta Batida
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-600" /> Em Progresso
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-gray-600" /> Sem Atividade
                  </div>
                  <span className="text-purple-400 font-semibold">43% de taxa</span>
                </div>
              </div>
            </div>

            {/* Raio-X de Atividade por Disciplina */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-amber-400 flex items-center gap-1.5">
                  <span>🎯 Raio-X de Atividade por Disciplina</span>
                </h3>
                <span className="text-[10px] text-gray-400">Histórico no Navegador</span>
              </div>

              <div className="space-y-2">
                {subjects.map((sub, i) => (
                  <div 
                    key={i} 
                    className="bg-[#111827] border border-[#1f293d] rounded-xl p-3.5 flex items-center justify-between hover:border-purple-500/40 transition cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{sub.icon}</span>
                        <span className="text-xs font-bold text-white">{sub.name}</span>
                      </div>
                      <p className="text-[10px] text-amber-400/90 font-medium mt-1">
                        Iniciar primeiro treino
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-[#1c263c] text-gray-300 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-[#2b3a58]">
                        Novo
                      </span>
                      <ChevronRight size={14} className="text-gray-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* TAB ARENA */}
        {activeTab === 'arena' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-indigo-900/60 to-purple-900/40 border border-indigo-500/30 rounded-2xl p-5 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-purple-300 flex items-center gap-1">
                  ⚔️ Arena X1 <span className="bg-red-500/20 text-red-400 text-[9px] px-1.5 py-0.5 rounded uppercase font-extrabold ml-1">AO VIVO</span>
                </span>
              </div>
              <p className="text-xs text-gray-300">
                Duelos e quizzes competitivos em tempo real entre vestibulandos de todo o Brasil.
              </p>

              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="bg-[#0b101d]/80 p-3 rounded-xl border border-[#1d2840]">
                  <span className="text-[10px] text-gray-400 font-bold block uppercase">Patente</span>
                  <span className="text-xs font-bold text-amber-400 mt-0.5 block">👑 Bixo Federal</span>
                </div>
                <div className="bg-[#0b101d]/80 p-3 rounded-xl border border-[#1d2840]">
                  <span className="text-[10px] text-gray-400 font-bold block uppercase">Vitórias</span>
                  <span className="text-xs font-bold text-emerald-400 mt-0.5 block">🏆 28V / 100</span>
                </div>
                <div className="bg-[#0b101d]/80 p-3 rounded-xl border border-[#1d2840]">
                  <span className="text-[10px] text-gray-400 font-bold block uppercase">Streak</span>
                  <span className="text-xs font-bold text-orange-400 mt-0.5 block">🔥 0 Seguidas</span>
                </div>
                <div className="bg-[#0b101d]/80 p-3 rounded-xl border border-[#1d2840]">
                  <span className="text-[10px] text-gray-400 font-bold block uppercase">Saldo XP</span>
                  <span className="text-xs font-bold text-purple-400 mt-0.5 block">⚡ 4000 XP</span>
                </div>
              </div>
            </div>

            <div className="bg-[#111827] border border-[#1f293d] rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Swords size={16} className="text-purple-400" /> Desafio 1v1 com Amigos
                </h4>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 font-bold px-2 py-0.5 rounded border border-indigo-500/30">
                  SALA PRIVADA
                </span>
              </div>
              <p className="text-xs text-gray-400 mb-4">
                Crie uma sala exclusiva e envie o link no WhatsApp para disputar quem gabarita mais rápido.
              </p>
              <button className="w-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold py-2.5 rounded-xl transition shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2">
                <span>🔗 Criar Desafio</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB CONTEÚDOS */}
        {activeTab === 'conteudos' && (
          <div className="space-y-4">
            <div className="bg-[#111827] border border-[#1f293d] rounded-2xl p-4">
              <h3 className="text-xs font-bold text-amber-400 flex items-center gap-1.5 mb-1">
                <span>🍱 Bento IA - Gerador de Estudos</span>
              </h3>
              <p className="text-[11px] text-gray-400 mb-3">
                Digite um assunto para gerar resumos, pontos-chave e flashcards instantâneos.
              </p>

              <div className="space-y-3">
                <input 
                  type="text" 
                  placeholder="Ex: Ecologia, Geometria Plana, Termoquímica..." 
                  className="w-full bg-[#0b101d] border border-[#1f293d] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500 placeholder-gray-500"
                />
                <button className="w-full bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold py-2.5 rounded-xl transition shadow-lg shadow-amber-600/20">
                  ✨ Gerar Kit de Estudos com Bento IA
                </button>
              </div>

              <div className="mt-4 pt-3 border-t border-[#1b253b]">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                  🔥 MAIS COBRADOS NO ENEM
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['+ Ecologia', '+ Geometria Plana', '+ Termoquímica', '+ Brasil Colônia', '+ Estatística', '+ Funções de 1º e 2º Grau'].map((tag, idx) => (
                    <button key={idx} className="bg-[#1c263c] text-gray-300 text-[10px] font-semibold px-2.5 py-1 rounded-lg border border-[#2b3a58] hover:border-purple-500">
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB REDAÇÃO & IA */}
        {activeTab === 'redacao' && (
          <div className="space-y-4">
            <div className="bg-[#111827] border border-[#1f293d] rounded-2xl p-4">
              <h3 className="text-xs font-bold text-amber-400 flex items-center gap-1.5 mb-1">
                <span>✍️ Corretor de Redação</span>
              </h3>
              <p className="text-[11px] text-gray-400 mb-3">
                Análise focada na Competência 5 do ENEM (0 a 200 pontos)
              </p>

              <button className="text-[11px] text-purple-300 bg-[#1c263c] px-3 py-1.5 rounded-lg border border-[#2b3a58] mb-3 flex items-center gap-1 font-semibold">
                ✨ Carregar Exemplo Nota 200
              </button>

              <textarea 
                rows={5}
                placeholder="Cole seu texto ou proposta de intervenção aqui..."
                className="w-full bg-[#0b101d] border border-[#1f293d] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-purple-500 placeholder-gray-500 resize-none"
              />

              <button className="w-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold py-2.5 rounded-xl transition shadow-lg shadow-purple-600/30 mt-3 flex items-center justify-center gap-2">
                🤖 Avaliar Competência 5
              </button>

              <div className="mt-4 pt-3 border-t border-[#1b253b]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[11px] font-bold text-gray-300">Elementos da C5:</span>
                  <span className="text-[10px] text-gray-400">40 pontos cada</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {['1. Agente (Quem faz?)', '2. Ação (O que faz?)', '3. Meio/Modo (Como faz?)', '4. Efeito (Para quê?)', '5. Detalhamento (A mais)'].map((elem, i) => (
                    <div key={i} className={`bg-[#0b101d] p-2 rounded-lg border border-[#1f293d] text-[10px] text-gray-300 ${i === 4 ? 'col-span-2' : ''}`}>
                      {elem}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB SIMULADOS */}
        {activeTab === 'simulados' && (
          <div className="space-y-4">
            <div className="space-y-2">
              {[
                { title: 'ENEM 2025 - Dia 1', status: 'Disponível', time: '330 min', desc: '90 questões • Linguagens, Códigos e Ciências Humanas + Redação' },
                { title: 'ENEM 2025 - Dia 2', status: 'Disponível', time: '300 min', desc: '90 questões • Matemática e Ciências da Natureza' },
                { title: 'Simulado Inédito - Exatas', status: 'Recomendado', time: '150 min', desc: '45 questões • Matemática, Física e Química Focada na TRI' },
              ].map((sim, i) => (
                <div key={i} className="bg-[#111827] border border-[#1f293d] rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-xs font-bold text-white">{sim.title}</h4>
                    <span className="bg-purple-500/20 text-purple-300 text-[10px] font-bold px-2 py-0.5 rounded border border-purple-500/30">
                      {sim.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400 mb-3">{sim.desc}</p>
                  <button className="w-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold py-2 rounded-xl transition shadow-lg shadow-purple-600/30 flex items-center justify-center gap-1">
                    <Play size={12} /> Iniciar
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB PERFIL */}
        {activeTab === 'perfil' && (
          <div className="space-y-4">
            {/* Header Perfil */}
            <div className="bg-[#111827] border border-[#1f293d] rounded-2xl p-5 text-center">
              <div className="relative w-16 h-16 mx-auto mb-3">
                <div className="w-full h-full rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 p-0.5 shadow-lg">
                  <div className="w-full h-full bg-[#0d1322] rounded-[14px] flex items-center justify-center text-2xl">
                    🎓
                  </div>
                </div>
              </div>
              <h3 className="text-sm font-bold text-white flex items-center justify-center gap-1">
                Estudante Focado ✏️
              </h3>
              <p className="text-[11px] text-purple-300 font-medium">Estudante GabaritaAí</p>

              <div className="flex justify-center gap-2 mt-3">
                <span className="bg-amber-500/10 text-amber-400 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-amber-500/20">
                  🎗️ Patente: Calouro Promissor
                </span>
                <span className="bg-orange-500/10 text-orange-400 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-orange-500/20">
                  🔥 7 dias de Sequência
                </span>
              </div>
            </div>

            {/* Configurações de Meta Acadêmica */}
            <div className="bg-[#111827] border border-[#1f293d] rounded-2xl p-4 space-y-3">
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">
                🎓 META ACADÊMICA & FOCO DE ESTUDOS
              </span>

              <div>
                <label className="text-[11px] text-gray-400 font-medium block mb-1">Curso Desejado:</label>
                <select 
                  value={desiredCourse} 
                  onChange={(e) => setDesiredCourse(e.target.value)}
                  className="w-full bg-[#0b101d] border border-[#1f293d] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="Medicina">Medicina</option>
                  <option value="Direito">Direito</option>
                  <option value="Engenharia de Software">Engenharia de Software</option>
                  <option value="Psicologia">Psicologia</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] text-gray-400 font-medium block mb-1">Exame / Foco Principal:</label>
                <select 
                  value={targetExam} 
                  onChange={(e) => setTargetExam(e.target.value)}
                  className="w-full bg-[#0b101d] border border-[#1f293d] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="ENEM 2026">ENEM 2026</option>
                  <option value="FUVEST 2026">FUVEST 2026</option>
                  <option value="UNICAMP 2026">UNICAMP 2026</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-gray-400 font-medium">Meta Diária de Horas:</span>
                  <span className="text-amber-400 font-bold">{dailyHoursGoal} / dia</span>
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {['1h', '2h', '4h', '6h', '8h'].map((hrs) => (
                    <button 
                      key={hrs}
                      onClick={() => setDailyHoursGoal(hrs)}
                      className={`py-1.5 text-xs font-bold rounded-lg border transition ${
                        dailyHoursGoal === hrs 
                          ? 'bg-purple-600 border-purple-400 text-white' 
                          : 'bg-[#0b101d] border-[#1f293d] text-gray-400'
                      }`}
                    >
                      {hrs}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-gray-400 font-medium">Meta Diária de Questões:</span>
                  <span className="text-amber-400 font-bold">{dailyQuestionsGoal} questões</span>
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {[10, 20, 30, 50, 100].map((q) => (
                    <button 
                      key={q}
                      onClick={() => setDailyQuestionsGoal(q)}
                      className={`py-1.5 text-xs font-bold rounded-lg border transition ${
                        dailyQuestionsGoal === q 
                          ? 'bg-amber-500 border-amber-400 text-slate-950' 
                          : 'bg-[#0b101d] border-[#1f293d] text-gray-400'
                      }`}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Botão Flutuante Gabi IA */}
      <button 
        onClick={() => setIsGabiOpen(!isGabiOpen)}
        className="fixed bottom-20 right-4 z-40 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs px-4 py-2.5 rounded-full shadow-2xl shadow-purple-600/50 flex items-center gap-2 transition transform active:scale-95 border border-purple-400/30"
      >
        <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
        <span>🟢 Gabi IA</span>
      </button>

      {/* Modal Chat Gabi IA */}
      {isGabiOpen && (
        <div className="fixed inset-x-4 bottom-24 max-w-lg mx-auto z-50 bg-[#0d1322] border border-purple-500/40 rounded-2xl p-4 shadow-2xl backdrop-blur-xl animate-in slide-in-from-bottom duration-200">
          <div className="flex items-center justify-between border-b border-[#1b253b] pb-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center text-xs">
                🤖
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Gabi IA</h4>
                <p className="text-[9px] text-emerald-400 font-semibold">Online e pronta para tirar dúvidas</p>
              </div>
            </div>
            <button onClick={() => setIsGabiOpen(false)} className="text-gray-400 hover:text-white">
              <X size={16} />
            </button>
          </div>
          <div className="bg-[#070a12] rounded-xl p-3 h-40 overflow-y-auto mb-3 text-xs text-gray-300 space-y-2 border border-[#1b253b]">
            <div className="bg-[#131c30] p-2.5 rounded-xl max-w-[85%] text-gray-200">
              Oi! Sou a Gabi IA. Como posso te ajudar nos seus estudos hoje? 🚀
            </div>
          </div>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Digite sua dúvida..." 
              className="flex-1 bg-[#070a12] border border-[#1b253b] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
            />
            <button className="bg-purple-600 text-white px-3 py-2 rounded-xl text-xs font-bold hover:bg-purple-500">
              Enviar
            </button>
          </div>
        </div>
      )}

      {/* Rodapé Fixo de Navegação por Abas */}
      <nav className="fixed bottom-0 inset-x-0 z-40 bg-[#0d1322]/95 backdrop-blur-md border-t border-[#1b253b] max-w-lg mx-auto">
        <div className="grid grid-cols-6 h-16">
          {[
            { id: 'home', label: 'Home', icon: Home },
            { id: 'arena', label: 'Arena ⚔️', icon: Swords },
            { id: 'conteudos', label: 'Conteúdos', icon: BookOpen },
            { id: 'redacao', label: 'Redação & IA', icon: PenTool },
            { id: 'simulados', label: 'Simulados', icon: Target },
            { id: 'perfil', label: 'Perfil & XP', icon: User },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center gap-1 transition ${
                  isActive ? 'text-purple-400 font-bold' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                <Icon size={18} className={isActive ? 'stroke-[2.5]' : 'stroke-[1.75]'} />
                <span className="text-[9px] truncate max-w-full px-0.5">{tab.label}</span>
                {isActive && <span className="w-1 h-1 bg-purple-400 rounded-full -mt-0.5" />}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
