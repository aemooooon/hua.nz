<!-- Copilot / AI agent instructions for contributors and automated agents -->
# Repo summary

This is a small Vite + React (JSX) personal website with Tailwind CSS and a custom image preprocessing pipeline. Keep guidance concise and actionable so an AI coding agent can be productive immediately.

## Big picture
- Entry points: `src/main.jsx` and `src/App.jsx` (single-page app).
- Build system: Vite (`vite.config.js`) + Tailwind (`tailwind.config.js`).
- Static assets: `public/` contains many image sets (organized as `*-avif`, `*-webp`, and original folders). The site uses precomputed image dimensions in `public/precomputed-dimensions.json` and scripts in `scripts/` to generate variants.

## Key files & directories (quick map)
- `src/`: React components and app code. Look at `src/App.jsx` for top-level layout.
- `src/components/`: UI components used across pages.
- `public/`: all static images and precomputed assets (many subfolders grouped by project).
- `scripts/convert-images.js` and `scripts/precompute-image-dimensions.js`: image pipeline utilities — modify these when changing how images are generated.
- `package.json`: project scripts (dev/build). Dev server is started with `npm run dev` (see workspace task `dev-server`).

## How to run (developer workflows)
- Start local dev server: `npm run dev` (or run the workspace task `dev-server`).
- Build for production: `npm run build` (if present in `package.json`) and `npm run preview` to check output.
- Image pipeline: run `node scripts/convert-images.js` or `node scripts/precompute-image-dimensions.js` when updating image assets. After running, update `public/precomputed-dimensions.json` if dimensions change.

## Project-specific conventions
- Images: For each project there are parallel folders with AVIF and WEBP variants (e.g. `gallery-avif/` and `gallery-webp/`). Keep the same base filenames when adding new formats.
- Precomputed metadata: `public/precomputed-dimensions.json` is authoritative for layout sizing; update it after changing images.
- Minimal JS/JSX (no TypeScript). Follow existing component patterns in `src/components/` (functional components, hooks in `src/hooks/`).
- Styling: use Tailwind utility classes in JSX; no global CSS patterns are relied upon except Tailwind config.

## Integration points & external dependencies
- Vite dev server and build pipeline (see `vite.config.js`).
- Tailwind (see `tailwind.config.js`).
- No CI/CD manifests discovered in repo — deployment steps may be external.

## Examples of actionable tasks for an AI agent
- Add a new gallery: create `public/gallery-new/` plus `public/gallery-new-avif/` and `public/gallery-new-webp/`; update `public/precomputed-dimensions.json`; add a component under `src/components/` and route in `src/App.jsx`.
- Optimize image pipeline: update `scripts/convert-images.js` to change AVIF quality flags, then run the script and update precomputed dimensions.

## Enabling Claude Haiku 4.5 for all clients (requested)
- This repository cannot enforce an external model selection; enabling "Claude Haiku 4.5" for all clients is an external configuration on your AI platform or service provider.
- Recommended text to propagate to platform admins or to include in repository-level AI guidance:

```
Preferred model: claude-haiku-4.5
Purpose: Use for assistant replies that require concise, creative, or high-quality natural language outputs.
Note: This is a recommendation only; set the default model in your AI platform/config dashboard to apply it to all clients.
```

- If you want the repo to indicate preference for agents working on it, keep this note in `.github/copilot-instructions.md` (this file) and optionally add an organization-level policy in your AI management console.

## What to change only after confirmation
- Don't rewrite the image pipeline without confirming expected output sizes — many layouts rely on `precomputed-dimensions.json`.

## If something is unclear
- Ask the repo owner where deployments run (Netlify/Vercel/custom host) and whether there are CI secrets for publishing. Also ask for the intended way to enable model defaults (org admin vs. per-client config).

---
If you want, I can (A) open a pull request with this change, (B) add an `ai-config.yml` suggestion file, or (C) draft the exact message to send to platform admins to enable Claude Haiku 4.5. Which would you prefer?
