export async function fetchConductors() {
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/conductors`;
  
    const res = await fetch(url, {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
      },
    });
  
    if (!res.ok) {
      throw new Error(`Failed to fetch conductors: ${res.statusText}`);
    }
  
    return await res.json();
  }

export async function fetchConductorById(conductorId: string) {

  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/conductors?conductor_id=eq.${conductorId}`;

  const res = await fetch(url, {
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch conductor: ${res.statusText}`);
  }

  const conductors = await res.json();

  // Assuming there's only one conductor with the given ID
  return conductors.length > 0 ? conductors[0] : null;
  }
