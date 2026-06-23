import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertOctagon, Clock3, ShieldAlert, Target, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { SeverityBadge } from "@/components/dashboard/SeverityBadge";
import { Button } from "@/components/ui/button";
import { selectMitreTechniques, useAnalysisStore } from "@/lib/analysisStore";

export const Route = createFileRoute("/dashboard/")({ component: DashboardOverview });

function DashboardOverview() {
  const state = useAnalysisStore();
  const techniques = selectMitreTechniques(state);
  if (!state.hasAnalyzed)
    return (
      <>
        <PageHeader
          title="Security Overview"
          description="Metrics from your latest log analysis."
        />
        <div className="p-6">
          <EmptyState />
        </div>
      </>
    );

  const stats = [
    {
      label: "Total Threats",
      value: state.threats.length,
      icon: ShieldAlert,
      tone: "text-primary",
    },
    {
      label: "Critical Threats",
      value: state.threats.filter((t) => t.severity === "critical").length,
      icon: AlertOctagon,
      tone: "text-severity-critical",
    },
    {
      label: "High Severity",
      value: state.threats.filter((t) => t.severity === "high").length,
      icon: TrendingUp,
      tone: "text-severity-high",
    },
    { label: "MITRE Techniques", value: techniques.length, icon: Target, tone: "text-accent" },
    { label: "Timeline Events", value: state.timeline.length, icon: Clock3, tone: "text-primary" },
  ];
  const distribution = (["critical", "high", "medium", "low", "unknown"] as const).map(
    (severity) => ({
      severity,
      count: state.threats.filter((t) => t.severity === severity).length,
    }),
  );

  return (
    <>
      <PageHeader
        title="Security Overview"
        description={
          state.filename ? `Latest analysis: ${state.filename}` : "Latest completed analysis"
        }
        actions={
          <Button asChild size="sm" variant="outline">
            <Link to="/dashboard/analysis">New analysis</Link>
          </Button>
        }
      />
      <div className="space-y-6 p-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {stats.map((stat) => (
            <div key={stat.label} className="glass-panel rounded-xl p-5">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </p>
                <stat.icon className={`h-4 w-4 ${stat.tone}`} />
              </div>
              <p className="mt-3 text-3xl font-bold tracking-tight">{stat.value}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.55fr)]">
          <div className="glass-panel rounded-xl">
            <div className="flex items-center justify-between border-b border-border p-5">
              <div>
                <h2 className="text-sm font-semibold">Detected threats</h2>
                <p className="text-xs text-muted-foreground">
                  Results from the latest backend response
                </p>
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link to="/dashboard/threats">View all</Link>
              </Button>
            </div>
            {state.threats.length ? (
              <div className="divide-y divide-border">
                {state.threats.slice(0, 6).map((threat) => (
                  <div key={threat.id} className="flex items-center gap-3 px-5 py-3">
                    <SeverityBadge severity={threat.severity} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{threat.name}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {[threat.mitreId, threat.sourceIp].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                    {threat.riskScore !== undefined && (
                      <span className="font-mono text-sm font-bold">{threat.riskScore}/100</span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="p-8 text-center text-sm text-muted-foreground">
                Analysis completed with no threats detected.
              </p>
            )}
          </div>
          <div className="glass-panel rounded-xl p-5">
            <h2 className="text-sm font-semibold">Severity distribution</h2>
            <p className="text-xs text-muted-foreground">Detected threats by severity</p>
            <div className="mt-5 space-y-3">
              {distribution.map((item) => (
                <div
                  key={item.severity}
                  className="flex items-center justify-between rounded-lg border border-border bg-card/40 px-3 py-2"
                >
                  <SeverityBadge severity={item.severity} />
                  <span className="font-mono text-sm font-semibold">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
