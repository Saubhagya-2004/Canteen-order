"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  UtensilsCrossed,
  ShoppingBag,
  CreditCard,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import AnalyticsChart from "./components/AnalyticsChart";
import { foodItems, currentUser } from "./lib/data";

export default function Dashboard() {
  const todaySpecial = foodItems.find((f) => f.name === "Chicken Biryani") || foodItems[0];
  const vegCount = foodItems.filter((f) => f.isVeg).length;
  const nonVegCount = foodItems.filter((f) => !f.isVeg).length;

  const quickLinks = [
    { label: "Today\u2019s Menu", href: "/menu", icon: UtensilsCrossed, color: "bg-primary/10 text-primary" },
    { label: "My Orders", href: "/orders", icon: ShoppingBag, color: "bg-success/10 text-success" },
    { label: "Wallet", href: "/wallet", icon: CreditCard, color: "bg-blue-500/10 text-blue-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Welcome back, {currentUser.name.split(" ")[0]}!
          </p>
        </div>
        <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-3 py-2 self-start sm:self-auto">
          <span className="text-sm text-muted-foreground hidden sm:inline">Campus Wallet:</span>
          <span className="text-sm font-bold text-foreground">
            ₹{currentUser.walletBalance}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <UtensilsCrossed className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Menu Items</p>
              <p className="text-2xl font-bold text-foreground">{foodItems.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Veg Items</p>
              <p className="text-2xl font-bold text-foreground">{vegCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Non-Veg Items</p>
              <p className="text-2xl font-bold text-foreground">{nonVegCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Wait Time</p>
              <p className="text-2xl font-bold text-foreground">15m</p>
            </div>
          </div>
        </div>
      </div>

      {/* Today\u2019s Special */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-lg font-bold text-foreground mb-4">
          Today\u2019s Special
        </h2>
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="w-24 h-24 rounded-2xl bg-muted flex items-center justify-center text-4xl shrink-0">
            {todaySpecial.isVeg ? "\u{1F96C}" : "\u{1F357}"}
          </div>
          <div className="min-w-0">
            <h3 className="text-xl font-bold text-foreground">
              {todaySpecial.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {todaySpecial.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-3">
              <span className="text-lg font-bold text-primary">
                ₹{todaySpecial.price}
              </span>
              <span className="text-sm text-muted-foreground">
                Prep: {todaySpecial.prepTime}
              </span>
              <Link
                href="/menu"
                className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                Order Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-4 p-5 bg-card border border-border rounded-2xl hover:shadow-md transition-shadow"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${link.color}`}>
              <link.icon className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">{link.label}</p>
              <p className="text-sm text-muted-foreground">Go to {link.label}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground" />
          </Link>
        ))}
      </div>

      {/* Analytics */}
      <AnalyticsChart />
    </div>
  );
}