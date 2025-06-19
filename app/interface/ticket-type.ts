import { TicketBusTrip } from './ticket-bus-trip';

export interface TicketType {
  TicketTypeID: string;
  Value: number;
  TicketBusTrips: TicketBusTrip[];
  CreatedAt: string;
  UpdatedAt: string;
  CreatedBy?: string;
  UpdatedBy?: string;
}