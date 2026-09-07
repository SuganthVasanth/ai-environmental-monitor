import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export const Route = createFileRoute("/_shell/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — NEERKAAPPAN" },
      { name: "description", content: "Trends and correlations across the sensor network." },
      { property: "og:title", content: "Analytics — NEERKAAPPAN" },
      { property: "og:description", content: "Trends and correlations across the sensor network." },
    ],
  }),
  component: () => (
    <PlaceholderPage
      title="Analytics"
      description="Trend charts and correlation analysis will be implemented in a later step."
    />
  ),
});
