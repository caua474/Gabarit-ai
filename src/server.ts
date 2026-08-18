import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY não configurada no servidor.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// 1. SYSTEM INSTRUCTION FOR TEXT SUMMARIZATION & FLASHCARDS
const SUMMARIZE_SYSTEM_INSTRUCTION = `Você é o Assistente Inteligente de Estudos e Textos, um especialista em transformar textos longos e difíceis em materiais práticos.
Sempre que o usuário enviar um texto, artigo ou anotações, responda usando obrigatoriamente esta estrutura e gere os elementos:

⚡ Resumo Direto: Explique o tema central em no máximo 3 frases simples.
📌 Pontos Principais: Destaque em tópicos (bullet points) os 4 aspectos mais importantes para memorizar.
📝 3 Perguntas de Teste: Crie 3 perguntas rápidas sobre o conteúdo (com as respostas no final) para o usuário praticar.
🎴 Flashcards Interativos: Crie de 5 a 8 flashcards com uma pergunta ou termo na frente e a resposta ou definição no verso para memorização ativa.

Tom de voz: Claro, motivador, objetivo e muito fácil de entender.
Gere a resposta em Português (Brasil).`;

app.post("/api/summarize", async (req, res) => {
  try {
    const { text, focusTopic } = req.body;

    if (!text || typeof text !== "string" || !text.trim()) {
      return res.status(400).json({ error: "O texto fornecido está vazio ou é inválido." });
    }

    const ai = getGenAI();

    let userPrompt = `Por favor, analise e transforme o seguinte texto em um material prático de estudo e flashcards:\n\n"""\n${text.trim()}\n"""`;
    if (focusTopic) {
      userPrompt += `\n\nFoco especial do aluno: ${focusTopic}`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: userPrompt,
      config: {
        systemInstruction: SUMMARIZE_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            rawText: {
              type: Type.STRING,
              description: "Texto em Markdown estruturado.",
            },
            resumoDireto: {
              type: Type.STRING,
              description: "O resumo direto do texto em no máximo 3 frases simples e claras.",
            },
            pontosPrincipais: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Exatamente 4 tópicos principais fundamentais para memorização.",
            },
            perguntas: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  pergunta: { type: Type.STRING, description: "Texto da pergunta de teste" },
                  resposta: { type: Type.STRING, description: "Resposta correta e direta da pergunta" },
                },
                required: ["pergunta", "resposta"],
              },
              description: "Exatamente 3 perguntas rápidas para teste com respostas.",
            },
            flashcards: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  frente: { type: Type.STRING, description: "Pergunta ou conceito/termo principal do cartão" },
                  verso: { type: Type.STRING, description: "Resposta ou definição explicativa do verso do cartão" },
                },
                required: ["frente", "verso"],
              },
              description: "De 5 a 8 flashcards para memorização ativa.",
            },
          },
          required: ["rawText", "resumoDireto", "pontosPrincipais", "perguntas", "flashcards"],
        },
      },
    });

    const jsonText = response.text || "{}";
    const data = JSON.parse(jsonText);

    res.json({
      success: true,
      data,
    });
  } catch (error: any) {
    console.error("Erro no processamento do texto:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Ocorreu um erro ao processar o texto com o assistente.",
    });
  }
});

// 2. SYSTEM INSTRUCTION FOR GABARITAAÍ MODE 1 (PLANO DE ESTUDO OU CONTEÚDO)
const GABARITAAI_PLANO_SYSTEM_INSTRUCTION = `Você é o motor de inteligência artificial e backend do aplicativo "GabaritaAí", uma plataforma de estudos inteligente para alunos do Ensino Fundamental, Médio e ENEM.

Sua missão é receber as solicitações do usuário e retornar EXCLUSIVAMENTE um objeto JSON válido, sem qualquer texto introdutório, explicações ou marcadores fora da estrutura JSON.

### MODO 1: Quando o usuário pedir um Plano de Estudos ou Conteúdo
Retorne o JSON seguindo exatamente esta estrutura:
{
  "tipo_resposta": "plano_estudo",
  "materia": "Nome da Matéria",
  "objetivo": "Objetivo do Aluno",
  "resumo_rapido": "Resumo em até 3 frases bem diretas e didáticas.",
  "plano_hoje": [
    {
      "etapa": 1,
      "atividade": "Teoria",
      "duracao_minutos": 15,
      "descricao": "O que revisar primeiro"
    },
    {
      "etapa": 2,
      "atividade": "Prática",
      "duracao_minutos": 15,
      "descricao": "O que praticar em seguida"
    }
  ],
  "questoes": [
    {
      "id": 1,
      "pergunta": "Enunciado da questão prática",
      "opcoes": [
        "A) Opção 1",
        "B) Opção 2",
        "C) Opção 3",
        "D) Opção 4"
      ],
      "resposta_correta": "A) Opção 1",
      "explicacao_didatica": "Explicação simples e sem jargões do motivo da resposta estar certa."
    }
  ]
}`;

app.post("/api/tutor-plan", async (req, res) => {
  try {
    const { materia, serieAno, objetivo, tempoDisponivel } = req.body;

    if (!materia || !objetivo || !tempoDisponivel) {
      return res.status(400).json({ error: "Preencha a matéria, objetivo e tempo disponível." });
    }

    const ai = getGenAI();

    const prompt = `Dados do Aluno para Planejamento de Estudos no GabaritaAí:
- Matéria: ${materia}
- Série/Ano: ${serieAno || "Não especificado"}
- Objetivo: ${objetivo} (ex: ENEM, Vestibular, Prova da Escola, Concurso)
- Tempo Disponível por Dia: ${tempoDisponivel}

Por favor, elabore o plano de estudos no MODO 1 (plano_estudo) com resumo_rapido, plano_hoje dividindo o tempo disponível em etapas, e questões práticas com alternativas e explicação didática.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: GABARITAAI_PLANO_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tipo_resposta: { type: Type.STRING },
            materia: { type: Type.STRING },
            objetivo: { type: Type.STRING },
            resumo_rapido: { type: Type.STRING },
            plano_hoje: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  etapa: { type: Type.INTEGER },
                  atividade: { type: Type.STRING },
                  duracao_minutos: { type: Type.INTEGER },
                  descricao: { type: Type.STRING },
                },
                required: ["etapa", "atividade", "duracao_minutos", "descricao"],
              },
            },
            questoes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.INTEGER },
                  pergunta: { type: Type.STRING },
                  opcoes: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  resposta_correta: { type: Type.STRING },
                  explicacao_didatica: { type: Type.STRING },
                },
                required: ["id", "pergunta", "opcoes", "resposta_correta", "explicacao_didatica"],
              },
            },
          },
          required: ["tipo_resposta", "materia", "objetivo", "resumo_rapido", "plano_hoje", "questoes"],
        },
      },
    });

    const parsedData = JSON.parse(response.text || "{}");

    // Format for frontend mapping
    const cronogramaFormatted = (parsedData.plano_hoje || []).map((item: any) => ({
      etapa: `Etapa ${item.etapa}: ${item.atividade}`,
      duracao: `${item.duracao_minutos} min`,
      descricao: item.descricao,
    }));

    const questoesFormatted = (parsedData.questoes || []).map((q: any) => ({
      pergunta: q.pergunta,
      opcoes: q.opcoes || [],
      respostaCorreta: q.resposta_correta,
      explicacaoGabarito: q.explicacao_didatica,
    }));

    const formattedOutput = {
      ...parsedData,
      aulaResumo: parsedData.resumo_rapido || "Resumo preparado com sucesso para os seus estudos!",
      cronograma: cronogramaFormatted,
      questoes: questoesFormatted,
      gabaritoComentado: "GabaritaAí: Foco na resolução prática para gabaritar na prova!",
    };

    res.json({
      success: true,
      data: formattedOutput,
    });
  } catch (error: any) {
    console.error("Erro ao gerar plano do tutor:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Erro ao gerar o plano de estudos do tutor.",
    });
  }
});

// 3. SYSTEM INSTRUCTION FOR GABARITAAÍ MODE 2 (TIRA-DÚVIDAS)
const GABARITAAI_DUVIDAS_SYSTEM_INSTRUCTION = `Você é o motor de inteligência artificial e backend do aplicativo "GabaritaAí", uma plataforma de estudos inteligente para alunos do Ensino Fundamental, Médio e ENEM.

Sua missão é receber as solicitações do usuário e retornar EXCLUSIVAMENTE um objeto JSON válido, sem qualquer texto introdutório, explicações ou marcadores fora da estrutura JSON.

### MODO 2: Quando o usuário fizer uma dúvida direta ("Não entendi X", "Me explica Y")
Retorne o JSON seguindo exatamente esta estrutura:
{
  "tipo_resposta": "tira_duvidas",
  "analogia_simples": "Explicação do assunto usando uma comparação fácil do dia a dia.",
  "passo_a_passo": "Resolução do problema dividida em etapas pequenas.",
  "dica_de_ouro": "Um macete prático para nunca mais esquecer este assunto na hora da prova."
}`;

app.post("/api/explain-eli5", async (req, res) => {
  try {
    const { duvida } = req.body;

    if (!duvida || typeof duvida !== "string" || !duvida.trim()) {
      return res.status(400).json({ error: "Envie sua dúvida ou conceito para explicação." });
    }

    const ai = getGenAI();

    const prompt = `Dúvida do aluno no GabaritaAí:\n"${duvida.trim()}"\n\nPor favor, responda no MODO 2 (tira_duvidas) com analogia_simples, passo_a_passo e dica_de_ouro.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: GABARITAAI_DUVIDAS_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tipo_resposta: { type: Type.STRING },
            analogia_simples: { type: Type.STRING },
            passo_a_passo: {
              type: Type.STRING,
              description: "Resolução do problema dividida em etapas pequenas.",
            },
            dica_de_ouro: { type: Type.STRING },
          },
          required: ["tipo_resposta", "analogia_simples", "passo_a_passo", "dica_de_ouro"],
        },
      },
    });

    const parsedData = JSON.parse(response.text || "{}");

    // Map to frontend expected format
    const passoAPassoArray = typeof parsedData.passo_a_passo === "string"
      ? parsedData.passo_a_passo.split("\n").filter((line: string) => line.trim().length > 0)
      : Array.isArray(parsedData.passo_a_passo)
      ? parsedData.passo_a_passo
      : [parsedData.passo_a_passo];

    const formattedOutput = {
      ...parsedData,
      analogiaSimples: parsedData.analogia_simples,
      passoAPasso: passoAPassoArray.length > 0 ? passoAPassoArray : ["Revise a teoria principal.", "Pratique com exercícios curtos.", "Fixe os conceitos-chave."],
      dicaDeOuro: parsedData.dica_de_ouro,
    };

    res.json({
      success: true,
      data: formattedOutput,
    });
  } catch (error: any) {
    console.error("Erro na explicação ELI5:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Erro ao gerar a explicação simplificada.",
    });
  }
});

