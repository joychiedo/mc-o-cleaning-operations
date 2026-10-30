import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { format } from "date-fns";
import { Search, Plus } from "lucide-react";
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
import { customers, locations, naira, formatMoney } from "@/data/mock";

export const Route = createFileRoute("/customers")({
  head: () => ({
    meta: [
      { title: "Customers · MC&O Cleaning Operations" },
      { name: "description", content: "Contracted clients, service accounts and monthly contract values." },
      { property: "og:title", content: "Customers · MC&O Cleaning Operations" },
      { property: "og:description", content: "Contracted clients, service accounts and monthly contract values." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CustomersPage,
});

function CustomersPage() {
  const [query, setQuery] = useState("");
  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.contactName.toLowerCase().includes(query.toLowerCase()),
  );
  const siteCount = (customerId: string) => locations.filter((l) => l.customerId === customerId).length;
  const totalMonthly = customers.reduce((sum, c) => sum + c.monthlyValue, 0);

  return (
    <>
      <PageHeader
        title="Customers"
        description="Contracted clients and their service accounts. 12 accounts on file."
        actions={
          <>
            <Button variant="outline" size="sm">
              Export list
            </Button>
            <Button size="sm">
              <Plus aria-hidden="true" /> New customer
            </Button>
          </>
        }
      />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by customer or contact…"
            aria-label="Filter customers"
            className="pl-8"
          />
        </div>
        <p className="text-[13px] text-muted-foreground">
          Combined contract value: <span className="font-semibold text-foreground">{formatMoney(totalMonthly)}</span> / month
        </p>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact person</TableHead>
                <TableHead className="hidden md:table-cell">Phone</TableHead>
                <TableHead>Sites</TableHead>
                <TableHead>Monthly value</TableHead>
                <TableHead className="hidden lg:table-cell">Customer since</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="max-w-[16rem]">
                    <span className="block truncate font-medium text-foreground">{c.name}</span>
                    <span className="block truncate text-xs text-muted-foreground">{c.email}</span>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">{c.contactName}</TableCell>
                  <TableCell className="hidden whitespace-nowrap text-muted-foreground md:table-cell">
                    {c.phone}
                  </TableCell>
                  <TableCell>{siteCount(c.id)}</TableCell>
                  <TableCell className="font-medium">{naira(c.monthlyValue)}</TableCell>
                  <TableCell className="hidden whitespace-nowrap text-muted-foreground lg:table-cell">
                    {format(new Date(c.since), "MMM yyyy")}
                  </TableCell>
                  <TableCell>
                    <Badge variant={c.status === "Active" ? "success" : "warning"}>{c.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="py-10 text-center text-muted-foreground">
                    No customers match “{query}”.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <p className="mt-3 text-xs text-muted-foreground">
        Prototype note: records are fictional and read-only in this concept build.
      </p>
    </>
  );
}
