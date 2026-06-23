import { Link } from "@tanstack/react-router";
import { ArrowRight, Bot, Clock, FileSearch, ShieldAlert, Target } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";

const capabilities = [
  {
    icon: FileSearch,
    title: "Log analysis",
    description: "Upload Linux authentication logs to your local FastAPI analysis pipeline.",
  },
  {
    icon: ShieldAlert,
    title: "Threat detection",
    description: "Review detections, severity, source addresses, and available risk scores.",
  },
  {
    icon: Clock,
    title: "Investigation timeline",
    description: "Follow the chronological event sequence returned by the backend.",
  },
  {
    icon: Target,
    title: "MITRE ATT&CK",
    description: "See technique coverage generated directly from detected threats.",
  },
  {
    icon: Bot,
    title: "AI investigation",
    description: "Read and export the incident report produced by your local Ollama model.",
  },
];

export function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-primary/15 blur-[140px]" />
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Logo />
        <Button
          asChild
          size="sm"
          className="bg-gradient-to-r from-primary to-accent text-primary-foreground"
        >
          <Link to="/dashboard/analysis">
            Open console <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </header>
      <main className="relative z-10">
        <section className="mx-auto max-w-7xl px-6 pb-20 pt-16 sm:pt-24">
          <div className="max-w-3xl">
            <p className="mb-5 font-mono text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              AI-powered security operations
            </p>
            <h1 className="text-balance text-5xl font-extrabold tracking-tight sm:text-7xl">
              Turn authentication logs into{" "}
              <span className="text-gradient">actionable investigations.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Protecto connects your FastAPI detection pipeline and local Ollama model to a focused
              SOC workspace. Every metric and view is built from your latest analysis—nothing
              simulated.
            </p>
            <div className="mt-9">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-[var(--shadow-glow)]"
              >
                <Link to="/dashboard/analysis">
                  <FileSearch className="mr-2 h-4 w-4" />
                  Analyze a log file
                </Link>
              </Button>
            </div>
          </div>
        </section>
        <section className="border-t border-border/50 bg-card/20 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold tracking-tight">One evidence-driven workflow</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Upload once, then move through detections, the reconstructed timeline, MITRE
                mappings, and the AI report without losing context.
              </p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              {capabilities.map((item) => (
                <article key={item.title} className="glass-panel rounded-xl p-5">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="relative z-10 border-t border-border/50 py-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <Logo />
          <p className="text-xs text-muted-foreground">Local-first SOC analysis</p>
        </div>
      </footer>
    </div>
  );
}
