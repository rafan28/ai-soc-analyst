import { Link, useRouterState } from "@tanstack/react-router";
import { Brain, Clock, FileSearch, LayoutDashboard, Settings, ShieldAlert, Sparkles, Target } from "lucide-react";
import { Logo } from "@/components/brand/Logo";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/dashboard/analysis", label: "Log Analysis", icon: FileSearch, exact: false },
  { to: "/dashboard/threats", label: "Threat Detection", icon: ShieldAlert, exact: false },
  { to: "/dashboard/timeline", label: "Attack Timeline", icon: Clock, exact: false },
  { to: "/dashboard/mitre", label: "MITRE ATT&CK", icon: Target, exact: false },
  { to: "/dashboard/investigation", label: "AI Investigation", icon: Brain, exact: false },
] as const;

export function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:flex">
      <div className="flex h-16 items-center border-b border-sidebar-border px-5">
        <Link to="/"><Logo /></Link>
      </div>
      <div className="mx-4 mt-5 rounded-lg border border-primary/20 bg-primary/5 p-3">
        <div className="flex items-center gap-2 text-xs">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span className="font-medium text-foreground">Live monitoring</span>
        </div>
        <p className="mt-1 text-[11px] text-muted-foreground">3 active sensors · 0 collector errors</p>
      </div>
      <nav className="mt-4 flex-1 space-y-0.5 px-3">
        <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Workspace</p>
        {nav.map((item) => {
          const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
          return (
            <Link key={item.to} to={item.to}
              className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${active ? "bg-sidebar-accent text-foreground" : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground"}`}>
              <item.icon className={`h-4 w-4 ${active ? "text-primary" : ""}`} />
              <span className="flex-1">{item.label}</span>
              {active && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
            </Link>
          );
        })}
        <p className="px-3 pb-2 pt-6 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">System</p>
        <Link to="/dashboard/settings"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${pathname.startsWith("/dashboard/settings") ? "bg-sidebar-accent text-foreground" : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground"}`}>
          <Settings className="h-4 w-4" /> <span>Settings</span>
        </Link>
      </nav>
      <div className="m-4 rounded-xl border border-border bg-gradient-to-br from-primary/10 to-accent/10 p-4">
        <div className="flex items-center gap-2 text-xs font-medium"><Sparkles className="h-3.5 w-3.5 text-primary" /> Upgrade to Team</div>
        <p className="mt-1 text-[11px] text-muted-foreground">Unlock unlimited AI investigations and SSO.</p>
        <button className="mt-3 w-full rounded-md bg-gradient-to-r from-primary to-accent py-1.5 text-xs font-semibold text-primary-foreground">Upgrade</button>
      </div>
    </aside>
  );
}

export function MobileSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const items = [...nav, { to: "/dashboard/settings" as const, label: "Settings", icon: Settings, exact: false }];
  return (
    <div className="flex gap-1 overflow-x-auto border-b border-border bg-card/40 px-3 py-2 lg:hidden">
      {items.map((item) => {
        const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
        return (
          <Link key={item.to} to={item.to}
            className={`flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-xs ${active ? "bg-primary/15 text-primary" : "text-muted-foreground"}`}>
            <item.icon className="h-3.5 w-3.5" /> {item.label}
          </Link>
        );
      })}
    </div>
  );
}