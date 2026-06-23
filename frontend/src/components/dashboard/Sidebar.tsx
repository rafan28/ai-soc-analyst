import { Link, useRouterState } from "@tanstack/react-router";
import { Brain, Clock, FileSearch, LayoutDashboard, ShieldAlert, Target } from "lucide-react";
import { Logo } from "@/components/brand/Logo";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/dashboard/analysis", label: "Log Analysis", icon: FileSearch, exact: false },
  { to: "/dashboard/threats", label: "Threat Detection", icon: ShieldAlert, exact: false },
  { to: "/dashboard/timeline", label: "Attack Timeline", icon: Clock, exact: false },
  { to: "/dashboard/mitre", label: "MITRE ATT&CK", icon: Target, exact: false },
  { to: "/dashboard/investigation", label: "AI Investigation", icon: Brain, exact: false },
] as const;

function Navigation({ mobile = false }: { mobile?: boolean }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <>
      {nav.map((item) => {
        const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
        return (
          <Link
            key={item.to}
            to={item.to}
            className={
              mobile
                ? `flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-xs ${active ? "bg-primary/15 text-primary" : "text-muted-foreground"}`
                : `group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${active ? "bg-sidebar-accent text-foreground" : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground"}`
            }
          >
            <item.icon className={`h-4 w-4 ${active ? "text-primary" : ""}`} />
            <span className="flex-1">{item.label}</span>
            {!mobile && active && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
          </Link>
        );
      })}
    </>
  );
}

export function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:flex">
      <div className="flex h-16 items-center border-b border-sidebar-border px-5">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <nav className="mt-5 flex-1 space-y-0.5 px-3">
        <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Workspace
        </p>
        <Navigation />
      </nav>
      <div className="m-4 border-t border-sidebar-border pt-4">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Analysis engine
        </p>
        <p className="mt-1 text-xs">FastAPI + Ollama</p>
      </div>
    </aside>
  );
}

export function MobileSidebar() {
  return (
    <div className="flex gap-1 overflow-x-auto border-b border-border bg-card/40 px-3 py-2 lg:hidden">
      <Navigation mobile />
    </div>
  );
}
