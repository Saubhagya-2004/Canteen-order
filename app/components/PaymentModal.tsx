"use client";

import { X, CreditCard, Wallet, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { currentUser } from "@/app/lib/data";

interface PaymentModalProps {
  amount: number;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function PaymentModal({
  amount,
  onClose,
  onSuccess,
}: PaymentModalProps) {
  const [method, setMethod] = useState<"wallet" | "card">("wallet");
  const [step, setStep] = useState<"select" | "confirm" | "success">("select");

  const handlePay = () => {
    if (step === "select") {
      setStep("confirm");
    } else if (step === "confirm") {
      setStep("success");
      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-foreground">
            {step === "success" ? "Payment Successful" : "Payment"}
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === "success" ? (
          <div className="flex flex-col items-center py-6">
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-success" />
            </div>
            <p className="text-lg font-semibold text-foreground mb-1">
              Payment Successful!
            </p>
            <p className="text-sm text-muted-foreground">
              ₹{amount} paid via {method === "wallet" ? "Campus Wallet" : "Card"}
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-3 mb-6">
              <button
                onClick={() => setMethod("wallet")}
                className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-colors ${
                  method === "wallet"
                    ? "border-primary bg-primary/5"
                    : "border-border bg-muted"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    method === "wallet"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Wallet className="w-5 h-5" />
                </div>
                <div className="text-left flex-1">
                  <p className="text-sm font-medium text-foreground">
                    Campus Wallet
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Balance: ₹{currentUser.walletBalance}
                  </p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    method === "wallet"
                      ? "border-primary"
                      : "border-muted-foreground"
                  }`}
                >
                  {method === "wallet" && (
                    <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                  )}
                </div>
              </button>

              <button
                onClick={() => setMethod("card")}
                className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-colors ${
                  method === "card"
                    ? "border-primary bg-primary/5"
                    : "border-border bg-muted"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    method === "card"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                </div>
                <div className="text-left flex-1">
                  <p className="text-sm font-medium text-foreground">Card</p>
                  <p className="text-xs text-muted-foreground">**** 4521</p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    method === "card"
                      ? "border-primary"
                      : "border-muted-foreground"
                  }`}
                >
                  {method === "card" && (
                    <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                  )}
                </div>
              </button>
            </div>

            {step === "confirm" && (
              <div className="p-4 rounded-xl bg-muted mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Amount</span>
                  <span className="text-sm font-semibold text-foreground">
                    ₹{amount}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Method</span>
                  <span className="text-sm font-semibold text-foreground">
                    {method === "wallet" ? "Campus Wallet" : "Card"}
                  </span>
                </div>
              </div>
            )}

            <button
              onClick={handlePay}
              disabled={method === "wallet" && currentUser.walletBalance < amount}
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {step === "select" ? "Continue" : `Pay ₹${amount}`}
            </button>

            {method === "wallet" && currentUser.walletBalance < amount && (
              <p className="text-xs text-destructive text-center mt-2">
                Insufficient wallet balance
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
