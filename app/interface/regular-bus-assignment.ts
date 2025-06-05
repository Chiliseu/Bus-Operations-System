//Use bus assignment and quota policy
import { BusAssignment } from './bus-assignment';
import { Quota_Policy } from './quota-policy';

// Regular bus assignment interface
export interface RegularBusAssignment {
  RegularBusAssignmentID: string;
  DriverID: string;
  ConductorID: string;
  Change: number;
  TripRevenue: number;
  BusAssignment: BusAssignment;
  QuotaPolicies: Quota_Policy[];
}