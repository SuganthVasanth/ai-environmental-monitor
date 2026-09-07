import type {
  AlertItem,
  MapNode,
  NodeTypeSummary,
  RiskItem,
  SummaryStat,
} from "@/types/node";

export const DEMO_NOTICE = {
  title: "DEMO ENVIRONMENT",
  detail: "Sensor values are simulated",
};

export const summaryStats: SummaryStat[] = [
  {
    id: "total-nodes",
    label: "Total Nodes",
    value: "35",
    support: "31 Online",
    trend: "+2 this week",
    severity: "normal",
  },
  {
    id: "active-alerts",
    label: "Active Alerts",
    value: "6",
    support: "2 Critical",
    trend: "+3 vs 24h",
    severity: "warning",
  },
  {
    id: "critical-nodes",
    label: "Critical Nodes",
    value: "3",
    support: "Requires Attention",
    trend: "Escalating",
    severity: "critical",
  },
  {
    id: "system-health",
    label: "System Health",
    value: "94.8%",
    support: "Operational",
    trend: "Stable",
    severity: "normal",
  },
];

export const nodeTypeSummaries: NodeTypeSummary[] = [
  {
    id: "river",
    title: "River Monitoring",
    nodes: 12,
    online: 10,
    warning: 1,
    criticalLabel: "Critical",
    criticalCount: 1,
    riskLabel: "Flood Risk",
    riskValue: 72,
    cta: "View River Nodes",
    to: "/river-nodes",
  },
  {
    id: "industrial",
    title: "Industrial Monitoring",
    nodes: 8,
    online: 8,
    warning: 2,
    criticalLabel: "Emergency",
    criticalCount: 0,
    riskLabel: "Pollution Risk",
    riskValue: 41,
    cta: "View Industrial Nodes",
    to: "/industrial-nodes",
  },
  {
    id: "landslide",
    title: "Landslide Monitoring",
    nodes: 15,
    online: 13,
    warning: 1,
    criticalLabel: "High Risk",
    criticalCount: 1,
    riskLabel: "Landslide Risk",
    riskValue: 27,
    cta: "View Landslide Nodes",
    to: "/landslide-nodes",
  },
];

export const riskOverview: RiskItem[] = [
  { id: "flood", label: "Flood Risk", value: 72, severity: "critical" },
  { id: "pollution", label: "Industrial Pollution", value: 41, severity: "warning" },
  { id: "landslide", label: "Landslide Risk", value: 27, severity: "watch" },
];

export const recentAlerts: AlertItem[] = [
  {
    id: "a1",
    severity: "critical",
    label: "HIGH",
    node: "Landslide Node 04",
    description: "Increased rainfall and movement indicators",
    timeAgo: "2 minutes ago",
  },
  {
    id: "a2",
    severity: "warning",
    label: "WARNING",
    node: "River Node 07",
    description: "Rapid water-level increase",
    timeAgo: "5 minutes ago",
  },
  {
    id: "a3",
    severity: "watch",
    label: "WATCH",
    node: "Industrial Node 03",
    description: "PM2.5 above recent baseline",
    timeAgo: "12 minutes ago",
  },
  {
    id: "a4",
    severity: "watch",
    label: "WATCH",
    node: "River Node 02",
    description: "Rainfall increasing",
    timeAgo: "18 minutes ago",
  },
];

export const mapNodes: MapNode[] = [
  { id: "m1", name: "River Node 02", category: "river", severity: "normal", x: 22, y: 34 },
  { id: "m2", name: "River Node 07", category: "river", severity: "watch", x: 44, y: 62 },
  { id: "m3", name: "Industrial Node 03", category: "industrial", severity: "critical", x: 68, y: 28 },
  { id: "m4", name: "Industrial Node 05", category: "industrial", severity: "warning", x: 79, y: 58 },
  { id: "m5", name: "Landslide Node 04", category: "landslide", severity: "normal", x: 55, y: 79 },
];

export const notifications: AlertItem[] = recentAlerts.slice(0, 3);

export const systemDate = "Sep 7, 2026";
