import { Wifi } from "lucide-react";
import { cn } from "@/lib/utils";

interface SignalIndicatorProps {
  dbm: number;
  protocol?: string;
  className?: string;
  showDbm?: boolean;
}

export function SignalIndicator({ dbm, protocol, className, showDbm = true }: SignalIndicatorProps) {
  // Typical RSSI: > -70 dBm is excellent (4 bars), -70 to -80 good (3 bars), -80 to -90 fair (2 bars), < -90 weak (1 bar)
  const getLevel = () => {
    if (dbm >= -70) return 4;
    if (dbm >= -80) return 3;
    if (dbm >= -90) return 2;
    return 1;
  };

  const level = getLevel();

  return (
    <div className={cn("inline-flex items-center gap-1.5", className)} title={`${protocol ? protocol + " · " : ""}${dbm} dBm`}>
      <div className="flex items-end gap-0.5 h-3">
        {[1, 2, 3, 4].map((bar) => (
          <span
            key={bar}
            className={cn(
              "w-1 rounded-xs transition-all",
              bar <= level
                ? level <= 1
                  ? "bg-critical"
                  : level === 2
                    ? "bg-warning"
                    : "bg-normal"
                : "bg-muted/40"
            )}
            style={{ height: `${bar * 25}%` }}
          />
        ))}
      </div>
      {showDbm && (
        <span className="font-mono text-xs text-muted-foreground">
          {dbm} dBm
        </span>
      )}
      {protocol && (
        <span className="label-caps text-[10px] text-muted-foreground/70 hidden sm:inline">
          {protocol}
        </span>
      )}
    </div>
  );
}