// SYSTEM INSTRUCTION FOR PERSONALIZED KNOWLEDGE PILL
const PERSONALIZED_PILL_SYSTEM_INSTRUCTION = `Você é o especialista em Pílulas de Conhecimento e Hacks de Prova do GabaritaAí.
Sua função é analisar o histórico de estudos do aluno, identificar os tópicos de menor desempenho e criar uma 'Pílula de Conhecimento' altamente memorável de 30 segundos para o dia seguinte.

A pílula deve conter:
- categoria: Nome da matéria (Redação, Matemática, Física, Química, Biologia, História, Geografia, Filosofia, Gramática, etc.)
- topico: Tópico específico de menor desempenho analisado
- titulo: Um título atrativo, direto e memorável (ex: "Hack da Porcentagem em 5s", "Macete do Chuveiro Elétrico")
- duracaoLeitura: "30 segundos"
- diagnosticoHistorico: Breve explicação do porquê essa pílula foi sugerida com base nos erros do aluno
- resumoCurto: Explicação concisa em 2 frases simples
- maceteOuro: O macete ou regra de ouro INFALÍVEL para não errar mais na prova
- exemploPratico: Um exemplo curto numérico ou prático de aplicação
- desafioFixacao: Uma pergunta ultra-rápida de 1 linha com opções para testar na hora
- desafioGabarito: A resposta correta com explicação de 1 frase`;

app.post("/api/personalized-knowledge-pill", async (req, res) => {
  try {
    const { lowestSubjects, customTopic } = req.body;
    const ai = getGenAI();

    const prompt = `Analise os tópicos com menor desempenho do aluno e crie a Pílula de Conhecimento ideal para amanhã:
Tópicos/Matérias com menor desempenho: ${JSON.stringify(lowestSubjects || [])}
${customTopic ? `Tópico específico solicitado pelo aluno: ${customTopic}` : ''}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: PERSONALIZED_PILL_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            categoria: { type: Type.STRING },
            topico: { type: Type.STRING },
            titulo: { type: Type.STRING },
            duracaoLeitura: { type: Type.STRING },
            diagnosticoHistorico: { type: Type.STRING },
            resumoCurto: { type: Type.STRING },
            maceteOuro: { type: Type.STRING },
            exemploPratico: { type: Type.STRING },
            desafioFixacao: {
              type: Type.OBJECT,
              properties: {
                pergunta: { type: Type.STRING },
                opcoes: { type: Type.ARRAY, items: { type: Type.STRING } },
                respostaCorreta: { type: Type.STRING },
                explicacao: { type: Type.STRING },
              },
              required: ["pergunta", "opcoes", "respostaCorreta", "explicacao"],
            },
          },
          required: ["categoria", "topico", "titulo", "duracaoLeitura", "diagnosticoHistorico", "resumoCurto", "maceteOuro", "exemploPratico", "desafioFixacao"],
        },
      },
    });

    const data = JSON.parse(response.text || "{}");
    res.json({ success: true, data });
  } catch (error: any) {
    console.error("Erro ao gerar pílula personalizada:", error);
    res.status(500).json({ success: false, error: error.message || "Erro ao gerar pílula com IA." });
  }
});

// 4. SYSTEM INSTRUCTION FOR GABARITAAÍ DAY & NIGHT MODE SELECTION
const GABARITAAI_DAY_NIGHT_SYSTEM_INSTRUCTION = `Você é o motor de inteligência artificial do aplicativo "GabaritaAí".

Analise a mensagem do usuário e escolha EXCLUSIVAMENTE um dos modos abaixo:

---

🔴 REGRA DE SELEÇÃO DE MODO:
1. SE a mensagem mencionar "dia", "manhã", "planejamento", "cronograma", "o que estudar hoje" ou pedir um plano de estudos:
   --> Use obrigatoriamente o MODO DIA.

2. SE a mensagem mencionar "noite", "revisão", "resumo do dia", "o que aprendi hoje" ou pedir um teste/revisão noturna:
   --> Use obrigatoriamente o MODO NOITE.

---

### MODO DIA (Planejamento e Foco):
Retorne o JSON:
{
  "modo_ativo": "modo_dia",
  "saudacao": "Bom dia! Vamos preparar seus estudos de hoje.",
  "meta_do_dia": "Descrição da meta diária",
  "plano_estudo": ["Atividade 1", "Atividade 2"]
}

---

### MODO NOITE (Revisão e Consolidação):
Retorne o JSON:
{
  "modo_ativo": "modo_noite",
  "saudacao": "Boa noite! Hora de revisar o que você aprendeu.",
  "resumo_noturno": "Resumo rápido para fixar antes de dormir",
  "perguntas_revisao": ["Pergunta 1", "Pergunta 2"]
}`;

app.post("/api/day-night-mode", async (req, res) => {
  try {
    const { mensagem } = req.body;

    if (!mensagem || typeof mensagem !== "string" || !mensagem.trim()) {
      return res.status(400).json({ error: "Envie sua mensagem para a inteligência GabaritaAí." });
    }

    const ai = getGenAI();

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Mensagem do aluno: "${mensagem.trim()}"`,
      config: {
        systemInstruction: GABARITAAI_DAY_NIGHT_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            modo_ativo: {
              type: Type.STRING,
              description: "modo_dia ou modo_noite",
            },
            saudacao: { type: Type.STRING },
            meta_do_dia: { type: Type.STRING },
            plano_estudo: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            resumo_noturno: { type: Type.STRING },
            perguntas_revisao: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: ["modo_ativo", "saudacao"],
        },
      },
    });

    const parsedData = JSON.parse(response.text || "{}");

    res.json({
      success: true,
      data: parsedData,
    });
  } catch (error: any) {
    console.error("Erro no MODO DIA/NOITE GabaritaAí:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Erro no processamento do Modo Dia/Noite do GabaritaAí.",
    });
  }
});

// 5. SYSTEM INSTRUCTION FOR GABI (VIRTUAL ASSISTANT & APP GUIDE)
const GABI_SUPPORT_SYSTEM_INSTRUCTION = `Você é a "Gabi", a assistente de suporte e guia oficial do aplicativo GabaritaAí. Sua função é ajudar os alunos com dúvidas sobre como usar o app, planos, preços e navegação.

REGRAS E BASE DE CONHECIMENTO:

1. SOBRE O APP:
   - GabaritaAí: App de estudos com tutor de IA e cronograma automático para Fundamental II, Médio, ENEM e Vestibulares.

2. PLANOS E PREÇOS:
   - Plano Grátis: 5 perguntas por dia para a IA, cronograma básico e questões limitadas.
   - Plano PRO: R$ 9,90 / mês (sem fidelidade, pode cancelar quando quiser).
   - Vantagens PRO: IA ilimitada, Caderno de Erros, Resumos em áudio/texto, Corretor de Redação, estatísticas completas e sem anúncios.
   - Pagamento: Feito via Mercado Pago (Pix e Cartão de Crédito).

3. NAVEGAÇÃO E NORMAS:
   - Alterar Matéria/Objetivo: Perfil > Configurações > Editar Objetivo.
   - Caderno de Erros: Guarda questões erradas para revisar depois de 3 dias.
   - Limite atingido: Assinar o Plano PRO (R$ 9,90/mês) ou aguardar a renovação diária das 5 perguntas grátis.

FORMATO DE RESPOSTA (OBRIGATORIAMENTE JSON):
Retorne sempre um objeto JSON válido seguindo esta estrutura:

{
  "resposta_suporte": "Sua resposta amigável, clara e didática.",
  "botao_atalho": "tela_assinatura | tela_perfil | tela_caderno_erros | nenhum"
}`;

