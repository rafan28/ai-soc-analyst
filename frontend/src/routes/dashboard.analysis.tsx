import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  FileText,
  Loader2,
  Sparkles,
  Upload,
  X,
  Zap,
} from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { analyzeLog } from "@/lib/api";
import { selectMitreTechniques, useAnalysisStore } from "@/lib/analysisStore";

export const Route = createFileRoute("/dashboard/analysis")({ component: LogAnalysisPage });

function LogAnalysisPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const state = useAnalysisStore();
  const navigate = useNavigate();
  const techniques = selectMitreTechniques(state);

  function pickFile(next: File | null) {
    if (next) {
      setFile(next);
      state.setError("");
    }
  }
  async function runAnalysis() {
    if (!file) return;
    state.setAnalyzing();
    try {
      state.setResults(await analyzeLog(file));
    } catch (error) {
      state.setError(error instanceof Error ? error.message : "The log could not be analyzed.");
    }
  }

  return (
    <>
      <PageHeader
        title="Log Analysis"
        description="Upload a Linux authentication log for detection, correlation, and AI investigation."
      />
      <div className="space-y-6 p-6">
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            pickFile(e.dataTransfer.files?.[0] ?? null);
          }}
          className={`glass-panel rounded-2xl border-2 border-dashed p-8 text-center sm:p-12 ${dragOver ? "border-primary bg-primary/5" : "border-border"}`}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".log,.txt,text/plain"
            className="hidden"
            onChange={(e) => pickFile(e.target.files?.[0] ?? null)}
          />
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
            <Upload className="h-6 w-6" />
          </div>
          <h2 className="mt-5 text-lg font-semibold">Upload a log file</h2>
          <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
            Choose or drop a plain-text Linux authentication log. The file is sent to your local
            FastAPI analysis engine.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Button
              onClick={() => inputRef.current?.click()}
              variant="outline"
              disabled={state.isAnalyzing}
            >
              <FileText className="mr-1.5 h-4 w-4" />
              Choose file
            </Button>
            <Button
              onClick={runAnalysis}
              disabled={!file || state.isAnalyzing}
              className="bg-gradient-to-r from-primary to-accent text-primary-foreground"
            >
              {state.isAnalyzing ? (
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
              ) : (
                <Zap className="mr-1.5 h-4 w-4" />
              )}
              {state.isAnalyzing ? "Analyzing…" : "Analyze with AI"}
            </Button>
          </div>
          {file && (
            <div className="mx-auto mt-7 flex max-w-md items-center justify-between rounded-lg border border-border bg-card/60 p-3 text-left">
              <div className="flex min-w-0 items-center gap-3">
                <FileText className="h-4 w-4 shrink-0 text-primary" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <button
                aria-label="Remove selected file"
                disabled={state.isAnalyzing}
                onClick={() => setFile(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
        {state.isAnalyzing && (
          <div className="glass-panel flex items-center gap-4 rounded-xl p-5">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <div>
              <p className="text-sm font-medium">Analyzing {file?.name}</p>
              <p className="text-xs text-muted-foreground">
                Parsing events, detecting threats, and waiting for Ollama to generate the
                investigation report.
              </p>
            </div>
          </div>
        )}
        {state.error && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm"
          >
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
            <div>
              <p className="font-medium">Analysis issue</p>
              <p className="mt-0.5 text-muted-foreground">{state.error}</p>
            </div>
          </div>
        )}
        {state.hasAnalyzed && !state.isAnalyzing && (
          <div className="glass-panel rounded-xl p-5">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <p className="text-sm font-medium">Analysis complete</p>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                { label: "Threats found", value: state.threats.length },
                { label: "Timeline events", value: state.timeline.length },
                { label: "MITRE techniques", value: techniques.length },
              ].map((item) => (
                <div key={item.label} className="rounded-lg border border-border bg-card/50 p-3">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {item.label}
                  </p>
                  <p className="mt-1 text-xl font-bold">{item.value}</p>
                </div>
              ))}
            </div>
            {state.aiReport && (
              <div className="mt-4 flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 p-3 text-sm">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="flex-1">AI investigation report ready.</span>
                <Button size="sm" onClick={() => navigate({ to: "/dashboard/investigation" })}>
                  View report
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
