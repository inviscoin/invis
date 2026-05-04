# INVIS Ecosystem — Super App Modular

O INVIS é um ecossistema digital autossustentável projetado para performance extrema (60 FPS) e custo marginal zero.

## 🚀 Tecnologias Core
- **Framework:** SvelteKit (Zero Virtual DOM) [7, 8]
- **Infra:** Supabase (PostgreSQL + Realtime WebSockets) [5, 9]
- **Hospedagem:** Vercel (Edge Computing) [5, 10]
- **Segurança:** Cloudflare (Anti-DDoS e WAF) [11, 12]

## 🛠️ Estrutura do Projeto
- `/src/routes`: Endpoints e telas (DOM Swapping) [7]
- `/src/lib`: Componentes Glassmorphism e Lógica Bouncer [13, 14]
- `/static`: Ativos do PWA (manifest e service-worker) [3]
- `/supabase`: Scripts do Cérebro SQL (schema.sql) [3]

## 📦 Como Instalar
1. Clone o repositório.
2. Copie o `.env.example` para `.env` e preencha as chaves.
3. Execute `npm install` e `npm run dev`.

**O seu tempo vale moedas.**