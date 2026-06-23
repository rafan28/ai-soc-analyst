export type Severity = "critical" | "high" | "medium" | "low" | "unknown";

export interface Threat {
  id: string;
  name: string;
  severity: Severity;
  sourceIp?: string;
  mitreId?: string;
  mitreName?: string;
  riskScore?: number;
  description?: string;
  timestamp?: string;
}

export interface TimelineEvent {
  timestamp?: string;
  description: string;
  user?: string;
  ip?: string;
}

export interface MitreTechnique {
  id: string;
  name?: string;
  severity: Severity;
  relatedThreatIds: string[];
}

export interface AnalyzeResponse {
  threats: Threat[];
  timeline: TimelineEvent[];
  aiReport: string;
  filename?: string;
}
