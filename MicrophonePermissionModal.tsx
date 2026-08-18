import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, ShieldCheck, X } from 'lucide-react';

export interface MicrophonePermissionModalProps {
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
    <AnimatePresence>
      <div
        id="microphone-permission-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in"
      >
        <motion.div
          id="microphone-permission-card"
          initial={{ scale: 0.92, opacity: 0, y: 12 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          transition={{ type: 'spring', stiffness: 380, damping: 25 }}
          className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-md p-6 sm:p-7 space-y-6 border border-slate-200/80 dark:border-slate-800 shadow-2xl relative"
        >
          {/* Close button */}
          <button
            id="mic-modal-close-btn"
            type="button"
            onClick={onDisallow}
            className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Icon & Title */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center shrink-0 text-indigo-600 dark:text-indigo-400 shadow-xs">
              <Mic className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[11px] font-black uppercase text-indigo-600 dark:text-indigo-400 tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Permissão de Áudio
              </span>
              <h3
                id="mic-permission-title"
                className="text-lg font-black text-slate-900 dark:text-white leading-tight"
              >
                Solicitação de acesso ao microfone
              </h3>
            </div>
          </div>

          {/* Body Text */}
          <p
            id="mic-permission-body"
            className="text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed"
          >
            Este aplicativo solicita acesso ao microfone para funcionar corretamente. Deseja permitir o acesso ao microfone?
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-2">
            {/* Button 1: Disallow */}
            <button
              id="mic-permission-disallow-btn"
              type="button"
              onClick={onDisallow}
              className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition active:scale-95 cursor-pointer text-center"
            >
              Não permitir
            </button>

            {/* Button 2: Allow Microphone access */}
            <button
              id="mic-permission-allow-btn"
              type="button"
              onClick={onAllow}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md shadow-indigo-600/20 transition active:scale-95 cursor-pointer flex items-center justify-center gap-2 text-center"
            >
              <Mic className="w-4 h-4" />
              Permitir acesso ao microfone
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
