//Use Fixed, Percentage, and Refular bus assignment
import { Fixed } from "./fixed";
import { Percentage } from "./percentage";

// Quota policy Interface
export interface Quota_Policy {
  QuotaPolicyID: string;
  StartDate: Date;
  EndDate: Date;
  RegularBusAssignmentID: string;
  Fixed?: Fixed;
  Percentage?: Percentage;
}