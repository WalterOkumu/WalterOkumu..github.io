'use client';

import { Navigation } from './Navigation';
import { cn } from '@/lib/utils';
import { ENV } from '@/lib/env';

/**
 * Executive Portfolio Layout Component - Design System 2.0
 * Sophisticated Minimalism + Technical Excellence
 * WCAG 2.1 AAA Compliant | SSR-First Architecture
 */
const Layout = ({
  children,
  className = '',
  showNavigation = true,
  showFooter = true,
  fixedNavigation = false,
  maxWidth = 'executive',
  padding = true,
}) => {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex flex-col">
      {/* Skip to content link - WCAG 2.1 AAA compliant */}
      <a
        href="#main"
        className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-skip-link bg-interactive-primary text-white px-md py-sm rounded-lg font-semibold transition-all duration-200 min-w-[200px] text-center shadow-xl"
      >
        Skip to main content
      </a>

      {/* Header with Navigation - single semantic header landmark */}
      {showNavigation && (
        <header role="banner" className="w-full">
          <Navigation fixed={fixedNavigation} />
        </header>
      )}

      {/* Main Content - single semantic main landmark */}
      <main
        id="main"
        className={cn([
          'flex-1 w-full',
          fixedNavigation && 'pt-16',
          className,
        ])}
        role="main"
      >
        {padding ? (
          <div className={cn([
            // Container classes from design system
            maxWidth === 'executive' && 'container',
            maxWidth === 'wide' && 'container-lg',
            maxWidth === 'narrow' && 'container-md',
            maxWidth === 'content' && 'container-sm',
            maxWidth === 'full' && 'w-full',
          ])}>
            {children}
          </div>
        ) : (
          children
        )}
      </main>

      {/* Footer */}
      {showFooter && <Footer />}
    </div>
  );
};

/**
 * Executive Footer Component - Design System 2.0
 * Professional presentation with WCAG 2.1 AAA compliance
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Professional links with proper accessibility
  const footerLinks = {
    professional: [
      {
        name: 'LinkedIn',
        href: ENV.LINKEDIN_URL,
        external: true,
        description: 'Professional profile and network'
      },
      {
        name: 'GitHub',
        href: ENV.GITHUB_URL,
        external: true,
        description: 'Technical projects and contributions'
      },
    ],
    portfolio: [
      { name: 'About', href: '/about', description: 'Executive background and experience' },
      { name: 'Projects', href: '/projects', description: 'Technical portfolio and achievements' },
      { name: 'Skills', href: '/skills', description: 'Technical and leadership competencies' },
      { name: 'Contact', href: '/contact', description: 'Professional consultation inquiries' },
    ],
    content: [
      { name: 'Blog', href: '/blog', description: 'Industry insights and thought leadership' },
      { name: 'Speaking', href: '/speaking', description: 'Conference talks and presentations' },
    ],
    legal: [
      { name: 'Privacy', href: '/privacy', description: 'Privacy policy and data handling' },
      { name: 'Terms', href: '/terms', description: 'Terms of service and usage' },
    ],
  };

  return (
    <footer
      className="section-fullwidth bg-color-neutral-900 text-white border-t border-neutral-800"
      role="contentinfo"
    >
      <div className="section-content py-3xl">
        <div className="grid-executive">
          {/* Executive Brand Section */}
          <div className="space-y-leadership">
            <div className="flex items-center gap-md mb-lg">
              <div className="w-12 h-12 bg-gradient-executive rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-lg">
                WO
              </div>
              <div>
                <h3 className="heading-tertiary text-white mb-0">
                  Walter Okumu Oriaro
                </h3>
                <p className="text-leadership text-neutral-300">
                  Head of Customer Success & Technical Architecture
                </p>
              </div>
            </div>
            
            <p className="text-executive text-neutral-200 max-w-prose">
              AI-driven technology executive leading international digital transformation across 7 countries. 
              Managing 12-person global teams while delivering measurable AI-powered business outcomes 
              and technical excellence.
            </p>

            {/* Professional Links with enhanced accessibility */}
            <div className="flex gap-sm pt-lg">
              {footerLinks.professional.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="btn-glass interactive-element magnetic-element focus-ring p-md rounded-lg"
                  {...(link.external && {
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    'aria-label': `${link.name}: ${link.description} (opens in new tab)`,
                  })}
                >
                  <span className="sr-only">{link.name}: {link.description}</span>
                  <SocialIcon name={link.name} />
                </a>
              ))}
            </div>
          </div>

          {/* Portfolio Navigation */}
          <div>
            <h4 className="heading-tertiary text-white mb-lg">
              Portfolio
            </h4>
            <nav aria-label="Portfolio navigation">
              <ul className="space-y-component">
                {footerLinks.portfolio.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-neutral-300 hover:text-white transition-colors duration-200 focus-ring interactive-element p-xs rounded-md block"
                      aria-label={`${link.name}: ${link.description}`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Content Links */}
          <div>
            <h4 className="heading-tertiary text-white mb-lg">
              Content
            </h4>
            <nav aria-label="Content navigation">
              <ul className="space-y-component">
                {footerLinks.content.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-neutral-300 hover:text-white transition-colors duration-200 focus-ring interactive-element p-xs rounded-md block"
                      aria-label={`${link.name}: ${link.description}`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="heading-tertiary text-white mb-lg">
              Legal
            </h4>
            <nav aria-label="Legal navigation">
              <ul className="space-y-component">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-neutral-300 hover:text-white transition-colors duration-200 focus-ring interactive-element p-xs rounded-md block"
                      aria-label={`${link.name}: ${link.description}`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Footer Bottom - Executive Signature */}
        <div className="mt-3xl pt-xl border-t border-neutral-700">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-md">
            <div className="text-metrics text-neutral-400">
              <p>&copy; {currentYear} Walter Okumu Oriaro. All rights reserved.</p>
              <p className="mt-xs">
                Executive Portfolio | Nairobi, Kenya | Available for global opportunities
              </p>
            </div>

            <div className="flex items-center gap-sm text-metrics text-neutral-500">
              <span>Built with Next.js 15</span>
              <span className="w-1 h-1 bg-current rounded-full" />
              <span>Design System 2.0</span>
              <span className="w-1 h-1 bg-current rounded-full" />
              <span>WCAG 2.1 AAA</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

/**
 * Executive Social Icon Component
 * Optimized for accessibility and professional presentation
 */
const SocialIcon = ({ name }) => {
  const iconClass = "w-6 h-6";

  switch (name) {
    case 'LinkedIn':
      return (
        <svg 
          className={iconClass} 
          fill="currentColor" 
          viewBox="0 0 24 24" 
          aria-hidden="true" 
          role="img"
        >
          <title>LinkedIn professional profile</title>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      );
    case 'GitHub':
      return (
        <svg 
          className={iconClass} 
          fill="currentColor" 
          viewBox="0 0 24 24" 
          aria-hidden="true" 
          role="img"
        >
          <title>GitHub technical projects and contributions</title>
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      );
    default:
      return null;
  }
};

export { Layout, Footer };
export default Layout;