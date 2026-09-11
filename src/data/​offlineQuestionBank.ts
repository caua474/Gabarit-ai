export interface Question {
  id: string;
  statement: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  subject: string;
  topic: string;
  year?: number;
}

export const offlineQuestionBank: Question[] = [
  {
    id: "offline-1",
    statement: "No ENEM, a interpretação de texto é fundamental. Qual das alternativas melhor define a função da metalinguagem?",
    options: [
      "Focar no canal de comunicação.",
      "Usar o código para explicar o próprio código.",
      "Expressar as emoções do emissor.",
      "Persuadir o receptor da mensagem."
    ],
    correctAnswer: 1,
    explanation: "A função metalinguística ocorre quando a linguagem fala sobre si mesma (ex: um poema que fala sobre fazer poesia).",
    subject: "Linguagens",
    topic: "Funções da Linguagem"
  },
  {
    id: "offline-2",
    statement: "Considerando a Primeira Lei de Newton (Lei da Inércia), o que acontece com um corpo em movimento se a força resultante sobre ele for nula?",
    options: [
      "Ele para imediatamente.",
      "Ele acelera uniformemente.",
      "Ele continua em movimento retilineo uniforme.",
      "Ele muda de direção."
    ],
    correctAnswer: 2,
    explanation: "Pela Primeira Lei de Newton, se a força resultante é zero, o corpo mantém seu estado de repouso ou de movimento retilíneo uniforme.",
    subject: "Ciências da Natureza",
    topic: "Física - Leis de Newton"
  }
];

export default offlineQuestionBank;
