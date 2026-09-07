import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Compass,
  Layers,
  Mountain,
  ShieldAlert,
} from "lucide-react";
import { landslideNodes } from "@/data/mockData";
import { DemoBadge } from "@/components/common/DemoBadge";
import { RiskBadge } from "@/components/common/RiskBadge";
import { StatusBadge } from "@/components/common/StatusBadge";
import { BatteryIndicator } from "@/components/common/BatteryIndicator";
import { NodeFilters, type FilterOptions } from "@/components/nodes/NodeFilters";
import { cn } from "@/lib/utils";

export function LandslideNodes() {
  const [filters, setFilters] = useState<FilterOptions>({
    search: "",
    status: "all",
    sortBy: "id",
    viewMode: "table",
  });

  const total = landslideNodes.length;
  const online = landslideNodes.filter((n) => n.battery > 0).length;
  const warningCount = landslideNodes.filter((n) => n.alertLevel === "WARNING").length;
  const highRiskCount = landslideNodes.filter((n) => n.alertLevel === "HIGH").length;

  const filteredNodes = landslideNodes
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
      if (filters.sortBy === "risk") return b.landslideRisk - a.landslideRisk;
      if (filters.sortBy === "name") return a.name.localeCompare(b.name);
      if (filters.sortBy === "battery") return b.battery - a.battery;
      return a.id.localeCompare(b.id);
    });

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
              Landslide Monitoring
            </h2>
            <DemoBadge />
          </div>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            Monitor rainfall, soil moisture saturation, slope tilt displacement, and seismic vibration indicators.
          </p>
        </div>
      </div>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <div className="panel p-4 flex items-center justify-between">
          <div>
            <p className="label-caps text-muted-foreground text-[10px]">Total Landslide Nodes</p>
            <p className="mt-1 font-mono text-2xl font-bold text-foreground">{total}</p>
            <p className="mt-1 text-xs text-muted-foreground">Geotechnical telemetry array</p>
          </div>
          <span className="grid size-10 place-items-center rounded-xl bg-watch/12 text-watch">
            <Mountain size={20} />
          </span>
        </div>

        <div className="panel p-4 flex items-center justify-between">
          <div>
            <p className="label-caps text-muted-foreground text-[10px]">Online Nodes</p>
            <p className="mt-1 font-mono text-2xl font-bold text-normal">{online}</p>
            <p className="mt-1 text-xs text-muted-foreground">Mesh relay synchronized</p>
          </div>
          <span className="grid size-10 place-items-center rounded-xl bg-normal/12 text-normal">
            <CheckCircle2 size={20} />
          </span>
        </div>

        <div className="panel p-4 flex items-center justify-between">
          <div>
            <p className="label-caps text-muted-foreground text-[10px]">Warning Level</p>
            <p className="mt-1 font-mono text-2xl font-bold text-warning">{warningCount}</p>
            <p className="mt-1 text-xs text-muted-foreground">Accelerated creep slope</p>
          </div>
          <span className="grid size-10 place-items-center rounded-xl bg-warning/12 text-warning">
            <AlertTriangle size={20} />
          </span>
        </div>

        <div className="panel p-4 flex items-center justify-between">
          <div>
            <p className="label-caps text-muted-foreground text-[10px]">High Risk Nodes</p>
            <p className="mt-1 font-mono text-2xl font-bold text-critical">{highRiskCount}</p>
            <p className="mt-1 text-xs text-muted-foreground">Imminent slip hazard</p>
          </div>
          <span className="grid size-10 place-items-center rounded-xl bg-critical/12 text-critical">
            <ShieldAlert size={20} />
          </span>
        </div>
      </div>

      {/* Filter Controls */}
      <NodeFilters
        filters={filters}
        onChange={setFilters}
        statusOptions={[
          { value: "all", label: "All Alert Levels" },
          { value: "normal", label: "LOW" },
          { value: "watch", label: "WATCH" },
          { value: "warning", label: "WARNING" },
          { value: "critical", label: "HIGH" },
        ]}
      />

      {/* Table View */}
      {filters.viewMode === "table" ? (
        <div className="panel overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border bg-surface-raised/60 text-muted-foreground">
                  <th className="p-3.5 font-medium">Node ID</th>
                  <th className="p-3.5 font-medium">Location</th>
                  <th className="p-3.5 font-medium">Rainfall (24h)</th>
                  <th className="p-3.5 font-medium">Soil Moisture</th>
                  <th className="p-3.5 font-medium">Tilt Angle</th>
                  <th className="p-3.5 font-medium">Vibration</th>
                  <th className="p-3.5 font-medium">Temp / Humidity</th>
                  <th className="p-3.5 font-medium">Landslide Risk</th>
                  <th className="p-3.5 font-medium">Confidence</th>
                  <th className="p-3.5 font-medium">Status</th>
                  <th className="p-3.5 font-medium">Last Update</th>
                  <th className="p-3.5 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredNodes.map((node) => (
                  <tr
                    key={node.id}
                    className="hover:bg-surface-raised/50 transition-colors group"
                  >
                    <td className="p-3.5 font-mono font-semibold text-foreground whitespace-nowrap">
                      <Link
                        to="/landslide-nodes/$id"
                        params={{ id: node.id }}
                        className="hover:text-primary transition-colors flex items-center gap-1.5"
                      >
                        <span>{node.id}</span>
                        <span className="text-muted-foreground text-[10px] hidden lg:inline">({node.name})</span>
                      </Link>
                    </td>
                    <td className="p-3.5 text-muted-foreground whitespace-nowrap">{node.location}</td>
                    <td className="p-3.5 font-mono whitespace-nowrap text-foreground">
                      {node.rainfall.toFixed(1)} mm
                    </td>
                    <td className="p-3.5 font-mono whitespace-nowrap">
                      <span className={cn(node.soilMoisture > 80 ? "text-critical font-bold" : node.soilMoisture > 65 ? "text-warning" : "text-foreground")}>
                        {node.soilMoisture}%
                      </span>
                    </td>
                    <td className="p-3.5 font-mono whitespace-nowrap">
                      <span className={cn(node.tilt > 2.5 ? "text-critical font-bold" : node.tilt > 1.2 ? "text-warning" : "text-foreground")}>
                        {node.tilt.toFixed(1)}°
                      </span>
                      <span className="text-[10px] text-muted-foreground/70 block">
                        +{node.tiltRate.toFixed(2)}°/h
                      </span>
                    </td>
                    <td className="p-3.5 font-mono whitespace-nowrap text-muted-foreground">
                      {node.vibration.toFixed(2)} g
                    </td>
                    <td className="p-3.5 font-mono whitespace-nowrap text-muted-foreground">
                      <span>{node.temperature.toFixed(1)}°C</span> · <span>{node.humidity}%</span>
                    </td>
                    <td className="p-3.5 min-w-[120px] whitespace-nowrap">
                      <RiskBadge label="" value={node.landslideRisk} severity={node.severity} compact />
                    </td>
                    <td className="p-3.5 font-mono text-muted-foreground whitespace-nowrap">
                      {node.confidence}%
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <StatusBadge severity={node.severity}>{node.alertLevel}</StatusBadge>
                    </td>
                    <td className="p-3.5 text-muted-foreground whitespace-nowrap text-[11px] font-mono">
                      {node.lastUpdate}
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap">
                      <Link
                        to="/landslide-nodes/$id"
                        params={{ id: node.id }}
                        className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                      >
                        <span>Details</span>
                        <ChevronRight size={13} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredNodes.map((node) => (
            <div
              key={node.id}
              className="panel p-4 flex flex-col justify-between space-y-4 hover:border-primary/40 transition-all group"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-xs font-semibold text-watch">{node.id}</span>
                    <h3 className="font-semibold text-foreground text-sm mt-0.5">{node.name}</h3>
                    <p className="text-xs text-muted-foreground truncate">{node.location}</p>
                  </div>
                  <StatusBadge severity={node.severity}>{node.alertLevel}</StatusBadge>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 rounded-lg bg-surface-raised p-2.5 text-xs">
                  <div>
                    <span className="label-caps text-[10px] text-muted-foreground">Tilt Angle</span>
                    <p className="font-mono text-sm font-bold text-foreground mt-0.5">
                      {node.tilt.toFixed(1)}°
                    </p>
                  </div>
                  <div>
                    <span className="label-caps text-[10px] text-muted-foreground">Soil Moisture</span>
                    <p className={cn("font-mono text-sm font-semibold mt-0.5", node.soilMoisture > 80 ? "text-critical" : "text-foreground")}>
                      {node.soilMoisture}%
                    </p>
                  </div>
                </div>

                <div className="mt-3">
                  <RiskBadge label="Landslide Risk" value={node.landslideRisk} severity={node.severity} compact />
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-border pt-3 text-xs">
                <BatteryIndicator level={node.battery} />
                <Link
                  to="/landslide-nodes/$id"
                  params={{ id: node.id }}
                  className="inline-flex items-center gap-1 font-medium text-primary hover:underline text-xs"
                >
                  <span>View Details</span>
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
