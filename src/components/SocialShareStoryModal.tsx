import React from 'react';

interface SocialShareStoryModalProps {
  type: string;
  data: any;
  onClose: () => void;
}

export const SocialShareStoryModal: React.FC<SocialShareStoryModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 space-y-4 text-center">
        <h3 className="text-lg font-bold text-white">Compartilhar no Story</h3>
        <p className="text-sm text-slate-300">Mostre seu progresso e sequência para seus amigos.</p>
        <button
          onClick={onClose}
          className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium transition"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};