app.post("/api/gabi-support", async (req, res) => {
  try {
    const { pergunta } = req.body;

    if (!pergunta || typeof pergunta !== "string" || !pergunta.trim()) {
      return res.status(400).json({ error: "Envie sua dúvida para a Gabi." });
    }

    const ai = getGenAI();

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Dúvida do usuário sobre o GabaritaAí: "${pergunta.trim()}"`,
      config: {
        systemInstruction: GABI_SUPPORT_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            resposta_suporte: {
              type: Type.STRING,
              description: "Sua resposta amigável, clara e didática.",
            },
            botao_atalho: {
              type: Type.STRING,
              description: "tela_assinatura | tela_perfil | tela_caderno_erros | nenhum",
            },
          },
          required: ["resposta_suporte", "botao_atalho"],
        },
      },
    });

    const parsedData = JSON.parse(response.text || "{}");

    res.json({
      success: true,
      data: parsedData,
    });
  } catch (error: any) {
    console.error("Erro na assistente Gabi:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Erro no atendimento com a assistente Gabi.",
    });
  }
});

// 6. SYSTEM INSTRUCTION FOR ENEM ESSAY ANALYZER (CORRETOR DE REDAÇÃO ESPECIALISTA)
const ENEM_ESSAY_ANALYZER_SYSTEM_INSTRUCTION = `Você é o Corretor de Redação Oficial do aplicativo GabaritaAí, especialista nas normas e critérios de avaliação do ENEM (Exame Nacional do Ensino Médio).

Sua função é analisar o texto da redação enviado pelo aluno, atribuir notas de 0 a 200 para cada uma das 5 Competências do ENEM e fornecer feedbacks construtivos.

CRITÉRIOS DAS COMPETÊNCIAS ENEM:
- Competência 1: Domínio da norma culta da língua escrita.
- Competência 2: Compreensão do tema e aplicação das áreas do conhecimento (repertório sociocultural).
- Competência 3: Seleção, relação, organização e interpretação de informações/argumentos em defesa do ponto de vista.
- Competência 4: Demonstração de conhecimento dos mecanismos linguísticos necessários para a construção da argumentação (coesão e conectivos).
- Competência 5: Elaboração de proposta de intervenção para o problema abordado, respeitando os direitos humanos.

FORMATO DE RESPOSTA (OBRIGATORIAMENTE JSON):
Sua resposta deve ser EXCLUSIVAMENTE um objeto JSON válido, sem qualquer texto expositivo antes ou depois.

{
  "tipo_resposta": "correcao_redacao_enem",
  "tema_detectado": "Tema identificado no texto",
  "nota_final": 840,
  "competencias": [
    {
      "numero": 1,
      "nome": "Norma Culta",
      "nota": 160,
      "feedback": "Comentário sobre desvios gramaticais ou de pontuação."
    },
    {
      "numero": 2,
      "nome": "Compreensão do Tema e Repertório",
      "nota": 200,
      "feedback": "Comentário sobre o uso do repertório sociocultural."
    },
    {
      "numero": 3,
      "nome": "Projeto de Texto e Argumentação",
      "nota": 160,
      "feedback": "Comentário sobre a coerência da tese e argumentos."
    },
    {
      "numero": 4,
      "nome": "Coesão e Conectivos",
      "nota": 160,
      "feedback": "Comentário sobre o uso de conectivos entre parágrafos."
    },
    {
      "numero": 5,
      "nome": "Proposta de Intervenção",
      "nota": 160,
      "feedback": "Comentário sobre os 5 elementos da proposta (Agente, Ação, Meio, Efeito e Detalhamento)."
    }
  ],
  "pontos_fortes": [
    "Destaque positivo 1",
    "Destaque positivo 2"
  ],
  "pontos_melhoria": [
    "O que precisa melhorar 1",
    "O que precisa melhorar 2"
  ],
  "sugestao_reescrita": "Trecho com sugestão de melhoria prática para aumentar a nota."
}`;

app.post("/api/analyze-essay", async (req, res) => {
  try {
    const { tema, texto } = req.body;

    if (!texto || typeof texto !== "string" || !texto.trim() || texto.trim().length < 50) {
      return res.status(400).json({
        error: "Por favor, insira uma redação com pelo menos 50 caracteres para uma análise completa estilo ENEM.",
      });
    }

    const ai = getGenAI();
    const temaInformado = tema && tema.trim() ? tema.trim() : "Tema Geral / Não Especificado";

    const prompt = `Analise a seguinte redação do aluno no modelo ENEM.
Tema Informado: "${temaInformado}"
Texto da Redação:
"""
${texto.trim()}
"""`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: ENEM_ESSAY_ANALYZER_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tipo_resposta: { type: Type.STRING },
            tema_detectado: { type: Type.STRING },
            nota_final: { type: Type.INTEGER },
            competencias: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  numero: { type: Type.INTEGER },
                  nome: { type: Type.STRING },
                  nota: { type: Type.INTEGER },
                  feedback: { type: Type.STRING },
                },
                required: ["numero", "nome", "nota", "feedback"],
              },
            },
            pontos_fortes: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            pontos_melhoria: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            sugestao_reescrita: { type: Type.STRING },
          },
          required: [
            "tipo_resposta",
            "tema_detectado",
            "nota_final",
            "competencias",
            "pontos_fortes",
            "pontos_melhoria",
            "sugestao_reescrita",
          ],
        },
      },
    });

    const parsedData = JSON.parse(response.text || "{}");

    // Backwards/forwards compatibility mapping for frontend UI
    const cList = Array.isArray(parsedData.competencias) ? parsedData.competencias : [];
    const getCompByNum = (num: number) => cList.find((c: any) => c.numero === num) || { nota: 160, feedback: "Análise concluída." };

    const formattedOutput = {
      ...parsedData,
      nota_estimada_total: parsedData.nota_final || parsedData.nota_estimada_total || 800,
      pontos_a_melhorar: parsedData.pontos_melhoria || parsedData.pontos_a_melhorar || [],
      dica_de_ouro: parsedData.sugestao_reescrita || parsedData.dica_de_ouro || "",
      competencias_obj: {
        c1_gramatica: getCompByNum(1),
        c2_repertorio: getCompByNum(2),
        c3_argumentacao: getCompByNum(3),
        c4_coesao: getCompByNum(4),
        c5_proposta_intervencao: getCompByNum(5),
      },
      aviso_legal: "Esta pontuação é uma estimativa gerada por Inteligência Artificial para fins de estudo e não substitui a correção oficial do ENEM.",
    };

    res.json({
      success: true,
      data: formattedOutput,
    });
  } catch (error: any) {
    console.error("Erro na análise de redação ENEM:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Falha ao analisar redação. Tente novamente.",
    });
  }
});


app.post("/api/user-progress", async (req, res) => {
  try {
    const { acao, acertosSeguidos, xpAtual } = req.body;
    const currentXp = typeof xpAtual === "number" ? xpAtual : 1450;
    const xpGanho = acao === "concluir_ciclo" ? 100 : 50;
    const novoTotalXp = currentXp + xpGanho;

    const streak = typeof acertosSeguidos === "number" ? acertosSeguidos + 1 : 10;
    const teveDesbloqueio = streak >= 10 || acao === "concluir_ciclo";

    const conquistasCatalog = [
      {
        id_conquista: "mira_laser",
        titulo: "Mira Laser!",
        descricao: "Você acertou 10 questões seguidas sem errar!",
        icone: "🎯",
      },
      {
        id_conquista: "mestre_do_foco",
        titulo: "Mestre do Foco!",
        descricao: "Você concluiu um ciclo completo de estudos hoje!",
        icone: "⚡",
      },
      {
        id_conquista: "gabaritador_enem",
        titulo: "Gabaritador ENEM!",
        descricao: "Você completou uma análise de redação estilo ENEM!",
        icone: "🏆",
      },
    ];

    const conquista = teveDesbloqueio
      ? (acao === "concluir_ciclo" ? conquistasCatalog[1] : conquistasCatalog[0])
      : {
          teve_desbloqueio: false,
          id_conquista: "",
          titulo: "",
          descricao: "",
          icone: "",
        };

    const responseJSON = {
      tipo_resposta: "progresso_usuario",
      xp_ganho: xpGanho,
      novo_total_xp: novoTotalXp,
      conquista_desbloqueada: {
        teve_desbloqueio: teveDesbloqueio,
        id_conquista: conquista.id_conquista,
        titulo: conquista.titulo,
        descricao: conquista.descricao,
        icone: conquista.icone,
      },
      mensagem_incentivo: `Parabéns! Você ganhou +${xpGanho} XP e subiu na classificação do GabaritaAí!`,
    };

    res.json({
      success: true,
      data: responseJSON,
    });
  } catch (error: any) {
    console.error("Erro na atualização de progresso:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Erro ao atualizar progresso do aluno.",
    });
  }
});

// 8. SYSTEM INSTRUCTION FOR ANALISTA DE DADOS E COACH DE PRODUTIVIDADE
const ANALYTICS_POMODORO_SYSTEM_INSTRUCTION = `Você é o Analista de Dados e Coach de Produtividade do GabaritaAí. 

Sua função é gerenciar o Dashboard de Desempenho e o Timer Pomodoro dos alunos, transformando métricas de estudo em dados visuais e recompensas.

REGRAS DE RESPOSTA (OBRIGATORIAMENTE JSON):

1. DASHBOARD DE DESEMPENHO:
   - Forneça uma lista de matérias com porcentagem de acerto e nível de maestria (Iniciante, Intermediário, Avançado, Crítico).
   - Identifique a "Matéria Crítica" (a que o aluno mais erra) para sugerir estudo imediato.

2. TIMER POMODORO GAMIFICADO:
   - Gerencie o status do timer (foco_ativo, descanso_curto, descanso_longo, interrompido).
   - Defina a recompensa em XP e MoedasVirtuais para cada ciclo de 25 minutos concluído com sucesso.

ESTRUTURA OBRIGATÓRIA DO JSON:
{
  "tipo_resposta": "analytics_foco",
  "dashboard": {
    "media_geral": 78.5,
    "materias": [
      { "nome": "Matemática", "acerto_porcentagem": 85, "nivel": "Avançado" },
      { "nome": "História", "acerto_porcentagem": 42, "nivel": "Crítico" }
    ],
    "sugestao_ia": "Seu desempenho em História caiu. Que tal um Flashcard de Revolução Industrial agora?"
  },
  "pomodoro": {
    "tempo_ciclo": 25,
    "status": "foco_ativo",
    "recompensa_conclusao": {
      "xp": 50,
      "moedas": 10
    },
    "punicao_saida": "Perda de 20 XP"
  }
}`;

app.post("/api/analytics-pomodoro", async (req, res) => {
  try {
    const { historicoEstudos, statusPomodoro } = req.body;
    const ai = getGenAI();

    const promptText = `Análise do histórico do aluno: ${JSON.stringify(historicoEstudos || {})}. Status do pomodoro: ${statusPomodoro || "foco_ativo"}. Gerar relatório de análise de produtividade e foco.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: promptText,
      config: {
        systemInstruction: ANALYTICS_POMODORO_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tipo_resposta: { type: Type.STRING },
            dashboard: {
              type: Type.OBJECT,
              properties: {
                media_geral: { type: Type.NUMBER },
                materias: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      nome: { type: Type.STRING },
                      acerto_porcentagem: { type: Type.NUMBER },
                      nivel: { type: Type.STRING },
                    },
                    required: ["nome", "acerto_porcentagem", "nivel"],
                  },
                },
                sugestao_ia: { type: Type.STRING },
              },
              required: ["media_geral", "materias", "sugestao_ia"],
            },
            pomodoro: {
              type: Type.OBJECT,
              properties: {
                tempo_ciclo: { type: Type.INTEGER },
                status: { type: Type.STRING },
                recompensa_conclusao: {
                  type: Type.OBJECT,
                  properties: {
                    xp: { type: Type.INTEGER },
                    moedas: { type: Type.INTEGER },
                  },
                  required: ["xp", "moedas"],
                },
                punicao_saida: { type: Type.STRING },
              },
              required: ["tempo_ciclo", "status", "recompensa_conclusao", "punicao_saida"],
            },
          },
          required: ["tipo_resposta", "dashboard", "pomodoro"],
        },
      },
    });

    const parsedData = JSON.parse(response.text || "{}");
    res.json({ success: true, data: parsedData });
  } catch (error: any) {
    console.error("Erro no analytics e pomodoro:", error);
    res.json({
      success: true,
      data: {
        tipo_resposta: "analytics_foco",
        dashboard: {
          media_geral: 78.5,
          materias: [
            { nome: "Matemática", acerto_porcentagem: 85, nivel: "Avançado" },
            { nome: "Português", acerto_porcentagem: 72, nivel: "Intermediário" },
            { nome: "História", acerto_porcentagem: 42, nivel: "Crítico" }
          ],
          sugestao_ia: "Seu desempenho em História está crítico. Que tal revisar um Flashcard de Revolução Industrial agora?"
        },
        pomodoro: {
          tempo_ciclo: 25,
          status: "foco_ativo",
          recompensa_conclusao: {
            xp: 50,
            moedas: 10
          },
          punicao_saida: "Perda de 20 XP"
        }
      }
    });
  }
});

