"use client";

import TopBar from "../components/TopBar";
import WalletCard from "../components/WalletCard";

export default function WalletPage() {
  return (
    <div className="space-y-4">
      <TopBar title="Wallet / Card" showSearch={false} />
      <WalletCard />
    </div>
  );
}
