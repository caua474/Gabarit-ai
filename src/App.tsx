import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  const categories = [
    {
      title: '✍️ Redação & IA',
      items: [
        { icon: '🎨', label: 'Corretor de Redação' },
        { icon: '📝', label: 'Esqueleto de Redação' },
        { icon: '🔥', label: 'Radar de Redação' },
        { icon: '🔍', label: 'Detector C5 (Intervenção)' },
        { icon: '📖', label: 'Repertórios Coringa' },
      ],
    },
    {
      title: '📚 Conteúdos & Memória',
      items: [
        { icon: '⚡', label: 'Resumos & Flashcards', highlight: true },
        { icon: '🧠', label: 'Mapas Mentais' },
        { icon: '📚', label: 'Biblioteca & Fichamentos' },
        { icon: '💡', label: 'Pílulas do Conhecimento' },
        { icon: '📐', label: 'Catálogo do Edital' },
        { icon: '📖', label: 'Glossário do Edital' },
      ],
    },
    {
      title: '📝 Simulados & Estratégia',
      items: [
        { icon: '📜', label: 'Simulado TRI Oficial' },
        { icon: '🎯', label: 'Simulado Adaptativo IA' },
        { icon: '📓', label: 'Caderno de Erros' },
        { icon: '📱', label: 'Feed Reels de Questões' },
        { icon: '🎯', label: 'Chute Consciente & Estratégia' },
      ],
    },
    {
      title: '⚔️ Arena & Gamificação',
      items: [
        { icon: '⚔️', label: 'Arena X1 (Duelos)' },
        { icon: '⚔️', label: 'Batalha X1 de Questões' },
        { icon: '🏆', label: 'Ranking Semanal Regional' },
        { icon: '🐱', label: 'Mascote Gabaritão & XP' },
      ],
    },
    {
      title: '🛠️ Ferramentas de Estudo',
      items: [
        { icon: '💡', label: 'Scanner Tira-Dúvidas' },
        { icon: '🎤', label: 'Teste Verbal Feynman' },
        { icon: '🎧', label: 'Modo Áudio & Podcasts' },
        { icon: '🎴', label: 'Auto-Flashcards (Foto/Texto)' },
        { icon: '😈', label: 'Advogado do Diabo (Debate)' },
        { icon: '🎧', label: 'Som Ambiente de Prova' },
        { icon: '📊', label: 'Estatísticas de Estudo' },
        { icon: '🚨', label: 'Modo Reta Final (30 Dias)' },
        { icon: '📅', label: 'Planner & Rotina' },
        { icon: '🏛️', label: 'Simulador SISU' },
        { icon: '📄', label: 'Folha de Véspera (Cheat Sheet)' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 font-sans pb-24 p-4 md:p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-amber-400 flex items-center justify-center text-white font-bold text-lg shadow-md">
            ✨
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-lg font-bold tracking-tight">Gabarita AI</h1>
              <span className="bg-amber-400/20 text-amber-300 text-[10px] font-bold px-1.5 py-0.5 rounded border border-amber-400/30">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Seu tutor inteligente para exames</p>
          </div>
        </div>
        <button className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-1.5 rounded-xl text-xs transition flex items-center gap-1.5 shadow">
          👑 Virar PRO
        </button>
      </header>

      {/* Destaque Superior / Carrossel Rápido */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        <button className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-600/20 whitespace-nowrap border border-indigo-400/30">
          <span>⚡</span> Resumos & Flashcards
        </button>
        <button className="flex items-center gap-2 bg-slate-900 border border-slate-800 text-slate-300 font-medium text-xs px-3.5 py-2.5 rounded-xl whitespace-nowrap hover:bg-slate-800 transition">
          <span>⚔️</span> Arena X1
        </button>
        <button className="flex items-center gap-2 bg-slate-900 border border-slate-800 text-slate-300 font-medium text-xs px-3.5 py-2.5 rounded-xl whitespace-nowrap hover:bg-slate-800 transition">
          <span>💎</span> Plano PRO
        </button>
        <button className="flex items-center gap-2 bg-slate-900 border border-slate-800 text-slate-300 font-medium text-xs px-3.5 py-2.5 rounded-xl whitespace-nowrap hover:bg-slate-800 transition">
          <span>📈</span> Gráficos TRI
        </button>
      </div>

      {/* Categorias e Módulos */}
      <div className="space-y-5">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 space-y-3 backdrop-blur-sm"
          >
            <h2 className="text-sm font-bold text-slate-200 tracking-wide flex items-center gap-2">
              {cat.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {cat.items.map((item, i) => (
                <button
                  key={i}
                  className={`flex items-center gap-2.5 p-3 rounded-xl text-xs text-left font-medium transition border ${
                    item.highlight
                      ? 'bg-indigo-600/30 border-indigo-500/50 text-indigo-200 hover:bg-indigo-600/40'
                      : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/50 hover:text-white'
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Botão Flutuante Gabi IA */}
      <div className="fixed bottom-20 right-4 z-50">
        <button className="bg-gradient-to-r from-emerald-400 to-purple-600 text-slate-950 font-bold px-4 py-2 rounded-full shadow-xl shadow-purple-900/40 flex items-center gap-2 text-xs hover:scale-105 transition transform border border-emerald-300/30">
          <span className="w-2 h-2 rounded-full bg-emerald-950 animate-pulse"></span>
          <span>🟢 Gabi IA</span>
        </button>
      </div>

      {/* Barra de Navegação Inferior */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#070913]/95 backdrop-blur-md border-t border-slate-800/80 px-2 py-2 z-40 max-w-4xl mx-auto flex justify-around items-center">
        {[
          { id: 'home', label: 'Home', icon: '🏠' },
          { id: 'arena', label: 'Arena X1', icon: '⚔️', badge: 'X1' },
          { id: 'conteudos', label: 'Conteúdos', icon: '📚' },
          { id: 'redacao', label: 'Redação & IA', icon: '✍️', badge: 'IA' },
          { id: 'simulados', label: 'Simulados', icon: '🎯' },
          { id: 'perfil', label: 'Perfil & XP', icon: '👤' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg text-[10px] font-medium transition ${
              activeTab === tab.id
                ? 'text-indigo-400 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="text-sm">{tab.icon}</span>
            <span>{tab.label}</span>
            {tab.badge && (
              <span className="absolute -top-1 right-1 bg-amber-500 text-slate-950 font-extrabold text-[8px] px-1 rounded-full">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}

