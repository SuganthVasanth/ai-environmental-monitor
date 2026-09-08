import { useState } from "react";
import { AlertCircle, Flame, Layers, MapPin, Navigation, TreePine, ZoomIn } from "lucide-react";
import { forestNodes } from "@/data/mockData";
import type { ForestNode, Severity } from "@/types/node";
import { RiskBadge } from "@/components/common/RiskBadge";
import { StatusBadge } from "@/components/common/StatusBadge";
import { cn } from "@/lib/utils";

interface ForestRiskMapProps {
  onSelectNode?: (node: ForestNode) => void;
}

const markerTone: Record<Severity, string> = {
  normal: "bg-normal/20 text-normal ring-normal/60 border-normal",
  watch: "bg-watch/20 text-watch ring-watch/60 border-watch",
  warning: "bg-warning/20 text-warning ring-warning/60 border-warning",
  critical: "bg-critical/25 text-critical ring-critical/70 border-critical",
};

const dotTone: Record<Severity, string> = {
  normal: "bg-normal",
  watch: "bg-watch",
  warning: "bg-warning",
  critical: "bg-critical",
};

const legendItems = [
  { severity: "normal" as Severity, label: "Normal (0–30%)" },
  { severity: "watch" as Severity, label: "Watch (31–50%)" },
  { severity: "warning" as Severity, label: "Warning (51–75%)" },
  { severity: "critical" as Severity, label: "Critical (76–100%)" },
];

