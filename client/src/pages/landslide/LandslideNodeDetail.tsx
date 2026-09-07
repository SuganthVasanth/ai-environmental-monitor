import { Link, useParams } from "@tanstack/react-router";
import {
  Activity,
  ArrowLeft,
  CloudRain,
  Compass,
  Droplets,
  Gauge,
  Mountain,
  Radio,
  Sparkles,
  Thermometer,
  Vibrate,
} from "lucide-react";
import { landslideNodes } from "@/data/mockData";
import { DemoBadge } from "@/components/common/DemoBadge";
import { StatusBadge } from "@/components/common/StatusBadge";
import { BatteryIndicator } from "@/components/common/BatteryIndicator";
import { SignalIndicator } from "@/components/common/SignalIndicator";
import { SensorCard } from "@/components/nodes/SensorCard";
import { RiskAssessmentPanel } from "@/components/nodes/RiskAssessmentPanel";
import { SensorTrendChart } from "@/components/charts/SensorTrendChart";
import type { LandslideNode } from "@/types/node";

export function LandslideNodeDetail() {
  let id = "LN-04";
  try {
    const params = useParams({ strict: false });
    if (params?.id) id = params.id;
  } catch (e) {
    // fallback
  }

  const fallback = landslideNodes[0] as LandslideNode;
  const node: LandslideNode =
    landslideNodes.find((n) => n.id === id || n.name.toLowerCase().includes(id.toLowerCase())) ??
    fallback;

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      {/* Back button & Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <Link
            to="/landslide-nodes"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-primary mb-1"
          >
            <ArrowLeft size={14} />
            <span>Back to Landslide Nodes</span>
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
            {node.location} · Inclinometer & Piezometer Array · Lat {node.coordinates.lat}°N, Lng {node.coordinates.lng}°E
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

      {/* Main Sensor Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SensorCard
          label="Cumulative Rainfall"
          value={node.rainfall.toFixed(1)}
          unit="mm / 24h"
          severity={node.rainfall > 60 ? "critical" : node.rainfall > 40 ? "warning" : "normal"}
          icon={CloudRain}
          threshold="Critical Saturation: 75 mm"
        />
        <SensorCard
          label="Soil Moisture Content"
          value={node.soilMoisture}
          unit="% Volumetric"
          severity={node.soilMoisture > 80 ? "critical" : node.soilMoisture > 65 ? "warning" : "normal"}
          icon={Droplets}
          threshold="Pore Pressure Threshold"
        />
        <SensorCard
          label="Slope Tilt Angle"
          value={`${node.tilt.toFixed(1)}°`}
          unit="Deviation"
          rate={`+${node.tiltRate.toFixed(2)}°/h`}
          severity={node.tilt > 2.5 ? "critical" : node.tilt > 1.2 ? "warning" : "normal"}
          icon={Compass}
          threshold="Angular Shear Limit: 3.0°"
        />
        <SensorCard
          label="Seismic Micro-Vibration"
          value={node.vibration.toFixed(2)}
          unit="g (Acceleration)"
          severity={node.vibration > 0.08 ? "critical" : node.vibration > 0.04 ? "watch" : "normal"}
          icon={Vibrate}
          threshold="Acoustic Creep Detect"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SensorCard
          label="Ambient Temperature"
          value={node.temperature.toFixed(1)}
          unit="°C"
          severity="normal"
          icon={Thermometer}
          threshold="Freeze/Thaw Indicator"
        />
        <SensorCard
          label="Relative Humidity"
          value={node.humidity}
          unit="% RH"
          severity="normal"
          icon={Droplets}
          threshold="Atmospheric Moisture"
        />
        <SensorCard
          label="Landslide Risk Index"
          value={`${node.landslideRisk}%`}
          severity={node.severity}
          icon={Gauge}
          threshold="Geotechnical AI Model"
        />
        <SensorCard
          label="Sensor Cross-Confidence"
          value={`${node.confidence}%`}
          severity="normal"
          icon={Radio}
          threshold="Spatial Correlation"
        />
      </div>

      {/* Historical Telemetry Charts (Recharts) */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <SensorTrendChart
          title="Precipitation Infiltration (24h)"
          data={node.trends.rainfall}
          metricName="Rainfall"
          unit="mm / hour"
          strokeColor="oklch(0.797 0.134 211.5)"
          threshold={40}
          thresholdLabel="Infiltration Warning"
        />
        <SensorTrendChart
          title="Soil Moisture Saturation (24h)"
          data={node.trends.soilMoisture}
          metricName="Moisture"
          unit="percentage (%)"
          strokeColor="oklch(0.627 0.233 303.9)"
          threshold={75}
          thresholdLabel="Liquefaction Risk"
        />
        <SensorTrendChart
          title="Slope Inclinometer Tilt (24h)"
          data={node.trends.tilt}
          metricName="Tilt Angle"
          unit="degrees (°)"
          strokeColor="oklch(0.705 0.187 47.6)"
          threshold={2.5}
          thresholdLabel="Critical Creep Angle"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <SensorTrendChart
          title="Micro-Vibration / Acoustic Emission (24h)"
          data={node.trends.vibration}
          metricName="Vibration"
          unit="g (acceleration)"
          strokeColor="oklch(0.795 0.162 86)"
          threshold={0.08}
          thresholdLabel="Active Shear Rupture"
        />
        <SensorTrendChart
          title="Composite Landslide Risk Score (24h)"
          data={node.trends.risk}
          metricName="Risk Score"
          unit="probability (%)"
          strokeColor="oklch(0.637 0.208 25.3)"
          threshold={70}
          thresholdLabel="Evacuation Warning Level"
        />
      </div>

      {/* Multi-Sensor Risk Assessment Section */}
      <RiskAssessmentPanel
        category="landslide"
        riskScore={node.landslideRisk}
        confidence={node.confidence}
        riskLevel={node.alertLevel}
        severity={node.severity}
      />
    </div>
  );
}
