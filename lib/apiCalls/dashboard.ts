import { DASHBOARD_URL } from '@/lib/urls';

export async function fetchDashboardSummary(): Promise<{
  earnings: { month: number; year: number; data: number[] };
  busStatus: { NotStarted: number; NotReady: number; InOperation: number };
  topRoutes: { [routeName: string]: number };
}> {
  const baseUrl = process.env.NEXT_PUBLIC_Backend_BaseURL;

  if (!baseUrl) {
    throw new Error("Base URL is not defined in environment variables.");
  }

  const response = await fetch(DASHBOARD_URL, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch dashboard summary: ${response.statusText}`);
  }

  return await response.json();
}