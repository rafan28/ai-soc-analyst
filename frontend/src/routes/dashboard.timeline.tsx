import { createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin, User } from "lucide-react";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { useAnalysisStore } from "@/lib/analysisStore";

export const Route = createFileRoute("/dashboard/timeline")({ component: TimelinePage });
function formatTimestamp(value?: string) {
  if (!value) return "Timestamp unavailable";
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? value : date.toLocaleString();
}
function TimelinePage() {
  const { timeline, hasAnalyzed } = useAnalysisStore();
  return (
    <>
      <PageHeader
        title="Attack Timeline"
        description={
          hasAnalyzed
            ? `${timeline.length} event${timeline.length === 1 ? "" : "s"} reconstructed from the latest analysis.`
            : "Chronological events returned by the analysis engine."
        }
      />
      <div className="p-6">
        {!hasAnalyzed ? (
          <EmptyState />
        ) : !timeline.length ? (
          <div className="glass-panel rounded-xl p-10 text-center text-sm text-muted-foreground">
            Analysis completed with no timeline events.
          </div>
        ) : (
          <div className="glass-panel rounded-2xl p-5 sm:p-8">
            <div className="relative">
              <div className="absolute bottom-0 left-[15px] top-0 w-px bg-gradient-to-b from-primary via-accent to-transparent" />
              <ol className="space-y-7">
                {timeline.map((event, index) => (
                  <li key={`${event.timestamp ?? "event"}-${index}`} className="relative pl-12">
                    <div className="absolute left-0 top-1 grid h-8 w-8 place-items-center rounded-full border-2 border-primary bg-background">
                      <Clock className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <article className="rounded-xl border border-border bg-card/60 p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <time className="font-mono text-xs text-primary">
                          {formatTimestamp(event.timestamp)}
                        </time>
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          Event {index + 1}
                        </span>
                      </div>
                      <p className="mt-2 text-sm font-medium">{event.description}</p>
                      {(event.user || event.ip) && (
                        <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
                          {event.user && (
                            <span className="inline-flex items-center gap-1.5">
                              <User className="h-3 w-3" />
                              <span className="font-mono">{event.user}</span>
                            </span>
                          )}
                          {event.ip && (
                            <span className="inline-flex items-center gap-1.5">
                              <MapPin className="h-3 w-3" />
                              <span className="font-mono">{event.ip}</span>
                            </span>
                          )}
                        </div>
                      )}
                    </article>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
