import { FileSearch } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function EmptyState({
  title = "No analysis available",
  description = "Upload a log file to begin.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="glass-panel flex min-h-72 flex-col items-center justify-center rounded-2xl px-6 py-12 text-center">
      <div className="grid h-12 w-12 place-items-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
        <FileSearch className="h-5 w-5" />
      </div>
      <h2 className="mt-4 text-base font-semibold">{title}</h2>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      <Button
        asChild
        size="sm"
        className="mt-5 bg-gradient-to-r from-primary to-accent text-primary-foreground"
      >
        <Link to="/dashboard/analysis">Analyze a log file</Link>
      </Button>
    </div>
  );
}
