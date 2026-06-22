import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, Filter, MapPin, ShieldAlert, Target } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { SeverityBadge } from "@/components/dashboard/SeverityBadge";
import { Button } from "@/components/ui/button";
import { mockThreats } from "@/lib/mockData";
import type { Severity } from "@/lib/types";

export const Route = createFileRoute("/dashboard/threats")({ component: ThreatsPage });

const filters: (Severity | "all")[] = ["all", "critical", "high", "medium", "low"];

function severityVar(s: Severity) {
  return s === "critical" ? "var(--severity-critical)" : s === "high" ? "var(--severity-high)" : s === "medium" ? "var(--severity-medium)" : "var(--severity-low)";
}

function ThreatsPage() {
  const [active, setActive] = useState<(typeof filters)[number]>("all");
  const list = active === "all" ? mockThreats : mockThreats.filter((t) => t.severity === active);
  return (
    <>
      <PageHeader title="Threat Detection" description={`${mockThreats.length} active threats across monitored hosts.`}
        actions={<Button variant="outline" size="sm"><Filter className="mr-1.5 h-3.5 w-3.5" /> Filters</Button>} />
      <div className="space-y-6 p-6">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button key={f} onClick={() => setActive(f)}
              className={`rounded-md border px-3 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors ${active === f ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-foreground"}`}>
              {f}
            </button>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {list.map((t) => (
            <div key={t.id} className="glass-panel group relative overflow-hidden rounded-xl p-5 transition-all hover:border-primary/40 hover:shadow-[var(--shadow-glow)]">
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/5 blur-2xl" />
              <div className="flex items-start justify-between gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <SeverityBadge severity={t.severity} />
              </div>
              <h3 className="mt-4 line-clamp-2 text-base font-semibold">{t.name}</h3>
              <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{t.description}</p>
              <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-1 text-muted-foreground"><Target className="h-3 w-3" /> MITRE</div>
                  <div className="mt-0.5 font-mono font-semibold text-accent">{t.mitre}</div>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-muted-foreground"><MapPin className="h-3 w-3" /> Source IP</div>
                  <div className="mt-0.5 font-mono font-semibold">{t.sourceIp}</div>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center gap-1 text-muted-foreground"><Clock className="h-3 w-3" /> Detected</div>
                  <div className="mt-0.5 font-mono">{new Date(t.timestamp).toLocaleString()}</div>
                </div>
              </div>
              <div className="mt-5 border-t border-border pt-4">
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Risk score</span>
                  <span className="font-mono font-bold">{t.riskScore}/100</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full" style={{ width: `${t.riskScore}%`, background: severityVar(t.severity) }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}