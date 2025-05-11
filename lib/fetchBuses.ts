export async function fetchBuses() {
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/buses`;
  
    const res = await fetch(url, {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
      },
    });
  
    if (!res.ok) {
      throw new Error(`Failed to fetch buses: ${res.statusText}`);
    }
  
    return await res.json();
  }
  
// Function to fetch a single bus by its BusID
export async function fetchBusById(busId: string) {
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/buses?BusID=eq.${busId}`;

  const res = await fetch(url, {
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch bus with ID ${busId}: ${res.statusText}`);
  }

  const data = await res.json();
  
  // If the result contains data, return the first entry
  return data.length > 0 ? data[0] : null;
}