import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { format } from "date-fns";
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
import { cn } from "@/lib/utils";
import {
  employees,
  weeklyAttendanceSummary,
  attendanceForDate,
  currentWeekDays,
} from "@/data/mock";

export const Route = createFileRoute("/attendance")({
  head: () => ({
    meta: [
      { title: "Attendance · MC&O Cleaning Operations" },
      { name: "description", content: "Clock-ins, punctuality and absence records for field teams." },
      { property: "og:title", content: "Attendance · MC&O Cleaning Operations" },
      { property: "og:description", content: "Clock-ins, punctuality and absence records for field teams." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AttendancePage,
});

const statusVariant: Record<string, "success" | "accent" | "warning" | "destructive" | "neutral"> = {
  "On time": "success",
  "In progress": "accent",
  Late: "warning",
  Absent: "destructive",
  Leave: "neutral",
  "Off duty": "neutral",
};

function AttendancePage() {
  const today = new Date();
  const [view, setView] = useState<"today" | "week">("today");
  const records = attendanceForDate(today);
  const onTime = records.filter((r) => r.status === "On time").length;
  const late = records.filter((r) => r.status === "Late").length;
  const leave = records.filter((r) => r.status === "Leave").length;
  const week = currentWeekDays();

  return (
    <>
      <PageHeader
        title="Attendance"
        description="Clock-in records and weekly punctuality summary for all field staff."
        actions={
          <>
            <Button variant="outline" size="sm">
              Export register
            </Button>
            <Button size="sm">Correct a record</Button>
          </>
        }
      />

      <div className="mb-4 grid gap-4 sm:grid-cols-3">
        <Kpi label="On time today" value={`${onTime}`} note="clocked in at shift start" />
        <Kpi label="Late arrivals" value={`${late}`} note="17 min average delay" />
        <Kpi label="On approved leave" value={`${leave}`} note="Ngozi Iwu, 5–9 Nov" />
      </div>

      <div className="mb-4 flex gap-1.5" role="group" aria-label="Attendance view">
        {(
          [
            { key: "today", label: `Today · ${format(today, "EEE d MMM")}` },
            { key: "week", label: "Week summary" },
          ] as const
        ).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setView(tab.key)}
            aria-pressed={view === tab.key}
            className={cn(
              "rounded-md border px-3 py-1.5 text-[13px] font-medium transition-colors",
              view === tab.key
                ? "border-primary bg-accent text-accent-foreground"
                : "border-border bg-card text-muted-foreground hover:bg-accent/60",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {view === "today" ? (
        <Card>
          <CardHeader>
            <CardTitle>Clock-in register — {format(today, "EEEE, d MMMM yyyy")}</CardTitle>
            <CardDescription>
              Staff rostered today plus supervisors. Times are shift-based in this prototype.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Clock in</TableHead>
                  <TableHead>Clock out</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.map((r) => {
                  const emp = employees.find((e) => e.id === r.employeeId)!;
                  return (
                    <TableRow key={r.employeeId}>
                      <TableCell>
                        <div className="flex items-center gap-2.5">
                          <Avatar name={emp.name} />
                          <div className="min-w-0">
                            <span className="block truncate font-medium text-foreground">{emp.name}</span>
                            <span className="block truncate text-xs text-muted-foreground">
                              {emp.role}
                              {emp.team !== "—" ? ` · Team ${emp.team}` : ""}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{r.clockIn ?? "—"}</TableCell>
                      <TableCell className="text-muted-foreground">{r.clockOut ?? "In shift"}</TableCell>
                      <TableCell>
                        <Badge variant={statusVariant[r.status]}>{r.status}</Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Week summary — {format(week[0] ?? today, "d MMM")} to {format(week[6] ?? today, "d MMM yyyy")}</CardTitle>
            <CardDescription>Days present, late arrivals and missed shifts per employee.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Days present</TableHead>
                  <TableHead>Late</TableHead>
                  <TableHead>Missed</TableHead>
                  <TableHead>Reliability</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {weeklyAttendanceSummary.map((s) => {
                  const emp = employees.find((e) => e.id === s.employeeId)!;
                  const reliability =
                    s.daysPresent === 0 ? 0 : Math.round(((s.daysPresent - s.late * 0.25) / 5) * 100);
                  return (
                    <TableRow key={s.employeeId}>
                      <TableCell>
                        <div className="flex items-center gap-2.5">
                          <Avatar name={emp.name} />
                          <span className="font-medium text-foreground">{emp.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {emp.status === "On leave" ? "On leave" : `${s.daysPresent} of 5`}
                      </TableCell>
                      <TableCell>
                        {s.late > 0 ? <Badge variant="warning">{s.late}</Badge> : <span className="text-muted-foreground">0</span>}
                      </TableCell>
                      <TableCell>
                        {s.missed > 0 ? <Badge variant="destructive">{s.missed}</Badge> : <span className="text-muted-foreground">0</span>}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted">
                            <div
                              className={cn(
                                "h-full rounded-full",
                                reliability >= 90 ? "bg-success" : reliability >= 75 ? "bg-warning" : "bg-destructive",
                              )}
                              style={{ width: `${reliability}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">{reliability}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </>
  );
}

function Kpi({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <Card>
      <CardContent className="pt-5">
        <p className="text-[12px] font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">{value}</p>
        <p className="mt-1 text-xs text-muted-foreground">{note}</p>
      </CardContent>
    </Card>
  );
}
