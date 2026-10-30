import { useRouterState } from "@tanstack/react-router";
import { Menu, Search, Bell, ChevronsLeft, LogOut, UserRound, CircleHelp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown";
import { recentActivity } from "@/data/mock";

export const pageTitles: Record<string, { title: string; description: string }> = {
  "/dashboard": {
    title: "Dashboard",
    description: "Operational snapshot for today and the rest of the week.",
  },
  "/customers": {
    title: "Customers",
    description: "Contracted clients and their service accounts.",
  },
  "/locations": {
    title: "Locations",
    description: "Cleaning sites, frequencies and access details.",
  },
  "/employees": { title: "Employees", description: "Field teams, leads and support roles." },
  "/schedule": { title: "Schedule", description: "Weekly cleaning roster across all locations." },
  "/attendance": {
    title: "Attendance",
    description: "Clock-ins, punctuality and absence records.",
  },
  "/financial-overview": {
    title: "Financial Overview",
    description: "Revenue, invoices and outstanding balances.",
  },
  "/settings": { title: "Settings", description: "Workspace preferences for this prototype." },
};

export function AppTopbar({
  sidebarCollapsed,
  onToggleCollapse,
  onOpenMobileNav,
}: {
  sidebarCollapsed: boolean;
  onToggleCollapse: () => void;
  onOpenMobileNav: () => void;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const page = pageTitles[pathname] ?? { title: "MC&O Cleaning Operations", description: "" };

  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 border-b border-border bg-card/95 px-3 sm:px-5">
      <Button
        variant="ghost"
        size="icon-sm"
        className="lg:hidden"
        aria-label="Open navigation menu"
        onClick={onOpenMobileNav}
      >
        <Menu aria-hidden="true" />
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        className="hidden lg:inline-flex"
        aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        onClick={onToggleCollapse}
      >
        <ChevronsLeft aria-hidden="true" className={sidebarCollapsed ? "rotate-180" : undefined} />
      </Button>

      <div className="min-w-0 flex-1">
        <h1 className="truncate text-[15px] font-semibold leading-tight text-foreground">
          {page.title}
        </h1>
        <p className="hidden truncate text-xs text-muted-foreground sm:block">{page.description}</p>
      </div>

      <div className="relative hidden w-64 md:block xl:w-72">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          type="search"
          placeholder="Search customers, sites, staff…"
          aria-label="Search customers, sites and staff"
          className="h-9 pl-8"
        />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-sm" aria-label="Notifications">
            <Bell aria-hidden="true" />
            <span className="sr-only">Notifications</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {recentActivity.slice(0, 4).map((item, i) => (
            <DropdownMenuItem key={i} className="flex-col items-start gap-0.5">
              <span className="text-[13px] font-medium text-foreground">
                {item.actor} —{" "}
                {item.action.replace(/^Completed |^Submitted the site checklist for /, "")}
              </span>
              <span className="text-xs text-muted-foreground">
                {item.time} · {item.target}
              </span>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <a href="#" className="justify-center text-primary">
              View all activity
            </a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2 px-2" aria-label="Account menu">
            <span
              aria-hidden="true"
              className="flex size-6 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground"
            >
              RO
            </span>
            <span className="hidden sm:inline">Rita Okon</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Signed in as</DropdownMenuLabel>
          <DropdownMenuItem className="flex-col items-start gap-0">
            <span className="font-medium text-foreground">Rita Okon</span>
            <span className="text-xs text-muted-foreground">Operations Supervisor (demo)</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <UserRound aria-hidden="true" /> Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CircleHelp aria-hidden="true" /> Help &amp; guides
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled>
            <LogOut aria-hidden="true" /> Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
