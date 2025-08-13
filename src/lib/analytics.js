// Analytics tracking utilities for GA4 and Yandex Metrica

/**
 * Track custom events in Google Analytics 4 with error handling
 * @param {string} eventName - Name of the event
 * @param {object} parameters - Event parameters
 */
export const trackEvent = (eventName, parameters = {}) => {
  try {
    if (
      typeof window !== 'undefined' &&
      typeof window.gtag !== 'undefined' &&
      typeof process.env.NEXT_PUBLIC_GA_ID !== 'undefined' &&
      process.env.NEXT_PUBLIC_GA_ID
    ) {
      window.gtag('event', eventName, {
        ...parameters,
        timestamp: new Date().toISOString(),
      });
    }
  } catch (error) {
    // Silently handle analytics errors to prevent breaking user experience
    if (process.env.NODE_ENV === 'development') {
      console.warn('Analytics tracking error:', error);
    }
  }
};

/**
 * Track page views
 * @param {string} pagePath - Path of the page
 * @param {string} pageTitle - Title of the page
 */
export const trackPageView = (pagePath, pageTitle) => {
  if (
    typeof window !== 'undefined' &&
    typeof window.gtag !== 'undefined' &&
    typeof process.env.NEXT_PUBLIC_GA_ID !== 'undefined' &&
    process.env.NEXT_PUBLIC_GA_ID
  ) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
      page_path: pagePath,
      page_title: pageTitle,
    });
  }
};

/**
 * Track conversion events with comprehensive error handling
 * @param {string} conversionType - Type of conversion
 * @param {object} conversionData - Conversion data
 */
export const trackConversion = (conversionType, conversionData = {}) => {
  try {
    trackEvent('conversion', {
      event_category: 'conversion',
      event_label: conversionType,
      conversion_type: conversionType,
      ...conversionData,
    });

    // Yandex Metrica goal tracking with error handling
    if (
      typeof window !== 'undefined' &&
      typeof window.ym !== 'undefined' &&
      typeof process.env.NEXT_PUBLIC_YANDEX_METRICA_ID !== 'undefined' &&
      process.env.NEXT_PUBLIC_YANDEX_METRICA_ID
    ) {
      window.ym(process.env.NEXT_PUBLIC_YANDEX_METRICA_ID, 'reachGoal', conversionType, conversionData);
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Conversion tracking error:', error);
    }
  }
};

/**
 * Track user engagement
 * @param {string} engagementType - Type of engagement
 * @param {object} engagementData - Engagement data
 */
export const trackEngagement = (engagementType, engagementData = {}) => {
  trackEvent('engagement', {
    event_category: 'engagement',
    event_label: engagementType,
    engagement_type: engagementType,
    ...engagementData,
  });
};

/**
 * Track form interactions
 * @param {string} formName - Name of the form
 * @param {string} action - Action performed (start, complete, abandon)
 * @param {object} formData - Form data
 */
export const trackFormInteraction = (formName, action, formData = {}) => {
  trackEvent('form_interaction', {
    event_category: 'form',
    event_label: `${formName}_${action}`,
    form_name: formName,
    form_action: action,
    ...formData,
  });

  // Track as conversion if form is completed
  if (action === 'complete') {
    trackConversion('form_submission', {
      form_name: formName,
      ...formData,
    });
  }
};

/**
 * Track CTA clicks
 * @param {string} ctaLocation - Location of the CTA
 * @param {string} ctaText - Text of the CTA
 * @param {string} destination - Destination URL
 */
export const trackCTAClick = (ctaLocation, ctaText, destination) => {
  trackEvent('cta_click', {
    event_category: 'engagement',
    event_label: `${ctaLocation}_${ctaText}`,
    cta_location: ctaLocation,
    cta_text: ctaText,
    cta_destination: destination,
  });
};

/**
 * Track file downloads
 * @param {string} fileName - Name of the downloaded file
 * @param {string} fileType - Type of the file
 * @param {string} downloadLocation - Location where download was initiated
 */
export const trackDownload = (fileName, fileType, downloadLocation) => {
  trackEvent('file_download', {
    event_category: 'engagement',
    event_label: `${fileType}_download`,
    file_name: fileName,
    file_type: fileType,
    download_location: downloadLocation,
  });

  // Track document downloads as conversions
  if (fileType === 'pdf' || fileType === 'doc') {
    trackConversion('document_download', {
      file_name: fileName,
      download_location: downloadLocation,
    });
  }
};

