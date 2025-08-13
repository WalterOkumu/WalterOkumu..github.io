# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Walter Okumu Oriaro's executive portfolio website built with Next.js 15. The project serves as both a professional portfolio showcasing Walter's role as Head of Customer Success & Technical Architecture at Yellow Pages Group, and a demonstration of modern web development practices. The site includes a Multi-Agent Framework orchestrator system for managing AI-driven development tasks.

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

## Key Architecture

### Multi-Agent Orchestrator System
- **Orchestrator** (`orchestrator/orchestrator.js`): Main coordination engine running in continuous loop
- **Registry** (`orchestrator/src/registry.js`): Manages 9 default subagents (A0-A8) with automatic task assignment
- **TaskBoard** (`orchestrator/src/taskBoard.js`): Handles `task-progress.md` as single source of truth
- **Subagents**: PM, Frontend Engineer, Git Tracker, Tester, Content Writer, Designer, Auditor, Doc Writer

### Portfolio Site Architecture
- **App Router Structure**: Pages in `src/app/` with file-based routing
- **Component Organization**: UI components in `src/components/ui/` with motion animations
- **Environment Management**: Centralized config in `src/lib/env.js` with validation
- **Analytics Integration**: Dual tracking with GA4 and Yandex Metrica in `src/app/layout.js`

## Important Notes

- The site is configured for **static export** (`output: 'export'`) suitable for GitHub Pages
- Image optimization is disabled (`unoptimized: true`) as required for static export
- Environment variables are validated through `src/lib/env.js`
- The orchestrator system runs independently and doesn't affect the main portfolio site
- All timestamps in orchestrator use UTC format
- Analytics tracking includes custom executive portfolio metrics
- Task assignment in orchestrator uses regex pattern matching for automatic agent selection