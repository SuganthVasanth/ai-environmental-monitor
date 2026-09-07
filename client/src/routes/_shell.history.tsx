import { createFileRoute } from "@tanstack/react-router";
import { History } from "@/pages/History";

export const Route = createFileRoute("/_shell/history")({
  head: () => ({
    meta: [
      { title: "History — AI Environment Monitor" },
      { name: "description", content: "Historical environmental sensor telemetry archive, risk evaluations, and threshold breach audits." },
      { property: "og:title", content: "History — AI Environment Monitor" },
      { property: "og:description", content: "Historical environmental sensor telemetry archive, risk evaluations, and threshold breach audits." },
    ],
  }),
  component: History,
});
