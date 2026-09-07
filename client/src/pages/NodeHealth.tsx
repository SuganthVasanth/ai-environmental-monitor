import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  AlertOctagon,
  BatteryCharging,
  BatteryLow,
  CheckCircle2,
  ChevronRight,
  Filter,
  Radio,
  RefreshCw,
  Search,
  WifiOff,
} from "lucide-react";
import { nodeHealthData } from "@/data/mockData";
import { DemoBadge } from "@/components/common/DemoBadge";
import { BatteryIndicator } from "@/components/common/BatteryIndicator";
import { SignalIndicator } from "@/components/common/SignalIndicator";
import { cn } from "@/lib/utils";
import type { NodeCategory, NodeHealthRecord } from "@/types/node";

const statusBadgeTone: Record<NodeHealthRecord["status"], string> = {
  Online: "text-normal bg-normal/10 ring-normal/25",
  Offline: "text-critical bg-critical/10 ring-critical/25",
  Degraded: "text-warning bg-warning/10 ring-warning/25",
  "Low Battery": "text-watch bg-watch/10 ring-watch/25",
  "Communication Lost": "text-critical bg-critical/10 ring-critical/25",
};

export function NodeHealth() {
  const [search, setSearch] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const total = nodeHealthData.length;
  const onlineCount = nodeHealthData.filter((n) => n.status === "Online").length;
  const offlineCount = nodeHealthData.filter((n) => n.status === "Offline").length;
  const lowBatteryCount = nodeHealthData.filter((n) => n.status === "Low Battery" || n.battery <= 25).length;
  const commIssuesCount = nodeHealthData.filter(
    (n) => n.status === "Communication Lost" || n.packetLossPercent > 5
  ).length;

  const filteredNodes = nodeHealthData.filter((node) => {
    const q = search.toLowerCase();
    const matchSearch =
      node.name.toLowerCase().includes(q) ||
      node.id.toLowerCase().includes(q) ||
      node.gateway.toLowerCase().includes(q);
    const matchCategory = selectedCategory === "all" || node.category === selectedCategory;
    const matchStatus =
      selectedStatus === "all"
        ? true
        : selectedStatus === "online"
          ? node.status === "Online"
          : selectedStatus === "issues"
            ? node.status !== "Online"
            : node.status.toLowerCase().includes(selectedStatus.toLowerCase());
    return matchSearch && matchCategory && matchStatus;
  });

  const getNodeUrl = (node: NodeHealthRecord) => {
    if (node.category === "river") return `/river-nodes/${node.id}`;
    if (node.category === "industrial") return `/industrial-nodes/${node.id}`;
    return `/landslide-nodes/${node.id}`;
  };

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
              Node Telemetry & System Health
            </h2>
            <DemoBadge />
          </div>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            Continuous device telemetry diagnostics, battery discharge rates, LoRa gateway sync, and packet loss metrics.
          </p>
        </div>
      </div>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <div className="panel p-4 flex items-center justify-between">
          <div>
            <p className="label-caps text-muted-foreground text-[10px]">Total Nodes</p>
            <p className="mt-1 font-mono text-2xl font-bold text-foreground">{total}</p>
            <p className="mt-1 text-xs text-muted-foreground">3 Categories</p>
          </div>
          <span className="grid size-9 place-items-center rounded-xl bg-primary/12 text-primary">
            <Radio size={18} />
          </span>
        </div>

        <div className="panel p-4 flex items-center justify-between">
          <div>
            <p className="label-caps text-muted-foreground text-[10px]">Online</p>
            <p className="mt-1 font-mono text-2xl font-bold text-normal">{onlineCount}</p>
            <p className="mt-1 text-xs text-muted-foreground">Normal heartbeats</p>
          </div>
          <span className="grid size-9 place-items-center rounded-xl bg-normal/12 text-normal">
            <CheckCircle2 size={18} />
          </span>
        </div>

        <div className="panel p-4 flex items-center justify-between">
          <div>
            <p className="label-caps text-muted-foreground text-[10px]">Offline</p>
            <p className="mt-1 font-mono text-2xl font-bold text-critical">{offlineCount}</p>
            <p className="mt-1 text-xs text-muted-foreground">No sync &gt; 1hr</p>
          </div>
          <span className="grid size-9 place-items-center rounded-xl bg-critical/12 text-critical">
            <WifiOff size={18} />
          </span>
        </div>

        <div className="panel p-4 flex items-center justify-between">
          <div>
            <p className="label-caps text-muted-foreground text-[10px]">Low Battery</p>
            <p className="mt-1 font-mono text-2xl font-bold text-watch">{lowBatteryCount}</p>
            <p className="mt-1 text-xs text-muted-foreground">&lt; 25% capacity</p>
          </div>
          <span className="grid size-9 place-items-center rounded-xl bg-watch/12 text-watch">
            <BatteryLow size={18} />
          </span>
        </div>

        <div className="panel p-4 flex items-center justify-between">
          <div>
            <p className="label-caps text-muted-foreground text-[10px]">Comm Issues</p>
            <p className="mt-1 font-mono text-2xl font-bold text-warning">{commIssuesCount}</p>
            <p className="mt-1 text-xs text-muted-foreground">Packet drop &gt; 5%</p>
          </div>
          <span className="grid size-9 place-items-center rounded-xl bg-warning/12 text-warning">
            <AlertOctagon size={18} />
          </span>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="panel p-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs">
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Filter */}
          <div className="flex items-center gap-1">
            {["all", "river", "industrial", "landslide"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "label-caps rounded-md px-2.5 py-1 transition-colors text-[10px]",
                  selectedCategory === cat
                    ? "bg-primary/15 text-primary ring-1 ring-primary/30"
                    : "text-muted-foreground hover:bg-surface hover:text-foreground"
                )}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          <span className="text-border">|</span>

          {/* Status Filter */}
          <div className="flex items-center gap-1">
            {[
              { id: "all", label: "All Status" },
              { id: "online", label: "Online" },
              { id: "issues", label: "Attention Needed" },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => setSelectedStatus(st.id)}
                className={cn(
                  "rounded-md px-2.5 py-1 font-medium transition-colors text-xs",
                  selectedStatus === st.id
                    ? "bg-surface-raised text-foreground ring-1 ring-border"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="relative min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={13} />
          <input
            type="text"
            placeholder="Search node or gateway..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border border-border bg-card py-1.5 pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-hidden"
          />
        </div>
      </div>

      {/* Nodes Health Table */}
      <div className="panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border bg-surface-raised/60 text-muted-foreground">
                <th className="p-3.5 font-medium">Node</th>
                <th className="p-3.5 font-medium">Type</th>
                <th className="p-3.5 font-medium">Status</th>
                <th className="p-3.5 font-medium">Battery Capacity</th>
                <th className="p-3.5 font-medium">Signal Strength</th>
                <th className="p-3.5 font-medium">LoRa Gateway</th>
                <th className="p-3.5 font-medium">Last Sync</th>
                <th className="p-3.5 font-medium">Uptime</th>
                <th className="p-3.5 font-medium">Health Score</th>
                <th className="p-3.5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredNodes.map((node) => (
                <tr key={node.id} className="hover:bg-surface-raised/50 transition-colors">
                  <td className="p-3.5 font-mono font-semibold text-foreground whitespace-nowrap">
                    <Link
                      to={getNodeUrl(node)}
                      className="hover:text-primary transition-colors flex items-center gap-1.5"
                    >
                      <span>{node.name}</span>
                      <span className="text-muted-foreground text-[10px]">({node.id})</span>
                    </Link>
                  </td>
                  <td className="p-3.5 whitespace-nowrap">
                    <span className="label-caps text-[10px] rounded-sm bg-surface px-1.5 py-0.5 text-muted-foreground border border-border">
                      {node.category}
                    </span>
                  </td>
                  <td className="p-3.5 whitespace-nowrap">
                    <span
                      className={cn(
                        "label-caps inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 ring-1 ring-inset text-[10px]",
                        statusBadgeTone[node.status]
                      )}
                    >
                      <span
                        className={cn(
                          "size-1.5 rounded-full",
                          node.status === "Online"
                            ? "bg-normal"
                            : node.status === "Degraded"
                              ? "bg-warning"
                              : "bg-critical animate-pulse"
                        )}
                      />
                      {node.status}
                    </span>
                  </td>
                  <td className="p-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 rounded-full bg-background overflow-hidden ring-1 ring-border">
                        <div
                          className={cn(
                            "h-full rounded-full",
                            node.battery > 50
                              ? "bg-normal"
                              : node.battery > 25
                                ? "bg-warning"
                                : "bg-critical"
                          )}
                          style={{ width: `${node.battery}%` }}
                        />
                      </div>
                      <span className="font-mono text-xs">{node.battery}%</span>
                    </div>
                  </td>
                  <td className="p-3.5 whitespace-nowrap">
                    <SignalIndicator dbm={node.signalDbm} />
                  </td>
                  <td className="p-3.5 font-mono text-[11px] text-muted-foreground whitespace-nowrap">
                    {node.gateway}
                  </td>
                  <td className="p-3.5 font-mono text-[11px] text-muted-foreground whitespace-nowrap">
                    {node.lastCommunication}
                  </td>
                  <td className="p-3.5 font-mono text-xs text-foreground whitespace-nowrap">
                    {node.uptimePercent}%
                  </td>
                  <td className="p-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "font-mono font-bold text-xs",
                          node.healthScore > 80
                            ? "text-normal"
                            : node.healthScore > 60
                              ? "text-warning"
                              : "text-critical"
                        )}
                      >
                        {node.healthScore}%
                      </span>
                    </div>
                  </td>
                  <td className="p-3.5 text-right whitespace-nowrap">
                    <Link
                      to={getNodeUrl(node)}
                      className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      <span>Telemetry</span>
                      <ChevronRight size={13} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
