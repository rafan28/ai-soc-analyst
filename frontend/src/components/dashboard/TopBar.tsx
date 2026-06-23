import { UserRound } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Link } from "@tanstack/react-router";

export function TopBar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-xl md:px-6">
      <Link to="/" className="lg:hidden">
        <Logo compact />
      </Link>
      <p className="hidden text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground lg:block">
        Security operations console
      </p>
      <div className="flex items-center gap-2 rounded-lg border border-border bg-card/60 px-2.5 py-1.5">
        <div className="grid h-7 w-7 place-items-center rounded-md bg-primary/10 text-primary">
          <UserRound className="h-3.5 w-3.5" />
        </div>
        <div>
          <div className="text-xs font-semibold leading-tight">Guest User</div>
          <div className="text-[10px] leading-tight text-muted-foreground">Local session</div>
        </div>
      </div>
    </header>
  );
}
