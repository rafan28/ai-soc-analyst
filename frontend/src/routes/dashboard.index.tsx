import { createFileRoute } from "@tanstack/react-router";
import { Activity, AlertOctagon, Bot, ShieldAlert, Target, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { SeverityBadge } from "@/components/dashboard/SeverityBadge";
import { Button } from "@/components/ui/button";
import { mockThreats } from "@/lib/mockData";

export const Route = createFileRoute("/dashboard/")({ component: DashboardOverview });

const stats = [
  { label: "Total Threats Detected", value: "1,284", delta: "+12.4%", icon: ShieldAlert, tone: "text-primary" },
  { label: "Critical Threats", value: "23", delta: "+3", icon: AlertOctagon, tone: "text-severity-critical" },
  { label: "High Severity", value: "78", delta: "+8", icon: TrendingUp, tone: "text-severity-high" },
  { label: "MITRE Techniques", value: "47", delta: "+5", icon: Target, tone: "text-accent" },
  { label: "AI Investigations", value: "312", delta: "+24", icon: Bot, tone: "text-primary" },
];

const severityDist = [
  { label: "Critical", value: 23, color: "var(--severity-critical)" },
  { label: "High", value: 78, color: "var(--severity-high)" },
  { label: "Medium", value: 184, color: "var(--severity-medium)" },
  { label: "Low", value: 999, color: "var(--severity-low)" },
];
const trend = [12, 18, 14, 22, 28, 24, 32, 28, 38, 42, 36, 48, 44, 56];
const mitreDist = [
  { tactic: "Credential Access", count: 42 },
  { tactic: "Persistence", count: 31 },
  { tactic: "Privilege Escalation", count: 24 },
  { tactic: "Exfiltration", count: 18 },
  { tactic: "Defense Evasion", count: 15 },
  { tactic: "Lateral Movement", count: 9 },
];

function DashboardOverview() {
  const total = severityDist.reduce((a, b) => a + b.value, 0);
  const maxTrend = Math.max(...trend);
  const maxMitre = Math.max(...mitreDist.map((m) => m.count));
  return (
    <>
      <PageHeader title="Security Overview" description="Real-time posture across all monitored sensors."
        actions={<>
          <Button variant="outline" size="sm">Last 24h</Button>
          <Button size="sm" className="bg-gradient-to-r from-primary to-accent text-primary-foreground"><Activity className="mr-1.5 h-3.5 w-3.5" /> Run scan</Button>
        </>} />
      <div className="space-y-6 p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {stats.map((s) => (
            <div key={s.label} className="glass-panel rounded-xl p-5 transition-all hover:border-primary/40">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
                <s.icon className={`h-4 w-4 ${s.tone}`} />
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-bold tracking-tight">{s.value}</span>
                <span className="text-xs font-medium text-primary">{s.delta}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="glass-panel rounded-xl p-6">
            <h3 className="text-sm font-semibold">Severity Distribution</h3>
            <p className="text-xs text-muted-foreground">{total.toLocaleString()} events analyzed</p>
            <div className="mt-6 space-y-4">
              {severityDist.map((s) => {
                const pct = (s.value / total) * 100;
                return (
                  <div key={s.label}>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="font-medium">{s.label}</span>
                      <span className="font-mono text-muted-foreground">{s.value}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: s.color }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="glass-panel rounded-xl p-6">
            <h3 className="text-sm font-semibold">Threat Trend (14d)</h3>
            <p className="text-xs text-muted-foreground">Detections per day</p>
            <div className="mt-6 flex h-40 items-end gap-1.5">
              {trend.map((v, i) => (
                <div key={i} className="flex flex-1 flex-col justify-end">
                  <div className="rounded-t bg-gradient-to-t from-primary/40 to-accent transition-all hover:opacity-80" style={{ height: `${(v / maxTrend) * 100}%` }} />
                </div>
              ))}
            </div>
            <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
              <span>14d ago</span><span>7d</span><span>today</span>
            </div>
          </div>

          <div className="glass-panel rounded-xl p-6">
            <h3 className="text-sm font-semibold">MITRE ATT&CK Distribution</h3>
            <p className="text-xs text-muted-foreground">By tactic</p>
            <div className="mt-6 space-y-3">
              {mitreDist.map((m) => (
                <div key={m.tactic}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span>{m.tactic}</span>
                    <span className="font-mono text-muted-foreground">{m.count}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent" style={{ width: `${(m.count / maxMitre) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-xl">
          <div className="flex items-center justify-between border-b border-border p-5">
            <div>
              <h3 className="text-sm font-semibold">Latest Threats</h3>
              <p className="text-xs text-muted-foreground">Updated just now</p>
            </div>
            <Button variant="ghost" size="sm">View all</Button>
          </div>
          <div className="divide-y divide-border">
            {mockThreats.slice(0, 5).map((t) => (
              <div key={t.id} className="flex flex-wrap items-center gap-3 px-5 py-3">
                <SeverityBadge severity={t.severity} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{t.name}</div>
                  <div className="truncate text-xs text-muted-foreground">{t.mitre} · {t.sourceIp} · {new Date(t.timestamp).toLocaleTimeString()}</div>
                </div>
                <div className="shrink-0 font-mono text-sm font-bold">{t.riskScore}<span className="text-xs text-muted-foreground">/100</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}