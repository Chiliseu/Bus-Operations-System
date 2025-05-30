export async function fetchStopsWithToken(): Promise<any[]> {
  const baseUrl = process.env.NEXT_PUBLIC_Backend_BaseURL;
  const token = localStorage.getItem("backend_token");

  if (!baseUrl) {
    throw new Error("Base URL is not defined in environment variables.");
  }

  if (!token) {
    throw new Error("No backend token found in localStorage.");
  }

  const response = await fetch(`${baseUrl}/api/stops`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch stops: ${response.statusText}`);
  }

  return await response.json();
}

export async function createStopWithToken(stop: {
  name: string;
  latitude: string;
  longitude: string;
}): Promise<boolean> {
  const baseUrl = process.env.NEXT_PUBLIC_Backend_BaseURL;
  const token = localStorage.getItem("backend_token");

  if (!baseUrl) {
    throw new Error("Base URL is not defined in environment variables.");
  }

  if (!token) {
    throw new Error("No backend token found in localStorage.");
  }

  const newStop = {
    StopName: stop.name,
    longitude: stop.longitude,
    latitude: stop.latitude,
  };

  const response = await fetch(`${baseUrl}/api/stops`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newStop),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Backend error:', errorText);
    throw new Error('Failed to add stop');
  }

  return true;
}

export async function updateStopWithToken(stop: {
  id: string;
  name: string;
  latitude: string;
  longitude: string;
}): Promise<boolean> {
  const baseUrl = process.env.NEXT_PUBLIC_Backend_BaseURL;
  const token = localStorage.getItem("backend_token");

  if (!baseUrl) {
    throw new Error("Base URL is not defined in environment variables.");
  }

  if (!token) {
    throw new Error("No backend token found in localStorage.");
  }

  const updatedStop = {
    StopName: stop.name,
    latitude: stop.latitude,
    longitude: stop.longitude,
  };

  const response = await fetch(`${baseUrl}/api/stops/${stop.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedStop),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Failed to update stop: ${response.statusText}`);
  }

  return true;
}

export async function softDeleteStopWithToken(stopID: string): Promise<boolean> {
  const baseUrl = process.env.NEXT_PUBLIC_Backend_BaseURL;
  const token = localStorage.getItem("backend_token");

  if (!baseUrl) {
    throw new Error("Base URL is not defined in environment variables.");
  }

  if (!token) {
    throw new Error("No backend token found in localStorage.");
  }

  const response = await fetch(`${baseUrl}/api/stops/${stopID}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ IsDeleted: true }),
  });

  if (!response.ok) {
    throw new Error(`Failed to delete stop: ${response.statusText}`);
  }

  return true;
}
