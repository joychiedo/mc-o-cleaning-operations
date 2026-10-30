import { createFileRoute } from "@tanstack/react-router";
import { format } from "date-fns";
import { CalendarDays, Clock, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { cn } from "@/lib/utils";
import {
  currentWeekDays,
  shiftsForDate,
  upcomingDays,
  locationById,
  customerById,
  employeeName,
} from "@/data/mock";

export const Route = createFileRoute("/schedule")({
  head: () => ({
    meta: [
      { title: "Schedule · MC&O Cleaning Operations" },
      { name: "description", content: "Weekly cleaning roster across all locations and field teams." },
      { property: "og:title", content: "Schedule · MC&O Cleaning Operations" },
      { property: "og:description", content: "Weekly cleaning roster across all locations and field teams." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SchedulePage,
});

function SchedulePage() {
  const week = currentWeekDays();
  const todayIso = format(new Date(), "yyyy-MM-dd");
  const weekShifts = week.flatMap((d) => shiftsForDate(d));
  const tomorrow = upcomingDays(2)[1];

  return (
    <>
      <PageHeader
        title="Schedule"
        description="Weekly roster for all 15 locations. Teams A, B and C rotate across fixed service windows."
        actions={
          <>
            <Button variant="outline" size="sm">
              Print week
            </Button>
            <Button size="sm">Create shift</Button>
          </>
        }
      />

      <div className="mb-4 flex flex-wrap gap-2" aria-label="Week summary">
        <Badge variant="neutral">
          <CalendarDays aria-hidden="true" className="size-3" /> {weekShifts.length} shifts this week
        </Badge>
        <Badge variant="neutral">
          <Users aria-hidden="true" className="size-3" /> 3 field teams
        </Badge>
        <Badge variant="neutral">
          <Clock aria-hidden="true" className="size-3" /> Next shift: {format(tomorrow, "EEE d MMM")}
        </Badge>
      </div>

      {/* Week grid */}
      <div className="overflow-x-auto pb-2">
        <div className="grid min-w-[54rem] grid-cols-7 gap-3">
          {week.map((day) => {
            const iso = format(day, "yyyy-MM-dd");
            const shifts = shiftsForDate(day);
            const isToday = iso === todayIso;
            const isWeekend = [0, 6].includes(day.getDay());
            return (
              <Card
                key={iso}
                className={cn("flex min-h-[22rem] flex-col", isToday && "border-primary")}
                aria-label={isToday ? `${format(day, "EEEE d MMMM")}, today` : format(day, "EEEE d MMMM")}
              >
                <CardHeader className="px-3 pb-2 pt-3">
                  <div className="flex items-baseline justify-between">
                    <CardTitle className={cn("text-[13px]", isToday && "text-primary")}>
                      {format(day, "EEEE")}
                    </CardTitle>
                    <span className="text-xs text-muted-foreground">{format(day, "d MMM")}</span>
                  </div>
                  <CardDescription>
                    {isToday ? "Today" : isWeekend ? "Reduced service" : `${shifts.length} shifts`}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col gap-1.5 px-3 pb-3">
                  {shifts.length === 0 && (
                    <p className="rounded-md border border-dashed border-border px-2 py-3 text-center text-xs text-muted-foreground">
                      No shifts planned
                    </p>
                  )}
                  {shifts.map((s) => {
                    const loc = locationById(s.locationId)!;
                    return (
                      <div
                        key={s.id}
                        className="rounded-md border border-border bg-secondary/60 px-2 py-1.5 text-[11px] leading-tight"
                      >
                        <p className="truncate font-semibold text-foreground">{s.start}</p>
                        <p className="truncate text-foreground/90">{loc.name}</p>
                        <p className="truncate text-muted-foreground">
                          Team {s.team} · {s.employeeIds.length} staff
                        </p>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Day detail for today */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Today in detail — {format(new Date(), "EEEE, d MMMM yyyy")}</CardTitle>
          <CardDescription>Full crew assignments for each shift.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2.5 md:grid-cols-2">
          {shiftsForDate(new Date()).map((s) => {
            const loc = locationById(s.locationId)!;
            return (
              <div key={s.id} className="rounded-md border border-border p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[13px] font-semibold text-foreground">{loc.name}</p>
                  <Badge variant="outline">Team {s.team}</Badge>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {s.start} – {s.end} · {customerById(loc.customerId)?.name}
                </p>
                <p className="mt-2 text-[13px] text-muted-foreground">
                  Crew: {s.employeeIds.map(employeeName).join(", ")}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">Access: {loc.accessNotes}</p>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </>
  );
}
