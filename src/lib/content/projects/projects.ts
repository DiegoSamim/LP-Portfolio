export type ProjectDeviceType = "pc" | "mobile";

export interface ProjectMedia {
  src: string;
  device: ProjectDeviceType;
  alt?: string;
}

export interface ProjectContent {
  id: number;
  name: string;
  description: string;
  techStack: string[];
  mainStack: string;
  objective: string;
  github: string;
  demo: string;
  emoji: string;
  oneLiner: string;
  logo?: string;
  media?: ProjectMedia[];
  image: string;
}

export const projectsContent: ProjectContent[] = [
  {
    id: 1,
    name: "Bot Financeiro",
    emoji: "☁️",
    mainStack: "React + AWS",
    oneLiner: "Sincronização em nuvem em tempo real para equipes distribuídas",
    description: "Uma plataforma de sincronização em tempo real para compartilhamento contínuo de arquivos entre dispositivos.",
    techStack: ["React", "Node.js", "AWS S3", "WebSocket"],
    objective: "Construir um mecanismo de sincronização confiável e com baixa latência para equipes distribuídas.",
    github: "https://github.com/DiegoSamim/bot-financeiro",
    demo: "https://example.com",
    logo: "src/assets/image.png",
    media: [
      { src: "src/assets/image.png", device: "pc", alt: "Bot Financeiro em desktop" },
      { src: "src/assets/image.png", device: "mobile", alt: "Bot Financeiro em mobile" },
    ],
    image: "src/assets/image.png",
  },
  {
    id: 2,
    name: "DevMetrics",
    emoji: "📊",
    mainStack: "Next.js + Python",
    oneLiner: "Dashboard analítico de produtividade para desenvolvedores",
    description: "Painel de produtividade com integração ao GitHub e análises de sprint.",
    techStack: ["Next.js", "Python", "PostgreSQL", "D3.js"],
    objective: "Ajudar equipes a visualizar e melhorar seu fluxo de desenvolvimento.",
    github: "https://github.com",
    demo: "https://example.com",
    image: "src/assets/project-devmetrics.png",
  },
  {
    id: 3,
    name: "NeuralChat",
    emoji: "🧠",
    mainStack: "Python + FastAPI",
    oneLiner: "Framework de chatbot com treinamento personalizado",
    description: "Framework de chatbot com pipelines de treinamento customizados e suporte a múltiplos modelos.",
    techStack: ["Python", "FastAPI", "OpenAI", "Redis"],
    objective: "Democratizar a implantação de chatbots com IA para pequenos negócios.",
    github: "https://github.com",
    demo: "https://example.com",
    image: "src/assets/project-neuralchat.png",
  },
  {
    id: 4,
    name: "PixelForge",
    emoji: "🎨",
    mainStack: "TypeScript + WASM",
    oneLiner: "Editor de imagens colaborativo no navegador",
    description: "Editor de imagens no browser com suporte a camadas e edição colaborativa.",
    techStack: ["TypeScript", "Canvas API", "WebRTC", "Rust/WASM"],
    objective: "Criar uma alternativa gratuita e performática aos editores desktop.",
    github: "https://github.com",
    demo: "https://example.com",
    image: "src/assets/project-pixelforge.png",
  },
  {
    id: 5,
    name: "TaskPilot",
    emoji: "✈️",
    mainStack: "React Native + IA",
    oneLiner: "Gerenciador de tarefas inteligente com priorização por IA",
    description: "Aplicativo de tarefas com priorização por IA e integração com calendário.",
    techStack: ["React Native", "Firebase", "GPT-4", "GraphQL"],
    objective: "Ajudar pessoas a gerir melhor o tempo e focar no que importa.",
    github: "https://github.com",
    demo: "https://example.com",
    image: "src/assets/project-taskpilot.png",
  },
];
