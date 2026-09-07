import { createFileRoute } from "@tanstack/react-router";
import { NodeHealth } from "@/pages/NodeHealth";

export const Route = createFileRoute("/_shell/node-health")({
  head: () => ({
    meta: [
      { title: "Node Health — AI Environment Monitor" },
      { name: "description", content: "Hardware telemetry, battery capacity, LoRa gateway link quality and node diagnostics." },
      { property: "og:title", content: "Node Health — AI Environment Monitor" },
      { property: "og:description", content: "Hardware telemetry, battery capacity, LoRa gateway link quality and node diagnostics." },
    ],
  }),
  component: NodeHealth,
});
