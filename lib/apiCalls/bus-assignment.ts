import { fetchDriverById, fetchConductorById, fetchBusById } from '@/lib/apiCalls/external'; // adjust the path as needed

export async function fetchAssignmentDetails(): Promise<any[]> {
  const baseUrl = process.env.NEXT_PUBLIC_Backend_BaseURL;
  const token = localStorage.getItem("backend_token");

  if (!baseUrl) throw new Error("Base URL is not defined in environment variables.");
  if (!token) throw new Error("No backend token found in localStorage.");

  const response = await fetch(`${baseUrl}/api/bus-assignment`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch assignments: ${response.statusText}`);
  }

  const data: any[] = await response.json();

  const assignmentsWithDetails: any[] = await Promise.all(
    data.map(async (assignment) => {
      const [driver, conductor, bus] = await Promise.all([
        assignment.DriverID ? fetchDriverById(assignment.DriverID) : null,
        assignment.ConductorID ? fetchConductorById(assignment.ConductorID) : null,
        assignment.BusAssignment?.BusID ? fetchBusById(assignment.BusAssignment.BusID) : null,
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

export async function createBusAssignment(data: any): Promise<any> {
  const baseUrl = process.env.NEXT_PUBLIC_Backend_BaseURL;
  const token = localStorage.getItem("backend_token");

  if (!baseUrl) throw new Error("Base URL is not defined in environment variables.");
  if (!token) throw new Error("No backend token found in localStorage.");

  const response = await fetch(`${baseUrl}/api/bus-assignment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
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
  const token = localStorage.getItem("backend_token");

  if (!baseUrl) throw new Error("Base URL is not defined in environment variables.");
  if (!token) throw new Error("No backend token found in localStorage.");
  if (!BusAssignmentID) throw new Error("BusAssignmentID is required.");

  const response = await fetch(`${baseUrl}/api/bus-assignment/${BusAssignmentID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
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
  const token = localStorage.getItem("backend_token");

  if (!baseUrl) throw new Error("Base URL is not defined in environment variables.");
  if (!token) throw new Error("No backend token found in localStorage.");
  if (!BusAssignmentID) throw new Error("BusAssignmentID is required.");
  if (typeof IsDeleted !== 'boolean') throw new Error("IsDeleted must be a boolean.");

  const response = await fetch(`${baseUrl}/api/bus-assignment/${BusAssignmentID}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ IsDeleted }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Failed to update IsDeleted status');
  }

  return result;
}
