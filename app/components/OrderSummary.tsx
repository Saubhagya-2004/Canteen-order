"use client";

import { useState } from "react";
import {
  Minus,
  Plus,
  Trash2,
  ChevronDown,
  FileText,
  CreditCard,
  QrCode,
} from "lucide-react";
import { cn } from "@/app/lib/utils";
import { currentUser } from "@/app/lib/data";
import { useCart } from "@/app/context/CartContext";
import PaymentModal from "./PaymentModal";
import QRCodeCard from "./QRCodeCard";

export default function OrderSummary() {
  const { items, removeItem, updateQuantity, total } = useCart();
  const [pickupTime, setPickupTime] = useState("12:45 PM");
  const [orderStatus] = useState<"preparing" | "ready" | "picked-up">("preparing");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const pickupTimes = ["12:30 PM", "12:45 PM", "1:00 PM", "1:15 PM", "1:30 PM"];

  const subTotal = total;
  const productDiscount = items.length > 0 ? 20 : 0;
  const extraDiscount = 0;
  const couponDiscount = 0;
  const finalTotal = subTotal - productDiscount - extraDiscount - couponDiscount;

  return (
    <div className="w-full xl:w-80 bg-card border border-border rounded-2xl p-5 flex flex-col h-fit">
      {/* Search existing */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search in Existing"
          className="w-full pl-3 pr-3 py-2 rounded-xl bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Dining / Table */}
      <div className="flex gap-2 mb-4">
        <select className="flex-1 py-2 px-3 rounded-xl bg-muted border border-border text-sm text-foreground focus:outline-none">
          <option>Select Dining</option>
          <option>Dine In</option>
          <option>Takeaway</option>
        </select>
        <select className="flex-1 py-2 px-3 rounded-xl bg-muted border border-border text-sm text-foreground focus:outline-none">
          <option>Select Table</option>
          <option>Table 1</option>
          <option>Table 2</option>
        </select>
      </div>

      {/* Token */}
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-semibold text-foreground">Token #A102</span>
      </div>

      {/* Cart Items */}
      <div className="space-y-3 mb-4 max-h-48 overflow-y-auto scrollbar-hide">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            Your cart is empty
          </p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 rounded-xl bg-muted"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground truncate">
                  {item.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  ₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-6 h-6 rounded-md bg-card border border-border flex items-center justify-center text-foreground hover:bg-accent"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-sm font-semibold w-4 text-center text-foreground">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-6 h-6 rounded-md bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90"
                >
                  <Plus className="w-3 h-3" />
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className="ml-1 p-1 text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pickup Timing */}
      <div className="mb-4">
        <p className="text-sm font-semibold text-foreground mb-2">Pickup Timing</p>
        <div className="relative">
          <select
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            className="w-full py-2.5 px-3 rounded-xl bg-muted border border-border text-sm text-foreground focus:outline-none appearance-none"
          >
            {pickupTimes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      {/* Order Status */}
      <div className="mb-4">
        <p className="text-sm font-semibold text-foreground mb-2">Order Status</p>
        <div className="flex items-center gap-1">
          {(["preparing", "ready", "picked-up"] as const).map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={cn(
                  "flex-1 py-2 rounded-lg text-center text-xs font-medium capitalize transition-colors",
                  orderStatus === s
                    ? s === "preparing"
                      ? "bg-warning text-white"
                      : s === "ready"
                      ? "bg-success text-white"
                      : "bg-muted text-muted-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {s === "picked-up" ? "Picked Up" : s}
              </div>
              {i < 2 && (
                <div className="w-4 h-px bg-border mx-0.5" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Wallet/Card Balance */}
      <div className="mb-4 p-3 rounded-xl bg-muted">
        <p className="text-sm font-semibold text-foreground mb-2">
          Wallet/Card Balance
        </p>
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-muted-foreground">Campus Wallet:</span>
          <span className="text-sm font-semibold text-foreground">
            ₹{currentUser.walletBalance}
          </span>
        </div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-muted-foreground">Sub total :</span>
          <span className="text-sm text-foreground">₹{subTotal}</span>
        </div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-muted-foreground">Product Discount :</span>
          <span className="text-sm text-destructive">-₹{productDiscount}</span>
        </div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-muted-foreground">Extra discount :</span>
          <span className="text-sm text-muted-foreground">₹{extraDiscount.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Coupon discount :</span>
          <span className="text-sm text-muted-foreground">₹{couponDiscount.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="text-sm font-bold text-foreground">Total :</span>
          <span className="text-sm font-bold text-foreground">₹{finalTotal}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-muted border border-border text-sm font-medium text-foreground hover:bg-accent transition-colors">
          <FileText className="w-4 h-4" />
          Draft
        </button>
        <button
          onClick={() => setShowPaymentModal(true)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <CreditCard className="w-4 h-4" />
          Pay & Confirm
        </button>
      </div>
      <button
        onClick={() => setShowQR(true)}
        className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-success text-white text-sm font-medium hover:bg-success/90 transition-colors"
      >
        <QrCode className="w-4 h-4" />
        Generate QR Token
      </button>

      {showPaymentModal && (
        <PaymentModal
          amount={finalTotal}
          onClose={() => setShowPaymentModal(false)}
        />
      )}

      {showQR && (
        <QRCodeCard
          token="A102"
          onClose={() => setShowQR(false)}
        />
      )}
    </div>
  );
}
