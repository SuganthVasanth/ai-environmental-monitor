import { Link } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Factory,
  History,
  LayoutDashboard,
  Map,
  Mountain,
  PanelLeftClose,
  PanelLeftOpen,
  Radio,
  Settings,
  TreePine,
  Waves,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sections = [
  {
    title: "Overview",
    items: [{ to: "/dashboard", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    title: "Monitoring",
    items: [
      { to: "/live-map", label: "Live Map", icon: Map },
      { to: "/river-nodes", label: "River Nodes", icon: Waves },
      { to: "/industrial-nodes", label: "Industrial Nodes", icon: Factory },
      { to: "/landslide-nodes", label: "Landslide Nodes", icon: Mountain },
      { to: "/forest-nodes", label: "Forest Nodes", icon: TreePine },
    ],
  },
  {
    title: "Management",
    items: [
      { to: "/alerts", label: "Alerts", icon: AlertTriangle },
      { to: "/analytics", label: "Analytics", icon: BarChart3 },
      { to: "/node-health", label: "Node Health", icon: Radio },
      { to: "/history", label: "History", icon: History },
    ],
  },
  {
    title: "System",
    items: [{ to: "/settings", label: "Settings", icon: Settings }],
  },
] as const;

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapsed: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export function Sidebar({
  collapsed,
  onToggleCollapsed,
  mobileOpen,
  onCloseMobile,
}: SidebarProps) {
  return (
    <>
      <div
        aria-hidden={!mobileOpen}
        onClick={onCloseMobile}
        className={cn(
          "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-opacity lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-border bg-card transition-[width,transform] duration-300 ease-out",
          collapsed ? "w-[76px]" : "w-[264px]",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
        )}
      >
        <div className="flex items-center gap-3 border-b border-border px-4 py-4">
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary ring-1 ring-inset ring-primary/30">
            <Activity size={18} />
          </span>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-sm font-bold tracking-[0.14em] text-foreground">
                AI Environment Monitor
              </p>
              <p className="truncate text-xs text-muted-foreground">
                Environmental Intelligence
              </p>
            </div>
          )}
          <button
            type="button"
            onClick={onCloseMobile}
            className="shrink-0 rounded-lg p-1.5 text-muted-foreground transition-colors hover:text-foreground lg:hidden"
            aria-label="Close navigation"
          >
            <X size={17} />
          </button>
        </div>

        <div className={cn("px-4 py-3", collapsed && "px-0 text-center")}>
          <span
            className={cn(
              "label-caps inline-flex items-center gap-2 rounded-full bg-normal/10 px-2.5 py-1 text-normal ring-1 ring-inset ring-normal/25",
              collapsed && "px-2",
            )}
          >
            <span className="size-1.5 animate-pulse rounded-full bg-normal" />
            {!collapsed && "System Operational"}
          </span>
        </div>

        <nav className="flex-1 space-y-5 overflow-y-auto px-3 pb-6">
          {sections.map((section) => (
            <div key={section.title}>
              {!collapsed && (
                <p className="label-caps px-2 pb-2 text-muted-foreground/60">
                  {section.title}
                </p>
              )}
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      onClick={onCloseMobile}
                      title={collapsed ? item.label : undefined}
                      className={cn(
                        "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-background/60 hover:text-foreground",
                        collapsed && "justify-center px-0",
                      )}
                      activeProps={{
                        className:
                          "bg-primary/10 text-primary ring-1 ring-inset ring-primary/25 hover:text-primary",
                      }}
                    >
                      <item.icon size={17} className="shrink-0" />
                      {!collapsed && <span className="truncate">{item.label}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <button
          type="button"
          onClick={onToggleCollapsed}
          className="label-caps hidden items-center gap-2 border-t border-border px-4 py-3 text-muted-foreground transition-colors hover:text-primary lg:flex"
        >
          {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
          {!collapsed && "Collapse"}
        </button>
      </aside>
    </>
  );
}
