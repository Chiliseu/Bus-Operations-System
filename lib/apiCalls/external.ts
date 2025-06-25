import { DRIVERS_FULL_URL, CONDUCTORS_FULL_URL, DRIVERS_URL, CONDUCTORS_URL } from '@/lib/urls';

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