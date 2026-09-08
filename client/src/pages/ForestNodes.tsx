import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  ChevronRight,
  Clock,
  Flame,
  Radio,
  SlidersHorizontal,
  TreePine,
  Wifi,
} from "lucide-react";
import {
  DEMO_NOTICE,
  forestNodes,
  forestSummaryStats,
} from "@/data/mockData";
import type { ForestNode } from "@/types/node";
import { DemoBadge } from "@/components/common/DemoBadge";
import { StatusBadge } from "@/components/common/StatusBadge";
import { RiskBadge } from "@/components/common/RiskBadge";
import { BatteryIndicator } from "@/components/common/BatteryIndicator";
import { NodeFilters, type FilterOptions } from "@/components/nodes/NodeFilters";
import { ForestNodeCard } from "@/components/forest/ForestNodeCard";
import { ForestRiskCard } from "@/components/forest/ForestRiskCard";
import { ForestRiskIndicators } from "@/components/forest/ForestRiskIndicators";
import { ForestTrendCharts } from "@/components/forest/ForestTrendCharts";
import { ForestRiskMap } from "@/components/forest/ForestRiskMap";
import { ForestAlerts } from "@/components/forest/ForestAlerts";
import { ForestNodeDetailModal } from "@/components/forest/ForestNodeDetailModal";
import { cn } from "@/lib/utils";

const summaryIcons = [TreePine, Flame, AlertTriangle, Activity];

