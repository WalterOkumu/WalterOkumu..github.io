'use client';

import { useState } from 'react';
import {
  CursorFollower,
  ParallaxSection,
  InteractiveMetric,
  GestureHandler,
  Tooltip,
  ProgressiveDisclosure,
  ScrollReveal,
  MagneticHover
} from './AdvancedInteractions';

import {
  DynamicContentLoader,
  SearchSystem,
  ContentRecommendations,
  LanguageSwitcher,
  useTranslation,
  AnalyticsTracker,
  trackEvent,
  ABTestProvider,
  useABTest,
  PerformanceMonitor
} from './ContentEnhancement';

// Demo data for Phase 5 features
const demoItems = [
  {
    id: 1,
    title: 'Advanced React Patterns',
    content: 'Comprehensive guide to modern React development patterns and best practices.',
    category: 'Development',
    tags: ['React', 'JavaScript', 'Frontend'],
    views: 2500,
    date: '2024-01-15',
    excerpt: 'Learn advanced React patterns for building scalable applications.'
  },
  {
    id: 2,
    title: 'Leadership in Technology',
    content: 'Strategies for effective technology leadership in international organizations.',
    category: 'Leadership',
    tags: ['Leadership', 'Management', 'Technology'],
    views: 1800,
    date: '2024-02-01',
    excerpt: 'Essential leadership principles for technology executives.'
  },
  {
    id: 3,
    title: 'Performance Optimization',
    content: 'Complete guide to web performance optimization and Core Web Vitals.',
    category: 'Performance',
    tags: ['Performance', 'Optimization', 'Web'],
    views: 3200,
    date: '2024-01-28',
    excerpt: 'Master techniques for lightning-fast web applications.'
  }
];

const demoMetrics = [
  { value: 150, maxValue: 200, label: 'Projects Completed', color: 'success' },
  { value: 95, maxValue: 100, label: 'Client Satisfaction', color: 'primary' },
  { value: 78, maxValue: 100, label: 'Team Efficiency', color: 'warning' }
];

