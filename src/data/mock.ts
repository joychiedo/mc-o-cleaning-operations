// Static prototype data for MC&O Cleaning Operations.
// All people, companies and addresses are fictional.

import { format, addDays, startOfWeek, getDay } from "date-fns";

export type EmployeeRole = "Team Lead" | "Cleaner" | "Supervisor" | "Quality Checker";
export type Employee = {
  id: string;
  name: string;
  role: EmployeeRole;
  team: "A" | "B" | "C" | "—";
  phone: string;
  email: string;
  status: "Active" | "On leave";
  startedOn: string; // ISO date
};

export type Customer = {
  id: string;
  name: string;
  contactName: string;
  email: string;
  phone: string;
  status: "Active" | "Paused";
  since: string;
  monthlyValue: number;
  notes: string;
};

export type LocationFrequency = "Daily" | "3× weekly" | "Weekly" | "Bi-weekly";

export type Location = {
  id: string;
  name: string;
  customerId: string;
  address: string;
  area: "Victoria Island" | "Ikoyi" | "Lekki" | "Yaba" | "Ikeja";
  frequency: LocationFrequency;
  areaSqm: number;
  defaultTeam: "A" | "B" | "C";
  accessNotes: string;
};

export type ShiftStatus = "Scheduled" | "In progress" | "Completed";
export type Shift = {
  id: string;
  date: string; // ISO date
  locationId: string;
  team: "A" | "B" | "C";
  employeeIds: string[];
  start: string; // "07:00"
  end: string;
  status: ShiftStatus;
};

export type AttendanceStatus = "On time" | "Late" | "In progress" | "Absent" | "Leave";
export type AttendanceRecord = {
  employeeId: string;
  date: string;
  clockIn: string | null;
  clockOut: string | null;
  status: AttendanceStatus;
};

export type InvoiceStatus = "Paid" | "Sent" | "Overdue" | "Draft";
export type Invoice = {
  id: string;
  customerId: string;
  period: string;
  amount: number;
  status: InvoiceStatus;
  dueDate: string;
};

// ------------------------------------------------------------------ employees

export const employees: Employee[] = [
  { id: "emp-01", name: "Chidi Okafor", role: "Team Lead", team: "A", phone: "+234 803 114 2290", email: "chidi.o@mco-cleaning.example", status: "Active", startedOn: "2022-03-14" },
  { id: "emp-02", name: "Amara Eze", role: "Cleaner", team: "A", phone: "+234 812 550 7781", email: "amara.e@mco-cleaning.example", status: "Active", startedOn: "2023-01-09" },
  { id: "emp-03", name: "Tunde Bakare", role: "Cleaner", team: "A", phone: "+234 806 322 4405", email: "tunde.b@mco-cleaning.example", status: "Active", startedOn: "2023-06-19" },
  { id: "emp-04", name: "Ngozi Iwu", role: "Cleaner", team: "A", phone: "+234 809 771 3342", email: "ngozi.i@mco-cleaning.example", status: "On leave", startedOn: "2024-02-05" },
  { id: "emp-05", name: "Funke Alabi", role: "Team Lead", team: "B", phone: "+234 802 996 1147", email: "funke.a@mco-cleaning.example", status: "Active", startedOn: "2021-11-02" },
  { id: "emp-06", name: "Segun Adeyemi", role: "Cleaner", team: "B", phone: "+234 815 208 6634", email: "segun.a@mco-cleaning.example", status: "Active", startedOn: "2023-04-17" },
  { id: "emp-07", name: "Halima Bello", role: "Cleaner", team: "B", phone: "+234 807 445 9920", email: "halima.b@mco-cleaning.example", status: "Active", startedOn: "2024-08-12" },
  { id: "emp-08", name: "Emeka Nwosu", role: "Cleaner", team: "B", phone: "+234 810 663 5507", email: "emeka.n@mco-cleaning.example", status: "Active", startedOn: "2022-09-26" },
  { id: "emp-09", name: "Ibrahim Musa", role: "Team Lead", team: "C", phone: "+234 804 231 8876", email: "ibrahim.m@mco-cleaning.example", status: "Active", startedOn: "2022-01-31" },
  { id: "emp-10", name: "Aisha Danladi", role: "Cleaner", team: "C", phone: "+234 813 902 4471", email: "aisha.d@mco-cleaning.example", status: "Active", startedOn: "2023-10-03" },
  { id: "emp-11", name: "Kelechi Umeh", role: "Cleaner", team: "C", phone: "+234 805 780 2216", email: "kelechi.u@mco-cleaning.example", status: "Active", startedOn: "2024-05-20" },
  { id: "emp-12", name: "Blessing Ojo", role: "Cleaner", team: "C", phone: "+234 811 356 7743", email: "blessing.o@mco-cleaning.example", status: "Active", startedOn: "2025-01-13" },
  { id: "emp-13", name: "Rita Okon", role: "Supervisor", team: "—", phone: "+234 803 647 5588", email: "rita.o@mco-cleaning.example", status: "Active", startedOn: "2021-07-12" },
  { id: "emp-14", name: "Musa Idris", role: "Cleaner", team: "C", phone: "+234 808 215 6630", email: "musa.i@mco-cleaning.example", status: "Active", startedOn: "2024-11-04" },
  { id: "emp-15", name: "Joy Ekanem", role: "Quality Checker", team: "—", phone: "+234 814 473 2098", email: "joy.e@mco-cleaning.example", status: "Active", startedOn: "2023-02-27" },
];

