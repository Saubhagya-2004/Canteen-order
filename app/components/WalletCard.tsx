"use client";

import { CreditCard, Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { currentUser } from "@/app/lib/data";

interface Transaction {
  id: string;
  title: string;
  date: string;
  amount: number;
  type: "credit" | "debit";
}

const transactions: Transaction[] = [
  { id: "t1", title: "Added Money", date: "May 6, 2026", amount: 500, type: "credit" },
  { id: "t2", title: "Chicken Roll Order", date: "May 6, 2026", amount: 60, type: "debit" },
  { id: "t3", title: "Lunch Order", date: "May 5, 2026", amount: 120, type: "debit" },
  { id: "t4", title: "Added Money", date: "May 4, 2026", amount: 300, type: "credit" },
  { id: "t5", title: "Snacks Order", date: "May 3, 2026", amount: 80, type: "debit" },
];

export default function WalletCard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Campus Wallet */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Campus Wallet</p>
              <p className="text-2xl font-bold text-foreground">
                ₹{currentUser.walletBalance}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
              Add Money
            </button>
            <button className="flex-1 py-2.5 rounded-xl bg-muted text-foreground text-sm font-medium hover:bg-accent transition-colors">
              Transfer
            </button>
          </div>
        </div>

        {/* Card Info */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Linked Card</p>
              <p className="text-lg font-bold text-foreground">**** 4521</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-muted">
            <span className="text-sm text-muted-foreground">Card Status</span>
            <span className="text-sm font-semibold text-success">Active</span>
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">
          Recent Transactions
        </h3>
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-3 rounded-xl bg-muted"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    tx.type === "credit"
                      ? "bg-success/10 text-success"
                      : "bg-destructive/10 text-destructive"
                  }`}
                >
                  {tx.type === "credit" ? (
                    <ArrowDownRight className="w-4 h-4" />
                  ) : (
                    <ArrowUpRight className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {tx.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{tx.date}</p>
                </div>
              </div>
              <span
                className={`text-sm font-semibold ${
                  tx.type === "credit" ? "text-success" : "text-destructive"
                }`}
              >
                {tx.type === "credit" ? "+" : "-"}₹{tx.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
