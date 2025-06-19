//Use Route and stop interfaces
import { Route } from './route';
import { Stop } from './stop';

//Route stop interface
export interface RouteStop {
    RouteStopID: string;
    RouteID: string;
    StopID: string;
    StopOrder: number;
    Route: Route;
    Stop: Stop;

    CreatedAt: string;
    UpdatedAt: string;
    CreatedBy?: string;
    UpdatedBy?: string;
  }
  