import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Target } from "lucide-react";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { SeverityBadge } from "@/components/dashboard/SeverityBadge";
import { selectMitreTechniques, useAnalysisStore } from "@/lib/analysisStore";

export const Route = createFileRoute("/dashboard/mitre")({ component: MitrePage });
function MitrePage() {
  const state = useAnalysisStore();
  const [query, setQuery] = useState("");
  const techniques = selectMitreTechniques(state);
  const filtered = techniques.filter((technique) =>
    `${technique.id} ${technique.name ?? ""}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <PageHeader
        title="MITRE ATT&CK"
        description={
          state.hasAnalyzed
            ? `${techniques.length} unique technique${techniques.length === 1 ? "" : "s"} mapped from detected threats.`
            : "Techniques dynamically mapped from threat detections."
        }
      />
      <div className="space-y-5 p-6">
        {!state.hasAnalyzed ? (
          <EmptyState />
        ) : (
          <>
            {techniques.length > 0 && (
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search detected techniques"
                  className="h-10 w-full rounded-lg border border-border bg-card/60 pl-9 pr-3 text-sm outline-none focus:border-primary/50"
                />
              </div>
            )}
            {!filtered.length ? (
              <div className="glass-panel rounded-xl p-10 text-center text-sm text-muted-foreground">
                {techniques.length
                  ? "No detected techniques match your search."
                  : "No MITRE ATT&CK techniques were detected."}
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filtered.map((technique) => (
                  <article key={technique.id} className="glass-panel rounded-xl p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 font-mono text-xs font-bold text-accent">
                          <Target className="h-3.5 w-3.5" />
                          {technique.id}
                        </div>
                        <h2 className="mt-2 text-base font-semibold">
                          {technique.name ?? "Technique name not provided"}
                        </h2>
                      </div>
                      <SeverityBadge severity={technique.severity} />
                    </div>
                    <div className="mt-5 flex items-center justify-between border-t border-border pt-3 text-xs">
                      <span className="text-muted-foreground">Related detections</span>
                      <span className="rounded-md bg-primary/10 px-2 py-0.5 font-mono font-semibold text-primary">
                        {technique.relatedThreatIds.length}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
