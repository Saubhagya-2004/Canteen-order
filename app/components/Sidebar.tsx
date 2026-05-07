"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  UtensilsCrossed,
  Coffee,
  Sun,
  Moon,
  Cookie,
  ShoppingBag,
  CreditCard,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  X,
} from "lucide-react";
import { cn } from "@/app/lib/utils";
import { currentUser } from "@/app/lib/data";
import { useTheme } from "./ThemeProvider";
import Profile from "../../public/assets/linkedin.jpg";

const mainNav = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Today\u2019s Menu", href: "/menu", icon: UtensilsCrossed },
];

const categoryNav = [
  { label: "Breakfast", href: "/breakfast", icon: Coffee },
  { label: "Lunch", href: "/lunch", icon: Sun },
  { label: "Evening Snacks", href: "/snacks", icon: Cookie },
];

const bottomNav = [
  { label: "My Orders", href: "/orders", icon: ShoppingBag },
  { label: "Wallet/Card", href: "/wallet", icon: CreditCard },
  { label: "Notifications", href: "/notifications", icon: Bell },
  { label: "Settings", href: "/settings", icon: Settings },
];

interface SidebarProps {
  mobileOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ mobileOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const expanded = mobileOpen || !collapsed;

  const NavLink = ({
    item,
    active,
  }: {
    item: (typeof mainNav)[0];
    active: boolean;
  }) => (
    <Link
      href={item.href}
      title={collapsed && !mobileOpen ? item.label : undefined}
      onClick={() => mobileOpen && onClose?.()}
      className={cn(
        "flex items-center rounded-xl transition-colors cursor-pointer",
        expanded ? "gap-3 px-4 py-3" : "justify-center px-2 py-3",
        active
          ? "bg-primary text-primary-foreground font-medium"
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
      )}
    >
      <item.icon className="w-5 h-5 shrink-0" />
      {expanded && (
        <>
          <span className="flex-1">{item.label}</span>
          {active && <ChevronRight className="w-4 h-4 opacity-60" />}
        </>
      )}
    </Link>
  );

  return (
    <aside
      className={cn(
        "bg-sidebar text-sidebar-foreground flex flex-col z-40 border-r border-sidebar-border transition-all duration-300 ",
        // Mobile: fixed overlay drawer
        "fixed md:relative inset-y-0 left-0 min-h-screen",
        mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        // Width
        "w-64",
        collapsed ? "md:w-16" : "md:w-64"
      )}
    >
      {/* Brand + Toggle */}
      <div
        className={cn(
          "flex items-center cursor-pointer select-none",
          mobileOpen ? "gap-3 p-4 justify-between" : expanded ? "gap-3 p-4 md:p-6" : "md:justify-center md:p-3 p-4"
        )}
        onClick={() => { if (!mobileOpen) setCollapsed(!collapsed); }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <UtensilsCrossed className="w-5 h-5 text-primary-foreground" />
          </div>
          {expanded && (
            <span className="text-xl font-bold tracking-tight hidden md:block">CampusBite</span>
          )}
          {mobileOpen && (
            <span className="text-xl font-bold tracking-tight md:hidden">CampusBite</span>
          )}
        </div>

        {mobileOpen && (
          <button
            onClick={(e) => { e.stopPropagation(); onClose?.(); }}
            className="md:hidden p-1"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {!mobileOpen && expanded && (
          <PanelLeftClose className="w-4 h-4 text-sidebar-muted hidden md:block ml-auto" />
        )}
        {!mobileOpen && !expanded && (
          <PanelLeftOpen className="w-4 h-4 text-sidebar-muted hidden md:block" />
        )}
      </div>

      {/* Profile */}
      {expanded && (
        <div className="px-4 pb-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-sidebar-accent/50">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-bold text-sidebar-foreground overflow-hidden shrink-0">
              <Image src={Profile} alt="Profile" width={40} height={40} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">{currentUser.name}</p>
              <p className="text-xs text-sidebar-muted truncate">
                {currentUser.course}
              </p>
              <p className="text-xs text-sidebar-muted truncate">
                Roll No: {currentUser.rollNo}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <div className="flex-1 overflow-y-auto px-3 space-y-1 scrollbar-hide">
        <div className="pb-2">
          {mainNav.map((item) => (
            <NavLink key={item.href} item={item} active={isActive(item.href)} />
          ))}
        </div>

        <div className="pt-2 pb-2 border-t border-sidebar-border">
          {expanded && (
            <p className="px-4 py-2 text-xs font-semibold text-sidebar-muted uppercase tracking-wider">
              Categories
            </p>
          )}
          {categoryNav.map((item) => (
            <NavLink key={item.href} item={item} active={isActive(item.href)} />
          ))}
        </div>

        <div className="pt-2 border-t border-sidebar-border">
          {bottomNav.map((item) => (
            <NavLink key={item.href} item={item} active={isActive(item.href)} />
          ))}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="p-3 border-t border-sidebar-border space-y-1">
        <button
          onClick={toggleTheme}
          title={collapsed && !mobileOpen ? (theme === "dark" ? "Light Mode" : "Dark Mode") : undefined}
          className={cn(
            "flex items-center rounded-xl text-sidebar-foreground hover:bg-sidebar-accent transition-colors cursor-pointer w-full",
            expanded ? "gap-3 px-4 py-3" : "justify-center px-2 py-3"
          )}
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5 shrink-0" />
          ) : (
            <Moon className="w-5 h-5 shrink-0" />
          )}
          {expanded && (
            <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
          )}
        </button>
        <button
          title={collapsed && !mobileOpen ? "Logout" : undefined}
          className={cn(
            "flex items-center rounded-xl text-sidebar-foreground hover:bg-sidebar-accent transition-colors cursor-pointer w-full",
            expanded ? "gap-3 px-4 py-3" : "justify-center px-2 py-3"
          )}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {expanded && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
