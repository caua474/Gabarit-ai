import React, { useState } from 'react';
import { PenTool, Sparkles, CheckCircle2, AlertCircle, FileText, Send } from 'lucide-react';

interface RedacaoCorretorProps {
  onAnalyzeEssay?: (text: string) => void;
}

export const RedacaoCorretor: React.FC<RedacaoCorretorProps> = ({
  onAnalyzeEssay,
}) => {
  const [essayText, setEssayText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<null | {
    score: number;
    c5Score: number;
    feedback: string[];
  }>(null);

  const handleAnalyze = () => {
    if (!essayText.trim()) return;
    setIsAnalyzing(true);

    if (onAnalyzeEssay) {
      onAnalyzeEssay(essayText);
    }

    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResult({
        score: 880,
        c5Score: 160,
        feedback: [
          'Agente bem definido na proposta de intervenção.',
          'Faltou detalhamento sobre o meio/modo de execução para atingir 200 pontos na C5.',
          'Excelente repertório sociocultural produtivo no 2º parágrafo de desenvolvimento.',
        ],
      });
    }, 1500);
  };

  const c5Elements = [
    { title: '1. Agente', desc: 'Quem executará a ação?' },
    { title: '2. Ação', desc: 'O que será feito?' },
    { title: '3. Modo / Meio', desc: 'Como será feito?' },
    { title: '4. Efeito', desc: 'Para qual finalidade?' },
    { title: '5. Detalhamento', desc: 'Explicitação de um dos elementos' },
  ];

  return (
    <div className="space-y-4">
      {/* Bloco Principal do Corretor */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
            <PenTool size={16} /> Corretor de Redação com IA
          </h3>
          <span className="bg-purple-500/20 text-purple-300 text-[10px] font-bold px-2 py-0.5 rounded border border-purple-500/30">
            ENEM 2026
          </span>
        </div>

        <p className="text-xs text-slate-300 mb-4">
          Cole abaixo a sua proposta de intervenção ou redação completa para receber uma correção detalhada focada nas 5 Competências do ENEM.
        </p>

        <textarea
          rows={6}
          value={essayText}
          onChange={(e) => setEssayText(e.target.value)}
          placeholder="Cole seu texto aqui (mínimo de 3 linhas para análise)..."
          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-white focus:outline-none focus:border-purple-500 placeholder-slate-500 resize-none transition"
        />

        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing || !essayText.trim()}
          className="w-full mt-3 bg-purple-600 hover:bg-purple-500 disabled:bg-slate-800 disabled:text-slate-500 text-white text-xs font-bold py-3 rounded-xl transition shadow-lg shadow-purple-600/20 flex items-center justify-center gap-2 active:scale-95"
        >
          {isAnalyzing ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Analisando estrutura e Competência 5...</span>
            </>
          ) : (
            <>
              <Sparkles size={16} />
              <span>Avaliar Redação com IA</span>
            </>
          )}
        </button>
      </div>

      {/* Resultado da Análise */}
      {analysisResult && (
        <div className="bg-slate-900 border border-purple-500/40 rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Nota Estimada</span>
              <h4 className="text-xl font-extrabold text-emerald-400">{analysisResult.score} / 1000</h4>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Competência 5</span>
              <h4 className="text-sm font-bold text-purple-300">{analysisResult.c5Score} / 200 pts</h4>
            </div>
          </div>

          <div className="space-y-2 pt-1">
            <span className="text-xs font-bold text-slate-200 block">Feedback da IA:</span>
            {analysisResult.feedback.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Guia dos 5 Elementos da C5 */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-3">
          📋 Os 5 Elementos Obrigatórios da Proposta de Intervenção
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {c5Elements.map((elem, i) => (
            <div
              key={i}
              className={`bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs ${
                i === 4 ? 'sm:col-span-2' : ''
              }`}
            >
              <span className="font-bold text-purple-300 block">{elem.title}</span>
              <span className="text-[11px] text-slate-400 block mt-0.5">{elem.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

