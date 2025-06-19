//Use Route and route stop interfaces
import { Route } from './route';
import { RouteStop } from './route-stop';

//Stop interface
export interface Stop {
    StopID: string;
    StopName: string;

    IsDeleted: boolean;
    latitude:   string;
    longitude:  string;

    routesAsStart?: Route[];   // Related routes where this is the start stop
    routesAsEnd?: Route[];     // Related routes where this is the end stop
    RouteStops?: RouteStop[];  // Join table relationship
    
    CreatedAt: string;
    UpdatedAt: string;
    CreatedBy?: string;
    UpdatedBy?: string;
  }
  