// ------------------------------------------------------------------ customers

export const customers: Customer[] = [
  { id: "cus-01", name: "Harborline Logistics", contactName: "Mrs. Adaeze Balogun", email: "facilities@harborline.example", phone: "+234 803 447 1200", status: "Active", since: "2022-04-01", monthlyValue: 480000, notes: "Warehouse and office block; night shift preferred." },
  { id: "cus-02", name: "Crestview Dental Clinic", contactName: "Dr. Femi Cole", email: "admin@crestviewdental.example", phone: "+234 809 220 8841", status: "Active", since: "2023-01-15", monthlyValue: 260000, notes: "Clinical waste bins handled separately." },
  { id: "cus-03", name: "Greenpark Academy", contactName: "Mr. Damilola Ade", email: "estates@greenpark.example", phone: "+234 802 551 9073", status: "Active", since: "2021-09-06", monthlyValue: 620000, notes: "Term-time deep clean each August." },
  { id: "cus-04", name: "Nova Plaza Management", contactName: "Ms. Ifeoma Nnadi", email: "ops@novaplaza.example", phone: "+234 807 880 3345", status: "Active", since: "2023-06-01", monthlyValue: 740000, notes: "Six-floor commercial plaza; loading dock access 05:30." },
  { id: "cus-05", name: "Ironwood Fitness", contactName: "Mr. Kelechi Duru", email: "manager@ironwood.example", phone: "+234 806 314 5590", status: "Active", since: "2024-02-20", monthlyValue: 310000, notes: "Gym floor and changing rooms daily." },
  { id: "cus-06", name: "Lekki Medical Centre", contactName: "Dr. Nneka Obi", email: "admin@lekkimedical.example", phone: "+234 810 447 2261", status: "Active", since: "2022-10-10", monthlyValue: 560000, notes: "Infection-control checklist signed daily." },
  { id: "cus-07", name: "Brightpath Children's Centre", contactName: "Mrs. Yemi Sanni", email: "office@brightpath.example", phone: "+234 805 990 7712", status: "Active", since: "2023-03-27", monthlyValue: 190000, notes: "Non-toxic products only." },
  { id: "cus-08", name: "Sterling Heights Residences", contactName: "Mr. Olumide Fash", email: "estate@sterlingheights.example", phone: "+234 808 663 4402", status: "Active", since: "2024-07-01", monthlyValue: 280000, notes: "Two towers, 48 units; service lift required." },
  { id: "cus-09", name: "Coastal Brew Coffee Roasters", contactName: "Ms. Zainab Idris", email: "hello@coastalbrew.example", phone: "+234 804 209 1187", status: "Paused", since: "2024-11-18", monthlyValue: 140000, notes: "Paused for renovation until further notice." },
  { id: "cus-10", name: "Meridian Insurance HQ", contactName: "Mr. Emeka Eze", email: "facilities@meridian.example", phone: "+234 803 771 6620", status: "Active", since: "2021-05-24", monthlyValue: 850000, notes: "Boardroom detail twice weekly." },
  { id: "cus-11", name: "Unity Mall Services", contactName: "Mrs. Halima Sule", email: "ops@unitymall.example", phone: "+234 802 118 7745", status: "Active", since: "2022-08-08", monthlyValue: 690000, notes: "Common areas before opening, 06:00–08:00." },
  { id: "cus-12", name: "Palmgrove Hotel & Suites", contactName: "Mr. Tobi Okun", email: "execoffice@palmgrove.example", phone: "+234 806 550 9930", status: "Active", since: "2023-09-04", monthlyValue: 520000, notes: "Public areas nightly; linen room restock." },
];

