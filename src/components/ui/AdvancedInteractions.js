'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// Task 5.1.1: Cursor-following effects for modern appeal
export const CursorFollower = ({ children, intensity = 0.1 }) => {
  const elementRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) * intensity;
        const deltaY = (e.clientY - centerY) * intensity;

        setMousePosition({ x: deltaX, y: deltaY });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [intensity]);

  return (
    <div
      ref={elementRef}
      style={{
        transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0)`,
        transition: 'transform 0.1s ease-out',
      }}
      className="cursor-follow-element"
    >
      {children}
    </div>
  );
};

// Task 5.1.2: Performance-optimized parallax scrolling
export const ParallaxSection = ({ children, speed = 0.5, className = '' }) => {
  const elementRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateOffset = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const rate = scrolled * speed;
        setOffset(rate);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateOffset);
        ticking = true;
      }
    };

    // Intersection Observer for performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            window.addEventListener('scroll', handleScroll, { passive: true });
          } else {
            window.removeEventListener('scroll', handleScroll);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [speed]);

  return (
    <div
      ref={elementRef}
      className={`parallax-section ${className}`}
      style={{
        transform: `translate3d(0, ${offset}px, 0)`,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};

// Task 5.1.3: Interactive data visualizations
export const InteractiveMetric = ({ value, maxValue, label, color = 'primary' }) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            // Animate the value
            let start = 0;
            const duration = 1500;
            const startTime = performance.now();

            const animate = (currentTime) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);

              // Easing function for smooth animation
              const easeOutCubic = 1 - Math.pow(1 - progress, 3);
              const current = Math.floor(value * easeOutCubic);

              setAnimatedValue(current);

              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };

            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [value, isVisible]);

  const percentage = (animatedValue / maxValue) * 100;

  return (
    <div ref={elementRef} className="interactive-metric">
      <div className="metric-value">
        <span className="metric-number">{animatedValue.toLocaleString()}</span>
        <span className="metric-label">{label}</span>
      </div>
      <div className="metric-progress">
        <div
          className={`metric-bar metric-bar-${color}`}
          style={{
            width: `${percentage}%`,
            transition: 'width 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        />
      </div>
    </div>
  );
};

// Task 5.1.4: Gesture support for touch devices
export const GestureHandler = ({ children, onSwipeLeft, onSwipeRight, onPinch }) => {
  const elementRef = useRef(null);
  const touchStart = useRef({ x: 0, y: 0, time: 0 });
  const touchEnd = useRef({ x: 0, y: 0, time: 0 });

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    touchStart.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    };
  };

  const handleTouchEnd = (e) => {
    const touch = e.changedTouches[0];
    touchEnd.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    };

    const deltaX = touchEnd.current.x - touchStart.current.x;
    const deltaY = touchEnd.current.y - touchStart.current.y;
    const deltaTime = touchEnd.current.time - touchStart.current.time;

    // Swipe detection
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50 && deltaTime < 300) {
      if (deltaX > 0 && onSwipeRight) {
        onSwipeRight();
      } else if (deltaX < 0 && onSwipeLeft) {
        onSwipeLeft();
      }
    }
  };

  return (
    <div
      ref={elementRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="gesture-handler"
    >
      {children}
    </div>
  );
};

// Task 5.1.5: Contextual tooltips and help system
export const Tooltip = ({ content, position = 'top', delay = 300, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTimeout, setShowTimeout] = useState(null);
  const [hideTimeout, setHideTimeout] = useState(null);

  const showTooltip = () => {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      setHideTimeout(null);
    }
    const timeout = setTimeout(() => setIsVisible(true), delay);
    setShowTimeout(timeout);
  };

  const hideTooltip = () => {
    if (showTimeout) {
      clearTimeout(showTimeout);
      setShowTimeout(null);
    }
    const timeout = setTimeout(() => setIsVisible(false), 100);
    setHideTimeout(timeout);
  };

  return (
    <div
      className="tooltip-container"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      {isVisible && (
        <div
          className={`tooltip tooltip-${position}`}
          role="tooltip"
          aria-hidden={!isVisible}
        >
          {content}
          <div className="tooltip-arrow" />
        </div>
      )}
    </div>
  );
};

// Task 5.1.6: Progressive disclosure patterns
export const ProgressiveDisclosure = ({
  summary,
  children,
  defaultExpanded = false,
  icon = null
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const contentRef = useRef(null);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="progressive-disclosure">
      <button
        className="disclosure-trigger"
        onClick={toggleExpanded}
        aria-expanded={isExpanded}
        aria-controls="disclosure-content"
      >
        <span className="disclosure-summary">{summary}</span>
        <span className={`disclosure-icon ${isExpanded ? 'expanded' : ''}`}>
          {icon || '▼'}
        </span>
      </button>

      <div
        ref={contentRef}
        id="disclosure-content"
        className={`disclosure-content ${isExpanded ? 'expanded' : 'collapsed'}`}
        style={{
          maxHeight: isExpanded ? `${contentRef.current?.scrollHeight}px` : '0px',
          overflow: 'hidden',
          transition: 'max-height 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        <div className="disclosure-inner">
          {children}
        </div>
      </div>
    </div>
  );
};

// Advanced scroll-triggered animations
export const ScrollReveal = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 600,
  distance = 50
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), delay);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const getTransform = () => {
    if (isVisible) return 'translate3d(0, 0, 0)';

    switch (direction) {
      case 'up': return `translate3d(0, ${distance}px, 0)`;
      case 'down': return `translate3d(0, -${distance}px, 0)`;
      case 'left': return `translate3d(${distance}px, 0, 0)`;
      case 'right': return `translate3d(-${distance}px, 0, 0)`;
      default: return `translate3d(0, ${distance}px, 0)`;
    }
  };

  return (
    <div
      ref={elementRef}
      style={{
        transform: getTransform(),
        opacity: isVisible ? 1 : 0,
        transition: `all ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  );
};

// Magnetic hover effect for buttons and cards
export const MagneticHover = ({ children, strength = 0.3 }) => {
  const elementRef = useRef(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    setTransform({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setTransform({ x: 0, y: 0 });
  };

  return (
    <div
      ref={elementRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}
      className="magnetic-hover"
    >
      {children}
    </div>
  );
};

// Export components collection with named variable to fix ESLint warning
const AdvancedInteractionsComponents = {
  CursorFollower,
  ParallaxSection,
  InteractiveMetric,
  GestureHandler,
  Tooltip,
  ProgressiveDisclosure,
  ScrollReveal,
  MagneticHover,
};

export default AdvancedInteractionsComponents;