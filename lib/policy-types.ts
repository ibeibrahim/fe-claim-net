// id: "POL-2024-001237",
// customer: "Alice Brown",
// type: "Conventional",
// category: "TRAVEL",
// status: "Active",
// premium: "Rp 500,000",
// expiry: "2025-06-20",

export enum PolicyStatus {
  Active = "Active",
  Expired = "Expired",
  ExpiringSoon = "Expiring Soon",
}

export type Policy = {
  id: string;
  customer: string;
  type: string;
  category: string;
  status: PolicyStatus;
  premium: string;
  expiry: string;
};
