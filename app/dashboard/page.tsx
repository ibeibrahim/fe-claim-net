import { DashboardContent } from "@/components/dashboard/dashboard-content";
import { AdminLayout } from "@/components/layout/admin-layout";

export default function Dashboard() {
  return (
    <AdminLayout>
      <DashboardContent />
    </AdminLayout>
  );
}
