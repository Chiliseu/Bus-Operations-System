import { TicketBusTrip } from './ticket-bus-trip';

export interface TicketType {
  TicketTypeID: string;
  Value: number;
  TicketBusTrips: TicketBusTrip[];
}