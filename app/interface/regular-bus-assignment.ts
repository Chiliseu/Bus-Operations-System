//Use bus assignment and quota policy
import { BusAssignment } from './bus-assignment';
import { Quota_Policy } from './quota-policy';
import { BusTrip } from './bus-trip';

// Regular bus assignment interface
export interface RegularBusAssignment {
  RegularBusAssignmentID: string;
  DriverID: string;
  ConductorID: string;
  BusAssignment: BusAssignment;
  QuotaPolicies: Quota_Policy[];
  BusTrips: BusTrip[];
  LatestBusTripID?: string | null;
  LatestBusTrip?: BusTrip | null;
}