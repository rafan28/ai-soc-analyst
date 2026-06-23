import { create } from "zustand";
import type { AnalyzeResponse, MitreTechnique, Threat, TimelineEvent } from "./types";

type AnalysisState = {
  threats: Threat[];
  timeline: TimelineEvent[];
  aiReport: string;
  filename?: string;
  hasAnalyzed: boolean;
  isAnalyzing: boolean;
  error: string | null;
  setAnalyzing: () => void;
  setResults: (data: AnalyzeResponse) => void;
  setError: (message: string) => void;
};

export const selectMitreTechniques = (state: AnalysisState): MitreTechnique[] => {
  const techniques = new Map<string, MitreTechnique>();
  for (const threat of state.threats) {
    if (!threat.mitreId) continue;
    const current = techniques.get(threat.mitreId);
    if (current) {
      current.relatedThreatIds.push(threat.id);
      continue;
    }
    techniques.set(threat.mitreId, {
      id: threat.mitreId,
      name: threat.mitreName,
      severity: threat.severity,
      relatedThreatIds: [threat.id],
    });
  }
  return [...techniques.values()];
};

export const useAnalysisStore = create<AnalysisState>((set) => ({
  threats: [],
  timeline: [],
  aiReport: "",
  hasAnalyzed: false,
  isAnalyzing: false,
  error: null,
  setAnalyzing: () => set({ isAnalyzing: true, error: null }),
  setResults: (data) =>
    set({
      ...data,
      hasAnalyzed: true,
      isAnalyzing: false,
      error: data.aiReport ? null : "Analysis completed, but the AI report was empty.",
    }),
  setError: (message) => set({ error: message, isAnalyzing: false }),
}));
