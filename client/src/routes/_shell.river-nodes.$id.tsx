import { createFileRoute } from "@tanstack/react-router";
import { RiverNodeDetail } from "@/pages/river/RiverNodeDetail";

export const Route = createFileRoute("/_shell/river-nodes/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `River Node ${params.id} — AI Environment Monitor` },
      { name: "description", content: "Hydrodynamic telemetry and flood risk profile." },
      { property: "og:title", content: `River Node ${params.id} — AI Environment Monitor` },
      { property: "og:description", content: "Hydrodynamic telemetry and flood risk profile." },
    ],
  }),
  component: RiverNodeDetail,
});
