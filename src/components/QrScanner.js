"use client";
import Link from "next/link";
import { Copy, ScanLine, Smartphone, Camera, XCircle } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

export default function QrScanner() {
  const [isMobile, setIsMobile] = useState(true);
  const [scanState, setScanState] = useState("idle");
  const [cameraError, setCameraError] = useState(false);
  
  const html5QrcodeRef = useRef(null);
  const isScanningRef = useRef(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (scanState !== "scanning") return;

    const qrScanner = new Html5Qrcode("qr-reader");
    html5QrcodeRef.current = qrScanner;
    isScanningRef.current = false;

    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      aspectRatio: 1.0,
    };

    qrScanner
      .start(
        { facingMode: "environment" },
        config,
        async (decodedText) => {
          if (isScanningRef.current) return;
          isScanningRef.current = true;

          try {
            await qrScanner.stop();
          } catch (e) {}

          alert(`QR Terdeteksi: ${decodedText}\n\n(Nanti fitur simpan ke database menyusul di commit 3)`);
          handleReset();
        },
        () => {}
      )
      .catch((err) => {
        console.error("Camera error:", err);
        setCameraError(true);
        setScanState("error");
      });

    return () => {
      qrScanner.stop().catch(() => {});
    };
  }, [scanState]);

  const handleReset = () => {
    setCameraError(false);
    isScanningRef.current = false;
    setScanState("idle");
  };

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

        {scanState === "scanning" ? (
          <div className="relative bg-black rounded-3xl overflow-hidden shadow-2xl mb-6">
            <div id="qr-reader" className="w-full" style={{ minHeight: 300 }} />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-56 h-56 border-4 border-white/70 rounded-2xl shadow-[0_0_0_9999px_rgba(0,0,0,0.45)]" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-center">
              <p className="text-white text-xs font-medium opacity-80">
                Posisikan QR di dalam kotak
              </p>
            </div>
          </div>
        ) : scanState === "error" ? (
          <div className="bg-red-50 border border-red-100 rounded-3xl mb-6 flex flex-col items-center justify-center gap-4 text-center p-6" style={{ minHeight: 300 }}>
             <XCircle size={48} className="text-red-400" />
             <div>
                <h3 className="font-bold text-red-900 mb-1">Kamera Gagal Akses</h3>
                <p className="text-red-700 text-xs">Pastikan kamu sudah memberikan izin akses kamera ke website ini.</p>
             </div>
          </div>
        ) : (
          <div className="bg-gray-900 rounded-3xl overflow-hidden shadow-2xl mb-6 flex flex-col items-center justify-center gap-4" style={{ minHeight: 300 }}>
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
              <Camera size={36} className="text-white/70" />
            </div>
            <p className="text-white/60 text-sm">Kamera belum aktif</p>
          </div>
        )}

        {scanState === "idle" || scanState === "error" ? (
          <button
            onClick={() => setScanState("scanning")}
            className="w-full py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-2xl shadow-lg shadow-blue-500/25 transition active:scale-95 flex items-center justify-center gap-2 text-base"
          >
            <ScanLine size={22} />
            {scanState === "error" ? "Coba Lagi" : "Mulai Scan"}
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="w-full py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-2xl transition active:scale-95 text-base"
          >
            Batal
          </button>
        )}
        
      </div>
    </div>
  );
}
