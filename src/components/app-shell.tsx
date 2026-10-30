import { useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";
import { AppTopbar } from "@/components/app-topbar";
import { Button } from "@/components/ui/button";

export function AppShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Desktop sidebar */}
      <div
        className="fixed inset-y-0 left-0 z-30 hidden lg:block"
        style={{ width: collapsed ? "3.5rem" : "15rem" }}
      >
        <AppSidebar collapsed={collapsed} />
      </div>

      {/* Mobile navigation drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation">
          <div
            className="absolute inset-0 bg-foreground/30"
            aria-hidden="true"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-72 max-w-[85%] flex-col shadow-lg">
            <div className="absolute right-2 top-2 z-10">
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Close navigation menu"
                onClick={() => setMobileOpen(false)}
              >
                <X aria-hidden="true" />
              </Button>
            </div>
            <AppSidebar collapsed={false} onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      <div
        className="flex min-h-screen flex-col transition-[padding] duration-150"
        style={{ paddingLeft: collapsed ? "3.5rem" : undefined }}
        data-desktop-offset
      >
        <div className="hidden lg:block" style={{ display: "none" }} />
        <div className="lg:pl-[var(--shell-offset)]">
          <AppTopbar
            sidebarCollapsed={collapsed}
            onToggleCollapse={() => setCollapsed((c) => !c)}
            onOpenMobileNav={() => setMobileOpen(true)}
          />
          <main id="main-content" className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
