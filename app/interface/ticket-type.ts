import { TicketBusAssignment } from "./ticket-bus-assignment";

export interface TicketType {
  TicketTypeID: string;
  Value: number;
  TicketBusAssignments?: TicketBusAssignment[];
}