// ------------------------------------------------------------------ locations

export const locations: Location[] = [
  { id: "loc-01", name: "Harborline Warehouse", customerId: "cus-01", address: "Plot 14, Dockyard Road, Apapa", area: "Victoria Island", frequency: "3× weekly", areaSqm: 4200, defaultTeam: "A", accessNotes: "Gate 2; security log required." },
  { id: "loc-02", name: "Harborline Head Office", customerId: "cus-01", address: "7 Wharf Court, Apapa", area: "Victoria Island", frequency: "Weekly", areaSqm: 900, defaultTeam: "A", accessNotes: "Reception signs in before 08:00." },
  { id: "loc-03", name: "Crestview Dental Clinic", customerId: "cus-02", address: "22 Palmgrove Crescent, Gbagada", area: "Yaba", frequency: "Daily", areaSqm: 480, defaultTeam: "B", accessNotes: "After last appointment, 19:00." },
  { id: "loc-04", name: "Greenpark Academy – Main Block", customerId: "cus-03", address: "4 Meadow Lane, Anthony", area: "Ikeja", frequency: "Daily", areaSqm: 3100, defaultTeam: "C", accessNotes: "Staff gate; avoid exam halls during papers." },
  { id: "loc-05", name: "Greenpark Academy – Hostel Wing", customerId: "cus-03", address: "4 Meadow Lane, Anthony", area: "Ikeja", frequency: "3× weekly", areaSqm: 1500, defaultTeam: "C", accessNotes: "House master on duty." },
  { id: "loc-06", name: "Nova Plaza Tower 1", customerId: "cus-04", address: "18 Marina Heights, Ozumba Mbadiwe", area: "Victoria Island", frequency: "Daily", areaSqm: 5600, defaultTeam: "B", accessNotes: "Loading dock opens 05:30." },
  { id: "loc-07", name: "Nova Plaza Tower 2", customerId: "cus-04", address: "18 Marina Heights, Ozumba Mbadiwe", area: "Victoria Island", frequency: "Daily", areaSqm: 5100, defaultTeam: "B", accessNotes: "Loading dock opens 05:30." },
  { id: "loc-08", name: "Ironwood Fitness Gym", customerId: "cus-05", address: "33 Rivulet Street, Lekki Phase 1", area: "Lekki", frequency: "Daily", areaSqm: 1200, defaultTeam: "A", accessNotes: "Open before first class, 05:45." },
  { id: "loc-09", name: "Lekki Medical Centre", customerId: "cus-06", address: "9 Cedar Close, Lekki Phase 1", area: "Lekki", frequency: "Daily", areaSqm: 2000, defaultTeam: "C", accessNotes: "Checklist countersigned at nurse station." },
  { id: "loc-10", name: "Brightpath Children's Centre", customerId: "cus-07", address: "61 Sandfield Road, Ikoyi", area: "Ikoyi", frequency: "Weekly", areaSqm: 700, defaultTeam: "B", accessNotes: "Non-toxic products only." },
  { id: "loc-11", name: "Sterling Heights Tower A", customerId: "cus-08", address: "5 Queensway Drive, Ikoyi", area: "Ikoyi", frequency: "3× weekly", areaSqm: 2600, defaultTeam: "A", accessNotes: "Service lift; porter's log." },
  { id: "loc-12", name: "Sterling Heights Tower B", customerId: "cus-08", address: "5 Queensway Drive, Ikoyi", area: "Ikoyi", frequency: "3× weekly", areaSqm: 2600, defaultTeam: "A", accessNotes: "Service lift; porter's log." },
  { id: "loc-15", name: "Unity Mall Atrium", customerId: "cus-11", address: "77 Market Ring, Ikeja", area: "Ikeja", frequency: "Daily", areaSqm: 7400, defaultTeam: "C", accessNotes: "Before opening, 06:00–08:00." },
  { id: "loc-16", name: "Palmgrove Hotel Public Areas", customerId: "cus-12", address: "12 Palmtree Avenue, Lekki Phase 1", area: "Lekki", frequency: "Daily", areaSqm: 3400, defaultTeam: "A", accessNotes: "Night pass from duty manager." },
];

