import { Gauge } from "lucide-react";
import { riskOverview } from "@/data/mockData";
import { RiskBadge } from "@/components/common/RiskBadge";

export function RiskOverview() {
  return (
    <section className="panel p-5">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <div className="min-w-0">
          <h2 className="truncate text-base font-semibold text-foreground">Risk Overview</h2>
          <p className="label-caps mt-1 text-muted-foreground/80">Composite indices</p>
        </div>
        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-background/60 text-secondary ring-1 ring-inset ring-border">
          <Gauge size={17} />
        </span>
      </div>

      <div className="mt-6 space-y-5">
        {riskOverview.map((risk) => (
          <RiskBadge
            key={risk.id}
            label={risk.label}
            value={risk.value}
            severity={risk.severity}
          />
        ))}
      </div>
    </section>
  );
}
