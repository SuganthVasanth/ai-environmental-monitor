import { useState } from "react";
import { Outlet, useRouterState } from "@tanstack/react-router";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { cn } from "@/lib/utils";

const pageMeta: Record<string, { title: string; subtitle: string }> = {
  "/dashboard": { title: "Dashboard", subtitle: "Environmental Intelligence Overview" },
  "/live-map": { title: "Live Map", subtitle: "Geospatial node monitoring" },
  "/river-nodes": { title: "River Nodes", subtitle: "Water level and flow monitoring" },
  "/industrial-nodes": { title: "Industrial Nodes", subtitle: "Emissions and effluent monitoring" },
  "/landslide-nodes": { title: "Landslide Nodes", subtitle: "Slope stability monitoring" },
  "/alerts": { title: "Alerts", subtitle: "Active and historical alerts" },
  "/analytics": { title: "Analytics", subtitle: "Trends and correlations" },
  "/node-health": { title: "Node Health", subtitle: "Device telemetry and uptime" },
  "/history": { title: "History", subtitle: "Archived sensor records" },
  "/settings": { title: "Settings", subtitle: "Network configuration" },
};

export function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const getMeta = (path: string) => {
    if (pageMeta[path]) return pageMeta[path];
    if (path.startsWith("/river-nodes/")) {
      const id = path.split("/").pop() ?? "";
      return { title: `River Node ${id}`, subtitle: "Hydrodynamic telemetry and flood risk profile" };
    }
    if (path.startsWith("/industrial-nodes/")) {
      const id = path.split("/").pop() ?? "";
      return { title: `Industrial Node ${id}`, subtitle: "Emission levels and gas concentration profile" };
    }
    if (path.startsWith("/landslide-nodes/")) {
      const id = path.split("/").pop() ?? "";
      return { title: `Landslide Node ${id}`, subtitle: "Slope kinematic stability and sensor fusion profile" };
    }
    return {
      title: "Dashboard",
      subtitle: "Environmental Intelligence Overview",
    };
  };

  const meta = getMeta(pathname);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        collapsed={collapsed}
        onToggleCollapsed={() => setCollapsed((v) => !v)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />
      <div
        className={cn(
          "flex min-h-screen min-w-0 flex-col transition-[padding] duration-300 ease-out",
          collapsed ? "lg:pl-[76px]" : "lg:pl-[264px]",
        )}
      >
        <Header
          title={meta.title}
          subtitle={meta.subtitle}
          onOpenMobileNav={() => setMobileOpen(true)}
        />
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
