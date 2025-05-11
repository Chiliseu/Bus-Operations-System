//Use Stop, route stop, bus assignment
import { Stop } from './stop';
import { RouteStop } from './route-stop';
import { BusAssignment } from './bus-assignment';

//Route interface
export interface Route {
    RouteID: string;
    StartStopID: string;
    EndStopID: string;
    RouteName: string;
  
    StartStop?: Stop;
    EndStop?: Stop;
    RouteStops?: RouteStop[];
    BusAssignments?: BusAssignment[];
  }