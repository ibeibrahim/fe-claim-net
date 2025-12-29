import type React from "react";
import { AdminSidebar } from "@/components/layout/admin-sidebar";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 overflow-auto bg-background">{children}</main>
    </div>
  );
}
