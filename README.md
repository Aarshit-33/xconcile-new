# Xconcile Website (redesign)

Next.js 16 · React 19 · Tailwind CSS v4 · shadcn/ui · Sanity v6 · GSAP

```bash
cp .env.example .env.local   # add Sanity project ID etc.
npm install
npm run dev                  # http://localhost:3000, Studio at /studio
```

**Developers and AI agents: read [AGENTS.md](./AGENTS.md) first.** It covers the hard rules, design sources, the SEO checklist and open decisions.

| Script                            | Purpose                                                                 |
| --------------------------------- | ----------------------------------------------------------------------- |
| `npm run dev` / `build` / `start` | Next.js                                                                 |
| `npm run lint` / `typecheck`      | Quality gates                                                           |
| `npm run format` / `format:check` | Prettier + Tailwind class sorting (write / check only)                  |
| `npm run typegen`                 | Sanity TypeGen                                                          |
| `npm run icons:generate`          | Regenerate the inline Material Symbols icon set                         |
