import { BusTrip } from './bus-trip';
import { TicketType } from './ticket-type';

export interface TicketBusTrip {
  TicketBusTripID: string;
  BusTripID: string;
  TicketTypeID: string;
  StartingIDNumber: number;
  EndingIDNumber: number;
  BusTrip: BusTrip;
  TicketType: TicketType;
}