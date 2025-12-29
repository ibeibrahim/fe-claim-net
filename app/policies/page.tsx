import { AdminLayout } from "@/components/layout/admin-layout";
import PolicyHeader from "@/components/policy/policy-header";
import PolicyTable from "@/components/policy/policy-table";
import { policies } from "@/lib/dummy-data";

export default function Policies() {
  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <PolicyHeader />
        <PolicyTable policies={policies} />
      </div>
    </AdminLayout>
  );
}
