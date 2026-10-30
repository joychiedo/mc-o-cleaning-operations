import { cn } from "@/lib/utils";
import { initials } from "@/data/mock";

export function Avatar({ name, className }: { name: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-secondary text-[11px] font-semibold text-secondary-foreground",
        className,
      )}
    >
      {initials(name)}
    </span>
  );
}
