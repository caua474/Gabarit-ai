import React from 'react';

export const ProSubscriptionModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-amber-500/30 rounded-2xl max-w-md w-full p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-amber-400">GabaritaAí PRO</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        </div>
        <p className="text-sm text-slate-300">Acesso ilimitado a correções de redação, simulados TRI e Profa. Gabi.</p>
        <button
          onClick={onClose}
          className="w-full py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold rounded-xl text-sm transition"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};
