@AGENTS.md

# Claude Code notes

- `AGENTS.md` (imported above) is the single source of truth. Follow its **§0 Hard rules**, especially: **no UI change that isn't specified in the design files or `docs/`**. If it isn't specified, ask first.
- **Permissions:** `.claude/settings.json` lets you run any command without prompting. The design sources, old code and `docs/` are read-only and edits to them are denied.
- **Before coding Next.js APIs:** read the matching guide in `node_modules/next/dist/docs/`. This is Next 16.4 with Cache Components, so `export const dynamic` / `revalidate` segment configs are not allowed. Use `'use cache'`, `cacheTag` and `cacheLife`.
- **Before building a section:** open the page's `page.svg` (render it, or read it in a browser) and the matching rules in `page.css`. Then check `docs/design/design_normalization_spec.md` for that page's group.
- **Verification:**
  - Run `npm run typecheck && npm run lint && npm run build` before saying a task is done.
  - Compare visual work against the SVG at 1440px and 390px.
