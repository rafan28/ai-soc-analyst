import { Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  Bot,
  CheckCircle2,
  Eye,
  FileSearch,
  Github,
  Lock,
  Network,
  Radar,
  ShieldCheck,
  Sparkles,
  Terminal,
  Twitter,
  Zap,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const features = [
  { icon: Bot, title: "AI-Driven Investigations", desc: "LLM-powered analysis correlates events, maps MITRE techniques, and writes incident-ready reports in seconds." },
  { icon: Radar, title: "Real-Time Threat Detection", desc: "Continuous parsing of authentication and system logs to surface brute force, lateral movement, and persistence." },
  { icon: Network, title: "MITRE ATT&CK Mapping", desc: "Every detection is automatically tagged to the relevant technique with confidence scoring." },
  { icon: FileSearch, title: "Forensic Timeline", desc: "Reconstruct attacker activity across hosts and users with a precise, vendor-neutral event timeline." },
  { icon: ShieldCheck, title: "Executive Reporting", desc: "Export polished investigation reports for leadership, auditors, and incident response teams." },
  { icon: Lock, title: "Private by Design", desc: "Logs never leave your perimeter. Bring your own model or run fully offline." },
];

const stats = [
  { value: "Sub-second", label: "AI triage time" },
  { value: "High", label: "Detection confidence" },
  { value: "Comprehensive", label: "MITRE coverage" },
  { value: "Scalable", label: "Event throughput" },
];


export function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-50" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[1100px] -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]" />

      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#features" className="hover:text-foreground">Features</a>
          <a href="#platform" className="hover:text-foreground">Platform</a>
          <a href="#docs" className="hover:text-foreground">Docs</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
            <Link to="/dashboard">Sign in</Link>
          </Button>
          <Button size="sm" asChild className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90">
            <Link to="/dashboard">Launch console <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
      </header>

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-12 md:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="mb-6 border-primary/30 bg-primary/10 text-primary">
            <Sparkles className="mr-1 h-3 w-3" /> AI SOC Analyst — v2.0 now live
          </Badge>
          <h1 className="text-balance text-5xl font-extrabold tracking-tight md:text-7xl">
            Detect, investigate &<br />
            <span className="text-gradient">respond at machine speed</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
            Protecto SOC Analyst ingests your authentication and system logs, surfaces the threats
            that matter, and writes a complete investigation report mapped to MITRE ATT&CK — in seconds.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" asChild className="bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-[var(--shadow-glow)] hover:opacity-90">
              <Link to="/dashboard/analysis"><Zap className="mr-2 h-4 w-4" /> Analyze Logs with AI</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/dashboard"><Eye className="mr-2 h-4 w-4" /> View live demo</Link>
            </Button>
          </div>
          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> SOC 2 ready</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Self-hostable</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> BYO model</span>
          </div>
        </div>

        <div className="relative mx-auto mt-20 max-w-5xl">
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-primary/50 via-accent/30 to-primary/50 opacity-60 blur-2xl" />
          <div className="glass-panel relative overflow-hidden rounded-2xl shadow-[var(--shadow-elevated)]">
            <div className="flex items-center gap-2 border-b border-border bg-muted/30 px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-severity-medium/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
              </div>
              <div className="ml-3 flex items-center gap-2 text-xs text-muted-foreground">
                <Terminal className="h-3.5 w-3.5" /> protecto / investigations / inc-2306
              </div>
            </div>
            <div className="grid gap-0 md:grid-cols-[1fr_280px]">
              <div className="space-y-3 p-6 font-mono text-xs leading-relaxed text-muted-foreground">
                <p><span className="text-primary">▶</span> Parsing 1,418 auth.log entries…</p>
                <p><span className="text-primary">▶</span> Correlating with MITRE ATT&CK matrix…</p>
                <p className="text-accent">✓ 6 threats identified across 4 tactics</p>
                <p className="text-accent">✓ Kill-chain reconstructed</p>
                <p className="mt-3 text-foreground"><span className="text-severity-critical">[CRITICAL]</span> Brute Force SSH from 203.0.113.42 — T1110.001</p>
                <p className="text-foreground"><span className="text-severity-high">[HIGH]</span> Privilege escalation via sudo — T1548.003</p>
                <p className="text-foreground"><span className="text-severity-high">[HIGH]</span> Persistence: cron entry added — T1053.003</p>
                <p className="text-foreground"><span className="text-severity-medium">[MED]</span> Outbound exfiltration — T1041</p>
                <p className="mt-3 inline-flex items-center gap-2 text-primary"><Sparkles className="h-3.5 w-3.5" /> AI report generated · 2.4s</p>
              </div>
              <div className="space-y-4 border-t border-border bg-card/40 p-5 md:border-l md:border-t-0">
                {[
                  { label: "Risk score", value: "96", tone: "text-severity-critical" },
                  { label: "Confidence", value: "94%", tone: "text-primary" },
                  { label: "Affected hosts", value: "1", tone: "text-foreground" },
                  { label: "Techniques", value: "5", tone: "text-accent" },
                ].map((s) => (
                  <div key={s.label} className="flex items-baseline justify-between border-b border-border/50 pb-2 last:border-0">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</span>
                    <span className={`font-mono text-lg font-bold ${s.tone}`}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-20 grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-extrabold text-gradient md:text-4xl">{s.value}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="relative z-10 border-t border-border/50 bg-card/20 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <Badge variant="outline" className="mb-3 border-accent/30 bg-accent/10 text-accent">Platform</Badge>
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Everything your SOC needs in one console</h2>
            <p className="mt-4 text-muted-foreground">From raw log to executive report, without the swivel-chair workflow.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="glass-panel group relative overflow-hidden rounded-xl p-6 transition-all hover:border-primary/50 hover:shadow-[var(--shadow-glow)]">
                <div className="mb-4 inline-grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="platform" className="relative z-10 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2">
          <div>
            <Badge variant="outline" className="mb-3 border-primary/30 bg-primary/10 text-primary">How it works</Badge>
            <h2 className="text-4xl font-bold tracking-tight">From raw log to actionable intelligence</h2>
            <p className="mt-4 text-muted-foreground">
              Drop in Linux auth logs, syslog, or any structured event stream. Protecto's pipeline parses,
              correlates, scores, and explains — so analysts spend their time deciding, not collecting.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                { icon: FileSearch, title: "Ingest", body: "Drag-and-drop or POST /analyze. Any text-based log." },
                { icon: Activity, title: "Detect", body: "Pattern + heuristic + ML scoring across the MITRE ATT&CK matrix." },
                { icon: Bot, title: "Investigate", body: "An LLM agent reasons over the events and writes the report." },
                { icon: ShieldCheck, title: "Respond", body: "Export, ticket, or push to your SOAR of choice." },
              ].map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-muted-foreground">0{i + 1}</span>
                      <h4 className="font-semibold">{step.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{step.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-panel relative overflow-hidden rounded-2xl p-8">
            <div className="absolute inset-0 grid-bg opacity-30" />
            <pre className="relative font-mono text-xs leading-relaxed text-muted-foreground whitespace-pre-wrap">
{`POST /analyze HTTP/1.1
Content-Type: multipart/form-data

--- auth.log ---
Jun 19 08:14:22 host sshd[1245]: Failed password
  for root from 203.0.113.42 port 53122 ssh2
Jun 19 08:14:23 host sshd[1245]: Failed password ...

`}<span className="text-primary">{`-> 200 OK
{
  "threats": [...],
  "timeline": [...],
  "ai_report": "## Executive Summary..."
}`}</span>
            </pre>
          </div>
        </div>
      </section>


      <section className="relative z-10 py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Give your SOC an AI co-analyst</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Spin up the console, drop in an auth log, and see what Protecto can do.</p>
          <div className="mt-8 flex justify-center gap-3">
            <Button size="lg" asChild className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
              <Link to="/dashboard/analysis"><Zap className="mr-2 h-4 w-4" /> Analyze Logs with AI</Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-border/50 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <Logo />
          <p className="text-xs text-muted-foreground">© 2026 Protecto Security. Defending what matters.</p>
          <div className="flex items-center gap-3 text-muted-foreground">
            <a href="#" className="hover:text-foreground"><Github className="h-4 w-4" /></a>
            <a href="#" className="hover:text-foreground"><Twitter className="h-4 w-4" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}