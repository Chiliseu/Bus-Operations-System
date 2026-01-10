/**
 * Bootstrap Authentication
 * 
 * Rehydrates authentication state on app startup by:
 * 1. Checking for refreshToken cookie (via /api/auth/refresh)
 * 2. Getting new accessToken if refresh token exists
 * 3. Storing accessToken in memory (authStore)
 * 
 * Call this ONCE on app initialization before any API calls.
 * 
 * Usage:
 * ```ts
 * import { bootstrapAuth } from '@/lib/auth/bootstrap-auth';
 * 
 * // In your app initialization (e.g., Token_Generation component)
 * await bootstrapAuth();
 * ```
 */

import { authStore } from './auth-store';

/**
 * Initialize authentication state from refreshToken cookie.
 * 
 * @returns Promise<boolean> - True if authentication succeeded, false otherwise
 */
export async function bootstrapAuth(): Promise<boolean> {
  try {
    console.log('[bootstrap] Attempting to restore authentication...');

    // Call our own refresh endpoint (which reads httpOnly cookie)
    const res = await fetch('/api/auth/refresh', {
      method: 'POST',
      credentials: 'include', // Important: includes httpOnly cookies
    });

    if (!res.ok) {
      console.warn('[bootstrap] No valid refresh token found');
      authStore.clear();
      return false;
    }

    const { accessToken } = await res.json();

    if (!accessToken) {
      console.error('[bootstrap] Refresh succeeded but no accessToken returned');
      return false;
    }

    // Store accessToken in memory
    authStore.setAccessToken(accessToken);
    console.log('[bootstrap] Authentication restored successfully');
    return true;
  } catch (error) {
    console.error('[bootstrap] Error during auth bootstrap:', error);
    authStore.clear();
    return false;
  }
}

/**
 * Optional: Request token from parent frame (for microfrontend architecture).
 * 
 * If your app runs as a microfrontend inside an iframe, the parent
 * frame can provide the token via postMessage.
 * 
 * @returns Promise<string | null> - Access token from parent or null
 */
export async function requestTokenFromParent(): Promise<string | null> {
  // Check if we're in an iframe
  if (window.parent === window) {
    return null;
  }

  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      console.warn('[bootstrap] Parent frame token request timed out');
      resolve(null);
    }, 2000);

    const handler = (event: MessageEvent) => {
      // Validate origin if needed
      // if (event.origin !== 'https://expected-parent.com') return;

      if (event.data?.type === 'AUTH_TOKEN') {
        clearTimeout(timeout);
        window.removeEventListener('message', handler);
        resolve(event.data.accessToken);
      }
    };

    window.addEventListener('message', handler);

    // Request token from parent
    window.parent.postMessage({ type: 'REQUEST_TOKEN' }, '*');
  });
}

/**
 * Bootstrap with microfrontend support.
 * 
 * Attempts to get token from parent frame first (if in iframe),
 * then falls back to cookie-based refresh.
 */
export async function bootstrapAuthWithMicrofrontend(): Promise<boolean> {
  // Try parent frame first
  if (window.parent !== window) {
    console.log('[bootstrap] Attempting parent frame token...');
    const token = await requestTokenFromParent();
    
    if (token) {
      authStore.setAccessToken(token);
      console.log('[bootstrap] Token received from parent frame');
      return true;
    }
  }

  // Fallback to cookie-based refresh
  console.log('[bootstrap] Falling back to cookie-based refresh');
  return bootstrapAuth();
}
