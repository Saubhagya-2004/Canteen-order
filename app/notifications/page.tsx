"use client";

import { useState } from "react";
import {
  Clock,
  Check,
  Bell,
  Trash2,
  Filter,
} from "lucide-react";
import { cn } from "../lib/utils";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "order" | "promo" | "system";
}

const initialNotifications: Notification[] = [
  {
    id: "n1",
    title: "Order Ready",
    message: "Your Token #A098 is ready for pickup at Counter 2.",
    time: "5 mins ago",
    read: false,
    type: "order",
  },
  {
    id: "n2",
    title: "Special Offer",
    message: "Get 20% off on all lunch items today between 12-2 PM!",
    time: "1 hour ago",
    read: false,
    type: "promo",
  },
  {
    id: "n3",
    title: "Order Update",
    message: "Your Token #A102 is now being prepared. Est. time: 10 mins.",
    time: "2 hours ago",
    read: true,
    type: "order",
  },
  {
    id: "n4",
    title: "Wallet Credited",
    message: "₹500 has been added to your Campus Wallet successfully.",
    time: "Yesterday",
    read: true,
    type: "system",
  },
  {
    id: "n5",
    title: "New Menu Item",
    message: "Try our new Butter Chicken Biryani, now available for lunch!",
    time: "2 days ago",
    read: true,
    type: "promo",
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const filtered =
    filter === "unread" ? notifications.filter((n) => !n.read) : notifications;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const typeIcon = (type: Notification["type"]) => {
    switch (type) {
      case "order":
        return <Clock className="w-4 h-4 text-primary" />;
      case "promo":
        return <Bell className="w-4 h-4 text-warning" />;
      case "system":
        return <Check className="w-4 h-4 text-success" />;
    }
  };

  return (
    <div className="space-y-4 max-w-3xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter(filter === "all" ? "unread" : "all")}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors",
              filter === "unread"
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-foreground hover:bg-accent"
            )}
          >
            <Filter className="w-4 h-4" />
            {filter === "unread" ? "Unread Only" : "All"}
          </button>
          <button
            onClick={markAllRead}
            className="px-3 py-2 rounded-xl bg-card border border-border text-sm font-medium text-foreground hover:bg-accent transition-colors"
          >
            Mark all read
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Bell className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-lg text-muted-foreground">No notifications</p>
          </div>
        ) : (
          filtered.map((n) => (
            <div
              key={n.id}
              className={cn(
                "flex items-start gap-4 p-5 bg-card border border-border rounded-2xl hover:shadow-md transition-shadow",
                !n.read && "bg-accent/20"
              )}
            >
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                {typeIcon(n.type)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-foreground">
                    {n.title}
                  </p>
                  <div className="flex items-center gap-1">
                    {!n.read && (
                      <button
                        onClick={() => markAsRead(n.id)}
                        className="p-1 text-muted-foreground hover:text-primary transition-colors"
                        title="Mark as read"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(n.id)}
                      className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {n.message}
                </p>
                <p className="text-xs text-muted-foreground mt-2">{n.time}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
