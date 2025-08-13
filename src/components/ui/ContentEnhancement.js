'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

// Task 5.2.1: Dynamic content loading system
export const DynamicContentLoader = ({
  loadFunction,
  fallback = null,
  errorFallback = null,
  dependencies = []
}) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const mountedRef = useRef(true);

  const loadContent = useCallback(async () => {
    if (!mountedRef.current) return;

    setLoading(true);
    setError(null);

    try {
      const result = await loadFunction();
      if (mountedRef.current) {
        setContent(result);
      }
    } catch (err) {
      if (mountedRef.current) {
        setError(err);
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadFunction, ...dependencies]); // Dependencies array is intentional for external control

  useEffect(() => {
    loadContent();
    return () => {
      mountedRef.current = false;
    };
  }, [loadContent]);

  if (loading) return fallback || <div className="content-loading">Loading...</div>;
  if (error) return errorFallback || <div className="content-error">Error loading content</div>;
  return content;
};

// Task 5.2.2: Advanced search functionality
export const SearchSystem = ({
  items = [],
  searchFields = ['title', 'content'],
  onResults = () => {},
  placeholder = 'Search...',
  className = ''
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef(null);

  // Advanced search algorithm with fuzzy matching
  const performSearch = useCallback((searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([]);
      onResults([]);
      return;
    }

    setIsSearching(true);

    // Simulate async search with debouncing
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      const normalizedQuery = searchQuery.toLowerCase();
      const searchTerms = normalizedQuery.split(' ').filter(term => term.length > 0);

      const searchResults = items.map(item => {
        let score = 0;
        let matches = [];

        searchFields.forEach(field => {
          const fieldValue = item[field]?.toLowerCase() || '';

          searchTerms.forEach(term => {
            if (fieldValue.includes(term)) {
              // Exact match gets highest score
              if (fieldValue === term) {
                score += 10;
              }
              // Word boundary match gets high score
              else if (new RegExp(`\\b${term}\\b`).test(fieldValue)) {
                score += 5;
              }
              // Partial match gets lower score
              else {
                score += 2;
              }

              matches.push({ field, term, type: 'match' });
            }
          });
        });

        return { ...item, searchScore: score, searchMatches: matches };
      })
      .filter(item => item.searchScore > 0)
      .sort((a, b) => b.searchScore - a.searchScore);

      setResults(searchResults);
      onResults(searchResults);
      setIsSearching(false);
    }, 300);
  }, [items, searchFields, onResults]);

  useEffect(() => {
    performSearch(query);
  }, [query, performSearch]);

  return (
    <div className={`search-system ${className}`}>
      <div className="search-input-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="search-input"
          aria-label="Search"
        />
        {isSearching && <div className="search-spinner">🔍</div>}
      </div>

      {query && (
        <div className="search-results">
          <div className="search-meta">
            {results.length} result{results.length !== 1 ? 's' : ''} for &quot;{query}&quot;
          </div>
          {results.map((result, index) => (
            <div key={index} className="search-result-item">
              <h3 className="result-title">{result.title}</h3>
              <p className="result-content">{result.content}</p>
              <div className="result-meta">
                Score: {result.searchScore} | Matches: {result.searchMatches.length}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Task 5.2.3: Content recommendation engine
export const ContentRecommendations = ({
  currentItem,
  allItems = [],
  maxRecommendations = 5,
  algorithm = 'similarity'
}) => {
  const recommendations = useMemo(() => {
    if (!currentItem || !allItems.length) return [];

    // Filter out current item
    const candidateItems = allItems.filter(item => item.id !== currentItem.id);

    const scoredItems = candidateItems.map(item => {
      let score = 0;

      switch (algorithm) {
        case 'similarity':
          // Content similarity scoring
          const currentTags = currentItem.tags || [];
          const itemTags = item.tags || [];
          const commonTags = currentTags.filter(tag => itemTags.includes(tag));
          score += commonTags.length * 10;

          // Category matching
          if (item.category === currentItem.category) {
            score += 20;
          }

          // Popularity boost
          score += (item.views || 0) * 0.01;
          break;

        case 'popularity':
          score = item.views || 0;
          break;

        case 'recent':
          const itemDate = new Date(item.date);
          const daysSincePublished = (Date.now() - itemDate.getTime()) / (1000 * 60 * 60 * 24);
          score = Math.max(0, 100 - daysSincePublished);
          break;

        default:
          score = Math.random() * 100;
      }

      return { ...item, recommendationScore: score };
    });

    return scoredItems
      .sort((a, b) => b.recommendationScore - a.recommendationScore)
      .slice(0, maxRecommendations);
  }, [currentItem, allItems, maxRecommendations, algorithm]);

  if (!recommendations.length) return null;

  return (
    <div className="content-recommendations">
      <h3 className="recommendations-title">Recommended for You</h3>
      <div className="recommendations-list">
        {recommendations.map((item, index) => (
          <div key={item.id} className="recommendation-item">
            <div className="recommendation-rank">{index + 1}</div>
            <div className="recommendation-content">
              <h4 className="recommendation-title">{item.title}</h4>
              <p className="recommendation-excerpt">{item.excerpt}</p>
              <div className="recommendation-meta">
                Score: {item.recommendationScore.toFixed(1)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Task 5.2.4: Multilingual support infrastructure
export const LanguageSwitcher = ({
  currentLanguage = 'en',
  languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  ],
  onLanguageChange = () => {}
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <div className="language-switcher">
      <button
        className="language-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="current-language">
          <span className="language-flag">{currentLang?.flag}</span>
          <span className="language-name">{currentLang?.name}</span>
        </span>
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className="language-dropdown" role="listbox">
          {languages.map(language => (
            <button
              key={language.code}
              className={`language-option ${language.code === currentLanguage ? 'active' : ''}`}
              onClick={() => {
                onLanguageChange(language.code);
                setIsOpen(false);
              }}
              role="option"
              aria-selected={language.code === currentLanguage}
            >
              <span className="language-flag">{language.flag}</span>
              <span className="language-name">{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Translation hook for multilingual content
export const useTranslation = (language = 'en') => {
  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadTranslations = async () => {
      setLoading(true);
      try {
        // Simulate loading translations
        const response = await new Promise(resolve => {
          setTimeout(() => {
            resolve({
              en: { welcome: 'Welcome', portfolio: 'Portfolio' },
              es: { welcome: 'Bienvenido', portfolio: 'Portafolio' },
              fr: { welcome: 'Bienvenue', portfolio: 'Portefeuille' },
              de: { welcome: 'Willkommen', portfolio: 'Portfolio' },
            });
          }, 100);
        });

        setTranslations(response[language] || response.en);
      } catch (error) {
        console.error('Error loading translations:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTranslations();
  }, [language]);

  const t = useCallback((key, fallback = key) => {
    return translations[key] || fallback;
  }, [translations]);

  return { t, loading };
};

// Task 5.2.5: Analytics and user behavior tracking
export const AnalyticsTracker = ({
  trackingId,
  enableUserBehavior = true,
  enablePerformance = true
}) => {
  useEffect(() => {
    // Initialize analytics
    const initAnalytics = () => {
      // Google Analytics 4 integration
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', trackingId, {
          page_title: document.title,
          page_location: window.location.href,
        });
      }
    };

    initAnalytics();

    // Track user behavior
    if (enableUserBehavior) {
      const trackScrollDepth = () => {
        const scrollPercent = Math.round(
          (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
        );

        if (scrollPercent % 25 === 0 && scrollPercent > 0) {
          trackEvent('scroll_depth', { scroll_percent: scrollPercent });
        }
      };

      const trackTimeOnPage = () => {
        const timeSpent = Math.round((Date.now() - performance.now()) / 1000);
        trackEvent('time_on_page', { time_seconds: timeSpent });
      };

      window.addEventListener('scroll', trackScrollDepth, { passive: true });
      window.addEventListener('beforeunload', trackTimeOnPage);

      return () => {
        window.removeEventListener('scroll', trackScrollDepth);
        window.removeEventListener('beforeunload', trackTimeOnPage);
      };
    }
  }, [trackingId, enableUserBehavior]);

  // Performance tracking
  useEffect(() => {
    if (enablePerformance && typeof window !== 'undefined') {
      // Track Core Web Vitals
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(metric => trackEvent('web_vitals', { metric: 'CLS', value: metric.value }));
        getFID(metric => trackEvent('web_vitals', { metric: 'FID', value: metric.value }));
        getFCP(metric => trackEvent('web_vitals', { metric: 'FCP', value: metric.value }));
        getLCP(metric => trackEvent('web_vitals', { metric: 'LCP', value: metric.value }));
        getTTFB(metric => trackEvent('web_vitals', { metric: 'TTFB', value: metric.value }));
      });
    }
  }, [enablePerformance]);

  return null; // This component doesn't render anything
};

// Helper function for tracking events
export const trackEvent = (eventName, parameters = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }

  // Also track to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Analytics Event:', eventName, parameters);
  }
};

// Task 5.2.6: A/B testing framework
export const ABTestProvider = ({
  tests = {},
  userId = null,
  onVariantAssigned = () => {}
}) => {
  const [variants, setVariants] = useState({});

  useEffect(() => {
    const assignVariants = () => {
      const newVariants = {};

      Object.entries(tests).forEach(([testName, testConfig]) => {
        // Use consistent assignment based on user ID or session
        const seed = userId || sessionStorage.getItem('ab-test-session') || Date.now().toString();
        const hash = simpleHash(seed + testName);
        const variantIndex = hash % testConfig.variants.length;
        const assignedVariant = testConfig.variants[variantIndex];

        newVariants[testName] = assignedVariant;

        // Track assignment
        trackEvent('ab_test_assignment', {
          test_name: testName,
          variant: assignedVariant.name,
          user_id: userId || 'anonymous'
        });

        onVariantAssigned(testName, assignedVariant);
      });

      setVariants(newVariants);
    };

    assignVariants();
  }, [tests, userId, onVariantAssigned]);

  return null; // Provider component doesn't render
};

// Hook for using A/B test variants
export const useABTest = (testName) => {
  const [variant, setVariant] = useState(null);

  useEffect(() => {
    // Get variant from context or localStorage
    const storedVariant = localStorage.getItem(`ab-test-${testName}`);
    if (storedVariant) {
      setVariant(JSON.parse(storedVariant));
    }
  }, [testName]);

  const trackConversion = useCallback((conversionType = 'click') => {
    if (variant) {
      trackEvent('ab_test_conversion', {
        test_name: testName,
        variant: variant.name,
        conversion_type: conversionType
      });
    }
  }, [testName, variant]);

  return { variant, trackConversion };
};

// Simple hash function for consistent A/B test assignment
const simpleHash = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
};

// Performance monitoring component
export const PerformanceMonitor = ({
  onMetric = () => {},
  thresholds = {
    LCP: 2500, // Good LCP is 2.5s or less
    FID: 100,  // Good FID is 100ms or less
    CLS: 0.1   // Good CLS is 0.1 or less
  }
}) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('web-vitals').then(({ getCLS, getFID, getLCP }) => {
        getCLS((metric) => {
          const status = metric.value <= thresholds.CLS ? 'good' : 'poor';
          onMetric('CLS', metric.value, status);
        });

        getFID((metric) => {
          const status = metric.value <= thresholds.FID ? 'good' : 'poor';
          onMetric('FID', metric.value, status);
        });

        getLCP((metric) => {
          const status = metric.value <= thresholds.LCP ? 'good' : 'poor';
          onMetric('LCP', metric.value, status);
        });
      });
    }
  }, [onMetric, thresholds]);

  return null;
};

// Export components collection with named variable to fix ESLint warning
const ContentEnhancementComponents = {
  DynamicContentLoader,
  SearchSystem,
  ContentRecommendations,
  LanguageSwitcher,
  useTranslation,
  AnalyticsTracker,
  trackEvent,
  ABTestProvider,
  useABTest,
  PerformanceMonitor,
};

export default ContentEnhancementComponents;