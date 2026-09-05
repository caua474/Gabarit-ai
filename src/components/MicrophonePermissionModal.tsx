import React from 'react';

interface MicrophonePermissionModalProps {
  isOpen: boolean;
  onAllow: () => void;
  onDisallow: () => void;
}

export const MicrophonePermissionModal: React.FC<MicrophonePermissionModalProps> = ({
  isOpen,
  onAllow,
  onDisallow,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 text-center">
        <h3 className="text-lg font-bold text-white">Permissão de Microfone</h3>
        <p className="text-sm text-slate-300">Necessário para usar a Técnica Feynman por comando de voz.</p>
        <div className="flex gap-2">
          <button onClick={onDisallow} className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm transition">
            Agora não
          </button>
          <button onClick={onAllow} className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm transition font-medium">
            Permitir
          </button>
        </div>
      </div>
    </div>
  );
};
