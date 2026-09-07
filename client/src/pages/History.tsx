import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Database,
  Download,
  Filter,
  History as HistoryIcon,
  Search,
} from "lucide-react";
import { historicalData } from "@/data/mockData";
import { DemoBadge } from "@/components/common/DemoBadge";
import { StatusBadge } from "@/components/common/StatusBadge";
import { RiskBadge } from "@/components/common/RiskBadge";
import { SensorTrendChart } from "@/components/charts/SensorTrendChart";
import { cn } from "@/lib/utils";
import type { HistoricalRecord, NodeCategory, Severity } from "@/types/node";

export function History() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all");
  const [selectedMetric, setSelectedMetric] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const pageSize = 8;

  // Filter records
  const filtered = historicalData.filter((rec) => {
    const q = search.toLowerCase();
    const matchSearch =
      rec.nodeName.toLowerCase().includes(q) ||
      rec.nodeId.toLowerCase().includes(q) ||
      rec.metric.toLowerCase().includes(q);
    const matchCat = selectedCategory === "all" || rec.category === selectedCategory;
    const matchSev = selectedSeverity === "all" || rec.status === selectedSeverity;
    const matchMetric = selectedMetric === "all" || rec.metric === selectedMetric;
    return matchSearch && matchCat && matchSev && matchMetric;
  });

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  // Generate a trend for the selected metric or default
  const chartData = [
    { time: "16:00", value: 2.1 },
    { time: "17:00", value: 2.4 },
    { time: "18:00", value: 2.8 },
    { time: "19:00", value: 3.2 },
    { time: "20:00", value: 3.9 },
    { time: "21:00", value: 4.4 },
    { time: "22:00", value: 4.8 },
    { time: "23:00", value: 5.34 },
  ];

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
              Historical Monitoring Archive
            </h2>
            <DemoBadge />
          </div>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            Review previous environmental sensor telemetry logs, risk evaluations, and threshold breach audits.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <Download size={14} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Historical Telemetry Sparkline Chart */}
      <SensorTrendChart
        title="Historical Telemetry Dispersion (Sampled Interval)"
        data={chartData}
        metricName="Sampled Level"
        unit="m / metric unit"
        strokeColor="oklch(0.797 0.134 211.5)"
        threshold={4.5}
        thresholdLabel="Warning Line"
        height={200}
      />

      {/* Filters Bar */}
      <div className="panel p-4 space-y-3">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          {/* Search */}
          <div className="relative min-w-0 flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
            <input
              type="text"
              placeholder="Search historical logs..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-3 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-hidden"
            />
          </div>

          {/* Filter Selectors */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Category */}
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setPage(1);
              }}
              className="rounded-lg border border-border bg-card px-2.5 py-1.5 text-foreground focus:outline-hidden cursor-pointer"
            >
              <option value="all">All Categories</option>
              <option value="river">River</option>
              <option value="industrial">Industrial</option>
              <option value="landslide">Landslide</option>
            </select>

            {/* Metric */}
            <select
              value={selectedMetric}
              onChange={(e) => {
                setSelectedMetric(e.target.value);
                setPage(1);
              }}
              className="rounded-lg border border-border bg-card px-2.5 py-1.5 text-foreground focus:outline-hidden cursor-pointer"
            >
              <option value="all">All Metrics</option>
              <option value="Water Level">Water Level</option>
              <option value="PM2.5">PM2.5</option>
              <option value="PM10">PM10</option>
              <option value="Tilt">Tilt</option>
              <option value="Soil Moisture">Soil Moisture</option>
              <option value="Rainfall">Rainfall</option>
              <option value="Gas Conc">Gas Conc</option>
            </select>

            {/* Severity */}
            <select
              value={selectedSeverity}
              onChange={(e) => {
                setSelectedSeverity(e.target.value);
                setPage(1);
              }}
              className="rounded-lg border border-border bg-card px-2.5 py-1.5 text-foreground focus:outline-hidden cursor-pointer"
            >
              <option value="all">All Severities</option>
              <option value="normal">Normal</option>
              <option value="watch">Watch</option>
              <option value="warning">Warning</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Historical Telemetry Table */}
      <div className="panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border bg-surface-raised/60 text-muted-foreground">
                <th className="p-3.5 font-medium">Timestamp</th>
                <th className="p-3.5 font-medium">Node</th>
                <th className="p-3.5 font-medium">Type</th>
                <th className="p-3.5 font-medium">Metric</th>
                <th className="p-3.5 font-medium">Observed Value</th>
                <th className="p-3.5 font-medium">Risk Evaluation</th>
                <th className="p-3.5 font-medium">Severity Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-muted-foreground">
                    No historical logs found for the selected criteria.
                  </td>
                </tr>
              ) : (
                paginated.map((rec) => (
                  <tr key={rec.id} className="hover:bg-surface-raised/50 transition-colors">
                    <td className="p-3.5 font-mono text-[11px] text-muted-foreground whitespace-nowrap">
                      {rec.timestamp}
                    </td>
                    <td className="p-3.5 font-mono font-semibold text-foreground whitespace-nowrap">
                      <Link
                        to={
                          rec.category === "river"
                            ? "/river-nodes/$id"
                            : rec.category === "industrial"
                              ? "/industrial-nodes/$id"
                              : "/landslide-nodes/$id"
                        }
                        params={{ id: rec.nodeId }}
                        className="hover:text-primary transition-colors"
                      >
                        {rec.nodeName} ({rec.nodeId})
                      </Link>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <span className="label-caps text-[10px] rounded-sm bg-surface px-1.5 py-0.5 text-muted-foreground border border-border">
                        {rec.category}
                      </span>
                    </td>
                    <td className="p-3.5 font-medium text-foreground whitespace-nowrap">
                      {rec.metric}
                    </td>
                    <td className="p-3.5 font-mono font-bold text-foreground text-sm whitespace-nowrap">
                      {rec.value}
                    </td>
                    <td className="p-3.5 min-w-[120px] whitespace-nowrap">
                      <RiskBadge label="" value={rec.riskScore} severity={rec.status} compact />
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <StatusBadge severity={rec.status}>{rec.status.toUpperCase()}</StatusBadge>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="flex items-center justify-between border-t border-border p-3 text-xs text-muted-foreground">
          <span>
            Showing {(page - 1) * pageSize + 1} to{" "}
            {Math.min(page * pageSize, filtered.length)} of {filtered.length} entries
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="rounded-md border border-border p-1 text-muted-foreground disabled:opacity-40 hover:text-foreground hover:bg-surface"
            >
              <ChevronLeft size={15} />
            </button>
            <span className="font-mono px-2">
              Page {page} of {totalPages}
            </span>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-md border border-border p-1 text-muted-foreground disabled:opacity-40 hover:text-foreground hover:bg-surface"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
