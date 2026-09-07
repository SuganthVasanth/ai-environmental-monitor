import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export const Route = createFileRoute("/_shell/river-nodes")({
  head: () => ({
    meta: [
      { title: "River Nodes — NEERKAAPPAN" },
      { name: "description", content: "Water level, flow and rainfall monitoring nodes." },
      { property: "og:title", content: "River Nodes — NEERKAAPPAN" },
      { property: "og:description", content: "Water level, flow and rainfall monitoring nodes." },
    ],
  }),
  component: () => (
    <PlaceholderPage
      title="River Nodes"
      description="Detailed river node telemetry will be implemented in a later step."
    />
  ),
});
