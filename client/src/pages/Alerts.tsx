import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  Bell,
  Check,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Eye,
  Filter,
  Info,
  Layers,
  Radio,
  Search,
  ShieldAlert,
  X,
} from "lucide-react";
import { recentAlerts } from "@/data/mockData";
import { DemoBadge } from "@/components/common/DemoBadge";
import { StatusBadge } from "@/components/common/StatusBadge";
import { cn } from "@/lib/utils";
import type { AlertItem, NodeCategory, Severity } from "@/types/node";

export function Alerts() {
  const [alerts, setAlerts] = useState<AlertItem[]>(recentAlerts);
  const [selectedTab, setSelectedTab] = useState<string>("active");
  const [selectedAlert, setSelectedAlert] = useState<AlertItem | null>(null);
  const [search, setSearch] = useState<string>("");

  // Summary counts
  const activeCount = alerts.filter((a) => a.status === "active").length;
  const criticalCount = alerts.filter((a) => a.severity === "critical" && a.status === "active").length;
  const warningCount = alerts.filter((a) => a.severity === "warning" && a.status === "active").length;
  const watchCount = alerts.filter((a) => a.severity === "watch" && a.status === "active").length;

  // Acknowledge handler (frontend state)
  const handleAcknowledge = (id: string) => {
    setAlerts((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "active" ? "acknowledged" : "active",
            }
          : item
      )
    );
  };

  // Filter alerts
  const filteredAlerts = alerts.filter((item) => {
    const q = search.toLowerCase();
    const matchSearch =
      item.node.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      (item.location && item.location.toLowerCase().includes(q));

    if (!matchSearch) return false;

    if (selectedTab === "all") return true;
    if (selectedTab === "active") return item.status === "active";
    if (selectedTab === "critical") return item.severity === "critical";
    if (selectedTab === "warning") return item.severity === "warning";
    if (selectedTab === "watch") return item.severity === "watch";
    if (selectedTab === "resolved") return item.status === "resolved" || item.status === "acknowledged";
    return true;
  });

  const getNodeUrl = (nodeId?: string, category?: NodeCategory) => {
    if (!nodeId) return "/dashboard";
    if (category === "river") return `/river-nodes/${nodeId}`;
    if (category === "industrial") return `/industrial-nodes/${nodeId}`;
    return `/landslide-nodes/${nodeId}`;
  };

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
              Alert Center
            </h2>
            <DemoBadge />
          </div>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            Monitor active and historical environmental hazard warnings, threshold breaches, and emergency telemetry.
          </p>
        </div>
      </div>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <div className="panel p-4 flex items-center justify-between">
          <div>
            <p className="label-caps text-muted-foreground text-[10px]">Active Alerts</p>
            <p className="mt-1 font-mono text-2xl font-bold text-foreground">{activeCount}</p>
            <p className="mt-1 text-xs text-muted-foreground">Unacknowledged events</p>
          </div>
          <span className="grid size-10 place-items-center rounded-xl bg-primary/12 text-primary">
            <Bell size={20} />
          </span>
        </div>

        <div className="panel p-4 flex items-center justify-between">
          <div>
            <p className="label-caps text-muted-foreground text-[10px]">Critical Severity</p>
            <p className="mt-1 font-mono text-2xl font-bold text-critical">{criticalCount}</p>
            <p className="mt-1 text-xs text-muted-foreground">Immediate action required</p>
          </div>
          <span className="grid size-10 place-items-center rounded-xl bg-critical/12 text-critical">
            <ShieldAlert size={20} />
          </span>
        </div>

        <div className="panel p-4 flex items-center justify-between">
          <div>
            <p className="label-caps text-muted-foreground text-[10px]">Warning Severity</p>
            <p className="mt-1 font-mono text-2xl font-bold text-warning">{warningCount}</p>
            <p className="mt-1 text-xs text-muted-foreground">Approaching safety bounds</p>
          </div>
          <span className="grid size-10 place-items-center rounded-xl bg-warning/12 text-warning">
            <AlertTriangle size={20} />
          </span>
        </div>

        <div className="panel p-4 flex items-center justify-between">
          <div>
            <p className="label-caps text-muted-foreground text-[10px]">Watch Severity</p>
            <p className="mt-1 font-mono text-2xl font-bold text-watch">{watchCount}</p>
            <p className="mt-1 text-xs text-muted-foreground">Elevated baseline anomaly</p>
          </div>
          <span className="grid size-10 place-items-center rounded-xl bg-watch/12 text-watch">
            <Radio size={20} />
          </span>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="panel p-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: "all", label: "All Alerts" },
            { id: "active", label: `Active (${activeCount})` },
            { id: "critical", label: `Critical (${criticalCount})` },
            { id: "warning", label: `Warning (${warningCount})` },
            { id: "watch", label: `Watch (${watchCount})` },
            { id: "resolved", label: "Resolved" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedTab(tab.id)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                selectedTab === tab.id
                  ? "bg-primary/15 text-primary ring-1 ring-primary/30"
                  : "text-muted-foreground hover:bg-surface-raised hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
          <input
            type="text"
            placeholder="Filter by node or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border bg-card py-1.5 pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-hidden"
          />
        </div>
      </div>

      {/* Alerts Table / Feed */}
      <div className="panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border bg-surface-raised/60 text-muted-foreground">
                <th className="p-3.5 font-medium">Severity</th>
                <th className="p-3.5 font-medium">Node & Location</th>
                <th className="p-3.5 font-medium">Description</th>
                <th className="p-3.5 font-medium">Telemetry Snapshot</th>
                <th className="p-3.5 font-medium">Timestamp</th>
                <th className="p-3.5 font-medium">Status</th>
                <th className="p-3.5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredAlerts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-muted-foreground">
                    No alerts match the selected criteria.
                  </td>
                </tr>
              ) : (
                filteredAlerts.map((alert) => (
                  <tr
                    key={alert.id}
                    className={cn(
                      "hover:bg-surface-raised/50 transition-colors group",
                      alert.status === "acknowledged" && "opacity-75"
                    )}
                  >
                    <td className="p-3.5 whitespace-nowrap">
                      <StatusBadge severity={alert.severity}>{alert.label}</StatusBadge>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <div className="font-semibold text-foreground flex items-center gap-1.5">
                        <Link
                          to={getNodeUrl(alert.nodeId, alert.category)}
                          className="hover:text-primary transition-colors"
                        >
                          {alert.node}
                        </Link>
                        {alert.category && (
                          <span className="label-caps text-[9px] rounded-xs bg-surface px-1 text-muted-foreground">
                            {alert.category}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-muted-foreground">{alert.location}</p>
                    </td>
                    <td className="p-3.5 text-foreground max-w-xs">
                      <p className="font-medium text-xs">{alert.description}</p>
                    </td>
                    <td className="p-3.5 font-mono text-[11px] text-muted-foreground max-w-xs">
                      {alert.readingSnapshot ?? "Nominal"}
                    </td>
                    <td className="p-3.5 font-mono text-[11px] text-muted-foreground whitespace-nowrap">
                      <div>{alert.timeAgo}</div>
                      <div className="text-[10px] text-muted-foreground/60">{alert.timestamp}</div>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <span
                        className={cn(
                          "label-caps inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px]",
                          alert.status === "active"
                            ? "bg-critical/10 text-critical ring-1 ring-critical/25"
                            : alert.status === "acknowledged"
                              ? "bg-watch/10 text-watch ring-1 ring-watch/25"
                              : "bg-normal/10 text-normal ring-1 ring-normal/25"
                        )}
                      >
                        <span
                          className={cn(
                            "size-1.5 rounded-full",
                            alert.status === "active"
                              ? "bg-critical animate-pulse"
                              : alert.status === "acknowledged"
                                ? "bg-watch"
                                : "bg-normal"
                          )}
                        />
                        {alert.status?.toUpperCase() ?? "ACTIVE"}
                      </span>
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleAcknowledge(alert.id)}
                          className={cn(
                            "inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs transition-colors",
                            alert.status === "acknowledged"
                              ? "border-normal/30 bg-normal/10 text-normal"
                              : "border-border bg-card text-muted-foreground hover:text-foreground"
                          )}
                          title={alert.status === "acknowledged" ? "Mark Active" : "Acknowledge Alert"}
                        >
                          <Check size={12} />
                          <span>{alert.status === "acknowledged" ? "Ack'd" : "Acknowledge"}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setSelectedAlert(alert)}
                          className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2 py-1 text-xs text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors"
                          title="View Details"
                        >
                          <Eye size={12} />
                          <span>Details</span>
                        </button>

                        {alert.nodeId && (
                          <Link
                            to={getNodeUrl(alert.nodeId, alert.category)}
                            className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2 py-1 text-xs text-primary hover:bg-primary/10 transition-colors"
                            title="Go to Node"
                          >
                            <span>Node</span>
                            <ExternalLink size={12} />
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alert Details Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="panel max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between border-b border-border pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <StatusBadge severity={selectedAlert.severity}>{selectedAlert.label}</StatusBadge>
                  <span className="label-caps text-muted-foreground text-[10px]">{selectedAlert.category}</span>
                </div>
                <h3 className="mt-2 text-lg font-semibold text-foreground">{selectedAlert.node}</h3>
                <p className="text-xs text-muted-foreground">{selectedAlert.location}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAlert(null)}
                className="rounded-lg p-1 text-muted-foreground hover:text-foreground hover:bg-surface"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="label-caps text-muted-foreground">Alert Description</span>
                <p className="mt-1 text-sm font-medium text-foreground">{selectedAlert.description}</p>
              </div>

              <div className="rounded-lg bg-surface-raised p-3">
                <span className="label-caps text-muted-foreground">Sensor Telemetry at Trigger</span>
                <p className="mt-1 font-mono text-sm text-foreground">{selectedAlert.readingSnapshot}</p>
              </div>

              {selectedAlert.actionRequired && (
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
                  <span className="label-caps text-primary">Standard Operating Procedure</span>
                  <p className="mt-1 text-muted-foreground">{selectedAlert.actionRequired}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-muted-foreground">
                <div>Triggered: {selectedAlert.timestamp}</div>
                <div>Status: {selectedAlert.status?.toUpperCase()}</div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-border pt-4">
              <button
                type="button"
                onClick={() => {
                  handleAcknowledge(selectedAlert.id);
                  setSelectedAlert(null);
                }}
                className="rounded-lg border border-border bg-card px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground"
              >
                Toggle Acknowledgment
              </button>
              {selectedAlert.nodeId && (
                <Link
                  to={getNodeUrl(selectedAlert.nodeId, selectedAlert.category)}
                  className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  Navigate to Node
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
