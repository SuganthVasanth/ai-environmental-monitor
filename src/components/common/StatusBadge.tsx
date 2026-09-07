import type { Severity } from "@/types/node";
import { cn } from "@/lib/utils";

const styles: Record<Severity, string> = {
  normal: "text-normal bg-normal/10 ring-normal/25",
  watch: "text-watch bg-watch/10 ring-watch/25",
  warning: "text-warning bg-warning/10 ring-warning/25",
  critical: "text-critical bg-critical/10 ring-critical/25",
};

const dot: Record<Severity, string> = {
  normal: "bg-normal",
  watch: "bg-watch",
  warning: "bg-warning",
  critical: "bg-critical",
};

interface StatusBadgeProps {
  severity: Severity;
  children: React.ReactNode;
  withDot?: boolean;
  className?: string;
}

export function StatusBadge({
  severity,
  children,
  withDot = true,
  className,
}: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "label-caps inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 ring-1 ring-inset",
        styles[severity],
        className,
      )}
    >
      {withDot && <span className={cn("size-1.5 rounded-full", dot[severity])} />}
      {children}
    </span>
  );
}
