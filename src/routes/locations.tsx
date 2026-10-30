import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { customers, locations, customerById } from "@/data/mock";

export const Route = createFileRoute("/locations")({
  head: () => ({
    meta: [
      { title: "Locations · MC&O Cleaning Operations" },
      { name: "description", content: "Cleaning sites, service frequencies, floor areas and access details." },
      { property: "og:title", content: "Locations · MC&O Cleaning Operations" },
      { property: "og:description", content: "Cleaning sites, service frequencies, floor areas and access details." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LocationsPage,
});

const areas = ["All areas", "Victoria Island", "Ikoyi", "Lekki", "Yaba", "Ikeja"] as const;

function LocationsPage() {
  const [query, setQuery] = useState("");
  const [area, setArea] = useState<(typeof areas)[number]>("All areas");

  const filtered = locations.filter((l) => {
    const matchesArea = area === "All areas" || l.area === area;
    const matchesQuery =
      l.name.toLowerCase().includes(query.toLowerCase()) ||
      (customerById(l.customerId)?.name.toLowerCase().includes(query.toLowerCase()) ?? false);
    return matchesArea && matchesQuery;
  });

  return (
    <>
      <PageHeader
        title="Locations"
        description="15 cleaning sites with service frequency, floor area and access notes."
        actions={
          <Button size="sm" variant="outline">
            Add location
          </Button>
        }
      />

      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by service area">
          {areas.map((a) => (
            <button
              key={a}
              onClick={() => setArea(a)}
              aria-pressed={area === a}
              className={cn(
                "rounded-md border px-2.5 py-1 text-[13px] font-medium transition-colors",
                area === a
                  ? "border-primary bg-accent text-accent-foreground"
                  : "border-border bg-card text-muted-foreground hover:bg-accent/60",
              )}
            >
              {a}
            </button>
          ))}
        </div>
        <div className="relative w-full lg:max-w-xs">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by site or customer…"
            aria-label="Filter locations"
            className="pl-8"
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Site</TableHead>
                <TableHead className="hidden md:table-cell">Customer</TableHead>
                <TableHead className="hidden xl:table-cell">Address</TableHead>
                <TableHead>Area</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead className="hidden lg:table-cell">Floor area</TableHead>
                <TableHead>Team</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((l) => (
                <TableRow key={l.id}>
                  <TableCell className="max-w-[14rem]">
                    <span className="block truncate font-medium text-foreground">{l.name}</span>
                    <span className="block truncate text-xs text-muted-foreground">{l.accessNotes}</span>
                  </TableCell>
                  <TableCell className="hidden max-w-[12rem] md:table-cell">
                    <span className="block truncate text-muted-foreground">{customerById(l.customerId)?.name}</span>
                  </TableCell>
                  <TableCell className="hidden max-w-[14rem] truncate text-muted-foreground xl:table-cell">
                    {l.address}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">{l.area}</TableCell>
                  <TableCell>
                    <Badge variant="accent">{l.frequency}</Badge>
                  </TableCell>
                  <TableCell className="hidden whitespace-nowrap text-muted-foreground lg:table-cell">
                    {l.areaSqm.toLocaleString("en-NG")} m²
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">Team {l.defaultTeam}</Badge>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="py-10 text-center text-muted-foreground">
                    No locations match the current filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
