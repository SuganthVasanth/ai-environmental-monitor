import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Factory,
  Flame,
  ShieldAlert,
  Wind,
} from "lucide-react";
import { industrialNodes } from "@/data/mockData";
import { DemoBadge } from "@/components/common/DemoBadge";
import { RiskBadge } from "@/components/common/RiskBadge";
import { StatusBadge } from "@/components/common/StatusBadge";
import { BatteryIndicator } from "@/components/common/BatteryIndicator";
import { NodeFilters, type FilterOptions } from "@/components/nodes/NodeFilters";
import { cn } from "@/lib/utils";

export function IndustrialNodes() {
  const [filters, setFilters] = useState<FilterOptions>({
    search: "",
    status: "all",
    sortBy: "id",
    viewMode: "table",
  });

  const total = industrialNodes.length;
  const online = industrialNodes.filter((n) => n.battery > 0).length;
  const warningCount = industrialNodes.filter((n) => n.alertLevel === "WARNING").length;
  const emergencyCount = industrialNodes.filter((n) => n.alertLevel === "EMERGENCY").length;

  const filteredNodes = industrialNodes
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
      if (filters.sortBy === "risk") return b.pollutionRisk - a.pollutionRisk;
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
              Industrial Monitoring
            </h2>
            <DemoBadge />
          </div>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            Monitor air pollution, toxic chemical gases, particulate matter, and ambient plume dispersal.
          </p>
        </div>
      </div>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <div className="panel p-4 flex items-center justify-between">
          <div>
            <p className="label-caps text-muted-foreground text-[10px]">Total Industrial Nodes</p>
            <p className="mt-1 font-mono text-2xl font-bold text-foreground">{total}</p>
            <p className="mt-1 text-xs text-muted-foreground">Emissions monitoring network</p>
          </div>
          <span className="grid size-10 place-items-center rounded-xl bg-secondary/12 text-secondary">
            <Factory size={20} />
          </span>
        </div>

        <div className="panel p-4 flex items-center justify-between">
          <div>
            <p className="label-caps text-muted-foreground text-[10px]">Online Nodes</p>
            <p className="mt-1 font-mono text-2xl font-bold text-normal">{online}</p>
            <p className="mt-1 text-xs text-muted-foreground">Continuous air sampling</p>
          </div>
          <span className="grid size-10 place-items-center rounded-xl bg-normal/12 text-normal">
            <CheckCircle2 size={20} />
          </span>
        </div>

        <div className="panel p-4 flex items-center justify-between">
          <div>
            <p className="label-caps text-muted-foreground text-[10px]">Warning Level</p>
            <p className="mt-1 font-mono text-2xl font-bold text-warning">{warningCount}</p>
            <p className="mt-1 text-xs text-muted-foreground">Elevated stack discharge</p>
          </div>
          <span className="grid size-10 place-items-center rounded-xl bg-warning/12 text-warning">
            <AlertTriangle size={20} />
          </span>
        </div>

        <div className="panel p-4 flex items-center justify-between">
          <div>
            <p className="label-caps text-muted-foreground text-[10px]">Emergency Level</p>
            <p className="mt-1 font-mono text-2xl font-bold text-critical">{emergencyCount}</p>
            <p className="mt-1 text-xs text-muted-foreground">Severe toxicity breach</p>
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
          { value: "normal", label: "NORMAL" },
          { value: "watch", label: "WATCH" },
          { value: "warning", label: "WARNING" },
          { value: "critical", label: "EMERGENCY" },
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
                  <th className="p-3.5 font-medium">PM2.5</th>
                  <th className="p-3.5 font-medium">PM10</th>
                  <th className="p-3.5 font-medium">Gas Concentration</th>
                  <th className="p-3.5 font-medium">Temp / Humidity</th>
                  <th className="p-3.5 font-medium">Pollution Risk</th>
                  <th className="p-3.5 font-medium">Status</th>
                  <th className="p-3.5 font-medium">Battery</th>
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
                        to="/industrial-nodes/$id"
                        params={{ id: node.id }}
                        className="hover:text-primary transition-colors flex items-center gap-1.5"
                      >
                        <span>{node.id}</span>
                        <span className="text-muted-foreground text-[10px] hidden lg:inline">({node.name})</span>
                      </Link>
                    </td>
                    <td className="p-3.5 text-muted-foreground whitespace-nowrap">{node.location}</td>
                    <td className="p-3.5 font-mono whitespace-nowrap">
                      <span className={cn("font-bold text-sm", node.pm25 > 60 ? "text-critical" : node.pm25 > 35 ? "text-warning" : "text-foreground")}>
                        {node.pm25} µg/m³
                      </span>
                    </td>
                    <td className="p-3.5 font-mono whitespace-nowrap text-foreground">
                      {node.pm10} µg/m³
                    </td>
                    <td className="p-3.5 font-mono whitespace-nowrap">
                      <span className={cn(node.gasConcentration > 150 ? "text-critical" : node.gasConcentration > 80 ? "text-warning" : "text-muted-foreground")}>
                        {node.gasConcentration} ppb
                      </span>
                      <span className="text-[10px] text-muted-foreground/70 block">
                        {node.gasType}
                      </span>
                    </td>
                    <td className="p-3.5 font-mono whitespace-nowrap text-muted-foreground">
                      <span>{node.temperature.toFixed(1)}°C</span> · <span>{node.humidity}% RH</span>
                    </td>
                    <td className="p-3.5 min-w-[120px] whitespace-nowrap">
                      <RiskBadge label="" value={node.pollutionRisk} severity={node.severity} compact />
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <StatusBadge severity={node.severity}>{node.alertLevel}</StatusBadge>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <BatteryIndicator level={node.battery} />
                    </td>
                    <td className="p-3.5 text-muted-foreground whitespace-nowrap text-[11px] font-mono">
                      {node.lastUpdate}
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap">
                      <Link
                        to="/industrial-nodes/$id"
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
                    <span className="font-mono text-xs font-semibold text-secondary">{node.id}</span>
                    <h3 className="font-semibold text-foreground text-sm mt-0.5">{node.name}</h3>
                    <p className="text-xs text-muted-foreground truncate">{node.location}</p>
                  </div>
                  <StatusBadge severity={node.severity}>{node.alertLevel}</StatusBadge>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 rounded-lg bg-surface-raised p-2.5 text-xs">
                  <div>
                    <span className="label-caps text-[10px] text-muted-foreground">PM2.5 / PM10</span>
                    <p className="font-mono text-sm font-bold text-foreground mt-0.5">
                      {node.pm25} / {node.pm10}
                    </p>
                  </div>
                  <div>
                    <span className="label-caps text-[10px] text-muted-foreground">Gas Conc</span>
                    <p className="font-mono text-sm font-semibold text-foreground mt-0.5">
                      {node.gasConcentration} ppb
                    </p>
                  </div>
                </div>

                <div className="mt-3">
                  <RiskBadge label="Pollution Risk" value={node.pollutionRisk} severity={node.severity} compact />
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-border pt-3 text-xs">
                <BatteryIndicator level={node.battery} />
                <Link
                  to="/industrial-nodes/$id"
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
