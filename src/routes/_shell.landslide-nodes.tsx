import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export const Route = createFileRoute("/_shell/landslide-nodes")({
  head: () => ({
    meta: [
      { title: "Landslide Nodes — NEERKAAPPAN" },
      { name: "description", content: "Slope stability and ground movement monitoring nodes." },
      { property: "og:title", content: "Landslide Nodes — NEERKAAPPAN" },
      { property: "og:description", content: "Slope stability and ground movement monitoring nodes." },
    ],
  }),
  component: () => (
    <PlaceholderPage
      title="Landslide Nodes"
      description="Detailed landslide node telemetry will be implemented in a later step."
    />
  ),
});
