import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export const Route = createFileRoute("/_shell/settings")({
  head: () => ({
    meta: [
      { title: "Settings — AI Environment Monitor" },
      { name: "description", content: "Network configuration and alert thresholds." },
      { property: "og:title", content: "Settings — AI Environment Monitor" },
      { property: "og:description", content: "Network configuration and alert thresholds." },
    ],
  }),
  component: () => (
    <PlaceholderPage
      title="Settings"
      description="Configuration options will be implemented in a later step."
    />
  ),
});
