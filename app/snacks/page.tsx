"use client";

import TopBar from "../components/TopBar";
import FoodCard from "../components/FoodCard";
import OrderSummary from "../components/OrderSummary";
import { foodItems } from "../lib/data";

export default function SnacksPage() {
  const items = foodItems.filter((item) => item.category === "snacks");

  return (
    <div className="space-y-4">
      <TopBar title="Evening Snacks" showSearch={false} />

      <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex-1 min-w-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {items.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
          {items.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-lg text-muted-foreground">
                No snack items available right now.
              </p>
            </div>
          )}
        </div>
        <div className="w-full xl:w-auto">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
