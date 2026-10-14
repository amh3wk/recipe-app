# Project rules
- Define app palette roles in frontend/src/index.css and expose them through Tailwind; pages use semantic tokens so palette changes stay centralized.
- Keep the root TypeScript configuration pointed at frontend sources because preview checks run from the repository root.
- Deduplicate React and React DOM in Vite so dependencies and the app share a single hook dispatcher in preview.