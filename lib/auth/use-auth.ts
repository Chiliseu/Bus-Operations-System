/**
 * React Hook for Authentication State
 * 
 * Uses React 18's useSyncExternalStore for optimal performance
 * and automatic re-rendering when auth state changes.
 * 
 * Usage:
 * ```tsx
 * import { useAuth } from '@/lib/auth/use-auth';
 * 
 * function MyComponent() {
 *   const { accessToken, tokenVersion } = useAuth();
 *   
 *   if (!accessToken) {
 *     return <div>Please login</div>;
 *   }
 *   
 *   return <div>Welcome! Token: {accessToken.slice(0, 20)}...</div>;
 * }
 * ```
 * 
 * Benefits:
 * - Automatic re-render on auth changes
 * - No prop drilling
 * - Zero external dependencies
 * - SSR compatible
 */

'use client';

import { useSyncExternalStore } from 'react';
import { authStore } from './auth-store';

/**
 * Hook to access current authentication state.
 * Component will re-render whenever auth state changes.
 * 
 * @returns Current authentication state
 */
export function useAuth() {
  return useSyncExternalStore(
    authStore.subscribe,
    authStore.get,
    authStore.get
  );
}

/**
 * Hook to check if user is authenticated.
 * 
 * @returns boolean - True if accessToken exists
 */
export function useIsAuthenticated(): boolean {
  const { accessToken } = useAuth();
  return accessToken !== null;
}

/**
 * Hook to get the current access token.
 * 
 * @returns string | null - Current access token
 */
export function useAccessToken(): string | null {
  const { accessToken } = useAuth();
  return accessToken;
}
