import React, { useState } from 'react';
import { Sliders, Sparkles, Send, Trash2, Bot, User } from 'lucide-react';

export function AIStudioPlayground() {
  const [model, setModel] = useState('gemini-1.5-flash');
  const [systemInstruction, setSystemInstruction] = useState('');
  const [temperature, setTemperature] = useState(1.0);
  const [topP, setTopP] = useState(0.95);
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([]);
  const [showSidebar, setShowSidebar] = useState(false);

  const handleSend = () => {
    if (!prompt.trim()) return;
    const newMessages = [...messages, { role: 'user' as const, text: prompt }];
    setMessages(newMessages);
    setPrompt('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: `[Resposta simulada do ${model} com temperatura ${temperature}]\nSua instrução foi processada com sucesso no Playground.`,
        },
      ]);
    }, 800);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[600px]">
      <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center pb-4 border-b border-slate-800 mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="text-indigo-400" size={20} />
              <h2 className="font-bold text-white text-lg">Google AI Studio Playground</h2>
            </div>
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="lg:hidden bg-slate-800 text-slate-300 px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 border border-slate-700"
            >
              <Sliders size={14} />
              Parâmetros
            </button>
          </div>

          <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2 mb-4">
            {messages.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <Bot size={40} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">Escreva um prompt abaixo para testar o comportamento do modelo.</p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl text-sm ${
                    msg.role === 'user'
                      ? 'bg-indigo-600/20 border border-indigo-500/30 text-indigo-100 ml-auto max-w-[85%]'
                      : 'bg-slate-800/80 border border-slate-700/60 text-slate-200 mr-auto max-w-[85%]'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1 text-xs text-slate-400">
                    {msg.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                    <span className="capitalize">{msg.role}</span>
                  </div>
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-slate-800">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Digite seu prompt de teste..."
            rows={3}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm resize-none"
          />
          <div className="flex justify-between items-center">
            <button
              onClick={() => setMessages([])}
              className="text-slate-500 hover:text-rose-400 p-2 text-xs flex items-center gap-1 transition-colors"
            >
              <Trash2 size={14} /> Limpar
            </button>
            <button
              onClick={handleSend}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
            >
              <Send size={16} /> Executar
            </button>
          </div>
        </div>
      </div>

      <div
        className={`bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-6 lg:block ${
          showSidebar ? 'block' : 'hidden'
        }`}
      >
        <div className="flex items-center gap-2 text-white font-bold text-sm pb-3 border-b border-slate-800">
          <Sliders size={16} className="text-indigo-400" />
          <span>Configurações do Modelo</span>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-400">Modelo</label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
            <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-400">System Instructions</label>
          <textarea
            value={systemInstruction}
            onChange={(e) => setSystemInstruction(e.target.value)}
            placeholder="Defina as regras ou personalidade do modelo..."
            rows={4}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 resize-none"
          />
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Temperature</span>
              <span className="text-indigo-400 font-mono">{temperature}</span>
            </div>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="w-full accent-indigo-500 bg-slate-950"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Top-P</span>
              <span className="text-indigo-400 font-mono">{topP}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={topP}
              onChange={(e) => setTopP(parseFloat(e.target.value))}
              className="w-full accent-indigo-500 bg-slate-950"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
