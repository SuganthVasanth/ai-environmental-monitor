import { createFileRoute } from "@tanstack/react-router";
import { Alerts } from "@/pages/Alerts";

export const Route = createFileRoute("/_shell/alerts")({
  head: () => ({
    meta: [
      { title: "Alert Center — AI Environment Monitor" },
      { name: "description", content: "Active and historical environmental warnings, hazard notices and emergency telemetry." },
      { property: "og:title", content: "Alert Center — AI Environment Monitor" },
      { property: "og:description", content: "Active and historical environmental warnings, hazard notices and emergency telemetry." },
    ],
  }),
  component: Alerts,
});
