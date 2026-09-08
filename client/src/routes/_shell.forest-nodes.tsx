import { createFileRoute } from "@tanstack/react-router";
import { ForestNodes } from "@/pages/ForestNodes";

export const Route = createFileRoute("/_shell/forest-nodes")({
  head: () => ({
    meta: [
      { title: "Forest Fire Monitoring — AI Environment Monitor" },
      {
        name: "description",
        content:
          "Monitor forest environmental conditions, fire indicators and wildfire risk across autonomous sensor nodes.",
      },
      {
        property: "og:title",
        content: "Forest Fire Monitoring — AI Environment Monitor",
      },
      {
        property: "og:description",
        content:
          "Monitor forest environmental conditions, fire indicators and wildfire risk across autonomous sensor nodes.",
      },
    ],
  }),
  component: ForestNodes,
});
