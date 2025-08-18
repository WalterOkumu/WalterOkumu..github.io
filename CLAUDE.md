# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **Walter Oriaro's Executive Portfolio Website** built with Next.js 15 and deployed via GitHub Pages static export. The project leverages a **Multi-Agent Orchestration System** to coordinate comprehensive development activities across 19 specialized agents (A0-A18) ensuring professional quality, accessibility compliance, and executive-level presentation standards.

**Primary Objective:** Showcase Walter's dual-mandate executive leadership spanning customer success operations and technical architecture across 7 countries, managing 12 direct reports while maintaining hands-on technical responsibilities.

### Portfolio Context & Business Requirements

Based on `src/docs/resume.md`, this portfolio must effectively communicate:

**Executive Leadership Metrics:**
- 12 Direct Reports Across 7 Countries 
- 40% Customer Satisfaction Improvement
- 78% Deployment Error Reduction  
- 23% Upsell Revenue Growth
- Full-Stack Technical Architecture Ownership

**Key Digital Properties Managed:**
- 7+ Yellow Pages Group international websites (Kenya, Tanzania, Mozambique, etc.)
- 4+ Tourism & travel guide platforms
- 10+ Client project portfolio spanning healthcare recruitment, corporate communications, wellness platforms

**Technical Competencies to Highlight:**
- Cross-border team management and customer success strategy
- React.js/Next.js architecture and performance optimization
- AWS cloud infrastructure and CI/CD pipeline design
- International digital transformation leadership

## Core Architecture

### Agent System
- **19 specialized agents** (A0-A18) with distinct roles, colors, and tool access
- **Single source of truth**: `task-progress.md` tracks all tasks, owners, artifacts, and decisions
- **Evidence-first approach**: Every claim must link to file paths, commit SHAs, PRs, or documentation
- **Comprehensive coverage**: Full-stack development, security, performance, mobile, internationalization, analytics, and UX research

### Key Files
- `subagents.json`: Agent registry with IDs, roles, colors, tools, and system prompt references
- `task-progress.md`: Central coordination board for tasks, blockers, artifacts, and decisions
- `.claude/rules.md`: System-wide rules governing all agents
- `.claude/agents/*.md`: Individual agent system prompts and workflows

### Agent Roles
| ID | Role | Responsibility | Domain Focus |
|----|------|----------------|--------------|
| A0 | Project Manager | Coordinates, plans, tracks delivery | Coordination & Planning |
| A1 | Orchestrator | Manages agent topology and task routing | Agent Management |
| A2 | Frontend Engineer | SSR-first UI, responsive, accessible | UI/UX Implementation |
| A3 | Git Tracker | Commit discipline, changelogs, releases | Version Control |
| A4 | Tester (QA) | Playwright tests, a11y compliance | Quality Assurance |
| A5 | Content Writer | SEO-optimized copy and metadata | Content & SEO |
| A6 | Graphic Designer | Visual design, tokens, accessibility | Visual Design |
| A7 | Auditor | PRD/Spec conformance verification | Compliance Review |
| A8 | Doc Writer | Documentation maintenance | Documentation |
| A9 | DevOps/CI Engineer | Build pipelines, deployment | Infrastructure |
| A10 | Data/API Integrator | Backend integration, contracts | API Integration |
| A11 | Backend Architect | Server architecture, APIs, microservices | Server Architecture |
| A12 | Security Specialist | Security controls, compliance, vulnerability assessment | Security & Compliance |
| A13 | Database Engineer | Schema design, optimization, migrations | Data Management |
| A14 | Performance Engineer | Optimization, monitoring, Core Web Vitals | Optimization |
| A15 | Mobile Developer | React Native, Flutter, PWA development | Mobile/Native Apps |
| A16 | Internationalization Specialist | i18n/l10n, cultural adaptation | Localization |
| A17 | Analytics Engineer | Tracking, monitoring, business intelligence | Data & Monitoring |
| A18 | UX Researcher | User research, usability testing, insights | User Experience |

## Development Standards

### Quality Gates
- **Web development**: SSR-first architecture required
- **Accessibility**: WCAG 2.2 AA compliance mandatory
- **Performance**: Core Web Vitals budgets (LCP < 2.5s, CLS < 0.1, TTI < 3s)
- **Responsive design**: Mobile, tablet, desktop support
- **Motion**: Respect `prefers-reduced-motion`

### Testing Requirements
- Playwright smoke tests + accessibility tests must pass before merging
- Failed tests block merges until fixed or quarantined with remediation plan
- CI must run build, tests, and Playwright with published artifacts

### Task Management
- All tasks follow format: `- [ ] #T-123 [Owner: A4] Title → **artifact:** <path/URL>`
- Tasks require owner, acceptance criteria, and artifact evidence before completion
- Cross-agent handoffs must be explicit with clear acceptance criteria
- **Phased approach**: Tasks organized in 5 phases (Foundation, Architecture, Development, Quality, Deployment)
- **Cross-functional coordination**: Regular agent coordination meetings and stakeholder reviews

