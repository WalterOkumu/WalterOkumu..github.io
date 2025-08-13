'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

// Badge variant styles
const badgeVariants = {
  variant: {
    default: 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300',
    secondary: 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-300',
    success: 'bg-success-light/10 text-success-dark dark:bg-success-dark/20 dark:text-success-light',
    warning: 'bg-warning-light/10 text-warning-dark dark:bg-warning-dark/20 dark:text-warning-light',
    error: 'bg-error-light/10 text-error-dark dark:bg-error-dark/20 dark:text-error-light',
    outline: 'border border-primary-300 text-primary-700 dark:border-primary-700 dark:text-primary-300',
  },
  size: {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-sm',
  },
};

// Base badge styles
const baseBadgeStyles = [
  'inline-flex items-center font-medium rounded-full',
  'transition-colors duration-200 ease-in-out',
];

/**
 * Professional Badge Component
 * For displaying status, categories, and labels
 */
const Badge = forwardRef(({
  children,
  className = '',
  variant = 'default',
  size = 'md',
  icon = null,
  ...props
}, ref) => {
  const badgeClass = cn([
    ...baseBadgeStyles,
    badgeVariants.variant[variant],
    badgeVariants.size[size],
    className,
  ]);

  return (
    <span
      ref={ref}
      className={badgeClass}
      {...props}
    >
      {/* Icon */}
      {icon && (
        <span className={cn('flex-shrink-0', children && 'mr-1')}>
          {icon}
        </span>
      )}
      
      {/* Badge Content */}
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';

export { Badge, badgeVariants };
export default Badge;