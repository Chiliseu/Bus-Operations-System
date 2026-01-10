/**
 * Authentication Utilities
 * 
 * Helper functions for common auth operations.
 */

import { authStore } from './auth/auth-store';

/**
 * Logout user and redirect to auth page.
 * 
 * Performs:
 * 1. Call backend logout endpoint to clear refreshToken cookie
 * 2. Clear in-memory accessToken
 * 3. Redirect to auth page
 * 
 * Usage:
 * ```ts
 * import { logout } from '@/lib/auth-utils';
 * 
 * await logout();
 * ```
 */
export async function logout(): Promise<void> {
  try {
    // Call backend logout endpoint to clear refreshToken cookie
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
  } catch (error) {
    console.error('[logout] Error calling logout endpoint:', error);
  } finally {
    // Clear in-memory token
    authStore.clear();
    
    // Redirect to auth page
    if (typeof window !== 'undefined') {
      window.location.href = 'https://auth.agilabuscorp.me/authentication/login';
    }
  }
}

/**
 * Check if user is authenticated.
 * 
 * @returns boolean - True if accessToken exists in memory
 */
export function isAuthenticated(): boolean {
  return authStore.get().accessToken !== null;
}

/**
 * Get current access token.
 * 
 * @returns string | null - Current access token or null
 */
export function getAccessToken(): string | null {
  return authStore.get().accessToken;
}
