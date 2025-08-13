'use client';

import { useState, useEffect, Fragment } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, User, Briefcase, Code, MessageSquare, 
  Menu, X, Sun, Moon 
} from 'lucide-react';
import { Disclosure, Transition } from '@headlessui/react';
import { cn } from '@/lib/utils';

// Navigation items with icons
const navigationItems = [
  { 
    name: 'Home', 
    href: '/', 
    description: 'Professional introduction and overview',
    icon: Home
  },
  { 
    name: 'About', 
    href: '/about', 
    description: 'Experience and leadership background',
    icon: User
  },
  { 
    name: 'Projects', 
    href: '/projects', 
    description: 'Technical and leadership portfolio',
    icon: Briefcase
  },
  { 
    name: 'Skills', 
    href: '/skills', 
    description: 'Technical and management expertise',
    icon: Code
  },
  { 
    name: 'Blog', 
    href: '/blog', 
    description: 'Insights and thought leadership',
    icon: MessageSquare
  },
  { 
    name: 'Contact', 
    href: '/contact', 
    description: 'Professional inquiries and networking',
    icon: MessageSquare
  },
];

/**
 * Executive Navigation Component - Design System 2.0
 * Sophisticated Minimalism + Technical Excellence
 * WCAG 2.1 AAA Compliant | Headless UI Integration
 */
