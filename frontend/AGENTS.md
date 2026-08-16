# Frontend Instructions

## Commands
- **Dev Server:** `npm run dev` (Vite)
- **Build (Typecheck + Bundle):** `npm run build` (`tsc -b && vite build`)
- **Lint:** `npm run lint` (`eslint .`)
- **Sync API Types:** `npm run sync-api` (generates types from FastAPI OpenAPI spec; backend must be running on port 8000)

## Tech Stack & Architecture
- **React 19 & TypeScript ~6** with Vite.
- **Tailwind CSS v4** (`@tailwindcss/vite`) & `@base-ui/react` / shadcn patterns.
- **React Compiler** enabled via Babel plugin (`babel-plugin-react-compiler`).
- **Routing:** React Router (`src/app/routes/`).
- **Structure:** Feature-based organization (`src/features/`, `src/app/`, `src/components/`, `src/config/`).
- **API Layer:** Auto-generated from FastAPI backend via `src/lib/api/` (see `api-layer.md`).
- **Documentation:** Detailed architectural guides available in `docs/` (`project-standards.md`, `project-structure.md`, `api-layer.md`, etc.).

## Verification Workflow
- Verification is strictly via build and lint: always run `npm run build` and `npm run lint` after code changes.
- Run `npm run sync-api` after backend schema changes to regenerate frontend types.

## Environment & Integration
- Backend API connection configured via `.env` (`VITE_API_BASE_URL`).
- Standard Git feature branch -> PR -> merge workflow.

## Gotchas

- **`src/lib/api/` is auto-generated** — excluded from ESLint. Do not edit `client.gen.ts`, `types.gen.ts`, `schemas.gen.ts`, or anything in `client/` or `core/`. The only hand-written file in that directory is `products.ts`. Run `npm run sync-api` to regenerate.
- **API URL mismatch:** `.env` has `VITE_API_BASE_URL=http://127.0.0.1:8080` but the generated client hardcodes `http://127.0.0.1:8000`. If you change the backend port, update both `openapi-ts.config.ts` and `client.gen.ts`.
- **No test framework** — docs reference Vitest but it is not installed. No test scripts exist.
- **No pre-commit hooks** — no Husky, no commitlint.
- **No barrel exports** — follow bulletproof-react convention: import directly from component files (`@/features/home/components/HomeHero`), never from an `index.ts` barrel.
- **Feature structure** — each feature under `src/features/` has `components/` and `hooks/` subfolders. Route pages in `src/app/routes/` are thin and compose feature components. Data fetching lives in feature hooks, not in components.
- **Product type adapter** — `src/lib/api/products.ts` defines a local `Product` type that maps API response fields (e.g., `is_active` → `isActive`, `image_url` → `imageUrl`). Import `Product` from `@/types/product` (which re-exports from there), not from `@/lib/api/types.gen`.
