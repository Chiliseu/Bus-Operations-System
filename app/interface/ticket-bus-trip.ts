import { BusTrip } from './bus-trip';
import { TicketType } from './ticket-type';

export interface TicketBusTrip {
  TicketBusTripID: string;
  BusTripID: string;
  TicketTypeID: string;
  StartingIDNumber?: number | null;
  EndingIDNumber?: number | null;
  OverallEndingID?: number | null;
  BusTrip: BusTrip;
  TicketType: TicketType;
  CreatedAt: string;
  UpdatedAt: string;
  CreatedBy?: string;
  UpdatedBy?: string;
}