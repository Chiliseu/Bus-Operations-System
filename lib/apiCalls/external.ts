export async function fetchDriversWithToken(): Promise<any[]> {
  const baseUrl = process.env.NEXT_PUBLIC_Backend_BaseURL;
  const token = localStorage.getItem("backend_token");

  if (!baseUrl) {
    throw new Error("Base URL is not defined in environment variables.");
  }

  if (!token) {
    throw new Error("No backend token found in localStorage.");
  }

  const response = await fetch(`${baseUrl}/api/external/drivers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch drivers: ${response.statusText}`);
  }

  const json = await response.json();
  return json.data;
}

export async function fetchConductorsWithToken(): Promise<any[]> {
  const baseUrl = process.env.NEXT_PUBLIC_Backend_BaseURL;
  const token = localStorage.getItem("backend_token");

  if (!baseUrl) {
    throw new Error("Base URL is not defined in environment variables.");
  }

  if (!token) {
    throw new Error("No backend token found in localStorage.");
  }

  const response = await fetch(`${baseUrl}/api/external/conductors`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch conductors: ${response.statusText}`);
  }

  const json = await response.json();
  return json.data;
}

export async function fetchBusesWithToken(): Promise<any[]> {
  const baseUrl = process.env.NEXT_PUBLIC_Backend_BaseURL;
  const token = localStorage.getItem("backend_token");

  if (!baseUrl) {
    throw new Error("Base URL is not defined in environment variables.");
  }

  if (!token) {
    throw new Error("No backend token found in localStorage.");
  }

  const response = await fetch(`${baseUrl}/api/external/buses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch buses: ${response.statusText}`);
  }

  const json = await response.json();
  return json.data;
}

export async function fetchDriverById(driverId: string): Promise<{ id: string; name: string } | null> {
  const baseUrl = process.env.NEXT_PUBLIC_Backend_BaseURL;
  const token = localStorage.getItem("backend_token");

  if (!baseUrl) throw new Error("Base URL is not defined in environment variables.");
  if (!token) throw new Error("No backend token found in localStorage.");

  const response = await fetch(`${baseUrl}/api/external/drivers/${driverId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    console.warn(`Failed to fetch driver ${driverId}: ${response.statusText}`);
    return null;
  }

  const json = await response.json();
  return json.data || null;
}

export async function fetchConductorById(conductorId: string): Promise<{ id: string; name: string } | null> {
  const baseUrl = process.env.NEXT_PUBLIC_Backend_BaseURL;
  const token = localStorage.getItem("backend_token");

  if (!baseUrl) throw new Error("Base URL is not defined in environment variables.");
  if (!token) throw new Error("No backend token found in localStorage.");

  const response = await fetch(`${baseUrl}/api/external/conductors/${conductorId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    console.warn(`Failed to fetch conductor ${conductorId}: ${response.statusText}`);
    return null;
  }

  const json = await response.json();
  return json.data || null;
}

export async function fetchBusById(busId: string): Promise<{ busId: string; license_plate: string } | null> {
  const baseUrl = process.env.NEXT_PUBLIC_Backend_BaseURL;
  const token = localStorage.getItem("backend_token");

  if (!baseUrl) throw new Error("Base URL is not defined in environment variables.");
  if (!token) throw new Error("No backend token found in localStorage.");

  const response = await fetch(`${baseUrl}/api/external/buses/${busId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    console.warn(`Failed to fetch bus ${busId}: ${response.statusText}`);
    return null;
  }

  const json = await response.json();
  return json.data || null;
}