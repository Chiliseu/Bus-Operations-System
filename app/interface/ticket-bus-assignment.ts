import { BusAssignment } from "./bus-assignment";
import { TicketType } from "./ticket-type";

export interface TicketBusAssignment {
  TicketBusAssignmentID: string;
  BusAssignmentID: string;
  TicketTypeID: string;
  StartingIDNumber: number;
  EndingIDNumber: number;
  BusAssignment: BusAssignment;
  TicketType: TicketType;
}