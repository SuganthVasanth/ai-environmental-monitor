import { createFileRoute } from "@tanstack/react-router";
import { LandslideNodeDetail } from "@/pages/landslide/LandslideNodeDetail";

export const Route = createFileRoute("/_shell/landslide-nodes/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Landslide Node ${params.id} — AI Environment Monitor` },
      { name: "description", content: "Slope stability kinematics, tilt rate, and multi-sensor fusion profile." },
      { property: "og:title", content: `Landslide Node ${params.id} — AI Environment Monitor` },
      { property: "og:description", content: "Slope stability kinematics, tilt rate, and multi-sensor fusion profile." },
    ],
  }),
  component: LandslideNodeDetail,
});
