import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Gauge, MapPin, ShieldAlert, Target } from "lucide-react";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { SeverityBadge } from "@/components/dashboard/SeverityBadge";
import { useAnalysisStore } from "@/lib/analysisStore";
import type { Severity } from "@/lib/types";

export const Route = createFileRoute("/dashboard/threats")({ component: ThreatsPage });
const filters: (Severity | "all")[] = ["all", "critical", "high", "medium", "low", "unknown"];

function ThreatsPage() {
  const { threats, hasAnalyzed } = useAnalysisStore();
  const [active, setActive] = useState<(typeof filters)[number]>("all");
  const list = active === "all" ? threats : threats.filter((threat) => threat.severity === active);
  return (
    <>
      <PageHeader
        title="Threat Detection"
        description={
          hasAnalyzed
            ? `${threats.length} threat${threats.length === 1 ? "" : "s"} detected in the latest analysis.`
            : "Detections from analyzed log data."
        }
      />
      <div className="space-y-5 p-6">
        {!hasAnalyzed ? (
          <EmptyState />
        ) : (
          <>
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActive(filter)}
                  className={`rounded-md border px-3 py-1.5 text-xs font-medium uppercase tracking-wider ${active === filter ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"}`}
                >
                  {filter}
                </button>
              ))}
            </div>
            {!list.length ? (
              <div className="glass-panel rounded-xl p-10 text-center text-sm text-muted-foreground">
                {threats.length
                  ? `No ${active} threats detected.`
                  : "Analysis completed with no threats detected."}
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {list.map((threat) => (
                  <article
                    key={threat.id}
                    className="glass-panel rounded-xl p-5 transition-colors hover:border-primary/40"
                  >
                    <div className="flex items-start justify-between">
                      <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                        <ShieldAlert className="h-5 w-5" />
                      </div>
                      <SeverityBadge severity={threat.severity} />
                    </div>
                    <h2 className="mt-4 text-base font-semibold">{threat.name}</h2>
                    {threat.description && (
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {threat.description}
                      </p>
                    )}
                    <dl className="mt-5 grid grid-cols-2 gap-4 text-xs">
                      {threat.sourceIp && (
                        <div>
                          <dt className="flex items-center gap-1 text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            Source IP
                          </dt>
                          <dd className="mt-1 font-mono font-semibold">{threat.sourceIp}</dd>
                        </div>
                      )}
                      {threat.mitreId && (
                        <div>
                          <dt className="flex items-center gap-1 text-muted-foreground">
                            <Target className="h-3 w-3" />
                            MITRE technique
                          </dt>
                          <dd className="mt-1 font-mono font-semibold text-accent">
                            {threat.mitreId}
                          </dd>
                        </div>
                      )}
                      {threat.riskScore !== undefined && (
                        <div>
                          <dt className="flex items-center gap-1 text-muted-foreground">
                            <Gauge className="h-3 w-3" />
                            Risk score
                          </dt>
                          <dd className="mt-1 font-mono font-semibold">{threat.riskScore}/100</dd>
                        </div>
                      )}
                    </dl>
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
