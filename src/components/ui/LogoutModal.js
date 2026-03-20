"use client";
import { AlertTriangle } from "lucide-react";

export default function LogoutModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle size={24} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Keluar Akun?</h3>
          <p className="text-sm text-gray-500 mb-6">
            Kamu harus login lagi nanti untuk melihat progress dan riwayat scan.
          </p>
          <div className="flex gap-3 w-full">
            <button 
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition active:scale-95 text-sm cursor-pointer"
            >
              Batal
            </button>
            <button 
              onClick={onConfirm}
              className="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/30 transition active:scale-95 text-sm cursor-pointer"
            >
              Ya, Keluar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
