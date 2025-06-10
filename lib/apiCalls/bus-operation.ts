import { fetchDriverById, fetchConductorById, fetchBusById } from '@/lib/apiCalls/external';

export async function fetchBusAssignmentsWithStatus(status?: string): Promise<any[]> {
  const baseUrl = process.env.NEXT_PUBLIC_Backend_BaseURL;

  if (!baseUrl) throw new Error("Base URL is not defined in environment variables.");

  const query = status ? `?status=${encodeURIComponent(status)}` : '';
  const url = `${baseUrl}/api/bus-operations${query}`;

  const response = await fetch(url, {
    method: "GET",
    credentials: 'include',
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

  return assignmentsWithDetails;
}

export async function fetchReadyBusAssignments(): Promise<any[]> {
  const baseUrl = process.env.NEXT_PUBLIC_Backend_BaseURL;

  if (!baseUrl) {
    throw new Error("Base URL is not defined in environment variables.");
  }

  const url = `${baseUrl}/api/bus-operations/ready-assignments`;

  const response = await fetch(url, {
    method: "GET",
    credentials: 'include',
  });

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