//Use quota policy
import { Quota_Policy } from './quota-policy';

//Fixed interface
export interface Fixed {
  FQuotaPolicyID: string;
  Quota: number;
  quotaPolicy: Quota_Policy; // The relation to Quota_Policy
}