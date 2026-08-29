import { Project, Technology, ServiceItem } from '../types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Nexus AI - Plataforma de Inteligência Cognitiva',
    subtitle: 'Agentes inteligentes e análise preditiva em tempo real',
    description: 'Sistema corporativo com múltiplos agentes autônomos de IA para automação de processos, síntese documental e geração de insights estratégicos.',
    longDescription: 'Desenvolvido com arquitetura moderna orientada a microsserviços, o Nexus AI conecta modelos de linguagem de ponta (LLMs) a bases de conhecimento corporativas em tempo real com busca vetorial e RAG avançado.',
    category: 'IA',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    technologies: ['Python', 'Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'IA'],
    projectUrl: 'https://nexus-ai-demo.example.com',
    githubUrl: '',
    featured: true,
    metrics: [
      { label: 'Redução de tempo', value: '78%' },
      { label: 'Precisão RAG', value: '96.4%' },
      { label: 'Requisições/dia', value: '1.2M+' },
    ],
    keyFeatures: [
      'Agentes autônomos com execução de tarefas multi-etapas',
      'Indexação vetorial com pgvector no PostgreSQL',
      'Dashboard interativo em tempo real com streaming de respostas',
      'Autenticação granular e permissões por workspace'
    ],
    createdAt: '2026-01-15'
  },
  {
    id: 'proj-2',
    title: 'Pulse ERP & SaaS Analytics',
    subtitle: 'Gestão operacional e financeira para empresas escaláveis',
    description: 'Sistema web completo de gestão empresarial com faturamento automatizado, controle de estoque, conciliação bancária e dashboards analíticos.',
    longDescription: 'Solução robusta e escalável projetada para processar alto volume transacional com segurança militar, auditoria em tempo real e relatórios preditivos.',
    category: 'Sistemas',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Supabase', 'Git'],
    projectUrl: 'https://pulse-erp.example.com',
    githubUrl: '',
    featured: true,
    metrics: [
      { label: 'Uptime', value: '99.98%' },
      { label: 'Tempo de resposta', value: '< 45ms' },
      { label: 'Empresas ativas', value: '250+' },
    ],
    keyFeatures: [
      'Controle multi-empresa e multi-moeda',
      'Integração bancária via Open Finance e PIX automatizado',
      'Emissão instantânea de notas fiscais e relatórios contábeis',
      'Painel em tempo real com WebSockets'
    ],
    createdAt: '2025-11-20'
  },
  {
    id: 'proj-3',
    title: 'Aura Fintech Mobile App',
    subtitle: 'Carteira digital inteligente com investimentos automatizados',
    description: 'Aplicativo mobile de alta performance para pagamentos instantâneos, gestão de patrimônio e recomendações financeiras personalizadas por IA.',
    longDescription: 'Criado com foco em UX fluida, biometria nativa e segurança ponta-a-ponta, o Aura Mobile proporciona transações em milissegundos e micro-investimentos guiados.',
    category: 'Apps',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop',
    technologies: ['React', 'TypeScript', 'Firebase', 'Node.js', 'IA'],
    projectUrl: 'https://aura-fintech.example.com',
    githubUrl: '',
    featured: true,
    metrics: [
      { label: 'Avaliação App Store', value: '4.9 ★' },
      { label: 'Downloads ativos', value: '85k+' },
      { label: 'Transações mensais', value: 'R$ 14M' },
    ],
    keyFeatures: [
      'Autenticação biométrica avançada (FaceID / Fingerprint)',
      'Notificações push inteligentes com Firebase Cloud Messaging',
      'Extrato em tempo real com categorização automática por IA',
      'Modo escuro dinâmico e suporte offline-first'
    ],
    createdAt: '2025-10-10'
  },
  {
    id: 'proj-4',
    title: 'Vortex Studio — Landing Page 3D & Ultra Performance',
    subtitle: 'Site institucional imersivo com renderização de última geração',
    description: 'Website conceitual e institucional para produtora de tecnologia com efeitos de profundidade, glassmorphism e pontuação máxima no Google PageSpeed.',
    longDescription: 'Desenvolvido com foco absoluto em conversão e refinamento estético, aliando tipografia matemática, micro-interações fluidas e SEO otimizado.',
    category: 'Sites',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop',
    technologies: ['Next.js', 'TypeScript', 'React', 'CSS', 'HTML', 'Git'],
    projectUrl: 'https://vortex-studio.example.com',
    githubUrl: '',
    featured: false,
    metrics: [
      { label: 'PageSpeed Score', value: '99/100' },
      { label: 'Taxa de Conversão', value: '+42%' },
      { label: 'Tempo de Carregamento', value: '0.6s' },
    ],
    keyFeatures: [
      'Animações dinâmicas a 60fps',
      'Design totalmente responsivo para todos os viewports',
      'Estrutura semântica para SEO de alta autoridade',
      'Formulário inteligente com validação instantânea'
    ],
    createdAt: '2025-12-05'
  },
  {
    id: 'proj-5',
    title: 'OmniVision — Assistente de Diagnóstico & OCR com IA',
    subtitle: 'Reconhecimento inteligente de documentos e extração de dados',
    description: 'Sistema neural para digitalização automática de faturas, contratos e relatórios médicos com validação contextual e auditoria instantânea.',
    longDescription: 'Aplica modelos de visão computacional multimodal e processamento de linguagem natural para transformar dados não-estruturados em tabelas relacionais.',
    category: 'IA',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop',
    technologies: ['Python', 'IA', 'PostgreSQL', 'Node.js', 'React'],
    projectUrl: 'https://omnivision-demo.example.com',
    githubUrl: '',
    featured: false,
    metrics: [
      { label: 'Acurácia OCR', value: '99.2%' },
      { label: 'Formatos suportados', value: '24+' },
      { label: 'Tempo por página', value: '0.8s' },
    ],
    keyFeatures: [
      'Extração de tabelas e campos complexos sem template rígido',
      'Validação de conformidade LGPD e dados sensíveis mascarados',
      'API RESTful de alta escalabilidade e Webhooks',
      'Exportação direta para PostgreSQL e Supabase'
    ],
    createdAt: '2026-02-01'
  },
  {
    id: 'proj-6',
    title: 'CyberFlow — Dashboard de Monitoramento Cloud & IoT',
    subtitle: 'Telemetria em tempo real e controle de infraestrutura',
    description: 'Painel gerencial de monitoramento de servidores, consumo de APIs e dispositivos IoT com visualização de dados interativa via WebSockets.',
    longDescription: 'Permite acompanhar métricas críticas de centenas de instâncias e microsserviços simultaneamente, com alertas imediatos e triggers automáticos.',
    category: 'Sistemas',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'GitHub'],
    projectUrl: 'https://cyberflow-telemetry.example.com',
    githubUrl: '',
    featured: false,
    metrics: [
      { label: 'Eventos/segundo', value: '50.000+' },
      { label: 'Latência média', value: '18ms' },
      { label: 'Alertas resolvidos', value: '99.5%' },
    ],
    keyFeatures: [
      'Gráficos vetoriais de alta densidade sem degradação de performance',
      'Sistema de alertas via WhatsApp, E-mail e Discord',
      'Filtros por cluster, região geográfica e tipo de serviço',
      'Log viewer com pesquisa regex e destaque de erros'
    ],
    createdAt: '2025-09-14'
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