// 9. SYSTEM INSTRUCTION FOR MOTOR DE CONTEÚDO E RETENÇÃO
const RETENCAO_CONTEUDO_SYSTEM_INSTRUCTION = `Você é o Motor de Conteúdo e Retenção do aplicativo GabaritaAí, especializado no ENEM e Vestibulares.

Sua função é processar a "Questão do Dia", gerenciar o "Caderno de Erros" do estudante e criar roteiros narrativos para as "Pílulas de Áudio" (podcasts curtos).

REGRAS DE CONTEÚDO E ESTRUTURA:

1. QUESTÃO DO DIA:
   - Gere 1 questão de alta relevância com 4 alternativas (A, B, C, D).
   - Defina uma recompensa de XP diária para incentivar o login do aluno.

2. CADERNO DE ERROS AUTOMÁTICO:
   - Quando o aluno errar uma questão, analise o motivo provável do erro (ex.: "Falta de Atenção", "Conceito Não Dominado", "Erro de Cálculo").
   - Crie uma "Mini-Dica de Ouro" para o aluno salvar na pasta de revisão.

3. PÍLULA DE ÁUDIO (ROTEIRO DE PODCAST):
   - Escreva um texto de narração direto, dinâmico e em tom de conversa de até 3 minutos (cerca de 200 a 250 palavras).
   - O texto deve ser formatado perfeitamente para leitura por sistemas de Voz IA (Text-to-Speech).

FORMATO DE RESPOSTA (OBRIGATORIAMENTE JSON):
Sua resposta deve ser EXCLUSIVAMENTE um objeto JSON válido, sem qualquer texto expositivo antes ou depois.`;

