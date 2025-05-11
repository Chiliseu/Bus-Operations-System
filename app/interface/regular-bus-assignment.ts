//Use bus assignment and quota policy
import { BusAssignment } from './bus-assignment';
import { Quota_Policy } from './quota-policy';

//Regular bus assignment interface
export interface RegularBusAssignment {
    RegularBusAssignmentID: string;
    DriverID: string;
    ConductorID: string;
    QuotaPolicyID: string;
    Change: number;
    TripRevenue: number;
    quotaPolicy: Quota_Policy;
    BusAssignment: BusAssignment;
  }