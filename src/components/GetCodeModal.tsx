import React, { useState } from 'react';
import { X, Copy, Check, Code2 } from 'lucide-react';

interface GetCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  systemInstruction: string;
  prompt: string;
}

export function GetCodeModal({ isOpen, onClose, systemInstruction, prompt }: GetCodeModalProps) {
  const [activeTab, setActiveTab] = useState<'curl' | 'js' | 'python'>('curl');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const fullPrompt = `${systemInstruction ? systemInstruction + '\n\n' : ''}${prompt}`;

  const codeSnippets = {
    curl: `curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=SUA_CHAVE_API" \\
  -H 'Content-Type: application/json' \\
  -X POST \\
  -d '{
    "contents": [{
      "parts":[{"text": "${fullPrompt.replace(/\n/g, '\\n').replace(/"/g, '\\"')}"}]
    }]
  }'`,

    js: `import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("SUA_CHAVE_API");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function run() {
  const prompt = \`${fullPrompt}\`;
  const result = await model.generateContent(prompt);
  console.log(result.response.text());
}

run();`,

    python: `import google.generativeai as genai

genai.configure(api_key="SUA_CHAVE_API")
model = genai.GenerativeModel('gemini-1.5-flash')

response = model.generate_content("""${fullPrompt}""")
print(response.text)`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full flex flex-col shadow-2xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm">
            <Code2 size={18} />
            Exportar Código
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X size={18} />
          </button>
        </div>

        <div className="flex border-b border-slate-800 bg-slate-950/30 px-4 pt-2 gap-2">
          {(['curl', 'js', 'python'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 text-xs font-medium rounded-t-lg transition-colors ${
                activeTab === tab
                  ? 'bg-slate-800 text-indigo-400 border-t border-x border-slate-700'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab === 'curl' ? 'cURL' : tab === 'js' ? 'JavaScript' : 'Python'}
            </button>
          ))}
        </div>

        <div className="p-4 relative">
          <button
            onClick={handleCopy}
            className="absolute top-6 right-6 bg-slate-800 hover:bg-slate-700 text-slate-200 p-2 rounded-lg text-xs flex items-center gap-1.5 border border-slate-700 transition-colors"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            {copied ? 'Copiado!' : 'Copiar'}
          </button>
          <pre className="bg-slate-950 p-4 rounded-xl text-xs text-slate-300 font-mono overflow-x-auto border border-slate-800/80 max-h-72">
            <code>{codeSnippets[activeTab]}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

