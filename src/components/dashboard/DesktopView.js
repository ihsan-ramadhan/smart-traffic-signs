"use client";
import Link from "next/link";
import { Trophy, Star, ArrowRight, MapPin, Lock, Activity } from "lucide-react";
import { QRCodeSVG } from 'qrcode.react'; 
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function DesktopView() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [scans, setScans] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', currentUser.id)
          .single();
        if (profileData) setProfile(profileData);

        const { data: scanData } = await supabase
          .from('scans')
          .select(`
            id,
            points_earned,
            created_at,
            sign_locations (
              rambu_type,
              location_name
            )
          `)
          .eq('user_id', currentUser.id)
          .order('created_at', { ascending: false })
          .limit(5);
        
        if (scanData) setScans(scanData);
      }
      setLoading(false);
    }
    getData();
  }, []);

  const isLoggedIn = !!user;
  const name = isLoggedIn ? user.user_metadata.full_name : "Tamu";
  
  const xp = profile?.xp || 0;
  const levelName = profile?.level_name || "Pemula";
  const levelNum = profile?.level_number || 1;

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
                  Selamat Pagi, {loading ? "..." : name}!
                </h1>
                <p className="text-gray-500 max-w-2xl leading-relaxed text-sm">
                  {isLoggedIn 
                    ? "Siap berpetualang? Ayo jelajahi dan cari rambu-rambu." 
                    : "Masuk akun untuk mulai mengumpulkan poin dan naik level."}
                </p>
                
                <div className="flex gap-8 mt-6">
                   <div className="flex items-center gap-3 pr-8 border-r border-gray-100">
                      <div className="p-2 bg-yellow-50 rounded-lg text-yellow-600">
                         <Star size={20} fill="currentColor" />
                      </div>
                      <div>
                         <p className="text-[10px] text-gray-400 font-bold uppercase">Total Poin</p>
                         <p className="text-xl font-bold text-gray-900">
                            {isLoggedIn ? xp.toLocaleString() : "0"} <span className="text-xs font-normal text-gray-400">XP</span>
                         </p>
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                         <Trophy size={20} />
                      </div>
                      <div>
                         <p className="text-[10px] text-gray-400 font-bold uppercase">Peringkat</p>
                         <p className="text-xl font-bold text-gray-900">
                            {isLoggedIn ? "#-" : "-"}
                         </p>
                      </div>
                   </div>
                </div>
              </div>

              <div className="bg-gray-900 text-white p-4 rounded-xl flex items-center gap-4 shadow-lg transform transition hover:-translate-y-1">
                 <div className="text-right">
                    <h3 className="font-bold text-sm">Mode Lapangan</h3>
                    <p className="text-gray-400 text-[10px]">Scan untuk buka di HP</p>
                 </div>
                 <div className="bg-white p-1.5 rounded-lg">
                    <QRCodeSVG value="https://rambupintar.vercel.app" size={60} />
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
                       scans.length > 0 ? (
                         scans.map((scan) => (
                           <div key={scan.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-50 hover:bg-gray-50 hover:border-gray-200 transition cursor-pointer group">
                               <div className="flex items-center gap-4">
                                 <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition">
                                    {scan.sign_locations?.rambu_type === 'Larangan' ? '⛔' : '⚠️'}
                                 </div>
                                 <div>
                                   <h4 className="font-bold text-gray-800">{scan.sign_locations?.rambu_type || "Rambu Misterius"}</h4>
                                   <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                      <MapPin size={12} />
                                      <span>{scan.sign_locations?.location_name || "Lokasi tidak terdeteksi"}</span>
                                      <span>•</span>
                                      <span>{new Date(scan.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                                   </div>
                                 </div>
                               </div>
                               <div className="text-sm font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-lg border border-green-100">
                                 +{scan.points_earned} XP
                               </div>
                           </div>
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
                     <div className="flex items-center justify-between text-sm">
                        <span className="font-bold text-gray-400">1</span>
                        <div className="flex items-center gap-2 flex-1 ml-3">
                           <div className="w-6 h-6 bg-blue-100 rounded-full"></div>
                           <span className="font-medium">Dilan</span>
                        </div>
                        <span className="font-bold text-orange-600">2400</span>
                     </div>
                     <div className="flex items-center justify-between text-sm">
                        <span className="font-bold text-gray-400">2</span>
                        <div className="flex items-center gap-2 flex-1 ml-3">
                           <div className="w-6 h-6 bg-pink-100 rounded-full"></div>
                           <span className="font-medium">Milea</span>
                        </div>
                        <span className="font-bold text-orange-600">2150</span>
                     </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
    </div>
  );
}