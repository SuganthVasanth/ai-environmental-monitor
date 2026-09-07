export type Severity = "normal" | "watch" | "warning" | "critical";

export type NodeCategory = "river" | "industrial" | "landslide";

export interface MapNode {
  id: string;
  name: string;
  category: NodeCategory;
  severity: Severity;
  x: number;
  y: number;
}

export interface AlertItem {
  id: string;
  severity: Severity;
  label: string;
  node: string;
  description: string;
  timeAgo: string;
}

export interface RiskItem {
  id: string;
  label: string;
  value: number;
  severity: Severity;
}

export interface SummaryStat {
  id: string;
  label: string;
  value: string;
  support: string;
  trend: string;
  severity: Severity;
}

export interface NodeTypeSummary {
  id: NodeCategory;
  title: string;
  nodes: number;
  online: number;
  warning: number;
  criticalLabel: string;
  criticalCount: number;
  riskLabel: string;
  riskValue: number;
  cta: string;
  to: string;
}
