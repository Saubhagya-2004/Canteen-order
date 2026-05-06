"use client";

import TopBar from "../components/TopBar";
import TokenCard from "../components/TokenCard";

export default function OrdersPage() {
  return (
    <div className="space-y-4">
      <TopBar title="My Orders" showSearch={false} />
      <TokenCard />
    </div>
  );
}
