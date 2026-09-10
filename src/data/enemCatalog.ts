export interface SubjectArea {
  id: string;
  title: string;
  topics: string[];
}

export const enemCatalog: SubjectArea[] = [
  {
    id: "linguagens",
    title: "Linguagens e Códigos",
    topics: ["Interpretação de Texto", "Funções da Linguagem", "Literatura", "Gramática"]
  },
  {
    id: "humanas",
    title: "Ciências Humanas",
    topics: ["História do Brasil", "Geografia Geral", "Filosofia", "Sociologia"]
  },
  {
    id: "natureza",
    title: "Ciências da Natureza",
    topics: ["Física - Mecânica", "Química Geral", "Biologia - Ecologia"]
  },
  {
    id: "matematica",
    title: "Matemática",
    topics: ["Geometria", "Funções", "Estatística", "Porcentagem"]
  }
];

export default enemCatalog;

