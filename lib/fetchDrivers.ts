export async function fetchDrivers() {
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/drivers`;
  
    const res = await fetch(url, {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
      },
    });
  
    if (!res.ok) {
      throw new Error(`Failed to fetch drivers: ${res.statusText}`);
    }
  
    return await res.json();
  }

export async function fetchDriverById(driverId: string) {

const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/drivers?driver_id=eq.${driverId}`;

  const res = await fetch(url, {
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch driver: ${res.statusText}`);
  }

  const drivers = await res.json();

  // Assuming there's only one driver with the given ID
  return drivers.length > 0 ? drivers[0] : null;
  }