### Documentation Structure
```
docs/
├── architecture/     # Plans, milestones, technical architecture
├── specs/           # PRD, design specifications, API contracts
└── qa/              # Test matrices, audit reports
```

## Working with This Repository

### Before Starting Work
1. Read current `task-progress.md` to understand project state
2. Check `.claude/rules.md` for system-wide constraints
3. Verify your agent role and responsibilities in `subagents.json`
4. Ask clarifying questions before execution (following A0 Project Manager workflow)

### Making Changes
1. Update `task-progress.md` with your progress in real-time
2. Provide evidence links for all claims and completed work
3. Log decisions in the Decision Log section with date/time and rationale
4. Ensure all documentation stays current with changes

### International Standards & Best Practices
- **Accessibility**: WCAG 2.2 AA compliance, screen reader support, keyboard navigation
- **Security**: OWASP Top 10, GDPR/CCPA compliance, SOC 2 controls, threat modeling
- **Performance**: Core Web Vitals standards, 95th percentile SLA requirements
- **Internationalization**: Unicode UTF-8, CLDR formatting, BCP 47 language tags, cultural adaptation
- **Mobile**: iOS Human Interface Guidelines, Android Material Design, cross-platform consistency
- **Quality**: ISO/IEC 25010 quality model, evidence-based testing, continuous improvement
- **Privacy**: Privacy by design, data minimization, user consent management, audit trails

### Key Principles
- **Evidence-first**: Never invent facts, always provide concrete evidence
- **No hallucinations**: Back every claim with file paths, SHAs, URLs, or screenshots  
- **Comprehensive coverage**: All aspects of modern web development with specialized expertise
- **Quality gates**: SSR-first, accessible, responsive, performant, secure applications
- **International standards**: Compliance with WCAG, OWASP, GDPR, and industry best practices
- **Continuous coordination**: Regular cross-agent collaboration and stakeholder alignment
- **Scalable architecture**: Designed for projects from MVP to enterprise scale

### Project Scope Coverage
This enhanced system supports Walter Oriaro's executive portfolio requirements:
- **Executive Portfolio Presentation** (Professional branding, metrics visualization, achievement showcases)
- **Static Site Generation** (Next.js 15 with GitHub Pages deployment optimization)
- **Performance Excellence** (Core Web Vitals compliance, international audience optimization)
- **Accessibility Standards** (WCAG 2.2 AA compliance for executive accessibility)
- **SEO Optimization** (Executive search optimization, LinkedIn/Google visibility)
- **Professional UI/UX** (Executive-level design standards, responsive across devices)
- **Portfolio Architecture** (Project showcases, client testimonials, technical case studies)

## Development Commands & Architecture

### Core Development Commands
```bash
npm run dev          # Start development server with Turbopack (localhost:3000)
npm run build        # Build static export for GitHub Pages deployment
npm start           # Start production server (after build)
npm run lint        # Run ESLint with Next.js core-web-vitals config
```

### Technical Stack & Configuration
- **Framework:** Next.js 15 with App Router and static export (`output: 'export'`)
- **Styling:** Tailwind CSS 4 with executive design tokens (`src/lib/design-tokens.js`)
- **Components:** Headless UI 2.1 for accessibility, Lucide React for icons
- **Animation:** Framer Motion 11.3 with `prefers-reduced-motion` support
- **Environment:** Robust env management (`src/lib/env.js`) with validation and fallbacks
- **Performance:** Core Web Vitals tracking, image optimization for static hosting

### Portfolio-Specific Architecture Patterns

#### Executive-Focused SEO & Metadata (`src/app/layout.js`)
- Professional LinkedIn/Google search optimization
- JSON-LD structured data for executive profile enhancement
- Multi-region SEO (Google, Yandex, Bing verification)
- Executive keywords: "Chief AI Officer", "International Team Leadership", "Customer Success Executive"

#### Professional Design System (`src/lib/design-tokens.js`)
- Executive color palette (professional blues, success greens)
- Typography hierarchy optimized for executive content
- Component tokens for professional cards, buttons, layouts
- Responsive design with mobile-first executive presentation

#### Performance & Analytics Integration
- Google Analytics 4 with executive conversion tracking
- Yandex Metrica for international audience analytics
- Core Web Vitals monitoring for professional user experience
- Custom tracking for portfolio engagement metrics

This system is designed for Walter Oriaro's executive portfolio showcasing international leadership, technical expertise, and customer success achievements across multiple countries and digital properties.

## Task Master AI Instructions
**Import Task Master's development workflow commands and guidelines, treat as if import is in the main CLAUDE.md file.**
@./.taskmaster/CLAUDE.md
