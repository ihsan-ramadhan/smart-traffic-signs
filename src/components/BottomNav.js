"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Map, ScanLine, Trophy, BookOpen } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();
  
  const navItemClass = (path) => 
    `flex flex-col items-center gap-1 transition-colors ${
      pathname === path ? "text-primary font-bold" : "text-gray-400 font-medium"
    }`;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-6 pb-6 z-50 md:hidden shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
      <div className="flex justify-between items-end">
        
        <Link href="/" className={navItemClass("/")}>
          <Home size={24} />
          <span className="text-[10px]">Home</span>
        </Link>

        <Link href="/peta" className={navItemClass("/peta")}>
          <Map size={24} />
          <span className="text-[10px]">Peta</span>
        </Link>

        {/* TOMBOL SCAN: Menggunakan bg-primary */}
        <div className="relative -top-5">
          <Link href="/scan-qr" className="bg-primary hover:bg-primary-hover text-white w-16 h-16 rounded-full shadow-xl flex flex-col items-center justify-center border-4 border-white transform active:scale-95 transition">
            <ScanLine size={28} />
          </Link>
        </div>

        <Link href="/koleksi" className={navItemClass("/koleksi")}>
          <BookOpen size={24} />
          <span className="text-[10px]">Koleksi</span>
        </Link>

        <Link href="/leaderboard" className={navItemClass("/leaderboard")}>
          <Trophy size={24} />
          <span className="text-[10px]">Rank</span>
        </Link>

      </div>
    </div>
  );
}