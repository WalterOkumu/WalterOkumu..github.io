'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const buttonVariants = {
  default: "bg-neutral-900 text-neutral-50 hover:bg-neutral-900/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90",
  destructive: "bg-red-500 text-neutral-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/90",
  outline: "border border-neutral-200 bg-white hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
  secondary: "bg-neutral-100 text-neutral-900 hover:bg-neutral-100/80 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80",
  ghost: "hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
  link: "text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-50",
  executive: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl",
  glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20",
  success: "bg-green-600 hover:bg-green-700 text-white",
  warning: "bg-yellow-600 hover:bg-yellow-700 text-white",
  error: "bg-red-600 hover:bg-red-700 text-white"
};

const buttonSizes = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3",
  lg: "h-11 rounded-md px-8",
  xl: "h-14 rounded-xl px-10 text-lg",
  icon: "h-10 w-10"
};

/**
 * Enhanced Button Component - International Standards
 * Sophisticated animations, accessibility, and design system
 */
const Button = forwardRef(({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  loading = false,
  disabled = false,
  children,
  icon,
  iconPosition = "left",
  fullWidth = false,
  rounded = "default",
  shadow = "default",
  animation = "default",
  ...props
}, ref) => {
  const Comp = asChild ? Slot : "button";

  // Enhanced rounded variants
  const roundedVariants = {
    default: "rounded-lg",
    sm: "rounded-md",
    lg: "rounded-xl",
    xl: "rounded-2xl",
    full: "rounded-full"
  };

  // Enhanced shadow variants
  const shadowVariants = {
    none: "",
    sm: "shadow-sm",
    default: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
    "2xl": "shadow-2xl",
    glow: "shadow-glow"
  };

  // Enhanced animation variants
  const animationVariants = {
    none: {},
    default: {
      whileHover: { scale: 1.02, y: -2 },
      whileTap: { scale: 0.98 }
    },
    bounce: {
      whileHover: { scale: 1.05, y: -4 },
      whileTap: { scale: 0.95 }
    },
    rotate: {
      whileHover: { rotate: 5, scale: 1.05 },
      whileTap: { rotate: -5, scale: 0.95 }
    },
    magnetic: {
      whileHover: { y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } },
      whileTap: { y: 0 }
    }
  };

  const baseClasses = cn(
    "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    buttonVariants[variant],
    buttonSizes[size],
    roundedVariants[rounded],
    shadowVariants[shadow],
    fullWidth && "w-full",
    className
  );

  // Enhanced content with icon support
  const renderContent = () => {
    if (loading) {
      return (
        <>
          <motion.div
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <span>Loading...</span>
        </>
      );
    }

    if (icon && iconPosition === "left") {
      return (
        <>
          {icon}
          {children}
        </>
      );
    }

    if (icon && iconPosition === "right") {
      return (
        <>
          {children}
          {icon}
        </>
      );
    }

    return children;
  };

  return (
    <motion.div
      variants={animationVariants[animation]}
      initial="initial"
      whileHover="whileHover"
      whileTap="whileTap"
      className={fullWidth ? "w-full" : "inline-block"}
    >
      <Comp
        className={baseClasses}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {renderContent()}
      </Comp>
    </motion.div>
  );
});

Button.displayName = "Button";

export { Button, buttonVariants, buttonSizes };
export default Button;