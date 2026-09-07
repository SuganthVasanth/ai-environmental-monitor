import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface LineMetricConfig {
  key: string;
  name: string;
  color: string;
  unit: string;
}

interface MultiMetricChartProps {
  title: string;
  data: any[];
  lines: LineMetricConfig[];
  height?: number;
  subtitle?: string;
}

export function MultiMetricChart({
  title,
  data,
  lines,
  height = 280,
  subtitle,
}: MultiMetricChartProps) {
  return (
    <div className="panel p-4 space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
        <div>
          <h4 className="label-caps text-foreground font-semibold">{title}</h4>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
      </div>

      <div style={{ height, width: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
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
                  <div className="rounded-lg border border-border bg-card p-3 shadow-lg space-y-1.5">
                    <p className="label-caps text-[10px] text-muted-foreground">{label}</p>
                    {payload.map((entry, idx) => {
                      const cfg = lines.find((l) => l.key === entry.dataKey);
                      return (
                        <div key={idx} className="flex items-center justify-between gap-3 text-xs">
                          <span className="flex items-center gap-1.5" style={{ color: entry.color }}>
                            <span className="size-2 rounded-full" style={{ backgroundColor: entry.color }} />
                            {cfg?.name ?? entry.dataKey}:
                          </span>
                          <span className="font-mono font-semibold text-foreground">
                            {entry.value} {cfg?.unit}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                );
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }}
              formatter={(value) => <span className="text-muted-foreground">{value}</span>}
            />
            {lines.map((l) => (
              <Line
                key={l.key}
                type="monotone"
                dataKey={l.key}
                name={l.name}
                stroke={l.color}
                strokeWidth={2}
                dot={{ r: 2, fill: l.color }}
                activeDot={{ r: 5 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
