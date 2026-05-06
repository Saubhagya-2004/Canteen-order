"use client";

import { useState } from "react";
import TopBar from "../components/TopBar";
import FoodCard from "../components/FoodCard";
import OrderSummary from "../components/OrderSummary";
import { foodItems } from "../lib/data";
import { cn } from "../lib/utils";

const categories = [
  { label: "Breakfast", value: "breakfast" },
  { label: "Lunch", value: "lunch" },
  { label: "Snacks", value: "snacks" },
  { label: "Drinks", value: "drinks" },
];

const typeFilters = [
  { label: "Veg", value: "veg", color: "bg-success" },
  { label: "Non-Veg", value: "non-veg", color: "bg-destructive" },
];

export default function MenuPage() {
  const [activeMeal, setActiveMeal] = useState("Lunch");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeType, setActiveType] = useState<string | null>(null);

  const filteredItems = foodItems.filter((item) => {
    const mealMatch =
      !activeMeal ||
      activeMeal.toLowerCase() === item.category ||
      (activeMeal === "Snacks" && item.category === "snacks");
    const catMatch = !activeCategory || item.category === activeCategory;
    const typeMatch =
      !activeType ||
      (activeType === "veg" && item.isVeg) ||
      (activeType === "non-veg" && !item.isVeg);
    return mealMatch && catMatch && typeMatch;
  });

  return (
    <div className="space-y-4">
      <TopBar activeMeal={activeMeal} onMealChange={setActiveMeal} />

      <div className="flex flex-col xl:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() =>
                  setActiveCategory(
                    activeCategory === cat.value ? null : cat.value
                  )
                }
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer",
                  activeCategory === cat.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-foreground hover:bg-accent"
                )}
              >
                {cat.label}
              </button>
            ))}
            {typeFilters.map((tf) => (
              <button
                key={tf.value}
                onClick={() =>
                  setActiveType(activeType === tf.value ? null : tf.value)
                }
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer",
                  activeType === tf.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-foreground hover:bg-accent"
                )}
              >
                <span className={cn("w-2 h-2 rounded-full", tf.color)} />
                {tf.label}
              </button>
            ))}
          </div>

          {/* Food Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredItems.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-lg text-muted-foreground">
                No items available for this filter.
              </p>
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div className="w-full xl:w-auto">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
