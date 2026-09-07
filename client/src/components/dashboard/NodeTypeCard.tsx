import { Link } from "@tanstack/react-router";
import { ArrowRight, type LucideIcon } from "lucide-react";
import type { NodeTypeSummary } from "@/types/node";
import { RiskBadge } from "@/components/common/RiskBadge";
import { cn } from "@/lib/utils";

const riskSeverity = (value: number) =>
  value >= 65 ? "critical" : value >= 40 ? "warning" : "watch";

interface NodeTypeCardProps {
  summary: NodeTypeSummary;
  icon: LucideIcon;
}

export function NodeTypeCard({ summary, icon: Icon }: NodeTypeCardProps) {
  const offline = summary.nodes - summary.online;

  return (
    <div className="panel flex flex-col gap-5 p-5">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="min-w-0">
          <h3 className="label-caps truncate text-primary">{summary.title}</h3>
          <p className="mt-2 font-mono text-2xl font-semibold text-foreground">
            {summary.nodes}
            <span className="ml-1.5 text-sm font-normal text-muted-foreground">Nodes</span>
          </p>
        </div>
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/25">
          <Icon size={19} />
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Stat value={`${summary.online}`} label="Online" tone="text-normal" />
        <Stat value={`${offline}`} label="Offline" tone="text-muted-foreground" />
        <Stat value={`${summary.warning}`} label="Warning" tone="text-warning" />
        <Stat
          value={`${summary.criticalCount}`}
          label={summary.criticalLabel}
          tone={summary.criticalCount > 0 ? "text-critical" : "text-muted-foreground"}
        />
      </div>

      <RiskBadge
        label={summary.riskLabel}
        value={summary.riskValue}
        severity={riskSeverity(summary.riskValue)}
      />

      <Link
        to={summary.to}
        className="label-caps mt-auto inline-flex items-center justify-between rounded-lg border border-border bg-background/60 px-3.5 py-2.5 text-foreground transition-colors hover:border-primary/50 hover:text-primary"
      >
        {summary.cta}
        <ArrowRight size={14} />
      </Link>
    </div>
  );
}

function Stat({ value, label, tone }: { value: string; label: string; tone: string }) {
  return (
    <div className="rounded-lg bg-background/50 px-3 py-2.5 ring-1 ring-inset ring-border">
      <p className={cn("font-mono text-lg font-semibold", tone)}>{value}</p>
      <p className="label-caps truncate text-muted-foreground/80">{label}</p>
    </div>
  );
}
