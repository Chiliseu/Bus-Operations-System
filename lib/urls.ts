const BASE_URL = process.env.NEXT_PUBLIC_Backend_BaseURL?.replace(/['"]/g, "");

// Auth
export const LOGIN_URL = `${BASE_URL}${process.env.NEXT_PUBLIC_Login_Endpoint}`;
export const LOGOUT_URL = `${process.env.NEXT_PUBLIC_Logout_Endpoint}`;

// Employees
export const EMPLOYEES_URL = `${BASE_URL}${process.env.NEXT_PUBLIC_Employees_Endpoint}`;
export const EMPLOYEES_FULL_URL = `${BASE_URL}${process.env.NEXT_PUBLIC_EmployeesFull_Endpoint}`;

// Drivers
export const DRIVERS_URL = `${BASE_URL}${process.env.NEXT_PUBLIC_Drivers_Endpoint}`;
export const DRIVERS_FULL_URL = `${BASE_URL}${process.env.NEXT_PUBLIC_DriversFull_Endpoint}`;

// Conductors
export const CONDUCTORS_URL = `${BASE_URL}${process.env.NEXT_PUBLIC_Conductors_Endpoint}`;
export const CONDUCTORS_FULL_URL = `${BASE_URL}${process.env.NEXT_PUBLIC_ConductorsFull_Endpoint}`;

// Buses
export const BUSES_URL = `${BASE_URL}${process.env.NEXT_PUBLIC_Buses_Endpoint}`;
export const BUSES_FULL_URL = `${BASE_URL}${process.env.NEXT_PUBLIC_BusesFull_Endpoint}`;

// Stops
export const STOPS_URL = `${BASE_URL}${process.env.NEXT_PUBLIC_Stops_Endpoint}`;

// Route Management
export const ROUTE_MANAGEMENT_URL = `${BASE_URL}${process.env.NEXT_PUBLIC_RouteManagement_Endpoint}`;
export const ROUTE_MANAGEMENT_FULL_URL = `${BASE_URL}${process.env.NEXT_PUBLIC_RouteManagementFull_Endpoint}`;

// Ticket Types
export const TICKET_TYPES_URL = `${BASE_URL}${process.env.NEXT_PUBLIC_TicketTypes_Endpoint}`;

// Dashboard
export const DASHBOARD_URL = `${BASE_URL}${process.env.NEXT_PUBLIC_Dashboard_Endpoint}`;

// Bus Assignment
export const BUS_ASSIGNMENT_URL = `${BASE_URL}${process.env.NEXT_PUBLIC_BusAssignment_Endpoint}`;

// Bus Operations
export const BUS_OPERATIONS_URL = `${BASE_URL}${process.env.NEXT_PUBLIC_BusOperations_Endpoint}`;

// Rental Requests
export const RENTAL_REQUESTS_URL = `${BASE_URL}${process.env.NEXT_PUBLIC_Rental_Requests_Endpoint}`;

export const DRIVERS_RENT_URL = `${BASE_URL}${process.env.NEXT_PUBLIC_DriversRent_Endpoint}`;

export const BUSES_RENT_URL = `${BASE_URL}${process.env.NEXT_PUBLIC_BusesRent_Endpoint}`;

