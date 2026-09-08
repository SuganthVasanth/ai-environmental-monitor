import { AlertTriangle, CloudRain, Droplets, Flame, Gauge, Sparkles, Thermometer, Wind } from "lucide-react";
import { forestRiskData } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface ForestRiskCardProps {
  data?: typeof forestRiskData;
}

export function ForestRiskCard({ data = forestRiskData }: ForestRiskCardProps) {
  // SVG circular progress calculations
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (data.score / 100) * circumference;

  const indicatorIcons = [
    Thermometer,
    Droplets,
    Flame,
    Wind,
    Gauge,
    CloudRain,
  ];

  return (
    <section className="panel flex flex-col justify-between p-5 lg:p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 border-b border-border/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded-lg bg-critical/15 text-critical ring-1 ring-critical/30">
              <Flame size={16} />
            </span>
            <h3 className="text-base font-semibold text-foreground sm:text-lg">
              Forest Fire Risk
            </h3>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Composite early-warning wildfire risk index synthesized from localized forest sensors.
          </p>
        </div>

        <span className="label-caps shrink-0 rounded-full bg-critical/15 px-2.5 py-1 font-semibold text-critical ring-1 ring-inset ring-critical/30 flex items-center gap-1.5">
          <span className="size-2 animate-pulse rounded-full bg-critical" />
          High Alert
        </span>
      </div>

      {/* Hero Circular Risk Gauge */}
      <div className="my-6 flex flex-col items-center justify-center sm:flex-row sm:gap-8">
        <div className="relative grid place-items-center">
          <svg className="size-44 -rotate-90 transform" viewBox="0 0 160 160">
            {/* Background track */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="oklch(0.279 0.037 260)"
              strokeWidth="10"
              fill="transparent"
            />
            {/* Animated risk ring */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="url(#fireRiskGradient)"
              strokeWidth="11"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-[stroke-dashoffset] duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="fireRiskGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="oklch(0.795 0.162 86)" />
                <stop offset="50%" stopColor="oklch(0.705 0.187 47.6)" />
                <stop offset="100%" stopColor="oklch(0.637 0.208 25.3)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center score readout */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="font-mono text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              {data.score}%
            </span>
            <span className="label-caps mt-1 text-[10px] font-bold text-critical tracking-wider">
              {data.level}
            </span>
          </div>
        </div>

        {/* Status Callout & Threshold Guide */}
        <div className="mt-4 sm:mt-0 max-w-xs space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 rounded-lg border border-critical/30 bg-critical/10 px-3 py-1.5 text-xs text-critical">
            <AlertTriangle size={14} className="shrink-0" />
            <span className="font-semibold">Wildfire Outbreak Probability: Severe</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Rapid environmental drying, soaring canopy temperature, and particulate spikes indicate extreme flammability.
          </p>
          <div className="flex items-center justify-center sm:justify-start gap-4 pt-1 font-mono text-[11px] text-muted-foreground/80">
            <span>Critical Zone: &gt;75%</span>
            <span>·</span>
            <span>Simulated Model</span>
          </div>
        </div>
      </div>

      {/* Contributing Indicators Section */}
      <div className="border-t border-border/80 pt-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="label-caps text-[11px] text-muted-foreground font-semibold">
            Contributing Primary Indicators
          </p>
          <span className="label-caps text-[10px] text-muted-foreground/70">6 Factors Evaluated</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 xl:grid-cols-6">
          {data.indicators.map((ind, idx) => {
            const Icon = indicatorIcons[idx] ?? Sparkles;
            return (
              <div
                key={ind.label}
                className="rounded-lg border border-border/80 bg-surface-raised/60 p-2.5 transition-colors hover:border-primary/40"
              >
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="label-caps truncate text-[10px]">{ind.label}</span>
                  <Icon size={12} className={ind.severity === "critical" ? "text-critical" : "text-warning"} />
                </div>
                <p className="mt-1 font-mono text-base font-bold text-foreground">
                  {ind.value}
                </p>
                <div className="mt-1 flex items-center justify-between text-[11px]">
                  <span className={cn(
                    "font-medium",
                    ind.severity === "critical" ? "text-critical" : "text-warning"
                  )}>
                    {ind.level}
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground/60">{ind.pct}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
