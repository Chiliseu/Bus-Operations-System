import { ROUTE_MANAGEMENT_FULL_URL, ROUTE_MANAGEMENT_URL } from '@/lib/urls';

export async function fetchRoutesWithToken(): Promise<any[]> {
  const baseUrl = process.env.NEXT_PUBLIC_Backend_BaseURL;

  if (!baseUrl) {
    throw new Error("Base URL is not defined in environment variables.");
  }

  const response = await fetch(ROUTE_MANAGEMENT_FULL_URL, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch routes: ${response.statusText}`);
  }

  return await response.json();
}

export async function createRouteWithToken(route: {
  RouteName: string;
  StartStopID: string;
  EndStopID: string;
  RouteStops: { StopID: string; StopOrder: number }[];
}): Promise<boolean> {
  const baseUrl = process.env.NEXT_PUBLIC_Backend_BaseURL;

  if (!baseUrl) {
    throw new Error("Base URL is not defined in environment variables.");
  }

  const response = await fetch(ROUTE_MANAGEMENT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(route),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || `Failed to create route: ${response.statusText}`);
  }

  return true;
}

export async function updateRouteWithToken(route: {
  RouteID: string;
  RouteName: string;
  StartStopID: string;
  EndStopID: string;
  RouteStops: { StopID: string; StopOrder: number }[];
}): Promise<boolean> {
  const baseUrl = process.env.NEXT_PUBLIC_Backend_BaseURL;

  if (!baseUrl) {
    throw new Error("Base URL is not defined in environment variables.");
  }

  const response = await fetch(`${ROUTE_MANAGEMENT_URL}/${route.RouteID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(route),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || `Failed to update route: ${response.statusText}`);
  }

  return true;
}

export async function deleteRouteWithToken(routeID: string): Promise<boolean> {
  const baseUrl = process.env.NEXT_PUBLIC_Backend_BaseURL;

  if (!baseUrl) {
    throw new Error("Base URL is not defined in environment variables.");
  }

  const response = await fetch(`${ROUTE_MANAGEMENT_URL}/${routeID}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ IsDeleted: true }),
  });

  if (!response.ok) {
    try {
      const errorData = await response.json();
      throw new Error(errorData.error || `Failed to delete route: ${response.statusText}`);
    } catch {
      throw new Error(`Failed to delete route: ${response.statusText}`);
    }
  }

  return true;
}

export async function fetchRoutesModalWithToken(): Promise<any[]> {
  const baseUrl = process.env.NEXT_PUBLIC_Backend_BaseURL;

  if (!baseUrl) {
    throw new Error("Base URL is not defined in environment variables.");
  }

  const response = await fetch(ROUTE_MANAGEMENT_URL, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch routes: ${response.statusText}`);
  }

  return await response.json();
}