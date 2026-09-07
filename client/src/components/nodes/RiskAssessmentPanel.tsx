import { Cpu, Info, ShieldAlert, Sparkles, TrendingUp } from "lucide-react";
import { RiskBadge } from "@/components/common/RiskBadge";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { Severity } from "@/types/node";

interface RiskFactor {
  label: string;
  weight: string;
  contribution: number; // 0-100%
  description: string;
}

interface RiskAssessmentPanelProps {
  category: "river" | "industrial" | "landslide";
  riskScore: number;
  confidence: number;
  riskLevel: string;
  severity: Severity;
  factors?: RiskFactor[];
  alertAssessment?: {
    currentLevel: string;
    previousLevel: string;
    trend: string;
    riskLevel: string;
    persistenceHours: number;
    movingAveragePpm: number;
    rateOfChangePerHr: string;
  };
}

export function RiskAssessmentPanel({
  category,
  riskScore,
  confidence,
  riskLevel,
  severity,
  factors,
  alertAssessment,
}: RiskAssessmentPanelProps) {
  return (
    <section className="panel overflow-hidden p-5 space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Cpu size={18} className="text-primary" />
            <h3 className="text-base font-semibold text-foreground">
              {category === "industrial" ? "Alert & Emissions Assessment" : "Edge AI Multi-Sensor Risk Assessment"}
            </h3>
          </div>
          <p className="label-caps mt-1 text-muted-foreground/80">
            {category === "river"
              ? "Synthesized hydrodynamic telemetry & historical baseline deviation"
              : category === "industrial"
                ? "Adaptive threshold evaluation & rolling moving averages"
                : "Kinematic tilt, geotechnical moisture & micro-tremor fusion"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge severity={severity}>{riskLevel}</StatusBadge>
          <span className="label-caps rounded-full bg-primary/10 px-2.5 py-1 text-primary ring-1 ring-inset ring-primary/25">
            {confidence}% Confidence
          </span>
        </div>
      </div>

      {/* Main Gauges */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-background/60 p-4">
          <RiskBadge
            label={category === "river" ? "Composite Flood Risk" : category === "industrial" ? "Pollution Risk Score" : "Landslide Instability Score"}
            value={riskScore}
            severity={severity}
          />
          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <span>Model: Edge-Inference v2.4</span>
            <span>Latency: 42 ms</span>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-background/60 p-4">
          <div className="flex items-center justify-between">
            <span className="label-caps text-muted-foreground">Confidence Metric</span>
            <span className="font-mono text-sm font-semibold text-primary">{confidence}%</span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-surface ring-1 ring-inset ring-border">
            <div
              className="h-full rounded-full bg-primary transition-all duration-700"
              style={{ width: `${confidence}%` }}
            />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Calculated from sensor signal-to-noise ratio, packet reception consistency, and spatial cross-validation.
          </p>
        </div>
      </div>

      {/* Category Specific Logic Flow */}
      {category === "river" && (
        <div className="space-y-4">
          <h4 className="label-caps text-muted-foreground">Input Telemetry Vector Weights</h4>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-border bg-surface-raised p-3">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-medium text-foreground">Water Level</span>
                <span className="label-caps text-primary">35% Weight</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Proximity to localized bankfull spill threshold</p>
            </div>
            <div className="rounded-lg border border-border bg-surface-raised p-3">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-medium text-foreground">Rate of Rise</span>
                <span className="label-caps text-primary">30% Weight</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Delta (m/h) slope acceleration over 60-min window</p>
            </div>
            <div className="rounded-lg border border-border bg-surface-raised p-3">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-medium text-foreground">Catchment Rainfall</span>
                <span className="label-caps text-primary">20% Weight</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Upstream accumulation volume & soil saturation</p>
            </div>
            <div className="rounded-lg border border-border bg-surface-raised p-3">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-medium text-foreground">Historical Pattern</span>
                <span className="label-caps text-primary">15% Weight</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Deviation from multi-year seasonal discharge model</p>
            </div>
          </div>
        </div>
      )}

      {category === "landslide" && (
        <div className="space-y-4">
          <h4 className="label-caps text-muted-foreground">Multi-Sensor AI Fusion Pipeline</h4>
          <div className="rounded-xl border border-border bg-surface-raised/80 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-muted-foreground">
              <span className="rounded-md border border-border bg-background px-2.5 py-1 text-foreground">Rainfall (25%)</span>
              <span className="text-primary font-bold">✕</span>
              <span className="rounded-md border border-border bg-background px-2.5 py-1 text-foreground">Soil Moisture (30%)</span>
              <span className="text-primary font-bold">✕</span>
              <span className="rounded-md border border-border bg-background px-2.5 py-1 text-foreground">Tilt Angle (25%)</span>
              <span className="text-primary font-bold">✕</span>
              <span className="rounded-md border border-border bg-background px-2.5 py-1 text-foreground">Vibration (10%)</span>
              <span className="text-primary font-bold">✕</span>
              <span className="rounded-md border border-border bg-background px-2.5 py-1 text-foreground">Ambient (10%)</span>
            </div>

            <div className="my-3 flex items-center justify-center">
              <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs text-primary">
                <Sparkles size={14} />
                <span className="font-semibold">Edge AI Fusion Layer</span>
                <span>→</span>
                <span>Real-Time Instability Probability</span>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-warning/10 p-2.5 text-xs text-warning border border-warning/20">
              <Info size={15} className="shrink-0" />
              <span>
                <strong>Note:</strong> Risk thresholds require field calibration and geotechnical ground-truthing. Values are simulated for demonstration purposes.
              </span>
            </div>
          </div>
        </div>
      )}

      {category === "industrial" && alertAssessment && (
        <div className="space-y-4">
          <h4 className="label-caps text-muted-foreground">Continuous Alert Evaluation Logic</h4>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-border bg-surface-raised p-3">
              <span className="label-caps text-muted-foreground text-[10px]">Threshold Evaluation</span>
              <p className="mt-1 font-mono text-sm font-semibold text-foreground">
                {alertAssessment.currentLevel}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">Upper regulatory bounds checked continuously</p>
            </div>

            <div className="rounded-lg border border-border bg-surface-raised p-3">
              <span className="label-caps text-muted-foreground text-[10px]">Trend & Velocity</span>
              <div className="mt-1 flex items-center gap-1.5">
                <TrendingUp size={15} className={severity === "normal" ? "text-normal" : "text-warning"} />
                <p className="font-mono text-sm font-semibold text-foreground">
                  {alertAssessment.trend} ({alertAssessment.rateOfChangePerHr})
                </p>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Short-term derivative evaluation</p>
            </div>

            <div className="rounded-lg border border-border bg-surface-raised p-3">
              <span className="label-caps text-muted-foreground text-[10px]">Reading Persistence</span>
              <p className="mt-1 font-mono text-sm font-semibold text-foreground">
                {alertAssessment.persistenceHours} hrs consecutive
              </p>
              <p className="mt-1 text-xs text-muted-foreground">Prevents transient spike false triggers</p>
            </div>

            <div className="rounded-lg border border-border bg-surface-raised p-3">
              <span className="label-caps text-muted-foreground text-[10px]">Moving Average</span>
              <p className="mt-1 font-mono text-sm font-semibold text-foreground">
                {alertAssessment.movingAveragePpm} µg/m³
              </p>
              <p className="mt-1 text-xs text-muted-foreground">Weighted 8-hour exposure window</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
