import { AdminLayout } from "@/components/layout/admin-layout";
import { claims } from "@/lib/dummy-data";
import ClaimHeader from "@/components/claim/claim-header";
import ClaimTable from "@/components/claim/claim-table";

export default function Claims() {
  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <ClaimHeader />
        <ClaimTable claims={claims} />
      </div>
    </AdminLayout>
  );
}
