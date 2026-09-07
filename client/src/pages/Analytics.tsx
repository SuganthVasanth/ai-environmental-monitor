import { useState } from "react";
import {
  Activity,
  BarChart3,
  Calendar,
  Factory,
  Gauge,
  Mountain,
  TrendingDown,
  TrendingUp,
  Waves,
} from "lucide-react";
import { analyticsData } from "@/data/mockData";
import { DemoBadge } from "@/components/common/DemoBadge";
import { MultiMetricChart } from "@/components/charts/MultiMetricChart";
import { AlertDistributionChart } from "@/components/charts/AlertDistributionChart";
import { SensorTrendChart } from "@/components/charts/SensorTrendChart";
import { cn } from "@/lib/utils";

type TimeframeKey = "24h" | "7d" | "30d";

export function Analytics() {
  const [timeframe, setTimeframe] = useState<TimeframeKey>("24h");
  const currentData = analyticsData[timeframe];

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
              Monitoring Analytics
            </h2>
            <DemoBadge />
          </div>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            Long-term cross-category environmental hazard correlations, trend indices, and distribution telemetry.
          </p>
        </div>

        {/* Date Range Selector */}
        <div className="flex items-center rounded-lg border border-border bg-card p-1">
          <Calendar size={14} className="text-muted-foreground ml-2 mr-1" />
          {(
            [
              { id: "24h", label: "24 Hours" },
              { id: "7d", label: "7 Days" },
              { id: "30d", label: "30 Days" },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTimeframe(t.id)}
              className={cn(
                "rounded-md px-3 py-1 text-xs font-medium transition-all",
                timeframe === t.id
                  ? "bg-surface-raised text-primary ring-1 ring-border shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="panel p-4 flex items-center justify-between">
          <div>
            <p className="label-caps text-muted-foreground text-[10px]">Average Flood Risk</p>
            <p className="mt-1 font-mono text-2xl font-bold text-foreground">
              {currentData.avgFloodRisk}%
            </p>
            <div className="mt-1 flex items-center gap-1 text-xs text-warning">
              <TrendingUp size={13} />
              <span>+6% over period</span>
            </div>
          </div>
          <span className="grid size-10 place-items-center rounded-xl bg-primary/12 text-primary">
            <Waves size={20} />
          </span>
        </div>

        <div className="panel p-4 flex items-center justify-between">
          <div>
            <p className="label-caps text-muted-foreground text-[10px]">Average Pollution Risk</p>
            <p className="mt-1 font-mono text-2xl font-bold text-foreground">
              {currentData.avgPollutionRisk}%
            </p>
            <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <span className="text-normal font-mono">Stable</span>
              <span>within target bounds</span>
            </div>
          </div>
          <span className="grid size-10 place-items-center rounded-xl bg-secondary/12 text-secondary">
            <Factory size={20} />
          </span>
        </div>

        <div className="panel p-4 flex items-center justify-between">
          <div>
            <p className="label-caps text-muted-foreground text-[10px]">Average Landslide Risk</p>
            <p className="mt-1 font-mono text-2xl font-bold text-foreground">
              {currentData.avgLandslideRisk}%
            </p>
            <div className="mt-1 flex items-center gap-1 text-xs text-warning">
              <TrendingUp size={13} />
              <span>Rainfall accumulation</span>
            </div>
          </div>
          <span className="grid size-10 place-items-center rounded-xl bg-watch/12 text-watch">
            <Mountain size={20} />
          </span>
        </div>

        <div className="panel p-4 flex items-center justify-between">
          <div>
            <p className="label-caps text-muted-foreground text-[10px]">Overall System Health</p>
            <p className="mt-1 font-mono text-2xl font-bold text-normal">
              {currentData.systemHealth}%
            </p>
            <div className="mt-1 flex items-center gap-1 text-xs text-normal">
              <Activity size={13} />
              <span>Nominal packet sync</span>
            </div>
          </div>
          <span className="grid size-10 place-items-center rounded-xl bg-normal/12 text-normal">
            <Gauge size={20} />
          </span>
        </div>
      </div>

      {/* Main Multi-Metric Time Series Chart */}
      <MultiMetricChart
        title={`Environmental Risk Trajectory (${currentData.timeframe})`}
        subtitle="Cross-domain composite hazard indices evaluated by Edge AI models"
        data={currentData.trends}
        lines={[
          { key: "floodRisk", name: "Flood Risk", color: "oklch(0.797 0.134 211.5)", unit: "%" },
          { key: "pollutionRisk", name: "Pollution Risk", color: "oklch(0.627 0.233 303.9)", unit: "%" },
          { key: "landslideRisk", name: "Landslide Risk", color: "oklch(0.795 0.162 86)", unit: "%" },
        ]}
        height={320}
      />

      {/* Distribution Charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <AlertDistributionChart
          title={`Hazard Alert Distribution (${currentData.timeframe})`}
          data={currentData.alertDistribution}
        />
        <AlertDistributionChart
          title="Node Hardware & Connectivity Distribution"
          data={currentData.nodeStatusDistribution}
        />
      </div>

      {/* Environmental Risk Trends Insights Section */}
      <section className="panel p-5 space-y-4">
        <div className="flex items-center gap-2 border-b border-border pb-3">
          <BarChart3 size={18} className="text-primary" />
          <h3 className="text-base font-semibold text-foreground">
            Environmental Risk Trends & Telemetry Synthesis
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 text-xs">
          <div className="rounded-xl border border-border bg-surface-raised p-4 space-y-2">
            <span className="label-caps text-primary">Hydrological Correlation</span>
            <p className="text-foreground font-medium text-sm">Precipitation Lag Phase</p>
            <p className="text-muted-foreground">
              Peak water level crest at downstream station RN-09 lags highland rainfall events by approximately 4.2 hours due to catchment transit velocity.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface-raised p-4 space-y-2">
            <span className="label-caps text-secondary">Atmospheric Dispersion</span>
            <p className="text-foreground font-medium text-sm">Diurnal Boundary Inversion</p>
            <p className="text-muted-foreground">
              Industrial stack plumes (IN-03, IN-05) demonstrate localized nocturnal stagnation between 22:00 and 06:00 when ground thermal inversions trap VOCs.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface-raised p-4 space-y-2">
            <span className="label-caps text-watch">Geotechnical Infiltration</span>
            <p className="text-foreground font-medium text-sm">Pore-Water Saturation Threshold</p>
            <p className="text-muted-foreground">
              Landslide slope tilt acceleration occurs predictably once cumulative 48-hour rainfall exceeds 65 mm and volumetric soil moisture surpasses 78%.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
