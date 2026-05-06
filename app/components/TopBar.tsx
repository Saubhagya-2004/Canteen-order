"use client";

import { useRouter } from "next/navigation";
import { Search, Bell, ChevronDown } from "lucide-react";
import { currentUser } from "@/app/lib/data";

interface TopBarProps {
  activeMeal?: string;
  onMealChange?: (meal: string) => void;
  showSearch?: boolean;
  title?: string;
}

const meals = ["Breakfast", "Lunch", "Snacks"];

export default function TopBar({
  activeMeal = "Lunch",
  onMealChange,
  showSearch = true,
  title,
}: TopBarProps) {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-4 mb-6">
      {/* Top strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-card border border-border rounded-xl px-4 py-3 gap-2">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Today\u2019s Special:</span>
          <span className="font-semibold text-foreground">Chicken Biryani ₹120</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Current Wait Time:</span>
          <span className="font-semibold text-primary">15 mins</span>
        </div>
      </div>

      {/* Main top bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {showSearch ? (
          <div className="relative flex-1 w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search food items..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        ) : (
          <h1 className="text-2xl font-bold">{title}</h1>
        )}

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {showSearch && (
            <div className="flex items-center gap-1 bg-card border border-border rounded-xl px-1 py-1 overflow-x-auto">
              {meals.map((meal) => (
                <button
                  key={meal}
                  onClick={() => onMealChange?.(meal)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer shrink-0 ${
                    activeMeal === meal
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {meal}
                </button>
              ))}
              <button className="p-1.5 text-muted-foreground hover:text-foreground cursor-pointer shrink-0">
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          )}

          <button
            onClick={() => router.push("/notifications")}
            className="relative p-2.5 rounded-xl bg-card border border-border text-foreground hover:bg-accent transition-colors cursor-pointer shrink-0"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive" />
          </button>

          <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-3 py-2 ml-auto sm:ml-0 shrink-0">
            <span className="text-sm text-muted-foreground hidden sm:inline">Campus Wallet:</span>
            <span className="text-sm font-bold text-foreground">₹{currentUser.walletBalance}</span>
            <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
              {currentUser.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
