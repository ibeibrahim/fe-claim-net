import {
  FileText,
  CheckCircle2,
  Clock,
  AlertTriangle,
  DollarSign,
  Users,
  Shield,
} from "lucide-react";
import StatCard from "./stat-card";
import RecentClaimTable from "./recent-claim-table";

const stats = [
  {
    title: "Total Claims",
    value: "1,284",
    change: "+12.5%",
    icon: FileText,
    color: "text-primary",
  },
  {
    title: "Approved",
    value: "847",
    change: "+8.2%",
    icon: CheckCircle2,
    color: "text-chart-2",
  },
  {
    title: "Pending",
    value: "312",
    change: "-3.1%",
    icon: Clock,
    color: "text-chart-5",
  },
  {
    title: "Rejected",
    value: "125",
    change: "+1.4%",
    icon: AlertTriangle,
    color: "text-destructive",
  },
];

const quickStats = [
  {
    title: "Total Payout (YTD)",
    value: "Rp 12.4B",
    change: "+18.2%",
    changeText: "from last year",
    icon: DollarSign,
    color: "text-primary",
  },
  {
    title: "Active Policies",
    value: "45,231",
    change: "+5.4%",
    changeText: "from last month",
    icon: Shield,
    color: "text-primary",
  },
  {
    title: "Total Customers",
    value: "38,549",
    change: "+892",
    changeText: "new this month",
    icon: Users,
    color: "text-primary",
  },
];

const recentClaims = [
  {
    id: "CLM-001",
    customer: "John Doe",
    type: "MV4",
    status: "Pending",
    amount: "Rp 25,000,000",
    date: "2024-12-29",
  },
  {
    id: "CLM-002",
    customer: "Jane Smith",
    type: "PA",
    status: "Approved",
    amount: "Rp 15,000,000",
    date: "2024-12-28",
  },
  {
    id: "CLM-003",
    customer: "Bob Johnson",
    type: "MV2",
    status: "In Review",
    amount: "Rp 8,500,000",
    date: "2024-12-28",
  },
  {
    id: "CLM-004",
    customer: "Alice Brown",
    type: "TRAVEL",
    status: "Pending",
    amount: "Rp 5,200,000",
    date: "2024-12-27",
  },
  {
    id: "CLM-005",
    customer: "Charlie Wilson",
    type: "MV4",
    status: "Rejected",
    amount: "Rp 32,000,000",
    date: "2024-12-27",
  },
];

export function DashboardContent() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, Admin. Here&apos;s what&apos;s happening today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} stat={stat} />
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        {quickStats.map((stat) => (
          <StatCard key={stat.title} stat={stat} />
        ))}
      </div>

      {/* Recent Claims Table */}
      <RecentClaimTable claims={recentClaims} />
    </div>
  );
}
