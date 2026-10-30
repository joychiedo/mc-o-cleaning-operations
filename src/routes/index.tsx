import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { Users, MapPin, HardHat, CalendarDays, CircleAlert, FileWarning } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PageHeader } from "@/components/page-header";
import { Avatar } from "@/components/ui/avatar";
import {
  customers,
  employees,
  locations,
  shiftsForDate,
  upcomingDays,
  recentActivity,
  naira,
  locationById,
  employeeName,
  customerById,
} from "@/data/mock";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard · MC&O Cleaning Operations" },
      { name: "description", content: "Daily operational snapshot: today's shifts, upcoming assignments, attendance and activity." },
      { property: "og:title", content: "Dashboard · MC&O Cleaning Operations" },
      { property: "og:description", content: "Daily operational snapshot: today's shifts, upcoming assignments, attendance and activity." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function shiftDisplayStatus(start: string): "Completed" | "In progress" | "Scheduled" {
  if (start <= "08:00") return "Completed";
  if (start <= "10:00") return "In progress";
  return "Scheduled";
}

function Index() {
  const today = new Date();
  const todayShifts = shiftsForDate(today);
  const upcoming = upcomingDays(3).slice(1).flatMap((d) => shiftsForDate(d).map((s) => ({ ...s, day: d })));
  const activeCustomers = customers.filter((c) => c.status === "Active").length;
  const activeEmployees = employees.filter((e) => e.status === "Active").length;

  const metrics = [
    { label: "Active customers", value: `${activeCustomers}`, detail: `of ${customers.length} contracted`, icon: Users },
    { label: "Active employees", value: `${activeEmployees}`, detail: `1 on leave · ${employees.length} total`, icon: HardHat },
    { label: "Cleaning locations", value: `${locations.length}`, detail: "across 5 service areas", icon: MapPin },
    { label: "Shifts today", value: `${todayShifts.length}`, detail: format(today, "EEEE, d MMMM"), icon: CalendarDays },
  ];

  return (
    <>
      <PageHeader
        title="Dashboard"
        description={`Operational snapshot for ${format(today, "EEEE, d MMMM yyyy")}.`}
        actions={
          <>
            <Button variant="outline" size="sm">
              Export daily summary
            </Button>
            <Button size="sm">Log a site issue</Button>
          </>
        }
      />

      {/* Summary metrics */}
      <section aria-label="Summary metrics" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((m) => (
          <Card key={m.label}>
            <CardContent className="flex items-start justify-between gap-3 pt-5">
              <div>
                <p className="text-[12px] font-medium uppercase tracking-wide text-muted-foreground">{m.label}</p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">{m.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{m.detail}</p>
              </div>
              <span className="flex size-9 items-center justify-center rounded-md border border-border bg-secondary">
                <m.icon className="size-4 text-muted-foreground" aria-hidden="true" />
              </span>
            </CardContent>
          </Card>
        ))}
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Today's schedule */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-start justify-between">
            <div>
              <CardTitle>Today's schedule</CardTitle>
              <CardDescription>{todayShifts.length} shifts planned across 3 field teams.</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/schedule">Open full schedule</Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Location</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead className="hidden xl:table-cell">Crew</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {todayShifts.map((s) => {
                  const loc = locationById(s.locationId)!;
                  return (
                    <TableRow key={s.id}>
                      <TableCell className="max-w-[16rem]">
                        <span className="block truncate font-medium text-foreground">{loc.name}</span>
                        <span className="block truncate text-xs text-muted-foreground">
                          {customerById(loc.customerId)?.name}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Team {s.team}</Badge>
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-muted-foreground">
                        {s.start} – {s.end}
                      </TableCell>
                      <TableCell className="hidden xl:table-cell">
                        <div className="flex items-center -space-x-1.5">
                          {s.employeeIds.map((id) => (
                            <Avatar key={id} name={employeeName(id)} className="ring-2 ring-card" />
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={shiftDisplayStatus(s.start)} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Operational overview */}
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Operational overview</CardTitle>
              <CardDescription>Week to date, ending {format(today, "d MMM")}.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {[
                { label: "Shifts completed this week", value: "38 of 41", note: "3 postponed by clients" },
                { label: "Attendance rate", value: "94%", note: "2 late arrivals, 1 missed shift" },
                { label: "Quality inspections passed", value: "11 of 12", note: "1 glass-detail recheck pending" },
                { label: "Outstanding invoices", value: naira(1_350_000), note: "2 invoices awaiting payment" },
              ].map((row) => (
                <div key={row.label} className="flex items-baseline justify-between gap-3 border-b border-border pb-3 last:border-0 last:pb-0">
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium text-foreground">{row.label}</p>
                    <p className="text-xs text-muted-foreground">{row.note}</p>
                  </div>
                  <p className="shrink-0 text-[13px] font-semibold text-foreground">{row.value}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Attention needed</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2.5">
              <AttentionRow icon={CircleAlert} tone="warning" text="Relief cleaner requested for Lekki Medical Centre, tonight." />
              <AttentionRow icon={FileWarning} tone="destructive" text="2 overdue invoices: Lekki Medical Centre and Ironwood Fitness." />
              <AttentionRow icon={CircleAlert} tone="warning" text="Soap dispenser reported broken at Ironwood Fitness Gym." />
              <Button variant="outline" size="sm" className="mt-1 w-full">
                Review all 6 open items
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Upcoming assignments */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming cleaning assignments</CardTitle>
            <CardDescription>Next two working days across all locations.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col divide-y divide-border p-0 px-0">
            {upcoming.slice(0, 8).map((s) => {
              const loc = locationById(s.locationId)!;
              return (
                <div key={s.id} className="flex items-center gap-3 px-5 py-2.5">
                  <div className="w-16 shrink-0 text-xs font-medium text-muted-foreground">
                    {format(s.day, "EEE d")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-medium text-foreground">{loc.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {s.start} – {s.end} · Team {s.team} · {s.employeeIds.length} staff
                    </p>
                  </div>
                  <Badge variant="neutral">{loc.frequency}</Badge>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Recent activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
            <CardDescription>Latest updates from supervisors and team leads.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col divide-y divide-border p-0">
            {recentActivity.slice(0, 6).map((item, i) => (
              <div key={i} className="flex gap-3 px-5 py-3">
                <Avatar name={item.actor} className="mt-0.5 size-7" />
                <div className="min-w-0 text-[13px] leading-snug">
                  <p className="text-foreground">
                    <span className="font-medium">{item.actor}</span> {item.action}{" "}
                    <span className="font-medium">{item.target}</span>
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function StatusBadge({ status }: { status: string }) {
  const variant =
    status === "Completed" ? "success" : status === "In progress" ? "accent" : ("outline" as const);
  return <Badge variant={variant}>{status}</Badge>;
}

function AttentionRow({
  icon: Icon,
  tone,
  text,
}: {
  icon: typeof CircleAlert;
  tone: "warning" | "destructive";
  text: string;
}) {
  return (
    <div className="flex items-start gap-2.5 text-[13px] leading-snug">
      <Icon
        aria-hidden="true"
        className={`mt-0.5 size-4 shrink-0 ${tone === "destructive" ? "text-destructive" : "text-warning"}`}
      />
      <p className="text-foreground">{text}</p>
    </div>
  );
}
