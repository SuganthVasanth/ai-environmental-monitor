import { useState } from "react";
import {
  Bell,
  Check,
  Cpu,
  Eye,
  Info,
  Layers,
  Moon,
  RefreshCw,
  Save,
  ShieldAlert,
  Sliders,
  Sparkles,
} from "lucide-react";
import { DemoBadge } from "@/components/common/DemoBadge";
import { cn } from "@/lib/utils";

interface ToggleItemProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function ToggleItem({ label, description, checked, onChange }: ToggleItemProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="pr-4">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden",
          checked ? "bg-primary" : "bg-muted"
        )}
      >
        <span
          className={cn(
            "pointer-events-none inline-block size-5 transform rounded-full bg-foreground shadow-lg ring-0 transition duration-200 ease-in-out",
            checked ? "translate-x-5" : "translate-x-0"
          )}
        />
      </button>
    </div>
  );
}

export function Settings() {
  // System Preferences
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);
  const [compactDashboard, setCompactDashboard] = useState<boolean>(false);

  // Alert Preferences
  const [criticalAlerts, setCriticalAlerts] = useState<boolean>(true);
  const [warningAlerts, setWarningAlerts] = useState<boolean>(true);
  const [watchAlerts, setWatchAlerts] = useState<boolean>(true);

  // Display
  const [mapLabels, setMapLabels] = useState<boolean>(true);
  const [showNodeIds, setShowNodeIds] = useState<boolean>(true);
  const [showRiskScores, setShowRiskScores] = useState<boolean>(true);

  const [savedMessage, setSavedMessage] = useState<boolean>(false);

  const handleSave = () => {
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2500);
  };

  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
              System Settings & Preferences
            </h2>
            <DemoBadge />
          </div>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            Configure command center display modes, threshold alert triggers, and telemetry poll rates.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-all shadow-sm"
        >
          {savedMessage ? <Check size={14} /> : <Save size={14} />}
          <span>{savedMessage ? "Preferences Stored" : "Save Preferences"}</span>
        </button>
      </div>

      {savedMessage && (
        <div className="rounded-lg bg-normal/10 p-3 text-xs text-normal border border-normal/20 flex items-center gap-2 animate-in fade-in">
          <Check size={14} />
          <span>Local client settings successfully updated.</span>
        </div>
      )}

      {/* System Preferences */}
      <section className="panel p-5 space-y-4">
        <div className="flex items-center gap-2 border-b border-border pb-3">
          <Moon size={17} className="text-primary" />
          <h3 className="text-base font-semibold text-foreground">System Preferences</h3>
        </div>
        <div className="divide-y divide-border">
          <ToggleItem
            label="Dark Command Center Mode"
            description="High-contrast dark theme optimized for low-light operations room environments."
            checked={darkMode}
            onChange={setDarkMode}
          />
          <ToggleItem
            label="Live Telemetry Auto-Refresh"
            description="Automatically poll sensor nodes and update radar scans at 30-second intervals."
            checked={autoRefresh}
            onChange={setAutoRefresh}
          />
          <ToggleItem
            label="Compact Dashboard Layout"
            description="Reduce padding and show dense data rows for multi-monitor command walls."
            checked={compactDashboard}
            onChange={setCompactDashboard}
          />
        </div>
      </section>

      {/* Alert Preferences */}
      <section className="panel p-5 space-y-4">
        <div className="flex items-center gap-2 border-b border-border pb-3">
          <Bell size={17} className="text-warning" />
          <h3 className="text-base font-semibold text-foreground">Alert Notification Preferences</h3>
        </div>
        <div className="divide-y divide-border">
          <ToggleItem
            label="Critical Hazard Alerts"
            description="Broadcast immediate visual banner alerts and audio ping when threshold breaches occur."
            checked={criticalAlerts}
            onChange={setCriticalAlerts}
          />
          <ToggleItem
            label="Warning Level Alerts"
            description="Notify when rate-of-rise or chemical gas parameters approach warning margins."
            checked={warningAlerts}
            onChange={setWarningAlerts}
          />
          <ToggleItem
            label="Watch Advisory Level"
            description="Surface anomalous deviation warnings from seasonal baselines."
            checked={watchAlerts}
            onChange={setWatchAlerts}
          />
        </div>
      </section>

      {/* Display Settings */}
      <section className="panel p-5 space-y-4">
        <div className="flex items-center gap-2 border-b border-border pb-3">
          <Eye size={17} className="text-secondary" />
          <h3 className="text-base font-semibold text-foreground">Display & Map Overlay</h3>
        </div>
        <div className="divide-y divide-border">
          <ToggleItem
            label="Geographic Map Labels"
            description="Render station name and primary metric tags directly on top of geospatial pins."
            checked={mapLabels}
            onChange={setMapLabels}
          />
          <ToggleItem
            label="Show Hardware Node IDs"
            description="Display canonical LoRa node IDs (e.g. RN-07, IN-03) next to station names."
            checked={showNodeIds}
            onChange={setShowNodeIds}
          />
          <ToggleItem
            label="Show Predictive Risk Scores"
            description="Show Edge AI calculated probability percentages alongside raw telemetry values."
            checked={showRiskScores}
            onChange={setShowRiskScores}
          />
        </div>
      </section>

      {/* System Information */}
      <section className="panel p-5 space-y-4">
        <div className="flex items-center gap-2 border-b border-border pb-3">
          <Info size={17} className="text-primary" />
          <h3 className="text-base font-semibold text-foreground">System Information</h3>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 text-xs font-mono">
          <div className="rounded-lg bg-surface-raised p-3">
            <span className="label-caps text-muted-foreground text-[10px]">Application</span>
            <p className="mt-1 font-bold text-foreground text-sm">AI Environment Monitor</p>
            <p className="text-[10px] text-muted-foreground">Environmental Intelligence Network</p>
          </div>

          <div className="rounded-lg bg-surface-raised p-3">
            <span className="label-caps text-muted-foreground text-[10px]">Version</span>
            <p className="mt-1 font-bold text-foreground text-sm">1.0.0-PROTOTYPE</p>
            <p className="text-[10px] text-muted-foreground">Build: 2026.09.07</p>
          </div>

          <div className="rounded-lg bg-surface-raised p-3">
            <span className="label-caps text-muted-foreground text-[10px]">Environment</span>
            <p className="mt-1 font-bold text-secondary text-sm">DEMO / SIMULATED</p>
            <p className="text-[10px] text-muted-foreground">Synthesized Sensor Mesh</p>
          </div>

          <div className="rounded-lg bg-surface-raised p-3">
            <span className="label-caps text-muted-foreground text-[10px]">Data Stream</span>
            <p className="mt-1 font-bold text-normal text-sm">Simulated Sensor Data</p>
            <p className="text-[10px] text-muted-foreground">35 Connected Virtual Nodes</p>
          </div>
        </div>

        <p className="text-xs text-muted-foreground pt-2">
          Note: This command center prototype operates purely on simulated data models for demonstration purposes. Deployed field sensors require hardware calibration, antenna field tests, and site-specific flood/landslide risk boundary training.
        </p>
      </section>
    </div>
  );
}
