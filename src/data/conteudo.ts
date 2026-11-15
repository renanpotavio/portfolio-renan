/*
 * Todo o conteúdo do site num só lugar.
 * Fonte: currículo do Renan, exemplo de layout que ele mandou e lista de formações da PM3.
 * Itens com "PROVISÓRIO" aguardam confirmação.
 */

export type Categoria = 'VR/AR' | 'Web';

export interface Projeto {
  id: string;
  titulo: string;
  resumo: string;
  descricao: string[];
  categoria: Categoria;
  tecnologias: string[];
  imagens: { src: string; alt: string }[];
  link?: string;
}

// PROVISÓRIO: as imagens são capas temporárias até chegarem os prints reais.
export const PROJETOS: Projeto[] = [
  {
    id: 'carga-indivisivel',
    titulo: 'Carga Indivisível VR',
    resumo: 'Simulação imersiva para treinamento de Normas Regulamentadoras.',
    descricao: [
      'Simulação em realidade virtual para treinar procedimentos de transporte de carga indivisível, seguindo as Normas Regulamentadoras.',
      'Implementei funcionalidades em C# no Unity, criei e ajustei assets 3D no Blender e fiz testes e validações do ambiente virtual.',
    ],
    categoria: 'VR/AR',
    tecnologias: ['C#', 'Unity', 'Blender', 'VR'],
    imagens: [
      { src: '/projetos/carga-1.svg', alt: 'Capa provisória do projeto Carga Indivisível VR' },
      { src: '/projetos/carga-2.svg', alt: 'Segunda imagem provisória do projeto Carga Indivisível VR' },
    ],
  },
  {
    id: 'atendimento-socorro',
    titulo: 'Atendimento de Socorro',
    resumo: 'Treinamento de primeiros socorros pós-acidente com simulação interativa.',
    descricao: [
      'Sistema de treinamento para atendimento de socorro pós-acidente, com cenários interativos em 3D.',
      'Programei e animei os veículos de emergência, corrigi bugs e implementei melhorias pedidas pelos clientes.',
    ],
    categoria: 'VR/AR',
    tecnologias: ['Unity', 'C#', '3D'],
    imagens: [
      { src: '/projetos/socorro-1.svg', alt: 'Capa provisória do projeto Atendimento de Socorro' },
      { src: '/projetos/socorro-2.svg', alt: 'Segunda imagem provisória do projeto Atendimento de Socorro' },
    ],
  },
  {
    id: 'projetos-interativos',
    titulo: 'Projetos Interativos',
    resumo: 'Aplicações web interativas para clientes, com foco em usabilidade.',
    descricao: [
      'Aplicações web e interativas desenvolvidas para clientes, com atenção à usabilidade e ao desempenho.',
      'PROVISÓRIO: descrição a confirmar com o Renan (quais projetos, links e prints).',
    ],
    categoria: 'Web',
    tecnologias: ['HTML', 'CSS', 'JavaScript'],
    imagens: [{ src: '/projetos/web-1.svg', alt: 'Capa provisória dos Projetos Interativos' }],
  },
];

export interface Experiencia {
  cargo: string;
  empresa: string;
  periodo: string;
  itens: string[];
}

export const EXPERIENCIAS: Experiencia[] = [
  {
    cargo: 'Analista de Suporte N1 Pleno',
    empresa: 'Poli Digital',
    periodo: '9 meses', // PROVISÓRIO: falta mês/ano de início e fim
    itens: [
      'Suporte de primeiro nível para clientes e colaboradores internos.',
      'Abertura, acompanhamento e registro de chamados, com escalonamento para o N2.',
      'Identificação, análise e documentação de bugs na plataforma.',
      'Participação em reuniões de alinhamento e priorização de demandas.',
    ],
  },
  {
    cargo: 'Desenvolvedor de Jogos VR e AR (Estágio)',
    empresa: 'SENAI Fatesg',
    periodo: 'mai/2024 – jan/2025',
    itens: [
      'Desenvolvimento de aplicações em Unity e C# para realidade virtual e aumentada.',
      'Criação e modelagem de assets 3D no Blender.',
      'Participação em todas as etapas do ciclo de desenvolvimento.',
    ],
  },
  {
    cargo: 'Jovem Aprendiz Administrativo',
    empresa: 'TIMAC Agro Brasil',
    periodo: 'ago/2023 – jun/2025',
    itens: [
      'Controle de planilhas, relatórios, indicadores e documentos internos.',
      'Suporte aos colaboradores em processos administrativos.',
    ],
  },
];

export const FORMACAO = [
  {
    curso: 'Análise e Desenvolvimento de Sistemas (Tecnólogo)',
    instituicao: 'Universidade Cruzeiro do Sul',
    periodo: 'Cursando',
  },
  {
    curso: 'Técnico em Eletrotécnica',
    instituicao: 'Instituto Federal Goiano',
    periodo: '2020 – 2022',
  },
];

// Lista enviada pelo Renan. PROVISÓRIO: confirmar quais já estão concluídas.
export const TRILHAS_PM3 = [
  'Product Management',
  'Product Discovery',
  'Product Design',
  'Product Analytics',
  'Product Growth',
  'Product Marketing',
  'Product Leadership',
  'Analista de Dados',
  'AI Product Builder',
  'AI Product Specialist',
  'RAG para Produtos de IA',
  'Responsible AI',
];

export const OBJETIVO =
  'Atuar como Product Owner Júnior, contribuindo para a evolução de produtos digitais, conectando as necessidades dos usuários com as equipes de tecnologia e gerando impacto real para o negócio.';

// Só o que está no currículo. Ferramentas do exemplo (Figma, Notion, SQL...) entram após confirmação.
export const GRUPOS_SKILLS = [
  {
    titulo: 'Produto e Agilidade',
    icone: 'produto',
    itens: ['Product Discovery', 'Product Delivery', 'Métricas de Produto', 'Priorização', 'Scrum', 'Kanban', 'Jira'],
  },
  {
    titulo: 'Suporte e Atendimento',
    icone: 'suporte',
    itens: ['Suporte Técnico N1', 'Atendimento ao Usuário', 'Gestão de Chamados', 'Documentação Técnica', 'Análise de Bugs'],
  },
  {
    titulo: 'Desenvolvimento e 3D',
    icone: 'dev',
    itens: ['C#', 'Unity', 'Blender', 'Realidade Virtual', 'Realidade Aumentada', 'HTML', 'CSS', 'JavaScript'],
  },
  {
    titulo: 'Ferramentas',
    icone: 'ferramentas',
    itens: ['Windows', 'Microsoft 365', 'Redes Básicas'],
  },
] as const;

export const CONTATO = {
  email: 'renanpinheirootavio@gmail.com',
  telefone: '(62) 99142-9486',
  telefoneLink: '+5562991429486',
  linkedin: 'https://www.linkedin.com/in/renan-pinheiro-otavio',
  linkedinTexto: 'linkedin.com/in/renan-pinheiro-otavio',
  cidade: 'Goiânia – GO',
};
