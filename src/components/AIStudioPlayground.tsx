import React, { useState, useRef } from 'react';
import { Sparkles, Play, Code2, RotateCcw, Sliders, Loader2, Bot, Copy, Check, Paperclip, Image as ImageIcon, X } from 'lucide-react';
import { GetCodeModal } from './GetCodeModal';

interface AttachedFile {
  file: File;
  previewUrl: string;
  base64Data: string;
  mimeType: string;
}

export function AIStudioPlayground() {
  const [prompt, setPrompt] = useState('');
  const [systemInstruction, setSystemInstruction] = useState('Você é um assistente de inteligência artificial focado em auxiliar estudantes a tirarem dúvidas do ENEM e vestibulares.');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGetCodeOpen, setIsGetCodeOpen] = useState(false);
  const [showParams, setShowParams] = useState(false);
  const [copied, setCopied] = useState(false);
  const [attachedFile, setAttachedFile] = useState<AttachedFile | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Parâmetros do Modelo
  const [selectedModel, setSelectedModel] = useState('gemini-1.5-flash');
  const [temperature, setTemperature] = useState(0.7);

  // Converte imagem selecionada para Base64
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione um arquivo de imagem (JPG, PNG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64Data = result.split(',')[1];
      setAttachedFile({
        file,
        previewUrl: URL.createObjectURL(file),
        base64Data,
        mimeType: file.type,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveFile = () => {
    if (attachedFile?.previewUrl) {
      URL.revokeObjectURL(attachedFile.previewUrl);
    }
    setAttachedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleExecute = async () => {
    if ((!prompt.trim() && !attachedFile) || isLoading) return;

    setIsLoading(true);
    setResponse('');

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('Chave de API não encontrada na Vercel.');
      }

      const partsPayload: any[] = [];

      // Inclui a imagem no payload se houver anexo
      if (attachedFile) {
        partsPayload.push({
          inlineData: {
            mimeType: attachedFile.mimeType,
            data: attachedFile.base64Data,
          },
        });
      }

      // Inclui a instrução do sistema e o texto do prompt
      const textContent = systemInstruction.trim()
        ? `[Instrução de Sistema: ${systemInstruction}]\n\n${prompt}`
        : prompt;

      if (textContent.trim()) {
        partsPayload.push({ text: textContent });
      }

      const apiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: partsPayload,
              },
            ],
            generationConfig: {
              temperature: temperature,
            },
          }),
        }
      );

      const data = await apiRes.json();

      if (data.error) {
        setResponse(`Erro da API: ${data.error.message}`);
      } else {
        const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Nenhuma resposta retornada.';
        setResponse(aiText);
      }
    } catch (err: any) {
      setResponse(`Erro de conexão: ${err.message || 'Verifique sua chave VITE_GEMINI_API_KEY na Vercel.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setPrompt('');
    setResponse('');
    handleRemoveFile();
  };

  const handleCopyResponse = () => {
    if (!response) return;
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Barra de Ferramentas / Topo */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
            <Sparkles size={20} />
          </div>
          <div>
            <h2 className="font-bold text-white text-base">Google AI Studio Playground</h2>
            <p className="text-xs text-slate-400">Suporte Multimodal: Texto e Análise de Imagens</p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={() => setShowParams(!showParams)}
            className={`px-3 py-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors ${
              showParams
                ? 'bg-indigo-600/20 border-indigo-500/40 text-indigo-300'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Sliders size={15} />
            Parâmetros
          </button>

          <button
            onClick={() => setIsGetCodeOpen(true)}
            className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <Code2 size={15} className="text-indigo-400" />
            Obter Código
          </button>
        </div>
      </div>

      {/* Painel de Parâmetros Ajustáveis */}
      {showParams && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Modelo Gemini</label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="gemini-1.5-flash">Gemini 1.5 Flash (Mais Rápido & Multimodal)</option>
              <option value="gemini-1.5-pro">Gemini 1.5 Pro (Mais Preciso & Multimodal)</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-medium text-slate-300">Temperatura (Criatividade)</label>
              <span className="text-xs font-mono text-indigo-400">{temperature}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="w-full accent-indigo-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* Instrução do Sistema */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
        <label className="block text-xs font-semibold text-indigo-400 uppercase tracking-wider">
          System Instruction (Instrução do Sistema)
        </label>
        <textarea
          value={systemInstruction}
          onChange={(e) => setSystemInstruction(e.target.value)}
          placeholder="Defina o comportamento e o papel da IA..."
          rows={2}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500/50 resize-none placeholder:text-slate-600"
        />
      </div>

      {/* Área Principal de Entrada / Saída */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Lado Esquerdo: Prompt e Anexo do Usuário */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between space-y-3 min-h-[300px]">
          <div className="space-y-2 flex-1 flex flex-col">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Prompt de Entrada</span>
              
              {/* Botão de Anexo de Imagem */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs text-indigo-400 hover:text-indigo-300 bg-indigo-950/60 hover:bg-indigo-900/60 px-2.5 py-1 rounded-lg border border-indigo-800/50 flex items-center gap-1.5 transition-colors"
              >
                <Paperclip size={14} />
                Anexar Imagem
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </div>

            {/* Pré-visualização da Imagem Anexada */}
            {attachedFile && (
              <div className="relative group w-fit my-1">
                <div className="flex items-center gap-2 bg-slate-950 border border-indigo-500/40 p-2 rounded-xl text-xs text-indigo-200">
                  <img
                    src={attachedFile.previewUrl}
                    alt="Preview"
                    className="w-12 h-12 object-cover rounded-lg border border-slate-800"
                  />
                  <div className="max-w-[150px] truncate">
                    <p className="font-medium truncate text-white">{attachedFile.file.name}</p>
                    <p className="text-[10px] text-slate-400">{(attachedFile.file.size / 1024).toFixed(1)} KB</p>
                  </div>
                  <button
                    onClick={handleRemoveFile}
                    className="p-1 text-slate-400 hover:text-rose-400 rounded-lg transition-colors ml-2"
                    title="Remover Imagem"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            )}

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Escreva seu prompt ou faça uma pergunta sobre a imagem anexada..."
              className="w-full flex-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-indigo-500 resize-none min-h-[160px]"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
            <button
              onClick={handleClear}
              className="px-3 py-2 text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              <RotateCcw size={14} />
              Limpar
            </button>

            <button
              onClick={handleExecute}
              disabled={isLoading || (!prompt.trim() && !attachedFile)}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/20"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Analisando...
                </>
              ) : (
                <>
                  <Play size={15} className="fill-current" />
                  Executar Prompt
                </>
              )}
            </button>
          </div>
        </div>

        {/* Lado Direito: Resposta da IA */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between min-h-[300px] relative">
          <div className="space-y-2 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Bot size={16} />
                Resposta Gerada
              </span>
              {response && (
                <button
                  onClick={handleCopyResponse}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700"
                >
                  {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  {copied ? 'Copiado' : 'Copiar'}
                </button>
              )}
            </div>

            <div className="w-full h-[230px] bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs sm:text-sm text-slate-200 font-normal overflow-y-auto whitespace-pre-wrap">
              {isLoading ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 gap-2">
                  <Loader2 size={24} className="animate-spin text-indigo-400" />
                  <span>A IA está analisando {attachedFile ? 'sua imagem e texto' : 'seu prompt'}...</span>
                </div>
              ) : response ? (
                response
              ) : (
                <span className="text-slate-600 italic">
                  Anexe uma imagem ou escreva um prompt no campo ao lado e clique em "Executar Prompt".
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Get Code */}
      <GetCodeModal
        isOpen={isGetCodeOpen}
        onClose={() => setIsGetCodeOpen(false)}
        systemInstruction={systemInstruction}
        prompt={prompt}
      />
    </div>
  );
}