// ------------------------------------------------------------------ schedule

const teamRoster: Record<"A" | "B" | "C", string[]> = {
  A: ["emp-01", "emp-02", "emp-03", "emp-08"],
  B: ["emp-05", "emp-06", "emp-07", "emp-11"],
  C: ["emp-09", "emp-10", "emp-12", "emp-14"],
};

// Per-weekday shift plan (getDay(): 0 = Sunday … 6 = Saturday).
const weekdayPlan: Record<number, { locationId: string; start: string; end: string; team: "A" | "B" | "C" }[]> = {
  0: [
    { locationId: "loc-09", start: "08:00", end: "12:00", team: "C" },
  ],
  1: [
    { locationId: "loc-03", start: "19:00", end: "22:00", team: "B" },
    { locationId: "loc-04", start: "16:00", end: "20:00", team: "C" },
    { locationId: "loc-06", start: "05:30", end: "09:00", team: "B" },
    { locationId: "loc-07", start: "05:30", end: "09:00", team: "B" },
    { locationId: "loc-08", start: "05:45", end: "08:45", team: "A" },
    { locationId: "loc-09", start: "18:00", end: "22:00", team: "C" },
    { locationId: "loc-14", start: "17:30", end: "21:30", team: "B" },
    { locationId: "loc-15", start: "06:00", end: "08:00", team: "C" },
    { locationId: "loc-16", start: "21:00", end: "01:00", team: "A" },
  ],
  2: [
    { locationId: "loc-03", start: "19:00", end: "22:00", team: "B" },
    { locationId: "loc-04", start: "16:00", end: "20:00", team: "C" },
    { locationId: "loc-05", start: "13:00", end: "17:00", team: "C" },
    { locationId: "loc-06", start: "05:30", end: "09:00", team: "B" },
    { locationId: "loc-07", start: "05:30", end: "09:00", team: "B" },
    { locationId: "loc-09", start: "18:00", end: "22:00", team: "C" },
    { locationId: "loc-11", start: "09:00", end: "13:00", team: "A" },
    { locationId: "loc-14", start: "17:30", end: "21:30", team: "B" },
    { locationId: "loc-15", start: "06:00", end: "08:00", team: "C" },
    { locationId: "loc-16", start: "21:00", end: "01:00", team: "A" },
  ],
  3: [
    { locationId: "loc-01", start: "20:00", end: "23:30", team: "A" },
    { locationId: "loc-03", start: "19:00", end: "22:00", team: "B" },
    { locationId: "loc-04", start: "16:00", end: "20:00", team: "C" },
    { locationId: "loc-06", start: "05:30", end: "09:00", team: "B" },
    { locationId: "loc-07", start: "05:30", end: "09:00", team: "B" },
    { locationId: "loc-08", start: "05:45", end: "08:45", team: "A" },
    { locationId: "loc-09", start: "18:00", end: "22:00", team: "C" },
    { locationId: "loc-14", start: "17:30", end: "21:30", team: "B" },
    { locationId: "loc-15", start: "06:00", end: "08:00", team: "C" },
    { locationId: "loc-16", start: "21:00", end: "01:00", team: "A" },
  ],
  4: [
    { locationId: "loc-03", start: "19:00", end: "22:00", team: "B" },
    { locationId: "loc-04", start: "16:00", end: "20:00", team: "C" },
    { locationId: "loc-05", start: "13:00", end: "17:00", team: "C" },
    { locationId: "loc-06", start: "05:30", end: "09:00", team: "B" },
    { locationId: "loc-07", start: "05:30", end: "09:00", team: "B" },
    { locationId: "loc-09", start: "18:00", end: "22:00", team: "C" },
    { locationId: "loc-12", start: "09:00", end: "13:00", team: "A" },
    { locationId: "loc-14", start: "17:30", end: "21:30", team: "B" },
    { locationId: "loc-15", start: "06:00", end: "08:00", team: "C" },
    { locationId: "loc-16", start: "21:00", end: "01:00", team: "A" },
  ],
  5: [
    { locationId: "loc-01", start: "20:00", end: "23:30", team: "A" },
    { locationId: "loc-02", start: "08:00", end: "12:00", team: "A" },
    { locationId: "loc-03", start: "19:00", end: "22:00", team: "B" },
    { locationId: "loc-06", start: "05:30", end: "09:00", team: "B" },
    { locationId: "loc-07", start: "05:30", end: "09:00", team: "B" },
    { locationId: "loc-08", start: "05:45", end: "08:45", team: "A" },
    { locationId: "loc-09", start: "18:00", end: "22:00", team: "C" },
    { locationId: "loc-14", start: "17:30", end: "21:30", team: "B" },
    { locationId: "loc-15", start: "06:00", end: "08:00", team: "C" },
    { locationId: "loc-16", start: "21:00", end: "01:00", team: "A" },
  ],
  6: [
    { locationId: "loc-06", start: "06:00", end: "10:00", team: "B" },
    { locationId: "loc-07", start: "06:00", end: "10:00", team: "B" },
    { locationId: "loc-09", start: "09:00", end: "13:00", team: "C" },
    { locationId: "loc-10", start: "08:00", end: "12:00", team: "B" },
    { locationId: "loc-15", start: "07:00", end: "10:00", team: "C" },
  ],
};

