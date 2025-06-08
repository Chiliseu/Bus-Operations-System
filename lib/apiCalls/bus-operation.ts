import { fetchDriverById, fetchConductorById, fetchBusById } from '@/lib/apiCalls/external';

export async function fetchBusAssignmentsWithStatus(status?: string): Promise<any[]> {
  const baseUrl = process.env.NEXT_PUBLIC_Backend_BaseURL;
  const token = localStorage.getItem("backend_token");

  if (!baseUrl) throw new Error("Base URL is not defined in environment variables.");
  if (!token) throw new Error("No backend token found in localStorage.");

  const query = status ? `?status=${encodeURIComponent(status)}` : '';
  const url = `${baseUrl}/api/bus-operations${query}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(`Failed to fetch bus assignments: ${errorBody.error || response.statusText}`);
  }

  const data = await response.json();

  // Enrich assignments with driver, conductor, and bus info
  const assignmentsWithDetails: any[] = await Promise.all(
    data.map(async (assignment: any) => {
      const [driver, conductor, bus] = await Promise.all([
        assignment.RegularBusAssignment?.DriverID ? fetchDriverById(assignment.RegularBusAssignment.DriverID) : null,
        assignment.RegularBusAssignment?.ConductorID ? fetchConductorById(assignment.RegularBusAssignment.ConductorID) : null,
        assignment.BusID ? fetchBusById(assignment.BusID) : null,
      ]);

      return {
        ...assignment,
        driverName: driver?.name ?? '',
        conductorName: conductor?.name ?? '',
        busLicensePlate: bus?.license_plate ?? '',
      };
    })
  );

  console.log(assignmentsWithDetails);
  return assignmentsWithDetails;
}

export async function fetchReadyBusAssignments(): Promise<any[]> {
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

  const url = `${baseUrl}/api/bus-operations/ready-assignments`;
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
    throw new Error(
      `Failed to fetch verified bus assignments: ${errorBody.error || response.statusText}`
    );
  }

  const data = await response.json();
   // Enrich assignments with driver, conductor, and bus info
  const assignmentsWithDetails: any[] = await Promise.all(
    data.map(async (assignment: any) => {
      const [driver, conductor, bus] = await Promise.all([
        assignment.RegularBusAssignment?.DriverID ? fetchDriverById(assignment.RegularBusAssignment.DriverID) : null,
        assignment.RegularBusAssignment?.ConductorID ? fetchConductorById(assignment.RegularBusAssignment.ConductorID) : null,
        assignment.BusID ? fetchBusById(assignment.BusID) : null,
      ]);

      return {
        ...assignment,
        driverName: driver?.name ?? '',
        conductorName: conductor?.name ?? '',
        busLicensePlate: bus?.license_plate ?? '',
      };
    })
  );

  return assignmentsWithDetails;
}
