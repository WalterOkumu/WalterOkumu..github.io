# Next.js Multi‑Agent Framework (Reusable)

Drop‑in framework for **existing or new** Next.js (JavaScript, SSR) projects using Tailwind CSS, Headless UI, lucide‑react, and Framer Motion.

## What this gives you
- **Central orchestrator** with a shared `task-progress.md` SSOT
- **Subagents** (PM, Orchestrator, Git Tracker, Tester, Content Writer, Graphic Designer, Auditor, Doc Writer, + your custom agents)
- **MCP adapters**: `agent-architect`, `playwright`, `context7`
- **Claude Code compatible**: puts agent prompts under `.Claude/agents` + `rules.md`
- **Docs system** under `/docs` with project‑specific subfolders

## Quick start
```bash
# 1) Copy `orchestrator`, `.Claude`, and `docs` into your Next.js repo root
# 2) Install deps for the orchestrator only (your Next app stays untouched)
cd orchestrator && npm i

# 3) Initialize the task board & registry
npm run init

# 4) Start the orchestrator loop (dev)
npm run dev

# 5) Add a task (assigns to best-fit agent automatically)
npm run add:task -- "Implement SSR header with Headless UI Menu" A2
```
