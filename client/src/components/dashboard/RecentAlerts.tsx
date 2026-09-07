import { ChevronRight, BellRing } from "lucide-react";
import { recentAlerts } from "@/data/mockData";
import { StatusBadge } from "@/components/common/StatusBadge";

export function RecentAlerts() {
  return (
    <section className="panel p-5">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <div className="min-w-0">
          <h2 className="truncate text-base font-semibold text-foreground">Recent Alerts</h2>
          <p className="label-caps mt-1 text-muted-foreground/80">Last 30 minutes</p>
        </div>
        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-background/60 text-primary ring-1 ring-inset ring-border">
          <BellRing size={17} />
        </span>
      </div>

      <ul className="mt-5 divide-y divide-border">
        {recentAlerts.map((alert) => (
          <li key={alert.id} className="py-3.5 first:pt-1">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge severity={alert.severity}>{alert.label}</StatusBadge>
                  <span className="truncate text-sm font-medium text-foreground">
                    {alert.node}
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground">{alert.description}</p>
                <p className="label-caps mt-1.5 text-muted-foreground/70">{alert.timeAgo}</p>
              </div>
              <button
                type="button"
                className="label-caps inline-flex shrink-0 items-center gap-1 rounded-lg border border-border bg-background/60 px-2.5 py-1.5 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                View
                <ChevronRight size={13} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
