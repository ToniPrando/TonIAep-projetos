import { Project, Technology, ServiceItem } from '../types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Sites com Sistemas Integrados',
    subtitle: 'Portais web institucionais conectados a bancos de dados e APIs',
    description: 'Desenvolvimento de sites profissionais e landing pages integrados a painéis administrativos, bancos relacionais, formulários dinâmicos e disparo de notificações.',
    longDescription: 'Solução completa que une interfaces modernas e responsivas à integração profunda com backends e serviços na nuvem. Permite gestão dinâmica de conteúdos, captação de clientes, agendamentos automáticos e sincronização em tempo real de dados com Supabase e PostgreSQL.',
    category: 'Sites',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    technologies: ['React', 'TypeScript', 'Supabase', 'SQL', 'PostgreSQL', 'GitHub'],
    projectUrl: '',
    githubUrl: '',
    featured: true,
    metrics: [
      { label: 'Tempo de carregamento', value: '< 1s' },
      { label: 'Integrações ativas', value: '100% cloud' },
      { label: 'Disponibilidade', value: '99.9%' },
    ],
    keyFeatures: [
      'Integração direta com APIs e bancos de dados Supabase/PostgreSQL',
      'Painel administrativo para gestão e atualização dinâmica de conteúdo',
      'Design responsivo, acessível e otimizado para SEO e conversão',
      'Formulários dinâmicos com validação e disparo de notificações'
    ],
    createdAt: '2026-02-15'
  },
  {
    id: 'proj-2',
    title: 'Sistema de Controle de Estoque',
    subtitle: 'Gestão de inventário, movimentações e alertas de reposição em tempo real',
    description: 'Sistema web para controle rigoroso de estoque, entradas e saídas de mercadorias, cadastro de fornecedores, categorização de produtos e alertas automáticos de níveis críticos.',
    longDescription: 'Plataforma empresarial projetada para eliminar perdas e desvios. Possui relatórios de giro de estoque, rastreabilidade de movimentações, histórico auditável de operações e consultas SQL de alta velocidade para relatórios gerenciais.',
    category: 'Sistemas',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop',
    technologies: ['SQL', 'PostgreSQL', 'Supabase', 'React', 'TypeScript', 'GitHub'],
    projectUrl: '',
    githubUrl: '',
    featured: true,
    metrics: [
      { label: 'Precisão do inventário', value: '99.8%' },
      { label: 'Redução de perdas', value: '40%' },
      { label: 'Consultas SQL', value: '< 25ms' },
    ],
    keyFeatures: [
      'Registro detalhado de entradas, saídas e movimentações de produtos',
      'Alertas automáticos de estoque mínimo e previsão de reabastecimento',
      'Consultas SQL analíticas para relatórios de produtos e giro de estoque',
      'Exportação de dados e controle de permissões por usuário'
    ],
    createdAt: '2026-01-20'
  },
  {
    id: 'proj-3',
    title: 'Controle de Banco de Horas Empresarial',
    subtitle: 'Gestão de jornadas, horas extras, compensações e ponto eletrônico',
    description: 'Sistema corporativo para registro, cálculo e acompanhamento de banco de horas, jornadas de trabalho, horas extras, atrasos e justificativas em conformidade com as normas trabalhistas.',
    longDescription: 'Desenvolvido para simplificar a rotina do departamento pessoal e dos colaboradores. Conta com cálculo automático de saldos de horas, extrato individual e por setor, aprovação de solicitações de abono e relatórios auditáveis para fechamento de folha.',
    category: 'Sistemas',
    imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop',
    technologies: ['Supabase', 'SQL', 'PostgreSQL', 'TypeScript', 'React', 'GitHub'],
    projectUrl: '',
    githubUrl: '',
    featured: true,
    metrics: [
      { label: 'Economia no fechamento', value: '85%' },
      { label: 'Conformidade legal', value: '100%' },
      { label: 'Cálculo de horas', value: 'Instantâneo' },
    ],
    keyFeatures: [
      'Cálculo automatizado de saldo positivo e negativo de banco de horas',
      'Relatórios detalhados para fechamento mensal e auditoria de RH',
      'Módulo de justificativas de ausência, atestados e abonos de ponto',
      'Permissões granulares para gestores, administradores e colaboradores'
    ],
    createdAt: '2025-12-10'
  },
  {
    id: 'proj-4',
    title: 'App de Reconhecimento Facial',
    subtitle: 'Identificação biométrica, validação de presença e controle de acessos com IA',
    description: 'Aplicação com inteligência artificial para detecção e autenticação facial precisa, voltada para controle de presença, verificação de identidade e liberação segura de acessos.',
    longDescription: 'Utiliza modelos de visão computacional e inteligência artificial para realizar matching facial instantâneo e seguro. Inclui validação de presença em tempo real, armazenamento seguro de dados biométricos e histórico detalhado de logs de acessos.',
    category: 'IA',
    imageUrl: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?q=80&w=1200&auto=format&fit=crop',
    technologies: ['Inteligência Artificial', 'Python', 'React', 'PostgreSQL', 'TypeScript', 'GitHub'],
    projectUrl: '',
    githubUrl: '',
    featured: true,
    metrics: [
      { label: 'Acurácia do modelo', value: '99.4%' },
      { label: 'Tempo de detecção', value: '< 200ms' },
      { label: 'Segurança biométrica', value: 'Criptografada' },
    ],
    keyFeatures: [
      'Reconhecimento e matching facial instantâneo com alta precisão',
      'Armazenamento seguro e vetorizado de biometria facial',
      'Validação de presença e registro de logs em tempo real',
      'Interface intuitiva com câmera e feedback visual imediato'
    ],
    createdAt: '2026-02-05'
  },
  {
    id: 'proj-5',
    title: 'Trabalhos Pedagógicos para Professores',
    subtitle: 'Planejamento de aulas, acompanhamento de turmas e ferramentas didáticas',
    description: 'Ambiente educacional concebido para facilitar a rotina docente, organizando planos de aula, avaliações, notas, frequência de alunos e acompanhamento pedagógico.',
    longDescription: 'Criado a partir das necessidades reais de educadores, combinando usabilidade intuitiva com inteligência para apoiar na elaboração de atividades didáticas, organização de conteúdos por disciplinas e geração de diagnósticos da aprendizagem dos alunos.',
    category: 'Apps',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop',
    technologies: ['React', 'TypeScript', 'Supabase', 'SQL', 'Inteligência Artificial', 'GitHub'],
    projectUrl: '',
    githubUrl: '',
    featured: false,
    metrics: [
      { label: 'Tempo poupado por aula', value: '60%' },
      { label: 'Foco docente', value: '100% prático' },
      { label: 'Organização pedagógica', value: 'Centralizada' },
    ],
    keyFeatures: [
      'Gerador e organizador de planos de aula e sequências didáticas',
      'Lançamento ágil de presenças, notas e ocorrências de sala de aula',
      'Apoio de IA na elaboração de exercícios e sugestões pedagógicas',
      'Painéis visuais de evolução do aprendizado por turma e por aluno'
    ],
    createdAt: '2025-11-18'
  },
  {
    id: 'proj-6',
    title: 'Apps Facilitadores do Dia a Dia',
    subtitle: 'Aplicações móveis e utilitários focados em produtividade e rotina',
    description: 'Aplicativos modernos e práticos desenvolvidos para resolver tarefas cotidianas com máxima rapidez: organização pessoal, finanças, listas inteligentes e automações.',
    longDescription: 'Desenvolvidos com foco na experiência do usuário (UX Design), interfaces limpas e máxima agilidade. Oferecem suporte a uso rápido no celular, sincronização instantânea em nuvem e recursos que transformam tarefas rotineiras em fluxos simples e descomplicados.',
    category: 'Apps',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop',
    technologies: ['React', 'TypeScript', 'Supabase', 'Inteligência Artificial', 'GitHub'],
    projectUrl: '',
    githubUrl: '',
    featured: false,
    metrics: [
      { label: 'Fluidez da interface', value: '60 FPS' },
      { label: 'Tempo para registrar ação', value: '< 3s' },
      { label: 'Praticidade', value: 'Total' },
    ],
    keyFeatures: [
      'Interface limpa com foco em rapidez e facilidade de uso',
      'Sincronização em nuvem e persistência automática de dados',
      'Automações inteligentes para notificações e lembretes',
      'Modo claro/escuro dinâmico e suporte responsivo em qualquer tela'
    ],
    createdAt: '2026-01-08'
  }
];

