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

- Conteúdo das seções: arquivos em `src/components/`
- Tema global (cores/tokens): `src/index.css`
- Componentes de UI: `src/components/ui/`

## Deploy

Como é um projeto Vite estático, pode ser publicado facilmente em Vercel, Netlify ou GitHub Pages usando a pasta gerada por:

```bash
npm run build
```
