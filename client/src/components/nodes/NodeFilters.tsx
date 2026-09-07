import { Search, SlidersHorizontal, LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FilterOptions {
  search: string;
  status: string;
  sortBy: string;
  viewMode?: "grid" | "table";
}

interface NodeFiltersProps {
  filters: FilterOptions;
  onChange: (updated: FilterOptions) => void;
  statusOptions?: { value: string; label: string }[];
  sortOptions?: { value: string; label: string }[];
  showViewToggle?: boolean;
}

export function NodeFilters({
  filters,
  onChange,
  statusOptions = [
    { value: "all", label: "All Status" },
    { value: "normal", label: "Normal / Safe" },
    { value: "watch", label: "Watch" },
    { value: "warning", label: "Warning" },
    { value: "critical", label: "Critical / Emergency" },
  ],
  sortOptions = [
    { value: "id", label: "Node ID" },
    { value: "risk", label: "Highest Risk" },
    { value: "name", label: "Node Name" },
    { value: "battery", label: "Battery Level" },
    { value: "updated", label: "Recent Update" },
  ],
  showViewToggle = true,
}: NodeFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Search Input */}
      <div className="relative min-w-0 flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
        <input
          type="text"
          placeholder="Search by ID, name, or location..."
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-hidden focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Controls Group */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        {/* Status Dropdown/Select */}
        <div className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs text-muted-foreground">
          <SlidersHorizontal size={13} className="text-primary" />
          <select
            value={filters.status}
            onChange={(e) => onChange({ ...filters, status: e.target.value })}
            className="bg-transparent text-foreground focus:outline-hidden cursor-pointer"
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-card text-foreground">
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs text-muted-foreground">
          <span className="label-caps text-[10px] text-muted-foreground/70">Sort:</span>
          <select
            value={filters.sortBy}
            onChange={(e) => onChange({ ...filters, sortBy: e.target.value })}
            className="bg-transparent text-foreground focus:outline-hidden cursor-pointer"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-card text-foreground">
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* View Mode Toggle */}
        {showViewToggle && filters.viewMode && (
          <div className="flex items-center rounded-lg border border-border bg-card p-0.5">
            <button
              type="button"
              onClick={() => onChange({ ...filters, viewMode: "table" })}
              className={cn(
                "rounded-md p-1.5 text-muted-foreground transition-colors",
                filters.viewMode === "table" && "bg-surface-raised text-primary shadow-xs"
              )}
              title="Table View"
            >
              <List size={16} />
            </button>
            <button
              type="button"
              onClick={() => onChange({ ...filters, viewMode: "grid" })}
              className={cn(
                "rounded-md p-1.5 text-muted-foreground transition-colors",
                filters.viewMode === "grid" && "bg-surface-raised text-primary shadow-xs"
              )}
              title="Grid View"
            >
              <LayoutGrid size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
