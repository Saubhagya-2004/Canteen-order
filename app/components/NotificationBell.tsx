"use client";

import { useState } from "react";
import { Bell, X, Check, Clock } from "lucide-react";
import { cn } from "@/app/lib/utils";

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
    message: "Your Token #A098 is ready for pickup.",
    time: "5 mins ago",
    read: false,
    type: "order",
  },
  {
    id: "n2",
    title: "Special Offer",
    message: "Get 20% off on all lunch items today!",
    time: "1 hour ago",
    read: false,
    type: "promo",
  },
  {
    id: "n3",
    title: "Order Update",
    message: "Your Token #A102 is now being prepared.",
    time: "2 hours ago",
    read: true,
    type: "order",
  },
  {
    id: "n4",
    title: "Wallet Credited",
    message: "₹500 has been added to your Campus Wallet.",
    time: "Yesterday",
    read: true,
    type: "system",
  },
];

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
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
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2.5 rounded-xl bg-card border border-border text-foreground hover:bg-accent transition-colors"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive" />
        )}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-12 w-80 bg-card border border-border rounded-2xl shadow-xl z-50 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-semibold text-foreground">
                Notifications
              </h3>
              <div className="flex items-center gap-1">
                <button
                  onClick={markAllRead}
                  className="text-xs text-primary hover:underline"
                >
                  Mark all read
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-6">
                  No notifications
                </p>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => markAsRead(n.id)}
                    className={cn(
                      "flex items-start gap-3 p-4 cursor-pointer hover:bg-accent transition-colors border-b border-border last:border-0",
                      !n.read && "bg-accent/30"
                    )}
                  >
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      {typeIcon(n.type)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {n.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {n.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {n.time}
                      </p>
                    </div>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
