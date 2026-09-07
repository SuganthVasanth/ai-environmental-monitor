import { createFileRoute } from "@tanstack/react-router";
import { Settings } from "@/pages/Settings";

export const Route = createFileRoute("/_shell/settings")({
  head: () => ({
    meta: [
      { title: "Settings — AI Environment Monitor" },
      { name: "description", content: "Command center display preferences, alert notification thresholds, and network parameters." },
      { property: "og:title", content: "Settings — AI Environment Monitor" },
      { property: "og:description", content: "Command center display preferences, alert notification thresholds, and network parameters." },
    ],
  }),
  component: Settings,
});
