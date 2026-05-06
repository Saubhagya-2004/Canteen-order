"use client";

import { FileText, Clock, CheckCircle2 } from "lucide-react";
import { orders } from "@/app/lib/data";

export default function TokenCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-card border border-border rounded-2xl p-5 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              <span className="text-lg font-bold text-foreground">
                Token #{order.token}
              </span>
            </div>
            <span
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                order.status === "preparing"
                  ? "bg-warning/10 text-warning"
                  : order.status === "ready"
                  ? "bg-success/10 text-success"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {order.status === "picked-up"
                ? "Picked Up"
                : order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>

          <div className="space-y-2 mb-4">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-foreground">
                  {item.name} x{item.quantity}
                </span>
                <span className="text-muted-foreground">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Clock className="w-4 h-4" />
            <span>Pickup: {order.pickupTime}</span>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-border">
            <span className="text-sm font-medium text-foreground">Total</span>
            <span className="text-lg font-bold text-foreground">
              ₹{order.total}
            </span>
          </div>

          {order.status === "ready" && (
            <button className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-success text-white text-sm font-medium hover:bg-success/90 transition-colors">
              <CheckCircle2 className="w-4 h-4" />
              Mark as Picked Up
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
