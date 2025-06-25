import { RegularBusAssignment } from "./regular-bus-assignment";
import { TicketBusTrip } from './ticket-bus-trip';

export interface BusTrip {
  BusTripID: string;
  RegularBusAssignmentID: string;
  DispatchedAt?: string | null;
  CompletedAt?: string | null;
  Sales?: number | null;
  PettyCash?: number | null;
  regularBusAssignment: RegularBusAssignment;
  TicketBusTrips: TicketBusTrip[];
  LatestForAssignment?: RegularBusAssignment | null;
  CreatedAt: string;
  UpdatedAt: string;
  CreatedBy?: string;
  UpdatedBy?: string;
}