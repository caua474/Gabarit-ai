import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [isGabiOpen, setIsGabiOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'gabi', text: 'Olá! Sou a Gabi IA 🤖. Em qual matéria ou questão posso te ajudar hoje?' }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const handleSendMessage = () => {
    if (!inputMsg.trim()) return;
    setChatMessages(prev => [
      ...prev,
      { sender: 'user', text: inputMsg },
      { sender: 'gabi', text: `Analisando sua dúvida sobre "${inputMsg}"... Aqui está a explicação passo a passo com foco na TRI do ENEM!` }
    ]);
    setInputMsg('');
  };

  const categories = [
    {
      title: '✍️ Redação & IA',
      tabId: 'redacao',
      items: [
        { icon: '🎨', label: 'Corretor de Redação', desc: 'Análise automática das 5 competências do ENEM com nota TRI.' },
        { icon: '📝', label: 'Esqueleto de Redação', desc: 'Modelos prontos e adaptáveis para qualquer tema.' },
        { icon: '🔥', label: 'Radar de Redação', desc: 'Apostas e temas mais quentes para este ano.' },
        { icon: '🔍', label: 'Detector C5 (Intervenção)', desc: 'Validador dos 5 elementos da Proposta de Intervenção.' },
        { icon: '📖', label: 'Repertórios Coringa', desc: 'Citações e filosofias aplicáveis a múltiplos eixos.' },
      ],
    },
    {
      title: '📚 Conteúdos & Memória',
      tabId: 'conteudos',
      items: [
        { icon: '⚡', label: 'Resumos & Flashcards', highlight: true, desc: 'Fichamentos rápidos e repetição espaçada.' },
        { icon: '🧠', label: 'Mapas Mentais', desc: 'Visualização esquemática de conteúdos complexos.' },
        { icon: '📚', label: 'Biblioteca & Fichamentos', desc: 'Acervo completo organizado por disciplinas.' },
        { icon: '💡', label: 'Pílulas do Conhecimento', desc: 'Conceitos explicados em até 2 minutos.' },
        { icon: '📐', label: 'Catálogo do Edital', desc: 'Acompanhamento do que já foi estudado.' },
        { icon: '📖', label: 'Glossário do Edital', desc: 'Termos técnicos e definições essenciais.' },
      ],
    },
    {
      title: '📝 Simulados & Estratégia',
      tabId: 'simulados',
      items: [
        { icon: '📜', label: 'Simulado TRI Oficial', desc: 'Provas no formato real com algoritmo de calibração.' },
        { icon: '🎯', label: 'Simulado Adaptativo IA', desc: 'Questões calibradas no seu nível exato de dificuldade.' },
        { icon: '📓', label: 'Caderno de Erros', desc: 'Análise detalhada das questões que você errou.' },
        { icon: '📱', label: 'Feed Reels de Questões', desc: 'Resolução rápida no formato vertical.' },
        { icon: '🎯', label: 'Chute Consciente & Estratégia', desc: 'Técnicas para maximizar sua nota TRI.' },
      ],
    },
    {
      title: '⚔️ Arena & Gamificação',
      tabId: 'arena',
      items: [
        { icon: '⚔️', label: 'Arena X1 (Dueling)', desc: 'Desafie outros estudantes em tempo real!' },
        { icon: '⚔️', label: 'Batalha X1 de Questões', desc: 'Quem acertar mais rápido ganha XP.' },
        { icon: '🏆', label: 'Ranking Semanal Regional', desc: 'Sua posição em relação aos vestibulandos da sua região.' },
        { icon: '🐱', label: 'Mascote Gabaritão & XP', desc: 'Evolua seu mascote conforme cumpre metas diárias.' },
      ],
    },
    {
      title: '🛠️ Ferramentas de Estudo',
      tabId: 'ferramentas',
      items: [
        { icon: '💡', label: 'Scanner Tira-Dúvidas', desc: 'Tire foto da questão para receber a resolução por IA.' },
        { icon: '🎤', label: 'Teste Verbal Feynman', desc: 'Explique a matéria com suas palavras e receba feedback.' },
        { icon: '🎧', label: 'Modo Áudio & Podcasts', desc: 'Aulas sintetizadas para ouvir em deslocamentos.' },
        { icon: '🎴', label: 'Auto-Flashcards (Foto/Texto)', desc: 'Gere flashcards automaticamente a partir de apostilas.' },
        { icon: '😈', label: 'Advogado do Diabo (Debate)', desc: 'Treine argumentação debatendo teses com a IA.' },
        { icon: '🎧', label: 'Som Ambiente de Prova', desc: 'Sons binaurais e ruídos brancos para foco extremo.' },
        { icon: '📊', label: 'Estatísticas de Estudo', desc: 'Análise de métricas de tempo, retenção e acertos.' },
        { icon: '🚨', label: 'Modo Reta Final (30 Dias)', desc: 'Cronograma intensivo pré-prova.' },
        { icon: '📅', label: 'Planner & Rotina', desc: 'Organizador semanal inteligente.' },
        { icon: '🏛️', label: 'Simulador SISU', desc: 'Calcule suas chances com base na nota TRI estimada.' },
        { icon: '📄', label: 'Folha de Véspera (Cheat Sheet)', desc: 'Resumos super sintetizados para o dia anterior.' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 font-sans pb-28 p-3 md:p-6 max-w-4xl mx-auto space-y-5">
      {/* Header */}
      <header className="flex items-center justify-between pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-amber-400 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-950">
            ✨
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-lg font-bold tracking-tight text-white">Gabarita AI</h1>
              <span className="bg-amber-400/20 text-amber-300 text-[10px] font-extrabold px-2 py-0.5 rounded border border-amber-400/40">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Seu tutor inteligente para exames</p>
          </div>
        </div>
        <button
          onClick={() => setSelectedTool('Plano PRO')}
          className="bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-extrabold px-3.5 py-2 rounded-xl text-xs transition flex items-center gap-1.5 shadow-md shadow-amber-950"
        >
          👑 Virar PRO
        </button>
      </header>

      {/* Carrossel de Atalhos Rápidos Superior */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        <button
          onClick={() => setSelectedTool('Resumos & Flashcards')}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-xs px-3.5 py-2 rounded-xl shadow-lg shadow-indigo-600/30 whitespace-nowrap border border-indigo-400/30"
        >
          <span>⚡</span> Resumos & Flashcards
        </button>
        <button
          onClick={() => setSelectedTool('Arena X1 (Duelos)')}
          className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 text-slate-300 font-medium text-xs px-3 py-2 rounded-xl whitespace-nowrap hover:bg-slate-800 transition"
        >
          <span>⚔️</span> Arena X1
        </button>
        <button
          onClick={() => setSelectedTool('Plano PRO')}
          className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 text-slate-300 font-medium text-xs px-3 py-2 rounded-xl whitespace-nowrap hover:bg-slate-800 transition"
        >
          <span>💎</span> Plano PRO
        </button>
        <button
          onClick={() => setSelectedTool('Gráficos TRI')}
          className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 text-slate-300 font-medium text-xs px-3 py-2 rounded-xl whitespace-nowrap hover:bg-slate-800 transition"
        >
          <span>📈</span> Gráficos TRI
        </button>
      </div>

      {/* Conteúdo Dinâmico com base na Aba Selecionada */}
      {activeTab === 'perfil' ? (
        /* Tela de Perfil & XP com Gráficos TRI */
        <div className="space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-2xl">
                👤
              </div>
              <div>
                <h2 className="font-bold text-base text-white">Estudante Gabarita</h2>
                <p className="text-xs text-indigo-400 font-medium">Nível 12 • 3.450 XP acumulados</p>
                <div className="w-48 bg-slate-800 rounded-full h-1.5 mt-1.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-500 to-amber-400 h-1.5 rounded-full w-[70%]"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4 backdrop-blur-sm">
            <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2">
              <span>📈</span> Desempenho TRI Estimado
            </h3>
            <div className="space-y-3">
              {[
                { mat: 'Redação', score: 920, color: 'bg-emerald-500', width: 'w-[92%]' },
                { mat: 'Matemática e Suas Tecnologias', score: 780, color: 'bg-indigo-500', width: 'w-[78%]' },
                { mat: 'Ciências Humanas', score: 740, color: 'bg-purple-500', width: 'w-[74%]' },
                { mat: 'Linguagens e Códigos', score: 710, color: 'bg-amber-500', width: 'w-[71%]' },
                { mat: 'Ciências da Natureza', score: 670, color: 'bg-rose-500', width: 'w-[67%]' },
              ].map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-300">{item.mat}</span>
                    <span className="text-indigo-300 font-bold">{item.score} pts</span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                    <div className={`${item.color} ${item.width} h-2 rounded-full`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Categorias e Módulos em Grid 2 Colunas */
        <div className="space-y-4">
          {categories
            .filter(cat => activeTab === 'home' || cat.tabId === activeTab)
            .map((cat, idx) => (
              <div
                key={idx}
                className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-3.5 space-y-3 backdrop-blur-sm"
              >
                <h2 className="text-xs font-bold text-slate-200 tracking-wide uppercase flex items-center gap-2">
                  {cat.title}
                </h2>
                {/* GRID DE 2 COLUNAS NO CELULAR E NO DESKTOP */}
                <div className="grid grid-cols-2 gap-2">
                  {cat.items.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedTool(item.label)}
                      className={`flex flex-col items-start p-3 rounded-xl text-left transition border ${
                        item.highlight
                          ? 'bg-gradient-to-br from-indigo-900/40 to-indigo-600/20 border-indigo-500/50 text-indigo-200 hover:border-indigo-400'
                          : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/60 hover:text-white'
                      }`}
                    >
                      <span className="text-lg mb-1">{item.icon}</span>
                      <span className="text-[11px] font-bold leading-tight line-clamp-2">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Modal Interativo para quando clica em qualquer ferramenta */}
      {selectedTool && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 max-w-md w-full space-y-4 shadow-2xl relative animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg text-white flex items-center gap-2">
                  <span>✨</span> {selectedTool}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Módulo ativo no Gabarita AI PRO</p>
              </div>
              <button
                onClick={() => setSelectedTool(null)}
                className="text-slate-400 hover:text-white bg-slate-800 p-1.5 rounded-lg text-xs"
              >
                ✕
              </button>
            </div>

            {selectedTool === 'Gráficos TRI' ? (
              <div className="space-y-3 text-xs">
                <p className="text-slate-300">Sua evolução estimada nos últimos simulados:</p>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2 font-mono">
                  <p className="text-emerald-400">• Média Geral: 764.2 TRI</p>
                  <p className="text-indigo-400">• Percentual de Acertos: 82%</p>
                  <p className="text-amber-400">• Consistência: Média Prova Oficial</p>
                </div>
              </div>
            ) : selectedTool === 'Plano PRO' ? (
              <div className="space-y-3 text-xs">
                <p className="text-slate-300">Desbloqueie perguntas ilimitadas, leitura OCR e modelo Gemini 2.5 Flash por apenas R$ 5,00/mês.</p>
                <button className="w-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold py-2.5 rounded-xl text-center">
                  Assinar por R$ 5,00/mês
                </button>
              </div>
            ) : (
              <div className="space-y-3 text-xs text-slate-300">
                <p>Ferramenta pronta para uso! Digite sua pergunta ou selecione o tópico para iniciar a simulação com a inteligência do Gemini.</p>
                <textarea
                  placeholder="Digite aqui o que você deseja analisar ou gerar..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500 h-24 text-xs resize-none"
                ></textarea>
                <button
                  onClick={() => {
                    alert(`Iniciando processamento de "${selectedTool}" com Gemini...`);
                    setSelectedTool(null);
                  }}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-xl transition text-center"
                >
                  🚀 Executar com IA
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal / Chat Flutuante da Gabi IA */}
      {isGabiOpen && (
        <div className="fixed inset-x-4 bottom-20 z-50 max-w-sm mx-auto bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col h-96 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-900/60 to-purple-900/60 p-3 border-b border-slate-800 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-bold text-xs text-white">Gabi IA - Assistente de Estudo</span>
            </div>
            <button onClick={() => setIsGabiOpen(false)} className="text-slate-400 hover:text-white text-xs bg-slate-800/80 px-2 py-0.5 rounded">
              ✕
            </button>
          </div>

          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-xs">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2.5 rounded-xl max-w-[85%] ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white ml-auto'
                    : 'bg-slate-950 border border-slate-800 text-slate-200'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="p-2 border-t border-slate-800 bg-slate-950 flex gap-2">
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Pergunte à Gabi IA..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
            <button onClick={handleSendMessage} className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-3 py-2 rounded-xl text-xs">
              Enviar
            </button>
          </div>
        </div>
      )}

      {/* Botão Flutuante Gabi IA */}
      <div className="fixed bottom-20 right-4 z-40">
        <button
          onClick={() => setIsGabiOpen(!isGabiOpen)}
          className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-purple-600 text-slate-950 font-extrabold px-4 py-2.5 rounded-full shadow-xl shadow-purple-950/60 flex items-center gap-2 text-xs hover:scale-105 transition transform border border-emerald-300/40"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-950 animate-pulse"></span>
          <span>🟢 Gabi IA</span>
        </button>
      </div>

      {/* Barra de Navegação Inferior Fixa */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#070913]/95 backdrop-blur-md border-t border-slate-800/90 px-2 py-2 z-40 max-w-4xl mx-auto flex justify-around items-center">
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
                ? 'text-indigo-400 font-bold scale-105'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="text-base">{tab.icon}</span>
            <span>{tab.label}</span>
            {tab.badge && (
              <span className="absolute -top-1 right-0.5 bg-amber-500 text-slate-950 font-extrabold text-[8px] px-1 rounded-full">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}
