import { RegularBusAssignment } from "./regular-bus-assignment";

export interface BusTrip {
  BusTripID: string;
  RegularBusAssignmentID: string;
  DispatchedAt?: string; // or Date, depending on your usage
  CompletedAt?: string;  // or Date
  Sales?: number;
  ChangeFund?: number;
  regularBusAssignment: RegularBusAssignment;
}