import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, MessageSquare, Bot, ArrowRight, CheckCircle2, ShieldCheck, Zap, Camera, Upload, Image as ImageIcon } from 'lucide-react';
import { GabiAvatar } from './GabiAvatar';

export interface GabiResponse {
  resposta_suporte: string;
  botao_atalho: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'gabi';
  text: string;
  botaoAtalho?: string;
  timestamp: string;
}

interface GabiAssistantModalProps {
  onClose: () => void;
  onNavigateShortcut?: (atalho: string) => void;
  initialPrompt?: string | null;
}

const FAQ_SUGGESTIONS = [
  'O que é o GabaritaAí?',
  'Como funciona o Plano Grátis?',
  'Quais as vantagens do Plano PRO?',
  'Como faço para trocar de matéria?',
  'Quanto custa a assinatura PRO?',
];

export const GabiAssistantModal: React.FC<GabiAssistantModalProps> = ({
  onClose,
  onNavigateShortcut,
  initialPrompt,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'gabi',
      text: 'Oii! 👋 Eu sou a Gabi, a assistente e guia do GabaritaAí. Estou aqui para tirar qualquer dúvida que você tiver sobre como usar o aplicativo ou sobre os nossos planos de estudo!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputQuestion, setInputQuestion] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasSentInitialPromptRef = useRef(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAskGabi = async (questionText?: string) => {
    const query = questionText || inputQuestion;
    if ((!query.trim() && !selectedImage) || isLoading) return;

    const userText = selectedImage 
      ? (query.trim() ? `[📷 Foto da Questão] ${query.trim()}` : '[📷 Foto da Questão Enviada]')
      : query.trim();

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!questionText) setInputQuestion('');
    const currentImg = selectedImage;
    setSelectedImage(null);
    setIsLoading(true);

    try {
      let gabiText = '';
      let atalho = 'nenhum';

      if (currentImg) {
        // Send image to vision solver endpoint
        const response = await fetch('/api/solve-question', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            duvida: query.trim() || 'Resolva a questão desta imagem com gabarito e explicação.',
            imagemBase64: currentImg,
          }),
        });
        const resData = await response.json();
        if (resData.success && resData.data) {
          const d = resData.data;
          if (d.foto_ilegivel) {
            gabiText = d.mensagem_erro_ilegivel || 'Ops! Não consegui ler bem o enunciado. Tente tirar outra foto mais de perto e em um ambiente iluminado! 📸';
          } else {
            gabiText = `📌 *Enunciado Identificado:* ${d.transcricao_enunciado || d.passo1_compreensao}\n\n💡 *Conceito-Chave:* ${d.conceito_chave || d.materia}\n\n📝 *Resolução:* ${d.resolucao_passo_a_passo || d.passo3_resolucao_guiada}\n\n✅ *Gabarito:* ${d.gabarito_resposta_final || d.gabarito_final}`;
          }
        } else {
          gabiText = 'Ops! Não consegui ler a imagem enviada. Tente tirar outra foto bem focada!';
        }
      } else {
        const response = await fetch('/api/gabi-support', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pergunta: query.trim() }),
        });

        const resData = await response.json();

        if (!response.ok || !resData.success) {
          throw new Error(resData.error || 'Erro ao conversar com a Gabi.');
        }

        const gabiData: GabiResponse = resData.data;
        gabiText = gabiData.resposta_suporte;
        atalho = gabiData.botao_atalho;
      }

      const gabiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'gabi',
        text: gabiText,
        botaoAtalho: atalho,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, gabiMsg]);
    } catch (error: any) {
      console.error('Erro no suporte da Gabi:', error);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'gabi',
        text: 'Assistente em manutenção rápida. Tente novamente em alguns instantes.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialPrompt && initialPrompt.trim() && !hasSentInitialPromptRef.current) {
      hasSentInitialPromptRef.current = true;
      handleAskGabi(initialPrompt.trim());
    }
  }, [initialPrompt]);

  const renderShortcutButton = (atalho?: string) => {
    if (!atalho || atalho === 'nenhum') return null;

    let label = 'Ir para a tela';
    let icon = <ArrowRight className="w-3.5 h-3.5" />;

    if (atalho === 'tela_assinatura') {
      label = '⭐ Conhecer o Plano PRO (R$ 9,90/mês)';
      icon = <Zap className="w-3.5 h-3.5 text-amber-400" />;
    } else if (atalho === 'tela_perfil') {
      label = '⚙️ Alterar Matéria nas Configurações';
      icon = <ArrowRight className="w-3.5 h-3.5" />;
    } else if (atalho === 'tela_caderno_erros') {
      label = '📓 Ver Caderno de Erros';
      icon = <ArrowRight className="w-3.5 h-3.5" />;
    }

    return (
      <button
        onClick={() => onNavigateShortcut && onNavigateShortcut(atalho)}
        className="mt-2.5 inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-extrabold shadow-sm transition cursor-pointer"
      >
        <span>{label}</span>
        {icon}
      </button>
    );
  };

  return (
    <div
      id="gabi-assistant-modal-backdrop"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        id="gabi-assistant-modal-container"
        className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-[2rem] w-full max-w-lg sm:max-w-xl md:max-w-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col h-[94vh] sm:h-[660px] max-h-[98vh] relative z-[10000]"
      >
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-gradient-to-r from-purple-900 via-slate-900 to-indigo-950 text-white flex items-center justify-between border-b border-purple-800/40 shrink-0">
          <div className="flex items-center space-x-3">
            <GabiAvatar size={42} showOnlineStatus={true} statusBadgeSize={10} />
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-sm sm:text-base font-extrabold text-white">Professora Gabi IA</h3>
                <span className="bg-purple-500/30 text-purple-200 text-[10px] font-bold px-2 py-0.5 rounded-full border border-purple-400/30">
                  Online
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-purple-200/80 font-medium line-clamp-1 sm:line-clamp-none">
                Sua Professora e Tutora Inteligente do GabaritaAí
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 sm:space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-2 sm:px-2.5 py-1 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[10px] sm:text-[11px] font-bold transition flex items-center gap-1 cursor-pointer"
              title="Minimizar Assistente"
            >
              Minimizar
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick FAQ Chips */}
        <div className="p-3 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            Pergunte à Gabi:
          </p>
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
            {FAQ_SUGGESTIONS.map((faq, idx) => (
              <button
                key={idx}
                onClick={() => handleAskGabi(faq)}
                disabled={isLoading}
                className="px-3 py-1 rounded-xl bg-white dark:bg-slate-800 hover:bg-purple-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-[11px] font-bold text-slate-700 dark:text-slate-200 whitespace-nowrap transition shadow-xs"
              >
                {faq}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-100/50 dark:bg-slate-950/60">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div className="flex items-center space-x-1 mb-1 text-[10px] text-slate-400 font-medium">
                {msg.sender === 'gabi' && (
                  <GabiAvatar size={16} className="mr-0.5" />
                )}
                <span>{msg.sender === 'user' ? 'Você' : 'Professora Gabi'}</span>
                <span>•</span>
                <span>{msg.timestamp}</span>
              </div>

              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed font-medium shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-none'
                    : msg.text.includes('Assistente em manutenção rápida')
                    ? 'bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-700/80 text-amber-900 dark:text-amber-200 rounded-bl-none'
                    : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700 rounded-bl-none'
                }`}
              >
                {msg.text.includes('Assistente em manutenção rápida') ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-1.5 font-bold text-amber-800 dark:text-amber-300">
                      <span>⚠️</span>
                      <span>Aviso do Sistema</span>
                    </div>
                    <p>{msg.text}</p>
                    <button
                      type="button"
                      onClick={() => handleAskGabi('Como posso usar o GabaritaAí?')}
                      className="mt-2 inline-flex items-center space-x-1 text-[11px] font-bold text-amber-700 dark:text-amber-300 underline hover:no-underline cursor-pointer"
                    >
                      <span>🔄 Tentar novamente</span>
                    </button>
                  </div>
                ) : (
                  <p>{msg.text}</p>
                )}

                {msg.sender === 'gabi' && renderShortcutButton(msg.botaoAtalho)}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start space-x-2">
              <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-700 text-xs text-slate-500 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-purple-500 animate-spin" />
                <span>Gabi está digitando...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Image Preview if Attached */}
        {selectedImage && (
          <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src={selectedImage} alt="Preview" className="w-10 h-10 object-cover rounded-lg border border-purple-400" />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                Foto Anexada da Questão 📷
              </span>
            </div>
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="p-1 text-rose-500 hover:text-rose-700 transition"
              title="Remover foto"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Input Footer */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAskGabi();
          }}
          className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 flex items-center space-x-2"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 p-2.5 rounded-xl font-bold transition flex items-center justify-center shrink-0"
            title="Tirar foto ou anexar imagem da questão"
          >
            <Camera className="w-4 h-4 text-purple-500" />
          </button>

          <input
            type="text"
            value={inputQuestion}
            onChange={(e) => setInputQuestion(e.target.value)}
            placeholder="Digite sua dúvida ou envie foto da questão..."
            disabled={isLoading}
            className="flex-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
          <button
            type="submit"
            disabled={isLoading || (!inputQuestion.trim() && !selectedImage)}
            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white p-2.5 rounded-xl font-bold transition flex items-center justify-center shrink-0 cursor-pointer"
            title="Enviar mensagem"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
