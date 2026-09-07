import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export const Route = createFileRoute("/_shell/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — AI Environment Monitor" },
      { name: "description", content: "Trends and correlations across the sensor network." },
      { property: "og:title", content: "Analytics — AI Environment Monitor" },
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
