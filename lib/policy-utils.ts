import { PolicyStatus } from "./policy-types";

export const statusColors: Record<PolicyStatus, string> = {
  [PolicyStatus.Active]: "bg-green-100 text-green-800",
  [PolicyStatus.ExpiringSoon]: "bg-yellow-100 text-yellow-800",
  [PolicyStatus.Expired]: "bg-red-100 text-red-800",
}