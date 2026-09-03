import React, { useState } from 'react';
import { X, CheckCircle, Copy, Sparkles, ShieldCheck } from 'lucide-react';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function UpgradeModal({ isOpen, onClose, onSuccess }: UpgradeModalProps) {
  const [copied, setCopied] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isOpen) return null;

  const pixKey = "gabarita.ai.oficial@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleConfirmPayment = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      localStorage.setItem('gabarita_is_vip', 'true');
      window.dispatchEvent(new Event('storage'));
      if (onSuccess) onSuccess();
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-5 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800/50"
        >
          <X size={18} />
        </button>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-amber-500/20 border border-amber-500/40 rounded-2xl flex items-center justify-center mx-auto text-amber-400">
            <Sparkles size={24} />
          </div>
          <h2 className="text-xl font-bold text-white">Seja GabaritaAI PRO</h2>
          <p className="text-xs text-slate-400">Acesso ilimitado à Tutora Gabi, Gemini 1.5 Pro e envio de fotos de questões.</p>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-center space-y-3">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Valor da Assinatura</span>
          <div className="text-3xl font-extrabold text-amber-400">R$ 5,00 <span className="text-xs font-normal text-slate-400">/ mês</span></div>

          <div className="pt-2 border-t border-slate-800/80 space-y-1.5 text-left text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
              <span>Perguntas Ilimitadas para Tutora Gabi</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
              <span>Análise de Imagens de Exercícios</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
              <span>Sem anúncios e sem limites diários</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-medium text-slate-400">Chave PIX (E-mail):</label>
          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl p-2.5">
            <input
              type="text"
              readOnly
              value={pixKey}
              className="bg-transparent text-xs text-white flex-1 focus:outline-none select-all"
            />
            <button
              onClick={handleCopy}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 shrink-0"
            >
              {copied ? <CheckCircle size={14} className="text-emerald-400" /> : <Copy size={14} />}
              {copied ? "Copiado!" : "Copiar"}
            </button>
          </div>
        </div>

        <button
          onClick={handleConfirmPayment}
          disabled={isVerifying}
          className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold py-3 rounded-xl text-xs transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isVerifying ? "Confirmando Pagamento..." : "Já fiz o PIX - Ativar PRO"}
        </button>
      </div>
    </div>
  );
}
