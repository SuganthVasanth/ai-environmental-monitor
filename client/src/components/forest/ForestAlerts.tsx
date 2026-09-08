import { AlertTriangle, ChevronRight, Clock, Flame, ShieldAlert } from "lucide-react";
import { forestAlerts, forestNodes } from "@/data/mockData";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { AlertItem, ForestNode } from "@/types/node";
import { cn } from "@/lib/utils";

interface ForestAlertsProps {
  onSelectNode?: (node: ForestNode) => void;
}

export function ForestAlerts({ onSelectNode }: ForestAlertsProps) {
  const handleInspect = (alert: AlertItem) => {
    if (!onSelectNode) return;
    const targetNode = forestNodes.find((n) => n.id === alert.nodeId || n.name === alert.node);
    if (targetNode) {
      onSelectNode(targetNode);
    }
  };

  return (
    <section className="panel flex flex-col justify-between p-5">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/80 pb-3.5">
          <div className="flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded-lg bg-critical/15 text-critical ring-1 ring-critical/30">
              <ShieldAlert size={16} />
            </span>
            <div>
              <h3 className="text-base font-semibold text-foreground">
                Recent Forest Alerts
              </h3>
              <p className="text-xs text-muted-foreground">
                Threshold escalations and wildfire telemetry alerts.
              </p>
            </div>
          </div>
          <span className="label-caps rounded-full bg-critical/10 px-2 py-0.5 text-xs text-critical font-mono font-bold">
            {forestAlerts.length} Active
          </span>
        </div>

        {/* Alerts List */}
        <div className="mt-4 space-y-3">
          {forestAlerts.map((alert) => {
            const isCritical = alert.severity === "critical";
            const isWarning = alert.severity === "warning";

            return (
              <div
                key={alert.id}
                className={cn(
                  "rounded-xl border p-3.5 transition-all duration-150 hover:border-primary/40",
                  isCritical
                    ? "border-critical/40 bg-critical/[0.05]"
                    : isWarning
                    ? "border-warning/30 bg-warning/[0.04]"
                    : "border-border/80 bg-surface-raised/50"
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <StatusBadge severity={alert.severity}>{alert.label}</StatusBadge>
                    <span className="font-semibold text-xs sm:text-sm text-foreground">
                      {alert.node}
                    </span>
                    {alert.nodeId && (
                      <span className="font-mono text-[11px] text-muted-foreground">
                        ({alert.nodeId})
                      </span>
                    )}
                  </div>

                  <span className="label-caps flex shrink-0 items-center gap-1 font-mono text-[10px] text-muted-foreground">
                    <Clock size={11} />
                    {alert.timeAgo}
                  </span>
                </div>

                <p className="mt-2 text-xs text-foreground/85 leading-relaxed">
                  {alert.description}
                </p>

                {alert.readingSnapshot && (
                  <p className="mt-1 font-mono text-[11px] text-muted-foreground/80 truncate">
                    {alert.readingSnapshot}
                  </p>
                )}

                <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-2.5">
                  <span className="text-[11px] text-muted-foreground truncate max-w-[200px] sm:max-w-none">
                    Action: {alert.actionRequired ?? "Monitor telemetry"}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleInspect(alert)}
                    className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary active:scale-95 cursor-pointer shrink-0"
                  >
                    <span>View Telemetry</span>
                    <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
