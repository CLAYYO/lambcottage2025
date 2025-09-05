/**
 * Client-side security utilities for handling CSRF tokens and secure API calls
 */

class SecurityManager {
  constructor() {
    this.csrfTokens = null;
    this.CSRF_STORAGE_KEY = 'csrf_tokens';
    this.TOKEN_REFRESH_THRESHOLD = 5 * 60 * 1000; // 5 minutes
    this.loadStoredTokens();
  }

  /**
   * Load CSRF tokens from sessionStorage
   */
  loadStoredTokens() {
    try {
      const stored = sessionStorage.getItem(this.CSRF_STORAGE_KEY);
      if (stored) {
        const tokens = JSON.parse(stored);
        if (tokens.expires > Date.now()) {
          this.csrfTokens = tokens;
        } else {
          sessionStorage.removeItem(this.CSRF_STORAGE_KEY);
        }
      }
    } catch (error) {
      console.warn('Failed to load stored CSRF tokens:', error);
      sessionStorage.removeItem(this.CSRF_STORAGE_KEY);
    }
  }

  /**
   * Store CSRF tokens in sessionStorage
   */
  storeTokens(tokens) {
    try {
      sessionStorage.setItem(this.CSRF_STORAGE_KEY, JSON.stringify(tokens));
    } catch (error) {
      console.warn('Failed to store CSRF tokens:', error);
    }
  }

  /**
   * Fetch fresh CSRF tokens from the server
   */
  async fetchCSRFTokens() {
    const response = await fetch('/api/auth/csrf', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.getAuthToken()}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch CSRF tokens: ${response.status}`);
    }

    const data = await response.json();
    const tokens = {
      token: data.csrfToken,
      sessionId: data.sessionId,
      expires: Date.now() + (50 * 60 * 1000) // 50 minutes (tokens expire in 1 hour)
    };

    this.csrfTokens = tokens;
    this.storeTokens(tokens);
    return tokens;
  }

  /**
   * Get valid CSRF tokens, refreshing if necessary
   */
  async getCSRFTokens() {
    // Check if we need to refresh tokens
    if (!this.csrfTokens || 
        this.csrfTokens.expires - Date.now() < this.TOKEN_REFRESH_THRESHOLD) {
      return await this.fetchCSRFTokens();
    }

    return this.csrfTokens;
  }

  /**
   * Get authentication token from localStorage
   */
  getAuthToken() {
    return localStorage.getItem('auth_token');
  }

  /**
   * Make a secure API request with CSRF protection
   */
  async secureRequest(url, options = {}) {
    const authToken = this.getAuthToken();
    if (!authToken) {
      throw new Error('Authentication required');
    }

    // Get CSRF tokens for state-changing operations
    const needsCSRF = ['POST', 'PUT', 'DELETE', 'PATCH'].includes(
      (options.method || 'GET').toUpperCase()
    );

    const headers = new Headers(options.headers);
    headers.set('Authorization', `Bearer ${authToken}`);
    
    // Don't set Content-Type for FormData - let browser set it with boundary
    if (!(options.body instanceof FormData)) {
      headers.set('Content-Type', 'application/json');
    }

    if (needsCSRF) {
      try {
        const tokens = await this.getCSRFTokens();
        headers.set('X-CSRF-Token', tokens.token);
        headers.set('X-Session-ID', tokens.sessionId);
      } catch (error) {
        console.error('Failed to get CSRF tokens:', error);
        throw new Error('Security validation failed');
      }
    }

    return fetch(url, {
      ...options,
      headers
    });
  }

  /**
   * Handle API response and check for security errors
   */
  async handleResponse(response) {
    if (response.status === 401) {
      // Clear stored tokens and redirect to login
      this.clearTokens();
      window.location.href = '/admin/login';
      throw new Error('Authentication expired');
    }

    if (response.status === 403) {
      // CSRF token might be invalid, clear and retry once
      this.clearTokens();
      throw new Error('Security validation failed');
    }

    if (response.status === 429) {
      const data = await response.json().catch(() => ({}));
      const resetTime = data.resetTime ? new Date(data.resetTime).toLocaleTimeString() : 'soon';
      throw new Error(`Too many requests. Please try again at ${resetTime}`);
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || `Request failed: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Clear stored security tokens
   */
  clearTokens() {
    this.csrfTokens = null;
    sessionStorage.removeItem(this.CSRF_STORAGE_KEY);
  }

  /**
   * Sanitize user input on the client side
   */
  sanitizeInput(input) {
    return input
      .replace(/[<>"'&]/g, (char) => {
        const entities = {
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#x27;',
          '&': '&amp;'
        };
        return entities[char] || char;
      })
      .trim();
  }

  /**
   * Validate file before upload
   */
  validateFile(file) {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

    // Check file size
    if (file.size > maxSize) {
      return { valid: false, error: 'File size exceeds 5MB limit' };
    }

    // Check MIME type
    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: 'Invalid file type. Only images are allowed.' };
    }

    // Check file extension
    const extension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    if (!allowedExtensions.includes(extension)) {
      return { valid: false, error: 'Invalid file extension' };
    }

    // Check for potential malicious filenames
    if (file.name.includes('..') || file.name.includes('/') || file.name.includes('\\')) {
      return { valid: false, error: 'Invalid filename' };
    }

    return { valid: true };
  }
}

// Export singleton instance
const securityManager = new SecurityManager();

// Convenience functions
const secureRequest = (url, options) => 
  securityManager.secureRequest(url, options);

const handleResponse = (response) => 
  securityManager.handleResponse(response);

const sanitizeInput = (input) => 
  securityManager.sanitizeInput(input);

const validateFile = (file) => 
  securityManager.validateFile(file);

// Make available globally
window.SecurityManager = SecurityManager;
window.securityManager = securityManager;
window.secureRequest = secureRequest;
window.handleResponse = handleResponse;
window.sanitizeInput = sanitizeInput;
window.validateFile = validateFile;