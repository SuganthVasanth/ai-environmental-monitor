import { createFileRoute } from "@tanstack/react-router";
import { LiveMap } from "@/pages/LiveMap";

export const Route = createFileRoute("/_shell/live-map")({
  head: () => ({
    meta: [
      { title: "Live Map — AI Environment Monitor" },
      { name: "description", content: "Geospatial view of the simulated environmental sensor mesh." },
      { property: "og:title", content: "Live Map — AI Environment Monitor" },
      { property: "og:description", content: "Geospatial view of the simulated environmental sensor mesh." },
    ],
  }),
  component: LiveMap,
});
