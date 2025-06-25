const BASE_URL = process.env.NEXT_PUBLIC_Backend_BaseURL?.replace(/['"]/g, "") || "http://localhost:3001";

// Auth
export const LOGIN_URL = `${BASE_URL}${process.env.NEXT_PUBLIC_Login_Endpoint || "/api/login"}`;
export const LOGOUT_URL = `${process.env.NEXT_PUBLIC_Logout_Endpoint || "/api/logout"}`;

// Employees
export const EMPLOYEES_URL = `${BASE_URL}${process.env.NEXT_PUBLIC_Employees_Endpoint || "/employees/inv"}`;
export const EMPLOYEES_FULL_URL = `${BASE_URL}${process.env.NEXT_PUBLIC_EmployeesFull_Endpoint || "/employees/inv/full"}`;

// Drivers
export const DRIVERS_URL = `${BASE_URL}${process.env.NEXT_PUBLIC_Drivers_Endpoint || "/api/external/drivers"}`;
export const DRIVERS_FULL_URL = `${BASE_URL}${process.env.NEXT_PUBLIC_DriversFull_Endpoint || "/api/external/drivers/full"}`;

// Conductors
export const CONDUCTORS_URL = `${BASE_URL}${process.env.NEXT_PUBLIC_Conductors_Endpoint || "/api/external/conductors"}`;
export const CONDUCTORS_FULL_URL = `${BASE_URL}${process.env.NEXT_PUBLIC_ConductorsFull_Endpoint || "/api/external/conductors/full"}`;

// Buses
export const BUSES_URL = `${BASE_URL}${process.env.NEXT_PUBLIC_Buses_Endpoint || "/api/external/buses"}`;
export const BUSES_FULL_URL = `${BASE_URL}${process.env.NEXT_PUBLIC_BusesFull_Endpoint || "/api/external/buses/full"}`;

// Stops
export const STOPS_URL = `${BASE_URL}${process.env.NEXT_PUBLIC_Stops_Endpoint || "/api/stops"}`;

// Route Management
export const ROUTE_MANAGEMENT_URL = `${BASE_URL}${process.env.NEXT_PUBLIC_RouteManagement_Endpoint || "/api/route-management"}`;
export const ROUTE_MANAGEMENT_FULL_URL = `${BASE_URL}${process.env.NEXT_PUBLIC_RouteManagementFull_Endpoint || "/api/route-management/full"}`;

// Ticket Types
export const TICKET_TYPES_URL = `${BASE_URL}${process.env.NEXT_PUBLIC_TicketTypes_Endpoint || "/api/ticket-types"}`;

// Dashboard
export const DASHBOARD_URL = `${BASE_URL}${process.env.NEXT_PUBLIC_Dashboard_Endpoint || "/api/dashboard"}`;

// Bus Assignment
export const BUS_ASSIGNMENT_URL = `${BASE_URL}${process.env.NEXT_PUBLIC_BusAssignment_Endpoint || "/api/bus-assignment"}`;

// Bus Operations
export const BUS_OPERATIONS_URL = `${BASE_URL}${process.env.NEXT_PUBLIC_BusOperations_Endpoint || "/api/bus-operations"}`;