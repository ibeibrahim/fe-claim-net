import { ClaimRegistrationForm } from "@/components/claim-registration/claim-registration-form";
import { AdminLayout } from "@/components/layout/admin-layout";

export default function ClaimRegister() {
  return (
    <AdminLayout>
      <ClaimRegistrationForm />
    </AdminLayout>
  );
}