/**
 * Track external link clicks
 * @param {string} linkUrl - URL of the external link
 * @param {string} linkText - Text of the link
 * @param {string} linkLocation - Location of the link
 */
export const trackExternalLink = (linkUrl, linkText, linkLocation) => {
  trackEvent('external_link_click', {
    event_category: 'engagement',
    event_label: linkUrl,
    link_url: linkUrl,
    link_text: linkText,
    link_location: linkLocation,
  });
};

/**
 * Track scroll depth
 * @param {number} percentage - Scroll percentage
 */
export const trackScrollDepth = (percentage) => {
  trackEvent('scroll_depth', {
    event_category: 'engagement',
    event_label: `${percentage}%`,
    scroll_percentage: percentage,
  });
};

/**
 * Track video interactions
 * @param {string} videoTitle - Title of the video
 * @param {string} action - Action performed (play, pause, complete)
 * @param {number} currentTime - Current time in video
 */
export const trackVideoInteraction = (videoTitle, action, currentTime = 0) => {
  trackEvent('video_interaction', {
    event_category: 'engagement',
    event_label: `${videoTitle}_${action}`,
    video_title: videoTitle,
    video_action: action,
    video_current_time: currentTime,
  });
};

/**
 * Track search interactions
 * @param {string} searchTerm - Search term used
 * @param {number} resultsCount - Number of results
 */
export const trackSearch = (searchTerm, resultsCount = 0) => {
  trackEvent('search', {
    event_category: 'engagement',
    event_label: searchTerm,
    search_term: searchTerm,
    search_results_count: resultsCount,
  });
};

/**
 * Track performance metrics
 * @param {object} metrics - Performance metrics
 */
export const trackPerformance = (metrics) => {
  trackEvent('performance_metrics', {
    event_category: 'performance',
    ...metrics,
  });
};

/**
 * Initialize scroll tracking
 */
export const initScrollTracking = () => {
  if (typeof window === 'undefined') return;

  let scrollTracked = {
    25: false,
    50: false,
    75: false,
    90: false,
  };

  const handleScroll = () => {
    const scrollPercent = Math.round(
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
    );

    Object.keys(scrollTracked).forEach(threshold => {
      if (scrollPercent >= threshold && !scrollTracked[threshold]) {
        scrollTracked[threshold] = true;
        trackScrollDepth(threshold);
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  return () => window.removeEventListener('scroll', handleScroll);
};

/**
 * Track time on page
 */
export const trackTimeOnPage = () => {
  if (typeof window === 'undefined') return;

  const startTime = Date.now();
  let tracked30s = false;
  let tracked60s = false;
  let tracked180s = false;

  const trackTime = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);

    if (timeSpent >= 30 && !tracked30s) {
      tracked30s = true;
      trackEngagement('time_on_page_30s', { time_spent: timeSpent });
    }

    if (timeSpent >= 60 && !tracked60s) {
      tracked60s = true;
      trackEngagement('time_on_page_60s', { time_spent: timeSpent });
    }

    if (timeSpent >= 180 && !tracked180s) {
      tracked180s = true;
      trackEngagement('time_on_page_180s', { time_spent: timeSpent });
    }
  };

  const interval = setInterval(trackTime, 10000); // Check every 10 seconds

  // Track on page unload
  const handleUnload = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    trackEvent('page_exit', {
      event_category: 'engagement',
      time_spent: timeSpent,
    });
    clearInterval(interval);
  };

  window.addEventListener('beforeunload', handleUnload);

  return () => {
    clearInterval(interval);
    window.removeEventListener('beforeunload', handleUnload);
  };
};

/**
 * Enhanced ecommerce tracking for goal funnels
 * @param {string} step - Current step in the funnel
 * @param {object} data - Additional data
 */
export const trackFunnelStep = (step, data = {}) => {
  trackEvent('funnel_step', {
    event_category: 'conversion_funnel',
    event_label: step,
    funnel_step: step,
    ...data,
  });
};

// Export all tracking functions
const analytics = {
  trackEvent,
  trackPageView,
  trackConversion,
  trackEngagement,
  trackFormInteraction,
  trackCTAClick,
  trackDownload,
  trackExternalLink,
  trackScrollDepth,
  trackVideoInteraction,
  trackSearch,
  trackPerformance,
  initScrollTracking,
  trackTimeOnPage,
  trackFunnelStep,
};

export default analytics;