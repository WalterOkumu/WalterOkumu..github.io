/**
 * Safe environment variable utilities with fallbacks and validation
 * Prevents runtime errors from missing or invalid environment variables
 */

/**
 * Safely get environment variable with fallback
 * @param {string} key - Environment variable key
 * @param {string} fallback - Fallback value if env var is missing
 * @param {boolean} required - Whether the variable is required (logs warning if missing)
 * @returns {string} - Environment variable value or fallback
 */
export const getEnvVar = (key, fallback = '', required = false) => {
  try {
    const value = process.env[key];
    
    if (!value || value.trim() === '') {
      if (required && process.env.NODE_ENV === 'development') {
        console.warn(`Missing required environment variable: ${key}`);
      }
      return fallback;
    }
    
    return value.trim();
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(`Error accessing environment variable ${key}:`, error);
    }
    return fallback;
  }
};

/**
 * Get URL environment variable with validation
 * @param {string} key - Environment variable key
 * @param {string} fallback - Fallback URL
 * @param {boolean} required - Whether the URL is required
 * @returns {string} - Valid URL or fallback
 */
export const getUrlEnvVar = (key, fallback = '', required = false) => {
  const value = getEnvVar(key, fallback, required);
  
  // Validate URL format
  try {
    if (value && value !== fallback) {
      new URL(value); // Will throw if invalid
    }
    return value;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Invalid URL in environment variable ${key}: ${value}`);
    }
    return fallback;
  }
};

/**
 * Get email environment variable with validation
 * @param {string} key - Environment variable key
 * @param {string} fallback - Fallback email
 * @param {boolean} required - Whether the email is required
 * @returns {string} - Valid email or fallback
 */
export const getEmailEnvVar = (key, fallback = '', required = false) => {
  const value = getEnvVar(key, fallback, required);
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (value && value !== fallback && !emailRegex.test(value)) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Invalid email in environment variable ${key}: ${value}`);
    }
    return fallback;
  }
  
  return value;
};

/**
 * Get boolean environment variable with safe parsing
 * @param {string} key - Environment variable key
 * @param {boolean} fallback - Fallback boolean value
 * @returns {boolean} - Parsed boolean value or fallback
 */
export const getBoolEnvVar = (key, fallback = false) => {
  const value = getEnvVar(key, fallback.toString());
  
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true' || value === '1';
  }
  
  return fallback;
};

/**
 * Get numeric environment variable with validation
 * @param {string} key - Environment variable key
 * @param {number} fallback - Fallback numeric value
 * @param {number} min - Minimum allowed value
 * @param {number} max - Maximum allowed value
 * @returns {number} - Parsed number or fallback
 */
export const getNumericEnvVar = (key, fallback = 0, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) => {
  const value = getEnvVar(key, fallback.toString());
  
  try {
    const numValue = parseInt(value, 10);
    
    if (isNaN(numValue) || numValue < min || numValue > max) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Invalid numeric value in environment variable ${key}: ${value} (min: ${min}, max: ${max})`);
      }
      return fallback;
    }
    
    return numValue;
  } catch (error) {
    return fallback;
  }
};

// Common environment variables with safe defaults
export const ENV = {
  // Site Configuration
  SITE_URL: getUrlEnvVar('NEXT_PUBLIC_SITE_URL', 'https://walterokumu.github.io/walter-okumu-portfolio', true),
  
  // Social Links
  LINKEDIN_URL: getUrlEnvVar('NEXT_PUBLIC_LINKEDIN', 'https://linkedin.com/in/walter-okumu'),
  GITHUB_URL: getUrlEnvVar('NEXT_PUBLIC_GITHUB', 'https://github.com/walter-okumu'),
  
  // Contact Information
  EMAIL: getEmailEnvVar('NEXT_PUBLIC_EMAIL', 'okumu.oriaro@gmail.com'),
  PHONE: getEnvVar('NEXT_PUBLIC_PHONE', '+254715680932'),
  
  // Analytics
  GA_ID: getEnvVar('NEXT_PUBLIC_GA_ID'),
  YANDEX_METRICA_ID: getEnvVar('NEXT_PUBLIC_YANDEX_METRICA_ID'),
  
  // SEO & Verification
  GOOGLE_SITE_VERIFICATION: getEnvVar('GOOGLE_SITE_VERIFICATION'),
  YANDEX_VERIFICATION: getEnvVar('YANDEX_VERIFICATION'),
  BING_VERIFICATION: getEnvVar('BING_VERIFICATION'),
  
  // Business Configuration
  RESPONSE_TIME: getEnvVar('NEXT_PUBLIC_RESPONSE_TIME', '24 hours'),
  
  // Feature Flags
  ENABLE_ANALYTICS: getBoolEnvVar('NEXT_PUBLIC_ENABLE_ANALYTICS', true),
  ENABLE_CONTACT_FORM: getBoolEnvVar('NEXT_PUBLIC_ENABLE_CONTACT_FORM', true),
  
  // Development
  NODE_ENV: getEnvVar('NODE_ENV', 'production'),
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
};

/**
 * Validate all required environment variables on app startup
 * @returns {object} - Validation result with missing variables
 */
export const validateEnvironment = () => {
  const requiredVars = [
    'NEXT_PUBLIC_SITE_URL',
  ];
  
  const missing = [];
  const invalid = [];
  
  requiredVars.forEach(key => {
    const value = process.env[key];
    if (!value || value.trim() === '') {
      missing.push(key);
    } else {
      // Additional validation for specific types
      if (key.includes('URL')) {
        try {
          new URL(value);
        } catch {
          invalid.push(`${key}: Invalid URL format`);
        }
      }
    }
  });
  
  return {
    isValid: missing.length === 0 && invalid.length === 0,
    missing,
    invalid,
    warnings: missing.length > 0 || invalid.length > 0
  };
};

/**
 * Log environment validation results
 */
export const logEnvironmentStatus = () => {
  if (ENV.IS_DEVELOPMENT) {
    const validation = validateEnvironment();
    
    if (validation.warnings) {
      console.group('🔧 Environment Variables Status');
      
      if (validation.missing.length > 0) {
        console.warn('❌ Missing required variables:', validation.missing);
      }
      
      if (validation.invalid.length > 0) {
        console.warn('⚠️ Invalid variables:', validation.invalid);
      }
      
      console.info('✅ Using fallback values where appropriate');
      console.groupEnd();
    } else {
      console.info('✅ All environment variables are properly configured');
    }
  }
};

export default ENV;