export enum AboutCardIcon {
  CERTIFICATE = "certificate",
  COURSE = "course",
  COLLEGE = "college",
  EXPERIENCE = "experience",
}

export enum AboutCardType {
  CERTIFICATIONS = "certifications",
  COURSES = "courses",
  EDUCATION = "education",
  EXPERIENCE = "experience",
}

export interface AboutCardContent {
  id: number;
  title: string;
  description: string;
  icon: AboutCardIcon;
  type: AboutCardType;
}

export interface CertificationItem {
  name: string;
  issuer: string;
  date: string;
  details: string;
  credentialImageUrl?: string;
  credentialImageAlt?: string;
}

export interface CourseItem {
  name: string;
  provider: string;
  date: string;
  details: string;
}

export interface EducationTimelineItem {
  title: string;
  institution: string;
  period: string;
  date: string;
  details: string;
}

export interface ExperienceItem {
  title: string;
  context: string;
  date: string;
  details: string;
}

export interface AboutContent {
  tag: string;
  title: string;
  description: string;
  cards: AboutCardContent[];
  certifications: CertificationItem[];
  courses: CourseItem[];
  educationTimeline: EducationTimelineItem[];
  experiences: ExperienceItem[];
}

export const aboutContent: AboutContent = {
  tag: "// sobre",
  title: "Sobre mim",
  description:
    "Visão profissional organizada por certificações, cursos, formação acadêmica e experiência prática.",
  cards: [
    {
      id: 1,
      title: "Certificações",
      description: "Certificados técnicos e trilhas concluídas em plataformas de tecnologia.",
      icon: AboutCardIcon.CERTIFICATE,
      type: AboutCardType.CERTIFICATIONS,
    },
    {
      id: 2,
      title: "Cursos",
      description: "Formações complementares em desenvolvimento, arquitetura e boas práticas.",
      icon: AboutCardIcon.COURSE,
      type: AboutCardType.COURSES,
    },
    {
      id: 3,
      title: "Formação Acadêmica",
      description: "Trajetória acadêmica com evolução contínua e base sólida em tecnologia.",
      icon: AboutCardIcon.COLLEGE,
      type: AboutCardType.EDUCATION,
    },
    {
      id: 4,
      title: "Experiência Profissional",
      description: "Atuação em projetos reais, competições, eventos e entregas colaborativas.",
      icon: AboutCardIcon.EXPERIENCE,
      type: AboutCardType.EXPERIENCE,
    },
  ],
  certifications: [
    {
      name: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "2025-11",
      details: "Fundamentos de nuvem, segurança e boas práticas de arquitetura em serviços AWS.",
      credentialImageUrl:
        "https://hermes.dio.me/tracks/68c81887-a1c2-440d-a7ea-7777bc10cd41.png",
      credentialImageAlt: "Badge AWS Cloud Practitioner",
    },
    {
      name: "Docker Essentials",
      issuer: "Alura",
      date: "2025-07",
      details: "Criação de imagens, orquestração básica com Compose e fluxo de deploy com containers.",
      credentialImageUrl:
        "https://img.shields.io/badge/Docker-Essentials-2496ED?style=for-the-badge&logo=docker&logoColor=white",
      credentialImageAlt: "Badge Docker Essentials",
    },
    {
      name: "TypeScript Professional",
      issuer: "Rocketseat",
      date: "2025-03",
      details: "Tipagem avançada, modelagem de contratos e padrões de escalabilidade para aplicações web.",
    },
  ],
  courses: [
    {
      name: "Arquitetura de Software para Web",
      provider: "Full Cycle",
      date: "2025-09",
      details: "Separação de responsabilidades, comunicação entre serviços e decisões de arquitetura.",
    },
    {
      name: "Boas Práticas de APIs REST",
      provider: "Udemy",
      date: "2025-06",
      details: "Versionamento, autenticação, observabilidade e documentação de APIs escaláveis.",
    },
    {
      name: "Frontend Engineering com React",
      provider: "Alura",
      date: "2025-02",
      details: "Componentização, performance de renderização e organização de design system.",
    },
  ],
  educationTimeline: [
    {
      title: "Bacharelado em Sistemas de Informação",
      institution: "Universidade Exemplo",
      period: "2021 - 2025",
      date: "2021-02",
      details: "Formação com ênfase em engenharia de software, banco de dados e arquitetura de aplicações.",
    },
    {
      title: "Projeto Integrador em Desenvolvimento Web",
      institution: "Universidade Exemplo",
      period: "2023",
      date: "2023-08",
      details: "Construção de aplicação full stack com entregas incrementais e validação com usuários reais.",
    },
    {
      title: "Pesquisa em Performance de Aplicações",
      institution: "Grupo de Estudos em Tecnologia",
      period: "2024",
      date: "2024-04",
      details: "Análise de gargalos de front-end e estratégias de otimização em projetos de interface.",
    },
  ],
  experiences: [
    {
      title: "Projetos Reais de Desenvolvimento",
      context: "Freelance e colaboração técnica",
      date: "2024-2026",
      details: "Planejamento, implementação e manutenção de aplicações web com foco em qualidade e entrega.",
    },
    {
      title: "Competições e Hackathons",
      context: "Eventos de tecnologia",
      date: "2023-2025",
      details: "Participação em desafios de produto e engenharia com squads multidisciplinares.",
    },
    {
      title: "Comunidade e Eventos",
      context: "Meetups e trilhas técnicas",
      date: "2022-2026",
      details: "Troca de conhecimento em eventos, workshops e comunidades de desenvolvimento.",
    },
  ],
};
