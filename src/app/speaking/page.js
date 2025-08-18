'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, Clock, Mail, Bell, Sparkles,
  Mic, Users, Globe, ArrowRight, Star,
  CheckCircle, Play, MapPin, Award
} from 'lucide-react';
import Layout from '@/components/ui/Layout';
import Button from '@/components/ui/Button';
import {
  MotionDiv,
  StaggerContainer,
  StaggerItem,
  FloatingElement,
  animationVariants
} from '@/components/ui/motion/AnimationComponents';

// Metadata is handled by the Layout component for client components

export default function Speaking() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Countdown to launch date (example: 3 months from now)
  useEffect(() => {
    const targetDate = new Date();
    targetDate.setMonth(targetDate.getMonth() + 3);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Mouse tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / window.innerWidth,
        y: (e.clientY - window.innerHeight / 2) / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <Layout padding={false}>
      {/* Hero Section - Coming Soon */}
      <section className="section-hero relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/90 dark:via-purple-950/90 dark:to-pink-950/90"
            style={{
              transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`
            }}
          />

          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <FloatingElement
              className="absolute top-1/4 left-1/4 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl"
              amplitude={40}
              duration={6}
            />
            <FloatingElement
              className="absolute top-3/4 right-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"
              amplitude={35}
              duration={7}
            />
            <FloatingElement
              className="absolute top-1/2 right-1/3 w-24 h-24 bg-pink-500/10 rounded-full blur-2xl"
              amplitude={30}
              duration={5}
            />
          </div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3csvg%20width%3d%2260%22%20height%3d%2260%22%20xmlns%3d%22http://www.w3.org/2000/svg%22%3e%3cdefs%3e%3cpattern%20id%3d%22grid%22%20width%3d%2260%22%20height%3d%2260%22%20patternUnits%3d%22userSpaceOnUse%22%3e%3cpath%20d%3d%22M%2060%200%20L%200%200%200%2060%22%20fill%3d%22none%22%20stroke%3d%22%23e2e8f0%22%20stroke-width%3d%221%22%20opacity%3d%220.2%22/%3e%3c/pattern%3e%3c/defs%3e%3crect%20width%3d%22100%25%22%20height%3d%22100%25%22%20fill%3d%22url(%23grid)%22/%3e%3c/svg%3e')] opacity-30 dark:opacity-10" />
        </div>

        <div className="relative container-standard z-10">
          <MotionDiv
            className="text-center space-y-8 max-w-5xl mx-auto"
            variants={animationVariants.fadeInUp}
            initial="initial"
            animate="animate"
          >
            {/* Coming Soon Badge */}
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-semibold border border-indigo-200/50 dark:border-indigo-800/50 backdrop-blur-sm"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Sparkles className="w-5 h-5 animate-pulse" />
              Revolutionary Speaking Platform Coming Soon
              <Sparkles className="w-5 h-5 animate-pulse" />
            </motion.div>

            {/* Main Heading */}
            <motion.div
              className="space-y-6"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Speaking Excellence
                </span>
                <br />
                <span className="text-gray-700 dark:text-gray-300">
                  Redefined
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
                Get ready for an immersive speaking platform featuring cutting-edge insights on
                <span className="font-semibold text-indigo-600 dark:text-indigo-400"> technical leadership</span>,
                <span className="font-semibold text-purple-600 dark:text-purple-400"> customer success</span>, and
                <span className="font-semibold text-pink-600 dark:text-pink-400"> international team management</span>.
              </p>
            </motion.div>

            {/* Countdown Timer */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {Object.entries(timeLeft).map(([unit, value], index) => (
                <motion.div
                  key={unit}
                  className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent"
                    key={value}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {value.toString().padStart(2, '0')}
                  </motion.div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    {unit}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </MotionDiv>
        </div>
      </section>

      {/* Preview Stats */}
      <section className="section-primary bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="container-standard">
          <StaggerContainer className="text-center mb-16">
            <StaggerItem>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                What&apos;s Coming
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                A comprehensive speaking platform built on years of international leadership experience
              </p>
            </StaggerItem>
          </StaggerContainer>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Mic,
                number: '25+',
                label: 'Speaking Topics',
                description: 'Curated presentations',
                color: 'indigo'
              },
              {
                icon: Globe,
                number: '7',
                label: 'Countries',
                description: 'International experience',
                color: 'purple'
              },
              {
                icon: Users,
                number: '5K+',
                label: 'Expected Audience',
                description: 'Global reach',
                color: 'pink'
              },
              {
                icon: Award,
                number: '12+',
                label: 'Years Experience',
                description: 'Leadership expertise',
                color: 'emerald'
              }
            ].map((stat, index) => (
              <StaggerItem key={index}>
                <motion.div
                  className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-lg text-center group"
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-${stat.color}-100 to-${stat.color}-200 dark:from-${stat.color}-900/30 dark:to-${stat.color}-800/30 mb-6`}
                    whileHover={{ rotate: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <stat.icon className={`w-8 h-8 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                  </motion.div>
                  <div className={`text-4xl font-bold text-${stat.color}-600 dark:text-${stat.color}-400 mb-2`}>
                    {stat.number}
                  </div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.description}
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Email Subscription */}
      <section className="section-primary bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <FloatingElement
          className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"
          amplitude={20}
          duration={8}
        />
        <FloatingElement
          className="absolute bottom-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-xl"
          amplitude={25}
          duration={6}
        />

        <div className="container-standard relative z-10">
          <MotionDiv
            className="text-center max-w-3xl mx-auto"
            variants={animationVariants.fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center gap-2 mb-6"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <Bell className="w-6 h-6 animate-bounce" />
              <span className="text-lg font-semibold">Be the First to Know</span>
            </motion.div>

            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Join the VIP List
            </h2>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              Get exclusive early access to speaking schedules, presentation materials, and
              behind-the-scenes insights from international leadership experiences.
            </p>

            <motion.form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <motion.input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30"
                required
                whileFocus={{ scale: 1.02 }}
              />
              <motion.button
                type="submit"
                className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2 justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-5 h-5" />
                Subscribe
              </motion.button>
            </motion.form>

            <AnimatePresence>
              {isSubscribed && (
                <motion.div
                  className="flex items-center justify-center gap-2 text-green-300 font-semibold"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <CheckCircle className="w-5 h-5" />
                  Welcome to the VIP list!
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-wrap justify-center gap-6 text-sm opacity-80">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Early Access
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Exclusive Content
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                No Spam
              </span>
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* Feature Preview */}
      <section className="section-primary bg-gray-50 dark:bg-gray-900">
        <div className="container-standard">
          <StaggerContainer className="text-center mb-16">
            <StaggerItem>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Platform Features Preview
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Revolutionary features designed for modern thought leadership and audience engagement
              </p>
            </StaggerItem>
          </StaggerContainer>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Play,
                title: 'Interactive Presentations',
                description: 'Immersive speaking experiences with real-time audience engagement and Q&A integration.',
                color: 'blue'
              },
              {
                icon: Calendar,
                title: 'Smart Scheduling',
                description: 'Advanced speaking calendar that automatically coordinates across multiple time zones.',
                color: 'emerald'
              },
              {
                icon: Globe,
                title: 'Global Reach',
                description: 'Multi-language support and cultural adaptation for international audience connection.',
                color: 'purple'
              },
              {
                icon: Users,
                title: 'Community Building',
                description: 'Network with fellow leaders and build lasting professional relationships.',
                color: 'orange'
              },
              {
                icon: Star,
                title: 'Premium Content',
                description: 'Exclusive insights from 7+ years of international team management experience.',
                color: 'yellow'
              },
              {
                icon: MapPin,
                title: 'Event Integration',
                description: 'Seamless integration with major conference platforms and speaking venues.',
                color: 'pink'
              }
            ].map((feature, index) => (
              <StaggerItem key={index}>
                <motion.div
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 h-full"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-${feature.color}-100 dark:bg-${feature.color}-900/30 mb-6`}
                    whileHover={{ rotate: 10 }}
                  >
                    <feature.icon className={`w-7 h-7 text-${feature.color}-600 dark:text-${feature.color}-400`} />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-primary bg-white dark:bg-gray-900">
        <div className="container-standard text-center">
          <MotionDiv
            className="max-w-3xl mx-auto space-y-8"
            variants={animationVariants.fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100">
              Ready to Transform Your Speaking Experience?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Join thousands of professionals waiting for the future of thought leadership and speaking excellence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  href="/contact"
                  size="lg"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule Early Access
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  href="/projects"
                  variant="outline"
                  size="lg"
                  className="border-2"
                >
                  View Current Work
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            </div>
          </MotionDiv>
        </div>
      </section>
    </Layout>
  );
}