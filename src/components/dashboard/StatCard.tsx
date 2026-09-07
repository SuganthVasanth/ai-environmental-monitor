import type { LucideIcon } from "lucide-react";
import type { SummaryStat } from "@/types/node";
import { cn } from "@/lib/utils";

const accent: Record<string, string> = {
  normal: "text-normal",
  watch: "text-watch",
  warning: "text-warning",
  critical: "text-critical",
};

interface StatCardProps {
  stat: SummaryStat;
  icon: LucideIcon;
}

export function StatCard({ stat, icon: Icon }: StatCardProps) {
  return (
    <div className="panel group relative overflow-hidden p-5 transition-colors hover:border-primary/40">
      <div className="pointer-events-none absolute -right-10 -top-12 size-28 rounded-full bg-primary/5 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-60" />
      <div className="flex items-start justify-between gap-3">
        <span className="label-caps text-muted-foreground">{stat.label}</span>
        <span
          className={cn(
            "grid size-9 shrink-0 place-items-center rounded-lg bg-background/60 ring-1 ring-inset ring-border",
            accent[stat.severity],
          )}
        >
          <Icon size={17} />
        </span>
      </div>
      <p className="mt-4 font-mono text-3xl font-semibold tracking-tight text-foreground">
        {stat.value}
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className={cn("text-sm", accent[stat.severity])}>{stat.support}</span>
        <span className="label-caps text-muted-foreground/70">{stat.trend}</span>
      </div>
    </div>
  );
}
