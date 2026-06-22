import { Bell, ChevronDown, Search } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Link } from "@tanstack/react-router";

export function TopBar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/80 px-4 backdrop-blur-xl md:px-6">
      <Link to="/" className="lg:hidden"><Logo compact /></Link>
      <div className="relative max-w-xl flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input type="search" placeholder="Search threats, IPs, users, MITRE techniques…"
          className="h-9 w-full rounded-lg border border-border bg-card/60 pl-9 pr-16 text-sm placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20" />
        <kbd className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline-block">⌘K</kbd>
      </div>
      <button className="relative grid h-9 w-9 place-items-center rounded-lg border border-border bg-card/60 text-muted-foreground hover:text-foreground">
        <Bell className="h-4 w-4" />
        <span className="absolute right-1.5 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-destructive px-1 text-[9px] font-bold text-destructive-foreground">5</span>
      </button>
      <div className="flex items-center gap-3 rounded-lg border border-border bg-card/60 py-1 pl-1 pr-2">
        <div className="grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-primary to-accent text-xs font-bold text-primary-foreground">MA</div>
        <div className="hidden text-left sm:block">
          <div className="text-xs font-semibold leading-tight">M. Asher</div>
          <div className="text-[10px] leading-tight text-muted-foreground">Tier-2 Analyst</div>
        </div>
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
      </div>
    </header>
  );
}