import { Link, useParams } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  Droplets,
  Factory,
  Flame,
  Gauge,
  Radio,
  Thermometer,
  Wind,
} from "lucide-react";
import { industrialNodes } from "@/data/mockData";
import { DemoBadge } from "@/components/common/DemoBadge";
import { StatusBadge } from "@/components/common/StatusBadge";
import { BatteryIndicator } from "@/components/common/BatteryIndicator";
import { SignalIndicator } from "@/components/common/SignalIndicator";
import { SensorCard } from "@/components/nodes/SensorCard";
import { RiskAssessmentPanel } from "@/components/nodes/RiskAssessmentPanel";
import { SensorTrendChart } from "@/components/charts/SensorTrendChart";
import type { IndustrialNode } from "@/types/node";

export function IndustrialNodeDetail() {
  let id = "IN-03";
  try {
    const params = useParams({ strict: false });
    if (params?.id) id = params.id;
  } catch (e) {
    // fallback
  }

  const fallback = industrialNodes[0] as IndustrialNode;
  const node: IndustrialNode =
    industrialNodes.find((n) => n.id === id || n.name.toLowerCase().includes(id.toLowerCase())) ??
    fallback;

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      {/* Back button & Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <Link
            to="/industrial-nodes"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-primary mb-1"
          >
            <ArrowLeft size={14} />
            <span>Back to Industrial Nodes</span>
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
              {node.name}
            </h2>
            <span className="font-mono text-xs text-muted-foreground border border-border px-2 py-0.5 rounded-md bg-card">
              {node.id}
            </span>
            <StatusBadge severity={node.severity}>{node.alertLevel}</StatusBadge>
            <DemoBadge />
          </div>
          <p className="text-xs text-muted-foreground">
            {node.location} · Stack Emission Point · Lat {node.coordinates.lat}°N, Lng {node.coordinates.lng}°E
          </p>
        </div>

        {/* Metadata Telemetry */}
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-2.5 text-xs">
          <BatteryIndicator level={node.battery} />
          <span className="text-border">|</span>
          <SignalIndicator dbm={node.signalDbm} protocol={node.connectivity} />
          <span className="text-border">|</span>
          <div className="font-mono text-muted-foreground text-[11px]">
            GW: <span className="text-foreground font-medium">{node.gatewayId}</span>
          </div>
          <span className="text-border">|</span>
          <div className="font-mono text-muted-foreground text-[11px]">
            Sync: <span className="text-foreground">{node.lastUpdate}</span>
          </div>
        </div>
      </div>

      {/* Main Sensor Telemetry Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <SensorCard
          label="PM2.5 Particulates"
          value={node.pm25}
          unit="µg/m³"
          severity={node.pm25 > 60 ? "critical" : node.pm25 > 35 ? "watch" : "normal"}
          icon={Wind}
          threshold="Target: <35 µg/m³"
        />
        <SensorCard
          label="PM10 Particulates"
          value={node.pm10}
          unit="µg/m³"
          severity={node.pm10 > 100 ? "warning" : "normal"}
          icon={Wind}
          threshold="EPA Limit: 150 µg/m³"
        />
        <SensorCard
          label="Chemical Gas Conc"
          value={node.gasConcentration}
          unit="ppb"
          severity={node.severity}
          icon={Flame}
          threshold={node.gasType}
        />
        <SensorCard
          label="Ambient Temperature"
          value={node.temperature.toFixed(1)}
          unit="°C"
          severity="normal"
          icon={Thermometer}
          threshold="Thermal Plume"
        />
        <SensorCard
          label="Relative Humidity"
          value={node.humidity}
          unit="% RH"
          severity="normal"
          icon={Droplets}
          threshold="Condensation Buffer"
        />
        <SensorCard
          label="Pollution Risk Index"
          value={`${node.pollutionRisk}%`}
          severity={node.severity}
          icon={Gauge}
          threshold="Composite Index"
        />
      </div>

      {/* Historical Telemetry Charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <SensorTrendChart
          title="PM2.5 Concentration Trend (24h)"
          data={node.trends.pm25}
          metricName="PM2.5"
          unit="µg/m³"
          strokeColor="oklch(0.797 0.134 211.5)"
          threshold={35}
          thresholdLabel="Air Quality Standard"
        />
        <SensorTrendChart
          title="PM10 Particulate Trajectory (24h)"
          data={node.trends.pm10}
          metricName="PM10"
          unit="µg/m³"
          strokeColor="oklch(0.627 0.233 303.9)"
          threshold={100}
          thresholdLabel="Industrial Warning Threshold"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <SensorTrendChart
          title="Gas / Chemical Concentration (24h)"
          data={node.trends.gasConcentration}
          metricName="Gas Concentration"
          unit="parts per billion (ppb)"
          strokeColor="oklch(0.795 0.162 86)"
          threshold={80}
          thresholdLabel="VOC Baseline Exceedance"
        />
        <SensorTrendChart
          title="Pollution Risk Trajectory (24h)"
          data={node.trends.pollutionRisk}
          metricName="Pollution Risk"
          unit="percentage (%)"
          strokeColor="oklch(0.705 0.187 47.6)"
          threshold={60}
          thresholdLabel="Elevated Risk Level"
        />
      </div>

      {/* Alert Assessment Section */}
      <RiskAssessmentPanel
        category="industrial"
        riskScore={node.pollutionRisk}
        confidence={92}
        riskLevel={node.alertLevel}
        severity={node.severity}
        alertAssessment={node.alertAssessment}
      />
    </div>
  );
}
