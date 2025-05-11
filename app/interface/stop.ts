//Use Route and route stop interfaces
import { Route } from './route';
import { RouteStop } from './route-stop';

//Stop interface
export interface Stop {
    StopID: string;
    StopName: string;
    Location: string; // You can change this to { lat: number; lng: number } if needed
  
    routesAsStart?: Route[];   // Related routes where this is the start stop
    routesAsEnd?: Route[];     // Related routes where this is the end stop
    RouteStops?: RouteStop[];  // Join table relationship
  }
  