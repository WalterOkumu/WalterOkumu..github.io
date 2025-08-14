// Executive Design System Tokens for Walter Oriaro Executive Portfolio
// Enhanced for C-Level Professional Presentation and International Standards
export const designTokens = {
  // Executive Professional Color Palette
  colors: {
    // Primary - Executive Blue (C-Level Authority)
    primary: {
      50: '#eff6ff',   // Ultra light - backgrounds
      100: '#dbeafe',  // Light - hover states
      200: '#bfdbfe',  // Soft - borders
      300: '#93c5fd',  // Medium - secondary text
      400: '#60a5fa',  // Active - interactive elements
      500: '#3b82f6',  // Base - primary actions
      600: '#2563eb',  // Strong - executive CTAs
      700: '#1d4ed8',  // Deep - headings
      800: '#1e40af',  // Darker - emphasis
      900: '#1e3a8a',  // Deepest - high contrast
      950: '#172554',  // Executive - premium elements
    },
    // Secondary - Executive Success (Achievement & Growth)
    secondary: {
      50: '#f0fdf4',   // Lightest - success backgrounds
      100: '#dcfce7',  // Light - success states
      200: '#bbf7d0',  // Soft - success borders
      300: '#86efac',  // Medium - success indicators
      400: '#4ade80',  // Active - growth metrics
      500: '#22c55e',  // Base - success actions
      600: '#16a34a',  // Strong - achievement highlights
      700: '#15803d',  // Deep - revenue/growth data
      800: '#166534',  // Darker - performance emphasis
      900: '#14532d',  // Deepest - executive achievements
      950: '#052e16',  // Premium - leadership success
    },
    // Accent - Executive Innovation (AI/Tech Leadership)
    accent: {
      50: '#fff7ed',   // Lightest - innovation backgrounds
      100: '#ffedd5',  // Light - AI feature highlights
      200: '#fed7aa',  // Soft - tech borders
      300: '#fdba74',  // Medium - innovation indicators
      400: '#fb923c',  // Active - AI transformation
      500: '#f97316',  // Base - innovation CTAs
      600: '#ea580c',  // Strong - AI leadership
      700: '#c2410c',  // Deep - tech expertise
      800: '#9a3412',  // Darker - innovation emphasis
      900: '#7c2d12',  // Deepest - AI authority
      950: '#431407',  // Premium - Chief AI Officer
    },
    // Neutral - Professional Grays
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
      950: '#0a0a0a',
    },
    // Semantic Colors
    success: {
      light: '#22c55e',
      DEFAULT: '#16a34a',
      dark: '#15803d',
    },
    warning: {
      light: '#fbbf24',
      DEFAULT: '#f59e0b',
      dark: '#d97706',
    },
    error: {
      light: '#ef4444',
      DEFAULT: '#dc2626',
      dark: '#b91c1c',
    },
    info: {
      light: '#3b82f6',
      DEFAULT: '#2563eb',
      dark: '#1d4ed8',
    }
  },

  // Typography System
  typography: {
    // Font Families
    fontFamily: {
      sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      serif: ['Georgia', 'serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    
    // Font Sizes
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
    },

    // Font Weights
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },

    // Letter Spacing
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },

  // Spacing System
  spacing: {
    px: '1px',
    0: '0px',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    11: '2.75rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem',
  },

  // Border Radius
  borderRadius: {
    none: '0px',
    sm: '0.125rem',
    DEFAULT: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },

  // Shadows
  boxShadow: {
    xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    DEFAULT: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    md: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    lg: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    xl: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  },

  // Animation & Transitions
  animation: {
    duration: {
      fast: '150ms',
      normal: '250ms',
      slow: '350ms',
    },
    ease: {
      DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },

  // Breakpoints
  screens: {
    xs: '475px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Z-Index Scale
  zIndex: {
    0: '0',
    10: '10',
    20: '20',
    30: '30',
    40: '40',
    50: '50',
    dropdown: '1000',
    sticky: '1020',
    fixed: '1030',
    modal: '1040',
    popover: '1050',
    tooltip: '1060',
    toast: '1070',
  },
};

// Component-specific design tokens
export const componentTokens = {
  // Button variants
  button: {
    sizes: {
      sm: {
        padding: '0.5rem 0.75rem',
        fontSize: '0.875rem',
        borderRadius: '0.375rem',
      },
      md: {
        padding: '0.5rem 1rem',
        fontSize: '1rem',
        borderRadius: '0.5rem',
      },
      lg: {
        padding: '0.75rem 1.5rem',
        fontSize: '1.125rem',
        borderRadius: '0.5rem',
      },
      xl: {
        padding: '1rem 2rem',
        fontSize: '1.25rem',
        borderRadius: '0.75rem',
      },
    },
  },
  
  // Card variants
  card: {
    padding: {
      sm: '1rem',
      md: '1.5rem',
      lg: '2rem',
    },
    borderRadius: '0.75rem',
    shadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  },

  // Professional layout constraints
  layout: {
    containerMaxWidth: '1280px',
    sectionPadding: {
      mobile: '2rem 1rem',
      desktop: '4rem 2rem',
    },
    headerHeight: '4rem',
    footerHeight: '6rem',
  },

  // Executive-specific component tokens
  executive: {
    // Executive cards and sections
    card: {
      executive: {
        padding: '2rem 2.5rem',
        borderRadius: '1rem',
        shadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        border: '1px solid rgb(59 130 246 / 0.1)',
        background: 'linear-gradient(135deg, rgb(255 255 255 / 0.9) 0%, rgb(239 246 255 / 0.4) 100%)',
        backdropFilter: 'blur(10px)',
      },
      metric: {
        padding: '1.5rem',
        borderRadius: '0.75rem',
        shadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
        background: 'linear-gradient(145deg, rgb(255 255 255) 0%, rgb(248 250 252) 100%)',
        border: '1px solid rgb(226 232 240)',
        hoverTransform: 'translateY(-2px)',
      },
    },

    // Executive typography scales
    typography: {
      display: {
        fontSize: '4rem',
        lineHeight: '1.1',
        fontWeight: '800',
        letterSpacing: '-0.02em',
      },
      hero: {
        fontSize: '3rem',
        lineHeight: '1.1',
        fontWeight: '700',
        letterSpacing: '-0.01em',
      },
      leadership: {
        fontSize: '1.25rem',
        lineHeight: '1.6',
        fontWeight: '500',
        letterSpacing: '0.01em',
      },
      executive: {
        fontSize: '1.125rem',
        lineHeight: '1.7',
        fontWeight: '400',
        letterSpacing: '0.01em',
      },
    },

    // Executive interaction states
    interaction: {
      magnetic: {
        scale: '1.02',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      glass: {
        backdrop: 'blur(10px)',
        background: 'rgb(255 255 255 / 0.1)',
        border: '1px solid rgb(255 255 255 / 0.2)',
      },
      focusRing: {
        outline: '2px solid rgb(59 130 246)',
        outlineOffset: '2px',
        transition: 'outline-offset 0.2s ease',
      },
    },

    // Executive gradient definitions
    gradients: {
      primary: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      success: 'linear-gradient(135deg, #22c55e 0%, #15803d 100%)',
      innovation: 'linear-gradient(135deg, #f97316 0%, #c2410c 100%)',
      glass: 'linear-gradient(135deg, rgb(255 255 255 / 0.1) 0%, rgb(255 255 255 / 0.05) 100%)',
      executive: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 50%, #172554 100%)',
    },

    // Executive spacing and sizing
    spacing: {
      section: {
        mobile: '4rem 1rem',
        tablet: '6rem 2rem',
        desktop: '8rem 3rem',
      },
      component: '2rem',
      leadership: '3rem',
      executive: '4rem',
    },

    // Executive animation presets
    animation: {
      fadeIn: {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
      },
      slideIn: {
        initial: { opacity: 0, x: -30 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
      },
      scaleIn: {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      },
      magnetic: {
        whileHover: { scale: 1.02, y: -2 },
        transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
      },
    },
  },

  // Professional branding elements
  branding: {
    logo: {
      primary: '#1d4ed8',
      secondary: '#16a34a',
      mark: '#f97316',
    },
    signature: {
      color: '#1e3a8a',
      fontFamily: 'Inter',
      fontWeight: '600',
    },
    tagline: {
      color: '#525252',
      fontFamily: 'Inter',
      fontWeight: '400',
      fontSize: '1rem',
    },
  },
};

export default designTokens;