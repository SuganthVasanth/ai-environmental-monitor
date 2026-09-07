import { createFileRoute } from "@tanstack/react-router";
import { IndustrialNodeDetail } from "@/pages/industrial/IndustrialNodeDetail";

export const Route = createFileRoute("/_shell/industrial-nodes/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Industrial Node ${params.id} — AI Environment Monitor` },
      { name: "description", content: "Air quality telemetry and industrial emissions risk profile." },
      { property: "og:title", content: `Industrial Node ${params.id} — AI Environment Monitor` },
      { property: "og:description", content: "Air quality telemetry and industrial emissions risk profile." },
    ],
  }),
  component: IndustrialNodeDetail,
});
