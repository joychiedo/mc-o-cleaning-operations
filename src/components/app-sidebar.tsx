import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  MapPin,
  HardHat,
  CalendarDays,
  ClipboardCheck,
  Banknote,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Customers", url: "/customers", icon: Users },
  { title: "Locations", url: "/locations", icon: MapPin },
  { title: "Employees", url: "/employees", icon: HardHat },
  { title: "Schedule", url: "/schedule", icon: CalendarDays },
  { title: "Attendance", url: "/attendance", icon: ClipboardCheck },
  { title: "Financial Overview", url: "/financial-overview", icon: Banknote },
  { title: "Settings", url: "/settings", icon: Settings },
] as const;

export function AppSidebar({
  collapsed,
  onNavigate,
  className,
}: {
  collapsed: boolean;
  onNavigate?: () => void;
  className?: string;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside
      aria-label="Main navigation"
      className={cn(
        "flex h-full w-full flex-col border-r border-sidebar-border bg-sidebar",
        className,
      )}
    >
      <div
        className={cn(
          "flex h-14 shrink-0 items-center gap-2.5 border-b border-sidebar-border px-4",
          collapsed && "justify-center px-0",
        )}
      >
        <span
          aria-hidden="true"
          className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary text-[11px] font-bold text-primary-foreground"
        >
          MC
        </span>
        {!collapsed && (
          <span className="min-w-0">
            <span className="block truncate text-[13px] font-semibold leading-tight text-sidebar-foreground">
              MC&amp;O Cleaning
            </span>
            <span className="block text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Operations
            </span>
          </span>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="flex flex-col gap-0.5">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.url);
            return (
              <li key={item.url}>
                <Link
                  to={item.url}
                  onClick={onNavigate}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] font-medium transition-colors",
                    collapsed && "justify-center px-0",
                    active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                  )}
                >
                  <item.icon className="size-4 shrink-0" aria-hidden="true" />
                  {!collapsed && <span className="truncate">{item.title}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div
        className={cn(
          "shrink-0 border-t border-sidebar-border p-3 text-[11px] leading-4 text-muted-foreground",
          collapsed && "text-center",
        )}
      >
        {collapsed ? (
          <span aria-hidden="true">v0.9</span>
        ) : (
          <>
            <span className="font-medium text-foreground">MC&amp;O Cleaning Ltd.</span>
            <br />
            Prototype · v0.9
          </>
        )}
      </div>
    </aside>
  );
}
