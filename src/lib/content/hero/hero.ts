import devPhoto from "@/assets/developer-photo.jpg";

export interface HeroContent {
  greeting: string;
  firstName: string;
  lastName: string;
  role: string;
  photo: string;
  photoAlt: string;
  links: {
    github: string;
    linkedin: string;
  };
}

export const heroContent: HeroContent = {
  greeting: "> olá_mundo",
  firstName: "Seu",
  lastName: "Nome",
  role: "Desenvolvedor Full-Stack e entusiasta de código aberto",
  photo: devPhoto,
  photoAlt: "Desenvolvedor",
  links: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
};