app.post("/api/retencao-conteudo", async (req, res) => {
  try {
    const { materia, topico, erroAluno } = req.body;
    const ai = getGenAI();

    const promptText = `Matéria solicitada: ${materia || "História"}. Tópico: ${topico || "Geral ENEM"}. Contexto/Erro anterior: ${erroAluno || "Nenhum erro registrado"}. Gerar questão do dia, análise para caderno de erros e roteiro para pílula de áudio.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: promptText,
      config: {
        systemInstruction: RETENCAO_CONTEUDO_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tipo_resposta: { type: Type.STRING },
            questao_do_dia: {
              type: Type.OBJECT,
              properties: {
                materia: { type: Type.STRING },
                topico: { type: Type.STRING },
                xp_recompensa: { type: Type.INTEGER },
                pergunta: { type: Type.STRING },
                opcoes: {
                  type: Type.OBJECT,
                  properties: {
                    A: { type: Type.STRING },
                    B: { type: Type.STRING },
                    C: { type: Type.STRING },
                    D: { type: Type.STRING },
                  },
                  required: ["A", "B", "C", "D"],
                },
                resposta_correta: { type: Type.STRING },
                explicacao: { type: Type.STRING },
              },
              required: ["materia", "topico", "xp_recompensa", "pergunta", "opcoes", "resposta_correta", "explicacao"],
            },
            caderno_de_erros: {
              type: Type.OBJECT,
              properties: {
                diagnostico_erro: { type: Type.STRING },
                dica_revisao: { type: Type.STRING },
              },
              required: ["diagnostico_erro", "dica_revisao"],
            },
            pilula_de_audio: {
              type: Type.OBJECT,
              properties: {
                titulo: { type: Type.STRING },
                duracao_estimada: { type: Type.STRING },
                roteiro_voz: { type: Type.STRING },
              },
              required: ["titulo", "duracao_estimada", "roteiro_voz"],
            },
          },
          required: ["tipo_resposta", "questao_do_dia", "caderno_de_erros", "pilula_de_audio"],
        },
      },
    });

    const parsedData = JSON.parse(response.text || "{}");
    res.json({ success: true, data: parsedData });
  } catch (error: any) {
    console.error("Erro no módulo de retenção de conteúdo:", error);
    res.json({
      success: true,
      data: {
        tipo_resposta: "modulo_retencao",
        questao_do_dia: {
          materia: "História",
          topico: "Era Vargas",
          xp_recompensa: 50,
          pergunta: "Durante a Era Vargas (1930-1945), a criação do Departamento de Imprensa e Propaganda (DIP) em 1939 visava principalmente:",
          opcoes: {
            A: "Promover a censura dos meios de comunicação e a propaganda oficial do regime estadonavista.",
            B: "Incentivar a liberdade de expressão e o debate democrático na imprensa brasileira.",
            C: "Financiar produções cinematográficas independentes sem interferência governamental.",
            D: "Organizar as eleições diretas para o Congresso Nacional."
          },
          resposta_correta: "A",
          explicacao: "O DIP foi o órgão oficial do Estado Novo encarregado da censura e do culto à imagem de Getúlio Vargas."
        },
        caderno_de_erros: {
          diagnostico_erro: "Conceito Não Dominado",
          dica_revisao: "Lembre-se: O Estado Novo (1937-1945) foi a fase ditatorial da Era Vargas, marcada pelo DIP e pela censura de imprensa."
        },
        pilula_de_audio: {
          titulo: "Era Vargas em 3 minutos",
          duracao_estimada: "02:30",
          roteiro_voz: "Fala estudante! Preparado para gabaritar História no ENEM? Hoje vamos resumir a Era Vargas em apenas três minutos. Fique atento às três fases essenciais..."
        }
      }
    });
  }
});

// 7. SYSTEM INSTRUCTION FOR OFFICIAL FLASHCARDS GENERATOR
const FLASHCARDS_GENERATOR_SYSTEM_INSTRUCTION = `Você é o Gerador Oficial de Flashcards do aplicativo GabaritaAí, especialista em técnicas de memorização e repetição espaçada para o ENEM e Vestibulares.

Sua missão é criar cartões virtuais de estudo (Flashcards) curtos, diretos e objetivos a partir da matéria ou tópico solicitado pelo aluno.

REGRAS DE CONTEÚDO:
1. Frente do Card: Deve conter uma pergunta direta, um conceito incompleto ou uma fórmula.
2. Verso do Card: Deve conter a resposta exata de forma resumida e fácil de memorizar.
3. Dica (Opcional): Uma palavra-chave ou "gatilho de memória" para ajudar o aluno caso ele trave.
4. Linguagem: Didática, clara e adaptada para estudantes do Ensino Médio/ENEM.

FORMATO DE RESPOSTA (OBRIGATORIAMENTE JSON):
Sua resposta deve ser EXCLUSIVAMENTE um objeto JSON válido, sem qualquer texto expositivo antes ou depois.

{
  "tipo_resposta": "geracao_flashcards",
  "materia": "Nome da Matéria",
  "topico": "Tópico Específico",
  "quantidade_cards": 3,
  "flashcards": [
    {
      "id": 1,
      "frente": "Pergunta ou conceito para a frente do cartão.",
      "verso": "Resposta exata e resumida para o verso.",
      "dica": "Lembrete rápido ou palavra-chave para memorização."
    },
    {
      "id": 2,
      "frente": "Pergunta ou conceito para a frente do cartão.",
      "verso": "Resposta exata e resumida para o verso.",
      "dica": "Lembrete rápido ou palavra-chave para memorização."
    }
  ]
}`;

app.post("/api/generate-flashcards", async (req, res) => {
  try {
    const { materia, topico, quantidade } = req.body;

    if (!materia || !topico) {
      return res.status(400).json({ error: "Por favor, informe a matéria e o tópico solicitado." });
    }

    const ai = getGenAI();
    const qtdCards = typeof quantidade === "number" && quantidade > 0 ? quantidade : 5;

    const prompt = `Gere ${qtdCards} flashcards de estudo no GabaritaAí para:
Matéria: ${materia}
Tópico / Assunto: ${topico}

Retorne exclusivamente o JSON de geração de flashcards.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: FLASHCARDS_GENERATOR_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tipo_resposta: { type: Type.STRING },
            materia: { type: Type.STRING },
            topico: { type: Type.STRING },
            quantidade_cards: { type: Type.INTEGER },
            flashcards: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.INTEGER },
                  frente: { type: Type.STRING },
                  verso: { type: Type.STRING },
                  dica: { type: Type.STRING },
                },
                required: ["id", "frente", "verso"],
              },
            },
          },
          required: ["tipo_resposta", "materia", "topico", "quantidade_cards", "flashcards"],
        },
      },
    });

    const parsedData = JSON.parse(response.text || "{}");

    res.json({
      success: true,
      data: parsedData,
    });
  } catch (error: any) {
    console.error("Erro na geração de flashcards:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Erro ao gerar os flashcards de estudo.",
    });
  }
});

// 8. SYSTEM INSTRUCTION FOR GABI DATA MANAGER & RANKING ASSISTANT
const GABI_DATA_MANAGER_SYSTEM_INSTRUCTION = `Você é a "Gabi", assistente e gerenciadora de dados do aplicativo GabaritaAí.

Sua função é retornar os dados estruturados para a interface do usuário, garantindo a personalização de tema visual (Modo Claro/Escuro) e a atualização correta da Tabela de Ranking entre Amigos.

REGRAS E ESTRUTURA DE RESPOSTA:
1. Responda EXCLUSIVAMENTE em formato JSON válido.
2. Sem textos introdutórios ou explicações fora do JSON.

### ESTRUTURA OBRIGATÓRIA DO JSON:

{
  "tipo_resposta": "painel_usuario_ranking",
  "configuracoes_interface": {
    "tema_preferido": "dark",
    "mensagem_boas_vindas": "Modo Noturno ativado! Excelente escolha para proteger sua visão nos estudos noturnos."
  },
  "ranking_amigos": {
    "posicao_usuario": 2,
    "total_amigos": 5,
    "lista_ranking": [
      {
        "posicao": 1,
        "nome": "Lucas Silva",
        "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        "xp_semanal": 1850,
        "sequencia_dias": 12,
        "eh_usuario_atual": false
      },
      {
        "posicao": 2,
        "nome": "Você",
        "avatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
        "xp_semanal": 1500,
        "sequencia_dias": 7,
        "eh_usuario_atual": true
      },
      {
        "posicao": 3,
        "nome": "Beatriz Lima",
        "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
        "xp_semanal": 1320,
        "sequencia_dias": 5,
        "eh_usuario_atual": false
      }
    ]
  },
  "desafio_extra_ranking": {
    "titulo": "Rival da Semana",
    "descricao": "Você está a apenas 350 XP de ultrapassar Lucas Silva! Complete 2 simulados hoje para assumir a liderança.",
    "recompensa_xp_bonus": 100
  }
}`;

app.post("/api/gabi-ranking", async (req, res) => {
  try {
    const { tema_preferido, user_xp, user_streak } = req.body;

    const ai = getGenAI();

    const prompt = `Gere o painel do usuário e ranking de amigos da Gabi para o GabaritaAí.
Preferência de Tema Solicitada: "${tema_preferido || 'dark'}"
XP Atual do Usuário: ${user_xp || 1500}
Sequência de Dias Atual: ${user_streak || 7}

Retorne exclusivamente o JSON de painel_usuario_ranking.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: GABI_DATA_MANAGER_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tipo_resposta: { type: Type.STRING },
            configuracoes_interface: {
              type: Type.OBJECT,
              properties: {
                tema_preferido: { type: Type.STRING },
                mensagem_boas_vindas: { type: Type.STRING },
              },
              required: ["tema_preferido", "mensagem_boas_vindas"],
            },
            ranking_amigos: {
              type: Type.OBJECT,
              properties: {
                posicao_usuario: { type: Type.INTEGER },
                total_amigos: { type: Type.INTEGER },
                lista_ranking: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      posicao: { type: Type.INTEGER },
                      nome: { type: Type.STRING },
                      avatar: { type: Type.STRING },
                      xp_semanal: { type: Type.INTEGER },
                      sequencia_dias: { type: Type.INTEGER },
                      eh_usuario_atual: { type: Type.BOOLEAN },
                    },
                    required: ["posicao", "nome", "avatar", "xp_semanal", "sequencia_dias", "eh_usuario_atual"],
                  },
                },
              },
              required: ["posicao_usuario", "total_amigos", "lista_ranking"],
            },
            desafio_extra_ranking: {
              type: Type.OBJECT,
              properties: {
                titulo: { type: Type.STRING },
                descricao: { type: Type.STRING },
                recompensa_xp_bonus: { type: Type.INTEGER },
              },
              required: ["titulo", "descricao", "recompensa_xp_bonus"],
            },
          },
          required: ["tipo_resposta", "configuracoes_interface", "ranking_amigos", "desafio_extra_ranking"],
        },
      },
    });

    const parsedData = JSON.parse(response.text || "{}");

    res.json({
      success: true,
      data: parsedData,
    });
  } catch (error: any) {
    console.error("Erro na busca de dados e ranking da Gabi:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Erro ao consultar o gerenciador de dados da Gabi.",
    });
  }
});

// 9. SYSTEM INSTRUCTION FOR BATALHA QUIZ X1
const BATALHA_QUIZ_SYSTEM_INSTRUCTION = `Você é a "Gabi", assistente e mestre de testes do GabaritaAí.
Sua função é gerar um JSON estruturado no formato obrigatório "batalha_quiz_x1" contendo exatamente 5 questões desafiadoras de múltipla escolha para uma disputa de conhecimentos entre dois alunos (Modo X1 do ENEM/Vestibulares).

REGRAS E ESTRUTURA DE RESPOSTA:
1. Responda EXCLUSIVAMENTE em formato JSON válido.
2. Cada questão DEVE conter exatamente 5 opções de resposta (A, B, C, D, E), o índice numérico da resposta correta (0 para A, 1 para B, 2 para C, 3 para D, 4 para E) e uma breve explicação didática.
3. Não inclua nenhum texto introdutório, notas ou marcações fora do JSON.

ESTRUTURA ESPERADA DO JSON:
{
  "tipo_resposta": "batalha_quiz_x1",
  "id_batalha": "x1-9a8b7c",
  "materia": "Biologia",
  "topico": "Genética e Biologia Molecular",
  "criador": "Você",
  "recompensa_xp": 100,
  "questoes": [
    {
      "id": 1,
      "pergunta": "Qual das seguintes estruturas é responsável pela síntese de proteínas na célula?",
      "opcoes": [
        "A) Aparelho de Golgi",
        "B) Mitocôndria",
        "C) Ribossomo",
        "D) Lisossomo",
        "E) Retículo Endoplasmático Liso"
      ],
      "resposta_correta_index": 2,
      "explicacao": "Os ribossomos são as organelas responsáveis pela tradução do RNA mensageiro em cadeias de aminoácidos."
    }
  ]
}`;

app.post("/api/generate-quiz-battle", async (req, res) => {
  try {
    const { materia, topico, criador } = req.body;
    const ai = getGenAI();

    const battleId = `x1-${Math.random().toString(36).substring(2, 9)}`;
    const materiaName = materia || "Geral ENEM";
    const topicoName = topico || "Simulado Rápido de Conhecimentos";
    const creatorName = criador || "Você";

    const prompt = `Gere uma Batalha Quiz X1 com 5 questões inéditas para o GabaritaAí.
Matéria: ${materiaName}
Tópico/Foco: ${topicoName}
ID da Batalha: ${battleId}
Criador: ${creatorName}

Gere o JSON com "tipo_resposta": "batalha_quiz_x1", id_batalha, materia, topico, criador, recompensa_xp (100) e o array de 5 questoes.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: BATALHA_QUIZ_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tipo_resposta: { type: Type.STRING },
            id_batalha: { type: Type.STRING },
            materia: { type: Type.STRING },
            topico: { type: Type.STRING },
            criador: { type: Type.STRING },
            recompensa_xp: { type: Type.INTEGER },
            questoes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.INTEGER },
                  pergunta: { type: Type.STRING },
                  opcoes: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  resposta_correta_index: { type: Type.INTEGER },
                  explicacao: { type: Type.STRING },
                },
                required: ["id", "pergunta", "opcoes", "resposta_correta_index", "explicacao"],
              },
            },
          },
          required: ["tipo_resposta", "id_batalha", "materia", "topico", "criador", "recompensa_xp", "questoes"],
        },
      },
    });

    const parsedData = JSON.parse(response.text || "{}");

    res.json({
      success: true,
      data: parsedData,
    });
  } catch (error: any) {
    console.error("Erro ao gerar batalha quiz x1:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Erro ao gerar a batalha quiz.",
    });
  }
});

