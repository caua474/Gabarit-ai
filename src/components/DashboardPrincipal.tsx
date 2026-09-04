import React, { useState } from 'react';
import { Target, BarChart2, ChevronRight, Sparkles } from 'lucide-react';

interface DashboardPrincipalProps {
  dailyQuestions: number;
  dailyQuestionsGoal: number;
  onAddQuestion: (count: number) => void;
  onResetQuestions: () => void;
  onOpenProfile: () => void;
  onSelectSubject: (subjectName: string) => void;
}

export const DashboardPrincipal: React.FC<DashboardPrincipalProps> = ({
  dailyQuestions,
  dailyQuestionsGoal,
  onAddQuestion,
  onResetQuestions,
  onOpenProfile,
  onSelectSubject,
}) => {
  const [showChart, setShowChart] = useState(true);

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

  const progressPercentage = Math.round(
    Math.min(100, (dailyQuestions / (dailyQuestionsGoal || 1)) * 100)
  );

  const remaining = Math.max(0, dailyQuestionsGoal - dailyQuestions);

  return (
    <div className="space-y-6">
      {/* Meta Diária de Estudos */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
            <Target size={14} /> Meta Personalizada
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setShowChart(!showChart)}
              className="text-[11px] text-slate-400 hover:text-white bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700 transition"
            >
              {showChart ? 'Ocultar Gráfico' : 'Exibir Gráfico'}
            </button>
            <button
              onClick={onOpenProfile}
              className="text-[11px] text-purple-300 hover:text-purple-200 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700 transition"
            >
              Editar Meta
            </button>
          </div>
        </div>

        <div className="text-center my-4">
          <h2 className="text-lg font-bold text-white">Meta Diária de Estudos</h2>
          <p className="text-xs text-purple-300 font-semibold mt-1">
            {dailyQuestions} de {dailyQuestionsGoal} Questões
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            {remaining > 0
              ? `Faltam ${remaining} questões para completar sua meta diária!`
              : '🎉 Parabéns! Você bateu a sua meta diária!'}
          </p>

          <div className="flex justify-center gap-2 mt-4">
            <button
              onClick={() => onAddQuestion(1)}
              className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition shadow-lg shadow-purple-600/20 active:scale-95"
            >
              +1 Questão
            </button>
            <button
              onClick={() => onAddQuestion(5)}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-3.5 py-2 rounded-xl border border-slate-700 transition active:scale-95"
            >
              +5 Questões
            </button>
            <button
              onClick={onResetQuestions}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold px-3.5 py-2 rounded-xl border border-slate-700 transition active:scale-95"
            >
              🔄 Zerar
            </button>
          </div>
        </div>

        {/* Anel de Progresso Circular */}
        <div className="flex flex-col items-center justify-center my-6">
          <div className="relative w-28 h-28 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="56"
                cy="56"
                r="46"
                stroke="#1e293b"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="56"
                cy="56"
                r="46"
                stroke="#8b5cf6"
                strokeWidth="10"
                fill="transparent"
                strokeDasharray={289}
                strokeDashoffset={289 - (289 * progressPercentage) / 100}
                strokeLinecap="round"
                className="transition-all duration-500 ease-out"
              />
            </svg>
            <div className="absolute text-center">
              <span className="text-xl font-extrabold text-white">
                {progressPercentage}%
              </span>
              <span className="block text-[9px] uppercase tracking-widest text-slate-400 font-bold">
                Progresso
              </span>
            </div>
          </div>
        </div>

        {/* Gráfico dos 7 Dias */}
        {showChart && (
          <div className="border-t border-slate-800 pt-4 mt-2">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <BarChart2 size={14} className="text-emerald-400" /> PROGRESSO DOS ÚLTIMOS 7 DIAS
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 mb-4">
              <span className="text-emerald-400 font-medium">🔥 3 de 7 metas batidas</span>
              <span>📊 Total: {99 + dailyQuestions} questões</span>
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
                {
                  day: 'Hoje',
                  val: dailyQuestions,
                  status: dailyQuestions >= dailyQuestionsGoal ? 'hit' : 'progress',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end"
                >
                  <div
                    style={{
                      height: `${Math.max(10, Math.min(100, (item.val / 28) * 100))}%`,
                    }}
                    className={`w-full rounded-t-md transition-all duration-300 ${
                      item.status === 'hit'
                        ? 'bg-emerald-500 shadow-lg shadow-emerald-500/20'
                        : 'bg-indigo-600'
                    }`}
                  />
                  <span className="text-[10px] text-slate-400 font-medium">
                    {item.day}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-400 mt-4 border-t border-slate-800 pt-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> Meta Batida
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-600" /> Em Progresso
              </div>
              <span className="text-purple-400 font-semibold">43% de taxa</span>
            </div>
          </div>
        )}
      </div>

      {/* Raio-X de Atividade por Disciplina */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-amber-400 flex items-center gap-1.5">
            🎯 Raio-X de Atividade por Disciplina
          </h3>
          <span className="text-[10px] text-slate-400">Histórico no Navegador</span>
        </div>

        <div className="space-y-2">
          {subjects.map((sub, i) => (
            <div
              key={i}
              onClick={() => onSelectSubject(sub.name)}
              className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between hover:border-purple-500/40 transition cursor-pointer active:scale-[0.99]"
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
                <span className="bg-slate-800 text-slate-300 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-slate-700">
                  Novo
                </span>
                <ChevronRight size={14} className="text-slate-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
