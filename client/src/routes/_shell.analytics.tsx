import { createFileRoute } from "@tanstack/react-router";
import { Analytics } from "@/pages/Analytics";

export const Route = createFileRoute("/_shell/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — AI Environment Monitor" },
      { name: "description", content: "Cross-category environmental hazard correlations, trend indices, and distribution telemetry." },
      { property: "og:title", content: "Analytics — AI Environment Monitor" },
      { property: "og:description", content: "Cross-category environmental hazard correlations, trend indices, and distribution telemetry." },
    ],
  }),
  component: Analytics,
});
