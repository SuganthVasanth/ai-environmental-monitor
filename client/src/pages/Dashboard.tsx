import {
  Activity,
  AlertTriangle,
  Factory,
  FlaskConical,
  Mountain,
  Network,
  ShieldAlert,
  Waves,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { NodeTypeCard } from "@/components/dashboard/NodeTypeCard";
import { LiveRiskMap } from "@/components/dashboard/LiveRiskMap";
import { RiskOverview } from "@/components/dashboard/RiskOverview";
import { RecentAlerts } from "@/components/dashboard/RecentAlerts";
import { DEMO_NOTICE, nodeTypeSummaries, summaryStats } from "@/data/mockData";

const statIcons = [Network, AlertTriangle, ShieldAlert, Activity];
const typeIcons = { river: Waves, industrial: Factory, landslide: Mountain };

export function Dashboard() {
  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
        <div className="min-w-0">
          <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
            Environmental Intelligence Overview
          </h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Monitor environmental conditions, node health and active risks.
          </p>
        </div>
        <div className="hidden shrink-0 items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 sm:flex">
          <FlaskConical size={15} className="text-secondary" />
          <div>
            <p className="label-caps text-secondary">{DEMO_NOTICE.title}</p>
            <p className="text-[11px] text-muted-foreground">{DEMO_NOTICE.detail}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryStats.map((stat, i) => (
          <StatCard key={stat.id} stat={stat} icon={statIcons[i] ?? Activity} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {nodeTypeSummaries.map((summary) => (
          <NodeTypeCard key={summary.id} summary={summary} icon={typeIcons[summary.id]} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="min-w-0 xl:col-span-2">
          <LiveRiskMap />
        </div>
        <div className="min-w-0">
          <RiskOverview />
        </div>
      </div>

      <RecentAlerts />

      <p className="label-caps pb-2 text-center text-muted-foreground/50 sm:hidden">
        {DEMO_NOTICE.title} · {DEMO_NOTICE.detail}
      </p>
    </div>
  );
}
