import { FlaskConical } from "lucide-react";
import { DEMO_NOTICE } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface DemoBadgeProps {
  className?: string;
  variant?: "badge" | "card";
}

export function DemoBadge({ className, variant = "badge" }: DemoBadgeProps) {
  if (variant === "card") {
    return (
      <div className={cn("inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5", className)}>
        <FlaskConical size={14} className="text-secondary shrink-0" />
        <div className="min-w-0">
          <p className="label-caps text-secondary text-[10px] leading-tight">{DEMO_NOTICE.title}</p>
          <p className="text-[11px] text-muted-foreground truncate">{DEMO_NOTICE.detail}</p>
        </div>
      </div>
    );
  }

  return (
    <span
      className={cn(
        "label-caps inline-flex items-center gap-1.5 rounded-full bg-secondary/10 px-2.5 py-1 text-secondary ring-1 ring-inset ring-secondary/25",
        className
      )}
    >
      <FlaskConical size={12} />
      <span>{DEMO_NOTICE.title} · {DEMO_NOTICE.detail}</span>
    </span>
  );
}
