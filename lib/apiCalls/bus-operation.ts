export async function fetchBusAssignmentsWithStatus(status?: string): Promise<any[]> {
  const baseUrl = process.env.NEXT_PUBLIC_Backend_BaseURL;
  console.log("Base URL:", baseUrl);
  const token = localStorage.getItem("backend_token");
  console.log("Token:", token);

  if (!baseUrl) {
    throw new Error("Base URL is not defined in environment variables.");
  }

  if (!token) {
    throw new Error("No backend token found in localStorage.");
  }

  const query = status ? `?status=${encodeURIComponent(status)}` : '';

  const url = `${baseUrl}/api/bus-operations${query}`;
  console.log("Fetch URL:", url);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("Response status:", response.status);

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(`Failed to fetch bus assignments: ${errorBody.error || response.statusText}`);
  }

  const data = await response.json();
  console.log("Fetched data:", data);
  return data;
}