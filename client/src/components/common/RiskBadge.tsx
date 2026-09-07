import type { Severity } from "@/types/node";
import { cn } from "@/lib/utils";

const bar: Record<Severity, string> = {
  normal: "bg-normal",
  watch: "bg-watch",
  warning: "bg-warning",
  critical: "bg-critical",
};

const text: Record<Severity, string> = {
  normal: "text-normal",
  watch: "text-watch",
  warning: "text-warning",
  critical: "text-critical",
};

interface RiskBadgeProps {
  label: string;
  value: number;
  severity: Severity;
  compact?: boolean;
}

export function RiskBadge({ label, value, severity, compact = false }: RiskBadgeProps) {
  return (
    <div className="min-w-0">
      <div className="flex items-baseline justify-between gap-3">
        <span
          className={cn(
            "truncate text-muted-foreground",
            compact ? "label-caps" : "text-sm",
          )}
        >
          {label}
        </span>
        <span className={cn("font-mono text-sm font-semibold", text[severity])}>
          {value}%
        </span>
      </div>
      <div
        className={cn(
          "mt-2 w-full overflow-hidden rounded-full bg-background/70 ring-1 ring-inset ring-border",
          compact ? "h-1.5" : "h-2",
        )}
      >
        <div
          className={cn("h-full rounded-full transition-[width] duration-700", bar[severity])}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
