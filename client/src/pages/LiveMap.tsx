import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Factory,
  Layers,
  MapPin,
  Maximize2,
  Minimize2,
  Mountain,
  Navigation,
  SlidersHorizontal,
  TreePine,
  Waves,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { mapNodes } from "@/data/mockData";
import { DemoBadge } from "@/components/common/DemoBadge";
import { RiskBadge } from "@/components/common/RiskBadge";
import { StatusBadge } from "@/components/common/StatusBadge";
import { cn } from "@/lib/utils";
import type { MapNode, NodeCategory, Severity } from "@/types/node";

const categoryIcon: Record<NodeCategory, typeof Waves> = {
  river: Waves,
  industrial: Factory,
  landslide: Mountain,
  forest: TreePine,
};

const categoryColor: Record<NodeCategory, string> = {
  river: "text-primary border-primary/40 bg-primary/10",
  industrial: "text-secondary border-secondary/40 bg-secondary/10",
  landslide: "text-watch border-watch/40 bg-watch/10",
  forest: "text-warning border-warning/40 bg-warning/10",
};

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

export function LiveMap() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all");
  const [activeNode, setActiveNode] = useState<MapNode | null>(mapNodes[0] ?? null);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [showRadar, setShowRadar] = useState<boolean>(true);

  // Filter map nodes
  const filteredNodes = mapNodes.filter((node) => {
    const matchCat = selectedCategory === "all" || node.category === selectedCategory;
    const matchSev = selectedSeverity === "all" || node.severity === selectedSeverity;
    return matchCat && matchSev;
  });

  const getNodeDetailUrl = (node: MapNode) => {
    if (node.category === "river") return `/river-nodes/${node.id}`;
    if (node.category === "industrial") return `/industrial-nodes/${node.id}`;
    if (node.category === "forest") return `/forest-nodes`;
    return `/landslide-nodes/${node.id}`;
  };

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-4">
      {/* Header & Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
              Live Geospatial Monitoring Map
            </h2>
            <DemoBadge />
          </div>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            Interactive environmental sensor mesh with real-time risk markers and telemetry feeds.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="label-caps text-[10px] text-muted-foreground mr-1 hidden lg:inline">Layer:</span>
          {(
            [
              { id: "all", label: "All Nodes" },
              { id: "river", label: "River", icon: Waves },
              { id: "industrial", label: "Industrial", icon: Factory },
              { id: "landslide", label: "Landslide", icon: Mountain },
              { id: "forest", label: "Forest", icon: TreePine },
            ] as const
          ).map((cat) => {
            const Icon = "icon" in cat ? cat.icon : null;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "label-caps flex items-center gap-1.5 rounded-lg border px-3 py-1.5 transition-all text-xs",
                  isSelected
                    ? "border-primary/50 bg-primary/15 text-primary ring-1 ring-primary/30"
                    : "border-border bg-card text-muted-foreground hover:bg-surface-raised hover:text-foreground"
                )}
              >
                {Icon && <Icon size={13} />}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="panel p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="label-caps text-[10px] text-muted-foreground">Severity:</span>
          {[
            { id: "all", label: "All" },
            { id: "normal", label: "Normal" },
            { id: "watch", label: "Watch" },
            { id: "warning", label: "Warning" },
            { id: "critical", label: "Critical" },
          ].map((sev) => (
            <button
              key={sev.id}
              type="button"
              onClick={() => setSelectedSeverity(sev.id)}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                selectedSeverity === sev.id
                  ? "bg-surface-raised text-foreground ring-1 ring-border"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {sev.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowRadar(!showRadar)}
            className={cn(
              "flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1 text-xs transition-colors",
              showRadar ? "bg-primary/10 text-primary border-primary/30" : "bg-card text-muted-foreground"
            )}
          >
            <Layers size={13} />
            <span className="label-caps text-[10px]">Radar Sweep</span>
          </button>
          <div className="flex items-center rounded-md border border-border bg-card p-0.5">
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.max(80, z - 10))}
              className="p-1 text-muted-foreground hover:text-foreground"
              title="Zoom Out"
            >
              <ZoomOut size={14} />
            </button>
            <span className="font-mono text-[11px] px-1.5 text-muted-foreground">{zoomLevel}%</span>
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.min(140, z + 10))}
              className="p-1 text-muted-foreground hover:text-foreground"
              title="Zoom In"
            >
              <ZoomIn size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Map Canvas Area */}
      <div className="panel relative h-[600px] w-full overflow-hidden bg-background/95 sm:h-[680px]">
        {/* Coordinate Grid & Backdrop */}
        <div
          className="absolute inset-0 grid-backdrop transition-transform duration-300"
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: "center center" }}
        >
          {/* Topographic Contour Lines Simulation */}
          <svg className="absolute inset-0 h-full w-full opacity-15 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="contourPattern" width="200" height="200" patternUnits="userSpaceOnUse">
                <path d="M 0,50 Q 50,20 100,50 T 200,50" fill="none" stroke="oklch(0.797 0.134 211.5)" strokeWidth="1" />
                <path d="M 0,100 Q 50,80 100,110 T 200,100" fill="none" stroke="oklch(0.797 0.134 211.5)" strokeWidth="1" strokeDasharray="3 3" />
                <path d="M 0,150 Q 70,120 120,160 T 200,150" fill="none" stroke="oklch(0.627 0.233 303.9)" strokeWidth="1" />
                <circle cx="100" cy="100" r="40" fill="none" stroke="oklch(0.797 0.134 211.5 / 0.5)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#contourPattern)" />
          </svg>

          {/* Radial Ambient Glows */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,oklch(0.797_0.134_211.5/12%),transparent_50%),radial-gradient(circle_at_75%_65%,oklch(0.627_0.233_303.9/14%),transparent_55%)]" />

          {/* Radar Sweep Animation */}
          {showRadar && (
            <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[650px] rounded-full border border-primary/20 opacity-30">
              <div className="absolute inset-0 rounded-full border border-dashed border-primary/15" />
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg at 50% 50%, rgba(34,211,238,0.2) 0deg, transparent 60deg)",
                  animation: "spin 12s linear infinite",
                }}
              />
            </div>
          )}

          {/* River Flow Line Vector */}
          <svg className="absolute inset-0 h-full w-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M 220,160 Q 320,300 440,420 T 640,600"
              fill="none"
              stroke="oklch(0.797 0.134 211.5 / 0.35)"
              strokeWidth="4"
              strokeDasharray="8 6"
            />
          </svg>

          {/* Markers */}
          {filteredNodes.map((node) => {
            const Icon = categoryIcon[node.category];
            const isSelected = activeNode?.id === node.id;
            return (
              <div
                key={node.id}
                className="group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                onClick={() => setActiveNode(node)}
              >
                {/* Ping animation for Warning/Critical */}
                {(node.severity === "warning" || node.severity === "critical") && (
                  <span
                    className={cn(
                      "absolute inset-0 -z-10 animate-ping rounded-full opacity-40",
                      dotTone[node.severity]
                    )}
                  />
                )}

                {/* Marker Pin */}
                <div
                  className={cn(
                    "relative flex items-center justify-center size-9 rounded-full border ring-2 ring-inset transition-all duration-300 shadow-md",
                    markerTone[node.severity],
                    isSelected ? "scale-125 ring-primary ring-4" : "hover:scale-110"
                  )}
                >
                  <Icon size={16} />
                  {/* Category mini badge */}
                  <span className="absolute -top-1 -right-1 size-3 rounded-full border border-background bg-card text-[8px] flex items-center justify-center font-bold">
                    {node.category ? node.category.charAt(0).toUpperCase() : ""}
                  </span>
                </div>

                {/* Quick Hover Label */}
                <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-card/90 px-2 py-1 text-[11px] font-mono text-foreground opacity-0 backdrop-blur-xs transition-opacity group-hover:opacity-100 z-20">
                  {node.name} · {node.primaryValue}
                </span>
              </div>
            );
          })}
        </div>

        {/* Selected Node Details Popup Card */}
        {activeNode && (
          <div className="absolute right-4 top-4 z-30 w-80 rounded-xl border border-border bg-card/95 p-4 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-top-3">
            <div className="flex items-start justify-between border-b border-border pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className={cn("label-caps rounded-sm border px-1.5 py-0.5 text-[10px]", categoryColor[activeNode.category])}>
                    {activeNode.category}
                  </span>
                  <StatusBadge severity={activeNode.severity}>{activeNode.severity}</StatusBadge>
                </div>
                <h3 className="mt-1.5 font-semibold text-foreground text-sm">{activeNode.name}</h3>
                <p className="text-xs text-muted-foreground">{activeNode.location}</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveNode(null)}
                className="rounded-lg p-1 text-muted-foreground hover:text-foreground hover:bg-surface"
              >
                <X size={15} />
              </button>
            </div>

            <div className="mt-3 space-y-3">
              <div className="grid grid-cols-2 gap-2 rounded-lg bg-background/60 p-2.5">
                <div>
                  <span className="label-caps text-[10px] text-muted-foreground">{activeNode.primaryMetric ?? "Current Value"}</span>
                  <p className="font-mono text-base font-bold text-foreground">{activeNode.primaryValue ?? "Normal"}</p>
                </div>
                <div>
                  <span className="label-caps text-[10px] text-muted-foreground">Last Update</span>
                  <p className="font-mono text-xs text-muted-foreground mt-1">{activeNode.lastUpdated ?? "Just now"}</p>
                </div>
              </div>

              {activeNode.riskScore !== undefined && (
                <RiskBadge
                  label="Local Risk Score"
                  value={activeNode.riskScore}
                  severity={activeNode.severity}
                  compact
                />
              )}

              <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                <span>Coord: {activeNode.x}%, {activeNode.y}%</span>
                <span>Node: {activeNode.id}</span>
              </div>

              <Link
                to={getNodeDetailUrl(activeNode)}
                className="flex items-center justify-center gap-1.5 w-full rounded-lg bg-primary py-2 text-xs font-semibold text-primary-foreground transition-all hover:bg-primary/90 shadow-sm"
              >
                <span>View Node Telemetry</span>
                <Navigation size={13} />
              </Link>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 z-20 rounded-xl border border-border bg-card/90 p-3 shadow-lg backdrop-blur-md text-xs">
          <p className="label-caps mb-2 text-[10px] text-muted-foreground/80">Severity Legend</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
            {[
              { sev: "normal" as const, label: "Normal / Safe" },
              { sev: "watch" as const, label: "Watch" },
              { sev: "warning" as const, label: "Warning" },
              { sev: "critical" as const, label: "Critical / High" },
            ].map((item) => (
              <div key={item.sev} className="flex items-center gap-2 text-muted-foreground">
                <span className={cn("size-2 rounded-full", dotTone[item.sev])} />
                <span className="text-[11px]">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Coordinates Status Bar */}
        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-3 rounded-lg border border-border bg-card/90 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur-md font-mono">
          <div className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-normal animate-pulse" />
            <span className="text-[11px]">Mesh Active: {filteredNodes.length} Nodes</span>
          </div>
          <span className="hidden sm:inline text-border">|</span>
          <span className="label-caps text-[10px] hidden sm:inline">Region: 35.7°N, 139.7°E</span>
        </div>
      </div>
    </div>
  );
}
