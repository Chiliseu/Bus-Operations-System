import { fetchDriversFullWithToken, fetchConductorsFullWithToken, fetchBusesFullWithToken } from '@/lib/apiCalls/external';
import { BUS_ASSIGNMENT_URL } from '@/lib/urls';
import { apiFetch, apiPost, apiPut } from '@/lib/api-fetch';

const Backend_BaseURL = process.env.NEXT_PUBLIC_Backend_BaseURL;

if (!Backend_BaseURL) {
  throw new Error("NEXT_PUBLIC_Backend_BaseURL is not defined");
}

export async function fetchAssignmentDetails(): Promise<any[]> {
  const baseUrl = process.env.NEXT_PUBLIC_Backend_BaseURL;
  if (!baseUrl) throw new Error("Base URL is not defined in environment variables.");

  // Fetch all in parallel
  const [assignmentsRes, drivers, conductors, buses] = await Promise.all([
    apiFetch(BUS_ASSIGNMENT_URL, { method: 'GET' }),
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
  const result = await apiPost(BUS_ASSIGNMENT_URL, data);
  return result;
}

export async function updateBusAssignment(BusAssignmentID: string, data: any): Promise<any> {
  const baseUrl = process.env.NEXT_PUBLIC_Backend_BaseURL;

  if (!baseUrl) throw new Error("Base URL is not defined in environment variables.");
  if (!BusAssignmentID) throw new Error("BusAssignmentID is required.");

  const response = await fetch(`${BUS_ASSIGNMENT_URL}/${BusAssignmentID}`, {
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
  if (!BusAssignmentID) throw new Error("BusAssignmentID is required.");
  
  const result = await apiPut(`${BUS_ASSIGNMENT_URL}/${BusAssignmentID}`, data);    },
    credentials: 'include', // Send cookies (including token)
    body: JSON.stringify({ IsDeleted }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Failed to update IsDeleted status');
  }

  return result;
}if (!BusAssignmentID) throw new Error("BusAssignmentID is required.");
  if (typeof IsDeleted !== 'boolean') throw new Error("IsDeleted must be a boolean.");

  const response = await apiFetch(`${BUS_ASSIGNMENT_URL}/${BusAssignmentID}`, {
    method: 'PATCH',