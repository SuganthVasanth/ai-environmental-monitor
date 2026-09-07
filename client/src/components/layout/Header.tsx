import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Bell, CheckCheck, Menu } from "lucide-react";
import { notifications, systemDate } from "@/data/mockData";
import { StatusBadge } from "@/components/common/StatusBadge";

interface HeaderProps {
  title: string;
  subtitle: string;
  onOpenMobileNav: () => void;
}

export function Header({ title, subtitle, onOpenMobileNav }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // If user is currently on the alerts page, clear the unread notification badge
  useEffect(() => {
    if (pathname === "/alerts") {
      setHasUnread(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const handleToggle = () => {
    setOpen((prev) => {
      const next = !prev;
      if (next) {
        // Viewing the notifications clears the unread dot indicator
        setHasUnread(false);
      }
      return next;
    });
  };

  const handleMarkAllRead = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setHasUnread(false);
  };

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
              onClick={handleToggle}
              aria-label="Notifications"
              className="relative rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              <Bell size={17} />
              {hasUnread && (
                <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-critical ring-2 ring-background animate-pulse" />
              )}
            </button>

            {open && (
              <div className="panel absolute right-0 top-12 z-40 w-[min(22rem,calc(100vw-2rem))] p-3 shadow-2xl">
                <div className="flex items-center justify-between px-1 pb-2 border-b border-border mb-1">
                  <div className="flex items-center gap-2">
                    <p className="label-caps text-muted-foreground/80">
                      Notifications
                    </p>
                    {hasUnread ? (
                      <span className="label-caps text-[9px] rounded-full bg-critical/15 text-critical px-1.5 py-0.5 ring-1 ring-critical/30">
                        New
                      </span>
                    ) : (
                      <span className="label-caps text-[9px] text-muted-foreground/60">
                        All read
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2.5">
                    {hasUnread && (
                      <button
                        type="button"
                        onClick={handleMarkAllRead}
                        className="label-caps text-[10px] text-muted-foreground hover:text-foreground flex items-center gap-1"
                      >
                        <CheckCheck size={11} />
                        <span>Read</span>
                      </button>
                    )}
                    <Link
                      to="/alerts"
                      onClick={() => {
                        setHasUnread(false);
                        setOpen(false);
                      }}
                      className="label-caps text-primary hover:underline text-[10px]"
                    >
                      View All
                    </Link>
                  </div>
                </div>

                <ul className="divide-y divide-border">
                  {notifications.map((n) => (
                    <li key={n.id} className="py-2.5 hover:bg-background/40 px-1 rounded-md transition-colors">
                      <Link
                        to="/alerts"
                        onClick={() => {
                          setHasUnread(false);
                          setOpen(false);
                        }}
                        className="block group"
                      >
                        <div className="flex items-center gap-2">
                          <StatusBadge severity={n.severity}>{n.label}</StatusBadge>
                          <span className="truncate text-sm text-foreground group-hover:text-primary transition-colors">{n.node}</span>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">{n.description}</p>
                        <p className="label-caps mt-1 text-muted-foreground/60">{n.timeAgo}</p>
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="pt-2.5 mt-1 border-t border-border text-center">
                  <Link
                    to="/alerts"
                    onClick={() => {
                      setHasUnread(false);
                      setOpen(false);
                    }}
                    className="block w-full text-center text-xs py-1.5 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium"
                  >
                    Open Alert Center
                  </Link>
                </div>
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
