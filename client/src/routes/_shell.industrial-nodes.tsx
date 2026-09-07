import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export const Route = createFileRoute("/_shell/industrial-nodes")({
  head: () => ({
    meta: [
      { title: "Industrial Nodes — AI Environment Monitor" },
      { name: "description", content: "Emissions and effluent monitoring nodes." },
      { property: "og:title", content: "Industrial Nodes — AI Environment Monitor" },
      { property: "og:description", content: "Emissions and effluent monitoring nodes." },
    ],
  }),
  component: () => (
    <PlaceholderPage
      title="Industrial Nodes"
      description="Detailed industrial node telemetry will be implemented in a later step."
    />
  ),
});