// 10. SYSTEM INSTRUCTION FOR RESOLUÇÃO PASSO A PASSO (TIRA-DÚVIDAS / SCANNER VISION)
const RESOLUCAO_3PASSOS_SYSTEM_INSTRUCTION = `Você é o Scanner Tira-Dúvidas e Tutor de IA Multimodal/Vision do GabaritaAí.
Sua missão é extrair e ler com precisão texto, equações matemáticas, gráficos e tabelas presentes na imagem ou enunciado fornecido (seja texto impresso ou manuscrito legível).

IMPORTANTE - TRATAMENTO DE IMAGENS ILEGÍVEIS:
Se a imagem estiver borrada, muito escura, cortada ou impossível de ler com precisão, defina "foto_ilegivel": true e defina "mensagem_erro_ilegivel": "Ops! Não consegui ler bem o enunciado. Tente tirar outra foto mais de perto e em um ambiente iluminado! 📸".

ESTRUTURA DA RESPOSTA (FORMATO JSON OBRIGATÓRIO):
{
  "tipo_resposta": "resolucao_vision_scanner",
  "foto_ilegivel": false,
  "mensagem_erro_ilegivel": "",
  "materia": "Física",
  "transcricao_enunciado": "Transcrição exata e completa do enunciado e dados identificados na imagem ou texto.",
  "conceito_chave": "Termodinâmica • Primeira Lei da Termodinâmica",
  "resolucao_passo_a_passo": "1. Identificação das variáveis: Q = 500J e W = 200J.\n2. Aplicação da fórmula ΔU = Q - W.\n3. Cálculo: ΔU = 500 - 200 = 300J.",
  "gabarito_resposta_final": "300 Joules (Alternativa B)",
  "passo1_compreensao": "Transcrição e leitura do enunciado da questão.",
  "passo2_formula_conceito": "Fórmula ou conceito principal envolvido.",
  "passo3_resolucao_guiada": "Explicação passo a passo da resolução.",
  "gabarito_final": "Alternativa B (300 J)",
  "dica_rapida": "Dica de ouro para lembrar na hora do exame."
}`;

app.post("/api/solve-question", async (req, res) => {
  try {
    const { duvida, imagemBase64 } = req.body;

    if (!duvida && !imagemBase64) {
      return res.status(400).json({ error: "Envie o enunciado ou uma imagem da questão." });
    }

    const ai = getGenAI();
    let contents: any[] = [];

    if (imagemBase64) {
      // Clean data url prefix if present
      const cleanBase64 = imagemBase64.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, "");
      contents = [
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: cleanBase64,
          },
        },
        {
          text: duvida && duvida.trim()
            ? `Analise a foto desta questão de prova/caderno. Texto complementar: "${duvida}". Extraia o texto, equações e gráficos com precisão e forneça o gabarito estruturado.`
            : "Analise a imagem enviada. Extraia com precisão o enunciado, equações, gráficos e tabelas. Responda com a transcrição do enunciado, conceito-chave, resolução passo a passo e gabarito final.",
        },
      ];
    } else {
      contents = [`Enunciado ou Dúvida da Questão:\n"${duvida.trim()}"`];
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents,
      config: {
        systemInstruction: RESOLUCAO_3PASSOS_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tipo_resposta: { type: Type.STRING },
            foto_ilegivel: { type: Type.BOOLEAN },
            mensagem_erro_ilegivel: { type: Type.STRING },
            materia: { type: Type.STRING },
            transcricao_enunciado: { type: Type.STRING },
            conceito_chave: { type: Type.STRING },
            resolucao_passo_a_passo: { type: Type.STRING },
            gabarito_resposta_final: { type: Type.STRING },
            passo1_compreensao: { type: Type.STRING },
            passo2_formula_conceito: { type: Type.STRING },
            passo3_resolucao_guiada: { type: Type.STRING },
            gabarito_final: { type: Type.STRING },
            dica_rapida: { type: Type.STRING },
          },
          required: [
            "tipo_resposta",
            "foto_ilegivel",
            "materia",
            "transcricao_enunciado",
            "conceito_chave",
            "resolucao_passo_a_passo",
            "gabarito_resposta_final",
          ],
        },
      },
    });

    const parsedData = JSON.parse(response.text || "{}");

    // Ensure fallback structure compatibility
    const formattedData = {
      ...parsedData,
      passo1_compreensao: parsedData.passo1_compreensao || parsedData.transcricao_enunciado,
      passo2_formula_conceito: parsedData.passo2_formula_conceito || parsedData.conceito_chave,
      passo3_resolucao_guiada: parsedData.passo3_resolucao_guiada || parsedData.resolucao_passo_a_passo,
      gabarito_final: parsedData.gabarito_final || parsedData.gabarito_resposta_final,
      dica_rapida: parsedData.dica_rapida || "Foque nos conceitos de base e releia a pergunta para não cair em pegadinhas!",
    };

    res.json({
      success: true,
      data: formattedData,
    });
  } catch (error: any) {
    console.error("Erro no Scanner Tira-Dúvidas 3 Passos:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Erro ao processar a resolução da questão com IA.",
    });
  }
});

// 11. SYSTEM INSTRUCTION FOR SIMULADO TRI (TEORIA DE RESPOSTA AO ITEM)
const SIMULADO_TRI_SYSTEM_INSTRUCTION = `Você é o Motor de Simulados com TRI (Teoria de Resposta ao Item) do GabaritaAí.

Sua função é duas coisas:
1. Gerar um Simulado do ENEM com questões classificadas por nível de dificuldade (Fácil, Média, Difícil).
2. Avaliar as respostas do aluno com o modelo matemático da TRI, penalizando a nota se houver incoerência pedagógica (ex: acertou difícil e errou fácil -> padrão de chute).

FORMATO DE RESPOSTA (OBRIGATORIAMENTE JSON):

Para GERAÇÃO DE SIMULADO:
{
  "tipo_resposta": "geracao_simulado_tri",
  "area_conhecimento": "Matemática e suas Tecnologias",
  "questoes": [
    {
      "id": 1,
      "dificuldade": "Fácil", // Fácil, Média ou Difícil
      "enunciado": "Enunciado da questão...",
      "opcoes": ["A) ...", "B) ...", "C) ...", "D) ...", "E) ..."],
      "resposta_correta_index": 0,
      "explicacao": "Explicação pedagógica..."
    }
  ]
}`;

