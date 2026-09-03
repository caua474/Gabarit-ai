import React, { useState } from 'react';
import { X, CheckCircle2, Zap, Copy, Check, QrCode, Sparkles } from 'lucide-react';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function UpgradeModal({ isOpen, onClose, onSuccess }: UpgradeModalProps) {
  const [copied, setCopied] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isOpen) return null;

  // Substitua pela sua chave Pix real (CPF, E-mail ou Aleatória)
  const pixKey = "suachavepix@gabaritaai.com.br";

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleConfirmPayment = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      if (onSuccess) onSuccess();
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-indigo-500/30 rounded-3xl max-w-md w-full p-6 shadow-2xl relative overflow-hidden">
        {/* Efeito Glow de Fundo */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-xl bg-slate-800/50 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Header do Modal */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold">
            <Sparkles size={14} />
            GabaritaAI Pro
          </div>
          <h2 className="text-2xl font-extrabold text-white">Desbloqueie Acesso Ilimitado</h2>
          <p className="text-xs text-slate-400">Estude sem interrupções com o poder total da IA</p>
        </div>

        {/* Preço e Benefícios */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 mb-6 space-y-3">
          <div className="flex items-baseline justify-between border-b border-slate-800/80 pb-3">
            <div>
              <span className="text-3xl font-black text-white">R$ 5,00</span>
              <span className="text-xs text-slate-400"> / mês</span>
            </div>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-medium">
              Cancelamento simples
            </span>
          </div>

          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-indigo-400 shrink-0" />
              Perguntas ilimitadas para a Tutora Gabi
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-indigo-400 shrink-0" />
              Upload de fotos e PDFs de questões
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-indigo-400 shrink-0" />
              Acesso total ao Playground e gerador de código
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-indigo-400 shrink-0" />
              Respostas com modelo Gemini 1.5 Pro ultra-rápido
            </li>
          </ul>
        </div>

        {/* Área do Pagamento Pix */}
        <div className="space-y-3">
          <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider text-center">
            Pagamento Instantâneo via PIX
          </label>

          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl p-2.5">
            <QrCode size={20} className="text-indigo-400 shrink-0" />
            <input
              type="text"
              readOnly
              value={pixKey}
              className="bg-transparent text-xs text-slate-300 flex-1 font-mono focus:outline-none truncate"
            />
            <button
              onClick={handleCopyPix}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors shrink-0"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copiado!' : 'Copiar'}
            </button>
          </div>

          <button
            onClick={handleConfirmPayment}
            disabled={isVerifying}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 disabled:opacity-50"
          >
            <Zap size={16} className="fill-current" />
            {isVerifying ? 'Confirmando Pagamento...' : 'Já fiz o Pix / Ativar VIP agora'}
          </button>
        </div>
      </div>
    </div>
  );
}
