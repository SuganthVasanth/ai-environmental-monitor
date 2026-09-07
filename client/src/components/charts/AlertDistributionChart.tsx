import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface DistributionItem {
  name: string;
  count: number;
  fill: string;
}

interface AlertDistributionChartProps {
  title: string;
  data: DistributionItem[];
  height?: number;
}

export function AlertDistributionChart({
  title,
  data,
  height = 240,
}: AlertDistributionChartProps) {
  const total = data.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="panel p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="label-caps text-foreground font-semibold">{title}</h4>
        <span className="label-caps text-muted-foreground">{total} Total</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
        <div style={{ height, width: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="count"
                nameKey="name"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={4}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload || !payload.length) return null;
                  const item = payload[0]?.payload as DistributionItem | undefined;
                  if (!item) return null;
                  const pct = Math.round((item.count / total) * 100);
                  return (
                    <div className="rounded-lg border border-border bg-card p-2 shadow-lg">
                      <p className="text-xs font-semibold text-foreground">{item.name}</p>
                      <p className="font-mono text-sm text-primary">
                        {item.count} events ({pct}%)
                      </p>
                    </div>
                  );
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <ul className="space-y-2.5">
          {data.map((item) => {
            const pct = Math.round((item.count / total) * 100);
            return (
              <li key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full" style={{ backgroundColor: item.fill }} />
                  <span className="text-muted-foreground truncate">{item.name}</span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <span className="text-foreground font-medium">{item.count}</span>
                  <span className="text-muted-foreground text-[11px]">({pct}%)</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
