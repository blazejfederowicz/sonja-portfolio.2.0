"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FolderKanban,
  Lightbulb,
  CalendarDays,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import useAuth from "@/hooks/useAuth/useAuth";

const navItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Projects",
    href: "/admin/projects",
    icon: FolderKanban,
  },
  {
    label: "Skills",
    href: "/admin/skills",
    icon: Lightbulb,
  },
  {
    label: "Events",
    href: "/admin/events",
    icon: CalendarDays,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { signOut } = useAuth()

  return (<>
    <aside
      className={cn(
        "md:flex flex-col h-screen bg-card border-r border-border transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        "fixed md:static z-50",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-foreground rounded-md flex items-center justify-center">
              <span className="text-background font-bold text-sm">A</span>
            </div>
            <Link href="/" className="font-bold  text-salmon2">
              Main page
            </Link>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground",
            collapsed && "mx-auto"
          )}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                    isActive
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  {!collapsed && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-border">
        <button
          onClick={signOut}
          className={cn(
            "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          )}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Log out</span>}
        </button>
      </div>
    </aside>
    
    {!collapsed && (
      <div
        className="fixed inset-0 bg-black/10 md:hidden z-40"
        onClick={() => setCollapsed(true)}
      />
    )}
  </>);
}
