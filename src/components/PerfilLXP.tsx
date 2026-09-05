import React, { useState } from 'react';
import { Trophy, Flame, Award, Zap, Star, ShieldCheck, Share2, Sparkles, CheckCircle2 } from 'lucide-react';
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
      icon: '✍️',
      title: 'Nota 1000',
      description: 'Enviou a primeira redação',
      xpReward: 200,
      unlocked: true,
      progress: '1/1 redação',
    },
    {
      id: 'arena-gladiador',
      icon: '⚔️',
      title: 'Gladiador do X1',
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
      icon: '🎴',
      title: 'Memória Blindada',
      description: 'Revisou 50 flashcards no método Leitner',
      xpReward: 120,
      unlocked: false,
      progress: '38/50 cards',
    },
  ];

  // Cálculo de progresso para o próximo nível
  const xpAtualNivel = userXP % 300;
  const progressoPercent = Math.min(100, Math.round((xpAtualNivel / 300) * 100));

  const handleShare = () => {
    const shareText = `🏆 Meu Perfil no GabaritaAí:\nNível ${level} (${levelTitle})\n⚡ ${userXP.toLocaleString('pt-BR')} XP Totais\n🔥 Sequência de ${streakDays} dias de estudos!`;
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="perfil-xp-container" className="p-4 bg-slate-950 text-white min-h-screen pb-28 max-w-3xl mx-auto">
      {/* Informações do Usuário */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 bg-amber-500 rounded-full flex items-center justify-center font-black text-slate-950 text-xl border-2 border-amber-400 shadow-md shadow-amber-500/20">
              {userName.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="absolute -bottom-1 -right-1 bg-indigo-600 text-[10px] font-black px-1.5 py-0.5 rounded-full border border-slate-900 text-white flex items-center gap-0.5">
              <span>Nv</span>
              <span>{level}</span>
            </div>
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-1.5">
              <span>{userName}</span>
              <ShieldCheck className="w-4 h-4 text-amber-400" />
            </h2>
            <p className="text-xs text-amber-400 font-semibold">
              Nível {level} • {levelTitle}
            </p>
            <p className="text-xs text-slate-400 mt-0.5 font-mono">
              {userXP.toLocaleString('pt-BR')} XP Totais
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleShare}
            className="flex-1 sm:flex-none text-xs bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 px-3 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
          >
            {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-amber-400" />}
            <span>{copied ? 'Copiado!' : 'Compartilhar'}</span>
          </button>
          {onOpenSettings && (
            <button
              type="button"
              onClick={onOpenSettings}
              className="text-xs bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white px-3 py-2 rounded-xl transition-all cursor-pointer"
            >
              Editar
            </button>
          )}
        </div>
      </div>

      {/* BARRA DE PROGRESSO DE NÍVEL */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-4 shadow-sm">
        <div className="flex justify-between items-center text-xs mb-2">
          <span className="font-semibold text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Progresso para o Nível {level + 1}
          </span>
          <span className="text-amber-400 font-bold font-mono">
            {xpAtualNivel} / 300 XP ({progressoPercent}%)
          </span>
        </div>
        <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800 p-0.5">
          <div
            className="bg-gradient-to-r from-amber-500 to-indigo-500 h-full rounded-full transition-all duration-500 shadow-sm"
            style={{ width: `${progressoPercent}%` }}
          />
        </div>
        <p className="text-[10px] text-slate-500 mt-2 text-right">
          Faltam {300 - xpAtualNivel} XP para desbloquear o próximo título de maestria.
        </p>
      </div>

      {/* CARDS RÁPIDOS DE STATUS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-orange-500/20 text-orange-400">
            <Flame className="w-4 h-4 fill-current" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Ofensiva</span>
            <span className="text-sm font-bold text-white">{streakDays} dias</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Conquistas</span>
            <span className="text-sm font-bold text-white">4 / 5</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex items-center gap-2.5 col-span-2 sm:col-span-1">
          <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
            <Zap className="w-4 h-4 fill-current" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Classificação</span>
            <span className="text-sm font-bold text-white">Liga Ouro</span>
          </div>
        </div>
      </div>

      {/* Resumo de Produtividade Semanal das Competências ENEM */}
      <div className="mb-4">
        <CardResumoProdutividadeEnem
          onNavigateToRedacao={onNavigateToRedacao}
          onNavigateToSimulados={onNavigateToSimulados}
        />
      </div>

      {/* Conquistas */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <span>🏆</span> Conquistas Desbloqueadas
          </h3>
          <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-bold">
            +670 XP acumulados
          </span>
        </div>

        <div className="space-y-2">
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
                    {!conquista.unlocked && (
                      <span className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.2 rounded font-mono">
                        Em progresso
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400 leading-tight">{conquista.description}</p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className={`text-xs font-bold ${conquista.unlocked ? 'text-amber-400' : 'text-slate-500'}`}>
                  +{conquista.xpReward} XP
                </span>
                {conquista.progress && (
                  <p className="text-[9px] text-slate-500 font-mono">{conquista.progress}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { PerfilXP };
