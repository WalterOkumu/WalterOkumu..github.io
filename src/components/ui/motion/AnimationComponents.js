'use client';

import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion';
import { forwardRef, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

// Animation Variants
export const animationVariants = {
  // Fade In Variants
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  },

  fadeInUp: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 }
  },

  fadeInDown: {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 }
  },

  fadeInLeft: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  },

  fadeInRight: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 }
  },

  // Scale Variants
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  },

  scaleUp: {
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.5 }
  },

  // Slide Variants
  slideInLeft: {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 }
  },

  slideInRight: {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 100, opacity: 0 }
  },

  // Stagger Container
  staggerContainer: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },

  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  },

  // Hover Variants
  hover: {
    scale: 1.05,
    transition: { duration: 0.2, ease: 'easeInOut' }
  },

  tap: {
    scale: 0.95,
    transition: { duration: 0.1 }
  },

  // Card Hover Effects
  cardHover: {
    y: -8,
    scale: 1.02,
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    transition: { duration: 0.3, ease: 'easeOut' }
  },

  // Professional Entrance
  professionalEntrance: {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }
};

// Default transition settings
export const defaultTransition = {
  duration: 0.5,
  ease: [0.25, 0.46, 0.45, 0.94]
};

// Refined Animation Component
export const MotionDiv = forwardRef(({
  children,
  variant = 'fadeIn',
  delay = 0,
  duration = 0.5,
  className = '',
  once = true,
  threshold = 0.1,
  ...props
}, ref) => {
  const controls = useAnimation();
  const viewRef = useRef(null);
  const isInView = useInView(viewRef, { once, threshold });

  const selectedVariant = animationVariants[variant] || animationVariants.fadeIn;

  useEffect(() => {
    if (isInView) {
      controls.start('animate');
    } else if (!once) {
      controls.start('initial');
    }
  }, [isInView, controls, once]);

  return (
    <motion.div
      ref={viewRef}
      className={className}
      initial="initial"
      animate={controls}
      variants={selectedVariant}
      transition={{
        ...defaultTransition,
        duration,
        delay
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
});

// Staggered Children Animation
export const StaggerContainer = ({ children, className = '', delay = 0, ...props }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  useEffect(() => {
    if (isInView) {
      controls.start('animate');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="initial"
      animate={controls}
      variants={animationVariants.staggerContainer}
      transition={{ delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Staggered Item
export const StaggerItem = ({ children, className = '', index = 0, ...props }) => {
  return (
    <motion.div
      className={className}
      variants={animationVariants.staggerItem}
      transition={{
        ...defaultTransition,
        delay: index * 0.1
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Professional Button with Hover Effects
export const MotionButton = forwardRef(({
  children,
  className = '',
  disabled = false,
  onClick,
  ...props
}, ref) => {
  return (
    <motion.button
      ref={ref}
      className={cn(
        'relative overflow-hidden',
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
      whileHover={!disabled ? animationVariants.hover : {}}
      whileTap={!disabled ? animationVariants.tap : {}}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
});

// Enhanced Card with Hover Effects
export const MotionCard = forwardRef(({
  children,
  className = '',
  hoverable = true,
  ...props
}, ref) => {
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hoverable ? animationVariants.cardHover : {}}
      transition={defaultTransition}
      {...props}
    >
      {children}
    </motion.div>
  );
});

// Floating Action with Smooth Animation
export const FloatingElement = ({
  children,
  className = '',
  amplitude = 10,
  duration = 3,
  ...props
}) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-amplitude, amplitude, -amplitude],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Page Transition Wrapper
export const PageTransition = ({ children, className = '' }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut'
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Text Reveal Animation
export const TextReveal = ({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
}) => {
  return (
    <motion.div
      className={cn('overflow-hidden', className)}
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{
          duration: duration * 0.8,
          delay: delay + 0.1,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

// Magnetic Button Effect
export const MagneticButton = ({
  children,
  className = '',
  strength = 0.3,
  ...props
}) => {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    ref.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'translate(0px, 0px)';
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Set display names
MotionDiv.displayName = 'MotionDiv';
MotionButton.displayName = 'MotionButton';
MotionCard.displayName = 'MotionCard';

// Animation components collection for export
const AnimationComponents = {
  MotionDiv,
  StaggerContainer,
  StaggerItem,
  MotionButton,
  MotionCard,
  FloatingElement,
  PageTransition,
  TextReveal,
  MagneticButton,
  animationVariants,
  defaultTransition
};

export default AnimationComponents;