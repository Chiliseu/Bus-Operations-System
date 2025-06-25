import { TICKET_TYPES_URL } from '@/lib/urls';

export async function fetchAllTicketTypes(): Promise<any[]> {
  const baseUrl = process.env.NEXT_PUBLIC_Backend_BaseURL;

  if (!baseUrl) {
    throw new Error("Base URL is not defined in environment variables.");
  }

  const response = await fetch(TICKET_TYPES_URL, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ticket types: ${response.statusText}`);
  }

  return await response.json();
}