'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/ui/Layout';
import { trackEvent } from '@/lib/analytics';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  MessageSquare,
  Globe,
  Users,
  TrendingUp,
  Zap,
  Target,
  Award,
  Briefcase,
  Code,
  Database,
  Cloud,
  Sun,
  Moon
} from 'lucide-react';

export default function Homepage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Handle mouse movement for subtle background effects
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    // Check current theme
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = stored === 'dark' || (!stored && prefersDark);
    setIsDark(shouldBeDark);

    // Add mouse move listener
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
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

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newTheme);
  };

  return (
    <Layout padding={false} showNavigation={true} showFooter={true}>
      {/* Hero Section */}
      <section className="hero-fullwidth">
        {/* Background with subtle effects */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900" />

          {/* Floating elements */}
          <motion.div
            className="absolute top-1/4 left-1/6 w-64 h-64 bg-blue-200/20 dark:bg-blue-400/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-3/4 right-1/6 w-48 h-48 bg-indigo-200/20 dark:bg-indigo-400/10 rounded-full blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto text-center">
            {/* Status Badge */}
            <motion.div
              className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-medium mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Globe className="w-4 h-4" />
              Head of Customer Success & Technical Architecture
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="heading-display mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Technology Executive Leading International Operations
            </motion.h1>

            {/* Executive Summary */}
            <motion.p
              className="text-executive mx-auto mb-8 max-w-4xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Leading customer success operations and technical architecture across 7 countries at Yellow Pages Group.
              Managing 12 direct reports while delivering measurable business outcomes including 40% customer satisfaction improvement,
              78% deployment error reduction, and 23% upsell revenue growth.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link
                href="/contact"
                className="btn-executive"
              >
                Schedule Executive Consultation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>

              <Link
                href="/projects"
                className="btn-secondary"
              >
                View Technical Portfolio
                <Briefcase className="w-4 h-4 ml-2" />
              </Link>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="theme-toggle"
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
                title={`Current theme: ${isDark ? 'Dark' : 'Light'}. Click to switch.`}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </motion.div>

            {/* Executive Image */}
            <motion.div
              className="relative mx-auto w-32 h-32 mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Image
                src="/walter-okumu.webp"
                alt="Walter Okumu Oriaro - Technology Executive"
                fill
                className="rounded-full object-cover shadow-2xl border-4 border-white dark:border-gray-800"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Metrics Section */}
      <section className="section-executive">
        <div className="section-content">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-primary mb-4">
              Measurable Impact & Leadership
            </h2>
            <p className="text-executive max-w-3xl mx-auto">
              Driving transformation through data-driven leadership and technical excellence
            </p>
          </motion.div>

          <div className="grid-metrics">
            {/* Direct Reports */}
            <motion.div
              className="card-metric"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="metric-value">12</div>
              <div className="metric-label">Direct Reports</div>
              <div className="metric-description">
                Leading global teams across 7 countries
              </div>
              <Users className="w-8 h-8 text-blue-500 mx-auto mt-4" />
            </motion.div>

            {/* Customer Satisfaction */}
            <motion.div
              className="card-metric"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="metric-value">40%</div>
              <div className="metric-label">Satisfaction Growth</div>
              <div className="metric-description">
                Customer satisfaction improvement
              </div>
              <TrendingUp className="w-8 h-8 text-green-500 mx-auto mt-4" />
            </motion.div>

            {/* Error Reduction */}
            <motion.div
              className="card-metric"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="metric-value">78%</div>
              <div className="metric-label">Error Reduction</div>
              <div className="metric-description">
                Deployment error reduction
              </div>
              <Zap className="w-8 h-8 text-yellow-500 mx-auto mt-4" />
            </motion.div>

            {/* System Uptime */}
            <motion.div
              className="card-metric"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="metric-value">99.8%</div>
              <div className="metric-label">System Uptime</div>
              <div className="metric-description">
                Technical infrastructure reliability
              </div>
              <Award className="w-8 h-8 text-purple-500 mx-auto mt-4" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dual Expertise Section */}
      <section className="section-executive">
        <div className="section-content">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-primary mb-4">
              Technical Architecture + Customer Success Leadership
            </h2>
            <p className="text-executive max-w-3xl mx-auto">
              Bridging technical excellence with customer-centric leadership to drive business transformation
            </p>
          </motion.div>

          <div className="grid-leadership">
            {/* Technical Architecture */}
            <motion.div
              className="card-executive"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Code className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="heading-tertiary">Technical Architecture</h3>
              </div>

              <p className="text-executive mb-6">
                Leading technical infrastructure and API architecture across international markets,
                ensuring scalability, performance, and reliability for 5M+ users.
              </p>

              <div className="space-y-3">
                <h4 className="text-leadership mb-3">Core Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {['React.js', 'Next.js', 'Node.js', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'CI/CD', 'API Design', 'Performance'].map((tech, index) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Customer Success Leadership */}
            <motion.div
              className="card-executive"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="heading-tertiary">Customer Success Leadership</h3>
              </div>

              <p className="text-executive mb-6">
                Managing international customer success operations, process optimization,
                and team development across diverse markets and cultures.
              </p>

              <div className="space-y-3">
                <h4 className="text-leadership mb-3">Leadership Areas</h4>
                <div className="flex flex-wrap gap-2">
                  {['Team Management', 'Process Design', 'Analytics', 'International Operations', 'Revenue Growth', 'Customer Experience'].map((area, index) => (
                    <span
                      key={area}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="section-executive">
        <div className="section-content">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-primary mb-4">
              Featured Technical & Leadership Projects
            </h2>
            <p className="text-executive max-w-3xl mx-auto">
              Delivering measurable business outcomes through technical excellence and strategic leadership
            </p>
          </motion.div>

          <div className="grid-executive">
            {/* Project 1: Customer Success Platform */}
            <motion.div
              className="card-executive"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="heading-tertiary">Customer Success Platform</h3>
              </div>

              <div className="text-center mb-4">
                <div className="metric-value text-2xl">40%</div>
                <div className="metric-label">Satisfaction Growth</div>
              </div>

              <p className="text-executive mb-6">
                Designed and implemented comprehensive customer success platform integrating analytics,
                automation, and team collaboration tools across international markets.
              </p>

              <div className="flex flex-wrap gap-2">
                {['React.js', 'Node.js', 'PostgreSQL', 'Analytics', 'Automation', 'International'].map((tech, index) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Project 2: DevOps Transformation */}
            <motion.div
              className="card-executive"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="heading-tertiary">DevOps Transformation</h3>
              </div>

              <div className="text-center mb-4">
                <div className="metric-value text-2xl">78%</div>
                <div className="metric-label">Error Reduction</div>
              </div>

              <p className="text-executive mb-6">
                Led comprehensive DevOps transformation implementing CI/CD pipelines,
                automated testing, and monitoring systems across global infrastructure.
              </p>

              <div className="flex flex-wrap gap-2">
                {['Docker', 'CI/CD', 'AWS', 'Monitoring', 'Automation', 'Testing'].map((tech, index) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Project 3: International Platform Migration */}
            <motion.div
              className="card-executive"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="heading-tertiary">International Platform Migration</h3>
              </div>

              <div className="text-center mb-4">
                <div className="metric-value text-2xl">7</div>
                <div className="metric-label">Countries Served</div>
              </div>

              <p className="text-executive mb-6">
                Successfully migrated legacy Drupal platform to modern React.js/Next.js architecture
                across 7 countries, solving complex SEO and performance challenges.
              </p>

              <div className="flex flex-wrap gap-2">
                {['Migration', 'React.js', 'Next.js', 'SEO', 'International'].map((tech, index) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="section-executive">
        <div className="section-content">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-primary mb-6">
              Ready to Transform Your Technology Operations?
            </h2>
            <p className="text-executive max-w-2xl mx-auto mb-8">
              Let&apos;s discuss how my experience in leading international teams and technical architecture
              can help drive measurable business outcomes for your organization.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="btn-executive"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Schedule Executive Consultation
              </Link>

              <Link
                href="/projects"
                className="btn-secondary"
              >
                <Briefcase className="w-4 h-4 mr-2" />
                View Full Portfolio
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
