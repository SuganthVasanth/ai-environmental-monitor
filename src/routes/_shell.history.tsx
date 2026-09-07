import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export const Route = createFileRoute("/_shell/history")({
  head: () => ({
    meta: [
      { title: "History — NEERKAAPPAN" },
      { name: "description", content: "Archived sensor records and past events." },
      { property: "og:title", content: "History — NEERKAAPPAN" },
      { property: "og:description", content: "Archived sensor records and past events." },
    ],
  }),
  component: () => (
    <PlaceholderPage
      title="History"
      description="Archived sensor records will be implemented in a later step."
    />
  ),
});
