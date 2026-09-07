import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export const Route = createFileRoute("/_shell/alerts")({
  head: () => ({
    meta: [
      { title: "Alerts — NEERKAAPPAN" },
      { name: "description", content: "Active and historical environmental alerts." },
      { property: "og:title", content: "Alerts — NEERKAAPPAN" },
      { property: "og:description", content: "Active and historical environmental alerts." },
    ],
  }),
  component: () => (
    <PlaceholderPage
      title="Alerts"
      description="The full alert center will be implemented in a later step."
    />
  ),
});
