import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, MapPin, HardHat, CalendarDays, ClipboardCheck, Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MC&O Cleaning Operations" },
      {
        name: "description",
        content:
          "Manage customers, locations, employees, cleaning schedules and daily operations in one place.",
      },
      { property: "og:title", content: "MC&O Cleaning Operations" },
      {
        property: "og:description",
        content:
          "Manage customers, locations, employees, cleaning schedules and daily operations in one place.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Welcome,
});

const features = [
  {
    icon: Users,
    title: "Customers",
    text: "Keep contracted clients and their service accounts organised.",
  },
  {
    icon: MapPin,
    title: "Locations",
    text: "Track cleaning sites, visit frequencies and access details.",
  },
  { icon: HardHat, title: "Employees", text: "Manage field teams, leads and support staff." },
  {
    icon: CalendarDays,
    title: "Scheduling",
    text: "Plan the weekly cleaning roster across every site.",
  },
  {
    icon: ClipboardCheck,
    title: "Attendance",
    text: "Monitor clock-ins, punctuality and absences.",
  },
  {
    icon: Banknote,
    title: "Financial overview",
    text: "See revenue, invoices and outstanding balances.",
  },
];

function Welcome() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="flex size-7 items-center justify-center rounded-md bg-primary text-[11px] font-bold text-primary-foreground"
            >
              MC
            </span>
            <span className="text-[13px] font-semibold">MC&amp;O Cleaning Operations</span>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/dashboard">Dashboard</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              MC&amp;O Cleaning Operations
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Your cleaning operations, under control.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              One platform to help cleaning businesses manage customers, locations, employees,
              cleaning schedules and daily operations.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link to="/dashboard">Open Operations Dashboard</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#features">Explore Features</a>
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="scroll-mt-4 border-t border-border bg-card/50">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="text-xl font-semibold tracking-tight">
              Everything your operation runs on
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Core tools for running day-to-day cleaning work, from the office to the field.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => (
                <Card key={f.title}>
                  <CardContent className="pt-5">
                    <span className="flex size-9 items-center justify-center rounded-md border border-border bg-secondary">
                      <f.icon className="size-4 text-muted-foreground" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 text-[15px] font-semibold">{f.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{f.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <span>© {new Date().getFullYear()} MC&amp;O Cleaning Ltd. All rights reserved.</span>
          <span>Prototype · Fictional data</span>
        </div>
      </footer>
    </div>
  );
}
