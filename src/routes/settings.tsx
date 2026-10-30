import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings · MC&O Cleaning Operations" },
      { name: "description", content: "Workspace preferences for the MC&O Cleaning Operations prototype." },
      { property: "og:title", content: "Settings · MC&O Cleaning Operations" },
      { property: "og:description", content: "Workspace preferences for the MC&O Cleaning Operations prototype." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const [currency, setCurrency] = useState("NGN (₦)");
  const [weekStarts, setWeekStarts] = useState("Monday");
  const [notifications, setNotifications] = useState(true);
  const [lateAlerts, setLateAlerts] = useState(true);
  const [invoiceReminders, setInvoiceReminders] = useState(false);

  return (
    <>
      <PageHeader
        title="Settings"
        description="Workspace preferences for this prototype. Changes are illustrative and not persisted."
        actions={<Button size="sm">Save changes</Button>}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Company profile</CardTitle>
            <CardDescription>Details shown on reports and invoices.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="company-name">Company name</Label>
              <Input id="company-name" defaultValue="MC&O Cleaning Ltd." className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="company-email">Operations email</Label>
              <Input id="company-email" defaultValue="ops@mco-cleaning.example" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="company-phone">Phone</Label>
              <Input id="company-phone" defaultValue="+234 803 000 0000" className="mt-1.5" />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="company-address">Registered address</Label>
              <Input id="company-address" defaultValue="1 Service Yard Road, Lagos" className="mt-1.5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Operations preferences</CardTitle>
            <CardDescription>Defaults used across the schedule and attendance views.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div>
              <Label htmlFor="currency">Currency</Label>
              <select
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="mt-1.5 h-9 w-full rounded-md border border-input bg-card px-3 text-sm text-foreground"
              >
                <option>NGN (₦)</option>
                <option>USD ($)</option>
                <option>GBP (£)</option>
              </select>
            </div>
            <div>
              <Label htmlFor="week-starts">Week starts on</Label>
              <select
                id="week-starts"
                value={weekStarts}
                onChange={(e) => setWeekStarts(e.target.value)}
                className="mt-1.5 h-9 w-full rounded-md border border-input bg-card px-3 text-sm text-foreground"
              >
                <option>Monday</option>
                <option>Sunday</option>
              </select>
            </div>
            <div>
              <Label>Field teams</Label>
              <div className="mt-1.5 flex flex-wrap gap-2">
                <Badge variant="neutral">Team A — 4 staff</Badge>
                <Badge variant="neutral">Team B — 4 staff</Badge>
                <Badge variant="neutral">Team C — 5 staff</Badge>
                <Badge variant="neutral">Support — 2 staff</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>What supervisors are alerted about.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col divide-y divide-border">
            <ToggleRow
              title="Daily shift reminders"
              description="Send crews their roster each morning at 06:00."
              checked={notifications}
              onChange={setNotifications}
            />
            <ToggleRow
              title="Late clock-in alerts"
              description="Notify the supervisor when a clock-in is more than 10 minutes late."
              checked={lateAlerts}
              onChange={setLateAlerts}
            />
            <ToggleRow
              title="Invoice payment reminders"
              description="Remind customers 3 days before an invoice is due."
              checked={invoiceReminders}
              onChange={setInvoiceReminders}
            />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 border-dashed">
          <CardContent className="flex flex-col gap-2 py-5">
            <p className="text-[13px] font-semibold text-foreground">About this prototype</p>
            <p className="max-w-3xl text-[13px] text-muted-foreground">
              MC&amp;O Cleaning Operations is a portfolio concept demonstrating an operations platform for a
              cleaning company. All people, companies and figures are fictional. Authentication, payments,
              accounting integrations, GPS tracking and multi-tenant infrastructure are intentionally out of
              scope for this build.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function ToggleRow({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0">
      <div className="min-w-0">
        <p className="text-[13px] font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        aria-label={title}
        onClick={() => onChange(!checked)}
        className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
          checked ? "bg-primary" : "bg-muted-foreground/30"
        }`}
      >
        <span
          className={`absolute top-0.5 size-4 rounded-full bg-card shadow-sm transition-all ${
            checked ? "left-[1.125rem]" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}
