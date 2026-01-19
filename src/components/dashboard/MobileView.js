import Link from "next/link";
import { MapPin, Trophy, Star } from "lucide-react";

export default function MobileView() {
  return (
    <div className="w-full max-w-md mx-auto bg-white min-h-screen shadow-2xl overflow-hidden relative pb-24">
        
        <div className="bg-primary text-white p-6 rounded-b-[2.5rem] shadow-lg pb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
          
          <div className="flex justify-between items-center mb-6 relative z-10">
            <div>
              <p className="text-blue-100 text-xs uppercase tracking-wider mb-1">Selamat Pagi,</p>
              <h1 className="text-2xl font-bold">Mahasiswa Teladan</h1>
            </div>
            <div className="w-10 h-10 bg-accent/50 rounded-full flex items-center justify-center border border-accent text-yellow-800 text-xs font-bold">
              MT
            </div>
          </div>

          <div className="flex gap-3 relative z-10">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl flex-1 border border-white/30 flex flex-col justify-center">
              <div className="flex items-center gap-1 mb-1">
                <Star size={14} className="text-yellow-300" fill="currentColor" />
                <p className="text-xs text-blue-100">Total Poin</p>
              </div>
              <p className="font-bold text-xl">1,250 <span className="text-xs font-normal opacity-80">XP</span></p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl flex-1 border border-white/30 flex flex-col justify-center">
               <div className="flex items-center gap-1 mb-1">
                <Trophy size={14} className="text-yellow-300" />
                <p className="text-xs text-blue-100">Level 5</p>
              </div>
              <p className="font-bold text-xl">Explorer</p>
            </div>
          </div>
        </div>

        <div className="px-6 -mt-10 relative z-20 space-y-6">
          
          <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
            <div className="flex justify-between items-end mb-2">
              <h3 className="font-bold text-gray-800">Misi Hari Ini 🎯</h3>
              <span className="text-xs font-bold text-primary bg-blue-50 px-2 py-1 rounded-md border border-blue-100">
                2/5 Rambu
              </span>
            </div>
            <p className="text-xs text-gray-500 mb-3 leading-relaxed">
              Temukan 3 rambu peringatan lagi untuk bonus poin!
            </p>
            <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
              <div className="bg-primary h-full rounded-full w-[40%] shadow-[0_0_10px_rgba(37,99,235,0.5)]"></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <Link href="/peta" className="group bg-green-50 p-4 rounded-2xl border border-green-100 flex flex-col gap-3 active:scale-95 transition hover:shadow-md">
                <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm text-green-600 group-hover:scale-110 transition">
                  <MapPin size={20} />
                </div>
                <span className="font-bold text-green-900 text-sm leading-tight">Cari Rambu<br/>Terdekat</span>
             </Link>
             
             <Link href="/leaderboard" className="group bg-orange-50 p-4 rounded-2xl border border-orange-100 flex flex-col gap-3 active:scale-95 transition hover:shadow-md">
                <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm text-orange-600 group-hover:scale-110 transition">
                  <Trophy size={20} />
                </div>
                <span className="font-bold text-orange-900 text-sm leading-tight">Lihat<br/>Peringkat</span>
             </Link>
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-gray-800">Riwayat Scan</h3>
              <Link href="/koleksi" className="text-xs text-primary font-medium hover:underline">Lihat Semua</Link>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl shadow-inner">⛔</div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">Dilarang Masuk</h4>
                  <p className="text-xs text-gray-400">Jl. Ganesha • 2 jam lalu</p>
                </div>
              </div>
               <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl shadow-inner">🅿️</div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">Tempat Parkir</h4>
                  <p className="text-xs text-gray-400">Jl. Dago • 5 jam lalu</p>
                </div>
              </div>
            </div>
          </div>

        </div>
    </div>
  );
}