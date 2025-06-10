export async function fetchDriversWithToken(): Promise<any[]> {
  const baseUrl = process.env.NEXT_PUBLIC_Backend_BaseURL;

  if (!baseUrl) {
    throw new Error("Base URL is not defined in environment variables.");
  }

  const response = await fetch(`${baseUrl}/api/external/drivers`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch drivers: ${response.statusText}`);
  }

  const json = await response.json();
  return json.data;
}

export async function fetchConductorsWithToken(): Promise<any[]> {
  const baseUrl = process.env.NEXT_PUBLIC_Backend_BaseURL;

  if (!baseUrl) {
    throw new Error("Base URL is not defined in environment variables.");
  }

  const response = await fetch(`${baseUrl}/api/external/conductors`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch conductors: ${response.statusText}`);
  }

  const json = await response.json();
  return json.data;
}

export async function fetchBusesWithToken(): Promise<any[]> {
  const baseUrl = process.env.NEXT_PUBLIC_Backend_BaseURL;

  if (!baseUrl) {
    throw new Error("Base URL is not defined in environment variables.");
  }

  const response = await fetch(`${baseUrl}/api/external/buses`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch buses: ${response.statusText}`);
  }

  const json = await response.json();
  return json.data;
}

export async function fetchDriverById(driverId: string): Promise<{ id: string; name: string } | null> {
  const baseUrl = process.env.NEXT_PUBLIC_Backend_BaseURL;

  if (!baseUrl) throw new Error("Base URL is not defined in environment variables.");

  const response = await fetch(`${baseUrl}/api/external/drivers/${driverId}`, {
    credentials: 'include',
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

  if (!baseUrl) throw new Error("Base URL is not defined in environment variables.");

  const response = await fetch(`${baseUrl}/api/external/conductors/${conductorId}`, {
    credentials: 'include',
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

  if (!baseUrl) throw new Error("Base URL is not defined in environment variables.");

  const response = await fetch(`${baseUrl}/api/external/buses/${busId}`, {
    credentials: 'include',
  });

  if (!response.ok) {
    console.warn(`Failed to fetch bus ${busId}: ${response.statusText}`);
    return null;
  }

  const json = await response.json();
  return json.data || null;
}