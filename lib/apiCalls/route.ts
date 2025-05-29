export async function fetchRoutesWithToken(): Promise<any[]> {
  const baseUrl = process.env.NEXT_PUBLIC_Backend_BaseURL;
  const token = localStorage.getItem("backend_token");

  if (!baseUrl) {
    throw new Error("Base URL is not defined in environment variables.");
  }

  if (!token) {
    throw new Error("No backend token found in localStorage.");
  }

  const response = await fetch(`${baseUrl}/api/route-management/full`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
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
  const token = localStorage.getItem("backend_token");

  if (!baseUrl) {
    throw new Error("Base URL is not defined in environment variables.");
  }

  if (!token) {
    throw new Error("No backend token found in localStorage.");
  }

  const response = await fetch(`${baseUrl}/api/route-management`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
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
  const token = localStorage.getItem("backend_token");

  if (!baseUrl) {
    throw new Error("Base URL is not defined in environment variables.");
  }

  if (!token) {
    throw new Error("No backend token found in localStorage.");
  }

  const response = await fetch(`${baseUrl}/api/route-management/${route.RouteID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
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
  const token = localStorage.getItem("backend_token");

  if (!baseUrl) {
    throw new Error("Base URL is not defined in environment variables.");
  }

  if (!token) {
    throw new Error("No backend token found in localStorage.");
  }

  const response = await fetch(`${baseUrl}/api/route-management/${routeID}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
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
  const token = localStorage.getItem("backend_token");

  if (!baseUrl) {
    throw new Error("Base URL is not defined in environment variables.");
  }

  if (!token) {
    throw new Error("No backend token found in localStorage.");
  }

  const response = await fetch(`${baseUrl}/api/route-management`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch routes: ${response.statusText}`);
  }

  return await response.json();
}