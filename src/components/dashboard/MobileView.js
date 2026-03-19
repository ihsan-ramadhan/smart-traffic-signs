"use client";
import Link from "next/link";
import { MapPin, Trophy, Star, ChevronRight, Lock, User, LogOut, Activity, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/context/AuthContext";

export default function MobileView() {
  const { user, profile, loading } = useAuth();
  const [scans, setScans] = useState([]);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  useEffect(() => {
    async function getData() {
      if (user) {
        const { data: scanData } = await supabase
          .from('scans')
          .select(`
            id,
            points_earned,
            created_at,
            sign_locations (
              location_name,
              traffic_signs (
                id,
                name,
                category
              )
            )
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5);
        
        if (scanData) setScans(scanData);
      }
    }
    getData();
  }, [user]);

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  const isLoggedIn = !!user;
  const name = isLoggedIn ? user.user_metadata.full_name : "Tamu";
  const avatar = isLoggedIn ? user.user_metadata.avatar_url : null;
  const initial = name.charAt(0).toUpperCase();

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
                    {loading ? "..." : name}
                  </h1>
                  <button 
                    onClick={handleLogoutClick}
                    className="flex items-center gap-1 text-xs text-blue-200 hover:text-white transition-colors mt-1 active:scale-95"
                  >
                    <LogOut size={12} />
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
            
            <div className={`w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden flex items-center justify-center ${isLoggedIn ? 'bg-accent' : 'bg-gray-200'}`}>
              {isLoggedIn ? (
                 avatar ? (
                    <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
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
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl flex-1 border border-white/30 flex flex-col justify-center">
              <div className="flex items-center gap-1 mb-1">
                <Star size={14} className="text-yellow-300" fill="currentColor" />
                <p className="text-xs text-blue-100">Total Poin</p>
              </div>
              <p className="font-bold text-xl">
                 {isLoggedIn ? xp.toLocaleString() : "0"} <span className="text-xs font-normal opacity-80">XP</span>
              </p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl flex-1 border border-white/30 flex flex-col justify-center">
               <div className="flex items-center gap-1 mb-1">
                <Trophy size={14} className="text-yellow-300" />
                <p className="text-xs text-blue-100">Level {isLoggedIn ? levelNum : "1"}</p>
              </div>
              <p className="font-bold text-xl">{isLoggedIn ? levelName : "Pemula"}</p>
            </div>
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
                  scans.length > 0 ? (
                    scans.map((scan) => (
                      <div key={scan.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition shadow-sm">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-2xl shadow-inner">
                          {scan.sign_locations?.traffic_signs?.category === 'Larangan' ? '⛔' : 
                           scan.sign_locations?.traffic_signs?.category === 'Peringatan' ? '⚠️' : 
                           scan.sign_locations?.traffic_signs?.category === 'Perintah' ? '🔵' : '🚥'}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                             <h4 className="font-bold text-gray-800 text-sm capitalize">
                                {scan.sign_locations?.traffic_signs?.name || "Rambu Misterius"}
                             </h4>
                             <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">+{scan.points_earned} XP</span>
                          </div>
                          <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                             <MapPin size={10} />
                             {scan.sign_locations?.location_name || "Lokasi tidak terdeteksi"}
                          </p>
                          <p className="text-[10px] text-gray-400 mt-1">
                             {new Date(scan.created_at).toLocaleDateString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
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

        {isLogoutModalOpen && (
           <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="bg-white rounded-2xl p-6 w-full max-w-xs shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
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
                          onClick={() => setIsLogoutModalOpen(false)}
                          className="flex-1 py-3 px-4 rounded-xl font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition active:scale-95 text-sm"
                       >
                          Batal
                       </button>
                       <button 
                          onClick={confirmLogout}
                          className="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/30 transition active:scale-95 text-sm"
                       >
                          Ya, Keluar
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        )}

    </div>
  );
}