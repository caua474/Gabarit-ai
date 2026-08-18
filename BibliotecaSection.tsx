import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  BookOpen,
  Sparkles,
  ChevronRight,
  Brain,
  Layers,
  Zap,
  Bookmark,
  CheckCircle2,
  Clock,
  ArrowRight,
  X,
  MessageSquare,
  HelpCircle,
  Share2,
  FileText,
  Lightbulb,
  Tag
} from 'lucide-react';
import { playClickSound } from '../utils/audio';
import { BibliotecaAutocompleteSearch } from './BibliotecaAutocompleteSearch';

export type BibliotecaCategory =
  | 'Tudo'
  | 'Linguagens'
  | 'Humanas'
  | 'Natureza'
  | 'Matemática'
  | 'Literatura';

export interface StudyCardItem {
  id: string;
  titulo: string;
  categoria: 'Linguagens' | 'Humanas' | 'Natureza' | 'Matemática' | 'Literatura';
  materia: string;
  icone: string;
  tempoLeitura: string;
  incidencia: 'Mais Cai' | 'Médio' | 'Frequente';
  resumoBreve: string;
  pontosChave: string[];
  dicaEnem: string;
  corTheme: {
    bg: string;
    border: string;
    badge: string;
    text: string;
    glow: string;
  };
}

export interface MindMapItem {
  id: string;
  titulo: string;
  materia: string;
  nos: number;
  categoria: 'Linguagens' | 'Humanas' | 'Natureza' | 'Matemática' | 'Literatura';
  corTheme: string;
  dataSalva: string;
  icone: string;
  conceitosPrincipais: string[];
}

