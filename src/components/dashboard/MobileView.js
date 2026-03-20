"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MapPin, Trophy, Star, ChevronRight, Lock, User, Activity } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useDashboardData } from "@/hooks/useDashboardData";
import { useState } from "react";
import LogoutModal from "@/components/ui/LogoutModal";
import StatCard from "@/components/ui/StatCard";
import ScanHistoryItem from "@/components/ui/ScanHistoryItem";
import { supabase } from "@/lib/supabaseClient";

export default function MobileView() {
  const router = useRouter();
  const { user, profile, loading: authLoading } = useAuth();
  const { scans, loading: dataLoading } = useDashboardData(user);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = async () => {
    await supabase.auth.signOut();
    setIsLogoutModalOpen(false);
    router.refresh();
  };

  const isLoggedIn = !!user;
  const name = isLoggedIn ? user.user_metadata.full_name : "Tamu";
  const avatar = isLoggedIn ? user.user_metadata.avatar_url : null;
  const initial = name?.charAt(0).toUpperCase() || "T";

  const xp = profile?.xp || 0;
  const levelName = profile?.level_name || "Pemula";
  const levelNum = profile?.level_number || 1;

  return (
    <div className="w-full max-w-md mx-auto bg-white min-h-[calc(100vh-6rem)] shadow-2xl overflow-hidden relative">
        
        <div className="bg-primary text-white p-6 rounded-b-[2.5rem] shadow-lg pb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
          
          <div className="flex justify-between items-center mb-6 relative z-10">
            <div>
              <p className="text-blue-100 text-xs uppercase tracking-wider mb-1">Selamat Pagi,</p>
              
              {isLoggedIn ? (
                <div>
                  <h1 className="text-xl font-bold truncate max-w-[200px]">
                    {authLoading ? "..." : name}
                  </h1>
                  <button 
                    onClick={handleLogoutClick}
                    className="flex items-center gap-1 text-xs text-blue-200 hover:text-white transition-colors mt-1 active:scale-95 cursor-pointer"
                  >
                    <span>Keluar Akun</span>
                  </button>
                </div>
              ) : (
                <Link href="/login" className="group cursor-pointer block">
                   <div className="flex items-center gap-1">
                     <h1 className="text-xl font-bold">Tamu</h1>
                     <ChevronRight size={18} className="opacity-50 group-hover:translate-x-1 transition-transform"/>
                   </div>
                   <p className="text-xs text-blue-200 group-hover:text-white transition-colors flex items-center gap-1">
                     Ketuk untuk masuk akun
                   </p>
                </Link>
              )}
            </div>
            
            <div className={`w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden relative flex items-center justify-center ${isLoggedIn ? 'bg-accent' : 'bg-gray-200'}`}>
              {isLoggedIn ? (
                 avatar ? (
                    <Image src={avatar} alt="Profile" fill className="object-cover" />
                 ) : (
                    <span className="text-yellow-900 font-bold text-sm">{initial}</span>
                 )
              ) : (
                 <Link href="/login" className="flex items-center justify-center w-full h-full hover:bg-gray-300 transition">
                    <User size={20} className="text-gray-500" />
                 </Link>
              )}
            </div>
          </div>

          <div className="flex gap-3 relative z-10">
            <StatCard 
              icon={Star} 
              label="Total Poin" 
              value={isLoggedIn ? xp.toLocaleString() : "0"} 
              unit="XP" 
              colorClass="bg-white/20 backdrop-blur-sm border-white/30"
              iconColorClass="text-yellow-300"
            />
            <StatCard 
              icon={Trophy} 
              label={`Level ${isLoggedIn ? levelNum : "1"}`} 
              value={isLoggedIn ? levelName : "Pemula"} 
              colorClass="bg-white/20 backdrop-blur-sm border-white/30"
              iconColorClass="text-yellow-300"
            />
          </div>
        </div>

        <div className="px-6 -mt-10 relative z-20 space-y-6 pb-6">
          
          <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
            {isLoggedIn ? (
                <>
                  <div className="flex justify-between items-end mb-2">
                    <h3 className="font-bold text-gray-800">Misi Hari Ini 🎯</h3>
                    <span className="text-xs font-bold text-primary bg-blue-50 px-2 py-1 rounded-md border border-blue-100">
                      2/5 Rambu
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                    Temukan 5 rambu peringatan lagi untuk bonus poin!
                  </p>
                  <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-primary h-full rounded-full w-[40%] shadow-[0_0_10px_rgba(37,99,235,0.5)]"></div>
                  </div>
                </>
            ) : (
                <div className="text-center py-2 flex flex-col items-center justify-center gap-3">
                   <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                      <Lock size={20} />
                   </div>
                   <div>
                     <h3 className="font-bold text-gray-800 text-sm">Misi Harian Terkunci</h3>
                     <p className="text-xs text-gray-500 mt-1 max-w-[200px] mx-auto">
                        Masuk akun untuk membuka misi dan simpan progress poinmu.
                     </p>
                   </div>
                   <Link href="/login" className="bg-primary hover:bg-primary-hover text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-95">
                      Masuk Sekarang
                   </Link>
                </div>
            )}
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
               {isLoggedIn ? (
                  dataLoading ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="h-20 bg-gray-50 rounded-xl animate-pulse"></div>
                      ))}
                    </div>
                  ) : scans.length > 0 ? (
                    scans.map((scan) => (
                      <ScanHistoryItem key={scan.id} scan={scan} />
                    ))
                  ) : (
                    <div className="p-6 text-center text-xs text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200 flex flex-col items-center gap-2">
                       <Activity size={24} className="opacity-20" />
                       <p>Belum ada riwayat scan.</p>
                    </div>
                  )
               ) : (
                  <div className="p-4 text-center text-xs text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                     Belum ada riwayat. Login untuk mulai scan.
                  </div>
               )}
            </div>
          </div>

        </div>

        <LogoutModal 
          isOpen={isLogoutModalOpen}
          onClose={() => setIsLogoutModalOpen(false)}
          onConfirm={confirmLogout}
        />

    </div>
  );
}