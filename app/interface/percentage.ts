//Use quota policy interface
import { Quota_Policy } from "./quota-policy";

// Percentage interface
export interface Percentage {
    PQuotaPolicyID: string;
    Percentage: number;
    quotaPolicy: Quota_Policy;
  }