const STUDY_MATERIALS: StudyCardItem[] = [
  {
    id: 'mat_funcoes',
    titulo: 'Funções de 1º e 2º Grau & Gráficos',
    categoria: 'Matemática',
    materia: 'Matemática',
    icone: '📈',
    tempoLeitura: '5 min',
    incidencia: 'Mais Cai',
    resumoBreve: 'Análise de coeficientes lineares e angulares, raízes, vértice da parábola (máximo e mínimo) e interpretação de gráficos do cotidiano.',
    pontosChave: [
      'Função Afim: f(x) = ax + b (crescimento constante)',
      'Função Quadrática: f(x) = ax² + bx + c',
      'Vértice: Xv = -b/(2a) e Yv = -Δ/(4a) para pontos de máxima e mínima',
      'Interpretação de lucro máximo, custo mínimo e trajetórias'
    ],
    dicaEnem: 'O ENEM quase sempre cobra o vértice da parábola contextualizado como lucro máximo de uma empresa ou altura máxima de um projétil.',
    corTheme: {
      bg: 'bg-amber-500/10 dark:bg-amber-950/30',
      border: 'border-amber-500/40 hover:border-amber-400',
      badge: 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30',
      text: 'text-amber-600 dark:text-amber-400',
      glow: 'hover:shadow-amber-500/10'
    }
  },
  {
    id: 'hum_segunda_guerra',
    titulo: 'Segunda Guerra Mundial & Era Vargas',
    categoria: 'Humanas',
    materia: 'História',
    icone: '🌍',
    tempoLeitura: '7 min',
    incidencia: 'Mais Cai',
    resumoBreve: 'Ascensão dos regimes totalitários, alianças do Eixo e Aliados, Holocausto, participação da FEB e impactos na geopolítica do Estado Novo no Brasil.',
    pontosChave: [
      'Tratado de Versalhes e Crise de 1929 como raízes do conflito',
      'Totalitarismos: Fascismo italiano e Nazismo alemão',
      'Participação brasileira: Envio da Força Expedicionária Brasileira (FEB)',
      'Desfecho: Criação da ONU, Guerra Fria e Conferência de Bretton Woods'
    ],
    dicaEnem: 'Relacione o envio de tropas brasileiras para combater regimes autoritários na Europa com a contradição da ditadura interna de Vargas (Estado Novo), acelerando sua queda.',
    corTheme: {
      bg: 'bg-indigo-500/10 dark:bg-indigo-950/30',
      border: 'border-indigo-500/40 hover:border-indigo-400',
      badge: 'bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border-indigo-500/30',
      text: 'text-indigo-600 dark:text-indigo-400',
      glow: 'hover:shadow-indigo-500/10'
    }
  },
  {
    id: 'nat_ecologia',
    titulo: 'Ecologia, Biomas & Impactos Ambientais',
    categoria: 'Natureza',
    materia: 'Biologia',
    icone: '🌿',
    tempoLeitura: '6 min',
    incidencia: 'Mais Cai',
    resumoBreve: 'Cadeias e teias tróficas, ciclos biogeoquímicos (carbono, nitrogênio e água), bioacumulação, eutrofização e conservação da biodiversidade.',
    pontosChave: [
      'Fluxo de energia é unidirecional e decrescente ao longo dos níveis tróficos',
      'Magnificação trófica: poluentes se concentram nos níveis tróficos superiores',
      'Eutrofização artificial: excesso de nutrientes causa floração de algas e anóxia',
      'Principais biomas: Cerrado (berço das águas), Mata Atlântica e Caatinga'
    ],
    dicaEnem: 'A prova do ENEM adora cobrar soluções sustentáveis: biorremediação, controle biológico de pragas e recuperação de matas ciliares.',
    corTheme: {
      bg: 'bg-emerald-500/10 dark:bg-emerald-950/30',
      border: 'border-emerald-500/40 hover:border-emerald-400',
      badge: 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
      text: 'text-emerald-600 dark:text-emerald-400',
      glow: 'hover:shadow-emerald-500/10'
    }
  },
  {
    id: 'lit_memorias_postumas',
    titulo: 'Memórias Póstumas de Brás Cubas',
    categoria: 'Literatura',
    materia: 'Literatura',
    icone: '📖',
    tempoLeitura: '6 min',
    incidencia: 'Mais Cai',
    resumoBreve: 'Obra marco do Realismo brasileiro por Machado de Assis (1881). Narrador defunto, ironia fina, pessimismo e crítica à hipocrisia da elite carioca.',
    pontosChave: [
      'Narrador em primeira pessoa póstumo ("defunto autor")',
      'Capítulos curtos, metalinguagem e diálogo direto com o leitor',
      'Humanitismo de Quincas Borba como sátira ao Positivismo e Darwinismo Social',
      'Frase clássica do epílogo: "Não tive filhos, não transmiti a nenhuma criatura o legado da nossa miséria."'
    ],
    dicaEnem: 'Excelente repertório coringa na Redação para discutir a indiferença da elite perante as desigualdades sociais e a vaidade fútil.',
    corTheme: {
      bg: 'bg-rose-500/10 dark:bg-rose-950/30',
      border: 'border-rose-500/40 hover:border-rose-400',
      badge: 'bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-500/30',
      text: 'text-rose-600 dark:text-rose-400',
      glow: 'hover:shadow-rose-500/10'
    }
  },
  {
    id: 'ling_figuras',
    titulo: 'Figuras de Linguagem & Funções do Texto',
    categoria: 'Linguagens',
    materia: 'Português',
    icone: '✍️',
    tempoLeitura: '4 min',
    incidencia: 'Mais Cai',
    resumoBreve: 'Metáfora, metonímia, paradoxo, antítese, ironia, hipérbole e as 6 funções da linguagem de Roman Jakobson em anúncios e poemas.',
    pontosChave: [
      'Função Conativa/Apelativa: foco no receptor (verbos no imperativo, publicidade)',
      'Função Emotiva: foco no emissor (expressão de sentimentos)',
      'Função Metalinguística: o código explica o próprio código (poema sobre fazer poema)',
      'Diferença: Antítese (ideias opostas) vs Paradoxo (ideias contraditórias/impossíveis)'
    ],
    dicaEnem: 'O ENEM foca no efeito de sentido das figuras dentro de campanhas de saúde pública, cartazes e charges críticas.',
    corTheme: {
      bg: 'bg-blue-500/10 dark:bg-blue-950/30',
      border: 'border-blue-500/40 hover:border-blue-400',
      badge: 'bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/30',
      text: 'text-blue-600 dark:text-blue-400',
      glow: 'hover:shadow-blue-500/10'
    }
  },
  {
    id: 'nat_termodinamica',
    titulo: 'Termodinâmica, Calorimetria & Gases',
    categoria: 'Natureza',
    materia: 'Física',
    icone: '🔥',
    tempoLeitura: '5 min',
    incidencia: 'Mais Cai',
    resumoBreve: 'Calor sensível (Q=m·c·ΔT), calor latente (Q=m·L), 1ª e 2ª Leis da Termodinâmica, ciclos térmicos e rendimento de máquinas térmicas.',
    pontosChave: [
      '1ª Lei da Termodinâmica: ΔU = Q - W (conservação de energia)',
      'Trabalho de um gás: W = P·ΔV (em transformações isobáricas)',
      '2ª Lei: O calor não flui espontaneamente de um corpo frio para um quente',
      'Nenhuma máquina térmica opera com 100% de rendimento (Ciclo de Carnot)'
    ],
    dicaEnem: 'Preste muita atenção nos sinais: Gás expande (W > 0), gás recebe calor (Q > 0), gás comprime (W < 0).',
    corTheme: {
      bg: 'bg-cyan-500/10 dark:bg-cyan-950/30',
      border: 'border-cyan-500/40 hover:border-cyan-400',
      badge: 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border-cyan-500/30',
      text: 'text-cyan-600 dark:text-cyan-400',
      glow: 'hover:shadow-cyan-500/10'
    }
  },
  {
    id: 'mat_geometria',
    titulo: 'Geometria Plana & Espacial (Áreas e Volumes)',
    categoria: 'Matemática',
    materia: 'Matemática',
    icone: '📐',
    tempoLeitura: '6 min',
    incidencia: 'Mais Cai',
    resumoBreve: 'Cálculo de áreas de polígonos, círculos, volumes de prismas, cilindros, cones e esferas aplicados a caixas d’água e embalagens.',
    pontosChave: [
      'Área do Círculo: A = π·r² | Comprimento: C = 2·π·r',
      'Volume do Cilindro e Prisma: V = Área da Base × Altura',
      'Volume do Cone e Pirâmide: V = (1/3) × Área da Base × Altura',
      'Conversão essencial: 1 m³ = 1.000 Litros | 1 cm³ = 1 mL'
    ],
    dicaEnem: 'A pegadinha clássica é a conversão de unidades (dm³ para Litros ou cm para m) em problemas de reservatórios!',
    corTheme: {
      bg: 'bg-amber-500/10 dark:bg-amber-950/30',
      border: 'border-amber-500/40 hover:border-amber-400',
      badge: 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30',
      text: 'text-amber-600 dark:text-amber-400',
      glow: 'hover:shadow-amber-500/10'
    }
  },
  {
    id: 'hum_cidadania',
    titulo: 'Cidadania, Direitos Humanos & Constituição de 1988',
    categoria: 'Humanas',
    materia: 'Sociologia',
    icone: '⚖️',
    tempoLeitura: '5 min',
    incidencia: 'Mais Cai',
    resumoBreve: 'Evolução dos direitos civis, políticos e sociais (T.H. Marshall), Declaração Universal dos Direitos Humanos (1948) e a Constituição Cidadã.',
    pontosChave: [
      'Gerações de direitos: 1ª (Liberdade), 2ª (Igualdade), 3ª (Fraternidade/Ambiente)',
      'Artigo 5º da CF/88: Inviolabilidade do direito à vida, liberdade, igualdade e segurança',
      'Artigo 6º: Direitos sociais (educação, saúde, alimentação, trabalho, moradia, transporte)',
      'Conceito de cidadania ativa e movimentos sociais contemporâneos'
    ],
    dicaEnem: 'O Artigo 6º da Constituição é o maior coringa da Redação Nota 1000 para problematizar qualquer falha estatal em serviços essenciais.',
    corTheme: {
      bg: 'bg-indigo-500/10 dark:bg-indigo-950/30',
      border: 'border-indigo-500/40 hover:border-indigo-400',
      badge: 'bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border-indigo-500/30',
      text: 'text-indigo-600 dark:text-indigo-400',
      glow: 'hover:shadow-indigo-500/10'
    }
  },
  {
    id: 'lit_o_cortico',
    titulo: 'O Cortiço (Aluísio Azevedo)',
    categoria: 'Literatura',
    materia: 'Literatura',
    icone: '🏘️',
    tempoLeitura: '6 min',
    incidencia: 'Mais Cai',
    resumoBreve: 'Principal romance do Naturalismo no Brasil (1890). Zoomorfização dos personagens, determinismo do meio, raça e momento histórico.',
    pontosChave: [
      'O próprio cortiço atua como personagem vivo que se reproduz por cissiparidade',
      'Personagens: João Romão (capitalismo predatório), Jerônimo (abrasileiramento), Rita Baiana',
      'Zoomorfização: comparação constante de seres humanos a animais/insetos',
      'Oposição entre o cortiço popular e o sobrado aristocrático do Barão Miranda'
    ],
    dicaEnem: 'Use para exemplificar a segregação socioespacial urbana e a exploração da mão de obra periférica.',
    corTheme: {
      bg: 'bg-rose-500/10 dark:bg-rose-950/30',
      border: 'border-rose-500/40 hover:border-rose-400',
      badge: 'bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-500/30',
      text: 'text-rose-600 dark:text-rose-400',
      glow: 'hover:shadow-rose-500/10'
    }
  },
  {
    id: 'nat_genetica',
    titulo: 'Genética, Hereditariedade & Biotecnologia',
    categoria: 'Natureza',
    materia: 'Biologia',
    icone: '🧬',
    tempoLeitura: '6 min',
    incidencia: 'Mais Cai',
    resumoBreve: '1ª e 2ª Leis de Mendel, sistema ABO/Rh, herança ligada ao sexo, tecnologia do DNA recombinante, CRISPR e organismos transgênicos.',
    pontosChave: [
      '1ª Lei (Segregação dos Fatores): Proporção fenotípica 3:1 no cruzamento de heterozigotos',
      'Sistema ABO: Alelos múltiplos e codominância (IA e IB dominam sobre i)',
      'Transgênicos possuem genes de outras espécies inseridos (diferente de cisgênicos)',
      'Terapia gênica e clonagem terapêutica'
    ],
    dicaEnem: 'Cálculo de probabilidade genética combinada (regra do "E" multiplica, regra do "OU" soma) é questão certa no ENEM.',
    corTheme: {
      bg: 'bg-emerald-500/10 dark:bg-emerald-950/30',
      border: 'border-emerald-500/40 hover:border-emerald-400',
      badge: 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
      text: 'text-emerald-600 dark:text-emerald-400',
      glow: 'hover:shadow-emerald-500/10'
    }
  },
  {
    id: 'hum_revolucao_industrial',
    titulo: 'Revolução Industrial, Urbanização & Globalização',
    categoria: 'Humanas',
    materia: 'Geografia & História',
    icone: '🏭',
    tempoLeitura: '5 min',
    incidencia: 'Mais Cai',
    resumoBreve: 'Fases da industrialização (carvão/vapor, eletricidade/petróleo, robótica/tecnologia da informação), divisão internacional do trabalho e cidades globais.',
    pontosChave: [
      '1ª Revolução: Inglaterra, tear mecânico, ferrovias e êxodo rural',
      '2ª Revolução: Fordismo/Taylorismo, linha de montagem e produção em massa',
      '3ª Revolução: Toyotismo (just-in-time, flexibilização) e polos tecnológicos',
      'Impactos urbanos: Macrocefalia urbana, conurbação e gentrificação'
    ],
    dicaEnem: 'O ENEM costuma comparar o modelo Fordista (trabalho repetitivo) com o Toyotista (trabalho qualificado e flexível).',
    corTheme: {
      bg: 'bg-indigo-500/10 dark:bg-indigo-950/30',
      border: 'border-indigo-500/40 hover:border-indigo-400',
      badge: 'bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border-indigo-500/30',
      text: 'text-indigo-600 dark:text-indigo-400',
      glow: 'hover:shadow-indigo-500/10'
    }
  },
  {
    id: 'ling_generos',
    titulo: 'Gêneros Textuais & Variação Linguística',
    categoria: 'Linguagens',
    materia: 'Português',
    icone: '🗣️',
    tempoLeitura: '4 min',
    incidencia: 'Mais Cai',
    resumoBreve: 'Variações regionais (diatópicas), sociais (diastráticas), históricas (diacrônicas) e situacionais (diafásicas), sem preconceito linguístico.',
    pontosChave: [
      'Toda variante linguística é válida em seu contexto de uso',
      'Norma-padrão como instrumento de poder e formalidade',
      'Diferença entre tipo textual (narração, dissertação) e gênero (crônica, tweet, e-mail)',
      'Adequação vocabular à situação comunicativa'
    ],
    dicaEnem: 'A banca do ENEM combate veementemente o preconceito linguístico. Nenhuma variação regional é considerada "errada", mas sim adequada ou inadequada ao contexto.',
    corTheme: {
      bg: 'bg-blue-500/10 dark:bg-blue-950/30',
      border: 'border-blue-500/40 hover:border-blue-400',
      badge: 'bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/30',
      text: 'text-blue-600 dark:text-blue-400',
      glow: 'hover:shadow-blue-500/10'
    }
  }
];

