// Use Route and RegularBusAssignment
import { Route } from './route';
import { RegularBusAssignment } from './regular-bus-assignment';

export type BusOperationStatus = "NotStarted" | "InOperation" | "Completed";

//Bus assignment interface
export interface BusAssignment {
  BusAssignmentID: string;
  BusID: string;
  RouteID: string;
  AssignmentDate: Date;
  Battery: boolean;
  Lights: boolean;
  Oil: boolean;
  Water: boolean;
  Break: boolean;
  Air: boolean;
  Gas: boolean;
  Engine: boolean;
  TireCondition: boolean;
  Self_Driver: boolean;
  Self_Conductor: boolean;
  Route: Route;
  IsDeleted: boolean;
  RegularBusAssignment?: RegularBusAssignment;
  Status: BusOperationStatus;
  CreatedAt?: string; // changes by Y 6/17/2025
  CreatedBy?: string; // changes by Y 6/17/2025
  UpdatedAt?: string; // changes by Y 6/17/2025
  UpdatedBy?: string; // changes by Y 6/17/2025
}
