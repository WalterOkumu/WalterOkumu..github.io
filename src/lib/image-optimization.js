// Image optimization utilities for executive portfolio
export const imageOptimization = {
  // Executive portrait specifications
  executive: {
    sizes: {
      hero: { width: 800, height: 800, quality: 95 },
      card: { width: 400, height: 400, quality: 90 },
      thumbnail: { width: 200, height: 200, quality: 85 },
      avatar: { width: 120, height: 120, quality: 90 }
    },
    formats: ['webp', 'jpg'],
    loading: 'eager' // Critical executive images
  },

  // Open Graph and social media specifications
  openGraph: {
    sizes: {
      standard: { width: 1200, height: 630, quality: 95 },
      twitter: { width: 1200, height: 600, quality: 95 },
      linkedin: { width: 1200, height: 627, quality: 95 }
    },
    formats: ['jpg', 'png'],
    text: {
      title: {
        fontSize: '72px',
        fontFamily: 'Inter',
        fontWeight: 'bold',
        color: '#1f2937',
        maxLines: 2
      },
      subtitle: {
        fontSize: '36px',
        fontFamily: 'Inter',
        fontWeight: 'medium',
        color: '#4b5563',
        maxLines: 1
      },
      metrics: {
        fontSize: '28px',
        fontFamily: 'Inter',
        fontWeight: 'semibold',
        color: '#059669',
        maxLines: 1
      }
    }
  },

  // Project and portfolio image specifications
  portfolio: {
    sizes: {
      showcase: { width: 1200, height: 800, quality: 90 },
      grid: { width: 600, height: 400, quality: 85 },
      thumbnail: { width: 300, height: 200, quality: 80 }
    },
    formats: ['webp', 'jpg'],
    loading: 'lazy'
  },

  // Performance optimization settings
  performance: {
    blur: {
      dataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
      placeholder: 'blur'
    },
    lazy: {
      rootMargin: '50px 0px',
      threshold: 0.1
    }
  }
};

// Generate optimized image props
export const getOptimizedImageProps = (
  src,
  alt,
  category = 'portfolio',
  size = 'grid',
  priority = false
) => {
  const config = imageOptimization[category];
  const sizeConfig = config.sizes[size];

  return {
    src,
    alt,
    width: sizeConfig.width,
    height: sizeConfig.height,
    quality: sizeConfig.quality,
    priority: priority || config.loading === 'eager',
    placeholder: priority ? undefined : imageOptimization.performance.blur.placeholder,
    blurDataURL: priority ? undefined : imageOptimization.performance.blur.dataURL,
    sizes: `(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw`,
    style: {
      width: '100%',
      height: 'auto',
      objectFit: 'cover'
    }
  };
};

// Executive portfolio image metadata
export const executiveImages = {
  hero: {
    src: '/walter-okumu.webp',
    alt: 'Walter Oriaro - Head of Customer Success & Technical Architecture | 40% Customer Satisfaction Improvement',
    credit: 'Professional executive portrait',
    seo: {
      title: 'Walter Oriaro Executive Portrait',
              description: 'Head of Customer Success & Technical Architecture Walter Oriaro - Customer Success Strategy Leadership across 7 countries'
    }
  },
  openGraph: {
    default: {
      src: '/og-image.jpg',
              alt: 'Walter Oriaro - Head of Customer Success & Technical Architecture | 40% Customer Satisfaction Improvement',
        title: 'Head of Customer Success & Technical Architecture',
      subtitle: '40% Customer Satisfaction • 7 Countries • 78% Error Reduction'
    },
    contact: {
      src: '/og-contact.jpg',
      alt: 'Contact Walter Oriaro - Customer Success & Technical Architecture Consultation',
      title: 'Schedule Customer Success Strategy Consultation',
      subtitle: 'Head of Customer Success • International Leadership • 24hr Response'
    }
  },
  projects: [
    {
      id: 'yellowpages-kenya',
      src: '/projects/yellowpages-kenya.webp',
              alt: 'Yellow Pages Kenya - Advanced Business Directory Platform',
      title: 'AI-Enhanced Business Directory',
      metrics: '50K+ Listings • 99.7% Uptime'
    },
    {
      id: 'ai-transformation',
      src: '/projects/ai-transformation.webp',
      alt: 'Technical Transformation Dashboard - 40% Customer Satisfaction Improvement',
      title: 'Customer Success Transformation',
      metrics: '40% Satisfaction • 78% Error Reduction'
    }
  ],
  skills: {
    ai: {
      src: '/icons/ai-leadership.svg',
              alt: 'Technical Leadership Icon',
      category: 'executive'
    },
    technical: {
      src: '/icons/technical-architecture.svg',
      alt: 'Technical Architecture Icon',
      category: 'technical'
    }
  }
};

// Image SEO optimization
export const generateImageSEO = (image, context = {}) => {
  return {
    itemProp: 'image',
    'data-seo-title': image.seo?.title || image.alt,
    'data-seo-description': image.seo?.description || image.alt,
    'data-context': context.page || 'portfolio',
    'data-priority': context.priority || 'normal'
  };
};

// Responsive image srcSet generation
export const generateResponsiveSrcSet = (baseSrc, sizes = [400, 800, 1200]) => {
  return sizes.map(size => `${baseSrc}?w=${size}&q=85 ${size}w`).join(', ');
};

// Performance monitoring for images
export const trackImagePerformance = (imageSrc, loadTime) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'image_load_time', {
      event_category: 'Performance',
      event_label: imageSrc,
      value: Math.round(loadTime),
      custom_parameter_1: 'image_optimization'
    });
  }
};

export default imageOptimization;