const SAVED_MIND_MAPS: MindMapItem[] = [
  {
    id: 'mm_ecologia',
    titulo: 'Ecologia & Teias Tróficas',
    materia: 'Biologia',
    nos: 14,
    categoria: 'Natureza',
    corTheme: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
    dataSalva: 'Hoje',
    icone: '🌿',
    conceitosPrincipais: ['Produtores', 'Consumidores', 'Bioacumulação', 'Eutrofização', 'Ciclo do Nitrogênio']
  },
  {
    id: 'mm_segunda_guerra',
    titulo: 'Segunda Guerra Mundial',
    materia: 'História',
    nos: 18,
    categoria: 'Humanas',
    corTheme: 'border-indigo-500/40 bg-indigo-500/10 text-indigo-400',
    dataSalva: 'Ontem',
    icone: '🌍',
    conceitosPrincipais: ['Crise de 1929', 'Eixo vs Aliados', 'FEB no Brasil', 'Holocausto', 'Criação da ONU']
  },
  {
    id: 'mm_funcoes',
    titulo: 'Funções & Parábolas',
    materia: 'Matemática',
    nos: 12,
    categoria: 'Matemática',
    corTheme: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
    dataSalva: 'Há 2 dias',
    icone: '📈',
    conceitosPrincipais: ['Função Afim', 'Vértice (Xv, Yv)', 'Raízes / Bhaskara', 'Interpretação Gráfica']
  },
  {
    id: 'mm_modernismo',
    titulo: 'Modernismo Brasileiro & Vanguardas',
    materia: 'Literatura',
    nos: 16,
    categoria: 'Literatura',
    corTheme: 'border-rose-500/40 bg-rose-500/10 text-rose-400',
    dataSalva: 'Há 3 dias',
    icone: '🎨',
    conceitosPrincipais: ['Semana de 22', 'Antropofagia', '1ª Fase (Destrutiva)', '2ª Fase (Regionalista)']
  },
  {
    id: 'mm_cidadania',
    titulo: 'Cidadania & CF/88',
    materia: 'Sociologia',
    nos: 11,
    categoria: 'Humanas',
    corTheme: 'border-purple-500/40 bg-purple-500/10 text-purple-400',
    dataSalva: 'Há 4 dias',
    icone: '⚖️',
    conceitosPrincipais: ['Artigo 5º', 'Artigo 6º (Sociais)', 'Gerações de Direitos', 'Cidadania Ativa']
  },
  {
    id: 'mm_termodinamica',
    titulo: 'Termodinâmica & Carnot',
    materia: 'Física',
    nos: 13,
    categoria: 'Natureza',
    corTheme: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-400',
    dataSalva: 'Há 5 dias',
    icone: '🔥',
    conceitosPrincipais: ['1ª Lei (ΔU=Q-W)', 'Trabalho de Gás', 'Ciclo de Carnot', 'Rendimento Térmico']
  }
];

