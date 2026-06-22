import type { AnalyzeResponse } from "./types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

/**
 * POST /analyze — uploads a log file to the FastAPI backend.
 * Expected response: { threats: [], timeline: [], ai_report: "" }
 */
export async function analyzeLogs(file: File): Promise<AnalyzeResponse> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch(`${BASE_URL}/analyze`, { method: "POST", body: fd });
  if (!res.ok) throw new Error(`Analyze failed: ${res.status}`);
  return res.json() as Promise<AnalyzeResponse>;
}