# Frontend Instructions

## Commands
- **Dev Server:** `npm run dev` (Vite)
- **Build (Typecheck + Bundle):** `npm run build` (`tsc -b && vite build`)
- **Lint:** `npm run lint` (`eslint .`)
- **Sync API Types:** `npm run sync-api` (generates types from FastAPI OpenAPI spec)

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