const CATEGORY_PILLS: BibliotecaCategory[] = [
  'Tudo',
  'Linguagens',
  'Humanas',
  'Natureza',
  'Matemática',
  'Literatura'
];

interface BibliotecaSectionProps {
  onAskGabi?: (prompt: string) => void;
  onOpenMindmapTab?: () => void;
}

export const BibliotecaSection: React.FC<BibliotecaSectionProps> = ({
  onAskGabi,
  onOpenMindmapTab
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<BibliotecaCategory>('Tudo');
  const [activeStudyModal, setActiveStudyModal] = useState<StudyCardItem | null>(null);
  const [activeMindmapModal, setActiveMindmapModal] = useState<MindMapItem | null>(null);

  // Filtered study cards based on query and category pill
  const filteredMaterials = useMemo(() => {
    return STUDY_MATERIALS.filter((item) => {
      const matchCategory =
        selectedCategory === 'Tudo' || item.categoria === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        item.titulo.toLowerCase().includes(q) ||
        item.materia.toLowerCase().includes(q) ||
        item.categoria.toLowerCase().includes(q) ||
        item.resumoBreve.toLowerCase().includes(q) ||
        item.dicaEnem.toLowerCase().includes(q);

      return matchCategory && matchSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div id="biblioteca-conteudos-section" className="BibliotecaSection space-y-8 pb-12">
      {/* 1. ESTRUTURA NO TOPO */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl sm:text-3xl">📚</span>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                Biblioteca & Conteúdos
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium max-w-xl">
              Fichamentos inteligentes, sínteses temáticas de alta incidência e resumos guiados para o ENEM e vestibulares.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 self-start sm:self-auto shrink-0 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-spin" style={{ animationDuration: '6s' }} />
            <span>{STUDY_MATERIALS.length} Fichamentos Guiados</span>
          </div>
        </div>

        {/* Autocomplete Search Bar */}
        <BibliotecaAutocompleteSearch
          materials={STUDY_MATERIALS}
          mindMaps={SAVED_MIND_MAPS}
          searchQuery={searchQuery}
          onSearchChange={(q) => setSearchQuery(q)}
          onSelectMaterial={(item) => setActiveStudyModal(item)}
          onSelectMindMap={(mm) => setActiveMindmapModal(mm)}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          selectedCategory={selectedCategory}
        />

        {/* 2. FILTROS DE MATÉRIA (CARROSSEL HORIZONTAL COM PÍLULAS DINÂMICAS) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 px-0.5">
            <span>Filtrar por Área de Conhecimento</span>
            <span className="text-[11px] font-normal text-slate-400">Deslize para ver todas</span>
          </div>
          <div
            id="biblioteca-pills-carousel"
            className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar scroll-smooth"
            style={{ WebkitOverflowScrolling: 'touch', whiteSpace: 'nowrap' }}
          >
            {CATEGORY_PILLS.map((cat) => {
              const isSelected = selectedCategory === cat;
              const count =
                cat === 'Tudo'
                  ? STUDY_MATERIALS.length
                  : STUDY_MATERIALS.filter((m) => m.categoria === cat).length;

              return (
                <motion.button
                  key={cat}
                  id={`pill-filter-${cat.toLowerCase()}`}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.03 }}
                  onClick={() => {
                    playClickSound();
                    setSelectedCategory(cat);
                  }}
                  className={`relative px-4 py-2 rounded-full text-xs font-black shrink-0 transition-colors duration-200 cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'text-white shadow-md shadow-indigo-600/30'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="biblioteca-active-pill-bg"
                      className="absolute inset-0 bg-indigo-600 rounded-full ring-2 ring-indigo-400/40"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                  <span
                    className={`relative z-10 text-[10px] px-1.5 py-0.5 rounded-full font-bold transition-colors ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. GRID DE CONTEÚDOS DINÂMICO COM ANIMAÇÕES FRAMER MOTION */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
              Materiais de Estudo & Fichamentos
            </h2>
          </div>
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
            {filteredMaterials.length} {filteredMaterials.length === 1 ? 'tópico' : 'tópicos'}
          </span>
        </div>

        <AnimatePresence mode="popLayout">
          {filteredMaterials.length > 0 ? (
            <motion.div
              layout
              id="biblioteca-materials-grid"
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}
            >
              {filteredMaterials.map((item) => (
                <motion.div
                  layout="position"
                  key={item.id}
                  id={`card-material-${item.id}`}
                  initial={{ opacity: 0, scale: 0.88, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: -15, transition: { duration: 0.18 } }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    playClickSound();
                    setActiveStudyModal(item);
                  }}
                  className={`group relative flex flex-col justify-between p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border ${item.corTheme.border} ${item.corTheme.glow} shadow-sm hover:shadow-xl transition-all duration-200 cursor-pointer overflow-hidden`}
                >
                  {/* Subtle top area glow */}
                  <div
                    className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-20 pointer-events-none ${item.corTheme.bg}`}
                  />

                  <div className="space-y-2.5">
                    {/* Category Pill & Icon */}
                    <div className="flex items-center justify-between gap-1.5">
                      <span className="text-2xl sm:text-3xl shrink-0 group-hover:scale-110 transition-transform duration-200">
                        {item.icone}
                      </span>
                      <span
                        className={`text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-full border ${item.corTheme.badge} uppercase tracking-wider truncate max-w-[100px]`}
                      >
                        {item.materia}
                      </span>
                    </div>

                    {/* Title */}
                    <div>
                      <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-snug line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {item.titulo}
                      </h3>
                    </div>

                    {/* Brief snippet */}
                    <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed font-normal">
                      {item.resumoBreve}
                    </p>
                  </div>

                  {/* Card Footer: Estimated read time + Visual Clickable Indicator */}
                  <div className="pt-3 mt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px] sm:text-[11px] font-bold">
                    <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500">
                      <Clock className="w-3 h-3" />
                      <span>{item.tempoLeitura}</span>
                    </div>

                    {/* Visual clickable call-to-action */}
                    <div className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 group-hover:translate-x-0.5 transition-transform font-black">
                      <span className="text-[10px]">Ler</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty-state"
              layout
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.25 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 text-center border border-slate-200 dark:border-slate-800 space-y-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto text-xl">
                🔍
              </div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                Nenhum material encontrado
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Não encontramos resumos para "{searchQuery}" na categoria "{selectedCategory}". Tente outros termos ou limpe o filtro.
              </p>
              <button
                onClick={() => {
                  playClickSound();
                  setSearchQuery('');
                  setSelectedCategory('Tudo');
                }}
                className="mt-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-black hover:bg-indigo-700 transition-colors cursor-pointer"
              >
                Restaurar todos os materiais
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 4. SEÇÃO "MEUS MAPAS MENTAIS" */}
      <section className="bg-slate-900 dark:bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 text-white space-y-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xl">🧠</span>
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                Meus Mapas Mentais
              </h2>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Conexões visuais e diagramas ramificados para revisão acelerada de véspera.
            </p>
          </div>

          {onOpenMindmapTab && (
            <button
              onClick={onOpenMindmapTab}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600/80 hover:bg-indigo-600 text-white text-xs font-black flex items-center gap-1.5 self-start sm:self-auto transition-all cursor-pointer border border-indigo-400/30"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
              <span>Gerador de Mapas IA</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Horizontal Carousel of smaller cards */}
        <div
          id="biblioteca-mindmaps-carousel"
          className="flex items-stretch gap-3 sm:gap-4 overflow-x-auto pb-3 pt-1 no-scrollbar scroll-smooth"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {SAVED_MIND_MAPS.map((map) => (
            <div
              key={map.id}
              id={`card-mindmap-${map.id}`}
              onClick={() => setActiveMindmapModal(map)}
              className="w-64 sm:w-72 shrink-0 p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-indigo-500/50 flex flex-col justify-between space-y-3 cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-md group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl group-hover:scale-110 transition-transform">
                    {map.icone}
                  </span>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-slate-700/80 text-slate-300 border border-slate-600">
                    {map.nos} ramificações
                  </span>
                </div>

                <div>
                  <h4 className="text-xs sm:text-sm font-black text-white leading-snug group-hover:text-indigo-300 transition-colors">
                    {map.titulo}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    {map.materia}
                  </span>
                </div>

                {/* Concepts tags preview */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {map.conceitosPrincipais.slice(0, 3).map((c, i) => (
                    <span
                      key={i}
                      className="text-[9px] px-1.5 py-0.5 rounded-md bg-slate-900/60 text-slate-300 font-medium border border-slate-700/50 truncate max-w-[120px]"
                    >
                      {c}
                    </span>
                  ))}
                  {map.conceitosPrincipais.length > 3 && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-slate-900/60 text-slate-400 font-medium">
                      +{map.conceitosPrincipais.length - 3}
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                <span>Salvo {map.dataSalva}</span>
                <span className="text-indigo-400 font-black flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Ver Diagrama ➔
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DETAIL MODAL: FICHA DE ESTUDO COMPLETA */}
      <AnimatePresence>
        {activeStudyModal && (
          <div className="fixed inset-0 z-[100001] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-2xl flex items-center justify-center border border-indigo-100 dark:border-indigo-800/80 shrink-0">
                    {activeStudyModal.icone}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${activeStudyModal.corTheme.badge} uppercase`}>
                        {activeStudyModal.materia}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        {activeStudyModal.incidencia} no ENEM
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-1">
                      {activeStudyModal.titulo}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setActiveStudyModal(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Summary Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Visão Geral do Tópico
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                  {activeStudyModal.resumoBreve}
                </p>
              </div>

              {/* Key Points */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Pontos Fundamentais para Lembrar</span>
                </h4>
                <div className="space-y-2">
                  {activeStudyModal.pontosChave.map((p, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200"
                    >
                      <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key ENEM Tip */}
              <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-950/40 border border-amber-500/30 space-y-1 text-amber-900 dark:text-amber-200">
                <div className="flex items-center gap-1.5 font-black text-xs">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span>Dica de Ouro no ENEM</span>
                </div>
                <p className="text-xs leading-relaxed">
                  {activeStudyModal.dicaEnem}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
                {onAskGabi && (
                  <button
                    onClick={() => {
                      const topic = activeStudyModal.titulo;
                      setActiveStudyModal(null);
                      onAskGabi(
                        `Gabi, estou estudando o resumo de "${topic}" na Biblioteca. Pode me fazer 2 perguntas de teste no estilo ENEM para fixar o conteúdo?`
                      );
                    }}
                    className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-indigo-600/30"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Tirar Dúvidas com Gabi IA</span>
                  </button>
                )}
                <button
                  onClick={() => setActiveStudyModal(null)}
                  className="w-full sm:w-auto py-3 px-5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DETAIL MODAL: MAPA MENTAL */}
      <AnimatePresence>
        {activeMindmapModal && (
          <div className="fixed inset-0 z-[100001] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-xl bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl text-white space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{activeMindmapModal.icone}</span>
                  <div>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase">
                      {activeMindmapModal.materia}
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-white mt-1">
                      {activeMindmapModal.titulo}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => setActiveMindmapModal(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Nós & Conexões do Mapa Mental ({activeMindmapModal.nos} nós)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeMindmapModal.conceitosPrincipais.map((c, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center gap-2 text-xs font-bold text-slate-200"
                    >
                      <span className="w-2 h-2 rounded-full bg-indigo-400" />
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  onClick={() => {
                    setActiveMindmapModal(null);
                    if (onOpenMindmapTab) {
                      onOpenMindmapTab();
                    }
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Brain className="w-4 h-4" />
                  <span>Abrir no Estúdio de Mapas Mentais</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
