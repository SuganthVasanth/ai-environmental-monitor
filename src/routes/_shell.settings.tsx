import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export const Route = createFileRoute("/_shell/settings")({
  head: () => ({
    meta: [
      { title: "Settings — NEERKAAPPAN" },
      { name: "description", content: "Network configuration and alert thresholds." },
      { property: "og:title", content: "Settings — NEERKAAPPAN" },
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
