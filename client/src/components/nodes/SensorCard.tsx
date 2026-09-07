import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Severity } from "@/types/node";

interface SensorCardProps {
  label: string;
  value: string | number;
  unit?: string;
  rate?: string;
  severity?: Severity;
  icon?: LucideIcon;
  threshold?: string;
  className?: string;
}

const severityText: Record<Severity, string> = {
  normal: "text-foreground",
  watch: "text-watch",
  warning: "text-warning",
  critical: "text-critical",
};

const severityGlow: Record<Severity, string> = {
  normal: "border-border",
  watch: "border-watch/40 bg-watch/[0.02]",
  warning: "border-warning/40 bg-warning/[0.03]",
  critical: "border-critical/40 bg-critical/[0.04]",
};

export function SensorCard({
  label,
  value,
  unit,
  rate,
  severity = "normal",
  icon: Icon,
  threshold,
  className,
}: SensorCardProps) {
  return (
    <div
      className={cn(
        "panel relative overflow-hidden p-4 transition-all duration-200 hover:border-primary/40",
        severityGlow[severity],
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="label-caps truncate text-muted-foreground/80">{label}</span>
        {Icon && (
          <span className="grid size-7 place-items-center rounded-lg bg-surface-raised text-muted-foreground">
            <Icon size={14} />
          </span>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-1.5">
        <span className={cn("font-mono text-2xl font-bold tracking-tight sm:text-3xl", severityText[severity])}>
          {value}
        </span>
        {unit && <span className="text-xs text-muted-foreground font-medium">{unit}</span>}
      </div>

      <div className="mt-2.5 flex items-center justify-between text-xs">
        {rate ? (
          <span className="font-mono text-muted-foreground text-[11px]">
            Rate: <span className="font-medium text-foreground">{rate}</span>
          </span>
        ) : (
          <span />
        )}
        {threshold && (
          <span className="label-caps text-[10px] text-muted-foreground/70">
            {threshold}
          </span>
        )}
      </div>
    </div>
  );
}
