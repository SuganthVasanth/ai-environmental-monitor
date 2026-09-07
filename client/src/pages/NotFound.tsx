import { Link } from "@tanstack/react-router";
import { ArrowLeft, ShieldAlert } from "lucide-react";

export function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
      <div className="panel max-w-md p-8 space-y-4">
        <span className="grid size-14 mx-auto place-items-center rounded-2xl bg-critical/15 text-critical ring-1 ring-critical/30">
          <ShieldAlert size={28} />
        </span>
        <h2 className="text-2xl font-bold font-display text-foreground">404 — Telemetry Station Offline</h2>
        <p className="text-xs text-muted-foreground">
          The requested station route or command center resource could not be found or has been decommissioned from the mesh network.
        </p>
        <div className="pt-2">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-all"
          >
            <ArrowLeft size={14} />
            <span>Return to Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
