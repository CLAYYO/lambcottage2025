// URL utilities for image handling and normalization
// This file provides utilities for handling image URLs in both development and production

/**
 * Normalize an image URL to ensure it works in both development and production
 * @param {string} url - The image URL to normalize
 * @returns {string} - The normalized URL
 */
export function normalizeImageUrl(url) {
  if (!url) return '';
  
  // If it's already a full URL (http/https), return as-is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // If it's a relative URL starting with /, make it work with current origin
  if (url.startsWith('/')) {
    // In development, use localhost:4321
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      return `http://localhost:4321${url}`;
    }
    // In production, use current origin
    if (typeof window !== 'undefined') {
      return `${window.location.origin}${url}`;
    }
    // Fallback for server-side
    return url;
  }
  
  // If it's a relative URL without /, add the base path
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return `http://localhost:4321/${url}`;
  }
  
  return `/${url}`;
}

/**
 * Check if the current environment is localhost
 * @returns {boolean} - True if running on localhost
 */
export function isLocalhost() {
  if (typeof window === 'undefined') return false;
  return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
}

/**
 * Get the base URL for the current environment
 * @returns {string} - The base URL
 */
export function getBaseUrl() {
  if (typeof window === 'undefined') return '';
  
  if (isLocalhost()) {
    return 'http://localhost:4321';
  }
  
  return window.location.origin;
}

/**
 * Convert a relative URL to an absolute URL
 * @param {string} relativeUrl - The relative URL
 * @returns {string} - The absolute URL
 */
export function toAbsoluteUrl(relativeUrl) {
  if (!relativeUrl) return '';
  
  // Already absolute
  if (relativeUrl.startsWith('http://') || relativeUrl.startsWith('https://')) {
    return relativeUrl;
  }
  
  const baseUrl = getBaseUrl();
  
  // Handle URLs that start with /
  if (relativeUrl.startsWith('/')) {
    return `${baseUrl}${relativeUrl}`;
  }
  
  // Handle relative URLs
  return `${baseUrl}/${relativeUrl}`;
}

/**
 * Validate if an image URL is accessible
 * @param {string} url - The image URL to validate
 * @returns {Promise<boolean>} - True if the image is accessible
 */
export async function validateImageUrl(url) {
  if (!url) return false;
  
  try {
    const normalizedUrl = normalizeImageUrl(url);
    const response = await fetch(normalizedUrl, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.warn('Image validation failed:', error);
    return false;
  }
}

/**
 * Create a preview URL for uploaded images
 * @param {string} filename - The uploaded filename
 * @returns {string} - The preview URL
 */
export function createPreviewUrl(filename) {
  if (!filename) return '';
  
  // If filename is already a full URL, return as-is
  if (filename.startsWith('http://') || filename.startsWith('https://')) {
    return filename;
  }
  
  // Create the upload path
  const uploadPath = `/images/uploads/${filename}`;
  return normalizeImageUrl(uploadPath);
}

// Default export for convenience
export default {
  normalizeImageUrl,
  isLocalhost,
  getBaseUrl,
  toAbsoluteUrl,
  validateImageUrl,
  createPreviewUrl
};