import { createFileRoute } from "@tanstack/react-router";
import { LandslideNodes } from "@/pages/landslide/LandslideNodes";

export const Route = createFileRoute("/_shell/landslide-nodes")({
  head: () => ({
    meta: [
      { title: "Landslide Nodes — AI Environment Monitor" },
      { name: "description", content: "Rainfall, soil moisture, tilt movement and seismic vibration monitoring." },
      { property: "og:title", content: "Landslide Nodes — AI Environment Monitor" },
      { property: "og:description", content: "Rainfall, soil moisture, tilt movement and seismic vibration monitoring." },
    ],
  }),
  component: LandslideNodes,
});
