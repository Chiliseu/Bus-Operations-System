/**
 * Safe API Fetch Wrapper with Auto-Refresh
 * 
 * Features:
 * - Automatic token refresh on 401 errors
 * - Request queuing to prevent refresh storms
 * - Credentials included for cookie handling
 * - Drop-in replacement for native fetch
 * 
 * Usage:
 * ```ts
 * import { apiFetch } from '@/lib/api-fetch';
 * 
 * // Use exactly like fetch()
 * const response = await apiFetch('/api/users', {
 *   method: 'GET',
 * });
 * 
 * const data = await response.json();
 * ```
 * 
 * Security:
 * - accessToken from memory (authStore)
 * - refreshToken from httpOnly cookie
 * - No token exposure to client code
 * 
 * @module api-fetch
 */

import { authStore } from '@/lib/auth/auth-store';

let refreshing = false;
let queue: ((token: string) => void)[] = [];

/**
 * Refresh the access token using the refresh endpoint.
 * Queues concurrent requests to prevent multiple refresh calls.
 * 
 * @returns Promise<string> - New access token
 * @throws Error if refresh fails
 */
async function refreshToken(): Promise<string> {
  // If already refreshing, queue this request
  if (refreshing) {
    return new Promise((resolve) => {
      queue.push(resolve);
    });
  }

  refreshing = true;

  try {
    const res = await fetch('/api/auth/refresh', {
      method: 'POST',
      credentials: 'include',
    });

    if (!res.ok) {
      throw new Error('Refresh failed');
    }

    const { accessToken } = await res.json();
    authStore.setAccessToken(accessToken);

    // Resolve all queued requests
    queue.forEach((cb) => cb(accessToken));
    queue = [];

    return accessToken;
  } catch (error) {
    // Clear token and redirect to auth page on refresh failure
    authStore.clear();
    
    // Redirect to auth page
    if (typeof window !== 'undefined') {
      window.location.href = 'https://auth.agilabuscorp.me/authentication/login';
    }
    
    throw error;
  } finally {
    refreshing = false;
  }
}

/**
 * Enhanced fetch with automatic token refresh.
 * 
 * @param input - URL or Request object
 * @param init - Fetch options
 * @returns Promise<Response>
 * 
 * @example
 * const response = await apiFetch('/api/users', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({ name: 'John' }),
 * });
 */
export async function apiFetch(
  input: RequestInfo,
  init: RequestInit = {}
): Promise<Response> {
  const token = authStore.get().accessToken;

  // First attempt with current token
  const res = await fetch(input, {
    ...init,
    credentials: 'include',
    headers: {
      ...init.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  // If not 401, return response as-is
  if (res.status !== 401) {
    return res;
  }

  console.log('[apiFetch] Token expired (401), refreshing...');

  // Attempt to refresh token
  try {
    const newToken = await refreshToken();

    // Retry request with new token
    return fetch(input, {
      ...init,
      credentials: 'include',
      headers: {
        ...init.headers,
        Authorization: `Bearer ${newToken}`,
      },
    });
  } catch (error) {
    console.error('[apiFetch] Token refresh failed:', error);
    throw error;
  }
}

/**
 * Helper: Make a GET request
 */
export async function apiGet<T = any>(url: string): Promise<T> {
  const response = await apiFetch(url, { method: 'GET' });
  
  if (!response.ok) {
    throw new Error(`GET ${url} failed: ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Helper: Make a POST request
 */
export async function apiPost<T = any>(url: string, data?: any): Promise<T> {
  const response = await apiFetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data ? JSON.stringify(data) : undefined,
  });
  
  if (!response.ok) {
    throw new Error(`POST ${url} failed: ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Helper: Make a PUT request
 */
export async function apiPut<T = any>(url: string, data?: any): Promise<T> {
  const response = await apiFetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: data ? JSON.stringify(data) : undefined,
  });
  
  if (!response.ok) {
    throw new Error(`PUT ${url} failed: ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Helper: Make a DELETE request
 */
export async function apiDelete<T = any>(url: string): Promise<T> {
  const response = await apiFetch(url, { method: 'DELETE' });
  
  if (!response.ok) {
    throw new Error(`DELETE ${url} failed: ${response.statusText}`);
  }
  
  return response.json();
}
