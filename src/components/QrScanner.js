"use client";
import Link from "next/link";
import { Copy, ScanLine, Smartphone } from "lucide-react";
import { useEffect, useState } from "react";

export default function QrScanner() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  if (!isMobile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] bg-gray-50 p-6">
        <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center">
          <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Smartphone size={48} className="text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Fitur Khusus HP</h2>
          <p className="text-gray-500 text-sm mb-8 leading-relaxed">
            Kamera scanner hanya tersedia di perangkat mobile. Buka RambuPintar di HP kamu untuk mulai mencari rambu!
          </p>

          <Link href="/" className="block w-full py-3.5 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl transition active:scale-95">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-6rem)] bg-gray-50 pt-8 px-4 pb-6">
      <div className="w-full max-w-sm">
        
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-primary rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <ScanLine size={12} />
            Mode Scan
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Scan Rambu</h1>
          <p className="text-gray-500 text-sm mt-1">
            Arahkan kamera ke QR code yang ada di rambu.
          </p>
        </div>

        <div className="bg-gray-900 rounded-3xl overflow-hidden shadow-2xl mb-6 relative flex flex-col items-center justify-center" style={{ minHeight: 350 }}>
          <div className="w-56 h-56 border-2 border-dashed border-white/40 rounded-3xl flex items-center justify-center">
             <ScanLine size={48} className="text-white/30" />
          </div>
          <p className="absolute bottom-6 text-white/60 text-sm">Kamera bersiap...</p>
        </div>
      </div>
    </div>
  );
}
