'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search, Mail } from 'lucide-react';
import Layout from '@/components/ui/Layout';
import Button from '@/components/ui/Button';

export default function NotFound() {
  const navigationSuggestions = [
    { name: 'Home', href: '/', description: 'Return to homepage', icon: Home },
    { name: 'About', href: '/about', description: 'Learn about Walter', icon: ArrowLeft },
    { name: 'Projects', href: '/projects', description: 'View portfolio work', icon: Search },
    { name: 'Contact', href: '/contact', description: 'Get in touch', icon: Mail },
  ];

  return (
    <Layout className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-primary-50 dark:from-neutral-900 dark:to-primary-950">
      <div className="text-center px-6 py-12 max-w-2xl mx-auto">
        {/* Animated 404 */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-8"
        >
          <h1 className="text-8xl md:text-9xl font-bold text-primary-600 dark:text-primary-400 mb-4">
            404
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="h-2 bg-gradient-to-r from-primary-600 to-primary-400 rounded-full max-w-xs mx-auto"
          />
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
            The page you&apos;re looking for seems to have wandered off into the digital void. 
            Let&apos;s help you find your way back to the executive portfolio.
          </p>
        </motion.div>

        {/* Navigation Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-12"
        >
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
            Where would you like to go?
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
            {navigationSuggestions.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + (index * 0.1), duration: 0.4 }}
                >
                  <Link
                    href={item.href}
                    className="group flex items-center gap-3 p-4 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 min-h-[56px]"
                  >
                    <div className="flex-shrink-0 p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg group-hover:bg-primary-200 dark:group-hover:bg-primary-800/50 transition-colors">
                      <IconComponent className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="text-left flex-1">
                      <div className="font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-primary-700 dark:group-hover:text-primary-300">
                        {item.name}
                      </div>
                      <div className="text-sm text-neutral-500 dark:text-neutral-400">
                        {item.description}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Primary Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            href="/"
            size="lg"
            className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 shadow-xl"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
          
          <Button
            href="/contact"
            variant="outline"
            size="lg"
            className="border-primary-300 hover:border-primary-400"
          >
            <Mail className="w-5 h-5 mr-2" />
            Report Issue
          </Button>
        </motion.div>

        {/* Additional Help */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.4 }}
          className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-700"
        >
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            If you continue to experience issues, please{' '}
            <Link 
              href="/contact" 
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 underline focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 rounded-sm"
            >
              contact Walter directly
            </Link>{' '}
            for technical support.
          </p>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 bg-primary-200 dark:bg-primary-800 rounded-full opacity-20 blur-xl"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-32 h-32 bg-primary-300 dark:bg-primary-700 rounded-full opacity-10 blur-2xl"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, -180, -360]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </Layout>
  );
}