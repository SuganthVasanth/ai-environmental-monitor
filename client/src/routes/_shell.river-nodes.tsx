import { createFileRoute } from "@tanstack/react-router";
import { RiverNodes } from "@/pages/river/RiverNodes";

export const Route = createFileRoute("/_shell/river-nodes")({
  head: () => ({
    meta: [
      { title: "River Nodes — AI Environment Monitor" },
      { name: "description", content: "Water level, flow, and catchment rainfall monitoring nodes." },
      { property: "og:title", content: "River Nodes — AI Environment Monitor" },
      { property: "og:description", content: "Water level, flow, and catchment rainfall monitoring nodes." },
    ],
  }),
  component: RiverNodes,
});
