export type Severity = "critical" | "high" | "medium" | "low";

export interface Threat {
  id: string;
  name: string;
  severity: Severity;
  mitre: string;
  sourceIp: string;
  timestamp: string;
  riskScore: number;
  description: string;
}

export interface TimelineEvent {
  timestamp: string;
  description: string;
  user: string;
  ip: string;
}

export interface MitreTechnique {
  id: string;
  name: string;
  tactic: string;
  severity: Severity;
  description: string;
  relatedThreats: string[];
}

export interface AnalyzeResponse {
  threats: Threat[];
  timeline: TimelineEvent[];
  ai_report: string;
}