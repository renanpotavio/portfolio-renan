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
  contribuicoes: string[];
  categoria: Categoria;
  tecnologias: string[];
}

// Projetos feitos para clientes, sob sigilo: sem prints nem links, só o que foi feito e as tecnologias.
export const PROJETOS: Projeto[] = [
  {
    id: 'carga-indivisivel',
    titulo: 'Carga Indivisível VR',
    resumo: 'Simulação imersiva em realidade virtual para treinamento de Normas Regulamentadoras.',
    contribuicoes: [
      'Funcionalidades em C# no Unity',
      'Criação e ajuste de assets 3D no Blender',
      'Testes e validação do ambiente virtual',
    ],
    categoria: 'VR/AR',
    tecnologias: ['C#', 'Unity', 'Blender', 'VR'],
  },
  {
    id: 'atendimento-socorro',
    titulo: 'Atendimento de Socorro',
    resumo: 'Treinamento de atendimento de socorro pós-acidente com simulação interativa em 3D.',
    contribuicoes: [
      'Programação e animação de veículos de emergência',
      'Correção de bugs e manutenção',
      'Melhorias solicitadas pelos clientes',
    ],
    categoria: 'VR/AR',
    tecnologias: ['Unity', 'C#', '3D'],
  },
  {
    id: 'projetos-interativos',
    titulo: 'Projetos Interativos',
    resumo: 'Aplicações web e interativas para clientes, com foco em usabilidade e desempenho.',
    contribuicoes: [],
    categoria: 'Web',
    tecnologias: ['HTML', 'CSS', 'JavaScript'],
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
      'Identificação, análise e documentação de bugs, com testes básicos para validar problemas.',
      'Participação em reuniões de alinhamento e priorização de demandas.',
      'Apoio no onboarding e orientação de usuários.',
    ],
  },
  {
    cargo: 'Desenvolvedor de Jogos VR e AR (Estágio)',
    empresa: 'SENAI Fatesg',
    periodo: 'mai/2024 – jan/2025',
    itens: [
      'Desenvolvimento de aplicações em Unity e C# para realidade virtual e aumentada.',
      'Criação e modelagem de assets 3D no Blender.',
      'Testes, manutenção e colaboração em todas as etapas do ciclo de desenvolvimento.',
    ],
  },
  {
    cargo: 'Jovem Aprendiz Administrativo',
    empresa: 'TIMAC Agro Brasil',
    periodo: 'ago/2023 – jun/2025',
    itens: [
      'Controle de planilhas, relatórios, indicadores e documentos internos.',
      'Suporte aos colaboradores em processos administrativos.',
      'Desenvolvimento de habilidades técnicas e interpessoais: comunicação, organização e trabalho em equipe.',
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

// Módulos do curso de Product Management da PM3 (currículo do Renan)
export const MODULOS_PM3 = [
  'Fundamentos de Produto',
  'Product Discovery',
  'Product Delivery',
  'Scrum e Kanban',
  'Priorização de Demandas',
  'Métricas de Produto',
];

export const OBJETIVO =
  'Atuar como Product Owner Júnior, contribuindo para a evolução de produtos digitais, conectando as necessidades dos usuários com as equipes de tecnologia e gerando impacto real para o negócio.';

// Currículo + ferramentas do exemplo de layout que o Renan mandou.
export const GRUPOS_SKILLS = [
  {
    titulo: 'Desenvolvimento',
    icone: 'dev',
    itens: ['C#', 'Unity', 'Git', 'VS Code', 'HTML', 'CSS', 'JavaScript'],
  },
  {
    titulo: 'Design, 3D e XR',
    icone: 'design',
    itens: ['Blender', 'Figma', 'Photoshop', 'Illustrator', 'Realidade Virtual', 'Realidade Aumentada'],
  },
  {
    titulo: 'Produto e Agilidade',
    icone: 'produto',
    itens: ['Jira', 'Trello', 'Miro', 'Notion', 'Scrum', 'Kanban', 'Product Discovery', 'Métricas de Produto', 'Priorização'],
  },
  {
    titulo: 'Suporte e Outros',
    icone: 'suporte',
    itens: [
      'Suporte Técnico N1',
      'Atendimento ao Usuário',
      'Gestão de Chamados',
      'Documentação Técnica',
      'Análise de Bugs',
      'SQL',
      'Excel',
      'Google Workspace',
      'Microsoft 365',
      'Windows',
      'Redes Básicas',
    ],
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
