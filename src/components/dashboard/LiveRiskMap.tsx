import { Map as MapIcon, Waves, Factory, Mountain } from "lucide-react";
import { mapNodes } from "@/data/mockData";
import type { NodeCategory, Severity } from "@/types/node";
import { cn } from "@/lib/utils";

const categoryIcon = { river: Waves, industrial: Factory, landslide: Mountain };

const markerTone: Record<Severity, string> = {
  normal: "bg-normal/15 text-normal ring-normal/50",
  watch: "bg-watch/15 text-watch ring-watch/50",
  warning: "bg-warning/15 text-warning ring-warning/50",
  critical: "bg-critical/15 text-critical ring-critical/50",
};

const legend: { severity: Severity; label: string }[] = [
  { severity: "normal", label: "Normal" },
  { severity: "watch", label: "Watch" },
  { severity: "warning", label: "Warning" },
  { severity: "critical", label: "Critical" },
];

const dot: Record<Severity, string> = {
  normal: "bg-normal",
  watch: "bg-watch",
  warning: "bg-warning",
  critical: "bg-critical",
};

export function LiveRiskMap() {
  return (
    <section className="panel overflow-hidden">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border p-5">
        <div className="min-w-0">
          <h2 className="truncate text-base font-semibold text-foreground">
            Live Environmental Risk Map
          </h2>
          <p className="label-caps mt-1 text-muted-foreground/80">
            Simulated sensor mesh · 5 markers
          </p>
        </div>
        <span className="label-caps shrink-0 rounded-full bg-secondary/15 px-2.5 py-1 text-secondary ring-1 ring-inset ring-secondary/30">
          Demo Data
        </span>
      </div>

      <div className="relative grid-backdrop h-[340px] w-full bg-background/70 sm:h-[420px]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,oklch(0.797_0.134_211.5/10%),transparent_55%),radial-gradient(circle_at_75%_70%,oklch(0.627_0.233_303.9/12%),transparent_55%)]" />

        {mapNodes.map((node) => {
          const Icon = categoryIcon[node.category as NodeCategory];
          return (
            <div
              key={node.id}
              className="group absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              <span
                className={cn(
                  "grid size-9 place-items-center rounded-full ring-1 ring-inset backdrop-blur-sm transition-transform duration-300 group-hover:scale-110",
                  markerTone[node.severity],
                )}
              >
                <Icon size={16} />
              </span>
              <span
                className={cn(
                  "absolute inset-0 -z-10 animate-ping rounded-full opacity-30",
                  dot[node.severity],
                )}
              />
              <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-card px-2 py-1 text-xs text-foreground opacity-0 transition-opacity group-hover:opacity-100">
                {node.name}
              </span>
            </div>
          );
        })}

        <div className="absolute bottom-4 left-4 rounded-xl border border-border bg-card/85 p-3 backdrop-blur-sm">
          <p className="label-caps mb-2 text-muted-foreground/80">Legend</p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5">
            {legend.map((item) => (
              <li key={item.severity} className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className={cn("size-2 rounded-full", dot[item.severity])} />
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="absolute right-4 top-4 flex items-center gap-2 rounded-lg border border-border bg-card/85 px-2.5 py-1.5 text-muted-foreground backdrop-blur-sm">
          <MapIcon size={14} className="text-primary" />
          <span className="label-caps">Grid View</span>
        </div>
      </div>
    </section>
  );
}
