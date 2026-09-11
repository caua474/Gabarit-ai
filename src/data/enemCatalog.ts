export interface EnemTopic {
  id: string;
  nome: string;
  incidencia: 'Mais Cai' | 'Médio' | 'Básico';
  descricao: string;
  dicaChave: string;
  exemploPratico: string;
}

export interface EnemDisciplina {
  id: string;
  nome: string;
  icone: string;
  topicos: EnemTopic[];
}

export interface EnemArea {
  id: string;
  areaNome: string;
  sigla: string;
  corTheme: string;
  gradient: string;
  borderColor: string;
  bgGlow: string;
  disciplinas: EnemDisciplina[];
}

export const ENEM_CATALOG: EnemArea[] = [
  {
    id: 'matematica',
    areaNome: 'Matemática e suas Tecnologias',
    sigla: 'MAT',
    corTheme: 'amber',
    gradient: 'from-amber-500 via-orange-500 to-amber-600',
    borderColor: 'border-amber-500/40',
    bgGlow: 'bg-amber-500/10',
    disciplinas: [
      {
        id: 'mat_geral',
        nome: 'Matemática',
        icone: '📐',
        topicos: [
          {
            id: 'mat_alg',
            nome: 'Álgebra, Razão e Proporção',
            incidencia: 'Mais Cai',
            descricao: 'Regra de três simples e composta, porcentagem, escalas numéricas e proporcionalidade em gráficos.',
            dicaChave: 'Em escala cartográfica, Escala = Distância no Mapa / Distância Real. Fique atento às unidades (cm para km)!',
            exemploPratico: 'Se 1 cm no mapa representa 5 km no terreno real, a escala é de 1:500.000.',
          },
          {
            id: 'mat_geo_plana',
            nome: 'Geometria Plana',
            incidencia: 'Mais Cai',
            descricao: 'Áreas de triângulos, círculos, quadriláteros e Teorema de Pitágoras em situações cotidianas.',
            dicaChave: 'A área do círculo é π·r² e o comprimento da circunferência é 2·π·r.',
            exemploPratico: 'Cálculo do custo para piso em uma sala retangular ou irrigação em pivô central circular.',
          },
          {
            id: 'mat_geo_esp',
            nome: 'Geometria Espacial',
            incidencia: 'Mais Cai',
            descricao: 'Cálculo de volume de prismas, cilindros, pirâmides, cones, esferas e projeções ortogonais.',
            dicaChave: 'Volume de prisma e cilindro = Área da Base × Altura. Para pirâmide e cone, divida por 3!',
            exemploPratico: 'Descobrir a capacidade em litros de um reservatório cilíndrico de água (1 m³ = 1000 Litros).',
          },
          {
            id: 'mat_geo_ana',
            nome: 'Geometria Analítica',
            incidencia: 'Médio',
            descricao: 'Distância entre dois pontos, equação da reta, coeficiente angular e equação da circunferência.',
            dicaChave: 'O coeficiente angular (m) representa a inclinação da reta: m = (y₂ - y₁) / (x₂ - x₁).',
            exemploPratico: 'Determinar o ponto de encontro de duas trajetórias retilíneas em um plano cartesiano.',
          },
          {
            id: 'mat_estat',
            nome: 'Estatística (Média, Moda e Mediana)',
            incidencia: 'Mais Cai',
            descricao: 'Análise de dados de tabelas e gráficos, média aritmética simples e ponderada, moda e mediana.',
            dicaChave: 'Para achar a Mediana, organize TODOS os valores em ordem crescente (Rol) primeiro!',
            exemploPratico: 'Encontrar a nota média de um candidato em um concurso com pesos diferentes em cada prova.',
          },
          {
            id: 'mat_prob',
            nome: 'Probabilidade & Análise Combinatória',
            incidencia: 'Mais Cai',
            descricao: 'Probabilidade simples e condicional, princípio fundamental da contagem, arranjos e combinações.',
            dicaChave: 'Probabilidade = Casos Favoráveis / Casos Totais. Se a ordem importa, use Arranjo; se não importa, Combinação.',
            exemploPratico: 'Calcular a chance de tirar um ás vermelho em um baralho comum de 52 cartas.',
          },
          {
            id: 'mat_trigo',
            nome: 'Trigonometria',
            incidencia: 'Médio',
            descricao: 'Seno, cosseno e tangente no triângulo retângulo e no círculo trigonométrico, Lei dos Senos/Cossenos.',
            dicaChave: 'Lembre do SOH-CAH-TOA: Seno = Oposto/Hipo, Cosseno = Adj/Hipo, Tangente = Oposto/Adj.',
            exemploPratico: 'Calcular a altura de um prédio a partir da sombra projetada no chão e o ângulo do sol.',
          },
          {
            id: 'mat_fin',
            nome: 'Matemática Financeira & Porcentagem',
            incidencia: 'Mais Cai',
            descricao: 'Juros simples, juros compostos, descontos, acréscimos sucessivos e inflação.',
            dicaChave: 'Juros Compostos: M = C·(1 + i)ᵗ. Dois aumentos sucessivos de 10% resultam em 21% acumulado (1,1 × 1,1).',
            exemploPratico: 'Comparar compras à vista com desconto versus parcelamento com taxa de juros ao mês.',
          },
          {
            id: 'mat_func',
            nome: 'Funções (1º e 2º Grau, Exponencial e Log)',
            incidencia: 'Mais Cai',
            descricao: 'Interpretação de gráficos, Vértice da Parábola (máximos e mínimos), crescimento exponencial e logaritmos.',
            dicaChave: 'O ponto de máximo ou mínimo da parábola ocorre no Vértice: Xv = -b / (2a) e Yv = -Δ / (4a).',
            exemploPratico: 'Achar o preço do ingresso que gera o maior faturamento possível em um show.',
          },
        ],
      },
    ],
  },
  {
    id: 'natureza',
    areaNome: 'Ciências da Natureza e suas Tecnologias',
    sigla: 'NAT',
    corTheme: 'emerald',
    gradient: 'from-emerald-500 via-teal-500 to-green-600',
    borderColor: 'border-emerald-500/40',
    bgGlow: 'bg-emerald-500/10',
    disciplinas: [
      {
        id: 'bio',
        nome: 'Biologia',
        icone: '🧬',
        topicos: [
          {
            id: 'bio_ecologia',
            nome: 'Ecologia (Cadeias, Ciclos e Impactos)',
            incidencia: 'Mais Cai',
            descricao: 'Níveis tróficos, biomagnificação/bioacumulação, eutrofização, ciclo do nitrogênio e aquecimento global.',
            dicaChave: 'Na biomagnificação, a concentração de poluentes não biodegradáveis (ex: mercúrio) AUMENTA ao longo dos níveis tróficos.',
            exemploPratico: 'Identificar que o topo da cadeia alimentar (ex: gavião ou homem) sofre maior impacto por contaminação química.',
          },
          {
            id: 'bio_citologia',
            nome: 'Citologia & Bioenergética',
            incidencia: 'Mais Cai',
            descricao: 'Organelas celulares, membrana plasmática (transporte ativo e passivo), fotossíntese e respiração celular.',
            dicaChave: 'A respiração celular ocorre nas mitocôndrias e gera ATP; a fotossíntese ocorre nos cloroplastos e fixa carbono.',
            exemploPratico: 'Entender a ação de venenos que bloqueiam a cadeia respiratória mitocondrial.',
          },
          {
            id: 'bio_genetica',
            nome: 'Genética & Biotecnologia',
            incidencia: 'Mais Cai',
            descricao: '1ª e 2ª Leis de Mendel, heredogramas, sistema ABO/Rh, transgênicos e tecnologia do DNA recombinante.',
            dicaChave: 'Indivíduos do tipo sanguíneo O- são doadores universais e AB+ são receptores universais.',
            exemploPratico: 'Calcular a probabilidade de um casal heterozigoto ter um filho com doença recessiva.',
          },
          {
            id: 'bio_fisiologia',
            nome: 'Fisiologia Humana & Imunologia',
            incidencia: 'Mais Cai',
            descricao: 'Sistemas circulatório, digestório e excretor; diferença vital entre vacina (prevenção) e soro (cura imediata).',
            dicaChave: 'Vacina estimula a imunidade ATIVA (produção de anticorpos e memória). Soro é imunidade PASSIVA (anticorpos prontos).',
            exemploPratico: 'Saber quando aplicar soro antiofídico após picada de cobra ou vacina tríplice viral.',
          },
        ],
      },
      {
        id: 'qui',
        nome: 'Química',
        icone: '🧪',
        topicos: [
          {
            id: 'qui_organica',
            nome: 'Química Orgânica (Funções e Isomeria)',
            incidencia: 'Mais Cai',
            descricao: 'Identificação de álcool, éter, éster, aldeído, cetona, ácido carboxílico, amina e amida.',
            dicaChave: 'Éster tem odor de frutas (flavorizantes); Ácido Carboxílico possui o grupo -COOH e caráter ácido.',
            exemploPratico: 'Reconhecer grupos funcionais em moléculas de medicamentos e pesticidas.',
          },
          {
            id: 'qui_estequio',
            nome: 'Estequiometria & Soluções',
            incidencia: 'Mais Cai',
            descricao: 'Cálculo de massa, volume molar (22,4 L nas CNTP), rendimento, pureza e concentração comum/molar.',
            dicaChave: 'Sempre balanceie a equação química ANTES de montar a regra de três das proporções em mol!',
            exemploPratico: 'Calcular a massa de CO₂ liberada na combustão completa de 1 litro de etanol.',
          },
          {
            id: 'qui_termo',
            nome: 'Termoquímica & Equilíbrio Químico',
            incidencia: 'Mais Cai',
            descricao: 'Entalpia (ΔH positivo = endotérmico, negativo = exotérmico), Lei de Hess e Princípio de Le Chatelier.',
            dicaChave: 'Em reações exotérmicas, o aumento de temperatura desloca o equilíbrio para o lado dos reagentes.',
            exemploPratico: 'Análise energética de combustíveis alternativos (hidrogênio vs. gasolina).',
          },
          {
            id: 'qui_eletro',
            nome: 'Eletroquímica (Pilhas e Eletrólise)',
            incidencia: 'Mais Cai',
            descricao: 'Potenciais de redução, polo positivo (cátodo) e negativo (ânodo), corrosão e proteção catódica.',
            dicaChave: 'Quem tem maior potencial de redução sofre REDUÇÃO (cátodo). Dica mnemônica: CRAO (Cátodo Reduz, Ânodo Oxida).',
            exemploPratico: 'Uso de ânodos de sacrifício (zinco ou magnésio) para proteger cascos de navios da ferrugem.',
          },
        ],
      },
      {
        id: 'fis',
        nome: 'Física',
        icone: '⚡',
        topicos: [
          {
            id: 'fis_eletro',
            nome: 'Eletrodinâmica & Circuitos',
            incidencia: 'Mais Cai',
            descricao: 'Primeira e Segunda Leis de Ohm, consumo de energia elétrica (kWh = P·Δt/1000) e resistores em série/paralelo.',
            dicaChave: 'No chuveiro, água mais quente exige MENOR resistência para aumentar a potência dissipada (P = U²/R).',
            exemploPratico: 'Calcular o custo mensal na conta de luz decorrente do uso diário do chuveiro elétrico.',
          },
          {
            id: 'fis_ondul',
            nome: 'Ondulatória & Fenômenos Ondulatórios',
            incidencia: 'Mais Cai',
            descricao: 'Equação fundamental (v = λ·f), reflexão, refração, difração, interferência e Efeito Doppler.',
            dicaChave: 'A frequência da onda NUNCA muda ao mudar de meio de propagação (refração). Som mais agudo = maior frequência.',
            exemploPratico: 'Explicar por que a sirene da ambulância parece mais aguda quando ela se aproxima do observador.',
          },
          {
            id: 'fis_mecanica',
            nome: 'Mecânica, Energia e Leis de Newton',
            incidencia: 'Mais Cai',
            descricao: 'Conservação da energia mecânica (cinética e potencial), trabalho de uma força e atrito.',
            dicaChave: 'Em sistemas conservativos, Energia Mecânica Inicial = Energia Mecânica Final (Ec + Ep = constante).',
            exemploPratico: 'Calcular a velocidade de um carrinho de montanha-russa no ponto mais baixo da pista.',
          },
          {
            id: 'fis_termo',
            nome: 'Termologia & Calorimetria',
            incidencia: 'Médio',
            descricao: 'Calor sensível (Q = m·c·ΔT), calor latente (Q = m·L), processos de propagação de calor e gases ideais.',
            dicaChave: 'Condução ocorre em sólidos, Convecção em fluidos (líquidos e gases) e Irradiação no vácuo (ondas eletromagnéticas).',
            exemploPratico: 'Funcionamento de garrafas térmicas com paredes espelhadas para evitar irradiação de calor.',
          },
        ],
      },
    ],
  },
  {
    id: 'humanas',
    areaNome: 'Ciências Humanas e suas Tecnologias',
    sigla: 'HUM',
    corTheme: 'rose',
    gradient: 'from-rose-500 via-red-500 to-pink-600',
    borderColor: 'border-rose-500/40',
    bgGlow: 'bg-rose-500/10',
    disciplinas: [
      {
        id: 'his',
        nome: 'História',
        icone: '🏛️',
        topicos: [
          {
            id: 'his_brasil_rep',
            nome: 'Brasil República (Era Vargas e Ditadura Militar)',
            incidencia: 'Mais Cai',
            descricao: 'Trabalhismo e DIP em Vargas, o golpe civil-militar de 1964, AI-5, milagre econômico e processo de redemocratização.',
            dicaChave: 'O AI-5 (1968) suspendeu o habeas corpus e consolidou o período de maior repressão política na ditadura.',
            exemploPratico: 'Análise de canções de protesto de Chico Buarque e Gilberto Gil censuradas nos festivais dos anos 60 e 70.',
          },
          {
            id: 'his_brasil_col',
            nome: 'Brasil Colônia & Escravidão',
            incidencia: 'Mais Cai',
            descricao: 'Economia açucareira, ciclo do ouro, resistência escrava (quilombos) e impactos sociais da escravidão no presente.',
            dicaChave: 'A escravidão indígena foi gradualmente substituída pelo tráfico transatlântico de africanos devido à alta lucratividade mercantil.',
            exemploPratico: 'Compreender as raízes históricas da desigualdade racial contemporânea no Brasil.',
          },
          {
            id: 'his_geral_contemp',
            nome: 'História Contemporânea & Guerras Mundiais',
            incidencia: 'Mais Cai',
            descricao: 'Imperialismo no séc. XIX, 1ª e 2ª Guerras, Nazifascismo, Guerra Fria e a Queda do Muro de Berlim.',
            dicaChave: 'O Tratado de Versalhes (1919) humilhou a Alemanha com sanções severas, alimentando o revanchismo que levou ao nazismo.',
            exemploPratico: 'Interpretação de cartazes de propaganda de guerra dos Estados Unidos e da União Soviética.',
          },
        ],
      },
      {
        id: 'geo',
        nome: 'Geografia',
        icone: '🌍',
        topicos: [
          {
            id: 'geo_agraria',
            nome: 'Geografia Agrária & Agronegócio',
            incidencia: 'Mais Cai',
            descricao: 'Estrutura fundiária concentrada, agronegócio de exportação vs. agricultura familiar (alimentação interna) e conflitos no campo.',
            dicaChave: 'Mais de 70% dos alimentos que vão para a mesa do brasileiro vêm da agricultura familiar, apesar da menor área de terras ocupada.',
            exemploPratico: 'Avaliação dos impactos ambientais do avanço da fronteira agrícola sobre o Cerrado e a Amazônia.',
          },
          {
            id: 'geo_urbana',
            nome: 'Geografia Urbana & Demografia',
            incidencia: 'Mais Cai',
            descricao: 'Urbanização desordenada, segregação socioespacial, gentrificação, mobilidade urbana e transição demográfica no Brasil.',
            dicaChave: 'O Brasil passa por transição demográfica: queda na taxa de fecundidade e rápido envelhecimento populacional.',
            exemploPratico: 'Problemas de inundações urbanas agravadas pela impermeabilização do solo por asfalto.',
          },
          {
            id: 'geo_ambiental',
            nome: 'Geografia Ambiental & Biomas Brasileiros',
            incidencia: 'Mais Cai',
            descricao: 'Características e ameaças à Amazônia, Cerrado, Caatinga, Mata Atlântica, Pantanal e Pampa.',
            dicaChave: 'O Cerrado é considerado a "caixa d’água do Brasil" por abrigar as nascentes de três grandes bacias hidrográficas.',
            exemploPratico: 'Impactos do desmatamento da Mata Ciliar no assoreamento de rios.',
          },
        ],
      },
      {
        id: 'filo_socio',
        nome: 'Filosofia e Sociologia',
        icone: '🧠',
        topicos: [
          {
            id: 'filo_politica',
            nome: 'Filosofia Política & Ética',
            incidencia: 'Mais Cai',
            descricao: 'Contratualistas (Hobbes, Locke e Rousseau), Ética a Nicômaco de Aristóteles, Maquiavel e Iluminismo.',
            dicaChave: 'Para Hobbes o homem é o lobo do homem (Estado forte); Locke defende direitos naturais e propriedade; Rousseau vê a sociedade corrompendo o homem.',
            exemploPratico: 'Debates sobre a legitimidade da intervenção do Estado na liberdade individual.',
          },
          {
            id: 'socio_classicos',
            nome: 'Sociologia Clássica & Mundo do Trabalho',
            incidencia: 'Mais Cai',
            descricao: 'Durkheim (Fato Social), Marx (Luta de Classes e Mais-Valia), Weber (Ação Social) e a precarização do trabalho (Uberização).',
            dicaChave: 'Mais-valia é a diferença entre o valor produzido pelo trabalho do operário e o salário pago pelo capitalista.',
            exemploPratico: 'Discussão sobre jornadas de trabalho, informalidade e direitos trabalhistas na era dos aplicativos.',
          },
        ],
      },
    ],
  },
  {
    id: 'linguagens',
    areaNome: 'Linguagens, Códigos e suas Tecnologias',
    sigla: 'LIN',
    corTheme: 'purple',
    gradient: 'from-purple-500 via-indigo-500 to-violet-600',
    borderColor: 'border-purple-500/40',
    bgGlow: 'bg-purple-500/10',
    disciplinas: [
      {
        id: 'port_interp',
        nome: 'Língua Portuguesa',
        icone: '📖',
        topicos: [
          {
            id: 'port_interp_generos',
            nome: 'Interpretação Textual & Gêneros Textuais',
            incidencia: 'Mais Cai',
            descricao: 'Funções da linguagem (emotiva, referencial, conativa, metalinguística), tipologia textual e inferência de sentido.',
            dicaChave: 'A função conativa/apelativa foca no receptor com verbos no imperativo, típica da publicidade e discursos políticos.',
            exemploPratico: 'Identificar a intenção comunicativa em campanhas de vacinação ou anúncios de utilidade pública.',
          },
          {
            id: 'port_variacao',
            nome: 'Variação Linguística & Preconceito Linguístico',
            incidencia: 'Mais Cai',
            descricao: 'Variações regionais (diatópicas), sociais (diastráticas), históricas (diacrônicas) e situacionais (diafásicas).',
            dicaChave: 'O ENEM nunca considera uma variante regional ou popular como "errada", mas sim como adequada ou inadequada ao contexto.',
            exemploPratico: 'Análise de canções de Luiz Gonzaga ou poesias caipiras valorizando o dialeto regional.',
          },
        ],
      },
      {
        id: 'lit',
        nome: 'Literatura Brasileira',
        icone: '📚',
        topicos: [
          {
            id: 'lit_modernismo',
            nome: 'Modernismo Brasileiro (As 3 Fases)',
            incidencia: 'Mais Cai',
            descricao: 'Semana de Arte Moderna de 1922 (Fase Heroica), Geração de 30 (Romance Regionalista de Graciliano Ramos) e Geração de 45 (Clarice Lispector e Guimarães Rosa).',
            dicaChave: '"Vidas Secas" de Graciliano Ramos retrata a desumanização da família de Fabiano pela seca no sertão nordestino.',
            exemploPratico: 'Interpretação do poema "No Meio do Caminho" de Carlos Drummond de Andrade.',
          },
          {
            id: 'lit_realismo',
            nome: 'Realismo e Naturalismo (Machado de Assis e Aluísio Azevedo)',
            incidencia: 'Mais Cai',
            descricao: 'Ironia machadiana, pessimismo, crítica à hipocrisia da elite burguesa carioca e o determinismo biológico em "O Cortiço".',
            dicaChave: 'Em "Dom Casmurro", Machado deixa a dúvida eterna da traição de Capitu na narrativa em primeira pessoa de Bentinho.',
            exemploPratico: 'Identificar a visão zoomórfica dos moradores de uma habitação coletiva em Aluísio Azevedo.',
          },
          {
            id: 'lit_contemp',
            nome: 'Literatura Contemporânea & Leitura Crítica',
            incidencia: 'Mais Cai',
            descricao: 'Poesia marginal, prosa afro-brasileira (Carolina Maria de Jesus, Conceição Evaristo) e hibridismo de linguagens.',
            dicaChave: 'Carolina Maria de Jesus escreveu "Quarto de Despejo" relatando a vivência real na favela do Canindé nos anos 1950.',
            exemploPratico: 'Analise da linguagem poética urbana nas batalhas de rima e saraus periféricos.',
          },
        ],
      },
      {
        id: 'red',
        nome: 'Redação ENEM',
        icone: '✍️',
        topicos: [
          {
            id: 'red_estrit',
            nome: 'Estruturação do Texto Dissertativo-Argumentativo',
            incidencia: 'Mais Cai',
            descricao: 'Construção da Tese na Introdução, Desenvolvimento com D1 e D2 e Conclusão com Proposta de Intervenção.',
            dicaChave: 'A tese deve conter 2 argumentos claros (A1 e A2) que serão detalhados respectivamente no D1 e no D2.',
            exemploPratico: 'Elaboração de um parágrafo introdutório perfeito com alusão histórica inicial.',
          },
          {
            id: 'red_comp5',
            nome: 'Proposta de Intervenção & As 5 Competências',
            incidencia: 'Mais Cai',
            descricao: 'Os 5 elementos obrigatórios: Agente, Ação, Meio/Modo, Efeito e Detalhamento para atingir os 200 pontos na Competência 5.',
            dicaChave: 'Lembre do modelo AAMED: "O Ministério da Educação [Agente] deve criar oficinas [Ação], por meio de verbas públicas [Meio], a fim de democratizar o saber [Efeito], com palestrantes renomados [Detalhamento]".',
            exemploPratico: 'Garantir a nota máxima na C5 sem deixar nenhum elemento de fora.',
          },
        ],
      },
      {
        id: 'ling_estran',
        nome: 'Língua Estrangeira (Inglês e Espanhol)',
        icone: '🌐',
        topicos: [
          {
            id: 'ing_interp',
            nome: 'Inglês (Interpretação e Vocabulário)',
            incidencia: 'Mais Cai',
            descricao: 'Leitura de tirinhas, letras de música, poemas e notícias em inglês; conectivos de oposição (however, subtle, whereas) e cognatos.',
            dicaChave: 'Cuidado com Falsos Cognatos: "Pretend" significa fingir (não pretender); "Push" significa empurrar (não puxar)!',
            exemploPratico: 'Compreender a crítica social presente na letra de uma música pop em língua inglesa.',
          },
          {
            id: 'esp_interp',
            nome: 'Espanhol (Interpretação e Falsos Amigos)',
            incidencia: 'Mais Cai',
            descricao: 'Heterotônicos, heterosemânticos (Falsos Amigos: todavia, embarazada, exquisito) e interpretação de textos jornalísticos/literários.',
            dicaChave: '"Todavía" em espanhol significa AINDA (não todavia/contudo); "Embarazada" significa grávida (não envergonhada)!',
            exemploPratico: 'Interpretar crônicas e tirinhas do personagem Mafalda de Quino.',
          },
        ],
      },
      {
        id: 'artes_ef',
        nome: 'Artes e Educação Física',
        icone: '🎨',
        topicos: [
          {
            id: 'artes_hist',
            nome: 'História da Arte & Vanguardas Europeias',
            incidencia: 'Mais Cai',
            descricao: 'Cubismo, Futurismo, Dadaísmo, Surrealismo, Expressionismo e a transição da Arte Clássica para a Moderna.',
            dicaChave: 'O Cubismo (Picasso) fragmenta as formas geométricamente para mostrar múltiplos ângulos do objeto ao mesmo tempo.',
            exemploPratico: 'Analise da obra "Guernica" de Picasso como denúncia aos horrores da guerra.',
          },
          {
            id: 'ef_saude',
            nome: 'Cultura Corporal, Saúde e Sociedade',
            incidencia: 'Mais Cai',
            descricao: 'Padrões de beleza e mídia, esporte de rendimento vs. esporte de lazer, sedentarismo e inclusão através do corpo.',
            dicaChave: 'A Educação Física no ENEM aborda o corpo sob a perspectiva social, cultural e de saúde coletiva, não apenas biomecânica.',
            exemploPratico: 'Discussão sobre a influência das redes sociais nos transtornos de imagem corporal.',
          },
        ],
      },
    ],
  },
];

export type SubjectArea = EnemArea;
export const enemCatalog = ENEM_CATALOG;
export default ENEM_CATALOG;
