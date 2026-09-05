import React from 'react';
import { PrimaryTab } from './BottomNavigationBar';

export type AbaAtiva =
  | 'flashcards'
  | 'biblioteca'
  | 'catalogo'
  | 'glossario_enem'
  | 'mapas_mentais'
  | 'feynman_audio'
  | 'pilulas_conhecimento'
  | 'audio_podcasts'
  | 'auto_flashcards'
  | 'duvidas'
  | 'redacao'
  | 'c5_intervencao'
  | 'repertorio'
  | 'esquema_redacao'
  | 'radar_redacao'
  | 'advogado_diabo'
  | 'simulado_tri'
  | 'simulado_adaptativo'
  | 'reels_feed'
  | 'desafios'
  | 'caderno_erros'
  | 'corretor_gabarito'
  | 'estratégia_chute'
  | 'som_ambiente'
  | 'mascote_xp'
  | 'estatisticas_estudo'
  | 'ranking'
  | 'reta_final'
  | 'planner_rotina'
  | 'sisu_simulator'
  | 'folha_vespera'
  | 'arena_x1';

interface NavigationTabsProps {
  primaryTab: PrimaryTab;
  abaAtiva: AbaAtiva;
  setAbaAtiva: (tab: AbaAtiva) => void;
  onTabChange?: (tab: AbaAtiva) => void;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  abaAtiva,
  setAbaAtiva,
  onTabChange,
}) => {
  const handleSelect = (sub: AbaAtiva) => {
    setAbaAtiva(sub);
    if (onTabChange) onTabChange(sub);
  };

  return (
    <div className="w-full bg-slate-900/80 backdrop-blur border-b border-slate-800 px-4 py-2 overflow-x-auto flex gap-2 no-scrollbar">
      <button
        onClick={() => handleSelect('flashcards')}
        className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
          abaAtiva === 'flashcards'
            ? 'bg-indigo-600 text-white shadow-sm'
            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
        }`}
      >
        Visão Principal
      </button>
    </div>
  );
};