export function ForestRiskMap({ onSelectNode }: ForestRiskMapProps) {
  const [selectedNode, setSelectedNode] = useState<ForestNode>(forestNodes[3] ?? forestNodes[0]!); // Default to FN-04 (Critical)

  const handleMarkerClick = (node: ForestNode) => {
    setSelectedNode(node);
    if (onSelectNode) {
      onSelectNode(node);
    }
  };

  return (
    <section className="panel overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border p-4 sm:p-5">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded-lg bg-warning/15 text-warning ring-1 ring-warning/30">
              <TreePine size={16} />
            </span>
            <h3 className="truncate text-base font-semibold text-foreground sm:text-lg">
              Forest Fire Risk Map
            </h3>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Geospatial wildfire hazard distribution and thermal anomaly mapping.
          </p>
        </div>

        <span className="label-caps shrink-0 rounded-full bg-secondary/15 px-2.5 py-1 text-secondary ring-1 ring-inset ring-secondary/30">
          Simulated Grid Map
        </span>
      </div>

      {/* Map Canvas Area */}
      <div className="relative grid-backdrop h-[380px] w-full bg-background/80 sm:h-[460px] overflow-hidden">
        {/* Topographic Contour Lines SVG */}
        <svg className="pointer-events-none absolute inset-0 size-full opacity-25" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="forestContour" width="180" height="180" patternUnits="userSpaceOnUse">
              <path d="M 0,40 Q 45,10 90,40 T 180,40" fill="none" stroke="oklch(0.797 0.134 211.5)" strokeWidth="1" />
              <path d="M 0,90 Q 55,65 110,95 T 180,90" fill="none" stroke="oklch(0.705 0.187 47.6)" strokeWidth="1" strokeDasharray="3 3" />
              <path d="M 0,140 Q 60,110 120,150 T 180,140" fill="none" stroke="oklch(0.627 0.233 303.9)" strokeWidth="1" />
              <circle cx="90" cy="90" r="35" fill="none" stroke="oklch(0.797 0.134 211.5 / 0.4)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#forestContour)" />
        </svg>

        {/* Ambient Thermal Anomaly Glows */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_48%_64%,oklch(0.637_0.208_25.3/18%),transparent_45%),radial-gradient(circle_at_42%_18%,oklch(0.705_0.187_47.6/15%),transparent_40%),radial-gradient(circle_at_24%_38%,oklch(0.723_0.192_149.6/10%),transparent_35%)]" />

        {/* Pulsing Radar Sweep */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full border border-primary/10 opacity-30">
          <div className="absolute inset-0 rounded-full border border-dashed border-primary/10" />
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "conic-gradient(from 0deg at 50% 50%, rgba(34,211,238,0.18) 0deg, transparent 55deg)",
              animation: "spin 14s linear infinite",
            }}
          />
        </div>

        {/* Forest Terrain Ridge Vectors */}
        <svg className="pointer-events-none absolute inset-0 size-full" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 60,280 Q 220,180 380,240 T 700,320"
            fill="none"
            stroke="oklch(0.723 0.192 149.6 / 0.25)"
            strokeWidth="3"
            strokeDasharray="6 4"
          />
          <path
            d="M 180,80 Q 340,160 520,120 T 840,180"
            fill="none"
            stroke="oklch(0.705 0.187 47.6 / 0.25)"
            strokeWidth="2.5"
            strokeDasharray="4 4"
          />
        </svg>

        {/* Prominent Demo Notice Banner */}
        <div className="pointer-events-none absolute top-3 left-1/2 -translate-x-1/2 z-20 rounded-full border border-secondary/30 bg-card/90 px-3.5 py-1 text-center backdrop-blur-md shadow-md">
          <p className="label-caps text-[10px] text-secondary font-bold">
            DEMO DATA · Locations are simulated and do not represent real deployed nodes.
          </p>
        </div>

        {/* Forest Markers (FN-01 to FN-04 explicitly, plus all 10 nodes) */}
        {forestNodes.map((node) => {
          const isSelected = selectedNode?.id === node.id;
          const isCritical = node.severity === "critical";
          const isWarning = node.severity === "warning";

          return (
            <div
              key={node.id}
              className="group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
              style={{ left: `${node.coordinates.x}%`, top: `${node.coordinates.y}%` }}
              onClick={() => handleMarkerClick(node)}
            >
              {/* Pulsing ring for warning/critical nodes */}
              {(isCritical || isWarning) && (
                <span
                  className={cn(
                    "absolute inset-0 -z-10 animate-ping rounded-full opacity-40",
                    dotTone[node.severity]
                  )}
                />
              )}

              {/* Marker Icon */}
              <div
                className={cn(
                  "relative grid size-8 sm:size-9 place-items-center rounded-full border shadow-md backdrop-blur-md transition-transform duration-200 group-hover:scale-110",
                  markerTone[node.severity],
                  isSelected && "ring-2 ring-foreground scale-110 shadow-lg"
                )}
              >
                {isCritical ? <Flame size={16} /> : <TreePine size={16} />}
              </div>

              {/* Hover Tooltip Label */}
              <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap rounded-lg border border-border bg-card/95 px-2.5 py-1.5 text-xs text-foreground opacity-0 shadow-lg transition-all duration-150 group-hover:opacity-100 group-hover:-translate-y-1 z-30">
                <p className="font-semibold text-xs text-foreground flex items-center gap-1.5">
                  <span>{node.name}</span>
                  <span className="font-mono text-muted-foreground text-[10px]">({node.id})</span>
                </p>
                <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground mt-0.5">
                  <span>{node.temperature.toFixed(1)}°C</span>
                  <span>·</span>
                  <span>{node.humidity}% RH</span>
                  <span>·</span>
                  <span className={cn(
                    "font-bold",
                    node.severity === "critical" ? "text-critical" : "text-warning"
                  )}>
                    Risk {node.fireRisk}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Selected Node Telemetry Floating Card (Top Right / Bottom Right) */}
        {selectedNode && (
          <div className="absolute top-12 right-3 sm:right-4 z-20 max-w-[260px] sm:max-w-[290px] rounded-xl border border-border bg-card/95 p-3.5 shadow-xl backdrop-blur-md">
            <div className="flex items-start justify-between gap-2 border-b border-border/80 pb-2">
              <div>
                <span className="font-mono text-xs font-bold text-primary">{selectedNode.id}</span>
                <h4 className="font-semibold text-xs sm:text-sm text-foreground">{selectedNode.name}</h4>
                <p className="text-[11px] text-muted-foreground truncate">{selectedNode.location}</p>
              </div>
              <StatusBadge severity={selectedNode.severity}>{selectedNode.alertLevel}</StatusBadge>
            </div>

            <div className="grid grid-cols-2 gap-2 my-2.5 text-xs font-mono">
              <div className="rounded-md bg-surface-raised/80 p-1.5">
                <span className="label-caps text-[9px] text-muted-foreground">Temp</span>
                <p className="font-bold text-foreground">{selectedNode.temperature.toFixed(1)}°C</p>
              </div>
              <div className="rounded-md bg-surface-raised/80 p-1.5">
                <span className="label-caps text-[9px] text-muted-foreground">Humidity</span>
                <p className="font-bold text-foreground">{selectedNode.humidity}%</p>
              </div>
              <div className="rounded-md bg-surface-raised/80 p-1.5">
                <span className="label-caps text-[9px] text-muted-foreground">Smoke</span>
                <p className="font-bold text-foreground">{selectedNode.smoke}</p>
              </div>
              <div className="rounded-md bg-surface-raised/80 p-1.5">
                <span className="label-caps text-[9px] text-muted-foreground">PM2.5</span>
                <p className="font-bold text-foreground">{selectedNode.pm25} µg/m³</p>
              </div>
            </div>

            <RiskBadge
              label="Local Fire Risk"
              value={selectedNode.fireRisk}
              severity={selectedNode.severity}
              compact
            />

            {onSelectNode && (
              <button
                type="button"
                onClick={() => onSelectNode(selectedNode)}
                className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary py-1.5 text-xs font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-95 cursor-pointer"
              >
                <span>Inspect Node Details</span>
                <Navigation size={12} />
              </button>
            )}
          </div>
        )}

        {/* Legend in Bottom Left */}
        <div className="absolute bottom-3 left-3 z-20 rounded-xl border border-border bg-card/90 p-2.5 shadow-lg backdrop-blur-md text-xs">
          <p className="label-caps mb-1.5 text-[9px] text-muted-foreground/80 font-semibold">Fire Severity Legend</p>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1">
            {legendItems.map((item) => (
              <div key={item.label} className="flex items-center gap-1.5 text-muted-foreground">
                <span className={cn("size-2 rounded-full", dotTone[item.severity])} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
