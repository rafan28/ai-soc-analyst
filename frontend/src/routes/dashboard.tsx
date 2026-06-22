import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Sidebar, MobileSidebar } from "@/components/dashboard/Sidebar";
import { TopBar } from "@/components/dashboard/TopBar";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Console — Protecto SOC Analyst" }] }),
  component: DashboardLayout,
});

function DashboardLayout() {
  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <MobileSidebar />
        <main className="min-w-0 flex-1"><Outlet /></main>
      </div>
    </div>
  );
}