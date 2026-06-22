import { createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin, User } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { mockTimeline } from "@/lib/mockData";

export const Route = createFileRoute("/dashboard/timeline")({ component: TimelinePage });

function TimelinePage() {
  return (
    <>
      <PageHeader title="Attack Timeline" description="Reconstructed sequence of events for incident INC-2306." />
      <div className="p-6">
        <div className="glass-panel rounded-2xl p-8">
          <div className="relative">
            <div className="absolute bottom-0 left-[15px] top-0 w-px bg-gradient-to-b from-primary via-accent to-transparent" />
            <ol className="space-y-8">
              {mockTimeline.map((e, i) => (
                <li key={i} className="relative pl-12">
                  <div className="absolute left-0 top-1 grid h-8 w-8 place-items-center rounded-full border-2 border-primary bg-background shadow-[0_0_15px_-2px_var(--color-primary)]">
                    <Clock className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="rounded-xl border border-border bg-card/60 p-4 transition-colors hover:border-primary/40">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <time className="font-mono text-xs text-primary">{new Date(e.timestamp).toLocaleString()}</time>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Event #{i + 1}</span>
                    </div>
                    <p className="mt-2 text-sm font-medium">{e.description}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5"><User className="h-3 w-3" /> <span className="font-mono">{e.user}</span></span>
                      <span className="inline-flex items-center gap-1.5"><MapPin className="h-3 w-3" /> <span className="font-mono">{e.ip}</span></span>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}