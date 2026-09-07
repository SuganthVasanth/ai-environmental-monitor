import { createFileRoute } from "@tanstack/react-router";
import { IndustrialNodes } from "@/pages/industrial/IndustrialNodes";

export const Route = createFileRoute("/_shell/industrial-nodes")({
  head: () => ({
    meta: [
      { title: "Industrial Nodes — AI Environment Monitor" },
      { name: "description", content: "Air pollution, chemical/gas indicators and environmental emissions monitoring." },
      { property: "og:title", content: "Industrial Nodes — AI Environment Monitor" },
      { property: "og:description", content: "Air pollution, chemical/gas indicators and environmental emissions monitoring." },
    ],
  }),
  component: IndustrialNodes,
});
