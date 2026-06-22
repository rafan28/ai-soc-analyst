import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Target } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { SeverityBadge } from "@/components/dashboard/SeverityBadge";
import { mockMitre } from "@/lib/mockData";

export const Route = createFileRoute("/dashboard/mitre")({ component: MitrePage });

function MitrePage() {
  const [query, setQuery] = useState("");
  const [tactic, setTactic] = useState<string>("all");
  const tactics = useMemo(() => ["all", ...Array.from(new Set(mockMitre.map((m) => m.tactic)))], []);
  const filtered = mockMitre.filter((m) => {
    if (tactic !== "all" && m.tactic !== tactic) return false;
    if (!query) return true;
    const q = query.toLowerCase();
    return m.id.toLowerCase().includes(q) || m.name.toLowerCase().includes(q);
  });
  return (
    <>
      <PageHeader title="MITRE ATT&CK Coverage" description={`${mockMitre.length} techniques detected across your environment.`} />
      <div className="space-y-6 p-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by technique ID or name…"
              className="h-9 w-full rounded-lg border border-border bg-card/60 pl-9 pr-3 text-sm focus:border-primary/50 focus:outline-none" />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {tactics.map((t) => (
              <button key={t} onClick={() => setTactic(t)}
                className={`rounded-md border px-3 py-1.5 text-xs transition-colors ${tactic === t ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-foreground"}`}>
                {t === "all" ? "All tactics" : t}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((m) => (
            <div key={m.id} className="glass-panel rounded-xl p-5 transition-all hover:border-primary/40">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2"><Target className="h-3.5 w-3.5 text-accent" /><span className="font-mono text-xs font-bold text-accent">{m.id}</span></div>
                  <h3 className="mt-1.5 text-base font-semibold">{m.name}</h3>
                  <p className="mt-0.5 text-[11px] uppercase tracking-wider text-muted-foreground">{m.tactic}</p>
                </div>
                <SeverityBadge severity={m.severity} />
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{m.description}</p>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs">
                <span className="text-muted-foreground">Related threats</span>
                <span className="rounded-md bg-primary/10 px-2 py-0.5 font-mono font-semibold text-primary">{m.relatedThreats.length}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}