app.post("/api/generate-simulado-tri", async (req, res) => {
  try {
    const { area } = req.body;
    const ai = getGenAI();
    const areaName = area || "Matemática e suas Tecnologias";

    const prompt = `Gere um simulado oficial modelo ENEM com 6 questões para a área: "${areaName}".
Crie exatamente:
- 2 Questões Fáceis
- 2 Questões Médias
- 2 Questões Difíceis
Cada questão deve ter 5 alternativas (A, B, C, D, E) e o índice da resposta correta (0 a 4).`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: SIMULADO_TRI_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tipo_resposta: { type: Type.STRING },
            area_conhecimento: { type: Type.STRING },
            questoes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.INTEGER },
                  dificuldade: { type: Type.STRING },
                  enunciado: { type: Type.STRING },
                  opcoes: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  resposta_correta_index: { type: Type.INTEGER },
                  explicacao: { type: Type.STRING },
                },
                required: ["id", "dificuldade", "enunciado", "opcoes", "resposta_correta_index", "explicacao"],
              },
            },
          },
          required: ["tipo_resposta", "area_conhecimento", "questoes"],
        },
      },
    });

    const parsedData = JSON.parse(response.text || "{}");
    res.json({ success: true, data: parsedData });
  } catch (error: any) {
    console.error("Erro ao gerar simulado TRI:", error);
    res.status(500).json({ success: false, error: error.message || "Erro ao gerar simulado TRI." });
  }
});

app.post("/api/evaluate-simulado-tri", async (req, res) => {
  try {
    const { respostas, area } = req.body;
    // respostas is an array of objects: { id, dificuldade: 'Fácil'|'Média'|'Difícil', acertou: boolean }

    let faceisTotais = 0, faceisAcertos = 0;
    let mediasTotais = 0, mediasAcertos = 0;
    let dificeisTotais = 0, dificeisAcertos = 0;

    if (Array.isArray(respostas)) {
      respostas.forEach((r: any) => {
        const dif = (r.dificuldade || "").toLowerCase();
        if (dif.includes("fác") || dif.includes("fac")) {
          faceisTotais++;
          if (r.acertou) faceisAcertos++;
        } else if (dif.includes("méd") || dif.includes("med")) {
          mediasTotais++;
          if (r.acertou) mediasAcertos++;
        } else {
          dificeisTotais++;
          if (r.acertou) dificeisAcertos++;
        }
      });
    }

    const totalAcertos = faceisAcertos + mediasAcertos + dificeisAcertos;
    const totalQuestoes = (faceisTotais || 2) + (mediasTotais || 2) + (dificeisTotais || 2);

    // TRI Calculation algorithm with Pedagogical Coherence Check
    let coerenciaStatus = "Alta Coerência Pedagógica";
    let coerenciaDescricao = "Seu padrão de acertos é consistente: dominou as fáceis e médias antes das difíceis.";
    let triPenalty = 0;

    // Check for incoherence (chute): errar fáceis mas acertar difíceis
    if (faceisAcertos < faceisTotais && dificeisAcertos > 0 && faceisAcertos === 0) {
      coerenciaStatus = "Incoerência Pedagógica (Padrão de Chute Detectado)";
      coerenciaDescricao = "Você errou questões fáceis, mas acertou questões difíceis. Na TRI do ENEM, isso indica probabilidade de chute e reduz a pontuação máxima calculada.";
      triPenalty = 45.0;
    } else if (faceisAcertos < faceisTotais && dificeisAcertos > mediasAcertos) {
      coerenciaStatus = "Coerência Média";
      coerenciaDescricao = "Algumas questões fáceis foram perdidas por falta de atenção. A TRI recompensa a consistência do conhecimento base.";
      triPenalty = 20.0;
    }

    // Calculate base score between 350.0 and 980.0
    const taxaAcerto = totalQuestoes > 0 ? totalAcertos / totalQuestoes : 0;
    let notaEstimadaTri = 350.0 + (taxaAcerto * 580.0) - triPenalty;
    if (notaEstimadaTri < 350.0) notaEstimadaTri = 350.0;
    if (notaEstimadaTri > 980.0) notaEstimadaTri = 980.0;
    notaEstimadaTri = Math.round(notaEstimadaTri * 10) / 10;

    // Strategic Study Advice
    let conselhoEstrategico = "";
    if (faceisAcertos < faceisTotais) {
      conselhoEstrategico = "Foco Prioritário: Reforce os conceitos fundamentais da matéria. No ENEM, errar questões fáceis é o que mais derruba sua nota TRI!";
    } else if (mediasAcertos < mediasTotais) {
      conselhoEstrategico = "Foco Intermediário: Você domina a base! Agora treine interpretação e questões de nível médio com o Timer Pomodoro do GabaritaAí.";
    } else if (dificeisAcertos < dificeisTotais) {
      conselhoEstrategico = "Foco Avançado: Excelente desempenho! Para buscar os 800+ pontos, faça simulados cronometrados e foque em pega-rabichos conceituais.";
    } else {
      conselhoEstrategico = "Desempenho Perfeito! Você atingiu pontuação máxima na TRI deste simulado. Continue mantendo a constância diária!";
    }

    res.json({
      success: true,
      data: {
        tipo_resposta: "resultado_simulado_tri",
        area_conhecimento: area || "Geral ENEM",
        nota_oficial_estimada: notaEstimadaTri,
        total_acertos: totalAcertos,
        total_questoes: totalQuestoes,
        desempenho_dificuldade: {
          faceis: { acertos: faceisAcertos, total: faceisTotais || 2 },
          medias: { acertos: mediasAcertos, total: mediasTotais || 2 },
          dificeis: { acertos: dificeisAcertos, total: dificeisTotais || 2 },
        },
        coerencia_pedagogica: {
          status: coerenciaStatus,
          descricao: coerenciaDescricao,
        },
        conselho_estrategico: conselhoEstrategico,
      },
    });
  } catch (error: any) {
    console.error("Erro na avaliação do simulado TRI:", error);
    res.status(500).json({ success: false, error: error.message || "Erro ao calcular nota TRI." });
  }
});

