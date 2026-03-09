# Portfolio Landing Page

Landing page de portfólio pessoal desenvolvida com React + TypeScript, com foco em visual moderno, animações suaves e apresentação de projetos/skills.

## Visão geral

Este repositório contém uma página única (single-page) para portfólio, com seções como:

- Hero (apresentação inicial)
- About (resumo profissional)
- Trophy Room (projetos em destaque)
- Skills em visual 3D (`Badge Case`)
- Contact (canais de contato)

## Stack

- React 18
- TypeScript
- Vite 5
- Tailwind CSS
- shadcn/ui + Radix UI
- Framer Motion
- Vitest + Testing Library

## Requisitos

- Node.js 18+
- npm 9+

## Como rodar localmente

```bash
npm install
npm run dev
```

Aplicação disponível em `http://localhost:5173` (porta padrão do Vite).

## Scripts disponíveis

```bash
npm run dev         # inicia ambiente de desenvolvimento
npm run build       # gera build de produção
```

## Estrutura principal

```text
src/
	components/
		HeroSection.tsx
		AboutSection.tsx
		TrophyRoom.tsx
		StackBadges.tsx
		ContactSection.tsx
	pages/
		Index.tsx
	main.tsx
```

## Personalização rápida

- Conteúdo das seções: arquivos em `src/lib/content/`
- Tema global (cores/tokens): `src/index.css`
- Componentes de UI: `src/components/ui/`

## Deploy

Como é um projeto Vite estático, pode ser publicado facilmente em Vercel, Netlify ou GitHub Pages usando a pasta gerada por:

```bash
npm run build
```

## Como editar o conteúdo (guia rápido)

Aqui estão os locais principais para alterar textos, links, descrições e imagens do portfólio.

- **Hero (nome, cargo, foto e links):** editar `src/lib/content/hero/hero.ts`
- **Sobre (texto principal + cards):** editar `src/lib/content/about/about.ts`
- **Projetos (descrições, links e galeria):** editar `src/lib/content/projects/projects.ts`
- **Skills / tecnologias:** editar `src/lib/content/skills/skills.ts`
- **Contato (links finais):** editar `src/components/ContactSection.tsx`
- **Sons do site:** arquivos em `public/sounds/` e mapeamento em `src/lib/sfx.ts`

## Estrutura de conteúdo centralizado

```text
src/lib/content/
	about/
		about.ts
	hero/
		hero.ts
	projects/
		projects.ts
	skills/
		skills.ts
```

## Guia completo de descrições e imagens

### 1) Hero
Arquivo: `src/lib/content/hero/hero.ts`

Campos principais:
- `greeting`: texto curto acima do nome
- `firstName` e `lastName`: nome exibido
- `role`: descrição profissional
- `photo`: imagem principal (importada de `src/assets`)
- `links.github` e `links.linkedin`: links dos botões

### 2) Sobre (cards de currículo/certificados)
Arquivo: `src/lib/content/about/about.ts`

Campos principais:
- `tag`, `title`, `description`: cabeçalho da seção
- `cards[]`: lista de cards
- Cada card usa `icon` por enum `AboutCardIcon` (`RESUME`, `CERTIFICATE`, `COURSE`, `COLLEGE`, `EXPERIENCE`)

Observação:
- A seção mostra 3 cards por vez com setas automáticas quando houver mais de 3.

### 3) Projetos (descrições + modal com galeria)
Arquivo: `src/lib/content/projects/projects.ts`

Campos principais de cada projeto:
- `name`, `oneLiner`, `description`, `objective`
- `techStack[]`
- `github`, `demo`
- `logo` (ícone/logo no pódio)
- `image` (imagem fallback)
- `media[]` (galeria com frame por dispositivo)

Formato de `media[]`:

```ts
media: [
  { src: "src/assets/projeto-desktop.png", device: "pc", alt: "Tela desktop" },
  { src: "src/assets/projeto-mobile.png", device: "mobile", alt: "Tela mobile" }
]
```

Comportamento no modal:
- Se existir `media[]`, o modal abre mais largo e mostra setas para navegar.
- `device: "pc"` aplica frame desktop.
- `device: "mobile"` aplica frame mobile.
- Se imagem não carregar, usa fallback visual padrão.

### 4) Skills
Arquivo: `src/lib/content/skills/skills.ts`

Campos por skill:
- `name`, `description`, `topics[]`
- `iconUrl` (ícone SVG/URL)
- `emoji` (fallback)

Observação:
- A seção mostra no máximo 12 por página com setas quando ultrapassar.

### 5) Contato
Arquivo: `src/components/ContactSection.tsx`

Edite o array `links`:
- `href`: destino do botão
- `value`: texto exibido

## Como adicionar novas imagens

1. Coloque as imagens em `src/assets/`
2. Referencie no conteúdo com caminho `src/assets/nome-do-arquivo.ext`
3. Para projetos, prefira usar `media[]` + `device`

Exemplo:

```ts
logo: "src/assets/minha-logo.png",
image: "src/assets/minha-capa.png",
media: [
  { src: "src/assets/minha-tela-pc.png", device: "pc" },
  { src: "src/assets/minha-tela-mobile.png", device: "mobile" }
]
```

## Sons e efeitos (opcional)

- Arquivos: `public/sounds/`
- Mapa de nomes: `src/lib/sfx.ts`

Nomes usados atualmente:
- `buttonHover`
- `clickSwitch`
- `lightSwitch`
- `openCase`
- `closeCase`
- `badgeHover`
- `openBadgeInterface`
- `openModal`

Dicas:
- Mantenha as URLs completas (ex: `https://github.com/seunome`) para que os botões abram corretamente.
- Mantenha nomes de arquivo simples e sem espaços para evitar erros de caminho.
- Se o modal de projeto não mostrar imagem, revise o `src` no `projects.ts`.
- Após mudar conteúdo, rode `npm run dev` e verifique localmente em `http://localhost:5173`.
