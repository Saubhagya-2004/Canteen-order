"use client";

import { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Download, Share2, X } from "lucide-react";

interface QRCodeCardProps {
  token?: string;
  onClose?: () => void;
}

export default function QRCodeCard({ token = "A102", onClose }: QRCodeCardProps) {
  const [showQR, setShowQR] = useState(true);
  const qrRef = useRef<HTMLDivElement>(null);

  if (!showQR) return null;

  const qrValue = `https://campusbite.canteen/order/${token}`;

  const handleDownload = () => {
    const svg = qrRef.current?.querySelector("svg");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const a = document.createElement("a");
      a.download = `campusbite-token-${token}.png`;
      a.href = canvas.toDataURL("image/png");
      a.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  const handleShare = async () => {
    const shareData = {
      title: "CampusBite Order Token",
      text: `My order token is #${token}. Pickup at the canteen counter.`,
      url: qrValue,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(`${shareData.text} ${qrValue}`);
      alert("Token link copied to clipboard!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-foreground">Your QR Token</h3>
          <button
            onClick={() => {
              setShowQR(false);
              onClose?.();
            }}
            className="p-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col items-center">
          <div ref={qrRef} className="bg-white rounded-2xl p-4 mb-4">
            <QRCodeSVG
              value={qrValue}
              size={192}
              bgColor="#ffffff"
              fgColor="#000000"
              level="H"
              includeMargin={false}
            />
          </div>

          <p className="text-sm text-muted-foreground mb-1">Token Number</p>
          <p className="text-2xl font-bold text-foreground mb-1">#{token}</p>
          <p className="text-xs text-muted-foreground mb-6">
            Show this at the counter to collect your order
          </p>

          <div className="flex gap-2 w-full">
            <button
              onClick={handleDownload}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-muted text-foreground text-sm font-medium hover:bg-accent transition-colors"
            >
              <Download className="w-4 h-4" />
              Save
            </button>
            <button
              onClick={handleShare}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
