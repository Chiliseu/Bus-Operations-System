export async function fetchAllTicketTypes(): Promise<any[]> {
  const baseUrl = process.env.NEXT_PUBLIC_Backend_BaseURL;

  if (!baseUrl) {
    throw new Error("Base URL is not defined in environment variables.");
  }

  const response = await fetch(`${baseUrl}/api/ticket-types`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ticket types: ${response.statusText}`);
  }

  return await response.json();
}