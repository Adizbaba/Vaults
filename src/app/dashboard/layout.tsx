
"use client"; // Make it a client component to use hooks

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardSidebarNav } from "@/components/dashboard/dashboard-sidebar-nav";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useSessionTimeout } from '@/hooks/use-session-timeout'; // Import the hook

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Activate the session timeout hook for all dashboard pages
  useSessionTimeout();

  return (
    <SidebarProvider defaultOpen={true}>
      <DashboardSidebarNav />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto bg-muted/40 p-4 md:p-6">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
