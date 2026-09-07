import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  CloudRain,
  Compass,
  Droplet,
  FlaskConical,
  Gauge,
  Layers,
  Radio,
  Thermometer,
  TrendingUp,
  Waves,
} from "lucide-react";
import { riverNodes } from "@/data/mockData";
import { DemoBadge } from "@/components/common/DemoBadge";
import { StatusBadge } from "@/components/common/StatusBadge";
import { BatteryIndicator } from "@/components/common/BatteryIndicator";
import { SignalIndicator } from "@/components/common/SignalIndicator";
import { SensorCard } from "@/components/nodes/SensorCard";
import { RiskAssessmentPanel } from "@/components/nodes/RiskAssessmentPanel";
import { SensorTrendChart } from "@/components/charts/SensorTrendChart";
import { MultiMetricChart } from "@/components/charts/MultiMetricChart";
import type { RiverNode } from "@/types/node";

export function RiverNodeDetail() {
  // Obtain node id from params or default to RN-07
  let id = "RN-07";
  try {
    const params = useParams({ strict: false });
    if (params?.id) id = params.id;
  } catch (e) {
    // fallback
  }

  const fallback = riverNodes[0] as RiverNode;
  const node: RiverNode = riverNodes.find((n) => n.id === id || n.name.toLowerCase().includes(id.toLowerCase())) ?? fallback;

  // Water quality combined trend series
  const waterQualityData = node.trends.waterQuality.map((wq: { time: string }, i: number) => ({
    time: wq.time,
    ph: Number((node.ph + Math.sin(i) * 0.15).toFixed(2)),
    turbidity: Number((node.turbidity + Math.cos(i) * 3.5).toFixed(1)),
    tds: Math.round(node.tds + Math.sin(i * 0.5) * 15),
  }));

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      {/* Back button & Navigation Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <Link
            to="/river-nodes"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-primary mb-1"
          >
            <ArrowLeft size={14} />
            <span>Back to River Nodes</span>
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
            {node.location} · Catchment Station · Lat {node.coordinates.lat}°N, Lng {node.coordinates.lng}°E
          </p>
        </div>

        {/* Telemetry metadata status pills */}
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <SensorCard
          label="Water Level"
          value={node.waterLevel.toFixed(2)}
          unit="m"
          rate={`${node.rateOfRise > 0 ? "+" : ""}${node.rateOfRise.toFixed(2)} m/h`}
          severity={node.severity}
          icon={Waves}
          threshold={`Crit: ${node.waterLevelThreshold}m`}
        />
        <SensorCard
          label="Rate of Rise"
          value={`${node.rateOfRise > 0 ? "+" : ""}${node.rateOfRise.toFixed(2)}`}
          unit="m/h"
          severity={node.rateOfRise > 0.4 ? "critical" : node.rateOfRise > 0.2 ? "warning" : "normal"}
          icon={TrendingUp}
          threshold="Max Allowable: 0.5 m/h"
        />
        <SensorCard
          label="Catchment Rainfall"
          value={node.rainfall.toFixed(1)}
          unit="mm / 24h"
          severity={node.rainfall > 60 ? "warning" : "normal"}
          icon={CloudRain}
          threshold="Storm Warning: 50 mm"
        />
        <SensorCard
          label="Water pH"
          value={node.ph.toFixed(1)}
          unit="pH"
          severity="normal"
          icon={Droplet}
          threshold="Nominal: 6.5 - 8.5"
        />
        <SensorCard
          label="Turbidity"
          value={node.turbidity.toFixed(1)}
          unit="NTU"
          severity={node.turbidity > 40 ? "watch" : "normal"}
          icon={Gauge}
          threshold="Sediment Alert: 40 NTU"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SensorCard
          label="Total Dissolved Solids"
          value={node.tds}
          unit="ppm"
          severity="normal"
          icon={FlaskConical}
          threshold="Target: <500 ppm"
        />
        <SensorCard
          label="Water Temperature"
          value={node.temperature.toFixed(1)}
          unit="°C"
          severity="normal"
          icon={Thermometer}
          threshold="Diurnal Range"
        />
        <SensorCard
          label="Flood Risk Score"
          value={`${node.floodRisk}%`}
          severity={node.severity}
          icon={Gauge}
          threshold="Hydrodynamic Model"
        />
        <SensorCard
          label="AI Model Confidence"
          value={`${node.confidence}%`}
          severity="normal"
          icon={Radio}
          threshold="Edge Cross-Validation"
        />
      </div>

      {/* Historical Telemetry Charts (Recharts) */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <SensorTrendChart
          title="Water Level Trend (24h)"
          data={node.trends.waterLevel}
          metricName="Water Level"
          unit="meters (m)"
          strokeColor="oklch(0.797 0.134 211.5)"
          threshold={node.waterLevelThreshold}
          thresholdLabel="Critical Spill Limit"
        />
        <SensorTrendChart
          title="Rainfall Accumulation (24h)"
          data={node.trends.rainfall}
          metricName="Rainfall"
          unit="mm / hour"
          strokeColor="oklch(0.627 0.233 303.9)"
          threshold={40}
          thresholdLabel="Flash Flood Threshold"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <SensorTrendChart
          title="Flood Risk Trajectory (24h)"
          data={node.trends.floodRisk}
          metricName="Risk Score"
          unit="percentage (%)"
          strokeColor="oklch(0.705 0.187 47.6)"
          threshold={70}
          thresholdLabel="High Risk Boundary"
        />
        <MultiMetricChart
          title="Water Quality Multi-Parameter Trend"
          subtitle="Turbidity (NTU) vs. pH across 24h cycle"
          data={waterQualityData}
          lines={[
            { key: "turbidity", name: "Turbidity", color: "oklch(0.795 0.162 86)", unit: "NTU" },
            { key: "ph", name: "pH Level", color: "oklch(0.723 0.192 149.6)", unit: "pH" },
          ]}
        />
      </div>

      {/* Edge AI Risk Assessment Section */}
      <RiskAssessmentPanel
        category="river"
        riskScore={node.floodRisk}
        confidence={node.confidence}
        riskLevel={node.alertLevel}
        severity={node.severity}
      />
    </div>
  );
}
