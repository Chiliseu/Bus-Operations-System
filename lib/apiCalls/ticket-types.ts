export async function fetchAllTicketTypes(): Promise<any[]> {
  const baseUrl = process.env.NEXT_PUBLIC_Backend_BaseURL;
  const token = localStorage.getItem("backend_token");

  if (!baseUrl) {
    throw new Error("Base URL is not defined in environment variables.");
  }

  if (!token) {
    throw new Error("No backend token found in localStorage.");
  }

  const response = await fetch(`${baseUrl}/api/ticket-types`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ticket types: ${response.statusText}`);
  }

  return await response.json();
}