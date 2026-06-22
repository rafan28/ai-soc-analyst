import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { CheckCircle2, FileText, Loader2, Sparkles, Upload, X, Zap } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/dashboard/analysis")({ component: LogAnalysisPage });

function LogAnalysisPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [stage, setStage] = useState<"idle" | "uploading" | "analyzing" | "done">("idle");
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  function pickFile(f: File | null) {
    if (!f) return;
    setFile(f); setStage("idle"); setProgress(0);
  }

  async function runAnalysis() {
    if (!file) return;
    setStage("uploading");
    for (let i = 0; i <= 100; i += 5) { setProgress(i); await new Promise((r) => setTimeout(r, 40)); }
    setStage("analyzing");
    await new Promise((r) => setTimeout(r, 1200));
    setStage("done");
  }

  return (
    <>
      <PageHeader title="Log Analysis" description="Upload Linux authentication logs for AI-driven analysis." />
      <div className="space-y-6 p-6">
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); pickFile(e.dataTransfer.files?.[0] ?? null); }}
          className={`glass-panel relative rounded-2xl border-2 border-dashed p-12 text-center transition-all ${dragOver ? "border-primary bg-primary/5" : "border-border"}`}
        >
          <input ref={inputRef} type="file" accept=".log,.txt" className="hidden" onChange={(e) => pickFile(e.target.files?.[0] ?? null)} />
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-[var(--shadow-glow)]">
            <Upload className="h-6 w-6" />
          </div>
          <h3 className="mt-5 text-lg font-semibold">Drop your auth.log here</h3>
          <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
            Supports Linux authentication logs (/var/log/auth.log), syslog, and any plain-text log up to 200 MB.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <Button onClick={() => inputRef.current?.click()} variant="outline"><FileText className="mr-1.5 h-4 w-4" /> Choose file</Button>
            <Button onClick={runAnalysis} disabled={!file || stage === "uploading" || stage === "analyzing"} className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
              {stage === "analyzing" ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : <Zap className="mr-1.5 h-4 w-4" />}
              Analyze with AI
            </Button>
          </div>
          {file && (
            <div className="mx-auto mt-8 flex max-w-md items-center justify-between rounded-lg border border-border bg-card/60 p-3 text-left">
              <div className="flex min-w-0 items-center gap-3">
                <FileText className="h-4 w-4 shrink-0 text-primary" />
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{file.name}</div>
                  <div className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</div>
                </div>
              </div>
              <button onClick={() => { setFile(null); setStage("idle"); setProgress(0); }} className="text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {stage !== "idle" && (
          <div className="glass-panel space-y-4 rounded-xl p-6">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">
                {stage === "uploading" && "Uploading log file…"}
                {stage === "analyzing" && "AI agent is correlating events…"}
                {stage === "done" && "Analysis complete"}
              </span>
              <span className="font-mono text-xs text-muted-foreground">{stage === "done" ? "100%" : `${progress}%`}</span>
            </div>
            <Progress value={stage === "done" ? 100 : progress} />

            {stage === "done" && (
              <>
                <div className="grid gap-3 pt-4 sm:grid-cols-4">
                  {[
                    { label: "Events parsed", value: "1,418", tone: "" },
                    { label: "Threats found", value: "6", tone: "text-severity-critical" },
                    { label: "Techniques mapped", value: "5", tone: "text-accent" },
                    { label: "Analysis time", value: "2.4s", tone: "text-primary" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-lg border border-border bg-card/60 p-3">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.label}</p>
                      <p className={`mt-1 text-xl font-bold ${s.tone}`}>{s.value}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 p-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="flex-1">AI investigation report ready.</span>
                  <Button size="sm" onClick={() => navigate({ to: "/dashboard/investigation" })} className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
                    <Sparkles className="mr-1 h-3.5 w-3.5" /> View report
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}