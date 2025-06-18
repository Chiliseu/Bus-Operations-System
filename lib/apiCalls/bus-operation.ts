import { fetchDriversFullWithToken, fetchConductorsFullWithToken, fetchBusesFullWithToken } from '@/lib/apiCalls/external';

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

  // Fetch all external data in parallel (full lists)
  const [drivers, conductors, buses] = await Promise.all([
    fetchDriversFullWithToken(),
    fetchConductorsFullWithToken(),
    fetchBusesFullWithToken(),
  ]);

  // Enrich assignments with driver, conductor, and bus info (in-memory mapping)
  const assignmentsWithDetails: any[] = data.map((assignment: any) => {
    const driver = assignment.RegularBusAssignment?.DriverID
      ? drivers.find((d: any) => d.driver_id === assignment.RegularBusAssignment.DriverID)
      : null;
    const conductor = assignment.RegularBusAssignment?.ConductorID
      ? conductors.find((c: any) => c.conductor_id === assignment.RegularBusAssignment.ConductorID)
      : null;
    const bus = assignment.BusID
      ? buses.find((b: any) => b.busId === assignment.BusID)
      : null;

    return {
      ...assignment,
      driverName: driver?.name ?? '',
      conductorName: conductor?.name ?? '',
      busLicensePlate: bus?.license_plate ?? '',
      busType: bus?.type ?? '',
    };
  });

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

  // Fetch all external data in parallel (full lists)
  const [drivers, conductors, buses] = await Promise.all([
    fetchDriversFullWithToken(),
    fetchConductorsFullWithToken(),
    fetchBusesFullWithToken(),
  ]);

  // Enrich assignments with driver, conductor, and bus info (in-memory mapping)
  const assignmentsWithDetails: any[] = data.map((assignment: any) => {
    const driver = assignment.RegularBusAssignment?.DriverID
      ? drivers.find((d: any) => d.driver_id === assignment.RegularBusAssignment.DriverID)
      : null;
    const conductor = assignment.RegularBusAssignment?.ConductorID
      ? conductors.find((c: any) => c.conductor_id === assignment.RegularBusAssignment.ConductorID)
      : null;
    const bus = assignment.BusID
      ? buses.find((b: any) => b.busId === assignment.BusID)
      : null;

    return {
      ...assignment,
      driverName: driver?.name ?? '',
      conductorName: conductor?.name ?? '',
      busLicensePlate: bus?.license_plate ?? '',
      busType: bus?.type ?? '',
    };
  });

  return assignmentsWithDetails;
}

export async function updateBusAssignmentData(BusAssignmentID: string, data: any): Promise<any> {
  const baseUrl = process.env.NEXT_PUBLIC_Backend_BaseURL;

  console.log("DATA: ", data);

  if (!baseUrl) throw new Error("Base URL is not defined in environment variables.");

  const url = `${baseUrl}/api/bus-operations/${BusAssignmentID}`;

  console.log("updateBusAssignmentData called with:");
  console.log("BusAssignmentID:", BusAssignmentID);
  console.log("Data:", data);
  console.log("URL:", url);

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include', // Send token via cookie only
    body: JSON.stringify(data),
  });

  console.log("Response status:", response.status);

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Update failed:", errorText);
    throw new Error(`Failed to update bus assignment: ${errorText}`);
  }

  const json = await response.json();
  console.log("Response JSON:", json);
  return json;
}