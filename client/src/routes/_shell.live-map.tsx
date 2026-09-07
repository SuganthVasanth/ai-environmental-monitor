import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export const Route = createFileRoute("/_shell/live-map")({
  head: () => ({
    meta: [
      { title: "Live Map — AI Environment Monitor" },
      { name: "description", content: "Geospatial view of the simulated environmental sensor mesh." },
      { property: "og:title", content: "Live Map — AI Environment Monitor" },
      { property: "og:description", content: "Geospatial view of the simulated environmental sensor mesh." },
    ],
  }),
  component: () => (
    <PlaceholderPage
      title="Live Map"
      description="The full geospatial monitoring map will be implemented in a later step."
    />
  ),
});
