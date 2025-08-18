'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import {
  Calendar,
  MapPin,
  Users,
  TrendingUp,
  Award,
  Target,
  Globe,
  Zap
} from 'lucide-react';

/**
 * Executive Timeline Component - Advanced Interactive Career Progression
 * Implements sophisticated animations, accessibility, and executive-level presentation
 */
const ExecutiveTimeline = ({
  timelineData = [],
  className = '',
  variant = 'executive',
  showStats = true,
  interactive = true
}) => {
  const [activeItem, setActiveItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const containerRef = useRef(null);

  // Scroll-driven animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"]
  });

  const timelineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);

  // Executive timeline data with achievements
  const executiveTimeline = timelineData.length > 0 ? timelineData : [
    {
              id: '2024',
        year: '2024',
        title: 'Head of Customer Success & Technical Architecture',
        company: 'Yellow Pages Group',
        location: 'Nairobi, Kenya',
      type: 'executive',
      icon: Zap,
      achievements: [
        'Leading AI transformation across 7 countries',
        '40% customer satisfaction improvement through technical transformation',
        '40% customer satisfaction improvement',
        '99.2% system reliability achievement'
      ],
      stats: {
        teams: '12 Direct Reports',
        countries: '7 Countries',
        revenue: '40% Satisfaction Impact',
        satisfaction: '40% Improvement'
      },
      skills: ['AI Strategy', 'International Leadership', 'ML Architecture', 'Team Scaling'],
      color: 'primary'
    },
    {
      id: '2023',
      year: '2023',
              title: 'Senior Web Developer',
        company: 'Yellow Pages Group',
        location: 'Nairobi, Kenya',
        type: 'development',
        icon: Target,
        achievements: [
          'Spearheaded flagship platform migration from Drupal to ReactJS',
          'Architected scalable API backend using Node.js and PostgreSQL',
          'Established CI/CD foundation for international expansion',
          'Collaborated with international marketing teams on SEO optimization'
        ],
        stats: {
          teams: '3 Team Members',
          projects: '5 Platform Projects',
          efficiency: '20% Performance Improvement',
          uptime: '99.5% Reliability'
        },
              skills: ['Technical Architecture', 'Team Leadership', 'Solution Architecture', 'Agile Management'],
      color: 'secondary'
    },
    {
      id: '2022',
      year: '2022',
              title: 'Full-Stack Web Developer',
        company: 'Microverse',
        location: 'Remote',
        type: 'development',
        icon: Users,
        achievements: [
          'Completed 1300+ hours of intensive full-stack training',
          'Developed expertise in algorithms, data structures, and modern web technologies',
          'Gained proficiency in remote pair programming using GitHub and GitFlow',
          'Built strong foundation in full-stack development principles and practices'
        ],
        stats: {
          training: '1300+ Hours',
          projects: '15+ Portfolio Projects',
          collaboration: 'Remote Pair Programming',
          technologies: 'Modern Web Stack'
        },
        skills: ['JavaScript', 'React', 'Ruby on Rails', 'PostgreSQL', 'Git', 'Remote Collaboration'],
      color: 'accent'
    }
  ];

  // Handle item interactions with analytics
  const handleItemClick = (item) => {
    if (!interactive) return;

    setActiveItem(activeItem === item.id ? null : item.id);
    trackEvent('timeline_interaction', {
      action: 'click',
      item_id: item.id,
      item_title: item.title,
      location: 'executive_timeline'
    });
  };

  const handleItemHover = (item, isHovering) => {
    if (!interactive) return;

    setHoveredItem(isHovering ? item.id : null);
    if (isHovering) {
      trackEvent('timeline_interaction', {
        action: 'hover',
        item_id: item.id,
        location: 'executive_timeline'
      });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const magneticHover = {
    scale: 1.02,
    y: -2,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative executive-timeline',
        'py-16 px-6 md:px-12',
        className
      )}
    >
      {/* Timeline Header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="heading-hero mb-4 text-primary-900 dark:text-primary-100">
          Executive Career Timeline
        </h2>
        <p className="text-executive text-neutral-700 dark:text-neutral-300 max-w-3xl mx-auto">
          International technology leadership progression with measurable impact across
          AI transformation, team scaling, and customer success innovation.
        </p>
      </motion.div>

      {/* Timeline Container */}
      <motion.div
        className="relative max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ opacity }}
      >
        {/* Animated Timeline Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-neutral-200 dark:bg-neutral-700 transform -translate-x-1/2 md:block hidden">
          <motion.div
            className="w-full bg-gradient-to-b from-primary-500 via-secondary-500 to-accent-500 rounded-full"
            style={{ height: timelineHeight }}
            transition={{ duration: 0.8 }}
          />
        </div>

        {/* Timeline Items */}
        {executiveTimeline.map((item, index) => (
          <TimelineItem
            key={item.id}
            item={item}
            index={index}
            isActive={activeItem === item.id}
            isHovered={hoveredItem === item.id}
            isLast={index === executiveTimeline.length - 1}
            showStats={showStats}
            interactive={interactive}
            onItemClick={() => handleItemClick(item)}
            onItemHover={(isHovering) => handleItemHover(item, isHovering)}
            variants={itemVariants}
            magneticHover={magneticHover}
          />
        ))}
      </motion.div>
    </div>
  );
};

/**
 * Individual Timeline Item Component
 */