export const TECHNOLOGIES_LIST: Technology[] = [
  {
    name: 'TypeScript',
    category: 'Frontend',
    iconName: 'Code2',
    level: 95,
    description: 'Tipagem estática, interfaces complexas, generics avançados e arquitetura segura para aplicações escaláveis.',
    experienceYears: '5+ anos',
    color: '#3178C6'
  },
  {
    name: 'React',
    category: 'Frontend',
    iconName: 'Atom',
    level: 95,
    description: 'Hooks customizados, Server Components, gerenciamento de estado moderno e interfaces ultra-responsivas.',
    experienceYears: '6+ anos',
    color: '#61DAFB'
  },
  {
    name: 'Next.js',
    category: 'Frontend',
    iconName: 'Layers',
    level: 92,
    description: 'App Router, Server-Side Rendering (SSR), Static Generation (SSG), rotas de API e otimização extrema de performance.',
    experienceYears: '4+ anos',
    color: '#00F0FF'
  },
  {
    name: 'JavaScript',
    category: 'Frontend',
    iconName: 'Braces',
    level: 96,
    description: 'ESNext, assincronia avançada (Async/Await, Promises), manipulação de DOM e arquitetura modular.',
    experienceYears: '7+ anos',
    color: '#F7DF1E'
  },
  {
    name: 'HTML & CSS',
    category: 'Frontend',
    iconName: 'Palette',
    level: 98,
    description: 'HTML5 semântico, CSS moderno, Flexbox, CSS Grid, Tailwind CSS, animações fluidas e acessibilidade WCAG.',
    experienceYears: '7+ anos',
    color: '#E34F26'
  },
  {
    name: 'Node.js',
    category: 'Backend',
    iconName: 'Server',
    level: 90,
    description: 'Construção de APIs RESTful e GraphQL, microsserviços, WebSockets em tempo real e alto throughput.',
    experienceYears: '5+ anos',
    color: '#339933'
  },
  {
    name: 'Python',
    category: 'Backend',
    iconName: 'Terminal',
    level: 88,
    description: 'FastAPI, automação de scripts, microsserviços de IA, manipulação de dados, LangChain e computação assíncrona.',
    experienceYears: '4+ anos',
    color: '#3776AB'
  },
  {
    name: 'PostgreSQL',
    category: 'Database',
    iconName: 'Database',
    level: 90,
    description: 'Modelagem relacional complexa, indexação avançada, pgvector para busca semântica e queries performáticas.',
    experienceYears: '5+ anos',
    color: '#4169E1'
  },
  {
    name: 'Supabase',
    category: 'Database',
    iconName: 'Zap',
    level: 92,
    description: 'Autenticação segura, Realtime, Row Level Security (RLS), Edge Functions e Storage de arquivos de alta escala.',
    experienceYears: '3+ anos',
    color: '#3ECF8E'
  },
  {
    name: 'Firebase',
    category: 'Database',
    iconName: 'Flame',
    level: 88,
    description: 'Firestore NoSQL, Cloud Functions, FCM Notificações, Analytics e infraestrutura serverless do Google Cloud.',
    experienceYears: '4+ anos',
    color: '#FFCA28'
  },
  {
    name: 'Inteligência Artificial (IA)',
    category: 'AI & Data',
    iconName: 'Bot',
    level: 94,
    description: 'Integração com Gemini API, OpenAI, sistemas RAG, embeddings vetoriais, agentes autônomos e prompts de alta precisão.',
    experienceYears: '3+ anos',
    color: '#A855F7'
  },
  {
    name: 'Git & GitHub',
    category: 'DevOps & Tools',
    iconName: 'GitBranch',
    level: 95,
    description: 'Controle de versão profissional, GitFlow, GitHub Actions para CI/CD automatizado e code reviews minuciosos.',
    experienceYears: '6+ anos',
    color: '#F05032'
  }
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'Desenvolvimento de Sites & Landing Pages',
    category: 'Front-end & Conversão',
    description: 'Criação de websites institucionais e páginas de alta conversão, com design exclusivo, carregamento ultrarrápido e SEO estratégico.',
    highlights: ['Design responsivo e mobile-first', 'Otimização máxima de PageSpeed', 'Integração com analytics e pixels', 'Efeitos visuais e animações fluidas'],
    icon: 'Layout',
    badge: 'Alta Conversão'
  },
  {
    id: 'srv-2',
    title: 'Sistemas Web & Plataformas SaaS',
    category: 'Aplicações Completas',
    description: 'Arquitetura e desenvolvimento de sistemas sob medida, ERPs, CRMs e plataformas completas com autenticação, painéis e regras de negócio.',
    highlights: ['Painéis administrativos intuitivos', 'Gestão de usuários e permissões (RBAC)', 'Integração de meios de pagamento', 'Relatórios e exportação de dados'],
    icon: 'Cpu',
    badge: 'Escalabilidade'
  },
  {
    id: 'srv-3',
    title: 'Aplicativos Mobile (iOS & Android)',
    category: 'Experiência Mobile',
    description: 'Desenvolvimento de apps modernos e nativos/híbridos, focados em usabilidade, fluidez, suporte offline e notificações em tempo real.',
    highlights: ['Experiência nativa ultra-fluida', 'Notificações push inteligentes', 'Biometria e segurança avançada', 'Publicação nas lojas App Store e Google Play'],
    icon: 'Smartphone',
    badge: 'Multiplataforma'
  },
  {
    id: 'srv-4',
    title: 'Dashboards & Business Intelligence',
    category: 'Visualização de Dados',
    description: 'Painéis analíticos interativos com gráficos dinâmicos, métricas chave de desempenho (KPIs) e atualizações em tempo real.',
    highlights: ['Gráficos interativos de alta densidade', 'WebSockets e streaming de dados', 'Filtros dinâmicos e cruzamento de métricas', 'Design escuro/claro adaptável'],
    icon: 'BarChart3',
    badge: 'Tempo Real'
  },
  {
    id: 'srv-5',
    title: 'Bancos de Dados & Infraestrutura Cloud',
    category: 'Backend & Segurança',
    description: 'Estruturação, migração e otimização de bancos de dados relacionais e NoSQL (PostgreSQL, Supabase, Firebase), com alta disponibilidade.',
    highlights: ['Modelagem e normalização de dados', 'Políticas de segurança RLS robustas', 'Backups automatizados e replicação', 'APIs de alta performance e baixa latência'],
    icon: 'Database',
    badge: 'Segurança'
  },
  {
    id: 'srv-6',
    title: 'Soluções com Inteligência Artificial',
    category: 'Automação & IA',
    description: 'Integração de LLMs, agentes inteligentes autônomos, sistemas de busca semântica (RAG) e automação de fluxos operacionais com IA.',
    highlights: ['Chatbots contextuais com a base do cliente', 'Automação de extração e análise de documentos', 'Classificação e recomendações inteligentes', 'Engenharia de prompts e embeddings vetoriais'],
    icon: 'Sparkles',
    badge: 'Inovação'
  }
];
