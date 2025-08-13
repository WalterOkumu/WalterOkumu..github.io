import { clsx } from 'clsx';

/**
 * Utility function to combine class names
 * @param {...string} inputs - Class names to combine
 * @returns {string} Combined class names
 */
export function cn(...inputs) {
  return clsx(inputs);
}

/**
 * Utility function to create CSS variables from design tokens
 * @param {Object} tokens - Design tokens object
 * @param {string} prefix - CSS variable prefix
 * @returns {Object} CSS custom properties
 */
export function createCSSVariables(tokens, prefix = '') {
  const variables = {};

  function processTokens(obj, currentPrefix = '') {
    for (const [key, value] of Object.entries(obj)) {
      const variableName = currentPrefix ? `${currentPrefix}-${key}` : key;

      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        processTokens(value, variableName);
      } else {
        // If value is an array, use the first element, but validate it's not empty
        if (Array.isArray(value)) {
          if (value.length === 0) {
            throw new Error(`Token array for "${variableName}" is empty. Arrays must have at least one value.`);
          }
          variables[`--${prefix}${variableName}`] = value[0];
        } else {
          variables[`--${prefix}${variableName}`] = value;
        }
      }
    }
  }

  processTokens(tokens);
  return variables;
}

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for performance optimization
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
export function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function executedFunction(...args) {
    if (!lastRan) {
      func(...args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if ((Date.now() - lastRan) >= limit) {
          func(...args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

/**
 * Format professional content for display
 * @param {string} text - Text to format
 * @param {number} maxLength - Maximum length
 * @returns {string} Formatted text
 */
export function formatProfessionalText(text, maxLength = 150) {
  if (!text) return '';

  if (text.length <= maxLength) return text;

  // Find the last space before maxLength to avoid cutting words
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');

  return lastSpace > 0
    ? `${truncated.substring(0, lastSpace)}...`
    : `${truncated}...`;
}

/**
 * Generate professional color variants
 * @param {string} baseColor - Base color value
 * @returns {Object} Color variants
 */
export function generateColorVariants(baseColor) {
  // This would typically use a color manipulation library
  // For now, return the base structure
  return {
    50: `${baseColor}0D`,  // 5% opacity
    100: `${baseColor}1A`, // 10% opacity
    200: `${baseColor}33`, // 20% opacity
    300: `${baseColor}4D`, // 30% opacity
    400: `${baseColor}66`, // 40% opacity
    500: baseColor,        // base (full opacity)
    600: `${baseColor}CC`, // 80% opacity
    700: `${baseColor}B3`, // 70% opacity
    800: `${baseColor}99`, // 60% opacity
    900: `${baseColor}80`, // 50% opacity
  };
}

/**
 * Responsive breakpoint utilities
 */
export const breakpoints = {
  xs: '(min-width: 475px)',
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
};

/**
 * Check if user prefers reduced motion
 * @returns {boolean} True if user prefers reduced motion
 */
export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get system color scheme preference
 * @returns {string} 'light' or 'dark'
 */
export function getSystemColorScheme() {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Professional animation presets
 */
export const animations = {
  // Subtle professional animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3, ease: 'easeOut' },
  },

  slideInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },

  slideInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },

  slideInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },

  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.3, ease: 'easeOut' },
  },

  // Professional hover effects
  hoverScale: {
    whileHover: { scale: 1.02 },
    transition: { duration: 0.2, ease: 'easeInOut' },
  },

  hoverLift: {
    whileHover: { y: -2, boxShadow: '0 8px 25px -5px rgb(0 0 0 / 0.1)' },
    transition: { duration: 0.2, ease: 'easeInOut' },
  },
};

/**
 * Accessibility utilities
 */
export const a11y = {
  // Screen reader only text
  srOnly: 'sr-only',

  // Focus management
  focusRing: 'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',

  // Skip links
  skipLink: 'absolute -top-full left-6 z-50 bg-primary-600 text-white px-4 py-2 rounded-md transition-transform focus:top-6',

  // ARIA helpers
  getAriaLabel: (text, action = '') => `${text}${action ? ` ${action}` : ''}`,

  // Color contrast utilities
  highContrast: {
    text: 'text-neutral-900 dark:text-neutral-100',
    bg: 'bg-white dark:bg-neutral-900',
    border: 'border-neutral-300 dark:border-neutral-700',
  },
};

/**
 * Professional content formatting utilities
 */
export const content = {
  // Professional title formatting
  formatTitle: (title) => {
    if (!title) return '';
    return title.split(' ').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  },

  // Format professional metrics
  formatMetric: (value, type = 'number') => {
    if (typeof value !== 'number') return value;

    switch (type) {
      case 'percentage':
        return `${value}%`;
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(value);
      case 'number':
        return new Intl.NumberFormat('en-US').format(value);
      default:
        return value.toString();
    }
  },

  // Generate professional excerpt
  generateExcerpt: (content, wordCount = 30) => {
    if (!content) return '';
    const words = content.split(' ');
    return words.length > wordCount
      ? `${words.slice(0, wordCount).join(' ')}...`
      : content;
  },
};

/**
 * Hydration-safe ID generation
 * Uses a counter to ensure consistent IDs across server and client
 */
let idCounter = 0;

export function generateStableId(prefix = 'id') {
  return `${prefix}-${++idCounter}`;
}

/**
 * Check if we're in browser environment
 * Useful for preventing hydration mismatches when using browser-only APIs
 */
export function isBrowser() {
  return typeof window !== 'undefined';
}

/**
 * Safe value getter that prevents hydration mismatches
 * Returns fallback on server, actual value on client after hydration
 */
export function getSafeValue(browserValue, fallback = null) {
  if (typeof window === 'undefined') {
    return fallback;
  }
  return browserValue;
}

/**
 * Hydration-safe date formatter
 * Returns a consistent format that won't change between server and client
 */
export function formatSafeDate(date = new Date(), options = {}) {
  // Use a consistent locale and options to prevent hydration mismatches
  const safeOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  };

  // Always use en-US locale for consistency in SSR
  return date.toLocaleDateString('en-US', safeOptions);
}

const utils = {
  cn,
  createCSSVariables,
  debounce,
  throttle,
  formatProfessionalText,
  generateColorVariants,
  breakpoints,
  prefersReducedMotion,
  getSystemColorScheme,
  animations,
  a11y,
  content,
  generateStableId,
  isBrowser,
  getSafeValue,
  formatSafeDate,
};

export default utils;