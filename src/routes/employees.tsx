import { createFileRoute } from "@tanstack/react-router";
import { format } from "date-fns";
import { Phone, Mail, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
import { employees, weeklyAttendanceSummary } from "@/data/mock";

export const Route = createFileRoute("/employees")({
  head: () => ({
    meta: [
      { title: "Employees · MC&O Cleaning Operations" },
      { name: "description", content: "Field teams, team leads and support roles with attendance summaries." },
      { property: "og:title", content: "Employees · MC&O Cleaning Operations" },
      { property: "og:description", content: "Field teams, team leads and support roles with attendance summaries." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: EmployeesPage,
});

function EmployeesPage() {
  const summaryFor = (id: string) => weeklyAttendanceSummary.find((s) => s.employeeId === id);
  const leads = employees.filter((e) => e.role === "Team Lead").length;

  return (
    <>
      <PageHeader
        title="Employees"
        description={`${employees.length} staff across 3 field teams, plus supervision and quality control.`}
        actions={
          <Button size="sm">
            <Plus aria-hidden="true" /> Add employee
          </Button>
        }
      />

      <div className="mb-4 flex flex-wrap gap-2" aria-label="Team summary">
        <Badge variant="neutral">3 field teams</Badge>
        <Badge variant="neutral">{leads} team leads</Badge>
        <Badge variant="neutral">1 supervisor · 1 quality checker</Badge>
        <Badge variant="warning">1 employee on leave</Badge>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Team</TableHead>
                <TableHead className="hidden lg:table-cell">Contact</TableHead>
                <TableHead className="hidden xl:table-cell">Joined</TableHead>
                <TableHead className="hidden md:table-cell">Week to date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((e) => {
                const summary = summaryFor(e.id);
                return (
                  <TableRow key={e.id}>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <Avatar name={e.name} />
                        <div className="min-w-0">
                          <span className="block truncate font-medium text-foreground">{e.name}</span>
                          <span className="block truncate text-xs text-muted-foreground">{e.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-muted-foreground">{e.role}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{e.team === "—" ? "Support" : `Team ${e.team}`}</Badge>
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground lg:table-cell">
                      <span className="flex items-center gap-1.5 whitespace-nowrap">
                        <Phone aria-hidden="true" className="size-3" /> {e.phone}
                      </span>
                    </TableCell>
                    <TableCell className="hidden whitespace-nowrap text-muted-foreground xl:table-cell">
                      {format(new Date(e.startedOn), "MMM yyyy")}
                    </TableCell>
                    <TableCell className="hidden text-xs text-muted-foreground md:table-cell">
                      {summary && e.status === "Active" ? (
                        <span>
                          {summary.daysPresent} days present
                          {summary.late > 0 && <span className="text-warning-foreground"> · {summary.late} late</span>}
                          {summary.missed > 0 && <span className="text-destructive"> · {summary.missed} missed</span>}
                        </span>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={e.status === "Active" ? "success" : "warning"}>{e.status}</Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Mail aria-hidden="true" className="size-3.5" />
        Email addresses are fictional example domains used for the prototype only.
      </p>
    </>
  );
}
