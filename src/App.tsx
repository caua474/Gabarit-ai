import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('materiais');
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 font-sans p-4 md:p-8 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-amber-400 flex items-center justify-center text-white font-bold text-xl shadow-lg">
            ✨
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight">Gabarita AI</h1>
              <span className="bg-amber-400/20 text-amber-300 text-xs font-semibold px-2 py-0.5 rounded border border-amber-400/30">PRO</span>
            </div>
            <p className="text-xs text-slate-400">Seu tutor inteligente para exames</p>
          </div>
        </div>
        <button className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-sm transition flex items-center gap-2 shadow-md">
          👑 Virar PRO
        </button>
      </header>

      {/* PRO Offer Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 border border-indigo-500/30 p-6 shadow-xl">
        <div className="inline-block bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold px-3 py-1 rounded-full mb-3">
          👑 OFERTA ESPECIAL DE LANÇAMENTO
        </div>
        <h2 className="text-xl md:text-2xl font-bold mb-2">
          GabaritaAI Pro: Perguntas ilimitadas, leitor de imagem e modelo Gemini por <span className="text-amber-400 border-b-2 border-amber-400">R$ 5,00/mês</span>
        </h2>
        <p className="text-sm text-slate-300 mb-4 max-w-2xl">
          Turbine sua preparação para o ENEM e vestibulares com respostas instantâneas, leitura de fotos de apostilas e explicações passo a passo sem fila.
        </p>

        <div className="flex flex-wrap gap-4 text-xs text-slate-300 mb-6">
          <span className="flex items-center gap-1.5 text-emerald-400">✓ Sem limite diário</span>
          <span className="flex items-center gap-1.5 text-emerald-400">✓ Leitor OCR de questões</span>
          <span className="flex items-center gap-1.5 text-emerald-400">✓ Gemini 2.5 Flash</span>
        </div>

        <button className="w-full sm:w-auto bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl shadow-lg transition text-center">
          ✨ Assinar PRO por R$ 5,00/mês
        </button>
        <p className="text-xs text-slate-400 mt-2">Cancele quando quiser • Acesso imediato</p>
      </div>

      {/* Navigation Tabs */}
      <nav className="flex gap-2 p-1.5 bg-slate-900/80 rounded-xl border border-slate-800 overflow-x-auto">
        {[
          { id: 'materiais', label: 'Materiais', icon: '📚' },
          { id: 'planos', label: 'Planos de Estudo', icon: '📅' },
          { id: 'tutor', label: 'Tutor IA', icon: '🤖' },
          { id: 'aistudio', label: 'AI Studio', icon: '⚙️' },
          { id: 'perfil', label: 'Perfil & XP', icon: '👤' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Search & Filters */}
      <div className="space-y-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar resumos, fórmulas, tags (#ENEM, #Fórmulas)..."
            className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-3 pl-10 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition"
          />
          <span className="absolute left-3.5 top-3.5 text-slate-400 text-sm">🔍</span>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {['Todas', 'Matemática', 'Biologia', 'Física', 'Química', 'Redação', 'História'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Feed Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-lg flex items-center gap-2">
              <span>📚</span> Feed de Estudos por Disciplina
            </h3>
            <p className="text-xs text-slate-400">Resumos didáticos, fórmulas essenciais e tópicos de alta incidência no ENEM</p>
          </div>
          <span className="text-xs text-slate-400">6 resumos</span>
        </div>

        {/* Card: Trigonometria */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition space-y-3">
          <div className="flex justify-between items-center">
            <span className="bg-indigo-950 text-indigo-300 text-xs font-semibold px-2.5 py-1 rounded-md border border-indigo-800/50">
              Matemática
            </span>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span>⏱️ 6 min</span>
              <span className="text-amber-400 font-medium">• Essencial</span>
            </div>
          </div>

          <h4 className="text-lg font-bold text-white">Trigonometria Avançada</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Relações fundamentais no círculo trigonométrico, identidades de soma de arcos, transformações e equações aplicadas aos vestibulares.
          </p>

          <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3 text-xs space-y-1 font-mono text-slate-300">
            <p className="text-[10px] text-slate-500 uppercase font-sans font-bold tracking-wider mb-1">Fórmulas / Princípios Chave:</p>
            <p>• sen²(x) + cos²(x) = 1</p>
            <p>• tg(x) = sen(x) / cos(x)</p>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {['#ENEM', '#Fórmulas', '#Trigonometria', '#Geometria'].map(tag => (
              <span key={tag} className="text-[11px] bg-slate-800/60 text-slate-300 px-2 py-0.5 rounded border border-slate-700/50">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
