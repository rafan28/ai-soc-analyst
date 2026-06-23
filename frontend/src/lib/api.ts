import type { AnalyzeResponse, Severity, Threat, TimelineEvent } from "./types";

const API_URL = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000";

function object(value: unknown): Record<string, unknown> {
  return value !== null && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

function text(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function severity(value: unknown): Severity {
  const normalized = text(value)?.toLowerCase();
  return normalized === "critical" ||
    normalized === "high" ||
    normalized === "medium" ||
    normalized === "low"
    ? normalized
    : "unknown";
}

function number(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function normalizeThreat(value: unknown, index: number): Threat {
  const raw = object(value);
  const name = text(raw.threat) ?? text(raw.name) ?? "Unnamed detection";
  const sourceIp = text(raw.ip) ?? text(raw.sourceIp);
  const mitreId = text(raw.mitre_id) ?? text(raw.mitreId) ?? text(raw.mitre);
  const riskScore = number(raw.risk_score) ?? number(raw.riskScore);
  return {
    id: text(raw.id) ?? `${name}-${sourceIp ?? "source"}-${index}`,
    name,
    severity: severity(raw.severity),
    sourceIp,
    mitreId: mitreId === "Unknown" ? undefined : mitreId,
    mitreName: text(raw.mitre_name) ?? text(raw.mitreName),
    riskScore,
    description: text(raw.description),
    timestamp: text(raw.timestamp),
  };
}

function normalizeTimelineEvent(value: unknown): TimelineEvent | null {
  const raw = object(value);
  const description = text(raw.description) ?? text(raw.event);
  if (!description) return null;
  return {
    description,
    timestamp: text(raw.timestamp),
    user: text(raw.user),
    ip: text(raw.ip),
  };
}

export async function analyzeLog(file: File, signal?: AbortSignal): Promise<AnalyzeResponse> {
  const formData = new FormData();
  formData.append("file", file);

  let response: Response;
  try {
    response = await fetch(`${API_URL}/analyze`, { method: "POST", body: formData, signal });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") throw error;
    throw new Error(
      "Cannot reach the analysis backend. Confirm FastAPI is running on port 8000 and try again.",
    );
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    throw new Error(
      response.ok
        ? "The backend returned an invalid response."
        : `Analysis failed (HTTP ${response.status}).`,
    );
  }

  const raw = object(payload);
  if (!response.ok) {
    throw new Error(text(raw.detail) ?? `Analysis failed (HTTP ${response.status}).`);
  }
  if (!Array.isArray(raw.threats) || !Array.isArray(raw.timeline)) {
    throw new Error("The backend response is missing threats or timeline data.");
  }

  return {
    threats: raw.threats.map(normalizeThreat),
    timeline: raw.timeline
      .map(normalizeTimelineEvent)
      .filter((event): event is TimelineEvent => event !== null),
    aiReport: text(raw.ai_report) ?? "",
    filename: text(raw.filename) ?? file.name,
  };
}
