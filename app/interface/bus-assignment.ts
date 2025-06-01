// Use Route and RegularBusAssignment
import { Route } from './route';
import { RegularBusAssignment } from './regular-bus-assignment';

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
}
