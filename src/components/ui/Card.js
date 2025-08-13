'use client';

import { forwardRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * Advanced Card System - Executive Portfolio Design
 * Implements sophisticated visual hierarchy with glass morphism and executive styling
 */

// Base Card Component with Enhanced Design System
const Card = forwardRef(({
  children,
  className = '',
  variant = 'executive',
  padding = 'lg',
  interactive = false,
  ...props
}, ref) => {
  const baseClasses = 'card-base';

  const variantClasses = {
    executive: 'card-executive',
    glass: 'card-glass',
    standard: 'border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900'
  };

  const paddingClasses = {
    none: '',
    sm: 'p-sm',
    md: 'p-md',
    lg: 'p-lg',
    xl: 'p-xl'
  };

  const interactiveClasses = interactive ? 'interactive-element magnetic-element cursor-pointer' : '';

  return (
    <div
      ref={ref}
      className={cn([
        baseClasses,
        variantClasses[variant],
        paddingClasses[padding],
        interactiveClasses,
        className
      ])}
      {...props}
    >
      {children}
    </div>
  );
});

// Card Header Component
const CardHeader = forwardRef(({
  children,
  className = '',
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(['space-y-xs mb-md', className])}
      {...props}
    >
      {children}
    </div>
  );
});

// Card Title Component
const CardTitle = forwardRef(({
  children,
  className = '',
  level = 'secondary',
  ...props
}, ref) => {
  const levelClasses = {
    primary: 'heading-primary',
    secondary: 'heading-secondary',
    tertiary: 'text-xl font-semibold'
  };

  return (
    <h3
      ref={ref}
      className={cn([levelClasses[level], 'mb-0', className])}
      {...props}
    >
      {children}
    </h3>
  );
});

// Card Description Component
const CardDescription = forwardRef(({
  children,
  className = '',
  ...props
}, ref) => {
  return (
    <p
      ref={ref}
      className={cn(['text-tertiary-on-light text-sm leading-relaxed', className])}
      {...props}
    >
      {children}
    </p>
  );
});

// Card Content Component
const CardContent = forwardRef(({
  children,
  className = '',
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(['space-y-component', className])}
      {...props}
    >
      {children}
    </div>
  );
});

// Card Footer Component
const CardFooter = forwardRef(({
  children,
  className = '',
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(['flex items-center justify-between mt-lg pt-md border-t border-neutral-200 dark:border-neutral-700', className])}
      {...props}
    >
      {children}
    </div>
  );
});

// Advanced Metric Card with Data Visualization
const MetricCard = forwardRef(({
  value,
  label,
  description,
  icon,
  iconAlt,
  change,
  trend = 'neutral',
  className = '',
  variant = 'executive',
  ...props
}, ref) => {
  const trendColors = {
    positive: 'text-success-600 dark:text-success-400',
    negative: 'text-error-600 dark:text-error-400',
    neutral: 'text-neutral-500 dark:text-neutral-400',
  };

  return (
    <Card
      ref={ref}
      variant={variant}
      padding="lg"
      className={cn('card-metric text-center min-h-[180px] flex flex-col justify-center', className)}
      {...props}
    >
      {/* Icon with Enhanced Styling */}
      {icon && (
        <div className="flex justify-center mb-md">
          <div
            className="w-12 h-12 flex items-center justify-center text-2xl bg-primary-50 dark:bg-primary-900/30 rounded-xl shadow-sm"
            role="img"
            aria-label={iconAlt || `${label} icon`}
          >
            {typeof icon === 'string' ? icon : icon}
          </div>
        </div>
      )}

      {/* Metric Value */}
      <div className="metric-value text-5xl font-black leading-none mb-sm">
        {value}
      </div>

      {/* Metric Label */}
      <div className="metric-label text-sm font-bold mb-xs">
        {label}
      </div>

      {/* Description */}
      {description && (
        <div className="metric-description text-xs leading-relaxed mb-sm">
          {description}
        </div>
      )}

      {/* Change Indicator */}
      {change && (
        <div className={cn('text-xs font-semibold', trendColors[trend])}>
          {change}
        </div>
      )}
    </Card>
  );
});

// Project Card Component for Portfolio
const ProjectCard = forwardRef(({
  project,
  className = '',
  onClick,
  ...props
}, ref) => {
  const {
    title,
    description,
    image,
    technologies = [],
    status,
    impact,
    category
  } = project;

  return (
    <Card
      ref={ref}
      variant="glass"
      padding="xl"
      interactive={!!onClick}
      className={cn('group relative overflow-hidden', className)}
      onClick={onClick}
      {...props}
    >
      {/* Status Indicator */}
      {status && (
        <div className="absolute top-md right-md">
          <span className={cn([
            'px-xs py-2xs text-xs font-medium rounded-full',
            status === 'active' && 'bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-300',
            status === 'completed' && 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300',
            status === 'in-progress' && 'bg-warning-100 text-warning-800 dark:bg-warning-900/30 dark:text-warning-300'
          ])}>
            {status}
          </span>
        </div>
      )}

      {/* Project Image */}
      {image && (
        <div className="mb-lg rounded-lg overflow-hidden relative h-48">
          <Image
            src={image}
            alt={`${title} project screenshot`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      {/* Project Content */}
      <CardHeader>
        <CardTitle level="tertiary">{title}</CardTitle>
        {category && (
          <div className="text-xs text-primary-600 dark:text-primary-400 font-medium uppercase tracking-wider">
            {category}
          </div>
        )}
      </CardHeader>

      <CardContent>
        <p className="text-sm text-tertiary-on-light leading-relaxed mb-md">
          {description}
        </p>

        {/* Impact Metrics */}
        {impact && (
          <div className="mb-md">
            <h4 className="text-xs font-semibold text-secondary-on-light mb-xs uppercase tracking-wider">Impact</h4>
            <p className="text-sm font-medium text-primary-700 dark:text-primary-300">
              {impact}
            </p>
          </div>
        )}

        {/* Technologies */}
        {technologies.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-secondary-on-light mb-xs uppercase tracking-wider">Technologies</h4>
            <div className="flex flex-wrap gap-xs">
              {technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-xs py-2xs bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
});

// Feature Card for Marketing Sections
const FeatureCard = forwardRef(({
  icon,
  title,
  description,
  className = '',
  ...props
}, ref) => {
  return (
    <Card
      ref={ref}
      variant="glass"
      padding="lg"
      className={cn('text-center group', className)}
      {...props}
    >
      {/* Feature Icon */}
      <div className="flex justify-center mb-lg">
        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      </div>

      {/* Feature Content */}
      <CardHeader>
        <CardTitle level="tertiary">{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-tertiary-on-light leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
});

// Set display names for debugging
Card.displayName = 'Card';
CardHeader.displayName = 'CardHeader';
CardTitle.displayName = 'CardTitle';
CardDescription.displayName = 'CardDescription';
CardContent.displayName = 'CardContent';
CardFooter.displayName = 'CardFooter';
MetricCard.displayName = 'MetricCard';
ProjectCard.displayName = 'ProjectCard';
FeatureCard.displayName = 'FeatureCard';

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  MetricCard,
  ProjectCard,
  FeatureCard,
};

export default Card;