const Navigation = ({
  className = '',
  variant = 'header',
  showLogo = true,
  fixed = false,
}) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for fixed navigation
  useEffect(() => {
    if (!fixed) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fixed]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = originalOverflow || 'unset';
    };
  }, [isMenuOpen]);

  const isActive = (href) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const baseNavStyles = cn([
    'w-full transition-all duration-300 ease-out z-navigation',
    fixed && 'fixed top-0 left-0',
    fixed && scrolled && 'section-fullwidth bg-color-neutral-50/95 dark:bg-color-neutral-900/95 backdrop-blur-xl border-b border-neutral-200/30 dark:border-neutral-800/30 shadow-lg',
    fixed && !scrolled && 'bg-transparent',
    !fixed && 'section-fullwidth bg-color-neutral-50 dark:bg-color-neutral-900 border-b border-color-neutral-200 dark:border-color-neutral-800',
    className,
  ]);

  return (
    <Disclosure as="nav" className={baseNavStyles}>
      {({ open }) => (
        <>
          <div className="section-content">
            <div className="flex items-center justify-between h-navigation py-space-md">
              {/* Executive Logo */}
              {showLogo && (
                <motion.div 
                  className="flex-shrink-0"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  <Link
                    href="/"
                    className="executive-logo group focus-ring magnetic-element"
                    aria-label="Walter Okumu Oriaro - Home"
                  >
                    <div className="w-logo h-logo bg-gradient-executive rounded-xl flex items-center justify-center text-white font-bold text-leadership shadow-lg group-hover:shadow-xl transition-all duration-200">
                      WO
                    </div>
                    <div className="hidden sm:block ml-md">
                      <div className="heading-tertiary text-text-primary-on-light dark:text-text-primary-on-dark mb-0">
                        Walter Okumu
                      </div>
                      <div className="text-metrics text-text-secondary-on-light dark:text-text-secondary-on-dark">
                        Technology Executive
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}

              {/* Desktop Navigation */}
              <div className="hidden lg:block">
                <nav className="flex items-center space-x-component" aria-label="Primary navigation">
                  {navigationItems.map((item, index) => {
                    const IconComponent = item.icon;
                    const active = isActive(item.href);
                    
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3, ease: 'easeOut' }}
                      >
                        <Link
                          href={item.href}
                          className={cn([
                            'group relative flex items-center gap-sm px-md py-sm rounded-lg text-executive font-medium transition-all duration-200 focus-ring interactive-element',
                            active
                              ? 'bg-gradient-executive text-white shadow-lg'
                              : 'text-text-secondary-on-light dark:text-text-secondary-on-dark hover:text-text-primary-on-light dark:hover:text-text-primary-on-dark hover:bg-color-neutral-100/80 dark:hover:bg-color-neutral-800/50',
                          ])}
                          aria-current={active ? 'page' : undefined}
                          title={item.description}
                        >
                          <IconComponent className="w-icon-sm h-icon-sm transition-transform duration-200 group-hover:scale-105" />
                          <span className="relative">
                            {item.name}
                            {active && (
                              <motion.div
                                className="absolute -bottom-xs left-0 right-0 h-px bg-white/60 rounded-full"
                                layoutId="desktopActiveIndicator"
                                initial={false}
                                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                              />
                            )}
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>
              </div>

              {/* Desktop Actions */}
              <div className="hidden lg:flex items-center gap-sm">
                <ThemeToggle />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.3, ease: 'easeOut' }}
                >
                  <Link
                    href="/contact"
                    className="btn-executive focus-ring magnetic-element group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-sm">
                      <MessageSquare className="w-icon-sm h-icon-sm transition-transform duration-200 group-hover:scale-105" />
                      <span className="font-semibold">Get in Touch</span>
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-color-primary-700"
                      initial={{ x: '100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              </div>

              {/* Mobile Actions */}
              <div className="lg:hidden flex items-center gap-sm">
                <ThemeToggle />
                <Disclosure.Button className="btn-glass focus-ring interactive-element p-sm rounded-lg">
                  <span className="sr-only">
                    {open ? 'Close navigation menu' : 'Open navigation menu'}
                  </span>
                  <AnimatePresence mode="wait">
                    {open ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X className="w-icon-md h-icon-md text-text-primary-on-light dark:text-text-primary-on-dark" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Menu className="w-icon-md h-icon-md text-text-primary-on-light dark:text-text-primary-on-dark" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Panel */}
          <Transition
            show={open}
            as={Fragment}
          >
            <div className="lg:hidden fixed inset-0 z-mobile-menu">
              {/* Backdrop */}
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-overlay-dark backdrop-blur-md" />
              </Transition.Child>

              {/* Menu Panel */}
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Disclosure.Panel className="fixed right-0 top-0 h-full w-full max-w-mobile-menu bg-color-neutral-50/95 dark:bg-color-neutral-900/95 backdrop-blur-xl border-l border-color-neutral-200/30 dark:border-color-neutral-800/30 shadow-2xl">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between p-lg border-b border-color-neutral-200/30 dark:border-color-neutral-800/30">
                    <Link
                      href="/"
                      className="executive-logo focus-ring"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="w-logo h-logo bg-gradient-executive rounded-xl flex items-center justify-center text-white font-bold text-leadership shadow-lg">
                        WO
                      </div>
                      <div className="ml-md">
                        <div className="heading-tertiary text-text-primary-on-light dark:text-text-primary-on-dark mb-0">
                          Walter Okumu
                        </div>
                        <div className="text-metrics text-text-secondary-on-light dark:text-text-secondary-on-dark">
                          Technology Executive
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="px-lg py-xl space-y-component" aria-label="Mobile navigation">
                    {navigationItems.map((item, index) => {
                      const IconComponent = item.icon;
                      const active = isActive(item.href);
                      
                      return (
                        <motion.div
                          key={item.name}
                          initial={{ x: 30, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.05, duration: 0.2 }}
                        >
                          <Link
                            href={item.href}
                            className={cn([
                              'group flex items-center gap-md px-lg py-lg rounded-xl text-executive font-medium transition-all duration-200 focus-ring interactive-element w-full',
                              active
                                ? 'bg-gradient-executive text-white shadow-lg'
                                : 'text-text-primary-on-light dark:text-text-primary-on-dark hover:bg-color-neutral-100 dark:hover:bg-color-neutral-800/50',
                            ])}
                            onClick={() => setIsMenuOpen(false)}
                            aria-current={active ? 'page' : undefined}
                          >
                            <IconComponent className="w-icon-md h-icon-md transition-transform duration-200 group-hover:scale-105" />
                            <div className="flex-1 text-left">
                              <div className="font-semibold">{item.name}</div>
                              <div className={cn(
                                "text-metrics transition-colors",
                                active
                                  ? "text-white/80"
                                  : "text-text-secondary-on-light dark:text-text-secondary-on-dark"
                              )}>
                                {item.description}
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </nav>

                  {/* Mobile CTA */}
                  <div className="absolute bottom-0 left-0 right-0 p-lg border-t border-color-neutral-200/30 dark:border-color-neutral-800/30">
                    <Link
                      href="/contact"
                      className="btn-executive focus-ring w-full justify-center text-center group"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <MessageSquare className="w-icon-sm h-icon-sm mr-sm transition-transform duration-200 group-hover:scale-105" />
                      <span className="font-semibold">Get in Touch</span>
                    </Link>
                  </div>
                </Disclosure.Panel>
              </Transition.Child>
            </div>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};


/**
 * Executive Theme Toggle Component
 * Sophisticated dark/light mode with persistence and accessibility
 */
const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    // Enhanced theme detection with system preference support
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = stored === 'dark' || (!stored && prefersDark);
    
    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle('dark', shouldBeDark);
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e) => {
      if (!localStorage.getItem('theme')) {
        setIsDark(e.matches);
        document.documentElement.classList.toggle('dark', e.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []);
  
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newTheme);
  };
  
  // Prevent hydration mismatch with design system styling
  if (!mounted) {
    return (
      <div className="w-action-md h-action-md rounded-lg bg-color-neutral-100 dark:bg-color-neutral-800 animate-pulse" />
    );
  }
  
  return (
    <motion.button
      onClick={toggleTheme}
      className="btn-glass focus-ring interactive-element p-sm rounded-lg"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <Moon className="w-icon-sm h-icon-sm text-text-primary-on-light dark:text-text-primary-on-dark" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <Sun className="w-icon-sm h-icon-sm text-text-primary-on-light dark:text-text-primary-on-dark" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export { Navigation, navigationItems };
export default Navigation;