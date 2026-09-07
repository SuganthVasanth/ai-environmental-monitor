import { useEffect, useRef, useState } from "react";
import { Bell, Menu } from "lucide-react";
import { notifications, systemDate } from "@/data/mockData";
import { StatusBadge } from "@/components/common/StatusBadge";

interface HeaderProps {
  title: string;
  subtitle: string;
  onOpenMobileNav: () => void;
}

export function Header({ title, subtitle, onOpenMobileNav }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3.5 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onOpenMobileNav}
            className="shrink-0 rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:text-primary lg:hidden"
            aria-label="Open navigation"
          >
            <Menu size={17} />
          </button>
          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold text-foreground sm:text-lg">
              {title}
            </h1>
            <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <StatusBadge severity="normal" className="hidden sm:inline-flex">
            Live System
          </StatusBadge>

          <div className="relative" ref={ref}>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Notifications"
              className="relative rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              <Bell size={17} />
              <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-critical ring-2 ring-background" />
            </button>

            {open && (
              <div className="panel absolute right-0 top-12 z-40 w-[min(20rem,calc(100vw-2rem))] p-3">
                <p className="label-caps px-1 pb-2 text-muted-foreground/70">
                  Notifications
                </p>
                <ul className="divide-y divide-border">
                  {notifications.map((n) => (
                    <li key={n.id} className="py-2.5">
                      <div className="flex items-center gap-2">
                        <StatusBadge severity={n.severity}>{n.label}</StatusBadge>
                        <span className="truncate text-sm text-foreground">{n.node}</span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{n.description}</p>
                      <p className="label-caps mt-1 text-muted-foreground/60">{n.timeAgo}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <span className="label-caps hidden rounded-lg border border-border px-2.5 py-2 text-muted-foreground sm:inline-block">
            {systemDate}
          </span>
        </div>
      </div>
    </header>
  );
}
