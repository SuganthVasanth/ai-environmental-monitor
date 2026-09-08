import { useEffect } from "react";
import {
  Activity,
  AlertTriangle,
  BatteryCharging,
  CheckCircle2,
  CloudRain,
  Droplets,
  Flame,
  Gauge,
  Radio,
  Sparkles,
  Thermometer,
  Wind,
  X,
} from "lucide-react";
import type { ForestNode } from "@/types/node";
import { StatusBadge } from "@/components/common/StatusBadge";
import { RiskBadge } from "@/components/common/RiskBadge";
import { BatteryIndicator } from "@/components/common/BatteryIndicator";
import { SignalIndicator } from "@/components/common/SignalIndicator";
import { cn } from "@/lib/utils";

interface ForestNodeDetailModalProps {
  node: ForestNode | null;
  onClose: () => void;
}

export function ForestNodeDetailModal({ node, onClose }: ForestNodeDetailModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!node) return null;

  const isCritical = node.severity === "critical";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-border p-5 bg-surface-raised/40">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-primary">{node.id}</span>
              <span className="text-muted-foreground/50">·</span>
              <h3 className="text-lg font-bold text-foreground sm:text-xl">
                {node.name}
              </h3>
              <StatusBadge severity={node.severity}>{node.alertLevel}</StatusBadge>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Location: <span className="text-foreground font-medium">{node.location}</span> · Coordinates: {node.coordinates.lat.toFixed(3)}, {node.coordinates.lng.toFixed(3)}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-surface-raised hover:text-foreground cursor-pointer"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[80vh] overflow-y-auto p-5 space-y-5">
          {/* Hero Threat Banner */}
          <div className={cn(
            "rounded-xl border p-4 flex flex-col sm:flex-row items-center justify-between gap-4",
            isCritical
              ? "border-critical/50 bg-critical/[0.08]"
              : "border-warning/40 bg-warning/[0.06]"
          )}>
            <div className="flex items-center gap-3">
              <span className={cn(
                "grid size-12 place-items-center rounded-xl ring-1 ring-inset",
                isCritical
                  ? "bg-critical/20 text-critical ring-critical/40"
                  : "bg-warning/20 text-warning ring-warning/40"
              )}>
                <Flame size={24} />
              </span>
              <div>
                <p className="label-caps text-[10px] text-muted-foreground font-semibold">
                  Wildfire Threat Evaluation
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-2xl font-black text-foreground">
                    {node.fireRisk}%
                  </span>
                  <span className={cn(
                    "font-bold text-sm",
                    isCritical ? "text-critical" : "text-warning"
                  )}>
                    {node.alertLevel} FIRE RISK
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-center sm:text-right font-mono text-xs">
              <div className="rounded-lg bg-card/80 border border-border px-3 py-1.5">
                <p className="label-caps text-[9px] text-muted-foreground">Model Confidence</p>
                <p className="font-bold text-primary mt-0.5">{node.confidence}%</p>
                <p className="text-[9px] text-muted-foreground/60">(Simulated)</p>
              </div>
              <div className="rounded-lg bg-card/80 border border-border px-3 py-1.5">
                <p className="label-caps text-[9px] text-muted-foreground">Status</p>
                <p className={cn("font-bold mt-0.5", isCritical ? "text-critical" : "text-warning")}>
                  {node.alertLevel}
                </p>
                <p className="text-[9px] text-muted-foreground/60">Active</p>
              </div>
            </div>
          </div>

          {/* Environmental Telemetry Metrics Grid */}
          <div>
            <h4 className="label-caps text-xs text-muted-foreground font-semibold mb-2.5">
              Live Sensor Telemetry
            </h4>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {/* Temperature */}
              <div className="rounded-xl border border-border bg-surface-raised/60 p-3 space-y-1">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="label-caps text-[10px]">Temperature</span>
                  <Thermometer size={14} className={isCritical ? "text-critical" : "text-primary"} />
                </div>
                <p className="font-mono text-xl font-bold text-foreground">
                  {node.temperature.toFixed(1)}°C
                </p>
                <p className="text-[11px] text-muted-foreground">Canopy ambient reading</p>
              </div>

              {/* Humidity */}
              <div className="rounded-xl border border-border bg-surface-raised/60 p-3 space-y-1">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="label-caps text-[10px]">Humidity</span>
                  <Droplets size={14} className="text-primary" />
                </div>
                <p className="font-mono text-xl font-bold text-foreground">
                  {node.humidity}%
                </p>
                <p className="text-[11px] text-muted-foreground">Relative humidity (RH)</p>
              </div>

              {/* Smoke */}
              <div className="rounded-xl border border-border bg-surface-raised/60 p-3 space-y-1">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="label-caps text-[10px]">Smoke Density</span>
                  <Flame size={14} className={node.smoke === "Very High" ? "text-critical" : "text-warning"} />
                </div>
                <p className={cn("font-mono text-xl font-bold", node.smoke === "Very High" ? "text-critical" : "text-foreground")}>
                  {node.smoke}
                </p>
                <p className="text-[11px] text-muted-foreground">Optical scatter detection</p>
              </div>

              {/* PM2.5 */}
              <div className="rounded-xl border border-border bg-surface-raised/60 p-3 space-y-1">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="label-caps text-[10px]">PM2.5 Particulate</span>
                  <Wind size={14} className="text-secondary" />
                </div>
                <p className="font-mono text-xl font-bold text-foreground">
                  {node.pm25} <span className="text-xs font-normal text-muted-foreground">µg/m³</span>
                </p>
                <p className="text-[11px] text-muted-foreground">Fine particle laser sensor</p>
              </div>

              {/* CO / Gas */}
              <div className="rounded-xl border border-border bg-surface-raised/60 p-3 space-y-1">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="label-caps text-[10px]">CO / Gas Conc</span>
                  <Gauge size={14} className="text-warning" />
                </div>
                <p className="font-mono text-sm sm:text-base font-bold text-foreground mt-1">
                  {node.gasConcentration}
                </p>
                <p className="text-[11px] text-muted-foreground">Combustion byproduct gas</p>
              </div>

              {/* Rainfall */}
              <div className="rounded-xl border border-border bg-surface-raised/60 p-3 space-y-1">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="label-caps text-[10px]">Precipitation</span>
                  <CloudRain size={14} className="text-primary" />
                </div>
                <p className="font-mono text-sm sm:text-base font-bold text-foreground mt-1">
                  {node.rainfall}
                </p>
                <p className="text-[11px] text-muted-foreground">Accumulated 24h rain</p>
              </div>
            </div>
          </div>

          {/* Node Health Information (Compact Section) */}
          <div className="rounded-xl border border-border bg-card p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity size={15} className="text-primary" />
                <h4 className="label-caps text-xs font-semibold text-foreground">
                  Node Health Information
                </h4>
              </div>
              <span className="label-caps text-[10px] text-muted-foreground/80">Hardware Diagnostics</span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 font-mono text-xs">
              <div className="rounded-lg bg-surface-raised p-2.5 space-y-1">
                <span className="label-caps text-[10px] text-muted-foreground flex items-center gap-1">
                  <BatteryCharging size={11} className="text-normal" />
                  Battery
                </span>
                <p className="text-sm font-bold text-foreground">{node.battery}%</p>
                <BatteryIndicator level={node.battery} />
              </div>

              <div className="rounded-lg bg-surface-raised p-2.5 space-y-1">
                <span className="label-caps text-[10px] text-muted-foreground flex items-center gap-1">
                  <Radio size={11} className="text-primary" />
                  LoRa Signal
                </span>
                <p className="text-sm font-bold text-foreground">{node.signalDbm} dBm</p>
                <SignalIndicator dbm={node.signalDbm} />
              </div>

              <div className="rounded-lg bg-surface-raised p-2.5 space-y-1">
                <span className="label-caps text-[10px] text-muted-foreground flex items-center gap-1">
                  <CheckCircle2 size={11} className="text-normal" />
                  Sensor Health
                </span>
                <p className="text-xs font-semibold text-normal truncate">{node.sensorHealth}</p>
                <span className="label-caps text-[9px] text-muted-foreground">{node.gatewayId}</span>
              </div>

              <div className="rounded-lg bg-surface-raised p-2.5 space-y-1">
                <span className="label-caps text-[10px] text-muted-foreground">Last Comm</span>
                <p className="text-xs font-semibold text-foreground truncate">{node.lastUpdate}</p>
                <span className="label-caps text-[9px] text-muted-foreground">Mesh Protocol</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border bg-surface-raised/30 px-5 py-3">
          <p className="label-caps text-[10px] text-muted-foreground">
            DEMO ENVIRONMENT · Sensor values and locations are simulated.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-border bg-card px-4 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-surface-raised cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
