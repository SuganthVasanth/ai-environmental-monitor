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
import type { TimeSeriesPoint } from "@/types/node";

interface SensorTrendChartProps {
  title: string;
  data: TimeSeriesPoint[];
  metricName: string;
  unit: string;
  strokeColor?: string;
  fillColor?: string;
  threshold?: number;
  thresholdLabel?: string;
  height?: number;
}

export function SensorTrendChart({
  title,
  data,
  metricName,
  unit,
  strokeColor = "oklch(0.797 0.134 211.5)", // primary cyan
  fillColor = "oklch(0.797 0.134 211.5 / 0.15)",
  threshold,
  thresholdLabel = "Warning Threshold",
  height = 240,
}: SensorTrendChartProps) {
  const gradientId = `grad-${title.replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <div className="panel p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="label-caps text-foreground font-semibold">{title}</h4>
        <span className="label-caps text-muted-foreground/80">{unit}</span>
      </div>

      <div style={{ height, width: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={strokeColor} stopOpacity={0.4} />
                <stop offset="95%" stopColor={strokeColor} stopOpacity={0.0} />
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
              stroke="oklch(0.711 0.035 256.8)"
              tick={{ fontSize: 10, fill: "oklch(0.711 0.035 256.8)" }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (!active || !payload || !payload.length) return null;
                return (
                  <div className="rounded-lg border border-border bg-card p-2.5 shadow-lg">
                    <p className="label-caps text-[10px] text-muted-foreground">{label}</p>
                    <p className="mt-1 font-mono text-sm font-semibold text-foreground">
                      {payload[0]?.value} <span className="text-xs text-muted-foreground font-normal">{unit}</span>
                    </p>
                  </div>
                );
              }}
            />
            {threshold && (
              <ReferenceLine
                y={threshold}
                stroke="oklch(0.705 0.187 47.6)"
                strokeDasharray="4 4"
                label={{
                  value: thresholdLabel,
                  fill: "oklch(0.705 0.187 47.6)",
                  fontSize: 10,
                  position: "insideTopRight",
                }}
              />
            )}
            <Area
              type="monotone"
              dataKey="value"
              name={metricName}
              stroke={strokeColor}
              strokeWidth={2}
              fill={`url(#${gradientId})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
