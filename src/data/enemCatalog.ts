export interface EnemTopic {
  id: string;
  nome: string;
  incidencia: 'Mais Cai' | 'Médio' | 'Básico';
  descricao: string;
  dicaChave: string;
  exemploPratico: string;
}

export interface EnemArea {
  id: string;
  areaNome: string;
  sigla: string;
  corTheme: string;
  gradient: string;
  borderColor: string;
  bgGlow: string;
  disciplinas: any[];
}

export const ENEM_CATALOG: EnemArea[] = [
  // ... dados do catálogo
];

export const enemCatalog = ENEM_CATALOG;
export default ENEM_CATALOG;
