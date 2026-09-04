import React from 'react';
import { Swords, Trophy, Flame, Zap, Share2, Users } from 'lucide-react';

interface ArenaX1SectionProps {
  onStartMatch?: () => void;
  onCreateRoom?: () => void;
}

export const ArenaX1Section: React.FC<ArenaX1SectionProps> = ({
  onStartMatch,
  onCreateRoom,
}) => {
  return (
    <div className="space-y-4">
      {/* Banner do Ranking e Stats */}
      <div className="bg-gradient-to-br from-indigo-900/60 to-purple-900/40 border border-indigo-500/30 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-purple-300 flex items-center gap-1">
            ⚔️ Arena X1 <span className="bg-red-500/20 text-red-400 text-[9px] px-1.5 py-0.5 rounded uppercase font-extrabold ml-1 animate-pulse">AO VIVO</span>
          </span>
        </div>
        <p className="text-xs text-slate-300">
          Duelos e quizzes competitivos em tempo real entre vestibulandos de todo o Brasil.
        </p>

        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold block uppercase">Patente</span>
            <span className="text-xs font-bold text-amber-400 mt-0.5 block">
              👑 Bixo Federal
            </span>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold block uppercase">Vitórias</span>
            <span className="text-xs font-bold text-emerald-400 mt-0.5 block">
              🏆 28V / 100
            </span>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold block uppercase">Streak</span>
            <span className="text-xs font-bold text-orange-400 mt-0.5 block">
              🔥 7 Seguidas
            </span>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold block uppercase">Saldo XP</span>
            <span className="text-xs font-bold text-purple-400 mt-0.5 block">
              ⚡ 4000 XP
            </span>
          </div>
        </div>

        <button 
          onClick={onStartMatch}
          className="w-full mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-extrabold py-3 rounded-xl transition shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 active:scale-95"
        >
          <Swords size={16} /> Encontrar Oponente Aleatório
        </button>
      </div>

      {/* Desafio com Amigos */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
            <Users size={16} className="text-purple-400" /> Desafio 1v1 com Amigos
          </h4>
          <span className="text-[10px] bg-indigo-500/20 text-indigo-300 font-bold px-2 py-0.5 rounded border border-indigo-500/30">
            SALA PRIVADA
          </span>
        </div>
        <p className="text-xs text-slate-400 mb-4">
          Crie uma sala exclusiva e envie o link no WhatsApp para disputar quem gabarita mais rápido.
        </p>
        <button 
          onClick={onCreateRoom}
          className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-2 active:scale-95"
        >
          <Share2 size={14} /> Criar Sala Privada
        </button>
      </div>
    </div>
  );
};

