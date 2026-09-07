import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "@/pages/Dashboard";

export const Route = createFileRoute("/_shell/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — NEERKAAPPAN Environmental Intelligence" },
      {
        name: "description",
        content:
          "Command center overview of river, industrial and landslide monitoring nodes, active alerts and composite risk indices.",
      },
      { property: "og:title", content: "NEERKAAPPAN Dashboard — Environmental Intelligence" },
      {
        property: "og:description",
        content: "Monitor environmental conditions, node health and active risks in one command center.",
      },
    ],
  }),
  component: Dashboard,
});