const Phase5Showcase = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [searchResults, setSearchResults] = useState([]);
  const { t, loading: translationLoading } = useTranslation(currentLanguage);
  const { variant: heroVariant, trackConversion } = useABTest('hero-layout');

  // Performance monitoring
  const handlePerformanceMetric = (metric, value, status) => {
    console.log(`Performance Metric - ${metric}: ${value} (${status})`);
    trackEvent('performance_metric', { metric, value, status });
  };

  // Dynamic content loader function
  const loadDynamicContent = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return (
      <div className="dynamic-content">
        <h3 className="heading-secondary">Dynamically Loaded Content</h3>
        <p className="text-executive">
          This content was loaded dynamically using the Phase 5 content loading system.
        </p>
      </div>
    );
  };

  // A/B test configuration
  const abTests = {
    'hero-layout': {
      variants: [
        { name: 'control', data: { layout: 'standard' } },
        { name: 'experimental', data: { layout: 'asymmetric' } }
      ]
    }
  };

  return (
    <div className="phase5-showcase">
      {/* Analytics and Performance Monitoring */}
      <AnalyticsTracker
        trackingId="GA_DEMO_ID"
        enableUserBehavior={true}
        enablePerformance={true}
      />

      <PerformanceMonitor
        onMetric={handlePerformanceMetric}
        thresholds={{ LCP: 2500, FID: 100, CLS: 0.1 }}
      />

      <ABTestProvider
        tests={abTests}
        userId="demo-user"
        onVariantAssigned={(testName, variant) => {
          console.log(`A/B Test Assigned - ${testName}: ${variant.name}`);
        }}
      />

      {/* Hero Section with Cursor Following and Parallax */}
      <section className="section-fullwidth hero-fullwidth">
        <ParallaxSection speed={0.3} className="hero-background">
          <div className="hero-content">
            <CursorFollower intensity={0.1}>
              <ScrollReveal direction="up" delay={200}>
                <h1 className="heading-display">
                  Phase 5: Advanced Features
                </h1>
              </ScrollReveal>
            </CursorFollower>

            <ScrollReveal direction="up" delay={400}>
              <p className="text-executive">
                Demonstrating cutting-edge interactions, content systems, and user experience enhancements.
              </p>
            </ScrollReveal>

            <div className="hero-actions">
              <ScrollReveal direction="up" delay={600}>
                <MagneticHover strength={0.2}>
                  <button
                    className="btn-executive"
                    onClick={() => {
                      trackConversion('hero-cta-click');
                      trackEvent('demo_interaction', { action: 'hero_cta' });
                    }}
                  >
                    <Tooltip content="Advanced interactive button with analytics">
                      Explore Features
                    </Tooltip>
                  </button>
                </MagneticHover>
              </ScrollReveal>
            </div>
          </div>
        </ParallaxSection>
      </section>

      {/* Interactive Metrics Section */}
      <section className="section-fullwidth">
        <div className="container-executive">
          <ScrollReveal direction="up">
            <h2 className="heading-primary text-center">Interactive Data Visualization</h2>
          </ScrollReveal>

          <div className="grid-executive" style={{ marginTop: 'var(--space-xl)' }}>
            {demoMetrics.map((metric, index) => (
              <ScrollReveal key={index} direction="up" delay={index * 200}>
                <InteractiveMetric {...metric} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Search System */}
      <section className="section-fullwidth" style={{ background: 'var(--color-neutral-50)' }}>
        <div className="container-executive">
          <ScrollReveal direction="up">
            <h2 className="heading-primary text-center">Advanced Search System</h2>
            <p className="text-executive text-center">
              Intelligent search with fuzzy matching, scoring, and real-time results.
            </p>
          </ScrollReveal>

          <div style={{ marginTop: 'var(--space-xl)' }}>
            <SearchSystem
              items={demoItems}
              searchFields={['title', 'content', 'tags']}
              onResults={setSearchResults}
              placeholder="Search articles, technologies, topics..."
            />
          </div>

          {searchResults.length > 0 && (
            <ScrollReveal direction="up" delay={300}>
              <div style={{ marginTop: 'var(--space-lg)' }}>
                <ContentRecommendations
                  currentItem={searchResults[0]}
                  allItems={demoItems}
                  maxRecommendations={3}
                  algorithm="similarity"
                />
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* Gesture Support and Progressive Disclosure */}
      <section className="section-fullwidth">
        <div className="container-executive">
          <ScrollReveal direction="up">
            <h2 className="heading-primary text-center">Progressive Disclosure & Gestures</h2>
          </ScrollReveal>

          <div className="layout-asymmetric-primary" style={{ marginTop: 'var(--space-xl)' }}>
            <div>
              <GestureHandler
                onSwipeLeft={() => trackEvent('gesture', { type: 'swipe_left' })}
                onSwipeRight={() => trackEvent('gesture', { type: 'swipe_right' })}
              >
                <div className="card-glass" style={{ padding: 'var(--space-lg)' }}>
                  <h3 className="heading-secondary">Gesture-Enabled Content</h3>
                  <p className="text-executive">
                    This area supports touch gestures. Try swiping left or right on mobile devices.
                  </p>

                  <Tooltip content="This demonstrates the advanced tooltip system" position="top">
                    <span className="text-leadership">Hover for tooltip</span>
                  </Tooltip>
                </div>
              </GestureHandler>
            </div>

            <div>
              <ScrollReveal direction="right" delay={200}>
                <div className="space-y-component">
                  <ProgressiveDisclosure
                    summary="Advanced Features Overview"
                    icon="▶"
                  >
                    <p>
                      Phase 5 includes cursor-following effects, parallax scrolling,
                      interactive data visualizations, gesture support, contextual tooltips,
                      and progressive disclosure patterns.
                    </p>
                  </ProgressiveDisclosure>

                  <ProgressiveDisclosure
                    summary="Content Enhancement Systems"
                    icon="▶"
                  >
                    <p>
                      Dynamic content loading, advanced search functionality,
                      content recommendation engine, multilingual support,
                      analytics tracking, and A/B testing framework.
                    </p>
                  </ProgressiveDisclosure>

                  <ProgressiveDisclosure
                    summary="Performance & Analytics"
                    icon="▶"
                  >
                    <p>
                      Real-time performance monitoring, Core Web Vitals tracking,
                      user behavior analytics, and comprehensive A/B testing capabilities.
                    </p>
                  </ProgressiveDisclosure>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Multilingual Support and Dynamic Content */}
      <section className="section-fullwidth" style={{ background: 'var(--color-primary-50)' }}>
        <div className="container-executive">
          <div className="layout-asymmetric-secondary">
            <div>
              <ScrollReveal direction="left">
                <h2 className="heading-primary">Global Experience</h2>
                <p className="text-executive">
                  International-ready with multilingual support and dynamic content systems.
                </p>

                <div style={{ marginTop: 'var(--space-lg)' }}>
                  <LanguageSwitcher
                    currentLanguage={currentLanguage}
                    onLanguageChange={setCurrentLanguage}
                    languages={[
                      { code: 'en', name: 'English', flag: '🇺🇸' },
                      { code: 'es', name: 'Español', flag: '🇪🇸' },
                      { code: 'fr', name: 'Français', flag: '🇫🇷' },
                      { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
                    ]}
                  />
                </div>

                <div style={{ marginTop: 'var(--space-md)' }}>
                  <p className="text-leadership">
                    Current: {translationLoading ? 'Loading...' : t('welcome', 'Welcome')}
                  </p>
                </div>
              </ScrollReveal>
            </div>

            <div>
              <ScrollReveal direction="right" delay={200}>
                <div className="card-executive" style={{ padding: 'var(--space-lg)' }}>
                  <h3 className="heading-secondary">Dynamic Content Loading</h3>

                  <DynamicContentLoader
                    loadFunction={loadDynamicContent}
                    fallback={
                      <div className="content-loading">
                        <div>⏳ Loading advanced content...</div>
                      </div>
                    }
                    errorFallback={
                      <div className="content-error">
                        Failed to load content. Please try again.
                      </div>
                    }
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Showcase */}
      <section className="section-fullwidth">
        <div className="container-executive">
          <ScrollReveal direction="up">
            <div className="text-center">
              <h2 className="heading-primary">Performance Excellence</h2>
              <p className="text-executive">
                Real-time performance monitoring and analytics integration demonstrate
                the technical excellence of Phase 5 implementations.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid-leadership" style={{ marginTop: 'var(--space-xl)' }}>
            <ScrollReveal direction="up" delay={100}>
              <div className="card-glass" style={{ padding: 'var(--space-lg)', textAlign: 'center' }}>
                <h3 className="heading-secondary">Core Web Vitals</h3>
                <p className="text-executive">
                  Automated tracking of LCP, FID, and CLS metrics
                </p>
                <div className="metric-value">
                  <span className="metric-number">2.1s</span>
                  <span className="metric-label">LCP Target</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={200}>
              <div className="card-glass" style={{ padding: 'var(--space-lg)', textAlign: 'center' }}>
                <h3 className="heading-secondary">User Analytics</h3>
                <p className="text-executive">
                  Comprehensive user behavior tracking and insights
                </p>
                <div className="metric-value">
                  <span className="metric-number">95%</span>
                  <span className="metric-label">Engagement</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={300}>
              <div className="card-glass" style={{ padding: 'var(--space-lg)', textAlign: 'center' }}>
                <h3 className="heading-secondary">A/B Testing</h3>
                <p className="text-executive">
                  Data-driven optimization with automated testing
                </p>
                <div className="metric-value">
                  <span className="metric-number">15%</span>
                  <span className="metric-label">Lift Average</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Call to Action with Advanced Interactions */}
      <section className="section-fullwidth" style={{ background: 'var(--gradient-executive)' }}>
        <div className="container-executive">
          <div className="text-center" style={{ padding: 'var(--space-xl) 0' }}>
            <CursorFollower intensity={0.05}>
              <ScrollReveal direction="up">
                <h2 className="heading-primary" style={{ color: 'white' }}>
                  Phase 5: Complete
                </h2>
                <p className="text-executive" style={{ color: 'var(--color-primary-100)' }}>
                  Advanced features and polish have been successfully implemented with
                  world-class interactions, content systems, and performance monitoring.
                </p>
              </ScrollReveal>
            </CursorFollower>

            <div style={{ marginTop: 'var(--space-lg)' }}>
              <ScrollReveal direction="up" delay={300}>
                <MagneticHover strength={0.3}>
                  <button
                    className="btn-glass"
                    onClick={() => {
                      trackEvent('phase5_complete', { feature: 'showcase' });
                      trackConversion('final-cta');
                    }}
                  >
                    <Tooltip content="Track this interaction with advanced analytics">
                      Explore Full Portfolio
                    </Tooltip>
                  </button>
                </MagneticHover>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Phase5Showcase;