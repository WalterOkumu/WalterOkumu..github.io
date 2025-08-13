# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Walter Okumu Oriaro's executive portfolio website built with Next.js 15. The project serves as both a professional portfolio showcasing Walter's role as Head of Customer Success & Technical Architecture at Yellow Pages Group, and a demonstration of modern web development practices. The site includes a Multi-Agent Framework orchestrator system for managing AI-driven development tasks.

## Key Architecture

### Core Components

- **Orchestrator** (`orchestrator/orchestrator.js`): Main coordination engine that runs in a loop, assigning tasks to agents, running tests, and managing the project state
- **Registry** (`orchestrator/src/registry.js`): Manages subagent definitions and automatically assigns tasks based on title pattern matching
- **TaskBoard** (`orchestrator/src/taskBoard.js`): Handles the central `task-progress.md` file as the single source of truth for project state
- **MCP Tools**: Three main tools for agent capabilities:
  - `agentArchitect`: Analyzes agent topology and optimizes prompts
  - `context7`: Provides daily summaries and context packing
  - `playwright`: Runs smoke tests and generates reports

### Default Subagents

The system initializes with 9 predefined agents (A0-A8):
- A0: Project Manager (pm) - Plans and breakdowns
- A1: Orchestrator (orchestrator) - Agent management and topology
- A2: Frontend Engineer (frontend) - Next.js, Tailwind, Headless UI implementation
- A3: Git Tracker (gitops) - Version control operations
- A4: Tester (qa) - Playwright testing
- A5: Content Writer (content) - SEO, copy, metadata
- A6: Graphic Designer (design) - UI polish, graphics
- A7: Auditor (audit) - Compliance and validation
- A8: Doc Writer (docs) - Documentation and examples

### Task Assignment Logic

Tasks are automatically assigned to agents based on title pattern matching in `registry.js:35-49`. The system uses regex patterns to match task titles to appropriate agent roles.

## Development Commands

### Main Portfolio Application
```bash
npm run dev                 # Start development server with Turbopack
npm run build               # Build for production (static export)
npm run start               # Start production server
npm run lint                # Run ESLint with Next.js config
```

### Orchestrator System
```bash
cd orchestrator
npm install
npm run init                # Initialize task board and registry
npm run dev                 # Start orchestrator loop (6-second intervals)
npm run add:task -- "Task title" A2    # Add task assigned to specific agent
npm run add:agent -- A9 "Custom Agent" custom    # Add new agent
npm run sync                # Sync task board state
npm run test:e2e           # Run Playwright end-to-end tests
```

## File Structure

### Portfolio Application
- `src/app/` - Next.js App Router pages and layouts
- `src/components/` - React components organized by feature
- `src/lib/` - Utility functions, environment config, analytics
- `src/styles/` - Global CSS and design tokens
- `public/` - Static assets (images, icons, manifest)
- `out/` - Static export output directory

### Configuration Files
- `next.config.mjs` - Next.js configuration with static export settings
- `eslint.config.mjs` - ESLint flat config extending Next.js rules
- `package.json` - Dependencies including React 19, Headless UI, Framer Motion
- `postcss.config.mjs` - PostCSS config for Tailwind CSS 4

### Orchestrator System
- `orchestrator/` - Multi-agent framework (ES modules, Node.js)
- `docs/` - Extensive project documentation and specifications
- `task-progress.md` - Central SSOT for tasks and daily summaries (auto-generated)
- `subagents.json` - Agent registry (auto-generated)

## Key Behaviors

- Orchestrator runs continuous loop checking for unassigned tasks and test requirements
- Tasks marked with `needsTest` flag automatically trigger Playwright smoke tests
- Daily summaries are generated and appended to the task board
- Agent topology is monitored for overlap (suggests merges when >10 agents)
- File locking prevents concurrent task board modifications
- All timestamps use UTC format

## Technology Stack

### Frontend
- **Next.js 15** with App Router and React 19
- **Tailwind CSS 4** for styling with design tokens
- **Headless UI 2.x** for accessible components
- **Framer Motion** for animations and interactions
- **Lucide React** for consistent iconography
- **Static Export** configuration for GitHub Pages deployment

### Analytics & SEO
- Google Analytics 4 with enhanced ecommerce tracking
- Yandex Metrica with click maps and web visor
- Comprehensive structured data (JSON-LD)
- Core Web Vitals monitoring and reporting
- Advanced scroll depth and engagement tracking

### Development Features
- **Turbopack** for fast development builds
- **ESLint 9** with flat config and Next.js rules
- **Environment configuration** with validation
- **Image optimization** disabled for static export
- **Performance optimizations** including package imports optimization

## Important Notes

- The site is configured for **static export** (`output: 'export'`) suitable for GitHub Pages
- Image optimization is disabled (`unoptimized: true`) as required for static export
- Environment variables are validated through `src/lib/env.js`
- The orchestrator system runs independently and doesn't affect the main portfolio site
- All timestamps in orchestrator use UTC format
- Analytics tracking includes custom executive portfolio metrics