import { fetchDriversFullWithToken, fetchConductorsFullWithToken, fetchBusesFullWithToken } from '@/lib/apiCalls/external';

export async function fetchAssignmentDetails(): Promise<any[]> {
  const baseUrl = process.env.NEXT_PUBLIC_Backend_BaseURL;
  if (!baseUrl) throw new Error("Base URL is not defined in environment variables.");

  // Fetch all in parallel
  const [assignmentsRes, drivers, conductors, buses] = await Promise.all([
    fetch(`${baseUrl}/api/bus-assignment`, { credentials: 'include' }),
    fetchDriversFullWithToken(),
    fetchConductorsFullWithToken(),
    fetchBusesFullWithToken(),
  ]);

  if (!assignmentsRes.ok) throw new Error(`Failed to fetch assignments: ${assignmentsRes.statusText}`);
  const assignments: any[] = await assignmentsRes.json();

  // Map assignments to include external info
  return assignments.map((assignment) => {
    const bus = buses.find((b) => b.busId === assignment.BusAssignment?.BusID);
    const driver = drivers.find((d) => d.driver_id === assignment.DriverID);
    const conductor = conductors.find((c) => c.conductor_id === assignment.ConductorID);
    return {
      ...assignment,
      busLicensePlate: bus?.license_plate ?? '',
      busType: bus?.type ?? '',
      driverName: driver?.name ?? '',
      conductorName: conductor?.name ?? '',
    };
  });
}

export async function createBusAssignment(data: any): Promise<any> {
  const baseUrl = process.env.NEXT_PUBLIC_Backend_BaseURL;

  if (!baseUrl) throw new Error("Base URL is not defined in environment variables.");

  const response = await fetch(`${baseUrl}/api/bus-assignment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Send cookies (including token)
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Failed to create BusAssignment');
  }

  return result;
}

export async function updateBusAssignment(BusAssignmentID: string, data: any): Promise<any> {
  const baseUrl = process.env.NEXT_PUBLIC_Backend_BaseURL;

  if (!baseUrl) throw new Error("Base URL is not defined in environment variables.");
  if (!BusAssignmentID) throw new Error("BusAssignmentID is required.");


  console.log("Updating BusAssignment with ID:", BusAssignmentID);
  console.log("Data to update:", data);

  const response = await fetch(`${baseUrl}/api/bus-assignment/${BusAssignmentID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Send cookies (including token)
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Failed to update BusAssignment');
  }

  return result;
}

export async function sofDeleteBusAssignment(
  BusAssignmentID: string,
  IsDeleted: boolean
): Promise<{ IsDeleted: boolean }> {
  const baseUrl = process.env.NEXT_PUBLIC_Backend_BaseURL;

  if (!baseUrl) throw new Error("Base URL is not defined in environment variables.");
  if (!BusAssignmentID) throw new Error("BusAssignmentID is required.");
  if (typeof IsDeleted !== 'boolean') throw new Error("IsDeleted must be a boolean.");

  const response = await fetch(`${baseUrl}/api/bus-assignment/${BusAssignmentID}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Send cookies (including token)
    body: JSON.stringify({ IsDeleted }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Failed to update IsDeleted status');
  }

  return result;
}