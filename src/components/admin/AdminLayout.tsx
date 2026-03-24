import { ReactNode } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminGuard } from "./AdminGuard";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-background">
        <AdminSidebar />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </AdminGuard>
  );
}
