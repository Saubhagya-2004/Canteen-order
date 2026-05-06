"use client";

import { useState } from "react";
import {
  User,
  Bell,
  Shield,
  Moon,
  Smartphone,
  ChevronRight,
} from "lucide-react";
import { cn } from "../lib/utils";
import { currentUser } from "../lib/data";
import { useTheme } from "../components/ThemeProvider";

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [promotions, setPromotions] = useState(false);

  const settingsGroups = [
    {
      title: "Account",
      items: [
        {
          icon: User,
          label: "Profile Information",
          description: `${currentUser.name} \u00B7 ${currentUser.rollNo}`,
          action: <ChevronRight className="w-4 h-4 text-muted-foreground" />,
        },
        {
          icon: Shield,
          label: "Security",
          description: "Password, 2FA",
          action: <ChevronRight className="w-4 h-4 text-muted-foreground" />,
        },
      ],
    },
    {
      title: "Preferences",
      items: [
        {
          icon: Moon,
          label: "Dark Mode",
          description: theme === "dark" ? "Enabled" : "Disabled",
          action: (
            <button
              onClick={toggleTheme}
              className={cn(
                "w-11 h-6 rounded-full transition-colors",
                theme === "dark" ? "bg-primary" : "bg-muted"
              )}
            >
              <span
                className={cn(
                  "block w-5 h-5 rounded-full bg-white shadow-sm transition-transform",
                  theme === "dark" ? "translate-x-5" : "translate-x-0.5"
                )}
              />
            </button>
          ),
        },
        {
          icon: Bell,
          label: "Push Notifications",
          description: "Master toggle",
          action: (
            <button
              onClick={() => setNotifications(!notifications)}
              className={cn(
                "w-11 h-6 rounded-full transition-colors",
                notifications ? "bg-primary" : "bg-muted"
              )}
            >
              <span
                className={cn(
                  "block w-5 h-5 rounded-full bg-white shadow-sm transition-transform",
                  notifications ? "translate-x-5" : "translate-x-0.5"
                )}
              />
            </button>
          ),
        },
      ],
    },
    {
      title: "Notification Types",
      items: [
        {
          icon: Smartphone,
          label: "Order Updates",
          description: "Ready, preparing, picked up",
          action: (
            <button
              onClick={() => setOrderUpdates(!orderUpdates)}
              className={cn(
                "w-11 h-6 rounded-full transition-colors",
                orderUpdates ? "bg-primary" : "bg-muted"
              )}
            >
              <span
                className={cn(
                  "block w-5 h-5 rounded-full bg-white shadow-sm transition-transform",
                  orderUpdates ? "translate-x-5" : "translate-x-0.5"
                )}
              />
            </button>
          ),
        },
        {
          icon: Bell,
          label: "Promotions",
          description: "Offers and discounts",
          action: (
            <button
              onClick={() => setPromotions(!promotions)}
              className={cn(
                "w-11 h-6 rounded-full transition-colors",
                promotions ? "bg-primary" : "bg-muted"
              )}
            >
              <span
                className={cn(
                  "block w-5 h-5 rounded-full bg-white shadow-sm transition-transform",
                  promotions ? "translate-x-5" : "translate-x-0.5"
                )}
              />
            </button>
          ),
        },
      ],
    },
  ];

  return (
    <div className="space-y-6 max-w-2xl mx-auto md:mx-0">
      <h1 className="text-2xl font-bold text-foreground">Settings</h1>

      {settingsGroups.map((group) => (
        <div key={group.title}>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            {group.title}
          </h2>
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            {group.items.map((item, i) => (
              <div
                key={item.label}
                className={cn(
                  "flex items-center gap-4 p-4 hover:bg-accent/50 transition-colors",
                  i < group.items.length - 1 && "border-b border-border"
                )}
              >
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {item.label}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                <div className="shrink-0">{item.action}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
