"use client";
import { useEffect, useState, use } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { ChevronLeft, AlertTriangle, Star, Trophy, Info } from "lucide-react";
import dynamic from "next/dynamic";
import { useAuth } from "@/context/AuthContext";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

export default function HalamanScan({ params }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const { user, profile } = useAuth();
  
  const [rambu, setRambu] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("traffic_signs")
        .select("*")
        .eq("id", id)
        .single();
      
      if (data) setRambu(data);
      setLoading(false);
    }
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-primary text-white gap-4">
        <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
        <p className="font-medium animate-pulse">Menyiapkan Edukasi...</p>
      </div>
    );
  }

  if (!rambu) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6 text-red-500">
          <AlertTriangle size={48} />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Rambu Tidak Ditemukan</h2>
        <p className="text-gray-500 text-sm mb-8">Maaf, data rambu yang kamu cari tidak tersedia di sistem kami.</p>
        <Link href="/" className="px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 active:scale-95 transition">
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 min-h-[calc(100vh-4rem)] pb-12">
      
      {/* Integrated Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-6 md:px-10 py-6">
           <div className="flex flex-row items-center justify-between gap-4">
             <div className="flex items-center gap-4 min-w-0">
                <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition active:scale-95 text-gray-400 shrink-0">
                  <ChevronLeft size={20} />
                </Link>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-blue-50 text-primary border border-blue-100">
                      MISI BERHASIL
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-orange-400 text-white">
                      +{rambu.points || 10} XP
                    </span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight truncate">
                    {rambu.name}
                  </h1>
                </div>
             </div>
             
             <div className="hidden sm:block text-xs font-bold text-gray-400 uppercase tracking-widest">
               {rambu.category || "Umum"}
             </div>
           </div>
        </div>
      </div>

      <div className="w-full px-6 md:px-10 py-8">
        <div className="flex flex-col gap-8 w-full">
          
          {/* Main Content: Full-Width Animation on Top */}
          <div className="w-full">
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8 w-full aspect-video md:aspect-[2.5/1] flex items-center justify-center overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/20 to-white opacity-40"></div>
              
              <div className="w-full h-full relative z-10 flex items-center justify-center max-w-sm md:max-w-lg lg:max-w-2xl mx-auto">
                {rambu.animation_url ? (
                  <Player
                    autoplay
                    loop
                    src={rambu.animation_url}
                    style={{ height: '100%', width: '100%' }}
                  />
                ) : (
                  <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center text-gray-300">
                    <Star size={64} />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Details Section: Side-by-Side on Desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col">
              <div className="flex items-center gap-2 text-gray-900 mb-4 font-bold text-lg tracking-tight">
                <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                Arti Rambu
              </div>
              <p className="text-gray-600 leading-relaxed text-base flex-grow">
                {rambu.description || "Informasi deskripsi rambu membantu pengguna jalan untuk memahami peraturan dan petunjuk demi keselamatan bersama."}
              </p>
            </div>

            <div className="bg-orange-50/50 p-8 rounded-3xl border border-orange-100/50 relative overflow-hidden group flex flex-col">
               <div className="absolute top-0 right-0 w-24 h-24 bg-orange-100/20 rounded-bl-[4rem] -mr-8 -mt-8"></div>
               
               <div className="flex items-center gap-2 text-orange-900 mb-4 font-bold text-lg tracking-tight relative z-10">
                <div className="w-1.5 h-6 bg-orange-400 rounded-full"></div>
                Fakta Menarik
              </div>
              
              <div className="relative z-10 flex-grow">
                <p className="text-orange-900/70 text-base italic font-medium leading-relaxed">
                  {rambu.fun_fact || "Setiap rambu dirancang agar kita semua sampai di tujuan dengan selamat!"}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full">
             <Link href="/scan-qr" className="flex-grow py-4 bg-primary text-white font-bold rounded-2xl text-center shadow-lg shadow-blue-500/20 active:scale-95 transition">
               Scan Lagi
             </Link>
             <Link href="/koleksi" className="flex-grow py-4 bg-white border border-gray-200 text-gray-700 font-bold rounded-2xl text-center hover:bg-gray-50 transition active:scale-95">
               Kembali ke Koleksi
             </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
