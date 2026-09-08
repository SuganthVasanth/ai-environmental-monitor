export type Severity = "normal" | "watch" | "warning" | "critical";

export type NodeCategory = "river" | "industrial" | "landslide" | "forest";

export type RiverAlertLevel = "SAFE" | "WATCH" | "WARNING" | "CRITICAL";
export type IndustrialAlertLevel = "NORMAL" | "WATCH" | "WARNING" | "EMERGENCY";
export type LandslideAlertLevel = "LOW" | "WATCH" | "WARNING" | "HIGH";
export type ForestAlertLevel = "NORMAL" | "WATCH" | "WARNING" | "CRITICAL";

export interface TimeSeriesPoint {
  time: string;
  value: number;
  value2?: number;
  rainfall?: number;
  risk?: number;
}

export interface MapNode {
  id: string;
  name: string;
  category: NodeCategory;
  severity: Severity;
  x: number; // percentage in grid map
  y: number; // percentage in grid map
  lat?: number;
  lng?: number;
  location?: string;
  primaryMetric?: string;
  primaryValue?: string;
  riskScore?: number;
  lastUpdated?: string;
}

export interface RiverNode {
  id: string;
  name: string;
  location: string;
  coordinates: { lat: number; lng: number; x: number; y: number };
  waterLevel: number; // in meters
  waterLevelThreshold: number; // critical threshold in meters
  rateOfRise: number; // m/hr (+ or -)
  rainfall: number; // mm/24h or mm/h
  ph: number;
  turbidity: number; // NTU
  tds: number; // ppm
  temperature: number; // °C
  floodRisk: number; // 0-100%
  confidence: number; // 0-100%
  alertLevel: RiverAlertLevel;
  severity: Severity;
  battery: number; // %
  connectivity: "LoRaWAN" | "Cellular NB-IoT" | "Satellite Mesh";
  signalDbm: number;
  gatewayId: string;
  lastUpdate: string;
  trends: {
    waterLevel: TimeSeriesPoint[];
    rainfall: TimeSeriesPoint[];
    floodRisk: TimeSeriesPoint[];
    waterQuality: TimeSeriesPoint[];
  };
}

export interface IndustrialNode {
  id: string;
  name: string;
  location: string;
  coordinates: { lat: number; lng: number; x: number; y: number };
  pm25: number; // µg/m³
  pm10: number; // µg/m³
  gasConcentration: number; // ppb
  gasType: string; // e.g. "VOC / SO2"
  temperature: number; // °C
  humidity: number; // %
  pollutionRisk: number; // 0-100%
  alertLevel: IndustrialAlertLevel;
  severity: Severity;
  battery: number; // %
  connectivity: "Cellular 4G" | "LoRaWAN" | "Ethernet";
  signalDbm: number;
  gatewayId: string;
  lastUpdate: string;
  alertAssessment: {
    currentLevel: string;
    previousLevel: string;
    trend: "Rising" | "Falling" | "Stable" | "Spiking";
    riskLevel: string;
    persistenceHours: number;
    movingAveragePpm: number;
    rateOfChangePerHr: string;
  };
  trends: {
    pm25: TimeSeriesPoint[];
    pm10: TimeSeriesPoint[];
    gasConcentration: TimeSeriesPoint[];
    pollutionRisk: TimeSeriesPoint[];
  };
}

export interface LandslideNode {
  id: string;
  name: string;
  location: string;
  coordinates: { lat: number; lng: number; x: number; y: number };
  rainfall: number; // mm/24h
  soilMoisture: number; // %
  tilt: number; // degrees deviation
  tiltRate: number; // deg/hr
  vibration: number; // mm/s or g
  temperature: number; // °C
  humidity: number; // %
  landslideRisk: number; // 0-100%
  confidence: number; // 0-100%
  alertLevel: LandslideAlertLevel;
  severity: Severity;
  battery: number; // %
  connectivity: "LoRaWAN Mesh" | "Cellular NB-IoT";
  signalDbm: number;
  gatewayId: string;
  lastUpdate: string;
  riskFusion: {
    rainfallWeight: number;
    soilMoistureWeight: number;
    tiltWeight: number;
    vibrationWeight: number;
    environmentalWeight: number;
  };
  trends: {
    rainfall: TimeSeriesPoint[];
    soilMoisture: TimeSeriesPoint[];
    tilt: TimeSeriesPoint[];
    vibration: TimeSeriesPoint[];
    risk: TimeSeriesPoint[];
  };
}

export interface ForestNode {
  id: string;
  name: string;
  location: string;
  coordinates: { lat: number; lng: number; x: number; y: number };
  temperature: number; // °C
  humidity: number; // %
  smoke: "Low" | "Moderate" | "High" | "Very High";
  pm25: number; // µg/m³
  gasConcentration: string; // e.g. "Normal", "Elevated", "Critical"
  rainfall: string; // e.g. "None", "Low", "Moderate"
  fireRisk: number; // 0-100%
  confidence: number; // 0-100%
  alertLevel: ForestAlertLevel;
  severity: Severity;
  battery: number; // %
  connectivity: "LoRaWAN Mesh" | "Cellular NB-IoT" | "Satellite Link";
  signalDbm: number;
  gatewayId: string;
  lastUpdate: string;
  sensorHealth: string;
  trends: {
    temperature: TimeSeriesPoint[];
    humidity: TimeSeriesPoint[];
    smokePm25: TimeSeriesPoint[];
    risk: TimeSeriesPoint[];
  };
}

export interface AlertItem {
  id: string;
  severity: Severity;
  label: string;
  node: string;
  nodeId?: string;
  category?: NodeCategory;
  location?: string;
  description: string;
  timeAgo: string;
  timestamp?: string;
  status?: "active" | "acknowledged" | "resolved";
  readingSnapshot?: string;
  actionRequired?: string;
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

export interface NodeHealthRecord {
  id: string;
  name: string;
  category: NodeCategory;
  status: "Online" | "Offline" | "Degraded" | "Low Battery" | "Communication Lost";
  battery: number;
  signalDbm: number;
  gateway: string;
  lastCommunication: string;
  healthScore: number;
  uptimePercent: number;
  packetLossPercent: number;
}

export interface HistoricalRecord {
  id: string;
  timestamp: string;
  nodeId: string;
  nodeName: string;
  category: NodeCategory;
  metric: string;
  value: string;
  riskScore: number;
  status: Severity;
}
