"use client";
import dynamic from "next/dynamic";
import { ScanLine } from "lucide-react";

const QrScanner = dynamic(() => import("@/components/QrScanner"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] gap-3 bg-gray-50">
      <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-primary animate-pulse">
        <ScanLine size={32} />
      </div>
      <p className="text-gray-500 text-sm">Memuat scanner...</p>
    </div>
  ),
});

export default function ScanQrPage() {
  return <QrScanner />;
}
