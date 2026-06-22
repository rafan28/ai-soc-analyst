import { Shield } from "lucide-react";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-[0_0_20px_-4px_var(--color-primary)]">
        <Shield className="h-4 w-4" strokeWidth={2.5} />
      </div>
      {!compact && (
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-bold tracking-tight">Protecto</span>
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            SOC Analyst
          </span>
        </div>
      )}
    </div>
  );
}