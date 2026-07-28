# @fullybuilt/core

Shared **"warm" design system** for all Fully Built client dashboards (KPI tiles,
charts, cards, segmented tabs, etc.). Single source of truth — edit here, version,
and every client app picks it up. Keeps the dashboards consistent instead of each
fork drifting.

**The rules live in [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md).** Read it before adding
a surface, and read it *and put the component in `src/`* before adding a component.

## What's inside
- `src/warm/` — the design-system components and chart primitives
- `src/warm/form/` — the form layer (`Field`, `Input`, `Select`, `Checkbox`, `Switch`, `Modal`)
- `src/lib/` — `utils` (cn) + `motion` helpers used by the components
- `src/ui/` — the shadcn primitives the warm system depends on (skeleton, tabs, sheet, resizable)
- `dist/` — prebuilt ESM + types (committed, so consumers need no build step)

## Consuming it (client dashboard)
1. Add the dependency (pin to a tag):
   ```jsonc
   // package.json
   "@fullybuilt/core": "github:FrameworkLabs22/fullybuilt-core#v0.1.0"
   ```
2. Import from the package:
   ```ts
   import { KpiTile, ChartCard, Card } from "@fullybuilt/core";
   ```
3. **Vite** — dedupe shared singletons (`vite.config.ts`):
   ```ts
   resolve: { dedupe: ["react", "react-dom", "react-router-dom", "framer-motion", "recharts"] }
   ```
4. **Tailwind** — scan the package so its classes aren't purged (`tailwind.config.ts`):
   ```ts
   content: [ /* ...app globs... */, "./node_modules/@fullybuilt/core/dist/**/*.{js,mjs}" ]
   ```

## Releasing a change
1. Edit `src/`, run `npm run build` (regenerates `dist/`).
2. Commit (including `dist/`), bump the version, tag it: `git tag v0.1.1 && git push --tags`.
3. Bump the dependency pin in each consuming dashboard.