const TimelineItem = ({
  item,
  index,
  isActive,
  isHovered,
  isLast,
  showStats,
  interactive,
  onItemClick,
  onItemHover,
  variants,
  magneticHover
}) => {
  const isLeft = index % 2 === 0;
  const IconComponent = item.icon;

  // Color mappings for executive presentation
  const colorMappings = {
    primary: {
      bg: 'bg-primary-50 dark:bg-primary-950/20',
      border: 'border-primary-200 dark:border-primary-800',
      text: 'text-primary-900 dark:text-primary-100',
      accent: 'text-primary-600 dark:text-primary-400',
      icon: 'bg-primary-600 text-white',
      gradient: 'from-primary-500 to-primary-700'
    },
    secondary: {
      bg: 'bg-secondary-50 dark:bg-secondary-950/20',
      border: 'border-secondary-200 dark:border-secondary-800',
      text: 'text-secondary-900 dark:text-secondary-100',
      accent: 'text-secondary-600 dark:text-secondary-400',
      icon: 'bg-secondary-600 text-white',
      gradient: 'from-secondary-500 to-secondary-700'
    },
    accent: {
      bg: 'bg-accent-50 dark:bg-accent-950/20',
      border: 'border-accent-200 dark:border-accent-800',
      text: 'text-accent-900 dark:text-accent-100',
      accent: 'text-accent-600 dark:text-accent-400',
      icon: 'bg-accent-600 text-white',
      gradient: 'from-accent-500 to-accent-700'
    }
  };

  const colors = colorMappings[item.color] || colorMappings.primary;

  return (
    <motion.div
      className={cn(
        'relative flex items-center mb-16 last:mb-0',
        'md:justify-center',
        isLeft ? 'md:flex-row-reverse' : 'md:flex-row'
      )}
      variants={variants}
      whileHover={interactive ? magneticHover : undefined}
      onHoverStart={() => onItemHover(true)}
      onHoverEnd={() => onItemHover(false)}
    >
      {/* Desktop Layout - Content Card */}
      <div className={cn(
        'flex-1 md:w-5/12 w-full',
        isLeft ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left',
        'md:max-w-md'
      )}>
        <motion.div
          className={cn(
            'card-executive p-6 cursor-pointer',
            'border rounded-xl shadow-lg',
            'hover:shadow-xl transition-all duration-300',
            colors.bg,
            colors.border,
            isHovered && 'shadow-2xl scale-[1.02]',
            isActive && 'ring-2 ring-primary-500 ring-offset-2'
          )}
          onClick={interactive ? onItemClick : undefined}
          layout
        >
          {/* Card Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className={cn('text-sm font-semibold mb-1', colors.accent)}>
                {item.year}
              </div>
              <h3 className={cn('heading-leadership mb-2', colors.text)}>
                {item.title}
              </h3>
              <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                <MapPin className="w-4 h-4" />
                {item.company} • {item.location}
              </div>
            </div>
          </div>

          {/* Achievements */}
          <ul className="space-y-2 mb-4">
            {item.achievements.slice(0, isActive ? item.achievements.length : 2).map((achievement, idx) => (
              <li key={idx} className="text-sm text-neutral-700 dark:text-neutral-300 flex items-start gap-2">
                <Award className="w-4 h-4 mt-0.5 text-secondary-500 flex-shrink-0" />
                {achievement}
              </li>
            ))}
            {!isActive && item.achievements.length > 2 && (
              <li className="text-xs text-neutral-500 dark:text-neutral-400">
                +{item.achievements.length - 2} more achievements
              </li>
            )}
          </ul>

          {/* Executive Stats */}
          <AnimatePresence>
            {showStats && isActive && (
              <motion.div
                className="grid grid-cols-2 gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-700"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {Object.entries(item.stats).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className={cn('font-semibold text-lg', colors.accent)}>
                      {value.split(' ')[0]}
                    </div>
                    <div className="text-xs text-neutral-600 dark:text-neutral-400">
                      {value.split(' ').slice(1).join(' ')}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Skills Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {item.skills.slice(0, 3).map((skill, idx) => (
              <span
                key={idx}
                className={cn(
                  'px-2 py-1 text-xs font-medium rounded-full',
                  'bg-neutral-100 text-neutral-700',
                  'dark:bg-neutral-800 dark:text-neutral-300'
                )}
              >
                {skill}
              </span>
            ))}
            {item.skills.length > 3 && (
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
                +{item.skills.length - 3}
              </span>
            )}
          </div>
        </motion.div>
      </div>

      {/* Timeline Icon */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 md:relative md:left-auto md:top-auto md:transform-none md:mx-4 z-10">
        <motion.div
          className={cn(
            'w-16 h-16 rounded-full flex items-center justify-center',
            'shadow-lg border-4 border-white dark:border-neutral-900',
            `bg-gradient-to-br ${colors.gradient}`,
            'group-hover:scale-110 transition-transform duration-300'
          )}
          whileHover={interactive ? { scale: 1.1, rotate: 5 } : undefined}
          whileTap={interactive ? { scale: 0.95 } : undefined}
        >
          <IconComponent className="w-7 h-7 text-white" />
        </motion.div>
      </div>

      {/* Mobile Spacer / Desktop Empty Side */}
      <div className="hidden md:block md:w-5/12 md:max-w-md" />
    </motion.div>
  );
};

export default ExecutiveTimeline;
export { ExecutiveTimeline };
