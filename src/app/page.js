'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/ui/Layout';
import { trackEvent } from '@/lib/analytics';
import Link from 'next/link';
import { 
  ArrowRight, 
  MessageSquare, 
  Globe, 
  Users, 
  TrendingUp, 
  Zap, 
  Target,
  Award
} from 'lucide-react';

export default function Homepage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    const cleanupTime = window.requestIdleCallback?.(() => {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    });

    return () => {
      if (cleanupTime) cleanupTime();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Track page view for analytics
  useEffect(() => {
    trackEvent('page_view', {
      page_title: 'Executive Portfolio Homepage',
      page_location: '/',
      user_engagement: 'homepage_visit'
    });
  }, []);

  return (
    <Layout padding={false} showNavigation={true} showFooter={true}>
      {/* Revolutionary Full-Width Hero Section */}
      <section className="hero-fullwidth">
        {/* Executive Background System */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Sophisticated animated gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-color-primary-50/30 via-color-primary-100/20 to-color-neutral-100/30 dark:from-color-primary-950/20 dark:via-color-primary-900/15 dark:to-color-neutral-950/20"
            style={{
              transform: `translate(${mousePosition.x * 3}px, ${mousePosition.y * 3}px)`
            }}
          />

          {/* Floating executive elements */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-1/4 left-1/6 w-64 h-64 bg-gradient-executive opacity-5 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.05, 0.08, 0.05]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute top-3/4 right-1/6 w-48 h-48 bg-color-success-500/5 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.05, 0.1, 0.05]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
          </div>

          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-20 dark:opacity-10" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-neutral-400) 1px, transparent 0)`,
            backgroundSize: '60px 60px'
          }} />
        </div>

        {/* Hero Content - Asymmetric Golden Ratio Layout */}
        <div className="hero-asymmetric">
          {/* Primary Content Area (Golden Ratio: 1.618fr) */}
          <div className="space-y-executive">
            {/* Executive Status Badge */}
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 card-glass rounded-full border border-primary-200/20 shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-3 h-3 bg-success-500 rounded-full animate-pulse" />
              <span className="text-leadership text-primary-700 dark:text-primary-300">
                Leading 12 Teams Across 7 Countries
              </span>
            </motion.div>

            {/* Executive Heading System */}
            <motion.div
              className="space-y-component"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h1 className="heading-display">
                Walter Okumu Oriaro
              </h1>

              <h2 className="heading-primary">
                Head of Customer Success & Technical Architecture
              </h2>
            </motion.div>

            {/* Executive Summary */}
            <motion.div
              className="space-y-leadership"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <p className="text-executive">
                <strong className="font-semibold text-primary-900 dark:text-primary-100">Dual-mandate technology executive</strong> combining
                hands-on technical architecture with international customer success leadership.
                Currently architecting scalable solutions while managing distributed teams across 7 countries,
                delivering measurable business impact through technical excellence and strategic thinking.
              </p>
            </motion.div>

            {/* Executive Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-md pt-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Link
                href="/contact"
                className="btn-executive focus-ring magnetic-element group inline-flex items-center gap-sm px-xl py-lg text-lg font-semibold shadow-xl"
                onClick={() => trackEvent('cta_click', { location: 'hero', label: 'Schedule Executive Consultation' })}
              >
                <MessageSquare className="w-icon-sm h-icon-sm transition-transform duration-200 group-hover:scale-105" />
                Schedule Executive Consultation
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ArrowRight className="w-icon-sm h-icon-sm" />
                </motion.span>
              </Link>

              <Link
                href="/projects"
                className="btn-glass focus-ring magnetic-element group inline-flex items-center gap-sm px-xl py-lg text-lg font-medium"
                onClick={() => trackEvent('cta_click', { location: 'hero', label: 'AI Portfolio' })}
              >
                <Target className="w-icon-sm h-icon-sm transition-transform duration-200 group-hover:scale-105" />
                AI Portfolio
              </Link>
            </motion.div>
          </div>

          {/* Secondary Content Area - Impact Metrics */}
          <motion.div
            className="grid grid-cols-2 gap-md"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <div className="card-executive card-metric interactive-element">
              <div className="text-6xl mb-sm">👥</div>
              <div className="metric-value">12</div>
              <div className="metric-label">Direct Reports</div>
              <div className="metric-description">International team leadership across multiple time zones</div>
            </div>

            <div className="card-executive card-metric interactive-element">
              <div className="text-6xl mb-sm">🌍</div>
              <div className="metric-value">7</div>
              <div className="metric-label">Countries</div>
              <div className="metric-description">Global operational presence and market expertise</div>
            </div>

            <div className="card-executive card-metric interactive-element">
              <div className="text-6xl mb-sm">📈</div>
              <div className="metric-value">40%</div>
              <div className="metric-label">CS Growth</div>
              <div className="metric-description">Customer satisfaction improvement through strategic initiatives</div>
            </div>

            <div className="card-executive card-metric interactive-element">
              <div className="text-6xl mb-sm">🚀</div>
              <div className="metric-value">78%</div>
              <div className="metric-label">Error Reduction</div>
              <div className="metric-description">Deployment efficiency through architectural excellence</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Executive Impact Showcase */}
      <section className="section-executive">
        <div className="section-content py-3xl">
          <motion.div
            className="text-center space-y-lg mb-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-primary">Executive Impact Portfolio</h2>
            <p className="text-executive mx-auto">
              Quantified results from leading international technology teams and driving customer success initiatives across diverse markets and cultures.
            </p>
          </motion.div>

          {/* AI-Powered Metrics Grid */}
          <div className="grid-executive">
            <motion.div
              className="card-glass card-metric magnetic-element"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Zap className="w-icon-lg h-icon-lg text-color-primary-600 dark:text-color-primary-400 mb-md" />
              <div className="metric-value">95%</div>
              <div className="metric-label">AI Team Efficiency</div>
              <div className="metric-description">ML-driven productivity optimization across international teams</div>
            </motion.div>

            <motion.div
              className="card-glass card-metric magnetic-element"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <TrendingUp className="w-icon-lg h-icon-lg text-color-success-600 dark:text-color-success-400 mb-md" />
              <div className="metric-value">$2.3M</div>
              <div className="metric-label">AI Revenue Impact</div>
              <div className="metric-description">Incremental revenue through AI-powered process optimization</div>
            </motion.div>

            <motion.div
              className="card-glass card-metric magnetic-element"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Target className="w-icon-lg h-icon-lg text-color-warning-600 dark:text-color-warning-400 mb-md" />
              <div className="metric-value">99.2%</div>
              <div className="metric-label">ML System Uptime</div>
              <div className="metric-description">AI-powered system reliability across all managed platforms</div>
            </motion.div>

            <motion.div
              className="card-glass card-metric magnetic-element"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Award className="w-icon-lg h-icon-lg text-color-error-600 dark:text-color-error-400 mb-md" />
              <div className="metric-value">15+</div>
              <div className="metric-label">AI Projects</div>
              <div className="metric-description">Successfully delivered enterprise AI/ML solutions</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Leadership Dual Expertise */}
      <section className="section-executive">
        <div className="section-content">
          <motion.div
            className="text-center space-y-lg mb-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-primary text-text-primary-on-light dark:text-text-primary-on-dark">AI Technical Leadership + Customer Success</h2>
            <p className="text-executive text-text-secondary-on-light dark:text-text-secondary-on-dark mx-auto max-w-prose">
              Unique combination of deep AI/ML technical architecture expertise and proven international customer success leadership,
              bridging the gap between artificial intelligence technical excellence and measurable business outcomes.
            </p>
          </motion.div>

          <div className="layout-asymmetric-primary">
            {/* AI Technical Architecture (Primary) */}
            <motion.div
              className="card-executive p-xl space-y-lg magnetic-element"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-md mb-lg">
                <div className="w-icon-xl h-icon-xl bg-gradient-executive rounded-xl flex items-center justify-center text-white shadow-lg">
                  🤖
                </div>
                <h3 className="heading-secondary text-text-primary-on-light dark:text-text-primary-on-dark mb-0">AI Technical Architecture</h3>
              </div>

              <div className="space-y-md">
                <div className="text-executive text-text-secondary-on-light dark:text-text-secondary-on-dark">
                  Leading the design and implementation of AI-powered scalable solutions that serve millions of users
                  across multiple countries, with focus on machine learning performance, reliability, and maintainability.
                </div>

                <div className="space-y-sm">
                  <h4 className="text-leadership text-text-primary-on-light dark:text-text-primary-on-dark">AI & Core Technologies</h4>
                  <div className="flex flex-wrap gap-sm">
                    {['Python/TensorFlow', 'AWS SageMaker', 'React.js', 'Next.js', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'PostgreSQL', 'MongoDB'].map((tech) => (
                      <span key={tech} className="px-sm py-xs bg-color-primary-100 dark:bg-color-primary-900/30 text-color-primary-800 dark:text-color-primary-300 rounded-lg text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* AI Customer Success (Secondary) */}
            <motion.div
              className="card-executive p-xl space-y-lg magnetic-element"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-md mb-lg">
                <div className="w-icon-xl h-icon-xl bg-gradient-success rounded-xl flex items-center justify-center text-white shadow-lg">
                  📈
                </div>
                <h3 className="heading-secondary text-text-primary-on-light dark:text-text-primary-on-dark mb-0">AI Customer Success</h3>
              </div>

              <div className="space-y-md">
                <div className="text-executive text-text-secondary-on-light dark:text-text-secondary-on-dark">
                  AI-powered customer success leadership leveraging machine learning for predictive analytics and automated intervention systems, delivering measurable business outcomes through strategic team development and process optimization across international markets.
                </div>

                <div className="space-y-sm">
                  <h4 className="text-leadership text-text-primary-on-light dark:text-text-primary-on-dark">AI Leadership Areas</h4>
                  <div className="flex flex-wrap gap-sm">
                    {['AI Strategy', 'Predictive Analytics', 'International AI Teams', 'ML Operations', 'AI Governance', 'Data-Driven Growth'].map((area) => (
                      <span key={area} className="px-sm py-xs bg-color-success-100 dark:bg-color-success-900/30 text-color-success-800 dark:text-color-success-300 rounded-lg text-sm font-medium">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Projects - Full Width Showcase */}
      <section className="section-fullwidth section-executive">
        <div className="section-content">
          <motion.div
            className="text-center space-y-lg mb-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-primary">Featured Technical Achievements</h2>
            <p className="text-executive mx-auto">
              Showcase of technical architecture projects and customer success initiatives that demonstrate
              executive-level strategic thinking combined with hands-on implementation expertise.
            </p>
          </motion.div>

          <div className="grid-leadership">
            {/* Multi-Country CI/CD Pipeline */}
            <motion.div
              className="card-glass p-xl space-y-lg relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

              <div className="flex items-start gap-lg">
                <div className="text-5xl">🚀</div>
                <div className="flex-1">
                  <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-sm">78%</div>
                  <h3 className="heading-secondary mb-sm">Error Reduction</h3>
                  <p className="text-executive">
                    Designed and implemented automated deployment infrastructure reducing deployment errors by 78%
                    across 7 countries, serving 5M+ monthly visitors.
                  </p>

                  <div className="flex flex-wrap gap-xs mt-md">
                    {['DevOps', 'AWS', 'Docker', 'CI/CD', 'Monitoring'].map((tech) => (
                      <span key={tech} className="px-xs py-2xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Customer Success Program */}
            <motion.div
              className="card-glass p-xl space-y-lg relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-green-600"></div>

              <div className="flex items-start gap-lg">
                <div className="text-5xl">📈</div>
                <div className="flex-1">
                  <div className="text-4xl font-bold text-success-600 dark:text-success-400 mb-sm">40%</div>
                  <h3 className="heading-secondary mb-sm">Satisfaction Growth</h3>
                  <p className="text-executive">
                    Developed and executed customer success strategy increasing satisfaction by 40%
                    while managing international teams across multiple time zones.
                  </p>

                  <div className="flex flex-wrap gap-xs mt-md">
                    {['Leadership', 'Strategy', 'Analytics', 'Process Design', 'Team Management'].map((skill) => (
                      <span key={skill} className="px-xs py-2xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* AI-Powered International Platform */}
            <motion.div
              className="card-glass p-xl space-y-lg relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-600"></div>

              <div className="flex items-start gap-lg">
                <div className="text-5xl">🤖</div>
                <div className="flex-1">
                  <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-sm">$2.3M</div>
                  <h3 className="heading-secondary mb-sm">AI Revenue Impact</h3>
                  <p className="text-executive">
                    Leading AI-powered digital transformation of international business directory network, implementing machine learning algorithms for customer behavior prediction across 7 countries.
                  </p>

                  <div className="flex flex-wrap gap-xs mt-md">
                    {['Machine Learning', 'Predictive Analytics', 'International AI', 'Behavioral Models', 'Revenue Growth'].map((aspect) => (
                      <span key={aspect} className="px-xs py-2xs bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded text-xs">
                        {aspect}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Executive Credibility Signals - NEW SECTION */}
      <section className="section-fullwidth section-executive">
        <div className="section-content">
          <motion.div
            className="text-center space-y-lg mb-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-primary">Trusted by International Organizations</h2>
            <p className="text-executive mx-auto">
              Recognized expertise in executive technology leadership and international team management
            </p>
          </motion.div>

          <div className="grid-executive">
            <motion.div
              className="card-glass p-xl text-center space-y-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl mb-md">🏆</div>
              <div className="space-y-sm">
                <h3 className="heading-secondary text-primary">Executive Recognition</h3>
                <p className="text-executive text-center">
                  Leading digital transformation initiatives across 7 countries with measurable business impact and team development success.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="card-glass p-xl text-center space-y-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl mb-md">🤝</div>
              <div className="space-y-sm">
                <h3 className="heading-secondary text-primary">Client Success Stories</h3>
                <p className="text-executive text-center">
                  Consistently delivering 40%+ improvements in customer satisfaction while reducing operational costs and deployment errors.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="card-glass p-xl text-center space-y-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl mb-md">🌟</div>
              <div className="space-y-sm">
                <h3 className="heading-secondary text-primary">Industry Impact</h3>
                <p className="text-executive text-center">
                  Featured expertise in international team leadership, technical architecture, and digital transformation across multiple industries.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Call to Action - Full Width Executive */}
      <section className="section-fullwidth" style={{ background: 'var(--gradient-executive)' }}>
        <div className="section-content text-center py-3xl">
          <motion.div
            className="space-y-executive text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="max-w-4xl mx-auto">
              <h2 className="heading-primary text-white mb-lg">Ready to Drive Technical Excellence?</h2>
              <p className="text-executive text-white/90 mx-auto mb-lg">
                Looking for executive leadership that bridges technical architecture with customer success?
                Let&apos;s discuss how I can contribute to your organization&apos;s growth and technical excellence.
              </p>

              {/* Executive Value Props */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-lg mb-2xl text-center">
                <div className="space-y-sm">
                  <div className="text-3xl">⚡</div>
                  <p className="text-white/90 font-medium">24-Hour Response</p>
                  <p className="text-white/70 text-sm">for executive inquiries</p>
                </div>
                <div className="space-y-sm">
                  <div className="text-3xl">🌍</div>
                  <p className="text-white/90 font-medium">Global Experience</p>
                  <p className="text-white/70 text-sm">across 7 countries</p>
                </div>
                <div className="space-y-sm">
                  <div className="text-3xl">📈</div>
                  <p className="text-white/90 font-medium">Proven Results</p>
                  <p className="text-white/70 text-sm">measurable business impact</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-lg justify-center pt-lg">
              <Link
                href="/contact"
                className="bg-white text-color-primary-900 hover:bg-white/90 focus-ring magnetic-element group inline-flex items-center gap-sm px-xl py-lg text-lg font-semibold shadow-xl"
                onClick={() => trackEvent('cta_click', { location: 'cta', label: 'Executive Consultation' })}
              >
                <MessageSquare className="w-icon-sm h-icon-sm transition-transform duration-200 group-hover:scale-105" />
                Schedule Executive Consultation
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ArrowRight className="w-icon-sm h-icon-sm" />
                </motion.span>
              </Link>

              <Link
                href="/projects"
                className="bg-white/10 text-white border border-white/20 hover:bg-white/20 focus-ring magnetic-element group inline-flex items-center gap-sm px-xl py-lg text-lg font-medium"
                onClick={() => trackEvent('cta_click', { location: 'cta', label: 'View Portfolio' })}
              >
                <Target className="w-icon-sm h-icon-sm transition-transform duration-200 group-hover:scale-105" />
                View Complete Portfolio
              </Link>
            </div>

            {/* Trust Signals */}
            <div className="pt-2xl border-t border-white/20 mt-2xl">
              <p className="text-white/60 text-sm">
                ✓ Confidential Executive Consultations  ✓ 12+ Direct Reports Experience  ✓ International Operations Expertise
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