function employeeSliceFor(dayIndex: number, team: "A" | "B" | "C", slot: number): string[] {
  const roster = teamRoster[team];
  const size = team === "B" ? 3 : 2;
  const offset = (dayIndex * 3 + slot) % roster.length;
  return Array.from({ length: size }, (_, i) => roster[(offset + i) % roster.length]);
}

/** Deterministic per-date schedule derived from the weekday plan. */
export function shiftsForDate(date: Date): Shift[] {
  const day = getDay(date);
  const iso = format(date, "yyyy-MM-dd");
  const plan = weekdayPlan[day] ?? [];
  return plan.map((p, i) => ({
    id: `shift-${iso}-${i}`,
    date: iso,
    locationId: p.locationId,
    team: p.team,
    employeeIds: employeeSliceFor(day, p.team, i),
    start: p.start,
    end: p.end,
    status: "Scheduled",
  }));
}

export function upcomingDays(count: number): Date[] {
  const monday = startOfWeek(new Date(), { weekStartsOn: 1 });
  const today = new Date();
  const todayIdx = getDay(today) === 0 ? 7 : getDay(today); // Mon = 1 … Sun = 7
  return Array.from({ length: count }, (_, i) => addDays(monday, todayIdx - 1 + i));
}

export function currentWeekDays(): Date[] {
  const monday = startOfWeek(new Date(), { weekStartsOn: 1 });
  return Array.from({ length: 7 }, (_, i) => addDays(monday, i));
}