export function ForestNodes() {
  const [selectedNode, setSelectedNode] = useState<ForestNode | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    search: "",
    status: "all",
    sortBy: "risk",
    viewMode: "grid",
  });

  // Filter & Sort
  const filteredNodes = forestNodes
    .filter((n) => {
      const q = filters.search.toLowerCase();
      const matchSearch =
        n.name.toLowerCase().includes(q) ||
        n.id.toLowerCase().includes(q) ||
        n.location.toLowerCase().includes(q);
      const matchStatus =
        filters.status === "all"
          ? true
          : filters.status === "normal"
          ? n.severity === "normal"
          : filters.status === "watch"
          ? n.severity === "watch"
          : filters.status === "warning"
          ? n.severity === "warning"
          : n.severity === "critical";
      return matchSearch && matchStatus;
    })
    .sort((a, b) => {
      if (filters.sortBy === "risk") return b.fireRisk - a.fireRisk;
      if (filters.sortBy === "name") return a.name.localeCompare(b.name);
      if (filters.sortBy === "battery") return b.battery - a.battery;
      return a.id.localeCompare(b.id);
    });

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between border-b border-border/60 pb-5">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-xl font-bold text-foreground sm:text-2xl lg:text-3xl">
              Forest Fire Monitoring
            </h1>
            <DemoBadge />
            <span className="label-caps inline-flex items-center gap-1.5 rounded-full bg-normal/10 px-2.5 py-1 text-[10px] text-normal ring-1 ring-inset ring-normal/25">
              <span className="size-1.5 animate-pulse rounded-full bg-normal" />
              FOREST NETWORK OPERATIONAL
            </span>
          </div>
          <p className="text-xs text-muted-foreground sm:text-sm max-w-2xl leading-relaxed">
            Monitor temperature, humidity, smoke, particulate matter and fire-risk indicators across forest monitoring nodes.
          </p>
        </div>

        {/* Right Status / Controls Area */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-normal opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-normal" />
            </span>
            <span className="font-semibold text-foreground">Live Monitoring</span>
          </div>

          <div className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 font-mono text-xs text-muted-foreground">
            <Clock size={13} className="text-primary" />
            <span>Last updated: 2 min ago</span>
          </div>
        </div>
      </div>

      {/* Top 4 Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {forestSummaryStats.map((stat, i) => {
          const Icon = summaryIcons[i] ?? Activity;
          const isCritical = stat.severity === "critical";
          const isWarning = stat.severity === "warning";

          return (
            <div
              key={stat.id}
              className="panel group relative overflow-hidden p-5 transition-all duration-200 hover:border-primary/40"
            >
              <div className="pointer-events-none absolute -right-10 -top-12 size-28 rounded-full bg-primary/5 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-60" />
              <div className="flex items-start justify-between gap-3">
                <span className="label-caps text-muted-foreground">{stat.label}</span>
                <span
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-lg bg-background/60 ring-1 ring-inset ring-border",
                    isCritical
                      ? "text-critical ring-critical/40"
                      : isWarning
                      ? "text-warning ring-warning/40"
                      : "text-normal ring-normal/40"
                  )}
                >
                  <Icon size={17} />
                </span>
              </div>
              <p className="mt-4 font-mono text-3xl font-semibold tracking-tight text-foreground">
                {stat.value}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span
                  className={cn(
                    "text-sm font-medium",
                    isCritical
                      ? "text-critical"
                      : isWarning
                      ? "text-warning"
                      : "text-normal"
                  )}
                >
                  {stat.support}
                </span>
                <span className="label-caps text-muted-foreground/70 font-mono">
                  {stat.trend}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Hero Wildfire Risk Assessment & Indicators Section */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <ForestRiskCard />
        <ForestRiskIndicators />
      </div>

      {/* Environmental Trends Section (Recharts) */}
      <ForestTrendCharts />

      {/* Forest Risk Map & Recent Alerts Section */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="min-w-0 xl:col-span-2">
          <ForestRiskMap onSelectNode={(node) => setSelectedNode(node)} />
        </div>
        <div className="min-w-0">
          <ForestAlerts onSelectNode={(node) => setSelectedNode(node)} />
        </div>
      </div>

      {/* Forest Monitoring Nodes List & Filtering Section */}
      <section className="space-y-4 pt-2">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-foreground sm:text-xl">
              Forest Monitoring Nodes
            </h2>
            <p className="text-xs text-muted-foreground">
              Autonomous wireless telemetry stations measuring canopy temperatures, fuel humidity, and particulate dispersal.
            </p>
          </div>
          <span className="font-mono text-xs text-muted-foreground">
            Showing <strong className="text-foreground">{filteredNodes.length}</strong> of {forestNodes.length} nodes
          </span>
        </div>

        {/* Filter Controls Bar */}
        <NodeFilters
          filters={filters}
          onChange={setFilters}
          statusOptions={[
            { value: "all", label: "All Threat Levels" },
            { value: "normal", label: "NORMAL (Low Risk)" },
            { value: "watch", label: "WATCH" },
            { value: "warning", label: "WARNING" },
            { value: "critical", label: "CRITICAL" },
          ]}
          sortOptions={[
            { value: "risk", label: "Highest Fire Risk" },
            { value: "id", label: "Node ID" },
            { value: "name", label: "Node Name" },
            { value: "battery", label: "Battery Level" },
          ]}
        />

        {/* Grid or Table Representation */}
        {filters.viewMode === "grid" ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredNodes.map((node) => (
              <ForestNodeCard
                key={node.id}
                node={node}
                onSelect={(n) => setSelectedNode(n)}
              />
            ))}
          </div>
        ) : (
          /* Table View */
          <div className="panel overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border bg-surface-raised/60 text-muted-foreground">
                    <th className="p-3.5 font-medium">Node ID</th>
                    <th className="p-3.5 font-medium">Location</th>
                    <th className="p-3.5 font-medium">Temperature</th>
                    <th className="p-3.5 font-medium">Humidity</th>
                    <th className="p-3.5 font-medium">Smoke / PM2.5</th>
                    <th className="p-3.5 font-medium">Fire Threat Index</th>
                    <th className="p-3.5 font-medium">Alert Level</th>
                    <th className="p-3.5 font-medium">Last Update</th>
                    <th className="p-3.5 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {filteredNodes.map((node) => (
                    <tr
                      key={node.id}
                      className="hover:bg-surface-raised/40 transition-colors"
                    >
                      <td className="p-3.5 font-mono font-bold text-primary whitespace-nowrap">
                        {node.id}
                      </td>
                      <td className="p-3.5 font-medium text-foreground whitespace-nowrap">
                        {node.location}
                      </td>
                      <td className={cn("p-3.5 font-mono font-bold whitespace-nowrap", node.temperature >= 40 ? "text-critical" : "text-foreground")}>
                        {node.temperature.toFixed(1)}°C
                      </td>
                      <td className={cn("p-3.5 font-mono whitespace-nowrap", node.humidity < 30 ? "text-warning font-semibold" : "text-muted-foreground")}>
                        {node.humidity}%
                      </td>
                      <td className="p-3.5 font-mono text-muted-foreground whitespace-nowrap">
                        <span className={node.smoke === "Very High" ? "text-critical font-bold" : ""}>{node.smoke}</span> · {node.pm25} µg/m³
                      </td>
                      <td className="p-3.5 min-w-[130px] whitespace-nowrap">
                        <RiskBadge label="" value={node.fireRisk} severity={node.severity} compact />
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        <StatusBadge severity={node.severity}>{node.alertLevel}</StatusBadge>
                      </td>
                      <td className="p-3.5 font-mono text-[11px] text-muted-foreground whitespace-nowrap">
                        {node.lastUpdate}
                      </td>
                      <td className="p-3.5 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => setSelectedNode(node)}
                          className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary active:scale-95 cursor-pointer"
                        >
                          <span>Details</span>
                          <ChevronRight size={13} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* Unobtrusive Demo Notice Banner at bottom */}
      <div className="rounded-xl border border-border/70 bg-card/60 p-3 text-center">
        <p className="label-caps text-xs text-muted-foreground">
          {DEMO_NOTICE.title} · {DEMO_NOTICE.detail}. Sensor values and locations are simulated for technological demonstration.
        </p>
      </div>

      {/* Details Modal */}
      <ForestNodeDetailModal
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
      />
    </div>
  );
}
