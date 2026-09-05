import React, { useState } from 'react';
import { Trophy, Flame, Zap, Share2, Sparkles, CheckCircle2 } from 'lucide-react';
import { CardResumoProdutividadeEnem } from './CardResumoProdutividadeEnem';

interface Achievement {
  id: string;
  icon: string;
  title: string;
  description: string;
  xpReward: number;
  unlocked: boolean;
  progress?: string;
}

interface PerfilXPProps {
  userName?: string;
  userXP?: number;
  level?: number;
  levelTitle?: string;
  streakDays?: number;
  onOpenSettings?: () => void;
  onNavigateToRedacao?: () => void;
  onNavigateToSimulados?: () => void;
}

export default function PerfilXP({
  userName = 'Estudante ENEM',
  userXP = 1250,
  level = 5,
  levelTitle = 'Mestre dos Simulados',
  streakDays = 7,
  onOpenSettings,
  onNavigateToRedacao,
  onNavigateToSimulados,
}: PerfilXPProps) {
  const [copied, setCopied] = useState(false);

  const conquistas: Achievement[] = [
    {
      id: 'streak-7',
      icon: '🔥',
      title: 'Fogo nos Estudos',
      description: 'Estudou 7 dias seguidos',
      xpReward: 100,
      unlocked: true,
      progress: '7/7 dias',
    },
    {
      id: 'redacao-1000',
      icon: '📝',
      title: 'Nota 1000',
      description: 'Enviou a primeira redação',
      xpReward: 200,
      unlocked: true,
      progress: '1/1 redação',
    },
    {
      id: 'arena-gladiador',
      icon: '⚔️',
      title: 'Gladiador de X1',
      description: 'Venceu 3 duelos na Arena X1',
      xpReward: 150,
      unlocked: true,
      progress: '3/3 vitórias',
    },
    {
      id: 'simulado-tri',
      icon: '📊',
      title: 'Gabaritando o TRI',
      description: 'Completou um simulado com alta coerência',
      xpReward: 250,
      unlocked: true,
      progress: '100% concluído',
    },
    {
      id: 'mestre-leitner',
      icon: '🧠',
      title: 'Memória Blindada',
      description: 'Revisou 50 Flashcards no método Leitner',
      xpReward: 120,
      unlocked: false,
      progress: '32/50 flashcards',
    },
  ];

  const handleShare = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6 text-slate-100">
      {/* Header do Perfil */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-2xl">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{userName}</h2>
              <p className="text-sm text-indigo-400 font-medium">{levelTitle} • Nível {level}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all"
            >
              <Share2 className="w-4 h-4 text-indigo-400" />
              {copied ? 'Copiado!' : 'Compartilhar'}
            </button>
          </div>
        </div>

        {/* Métricas rápidas */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800">
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3">
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <Sparkles className="w-4 h-4" />
              <span className="text-[11px] text-slate-400 uppercase font-semibold">XP Total</span>
            </div>
            <span className="text-lg font-bold text-white">{userXP} XP</span>
          </div>

          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3">
            <div className="flex items-center gap-2 text-orange-400 mb-1">
              <Flame className="w-4 h-4 fill-current" />
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Ofensiva</span>
            </div>
            <span className="text-lg font-bold text-white">{streakDays} Dias</span>
          </div>

          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3">
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <Trophy className="w-4 h-4" />
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Conquistas</span>
            </div>
            <span className="text-lg font-bold text-white">4 / 5</span>
          </div>

          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3">
            <div className="flex items-center gap-2 text-indigo-400 mb-1">
              <Zap className="w-4 h-4 fill-current" />
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Classificação</span>
            </div>
            <span className="text-lg font-bold text-white">Liga Ouro</span>
          </div>
        </div>
      </div>

      {/* Resumo de Produtividade */}
      {CardResumoProdutividadeEnem && (
        <CardResumoProdutividadeEnem
          onNavigateToRedacao={onNavigateToRedacao}
          onNavigateToSimulados={onNavigateToSimulados}
        />
      )}

      {/* Seção de Conquistas */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            🏆 Conquistas Desbloqueadas
          </h3>
          <span className="text-xs bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full font-bold">
            +670 XP acumulados
          </span>
        </div>

        <div className="space-y-3">
          {conquistas.map((conquista) => (
            <div
              key={conquista.id}
              className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                conquista.unlocked
                  ? 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  : 'bg-slate-950/40 border-slate-900 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900 border border-slate-800">
                  {conquista.icon}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-slate-200">{conquista.title}</p>
                    {conquista.unlocked && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">{conquista.description}</p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className={`text-xs font-bold ${conquista.unlocked ? 'text-amber-400' : 'text-slate-500'}`}>
                  +{conquista.xpReward} XP
                </span>
                {conquista.progress && (
                  <p className="text-[10px] text-slate-500 font-mono">{conquista.progress}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