// ------------------------------------------------------------------ attendance

/**
 * Attendance is derived from the day's shifts with fixed rules so the render
 * is deterministic between server and client.
 */
export function attendanceForDate(date: Date): AttendanceRecord[] {
  const iso = format(date, "yyyy-MM-dd");
  const shifts = shiftsForDate(date);
  const working = new Set<string>(shifts.flatMap((s) => s.employeeIds));
  const latePool = new Set(["emp-03", "emp-11", "emp-07"]);

  const records: AttendanceRecord[] = employees
    .filter((e) => e.status === "On leave" || working.has(e.id) || e.role === "Supervisor")
    .map((e) => {
      if (e.status === "On leave") {
        return { employeeId: e.id, date: iso, clockIn: null, clockOut: null, status: "Leave" as AttendanceStatus };
      }
      if (!working.has(e.id)) {
        return { employeeId: e.id, date: iso, clockIn: null, clockOut: null, status: "Off duty" as AttendanceStatus };
      }
      const shift = shifts.find((s) => s.employeeIds.includes(e.id))!;
      const clockIn = latePool.has(e.id) ? addMinutes(shift.start, 17) : shift.start;
      return {
        employeeId: e.id,
        date: iso,
        clockIn,
        clockOut: null,
        status: (latePool.has(e.id) ? "Late" : "On time") as AttendanceStatus,
      };
    });

  return records.sort((a, b) => a.clockIn?.localeCompare(b.clockIn ?? "99") || 0);
}

