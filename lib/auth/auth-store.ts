/**
 * In-memory authentication state store.
 * 
 * Security: No persistence to localStorage/sessionStorage.
 * State is cleared on page refresh and restored via silent refresh.
 * 
 * Features:
 * - Subscriber pattern for React integration
 * - Type-safe accessors
 * - Zero dependencies
 * 
 * Usage:
 * ```ts
 * import { authStore } from '@/lib/auth/auth-store';
 * 
 * // Get current state
 * const { accessToken } = authStore.get();
 * 
 * // Update state
 * authStore.setAccessToken('eyJhbGci...');
 * 
 * // Subscribe to changes (for React hooks)
 * const unsubscribe = authStore.subscribe(() => {
 *   console.log('Auth state changed');
 * });
 * ```
 */

type Listener = () => void;

interface AuthState {
  accessToken: string | null;
  tokenVersion: number;
}

const state: AuthState = {
  accessToken: null,
  tokenVersion: 0,
};

const listeners = new Set<Listener>();

function notify() {
  listeners.forEach((l) => l());
}

export const authStore = {
  /**
   * Get current authentication state.
   * @returns Current state object
   */
  get(): AuthState {
    return state;
  },

  /**
   * Set access token and notify subscribers.
   * @param token - JWT access token or null to clear
   */
  setAccessToken(token: string | null): void {
    state.accessToken = token;
    state.tokenVersion++;
    notify();
  },

  /**
   * Clear all authentication state.
   */
  clear(): void {
    state.accessToken = null;
    state.tokenVersion++;
    notify();
  },

  /**
   * Subscribe to state changes.
   * @param listener - Callback invoked on state changes
   * @returns Unsubscribe function
   */
  subscribe(listener: Listener): () => void {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};
