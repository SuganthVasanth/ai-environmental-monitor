import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Droplets, Flame, LineChart as ChartIcon, Thermometer } from "lucide-react";
import { forestTrendData } from "@/data/mockData";

export function ForestTrendCharts() {
  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/30">
              <ChartIcon size={16} />
            </span>
            <h3 className="text-base font-semibold text-foreground sm:text-xl">
              Environmental Trends
            </h3>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Simulated diurnal microclimate curves showing rising thermal loading, canopy desiccation, and smoke particulate buildup.
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
          <span className="inline-block size-2 rounded-full bg-primary animate-pulse" />
          <span>Interval: 08:00 – 14:00 (1h)</span>
        </div>
      </div>

      {/* 3 Trend Charts Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Temperature Trend */}
        <div className="panel p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Thermometer size={16} className="text-critical" />
              <h4 className="label-caps font-semibold text-foreground">Temperature Trend</h4>
            </div>
            <span className="label-caps text-critical font-mono">°C (Gradual Rise)</span>
          </div>

          <div className="h-[210px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={forestTrendData.temperature}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="forestTempGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.637 0.208 25.3)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="oklch(0.637 0.208 25.3)" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.279 0.037 260 / 0.5)" vertical={false} />
                <XAxis
                  dataKey="time"
                  stroke="oklch(0.711 0.035 256.8)"
                  tick={{ fontSize: 10, fill: "oklch(0.711 0.035 256.8)" }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  domain={[25, 48]}
                  stroke="oklch(0.711 0.035 256.8)"
                  tick={{ fontSize: 10, fill: "oklch(0.711 0.035 256.8)" }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (!active || !payload?.length) return null;
                    return (
                      <div className="rounded-lg border border-border bg-card p-2.5 shadow-lg">
                        <p className="label-caps text-[10px] text-muted-foreground">{label}</p>
                        <p className="mt-1 font-mono text-sm font-semibold text-critical">
                          {payload[0]?.value}°C <span className="text-xs text-muted-foreground font-normal">Canopy Temp</span>
                        </p>
                      </div>
                    );
                  }}
                />
                <ReferenceLine
                  y={40.0}
                  stroke="oklch(0.705 0.187 47.6)"
                  strokeDasharray="4 4"
                  label={{
                    value: "Extreme Heat (40°C)",
                    fill: "oklch(0.705 0.187 47.6)",
                    fontSize: 9,
                    position: "insideTopLeft",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="oklch(0.637 0.208 25.3)"
                  strokeWidth={2.5}
                  fill="url(#forestTempGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Humidity Trend */}
        <div className="panel p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplets size={16} className="text-primary" />
              <h4 className="label-caps font-semibold text-foreground">Humidity Trend</h4>
            </div>
            <span className="label-caps text-primary font-mono">% (Desiccation)</span>
          </div>

          <div className="h-[210px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={forestTrendData.humidity}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="forestHumGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.797 0.134 211.5)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="oklch(0.797 0.134 211.5)" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.279 0.037 260 / 0.5)" vertical={false} />
                <XAxis
                  dataKey="time"
                  stroke="oklch(0.711 0.035 256.8)"
                  tick={{ fontSize: 10, fill: "oklch(0.711 0.035 256.8)" }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  domain={[15, 80]}
                  stroke="oklch(0.711 0.035 256.8)"
                  tick={{ fontSize: 10, fill: "oklch(0.711 0.035 256.8)" }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (!active || !payload?.length) return null;
                    return (
                      <div className="rounded-lg border border-border bg-card p-2.5 shadow-lg">
                        <p className="label-caps text-[10px] text-muted-foreground">{label}</p>
                        <p className="mt-1 font-mono text-sm font-semibold text-primary">
                          {payload[0]?.value}% <span className="text-xs text-muted-foreground font-normal">Fuel Moisture</span>
                        </p>
                      </div>
                    );
                  }}
                />
                <ReferenceLine
                  y={30.0}
                  stroke="oklch(0.795 0.162 86)"
                  strokeDasharray="4 4"
                  label={{
                    value: "Critical Dry (<30%)",
                    fill: "oklch(0.795 0.162 86)",
                    fontSize: 9,
                    position: "insideBottomLeft",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="oklch(0.797 0.134 211.5)"
                  strokeWidth={2.5}
                  fill="url(#forestHumGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Smoke / PM2.5 Trend */}
        <div className="panel p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame size={16} className="text-warning" />
              <h4 className="label-caps font-semibold text-foreground">Smoke / PM2.5 Trend</h4>
            </div>
            <span className="label-caps text-warning font-mono">µg/m³ (Spike)</span>
          </div>

          <div className="h-[210px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={forestTrendData.smokePm25}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="forestSmokeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.705 0.187 47.6)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="oklch(0.705 0.187 47.6)" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.279 0.037 260 / 0.5)" vertical={false} />
                <XAxis
                  dataKey="time"
                  stroke="oklch(0.711 0.035 256.8)"
                  tick={{ fontSize: 10, fill: "oklch(0.711 0.035 256.8)" }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  domain={[0, 240]}
                  stroke="oklch(0.711 0.035 256.8)"
                  tick={{ fontSize: 10, fill: "oklch(0.711 0.035 256.8)" }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (!active || !payload?.length) return null;
                    return (
                      <div className="rounded-lg border border-border bg-card p-2.5 shadow-lg">
                        <p className="label-caps text-[10px] text-muted-foreground">{label}</p>
                        <p className="mt-1 font-mono text-sm font-semibold text-warning">
                          {payload[0]?.value} µg/m³ <span className="text-xs text-muted-foreground font-normal">Particulate Density</span>
                        </p>
                      </div>
                    );
                  }}
                />
                <ReferenceLine
                  y={150.0}
                  stroke="oklch(0.637 0.208 25.3)"
                  strokeDasharray="4 4"
                  label={{
                    value: "Dense Plume (>150 µg/m³)",
                    fill: "oklch(0.637 0.208 25.3)",
                    fontSize: 9,
                    position: "insideTopLeft",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="oklch(0.705 0.187 47.6)"
                  strokeWidth={2.5}
                  fill="url(#forestSmokeGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
