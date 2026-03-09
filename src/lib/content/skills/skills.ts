export interface SkillContent {
  name: string;
  emoji: string;
  description: string;
  topics: string[];
  iconUrl: string;
}

export const skillsContent: SkillContent[] = [
  {
    name: "Python",
    emoji: "🐍",
    description: "Backend e automação",
    topics: ["APIs com FastAPI/Django", "Scripts e automações", "Processamento de dados"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  },
  {
    name: "JavaScript",
    emoji: "⚡",
    description: "Aplicações web dinâmicas",
    topics: ["Lógica de interface", "Integração com APIs", "Apps web interativas"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "React",
    emoji: "⚛️",
    description: "Interfaces baseadas em componentes",
    topics: ["Arquitetura em componentes", "Estado e hooks", "UI reutilizável"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Node.js",
    emoji: "🟢",
    description: "Runtime para servidor",
    topics: ["APIs REST", "Autenticação e rotas", "Serviços em tempo real"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Docker",
    emoji: "🐳",
    description: "Containerização",
    topics: ["Ambientes padronizados", "Build e deploy", "Orquestração básica"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    name: "Git",
    emoji: "🔀",
    description: "Controle de versão",
    topics: ["Fluxo com branches", "Code review", "Histórico e versionamento"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "PostgreSQL",
    emoji: "🐘",
    description: "Banco de dados relacional",
    topics: ["Modelagem relacional", "Queries otimizadas", "Índices e performance"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "TypeScript",
    emoji: "🔷",
    description: "Desenvolvimento com tipagem",
    topics: ["Tipagem forte", "Contratos de dados", "Refatorações seguras"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "GraphQL",
    emoji: "💜",
    description: "Linguagem de consulta para APIs",
    topics: ["Schemas e resolvers", "Queries eficientes", "Integração com front-end"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
  },
  {
    name: "Redis",
    emoji: "🔴",
    description: "Armazenamento em memória",
    topics: ["Cache de baixa latência", "Sessões e filas", "Pub/Sub"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
  },
  {
    name: "AWS",
    emoji: "☁️",
    description: "Infraestrutura em nuvem",
    topics: ["Deploy em nuvem", "Storage e computação", "Escalabilidade"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  },
  {
    name: "Figma",
    emoji: "🎨",
    description: "Design de UI/UX",
    topics: ["Protótipos navegáveis", "Design systems", "Handoff para desenvolvimento"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  },
];
