# Claude Multi‑Agent Rules (Global)

- **Evidence-first, no hallucinations**: Cite file paths, commit SHAs, PRD/Spec sections.
- **Ask clarifying questions before creating subagents** (PM leads).
- **Single Source of Truth**: `task-progress.md` governs tasks, owners, and status.
- **Best practices per specialty** are binding (see each agent file).
- **Never ship failing tests**; Playwright smoke must pass before marking tasks done.
- **Docs or it didn’t happen**: Update `/docs` and `/README.md` when your task changes behavior or setup.
- **SSR-first Next.js**; Tailwind, Headless UI, lucide-react, Framer Motion are mandatory where applicable.
