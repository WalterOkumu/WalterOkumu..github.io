'use client';

import Image from 'next/image';
import { forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Optimized Image Component with Enhanced Accessibility
 * Provides lazy loading, format optimization, and comprehensive accessibility
 */
const OptimizedImage = forwardRef(({
  src,
  alt,
  className = '',
  width,
  height,
  fill = false,
  priority = false,
  quality = 85,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  placeholder = 'blur',
  blurDataURL,
  loading = 'lazy',
  decoding = 'async',
  // Accessibility props
  role,
  'aria-hidden': ariaHidden,
  'aria-describedby': ariaDescribedBy,
  'aria-labelledby': ariaLabelledBy,
  // Loading state props
  showLoadingState = true,
  loadingClassName = '',
  errorClassName = '',
  // Container props
  containerClassName = '',
  // Event handlers
  onLoad,
  onError,
  onLoadingComplete,
  ...props
}, ref) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Generate blur data URL for placeholder if not provided
  const defaultBlurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRGABAgAAZABkAAD/7AARRHVja3kAAQAEAAAAPAAA/+4ADkFkb2JlAGTAAAAAAf/bAIQABgQEBAUEBgUFBgkGBQYJCwgGBggLDAoKCwoKDBAMDAwMDAwQDA4PEA8ODBMTFBQTExwbGxscHx8fHx8fHx8fHwEHBwcNDA0YEBAYGhURFRofHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8f/8AAEQgAEAAQAwERAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAMAAgQBBQAGBwgJCgv/EALUQAAIBAwMCBAMFBQQEAAABfwECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3+iiigD/2Q==';

  // Handle loading completion
  const handleLoadingComplete = (result) => {
    setIsLoading(false);
    if (onLoadingComplete) {
      onLoadingComplete(result);
    }
  };

  // Handle load event
  const handleLoad = (event) => {
    setIsLoading(false);
    setHasError(false);
    if (onLoad) {
      onLoad(event);
    }
  };

  // Handle error event
  const handleError = (event) => {
    setIsLoading(false);
    setHasError(true);
    console.error('Image failed to load:', src);
    if (onError) {
      onError(event);
    }
  };

  // Validate alt text
  if (!alt && !ariaHidden) {
    console.warn('OptimizedImage: Alt text is required for accessibility unless aria-hidden="true"');
  }

  // Image container classes
  const containerClasses = cn(
    'relative overflow-hidden',
    isLoading && showLoadingState && 'animate-pulse bg-neutral-200 dark:bg-neutral-800',
    hasError && 'bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center',
    containerClassName
  );

  // Image classes
  const imageClasses = cn(
    'transition-opacity duration-300 ease-in-out',
    isLoading ? 'opacity-0' : 'opacity-100',
    hasError && 'opacity-0',
    className
  );

  // Loading overlay classes
  const loadingOverlayClasses = cn(
    'absolute inset-0 bg-neutral-200 dark:bg-neutral-800 animate-pulse',
    'transition-opacity duration-300 ease-in-out',
    isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none',
    loadingClassName
  );

  // Error fallback
  if (hasError) {
    return (
      <div 
        className={cn(containerClasses, errorClassName)}
        style={!fill ? { width, height } : undefined}
      >
        <div className="text-neutral-500 dark:text-neutral-400 text-center p-4">
          <svg 
            className="w-8 h-8 mx-auto mb-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
          <p className="text-xs">Image unavailable</p>
          {alt && (
            <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1 sr-only">
              {alt}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      {/* Loading State */}
      {showLoadingState && (
        <div className={loadingOverlayClasses}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-neutral-300 border-t-primary-500 rounded-full animate-spin" />
          </div>
        </div>
      )}

      {/* Optimized Image */}
      <Image
        ref={ref}
        src={src}
        alt={alt}
        className={imageClasses}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        fill={fill}
        priority={priority}
        quality={quality}
        sizes={sizes}
        placeholder={placeholder}
        blurDataURL={blurDataURL || defaultBlurDataURL}
        loading={priority ? undefined : loading}
        decoding={decoding}
        role={role}
        aria-hidden={ariaHidden}
        aria-describedby={ariaDescribedBy}
        aria-labelledby={ariaLabelledBy}
        onLoad={handleLoad}
        onError={handleError}
        onLoadingComplete={handleLoadingComplete}
        {...props}
      />
    </div>
  );
});

/**
 * Hero Image Component
 * Optimized for large hero sections with proper loading states
 */
const HeroImage = forwardRef(({
  src,
  alt,
  className = '',
  priority = true,
  quality = 90,
  sizes = '100vw',
  ...props
}, ref) => {
  return (
    <OptimizedImage
      ref={ref}
      src={src}
      alt={alt}
      className={cn('object-cover', className)}
      fill
      priority={priority}
      quality={quality}
      sizes={sizes}
      placeholder="blur"
      {...props}
    />
  );
});

/**
 * Avatar Image Component
 * Optimized for profile pictures and avatars
 */
const AvatarImage = forwardRef(({
  src,
  alt,
  size = 'md',
  className = '',
  quality = 95,
  ...props
}, ref) => {
  const sizeClasses = {
    xs: 'w-8 h-8',
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
    '2xl': 'w-48 h-48',
  };

  const sizeDimensions = {
    xs: { width: 32, height: 32 },
    sm: { width: 48, height: 48 },
    md: { width: 64, height: 64 },
    lg: { width: 96, height: 96 },
    xl: { width: 128, height: 128 },
    '2xl': { width: 192, height: 192 },
  };

  return (
    <OptimizedImage
      ref={ref}
      src={src}
      alt={alt}
      className={cn('rounded-full object-cover', sizeClasses[size], className)}
      width={sizeDimensions[size].width}
      height={sizeDimensions[size].height}
      quality={quality}
      sizes="(max-width: 768px) 96px, 128px"
      {...props}
    />
  );
});

/**
 * Card Image Component
 * Optimized for card layouts with consistent aspect ratios
 */
const CardImage = forwardRef(({
  src,
  alt,
  aspectRatio = 'video', // video (16:9), square (1:1), portrait (4:3), wide (21:9)
  className = '',
  quality = 85,
  ...props
}, ref) => {
  const aspectRatioClasses = {
    video: 'aspect-video',
    square: 'aspect-square', 
    portrait: 'aspect-[4/3]',
    wide: 'aspect-[21/9]',
  };

  return (
    <div className={cn('relative overflow-hidden', aspectRatioClasses[aspectRatio])}>
      <OptimizedImage
        ref={ref}
        src={src}
        alt={alt}
        className={cn('object-cover', className)}
        fill
        quality={quality}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        {...props}
      />
    </div>
  );
});

/**
 * Executive Hero Image Component
 * Specialized for C-level executive portraits with professional styling
 */
const ExecutiveHeroImage = forwardRef(({
  src,
  alt,
  className = '',
  priority = true,
  quality = 95,
  showAIBadge = false,
  ...props
}, ref) => {
  return (
    <div className="relative">
      <OptimizedImage
        ref={ref}
        src={src}
        alt={alt}
        className={cn('rounded-xl object-cover shadow-2xl ring-4 ring-white/10', className)}
        width={400}
        height={400}
        priority={priority}
        quality={quality}
        sizes="(max-width: 768px) 300px, 400px"
        {...props}
      />
      
      {showAIBadge && (
        <div className="absolute -top-2 -right-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-color-primary-500 to-color-success-500 text-white text-sm font-medium rounded-full shadow-lg">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Chief AI Officer
          </div>
        </div>
      )}
      
      {/* Executive status indicator */}
      <div className="absolute bottom-4 right-4">
        <div className="w-4 h-4 bg-color-success-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
      </div>
    </div>
  );
});

/**
 * Project Showcase Image Component
 * Enhanced for portfolio projects with metrics overlay
 */
const ProjectShowcaseImage = forwardRef(({
  src,
  alt,
  title,
  metrics,
  className = '',
  quality = 90,
  showHover = true,
  ...props
}, ref) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={cn('relative group cursor-pointer', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardImage
        ref={ref}
        src={src}
        alt={alt}
        aspectRatio="video"
        className={cn(
          'transition-transform duration-300',
          showHover && 'group-hover:scale-105'
        )}
        quality={quality}
        {...props}
      />
      
      {/* Metrics overlay */}
      {(title || metrics) && (
        <div className={cn(
          'absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-lg transition-opacity duration-300',
          isHovered || !showHover ? 'opacity-100' : 'opacity-0'
        )}>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            {title && <h3 className="font-semibold text-lg mb-1">{title}</h3>}
            {metrics && <p className="text-sm opacity-90">{metrics}</p>}
          </div>
        </div>
      )}
    </div>
  );
});

/**
 * AI Leadership Badge Component
 * Visual indicator for AI-enhanced features
 */
const AILeadershipBadge = ({ variant = 'default', size = 'sm', className = '' }) => {
  const variants = {
    default: 'bg-gradient-to-r from-color-primary-500 to-color-success-500',
    outline: 'border-2 border-color-primary-500 text-color-primary-600 bg-transparent',
    solid: 'bg-color-primary-600 text-white'
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <div className={cn(
      'inline-flex items-center gap-2 font-medium rounded-full',
      variants[variant],
      sizes[size],
      'text-white',
      className
    )}>
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      Chief AI Officer
    </div>
  );
};

// Set display names
OptimizedImage.displayName = 'OptimizedImage';
HeroImage.displayName = 'HeroImage';
AvatarImage.displayName = 'AvatarImage';
CardImage.displayName = 'CardImage';
ExecutiveHeroImage.displayName = 'ExecutiveHeroImage';
ProjectShowcaseImage.displayName = 'ProjectShowcaseImage';
AILeadershipBadge.displayName = 'AILeadershipBadge';

export { 
  OptimizedImage, 
  HeroImage, 
  AvatarImage, 
  CardImage,
  ExecutiveHeroImage,
  ProjectShowcaseImage,
  AILeadershipBadge
};
export default OptimizedImage;