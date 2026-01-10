import { fetchDriversFullWithToken, fetchConductorsFullWithToken, fetchBusesFullWithToken } from '@/lib/apiCalls/external';
import { BUS_OPERATIONS_URL, DAMAGE_REPORT_URL } from '@/lib/urls';

export async function fetchBusAssignmentsWithStatus(status?: string): Promise<any[]> {
  const baseUrl = process.env.NEXT_PUBLIC_Backend_BaseURL;

  if (!baseUrl) throw new Error("Base URL is not defined in environment variables.");

  const query = status ? `?status=${encodeURIComponent(status)}` : '';
  const url = `${BUS_OPERATIONS_URL}${query}`;

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

    // Check if bus has a vehicle check (DamageReport linked to current BusTrip)
    const currentBusTripID = assignment.RegularBusAssignment?.LatestBusTrip?.BusTripID;
    const damageReports = assignment.RegularBusAssignment?.LatestBusTrip?.DamageReports ?? [];
    const hasVehicleCheck = damageReports.length > 0;
    
    // Debug logging
    console.log(`Bus ${bus?.license_plate}: BusTripID=${currentBusTripID}, DamageReports=${damageReports.length}, hasVehicleCheck=${hasVehicleCheck}`);

    return {
      ...assignment,
      driverName: driver?.name ?? '',
      conductorName: conductor?.name ?? '',
      busLicensePlate: bus?.license_plate ?? '',
      busType: bus?.type ?? '',
      hasVehicleCheck,
    };
  });

  return assignmentsWithDetails;
}

export async function updateBusAssignmentData(BusAssignmentID: string, data: any): Promise<any> {
  const baseUrl = process.env.NEXT_PUBLIC_Backend_BaseURL;
  console.log(BusAssignmentID, data);

  if (!baseUrl) throw new Error("Base URL is not defined in environment variables.");

  const url = `${BUS_OPERATIONS_URL}/${BusAssignmentID}`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include', // Send token via cookie only
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Update failed:", errorText);
    throw new Error(`Failed to update bus assignment: ${errorText}`);
  }

  const json = await response.json();
  return json;
}

export async function createVehicleCheckDamageReport(data: {
  busAssignmentID: string;
  busTripID: string;
  vehicleCondition: Record<string, boolean>;
  note: string;
}): Promise<any> {
  const baseUrl = process.env.NEXT_PUBLIC_Backend_BaseURL;

  if (!baseUrl) throw new Error("Base URL is not defined in environment variables.");

  // Convert vehicle condition to damage report format
  // Find items that are NOT OK (value is false)
  const damagedItems = Object.entries(data.vehicleCondition)
    .filter(([_, isOk]) => !isOk)
    .map(([item]) => item);

  const hasDamage = damagedItems.length > 0;

  const reportData = {
    BusTripID: data.busTripID,
    Description: hasDamage
      ? `Vehicle Check - Issues found: ${damagedItems.join(', ')}`
      : 'Vehicle Check - No issues found',
    Status: hasDamage ? 'Pending' : 'NA', // NA for no damage, Pending for damage to be addressed
    VehicleCondition: data.vehicleCondition,
    Notes: data.note,
  };

  const response = await fetch(`${DAMAGE_REPORT_URL}/vehicle-check`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify(reportData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Create vehicle check report failed:", errorText);
    throw new Error(`Failed to create vehicle check report: ${errorText}`);
  }

  const json = await response.json();
  return json;
}

export interface TripHistoryItem {
  BusTripID: string;
  DispatchedAt: string | null;
  CompletedAt: string | null;
  Sales: number | null;
  TripExpense: number | null;
  PettyCash: number | null;
  Payment_Method: string | null;
  Remarks: string | null;
  regularBusAssignment: {
    DriverID: string;
    ConductorID: string;
    BusAssignment: {
      BusID: string;
      Route: {
        RouteID: string;
        RouteName: string;
      } | null;
    };
  } | null;
  DamageReports: Array<{
    DamageReportID: string;
    Status: string;
  }>;
  // Enriched fields from external API
  driverName?: string;
  conductorName?: string;
  busLicensePlate?: string;
}

export interface TripHistoryResponse {
  trips: TripHistoryItem[];
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
  };
}

export async function fetchTripHistory(page: number = 1, limit: number = 20): Promise<TripHistoryResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_Backend_BaseURL;

  if (!baseUrl) throw new Error("Base URL is not defined in environment variables.");

  const url = `${BUS_OPERATIONS_URL}/trip-history?page=${page}&limit=${limit}`;

  const response = await fetch(url, {
    method: "GET",
    credentials: 'include',
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(`Failed to fetch trip history: ${errorBody.error || response.statusText}`);
  }

  const data: TripHistoryResponse = await response.json();

  // Fetch all external data in parallel (full lists)
  const [drivers, conductors, buses] = await Promise.all([
    fetchDriversFullWithToken(),
    fetchConductorsFullWithToken(),
    fetchBusesFullWithToken(),
  ]);

  // Enrich trips with driver, conductor, and bus info
  const enrichedTrips = data.trips.map((trip) => {
    const driver = trip.regularBusAssignment?.DriverID
      ? drivers.find((d: any) => d.driver_id === trip.regularBusAssignment?.DriverID)
      : null;
    const conductor = trip.regularBusAssignment?.ConductorID
      ? conductors.find((c: any) => c.conductor_id === trip.regularBusAssignment?.ConductorID)
      : null;
    const bus = trip.regularBusAssignment?.BusAssignment?.BusID
      ? buses.find((b: any) => b.busId === trip.regularBusAssignment?.BusAssignment?.BusID)
      : null;

    return {
      ...trip,
      driverName: driver?.name ?? '',
      conductorName: conductor?.name ?? '',
      busLicensePlate: bus?.license_plate ?? '',
    };
  });

  return {
    ...data,
    trips: enrichedTrips,
  };
}