import React, { useState } from 'react';
import { Target, Play, Clock, Award, CheckCircle2, FileText, Filter, Zap } from 'lucide-react';

interface SimuladosSectionProps {
  onStartSimulado?: (area: string, count: number) => void;
}

export const SimuladosSection: React.FC<SimuladosSectionProps> = ({
  onStartSimulado,
}) => {
  const [selectedArea, setSelectedArea] = useState('todas');

  const areas = [
    { id: 'todas', label: 'Todas as Áreas', icon: '🎯' },
    { id: 'matematica', label: 'Matemática e Suas Tecnologias', icon: '📐' },
    { id: 'natureza', label: 'Ciências da Natureza', icon: '🧪' },
    { id: 'humanas', label: 'Ciências Humanas', icon: '🏛️' },
    { id: 'linguagens', label: 'Linguagens e Códigos', icon: '📚' },
  ];

  const examHistory = [
    { name: 'Simulado Diagnóstico ENEM', questions: 15, score: '80%', date: 'Ontem' },
    { name: 'Treino Express: Matemática', questions: 10, score: '90%', date: '3 dias atrás' },
  ];

  const handleStart = (areaName: string, count: number) => {
    if (onStartSimulado) {
      onStartSimulado(areaName, count);
    } else {
      alert(`Iniciando simulado de ${areaName} com ${count} questões!`);
    }
  };

  return (
    <div className="space-y-4">
      {/* Cabeçalho do Simulado */}
      <div className="bg-gradient-to-br from-purple-900/50 to-indigo-900/40 border border-purple-500/30 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
            <Target size={16} /> Banco de Simulados & Questões
          </span>
          <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-extrabold px-2 py-0.5 rounded border border-emerald-500/30">
            PADRÃO TRI
          </span>
        </div>
        <p className="text-xs text-slate-300">
          Treine com questões oficiais do ENEM e bancas parceiras organizadas por área e nível de dificuldade.
        </p>

        {/* Modos Rápidos */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <button
            onClick={() => handleStart('Diagnóstico Rápido', 10)}
            className="bg-slate-950/80 hover:bg-slate-950 border border-purple-500/40 p-3 rounded-xl text-left transition group active:scale-95"
          >
            <div className="flex items-center justify-between mb-1">
              <Zap size={16} className="text-amber-400" />
              <span className="text-[9px] bg-amber-500/20 text-amber-300 font-bold px-1.5 py-0.5 rounded">
                10 MIN
              </span>
            </div>
            <span className="text-xs font-bold text-white block">Treino Express</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">10 Questões Aleatórias</span>
          </button>

          <button
            onClick={() => handleStart('Simulado Completo', 45)}
            className="bg-slate-950/80 hover:bg-slate-950 border border-indigo-500/40 p-3 rounded-xl text-left transition group active:scale-95"
          >
            <div className="flex items-center justify-between mb-1">
              <Clock size={16} className="text-indigo-400" />
              <span className="text-[9px] bg-indigo-500/20 text-indigo-300 font-bold px-1.5 py-0.5 rounded">
                1H 30M
              </span>
            </div>
            <span className="text-xs font-bold text-white block">Simulado Completo</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">45 Questões por Área</span>
          </button>
        </div>
      </div>

      {/* Seleção por Áreas do Conhecimento */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
            <Filter size={14} className="text-purple-400" /> Filtrar por Grande Área
          </h4>
        </div>

        <div className="space-y-2">
          {areas.map((area) => (
            <div
              key={area.id}
              onClick={() => setSelectedArea(area.id)}
              className={`p-3.5 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                selectedArea === area.id
                  ? 'bg-purple-950/40 border-purple-500/60 text-white'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base">{area.icon}</span>
                <div>
                  <span className="text-xs font-bold block">{area.label}</span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    Questões inéditas e provas anteriores
                  </span>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleStart(area.label, 15);
                }}
                className="bg-purple-600 hover:bg-purple-500 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg transition flex items-center gap-1 active:scale-95 shrink-0"
              >
                <Play size={12} className="fill-white" /> Iniciar
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Histórico Recente de Simulados */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
        <h4 className="text-xs font-bold text-slate-300 mb-3 flex items-center gap-1.5">
          <Award size={14} className="text-amber-400" /> Histórico Recente
        </h4>
        <div className="space-y-2">
          {examHistory.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2">
                <FileText size={15} className="text-purple-400" />
                <div>
                  <span className="font-bold text-white block">{item.name}</span>
                  <span className="text-[10px] text-slate-400">{item.questions} questões • {item.date}</span>
                </div>
              </div>
              <span className="bg-emerald-500/20 text-emerald-400 font-bold px-2 py-1 rounded text-xs border border-emerald-500/30">
                {item.score}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
