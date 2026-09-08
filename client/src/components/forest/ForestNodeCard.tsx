import { ChevronRight, Droplets, Flame, Thermometer, Wind } from "lucide-react";
import type { ForestNode } from "@/types/node";
import { RiskBadge } from "@/components/common/RiskBadge";
import { StatusBadge } from "@/components/common/StatusBadge";
import { BatteryIndicator } from "@/components/common/BatteryIndicator";
import { SignalIndicator } from "@/components/common/SignalIndicator";
import { cn } from "@/lib/utils";

interface ForestNodeCardProps {
  node: ForestNode;
  onSelect: (node: ForestNode) => void;
}

export function ForestNodeCard({ node, onSelect }: ForestNodeCardProps) {
  const isCritical = node.severity === "critical";
  const isWarning = node.severity === "warning";

  return (
    <div
      className={cn(
        "panel group flex flex-col justify-between p-4 transition-all duration-200 hover:border-primary/50",
        isCritical && "border-critical/40 hover:border-critical/70 bg-gradient-to-b from-surface to-critical/[0.04]",
        isWarning && "border-warning/30 hover:border-warning/60"
      )}
    >
      <div className="space-y-3.5">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-primary">{node.id}</span>
              <span className="text-muted-foreground/40 text-xs">·</span>
              <span className="truncate font-medium text-xs text-muted-foreground">{node.name}</span>
            </div>
            <p className="mt-0.5 truncate text-xs text-foreground/80 font-medium">{node.location}</p>
          </div>
          <StatusBadge severity={node.severity}>{node.alertLevel}</StatusBadge>
        </div>

        {/* Sensor Telemetry Grid */}
        <div className="grid grid-cols-2 gap-2 rounded-lg bg-surface-raised/70 p-2.5 text-xs">
          <div className="space-y-0.5">
            <span className="label-caps flex items-center gap-1 text-[10px] text-muted-foreground">
              <Thermometer size={11} className={isCritical ? "text-critical" : "text-primary"} />
              Temperature
            </span>
            <p className={cn("font-mono text-sm font-bold", isCritical ? "text-critical" : "text-foreground")}>
              {node.temperature.toFixed(1)}°C
            </p>
          </div>

          <div className="space-y-0.5">
            <span className="label-caps flex items-center gap-1 text-[10px] text-muted-foreground">
              <Droplets size={11} className="text-primary" />
              Humidity
            </span>
            <p className={cn("font-mono text-sm font-bold", node.humidity < 30 ? "text-warning" : "text-foreground")}>
              {node.humidity}%
            </p>
          </div>

          <div className="space-y-0.5 pt-1">
            <span className="label-caps flex items-center gap-1 text-[10px] text-muted-foreground">
              <Flame size={11} className={node.smoke === "Very High" ? "text-critical" : node.smoke === "High" ? "text-warning" : "text-muted-foreground"} />
              Smoke Level
            </span>
            <p className={cn("font-mono text-xs font-semibold", node.smoke === "Very High" ? "text-critical" : node.smoke === "High" ? "text-warning" : "text-foreground/90")}>
              {node.smoke}
            </p>
          </div>

          <div className="space-y-0.5 pt-1">
            <span className="label-caps flex items-center gap-1 text-[10px] text-muted-foreground">
              <Wind size={11} className="text-secondary" />
              PM2.5 Particulate
            </span>
            <p className={cn("font-mono text-xs font-semibold", node.pm25 >= 150 ? "text-critical" : node.pm25 >= 75 ? "text-warning" : "text-foreground/90")}>
              {node.pm25} µg/m³
            </p>
          </div>
        </div>

        {/* Fire Risk Progress Bar */}
        <div className="pt-0.5">
          <RiskBadge
            label="Wildfire Threat Index"
            value={node.fireRisk}
            severity={node.severity}
            compact
          />
        </div>
      </div>

      {/* Footer / Controls */}
      <div className="mt-4 flex items-center justify-between border-t border-border/80 pt-3 text-xs">
        <div className="flex items-center gap-2.5">
          <BatteryIndicator level={node.battery} />
          <SignalIndicator dbm={node.signalDbm} />
          <span className="font-mono text-[10px] text-muted-foreground/70 hidden sm:inline">{node.lastUpdate}</span>
        </div>

        <button
          type="button"
          onClick={() => onSelect(node)}
          className="inline-flex items-center gap-1 rounded-md border border-border bg-card/80 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary active:scale-95 cursor-pointer"
        >
          <span>View Details</span>
          <ChevronRight size={13} className="transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}
