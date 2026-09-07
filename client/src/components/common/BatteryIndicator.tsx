import { Battery, BatteryCharging, BatteryLow, BatteryMedium, BatteryWarning } from "lucide-react";
import { cn } from "@/lib/utils";

interface BatteryIndicatorProps {
  level: number;
  className?: string;
  showText?: boolean;
}

export function BatteryIndicator({ level, className, showText = true }: BatteryIndicatorProps) {
  const getBatteryIcon = () => {
    if (level <= 20) return <BatteryLow className="text-critical" size={15} />;
    if (level <= 50) return <BatteryWarning className="text-warning" size={15} />;
    if (level <= 80) return <BatteryMedium className="text-watch" size={15} />;
    return <Battery className="text-normal" size={15} />;
  };

  const getTextColor = () => {
    if (level <= 20) return "text-critical";
    if (level <= 50) return "text-warning";
    if (level <= 80) return "text-watch";
    return "text-normal";
  };

  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      {getBatteryIcon()}
      {showText && (
        <span className={cn("font-mono text-xs font-medium", getTextColor())}>
          {level}%
        </span>
      )}
    </div>
  );
}