function addMinutes(hhmm: string, mins: number): string {
  const [h, m] = hhmm.split(":").map(Number);
  const total = (h * 60 + m + mins) % (24 * 60);
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

// Weekly attendance summary (per employee, current week to date).
export const weeklyAttendanceSummary = [
  { employeeId: "emp-01", daysPresent: 5, late: 0, missed: 0 },
  { employeeId: "emp-02", daysPresent: 5, late: 1, missed: 0 },
  { employeeId: "emp-03", daysPresent: 4, late: 2, missed: 1 },
  { employeeId: "emp-04", daysPresent: 0, late: 0, missed: 0 },
  { employeeId: "emp-05", daysPresent: 5, late: 0, missed: 0 },
  { employeeId: "emp-06", daysPresent: 5, late: 1, missed: 0 },
  { employeeId: "emp-07", daysPresent: 4, late: 2, missed: 0 },
  { employeeId: "emp-08", daysPresent: 5, late: 0, missed: 0 },
  { employeeId: "emp-09", daysPresent: 5, late: 0, missed: 0 },
  { employeeId: "emp-10", daysPresent: 5, late: 0, missed: 1 },
  { employeeId: "emp-11", daysPresent: 4, late: 1, missed: 1 },
  { employeeId: "emp-12", daysPresent: 5, late: 0, missed: 0 },
  { employeeId: "emp-13", daysPresent: 5, late: 0, missed: 0 },
  { employeeId: "emp-14", daysPresent: 4, late: 1, missed: 0 },
  { employeeId: "emp-15", daysPresent: 5, late: 0, missed: 0 },
];

// ------------------------------------------------------------------ financial

export const monthlyRevenue = [
  { month: "May", revenue: 4_960_000, costs: 3_180_000 },
  { month: "Jun", revenue: 5_140_000, costs: 3_260_000 },
  { month: "Jul", revenue: 4_720_000, costs: 3_090_000 },
  { month: "Aug", revenue: 5_380_000, costs: 3_410_000 },
  { month: "Sep", revenue: 5_610_000, costs: 3_520_000 },
  { month: "Oct", revenue: 5_650_000, costs: 3_560_000 },
];

export const revenueByServiceLine = [
  { line: "Office cleaning", share: 46 },
  { line: "Medical & clinical", share: 18 },
  { line: "Education", share: 14 },
  { line: "Residential estates", share: 12 },
  { line: "Hospitality & retail", share: 10 },
];

export const invoices: Invoice[] = [
  { id: "INV-1041", customerId: "cus-10", period: "October 2026", amount: 850000, status: "Sent", dueDate: "2026-11-07" },
  { id: "INV-1042", customerId: "cus-04", period: "October 2026", amount: 740000, status: "Sent", dueDate: "2026-11-07" },
  { id: "INV-1043", customerId: "cus-11", period: "October 2026", amount: 690000, status: "Paid", dueDate: "2026-10-31" },
  { id: "INV-1044", customerId: "cus-03", period: "October 2026", amount: 620000, status: "Paid", dueDate: "2026-10-31" },
  { id: "INV-1045", customerId: "cus-12", period: "October 2026", amount: 520000, status: "Sent", dueDate: "2026-11-07" },
  { id: "INV-1046", customerId: "cus-06", period: "October 2026", amount: 560000, status: "Overdue", dueDate: "2026-10-24" },
  { id: "INV-1047", customerId: "cus-01", period: "October 2026", amount: 480000, status: "Paid", dueDate: "2026-10-31" },
  { id: "INV-1048", customerId: "cus-08", period: "October 2026", amount: 280000, status: "Sent", dueDate: "2026-11-07" },
  { id: "INV-1049", customerId: "cus-05", period: "October 2026", amount: 310000, status: "Overdue", dueDate: "2026-10-20" },
  { id: "INV-1050", customerId: "cus-02", period: "October 2026", amount: 260000, status: "Paid", dueDate: "2026-10-31" },
  { id: "INV-1051", customerId: "cus-07", period: "October 2026", amount: 190000, status: "Draft", dueDate: "2026-11-07" },
  { id: "INV-1052", customerId: "cus-09", period: "October 2026", amount: 0, status: "Draft", dueDate: "—" },
];

// ------------------------------------------------------------------ activity

export type ActivityItem = { time: string; actor: string; action: string; target: string };

export const recentActivity: ActivityItem[] = [
  { time: "09:12", actor: "Rita Okon", action: "Completed quality inspection at", target: "Meridian Insurance HQ" },
  { time: "08:47", actor: "Halima Bello", action: "Clocked in 17 minutes late at", target: "Nova Plaza Tower 1" },
  { time: "08:15", actor: "Chidi Okafor", action: "Reported a broken soap dispenser at", target: "Ironwood Fitness Gym" },
  { time: "07:58", actor: "Funke Alabi", action: "Submitted the site checklist for", target: "Unity Mall Atrium" },
  { time: "07:31", actor: "Ibrahim Musa", action: "Requested a relief cleaner for", target: "Lekki Medical Centre" },
  { time: "Yesterday", actor: "Rita Okon", action: "Approved leave for", target: "Ngozi Iwu (5–9 Nov)" },
  { time: "Yesterday", actor: "Joy Ekanem", action: "Flagged glass streaking at", target: "Sterling Heights Tower A" },
  { time: "Yesterday", actor: "Emeka Nwosu", action: "Logged a supply restock for", target: "Crestview Dental Clinic" },
];

// ------------------------------------------------------------------ helpers

export function naira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export function customerById(id: string): Customer | undefined {
  return customers.find((c) => c.id === id);
}

export function employeeById(id: string): Employee | undefined {
  return employees.find((e) => e.id === id);
}

export function locationById(id: string): Location | undefined {
  return locations.find((l) => l.id === id);
}

export function employeeName(id: string): string {
  return employees.find((e) => e.id === id)?.name ?? "Unassigned";
}

export function initials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
