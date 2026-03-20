"use client";
import Link from "next/link";
import Image from "next/image";
import { Trophy, Star, ArrowRight, MapPin, Lock, Activity } from "lucide-react";
import { QRCodeSVG } from 'qrcode.react'; 
import { useAuth } from "@/context/AuthContext";
import { useDashboardData } from "@/hooks/useDashboardData";
import StatCard from "@/components/ui/StatCard";
import ScanHistoryItem from "@/components/ui/ScanHistoryItem";

export default function DesktopView() {
  const { user, profile, loading: authLoading } = useAuth();
  const { scans, leaderboard, loading: dataLoading } = useDashboardData(user);

  const isLoggedIn = !!user;
  const name = isLoggedIn ? user.user_metadata.full_name : "Tamu";
  
  const xp = profile?.xp || 0;
  const levelName = profile?.level_name || "Pemula";
  const levelNum = profile?.level_number || 1;

  const getInitial = (str) => str ? str.charAt(0).toUpperCase() : "?";

  return (
    <div className="w-full">
        
        <div className="bg-white border-b border-gray-200">
          <div className="w-full px-6 md:px-10 py-8">
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center gap-3 mb-2">
                   <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 ${isLoggedIn ? 'bg-blue-50 text-primary' : 'bg-gray-100 text-gray-500'}`}>
                     <Trophy size={12} className="mb-[1px]" /> 
                     {isLoggedIn ? `Level ${levelNum} ${levelName}` : "Level 1 Pemula"}
                   </span>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Selamat Pagi, {authLoading ? "..." : name}!
                </h1>
                <p className="text-gray-500 max-w-2xl leading-relaxed text-sm">
                  {isLoggedIn 
                    ? "Siap berpetualang? Ayo jelajahi dan cari rambu-rambu." 
                    : "Masuk akun untuk mulai mengumpulkan poin dan naik level."}
                </p>
                
                <div className="flex gap-8 mt-6">
                   <div className="pr-8 border-r border-gray-100 min-w-[150px]">
                      <StatCard 
                        icon={Star} 
                        label="Total Poin" 
                        value={isLoggedIn ? xp.toLocaleString() : "0"} 
                        unit="XP" 
                        colorClass="bg-yellow-50/50 border-none"
                        iconColorClass="text-yellow-600"
                      />
                   </div>
                   <div className="min-w-[150px]">
                      <StatCard 
                        icon={Trophy} 
                        label="Peringkat Saya" 
                        value={isLoggedIn 
                           ? (leaderboard.findIndex(u => u.id === user?.id) !== -1 
                                ? `#${leaderboard.findIndex(u => u.id === user?.id) + 1}` 
                                : "-") 
                           : "-"} 
                        colorClass="bg-orange-50/50 border-none"
                        iconColorClass="text-orange-600"
                      />
                   </div>
                </div>
              </div>

              <div className="bg-gray-900 text-white p-4 rounded-xl flex items-center gap-4 shadow-lg transform transition hover:-translate-y-1">
                 <div className="text-right">
                    <h3 className="font-bold text-sm">Mode Lapangan</h3>
                    <p className="text-gray-400 text-[10px]">Scan untuk buka di HP</p>
                 </div>
                 <div className="bg-white p-1.5 rounded-lg">
                    <QRCodeSVG value="https://smart-traffic-signs.vercel.app/" size={60} />
                 </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full px-6 md:px-10 py-8">
          <div className="grid grid-cols-12 gap-8">
            
            <div className="col-span-8 space-y-6">
               
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
                  {isLoggedIn ? (
                    <>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                           <h3 className="font-bold text-gray-800">Misi Hari Ini 🎯</h3>
                           <p className="text-gray-500 text-sm mt-1">Temukan 3 rambu peringatan lagi untuk bonus poin!</p>
                        </div>
                        <span className="bg-blue-50 text-primary font-bold px-3 py-1 rounded-lg text-xs">
                          2/5 Rambu
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-3 mb-2">
                        <div className="bg-primary h-full rounded-full w-[40%] shadow-lg shadow-blue-500/30"></div>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-3">
                          <Lock size={24} />
                        </div>
                        <h3 className="font-bold text-gray-800">Misi Harian Terkunci</h3>
                        <p className="text-sm text-gray-500 mb-4 max-w-md">
                          Masuk akun untuk membuka misi harian dan simpan progress poinmu.
                        </p>
                        <Link href="/login" className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-lg text-sm font-bold transition">
                          Masuk Sekarang
                        </Link>
                    </div>
                  )}
               </div>

               <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 min-h-[300px]">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                        <Activity className="text-primary" size={20} />
                        <h3 className="font-bold text-gray-800">Aktivitas Terkini</h3>
                    </div>
                    <Link href="/koleksi" className="text-sm text-primary font-bold hover:underline flex items-center gap-1">
                      Lihat Semua <ArrowRight size={16} />
                    </Link>
                  </div>

                  <div className="space-y-2">
                     {isLoggedIn ? (
                       dataLoading ? (
                        <div className="space-y-4">
                          {[1, 2, 3].map(i => (
                            <div key={i} className="h-20 bg-gray-50 rounded-xl animate-pulse"></div>
                          ))}
                        </div>
                       ) : scans.length > 0 ? (
                         scans.map((scan) => (
                           <ScanHistoryItem key={scan.id} scan={scan} />
                         ))
                       ) : (
                         <div className="flex flex-col items-center justify-center h-48 text-center border-2 border-dashed border-gray-100 rounded-xl bg-gray-50">
                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-3 text-2xl">📷</div>
                            <p className="text-gray-500 font-medium">Belum ada riwayat scan.</p>
                            <p className="text-gray-400 text-xs mt-1">Gunakan HP-mu untuk mulai memindai rambu.</p>
                         </div>
                       )
                     ) : (
                       <div className="flex flex-col items-center justify-center h-48 text-center border-2 border-dashed border-gray-100 rounded-xl bg-gray-50">
                          <p className="text-gray-400 text-sm">Silakan masuk akun untuk melihat riwayat aktivitas.</p>
                          <Link href="/login" className="mt-3 text-primary text-sm font-bold hover:underline">Masuk Sekarang</Link>
                       </div>
                     )}
                  </div>
               </div>
            </div>

            <div className="col-span-4 space-y-6">
               <Link href="/peta" className="block bg-green-50 p-6 rounded-2xl border border-green-100 hover:shadow-md transition group">
                  <div className="flex items-start justify-between">
                     <div>
                        <h3 className="font-bold text-green-900">Cari Rambu Terdekat</h3>
                        <p className="text-sm text-green-700/80 mt-1">Cek lokasi di sekitarmu.</p>
                     </div>
                     <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-green-600 shadow-sm group-hover:scale-110 transition">
                        <MapPin size={20} />
                     </div>
                  </div>
               </Link>

               <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                     <Trophy size={18} className="text-orange-600" /> Peringkat
                  </h3>
                   
                  <div className="space-y-4">
                     {dataLoading ? (
                       <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map(i => (
                          <div key={i} className="h-10 bg-gray-50 rounded-lg animate-pulse"></div>
                        ))}
                       </div>
                     ) : leaderboard.length > 0 ? (
                       leaderboard.map((u, index) => (
                         <div key={u.id} className="flex items-center justify-between text-sm">
                            <span className={`font-bold w-4 text-center ${index === 0 ? 'text-yellow-500 text-lg' : index === 1 ? 'text-gray-400 text-lg' : index === 2 ? 'text-orange-700 text-lg' : 'text-gray-400'}`}>
                               {index + 1}
                            </span>
                            
                            <div className="flex items-center gap-2 flex-1 ml-3">
                               <div className="w-8 h-8 rounded-full border border-gray-200 overflow-hidden relative flex items-center justify-center text-[10px] font-bold text-gray-500 bg-gray-100">
                                  {u.avatar_url ? (
                                    <Image src={u.avatar_url} alt={u.full_name} fill className="object-cover" />
                                  ) : (
                                    getInitial(u.full_name)
                                  )}
                               </div>
                               <div className="flex flex-col">
                                  <span className={`truncate max-w-[120px] ${u.id === user?.id ? 'text-primary font-bold' : 'text-gray-700 font-medium'}`}>
                                     {u.full_name || "Tanpa Nama"}
                                  </span>
                               </div>
                            </div>
                            <span className="font-bold text-orange-600">{u.xp.toLocaleString()}</span>
                         </div>
                       ))
                     ) : (
                       <div className="text-center py-4 text-gray-400 text-xs">
                          Belum ada data peringkat.
                       </div>
                     )}
                  </div>
               </div>
            </div>

          </div>
        </div>
    </div>
  );
}