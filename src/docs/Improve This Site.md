# Portfolio Improvements (WCAG 2.2 AA • SEO • Performance • UX)

## Accessibility (WCAG 2.2 AA)
- [ ] Add semantic landmarks: `<header>`, single `<nav>`, `<main>`, `<footer>`; avoid redundant landmarks.
- [ ] Ensure a single `<h1>` per page; fix heading hierarchy (H2/H3).
- [ ] Make Skip Link visible on focus; target `#main`.
- [ ] Provide visible, high-contrast focus styles for all interactive elements.
- [ ] Validate color contrast (body, links, buttons, badges) ≥ 4.5:1 (text) / 3:1 (large text/icons).
- [ ] Audit all images for `alt` (decorative => `alt=""`).
- [ ] Keyboard: full tab flow, no traps; test menus, cards, carousels, “Visit Platform” buttons.
- [ ] Forms: associate `<label>`s, programmatic required state, inline errors with `aria-describedby`, error summary.
- [ ] Set `<html lang="en">`.
- [ ] Pointer target size ≥ 24×24 px; sufficient spacing (WCAG 2.2).
- [ ] Avoid drag-only interactions or provide an alternative (WCAG 2.2).
- [ ] Minimize ARIA; ensure name/role/value for custom components.

## Performance / Core Web Vitals
- [ ] Optimize LCP: compress hero image, serve responsive sizes, Next/Image with `priority`.
- [ ] Prevent CLS: always set `width`/`height` or `aspect-ratio`; reserve space for dynamic elements; `font-display: swap`.
- [ ] Improve INP: defer non-critical JS, reduce heavy effects; measure in PageSpeed + field data.
- [ ] Lazy-load below-the-fold images (`loading="lazy"`, `decoding="async"`).
- [ ] Preconnect/preload critical resources (fonts, hero image).
- [ ] Cache static assets aggressively (Next.js headers / Vercel config).
- [ ] Limit font variants; self-host if possible.

## SEO & Metadata
- [ ] Unique `<title>` and `<meta name="description">` for each route.
- [ ] Add `<link rel="canonical">` on all pages.
- [ ] Create `/robots.txt` and `/sitemap.xml` (Next.js route handlers).
- [ ] Add JSON-LD:
  - [ ] `Person` on Home/About (`@id`, `name`, `jobTitle`, `image`, `sameAs`, `worksFor`).
  - [ ] `Organization` (if you want to brand Rhodium).
  - [ ] `BreadcrumbList` for internal nav.
  - [ ] `Article` for blog posts (when live).
- [ ] Add Open Graph & Twitter Cards: `og:title`, `og:description`, `og:image` (1200x630), `og:url`, `og:type`, `twitter:card=summary_large_image`.
- [ ] Add 404 page with helpful links and search (improves UX/SEO).
- [ ] Consider `hreflang` if you create region-specific pages.

## Portfolio Content & Trust
- [ ] Convert each “International network” item into a full case study (Problem → Action → Result → Proof).
- [ ] Add screenshots (before/after), short Loom walkthroughs, and GitHub pins.
- [ ] Publish 2–3 cornerstone blog posts (CI/CD error reduction, React migration SEO, international ops).
- [ ] Add testimonials (Client/Manager), logos, and a short “Engagement Models” section.
- [ ] Clarify availability windows, response SLAs, and preferred channels on Contact.

## Privacy & Legal
- [ ] Add a simple privacy policy (forms/analytics, retention).
- [ ] Ensure external links with `target="_blank"` include `rel="noopener"`.

## DX / Code Quality
- [ ] Enforce ESLint + TypeScript strict, a11y lint rules (`eslint-plugin-jsx-a11y`).
- [ ] Write unit tests for components that manage focus/keyboard.
- [ ] Include `next-sitemap` and metadata API (`app/metadata.ts`) for per-route titles/descriptions.
