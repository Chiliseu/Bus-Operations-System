import { DRIVERS_FULL_URL, CONDUCTORS_FULL_URL, DRIVERS_URL, CONDUCTORS_URL, DRIVERS_RENT_URL, BUSES_RENT_URL } from '@/lib/urls';

export async function fetchDriversWithToken(): Promise<any[]> {
  const baseUrl = process.env.NEXT_PUBLIC_Backend_BaseURL;

  if (!baseUrl) {
    throw new Error("Base URL is not defined in environment variables.");
  }

  const response = await fetch(DRIVERS_URL, {
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

  const response = await fetch(CONDUCTORS_URL, {
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

export async function fetchDriversFullWithToken(): Promise<any[]> {
  const baseUrl = process.env.NEXT_PUBLIC_Backend_BaseURL;

  if (!baseUrl) {
    throw new Error("Base URL is not defined in environment variables.");
  }

  const response = await fetch(DRIVERS_FULL_URL, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch drivers: ${response.statusText}`);
  }

  const json = await response.json();
  return json.data;
}

export async function fetchConductorsFullWithToken(): Promise<any[]> {
  const baseUrl = process.env.NEXT_PUBLIC_Backend_BaseURL;

  if (!baseUrl) {
    throw new Error("Base URL is not defined in environment variables.");
  }

  const response = await fetch(CONDUCTORS_FULL_URL, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch conductors: ${response.statusText}`);
  }

  const json = await response.json();
  return json.data;
}

export async function fetchBusesFullWithToken(): Promise<any[]> {
  const baseUrl = process.env.NEXT_PUBLIC_Backend_BaseURL;

  if (!baseUrl) {
    throw new Error("Base URL is not defined in environment variables.");
  }

  const response = await fetch(`${baseUrl}/api/external/buses/full`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch buses: ${response.statusText}`);
  }

  const json = await response.json();
  return json.data;
}

export async function fetchRentDriversWithToken(token: string, startDate?: string, duration?: number): Promise<any[]> {
  const baseUrl = process.env.NEXT_PUBLIC_Backend_BaseURL;
  if (!baseUrl) throw new Error("Base URL is not defined in environment variables.");

  const query = new URLSearchParams();
  if (startDate && duration) {
    query.append('startDate', startDate);
    query.append('duration', String(duration));
  }

  const response = await fetch(`${baseUrl}/api/external/drivers/rent?${query.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to fetch available rental drivers');
  }

  const json = await response.json();
  return json.data;
}

export async function fetchRentBusesWithToken(
  token: string,
  busType?: string,
  startDate?: string,
  duration?: number
): Promise<any[]> {
  const baseUrl = process.env.NEXT_PUBLIC_Backend_BaseURL;
  if (!baseUrl) throw new Error("Base URL is not defined in environment variables.");

  const query = new URLSearchParams();
  if (busType) query.append('busType', busType);
  if (startDate && duration) {
    query.append('startDate', startDate);
    query.append('duration', String(duration));
  }

  const response = await fetch(`${baseUrl}/api/external/buses/rent?${query.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to fetch available rental buses');
  }

  const json = await response.json();
  return json.data;
}