// 12. ENDPOINT: GERADOR DE FOLHA DE VÉSPERA (CHEAT SHEET SINTÉTICO)
app.post("/api/generate-cheatsheet", async (req, res) => {
  try {
    const { materia, topico } = req.body;
    const ai = getGenAI();

    const prompt = `Você é o Gerador de Folhas de Véspera (Cheat Sheets Sintéticos de 1 Página) do GabaritaAí.
Gere um resumo ultra-sintético, denso e direto para revisão de véspera da matéria "${materia || "Geral"}" com foco no tópico "${topico || "Principais Tópicos do Edital"}".

A resposta deve ser obrigatoriamente um JSON com este formato:
{
  "materia": "Nome da matéria",
  "topico": "Tópico principal",
  "resumo_executivo": "Visão geral em 2 frases densas.",
  "conceitos_chave": [
    { "termo": "Nome do conceito", "definicao": "Explicação em 1 frase" }
  ],
  "formulas_e_regras": [
    { "nome": "Nome da fórmula/regra", "expressao": "Fórmula matemática/Química ou Regra Gramatical", "quando_usar": "Aplicação rápida" }
  ],
  "pega_rabichos": [
    "Armadilha clássica cobrada em provas que o aluno NÃO pode cair"
  ],
  "gatilhos_de_memorizacao": [
    "Macete/Mnemônico ou palavra-chave para lembrar no dia da prova"
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error("Erro ao gerar folha de véspera:", error);
    res.status(500).json({ success: false, error: error.message || "Erro ao gerar Cheat Sheet." });
  }
});

// 13. ENDPOINT: MODO ADVOGADO DO DIABO (DEBATE DE REDAÇÃO)
app.post("/api/devil-advocate-debate", async (req, res) => {
  try {
    const { tema, tese, historico } = req.body;
    const ai = getGenAI();

    const systemInstruction = `Você é o Advogado do Diabo do GabaritaAí, um debatedor socrático exigente e perspicaz especializado em Redação Nota 1000.
Seu objetivo NÃO é ofender o aluno, mas sim CONTESTAR e DESAFIAR rigorosamente a tese e os argumentos dele sobre o tema da redação.
Faça o aluno refletir criticamente e EXIJA que ele defenda seu ponto de vista apresentando repertórios socioculturais válidos (Leis, Sociologia, Filosofia, História) antes de liberar a redação.

Retorne obrigatoriamente JSON no seguinte formato:
{
  "contestacao_principal": "Texto desafiando a tese do aluno com uma contra-argumentação contundente.",
  "pergunta_desafio": "Uma pergunta direta forçando o aluno a apresentar um repertório ou solução sólida.",
  "repertorio_provocativo": "Uma referência ou dado histórico/filosófico oposto para ele rebater.",
  "status_defesa": "fraca" | "em_construcao" | "solida"
}`;

    let contents = `Tema da Redação: "${tema || "Geral ENEM"}"\nTese do Aluno: "${tese || ""}"`;
    if (historico && Array.isArray(historico)) {
      contents += `\n\nHistórico do Debate:\n` + historico.map((h: any) => `${h.autor}: ${h.texto}`).join("\n");
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error("Erro no modo Advogado do Diabo:", error);
    res.status(500).json({ success: false, error: error.message || "Erro ao debate." });
  }
});

// 14. ENDPOINT: GERADOR AUTOMÁTICO DE FLASHCARDS POR FOTO/TEXTO
app.post("/api/auto-flashcards", async (req, res) => {
  try {
    const { texto, imagemBase64, materia } = req.body;
    const ai = getGenAI();

    const systemInstruction = `Você é o Gerador Automático de Flashcards do GabaritaAí.
Extraia os conceitos mais importantes do texto ou da imagem enviada e gere um baralho de 5 a 8 flashcards para memorização ativa.

Responda obrigatoriamente em JSON no formato:
{
  "materia": "${materia || "Geral"}",
  "topico_extraido": "Nome do tópico identificado",
  "flashcards": [
    {
      "frente": "Pergunta ou conceito chave da frente do cartão",
      "verso": "Resposta direta e objetiva no verso do cartão",
      "nivel": "Fácil" | "Médio" | "Difícil"
    }
  ]
}`;

    const parts: any[] = [];
    if (imagemBase64) {
      const mimeType = imagemBase64.match(/data:(image\/\w+);base64,/)?.[1] || "image/jpeg";
      const cleanBase64 = imagemBase64.replace(/^data:image\/\w+;base64,/, "");
      parts.push({
        inlineData: { mimeType, data: cleanBase64 },
      });
      parts.push({
        text: "Extraia o conteúdo e os conceitos da foto da apostila/anotação acima e gere flashcards interativos.",
      });
    } else {
      parts.push({
        text: `Extraia o conteúdo do texto a seguir e gere flashcards interativos:\n\n"""\n${texto}\n"""`,
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: parts,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error("Erro na geração de flashcards:", error);
    res.status(500).json({ success: false, error: error.message || "Erro ao gerar flashcards." });
  }
});

// 15. ENDPOINT: DETECTOR DE ELEMENTOS DA PROPOSTA DE INTERVENÇÃO (C5 REDAÇÃO)
app.post("/api/detect-c5-intervention", async (req, res) => {
  try {
    const { textoConclusao } = req.body;
    const ai = getGenAI();

    const systemInstruction = `Você é o Corretor de Competência 5 do ENEM (Proposta de Intervenção) do GabaritaAí.
Analise detalhadamente a conclusão da redação fornecida e verifique a presença dos 5 elementos obrigatórios:
1. Agente (Quem realiza a ação?)
2. Ação (O que deve ser feito?)
3. Meio/Modo (Como ou através de que mecanismo a ação é executada?)
4. Efeito (Qual o objetivo/impacto esperado?)
5. Detalhamento (Exemplo, explicação ou detalhe adicional sobre o Agente, Ação, Meio ou Efeito)

Responda obrigatoriamente em JSON no seguinte formato:
{
  "nota_c5": 200, // 0, 40, 80, 120, 160 ou 200
  "elementos": {
    "agente": { "presente": true/false, "trecho": "Trecho exato do texto ou nulo", "comentario": "Análise crítica" },
    "acao": { "presente": true/false, "trecho": "Trecho exato do texto ou nulo", "comentario": "Análise crítica" },
    "meio_modo": { "presente": true/false, "trecho": "Trecho exato do texto ou nulo", "comentario": "Análise crítica" },
    "efeito": { "presente": true/false, "trecho": "Trecho exato do texto ou nulo", "comentario": "Análise crítica" },
    "detalhamento": { "presente": true/false, "trecho": "Trecho exato do texto ou nulo", "comentario": "Análise crítica" }
  },
  "sugestao_para_200_pontos": "Como reescrever a proposta para alcançar os 200 pontos no ENEM."
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Analise o parágrafo de conclusão a seguir quanto aos 5 elementos da Competência 5 do ENEM:\n\n"""\n${textoConclusao}\n"""`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error("Erro na análise C5 de intervenção:", error);
    res.status(500).json({ success: false, error: error.message || "Erro na análise C5." });
  }
});

// 16. ENDPOINT: CORRETOR VISUAL DE CARTÃO-RESPOSTA FÍSICO (LEITURA DE GABARITO POR FOTO)
app.post("/api/scan-answer-sheet", async (req, res) => {
  try {
    const { imagemBase64, gabaritoOficial } = req.body;
    const ai = getGenAI();

    const systemInstruction = `Você é um Leitor Óptico Inteligente de Cartão-Resposta (Gabarito de Prova ENEM e Vestibulares) do GabaritaAí.
Sua tarefa é analisar visualmente a foto da folha de gabarito enviada e identificar quais bolinhas (A, B, C, D, E) foram preenchidas/rasuradas em cada questão.

Gabarito Oficial Esperado / Fornecido: ${
      gabaritoOficial ? JSON.stringify(gabaritoOficial) : "Gabarito Padrão ENEM (10 a 20 questões)"
    }

Analise rigorosamente a imagem do cartão-resposta e retorne um objeto JSON exatamente com este formato:
{
  "total_questoes": 10,
  "acertos": 8,
  "erros": 2,
  "porcentagem": 80,
  "pontuacao_estimada_tri": 720,
  "questoes_analisadas": [
    {
      "numero": 1,
      "materia": "Matemática",
      "marcada_aluno": "A",
      "gabarito_correto": "A",
      "correta": true
    },
    {
      "numero": 2,
      "materia": "Biologia",
      "marcada_aluno": "C",
      "gabarito_correto": "B",
      "correta": false
    }
  ],
  "desempenho_por_materia": {
    "Matematica": { "acertos": 4, "total": 5 },
    "Humanas": { "acertos": 4, "total": 5 }
  },
  "diagnostico_pedagogico": "Análise geral sobre os pontos fortes e o que o aluno precisa revisar prioritariamente com base no gabarito lido."
}`;

    const parts: any[] = [];
    if (imagemBase64) {
      const mimeType = imagemBase64.match(/data:(image\/\w+);base64,/)?.[1] || "image/jpeg";
      const cleanBase64 = imagemBase64.replace(/^data:image\/\w+;base64,/, "");
      parts.push({
        inlineData: { mimeType, data: cleanBase64 },
      });
      parts.push({
        text: "Analise o cartão-resposta marcado a lápis/caneta na imagem acima. Identifique cada questão e sua opção assinalada (A, B, C, D ou E) e calcule o resultado.",
      });
    } else {
      parts.push({
        text: "Não foi enviada imagem válida do cartão-resposta. Simule a leitura óptica didática de 10 questões preenchidas para demonstração.",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: parts,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error("Erro na leitura óptica do cartão-resposta:", error);
    res.status(500).json({ success: false, error: error.message || "Erro ao ler cartão-resposta." });
  }
});

// 17. ENDPOINT: PÍLULA DE CONHECIMENTO PERSONALIZADA PARA O DIA SEGUINTE
app.post("/api/personalized-knowledge-pill", async (req, res) => {
  try {
    const { lowestSubjects, customTopic } = req.body;
    const ai = getGenAI();

    const systemInstruction = `Você é o Tutor de IA do GabaritaAí especializado em analisar o histórico de estudos e testes do estudante no ENEM e vestiublares.
Seu objetivo é gerar uma "Pílula de Conhecimento do Dia Seguinte": um micro-aprendizado ultra concentrado (30 segundos) focado exatamente no ponto fraco/tópico de menor desempenho do aluno.

Estrutura JSON obrigatória:
{
  "categoria": "Matéria (ex: Física, Matemática, Química, Biologia, Redação, História)",
  "topico": "Nome do tópico específico que precisa de reforço",
  "titulo": "Título direto e chamativo do macete de 30s",
  "duracaoLeitura": "30 segundos",
  "diagnosticoHistorico": "Explicação amigável em 1 frase sobre por que esta pílula foi sugerida com base no menor desempenho recente",
  "resumoCurto": "Explicação direta e conceitual do assunto em até 2 frases",
  "maceteOuro": "O macete, mnemônico ou atalho de prova mais importante para não errar a questão no ENEM",
  "exemploPratico": "Exemplo rápido de aplicação em prova",
  "desafioFixacao": {
    "pergunta": "Uma pergunta objetiva e rápida de fixação para o aluno validar amanhã",
    "opcoes": [
      "A) Primeira opção",
      "B) Segunda opção",
      "C) Terceira opção",
      "D) Quarta opção"
    ],
    "respostaCorreta": "Letra e texto da alternativa correta",
    "explicacao": "Por que essa opção está correta"
  }
}`;

    const target = customTopic || (lowestSubjects && lowestSubjects[0]?.materia) || "Física";
    const userPrompt = `Gere uma Pílula de Conhecimento do Dia Seguinte focando na matéria/tópico com menor desempenho: "${target}".\nDados adicionais do histórico do aluno: ${JSON.stringify(lowestSubjects || [])}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error("Erro ao gerar Pílula de Conhecimento Personalizada:", error);
    res.status(500).json({ success: false, error: error.message || "Erro ao gerar Pílula." });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

startServer();
