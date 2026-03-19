"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { BookOpen, Lock, Loader2, Info } from "lucide-react";

export default function KoleksiPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [allSigns, setAllSigns] = useState([]);
  
  const [collectedSignIds, setCollectedSignIds] = useState(new Set());

  useEffect(() => {
    async function getData() {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      const { data: signsData } = await supabase
        .from('sign_locations')
        .select(`
          id,
          location_name,
          traffic_signs (
            name,
            category,
            points
          )
        `);

      if (signsData) {
        signsData.sort((a, b) => {
          const tsA = Array.isArray(a.traffic_signs) ? a.traffic_signs[0] : a.traffic_signs;
          const tsB = Array.isArray(b.traffic_signs) ? b.traffic_signs[0] : b.traffic_signs;
          
          const catA = tsA?.category || "";
          const catB = tsB?.category || "";
          if (catA !== catB) return catA.localeCompare(catB);
          
          const nameA = tsA?.name || "";
          const nameB = tsB?.name || "";
          return nameA.localeCompare(nameB);
        });
        setAllSigns(signsData);
      }

      if (currentUser) {
        const { data: userScans } = await supabase
          .from('scans')
          .select('location_id')
          .eq('user_id', currentUser.id);

        if (userScans && userScans.length > 0) {
          const collectedIds = new Set(
            userScans.map(scan => scan.location_id).filter(Boolean)
          );
          setCollectedSignIds(collectedIds);
        }
      }

      setLoading(false);
    }

    getData();
  }, []);

  const groupedSigns = allSigns.reduce((acc, sign) => {
    let type = "Lainnya";
    if (sign.traffic_signs) {
      if (Array.isArray(sign.traffic_signs)) {
        type = sign.traffic_signs[0]?.category || "Lainnya";
      } else {
        type = sign.traffic_signs.category || "Lainnya";
      }
    }
    
    if (!acc[type]) acc[type] = [];
    acc[type].push(sign);
    return acc;
  }, {});

  const totalCollected = collectedSignIds.size;
  const totalSigns = allSigns.length;
  const progressPercentage = totalSigns === 0 ? 0 : Math.round((totalCollected / totalSigns) * 100);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] bg-gray-50">
        <Loader2 className="animate-spin text-primary mb-2" size={32} />
        <p className="text-gray-500 text-sm">Memuat koleksi...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 min-h-[calc(100vh-4rem)] pb-12">
      
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-6 md:px-10 py-8">
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
             <div>
               <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 bg-green-50 text-green-700">
                    <BookOpen size={12} className="mb-[1px]" />
                    KOLEKSI
                  </span>
               </div>
               <h1 className="text-3xl font-bold text-gray-900 mb-2">
                 Koleksi Rambu
               </h1>
               <p className="text-gray-500 max-w-2xl leading-relaxed text-sm">
                 Temukan dan scan setiap plang rambu yang tersebar untuk melengkapi koleksimu.
               </p>
             </div>
             
             <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl w-full md:w-64 shrink-0 mt-2 md:mt-0">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Progress</span>
                  <span className="text-lg font-bold text-gray-900">{totalCollected} <span className="text-sm text-gray-400 font-medium">/ {totalSigns}</span></span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className="bg-green-500 h-full rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
             </div>
           </div>
        </div>
      </div>

      <div className="w-full px-6 md:px-10 py-8">
        {!user && (
          <div className="mb-8 p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-start gap-3">
             <Info size={20} className="text-primary mt-0.5 shrink-0" />
             <p className="text-sm text-blue-900 leading-relaxed">
               Kamu sedang melihat koleksi sebagai <span className="font-bold">Tamu</span>. Login untuk menyimpan progress rambu yang sudah kamu temukan.
             </p>
          </div>
        )}

        <div className="space-y-10">
          {Object.entries(groupedSigns).map(([type, signs]) => {
             const collectedInType = signs.filter(s => collectedSignIds.has(s.id)).length;
             
             let typeColor = "bg-primary text-white";
             let icon = "🚥";
             
             if (type === "Larangan") { typeColor = "bg-red-500 text-white"; icon = "⛔"; }
             else if (type === "Peringatan") { typeColor = "bg-yellow-400 text-yellow-900"; icon = "⚠️"; }
             else if (type === "Perintah") { typeColor = "bg-blue-500 text-white"; icon = "🔵"; }
             else if (type === "Petunjuk") { typeColor = "bg-green-500 text-white"; icon = "🟩"; }
            
             return (
               <div key={type} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center justify-between mb-4">
                     <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm shadow-sm ${typeColor}`}>
                           {icon}
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">{type}</h2>
                     </div>
                     <span className="text-sm font-bold text-gray-400">
                        {collectedInType} / {signs.length}
                     </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                     {signs.map((sign) => {
                       const isCollected = collectedSignIds.has(sign.id);
                       
                       const ts = Array.isArray(sign.traffic_signs) ? sign.traffic_signs[0] : sign.traffic_signs;
                       const formatName = ts?.name || "Nama Rambu";
                       const points = ts?.points || 10;
                       
                       return (
                         <div 
                           key={sign.id} 
                           className={`relative bg-white rounded-2xl border transition-all duration-300 overflow-hidden group
                             ${isCollected 
                                ? 'border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1' 
                                : 'border-dashed border-gray-200 opacity-70 grayscale'
                             }
                           `}
                         >
                            <div className={`h-32 w-full flex items-center justify-center relative transition-all
                              ${isCollected ? 'bg-gray-50' : 'bg-gray-200 border-b border-gray-300'}
                            `}>
                               {isCollected ? (
                                  <div className="text-5xl drop-shadow-md group-hover:scale-110 transition-transform duration-300">
                                     {icon}
                                  </div>
                               ) : (
                                  <div className="relative flex flex-col items-center justify-center text-gray-400 opacity-60">
                                     <div className="text-4xl filter grayscale contrast-0 brightness-200 drop-shadow-sm mb-1">
                                        {icon}
                                     </div>
                                     <Lock size={16} className="absolute inset-0 m-auto text-gray-500 bg-gray-200 rounded-full p-0.5" />
                                  </div>
                               )}
                               
                               {isCollected && (
                                  <div className="absolute top-2 right-2 bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full border border-green-200">
                                    +{points} XP
                                  </div>
                               )}
                            </div>
                            
                            <div className="p-4 border-t border-gray-100">
                               <h3 className={`font-bold text-sm truncate mb-0.5 capitalize ${isCollected ? 'text-gray-900' : 'text-gray-400'}`}>
                                 {isCollected ? formatName : 'Rambu Belum Ditemukan'}
                               </h3>
                               <p className="text-xs text-gray-400 truncate flex items-center gap-1">
                                 {isCollected ? sign.location_name : 'Posisi tidak diketahui'}
                               </p>
                            </div>
                         </div>
                       );
                     })}
                  </div>
               </div>
             );
          })}
          
          {allSigns.length === 0 && (
             <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-gray-200">
               <div className="text-4xl mb-4">🪹</div>
               <h3 className="text-gray-900 font-bold mb-1">Data Rambu Kosong</h3>
               <p className="text-gray-500 text-sm">Belum ada data rambu di database.</p>
             </div>
          )}
        </div>

      </div>
    </div>
  );
}
