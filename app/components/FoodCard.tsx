"use client";

import { Plus, Minus } from "lucide-react";
import Image from "next/image";
import { cn } from "@/app/lib/utils";
import type { FoodItem } from "@/app/lib/data";
import { useCart } from "@/app/context/CartContext";

interface FoodCardProps {
  item: FoodItem;
}

const statusConfig = {
  available: { label: "", color: "" },
  "out-of-stock": { label: "Out of Stock", color: "bg-destructive text-destructive-foreground" },
  preparing: { label: "Preparing", color: "bg-warning text-warning-foreground" },
  ready: { label: "Ready", color: "bg-success text-white" },
  live: { label: "Live", color: "bg-blue-500 text-white" },
};

export default function FoodCard({ item }: FoodCardProps) {
  const { items, addItem, updateQuantity } = useCart();
  const cartItem = items.find((i) => i.id === item.id);
  const inCart = !!cartItem;

  const status = statusConfig[item.status];

  return (
    <div className="relative bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      {/* Status Badge */}
      {status.label && (
        <div
          className={cn(
            "absolute top-3 left-3 z-10 px-2.5 py-1 rounded-lg text-xs font-semibold",
            status.color
          )}
        >
          {status.label}
        </div>
      )}

      {/* Image */}
      <div className="relative h-40 bg-muted">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center">
              <span className="text-3xl">{item.isVeg ? "🥬" : "🍗"}</span>
            </div>
          </div>
        )}
        {item.status === "out-of-stock" && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <span className="text-white font-bold text-sm">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-foreground">{item.name}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Available: {item.availableQuantity}
            </p>
            <p className="text-xs text-muted-foreground">
              Prep Time: {item.prepTime}
            </p>
          </div>
          <span
            className={cn(
              "w-3 h-3 rounded-full shrink-0 mt-1",
              item.isVeg ? "bg-success" : "bg-destructive"
            )}
            title={item.isVeg ? "Veg" : "Non-Veg"}
          />
        </div>

        {item.availableQuantity > 0 && item.availableQuantity <= 10 && (
          <p className="text-xs text-destructive font-medium">
            Only {item.availableQuantity} plates left
          </p>
        )}

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-foreground">₹{item.price}</span>

          {item.status === "out-of-stock" ? (
            <button
              disabled
              className="px-4 py-2 rounded-xl bg-muted text-muted-foreground text-sm font-medium cursor-not-allowed"
            >
              Add
            </button>
          ) : inCart ? (
            <div className="flex items-center gap-2 bg-primary/10 rounded-xl px-2 py-1">
              <button
                onClick={() =>
                  updateQuantity(item.id, (cartItem?.quantity || 1) - 1)
                }
                className="w-7 h-7 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors cursor-pointer"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-5 text-center text-sm font-semibold text-foreground">
                {cartItem?.quantity}
              </span>
              <button
                onClick={() =>
                  updateQuantity(item.id, (cartItem?.quantity || 1) + 1)
                }
                className="w-7 h-7 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors cursor-pointer"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => addItem(item)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border bg-card text-foreground text-sm font-medium hover:bg-accent transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4 text-primary" />
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
