import { DASHBOARD_URL } from '@/lib/urls';
import { apiFetch } from '@/lib/api-fetch';

/**
 * Fetch dashboard summary with automatic token refresh.
 * 
 * Uses apiFetch which:
 * - Automatically adds Authorization header with accessToken
 * - Refreshes token on 401 errors
 * - Includes credentials for refreshToken cookie
 */
export async function fetchDashboardSummary(): Promise<{
  earnings: { month: number; year: number; data: number[] };
  busStatus: { NotStarted: number; NotReady: number; InOperation: number };
  topRoutes: { [routeName: string]: number };
}> {
  const response = await apiFetch(DASHBOARD_URL, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch dashboard summary: ${response.statusText}`);
  }

  return await response.json();
}