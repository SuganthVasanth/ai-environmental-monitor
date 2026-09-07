import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export const Route = createFileRoute("/_shell/node-health")({
  head: () => ({
    meta: [
      { title: "Node Health — AI Environment Monitor" },
      { name: "description", content: "Device telemetry, battery and uptime for every node." },
      { property: "og:title", content: "Node Health — AI Environment Monitor" },
      { property: "og:description", content: "Device telemetry, battery and uptime for every node." },
    ],
  }),
  component: () => (
    <PlaceholderPage
      title="Node Health"
      description="Device diagnostics and uptime reporting will be implemented in a later step."
    />
  ),
});
