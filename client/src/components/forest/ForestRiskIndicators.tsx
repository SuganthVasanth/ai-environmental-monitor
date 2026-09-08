import { AlertCircle, Sliders } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Severity } from "@/types/node";

interface RiskIndicatorItem {
  id: string;
  name: string;
  level: string;
  currentValue: string;
  percentage: number;
  severity: Severity;
  note?: string;
}

const indicators: RiskIndicatorItem[] = [
  {
    id: "temp",
    name: "Temperature",
    level: "High",
    currentValue: "44.2°C",
    percentage: 88,
    severity: "critical",
    note: "Normal canopy baseline < 32°C",
  },
  {
    id: "humidity",
    name: "Humidity",
    level: "Very Low",
    currentValue: "24%",
    percentage: 86, // Inverse threat: very low humidity = very high risk
    severity: "critical",
    note: "Fuel moisture desiccation threshold < 30%",
  },
  {
    id: "smoke",
    name: "Smoke",
    level: "Very High",
    currentValue: "210 µg/m³",
    percentage: 95,
    severity: "critical",
    note: "Optical obscuration and active pyrolysis detected",
  },
  {
    id: "pm25",
    name: "PM2.5 Particulate",
    level: "High",
    currentValue: "210 µg/m³",
    percentage: 84,
    severity: "critical",
    note: "High particulate concentration from biomass combustion",
  },
  {
    id: "gas",
    name: "Gas Concentration",
    level: "Elevated",
    currentValue: "Elevated (84 ppm CO)",
    percentage: 68,
    severity: "warning",
    note: "CO & VOC smoldering emissions above ambient",
  },
  {
    id: "rain",
    name: "Recent Rainfall",
    level: "Low",
    currentValue: "Low (0.2 mm/48h)",
    percentage: 78,
    severity: "warning",
    note: "Prolonged dry period accelerating tinder drying",
  },
];

const severityBands = [
  { label: "LOW", range: "0–30%", tone: "text-normal border-normal/30 bg-normal/10" },
  { label: "WATCH", range: "31–50%", tone: "text-watch border-watch/30 bg-watch/10" },
  { label: "WARNING", range: "51–75%", tone: "text-warning border-warning/30 bg-warning/10" },
  { label: "CRITICAL", range: "76–100%", tone: "text-critical border-critical/30 bg-critical/10" },
];

const barTone: Record<Severity, string> = {
  normal: "bg-normal",
  watch: "bg-watch",
  warning: "bg-warning",
  critical: "bg-critical",
};

export function ForestRiskIndicators() {
  return (
    <section className="panel flex flex-col justify-between p-5 lg:p-6">
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-border/80 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid size-7 place-items-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/30">
                <Sliders size={16} />
              </span>
              <h3 className="text-base font-semibold text-foreground sm:text-lg">
                Fire Risk Indicators
              </h3>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Decomposed environmental parameters contributing to immediate wildfire threat evaluation.
            </p>
          </div>
          <span className="label-caps shrink-0 rounded-full bg-secondary/15 px-2.5 py-1 text-secondary ring-1 ring-inset ring-secondary/30">
            Telemetry Feed
          </span>
        </div>

        {/* Severity Scale Banner */}
        <div className="my-4">
          <p className="label-caps mb-2 text-[10px] text-muted-foreground/80">
            Standard Severity Scale
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {severityBands.map((band) => (
              <div
                key={band.label}
                className={cn("rounded-lg border px-2.5 py-1.5 text-center font-mono", band.tone)}
              >
                <p className="text-xs font-bold">{band.label}</p>
                <p className="text-[10px] opacity-80">{band.range}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Horizontal Indicator Bars */}
        <div className="space-y-4 pt-2">
          {indicators.map((item) => (
            <div key={item.id} className="space-y-1.5">
              <div className="flex items-baseline justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground">{item.name}</span>
                  <span className="label-caps text-[10px] text-muted-foreground hidden sm:inline">
                    · {item.note}
                  </span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <span className={cn(
                    "font-semibold",
                    item.severity === "critical" ? "text-critical" : "text-warning"
                  )}>
                    {item.level}
                  </span>
                  <span className="text-muted-foreground">({item.currentValue})</span>
                </div>
              </div>

              {/* Progress track */}
              <div className="h-2 w-full overflow-hidden rounded-full bg-background/80 ring-1 ring-inset ring-border/80">
                <div
                  className={cn("h-full rounded-full transition-all duration-700", barTone[item.severity])}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simulated Notice Disclaimer */}
      <div className="mt-6 flex items-center gap-2 rounded-lg border border-border/80 bg-background/50 p-2.5 text-[11px] text-muted-foreground">
        <AlertCircle size={14} className="shrink-0 text-secondary" />
        <p>
          <span className="font-semibold text-foreground/80">Simulated Thresholds:</span> Readings are synthetic demo indicators for technical monitoring demonstration and do not constitute certified operational fire danger ratings.
        </p>
      </div>
    </section>
  );
}
