/**
 * Utility functions for handling URLs consistently across environments
 */

/**
 * Normalizes an image URL to work consistently across localhost and production
 * @param {string} url - The image URL to normalize
 * @returns {string} A normalized URL that works in both environments
 */
function normalizeImageUrl(url) {
  if (!url) return '';
  
  // If it's already an absolute URL (http/https), return as-is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // If it starts with /, it's a relative URL from root - return as-is
  if (url.startsWith('/')) {
    return url;
  }
  
  // Otherwise, ensure it starts with /
  return '/' + url;
}

/**
 * Gets the current environment (localhost or production)
 * @returns {'localhost'|'production'} The current environment
 */
function getCurrentEnvironment() {
  if (typeof window !== 'undefined') {
    return window.location.hostname === 'localhost' ? 'localhost' : 'production';
  }
  
  // Server-side detection
  return typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'development' ? 'localhost' : 'production';
}

/**
 * Converts an absolute URL to a relative URL for storage
 * This helps ensure URLs work across different environments
 * @param {string} url - The URL to convert
 * @returns {string} A relative URL suitable for storage
 */
function toRelativeUrl(url) {
  if (!url) return '';
  
  // If it's already relative, return as-is
  if (!url.startsWith('http')) {
    return normalizeImageUrl(url);
  }
  
  try {
    const urlObj = new URL(url);
    // Return just the pathname (relative part)
    return urlObj.pathname;
  } catch (error) {
    console.warn('Invalid URL provided to toRelativeUrl:', url);
    return url;
  }
}

/**
 * Creates a full URL from a relative path for the current environment
 * @param {string} relativePath - The relative path
 * @returns {string} A full URL for the current environment
 */
function toAbsoluteUrl(relativePath) {
  if (!relativePath) return '';
  
  // If it's already absolute, return as-is
  if (relativePath.startsWith('http')) {
    return relativePath;
  }
  
  // Normalize the path first
  const normalizedPath = normalizeImageUrl(relativePath);
  
  // If we're in the browser, use the current origin
  if (typeof window !== 'undefined') {
    return window.location.origin + normalizedPath;
  }
  
  // Server-side: return the normalized path (will be resolved by the browser)
  return normalizedPath;
}

// Export functions for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    normalizeImageUrl,
    getCurrentEnvironment,
    toRelativeUrl,
    toAbsoluteUrl
  };
}

// Make available globally for browser usage
if (typeof window !== 'undefined') {
  window.normalizeImageUrl = normalizeImageUrl;
  window.getCurrentEnvironment = getCurrentEnvironment;
  window.toRelativeUrl = toRelativeUrl;
  window.toAbsoluteUrl = toAbsoluteUrl;
  
  // Also create a namespace object
  window.UrlUtils = {
    normalizeImageUrl,
    getCurrentEnvironment,
    toRelativeUrl,
    toAbsoluteUrl
  };
}