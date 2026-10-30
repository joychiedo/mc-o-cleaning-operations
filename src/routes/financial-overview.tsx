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
import { cn } from "@/lib/utils";
import {
  monthlyRevenue,
  revenueByServiceLine,
  invoices,
  naira,
  customerById,
} from "@/data/mock";

export const Route = createFileRoute("/financial-overview")({
  head: () => ({
    meta: [
      { title: "Financial Overview · MC&O Cleaning Operations" },
      { name: "description", content: "Monthly revenue, service line mix and invoice status." },
      { property: "og:title", content: "Financial Overview · MC&O Cleaning Operations" },
      { property: "og:description", content: "Monthly revenue, service line mix and invoice status." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: FinancialPage,
});

const invoiceVariant: Record<string, "success" | "accent" | "destructive" | "neutral"> = {
  Paid: "success",
  Sent: "accent",
  Overdue: "destructive",
  Draft: "neutral",
};

function FinancialPage() {
  const outstanding = invoices
    .filter((i) => i.status === "Sent" || i.status === "Overdue")
    .reduce((sum, i) => sum + i.amount, 0);
  const overdue = invoices.filter((i) => i.status === "Overdue").reduce((sum, i) => sum + i.amount, 0);
  const collected = invoices.filter((i) => i.status === "Paid").reduce((sum, i) => sum + i.amount, 0);
  const maxRevenue = Math.max(...monthlyRevenue.map((m) => m.revenue));
  const thisMonth = monthlyRevenue[monthlyRevenue.length - 1]!;
  const lastMonth = monthlyRevenue[monthlyRevenue.length - 2]!;
  const growth = Math.round(((thisMonth.revenue - lastMonth.revenue) / lastMonth.revenue) * 100);

  return (
    <>
      <PageHeader
        title="Financial Overview"
        description="Revenue trend, service line mix and invoice status for October 2026."
        actions={
          <>
            <Button variant="outline" size="sm">
              Download ledger
            </Button>
            <Button size="sm">Record a payment</Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi label="Revenue — October" value={naira(thisMonth.revenue)} note={`+${growth}% vs September`} />
        <Kpi label="Operating costs — October" value={naira(thisMonth.costs)} note="Payroll, supplies, transport" />
        <Kpi label="Outstanding invoices" value={naira(outstanding)} note={`${invoices.filter((i) => i.status === "Sent" || i.status === "Overdue").length} invoices open`} />
        <Kpi label="Overdue" value={naira(overdue)} note="Follow-up started with both clients" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue vs costs — last 6 months</CardTitle>
            <CardDescription>Figures in ₦, based on invoiced contracts.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-56 items-end gap-4 sm:gap-6" role="img" aria-label="Bar chart of monthly revenue and costs, May to October 2026">
              {monthlyRevenue.map((m) => (
                <div key={m.month} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex h-44 w-full items-end justify-center gap-1.5">
                    <div
                      className="w-1/3 rounded-t-sm bg-primary"
                      style={{ height: `${(m.revenue / maxRevenue) * 100}%` }}
                      title={`Revenue ${naira(m.revenue)}`}
                    />
                    <div
                      className="w-1/3 rounded-t-sm bg-muted-foreground/30"
                      style={{ height: `${(m.costs / maxRevenue) * 100}%` }}
                      title={`Costs ${naira(m.costs)}`}
                    />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">{m.month}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span aria-hidden="true" className="size-2.5 rounded-sm bg-primary" /> Revenue
              </span>
              <span className="flex items-center gap-1.5">
                <span aria-hidden="true" className="size-2.5 rounded-sm bg-muted-foreground/30" /> Costs
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue by service line</CardTitle>
            <CardDescription>Share of October invoiced value.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {revenueByServiceLine.map((row) => (
              <div key={row.line}>
                <div className="mb-1 flex items-baseline justify-between text-[13px]">
                  <span className="text-foreground">{row.line}</span>
                  <span className="font-semibold text-foreground">{row.share}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary/80" style={{ width: `${row.share}%` }} />
                </div>
              </div>
            ))}
            <p className="mt-2 border-t border-border pt-3 text-xs text-muted-foreground">
              Collected this month: <span className="font-semibold text-foreground">{naira(collected)}</span>
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Invoices — October 2026</CardTitle>
          <CardDescription>Monthly invoices per contracted customer.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden md:table-cell">Period</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="hidden lg:table-cell">Due</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell className="whitespace-nowrap font-medium text-foreground">{inv.id}</TableCell>
                  <TableCell className="max-w-[14rem] truncate text-muted-foreground">
                    {customerById(inv.customerId)?.name ?? "—"}
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground md:table-cell">{inv.period}</TableCell>
                  <TableCell className="font-medium">{naira(inv.amount)}</TableCell>
                  <TableCell className="hidden text-muted-foreground lg:table-cell">
                    {inv.dueDate === "—" ? "—" : format(new Date(inv.dueDate), "d MMM yyyy")}
                  </TableCell>
                  <TableCell>
                    <Badge variant={invoiceVariant[inv.status]}>{inv.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <p className="mt-3 text-xs text-muted-foreground">
        Prototype note: figures are fictional; no accounting integration is wired up in this concept build.
      </p>
    </>
  );
}

function Kpi({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <Card>
      <CardContent className="pt-5">
        <p className="text-[12px] font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="mt-2 text-xl font-semibold tracking-tight text-foreground">{value}</p>
        <p className={cn("mt-1 text-xs text-muted-foreground")}>{note}</p>
      </CardContent>
    </Card>
  );
}
