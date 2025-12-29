import CustomerHeader from "@/components/customer/customer-header";
import CustomerTable from "@/components/customer/customer-table";
import { AdminLayout } from "@/components/layout/admin-layout";
import { customers } from "@/lib/dummy-data";

export default function Customers() {
  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <CustomerHeader />
        <CustomerTable customers={customers} />
      </div>
    </AdminLayout>
  );
}
