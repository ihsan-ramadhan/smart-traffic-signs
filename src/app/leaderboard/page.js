"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Trophy, Medal, Crown, Loader2 } from "lucide-react";

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user ?? null;
      setCurrentUser(user);

      const { data: topUsers } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url, xp, level_name')
        .order('xp', { ascending: false })
        .limit(50);

      if (topUsers) setLeaderboard(topUsers);
      setLoading(false);
    }

    getData();
  }, []);

  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "?");

  const renderRankIcon = (index) => {
    if (index === 0) return <Crown size={24} className="text-yellow-500 fill-yellow-500" />;
    if (index === 1) return <Medal size={24} className="text-gray-400 fill-gray-400" />;
    if (index === 2) return <Medal size={24} className="text-orange-600 fill-orange-600" />;
    return <span className="font-bold text-gray-500 w-6 text-center text-sm">{index + 1}</span>;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] bg-gray-50">
        <Loader2 className="animate-spin text-primary mb-2" size={32} />
        <p className="text-gray-500 text-sm">Memuat data...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white min-h-screen pb-10">
      
      <div className="border-b border-gray-200">
        <div className="w-full px-6 md:px-10 py-8">
           <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 bg-orange-50 text-orange-600">
                <Trophy size={12} className="mb-[1px]" />
                Hall of Fame
              </span>
           </div>
           <h1 className="text-3xl font-bold text-gray-900 mb-2">
             Peringkat Global
           </h1>
           <p className="text-gray-500 max-w-2xl leading-relaxed text-sm">
             Top 50 pengguna dengan kontribusi poin tertinggi. Ayo scan lebih banyak rambu!
           </p>
        </div>
      </div>

      <div className="w-full px-6 md:px-10 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          
          <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-wider">
            <span>Peringkat</span>
            <span>Skor XP</span>
          </div>

          <div className="divide-y divide-gray-50">
            {leaderboard.length > 0 ? (
              leaderboard.map((u, index) => {
                const isMe = currentUser?.id === u.id;
                
                return (
                  <div 
                    key={u.id} 
                    className={`flex items-center justify-between px-6 py-4 transition hover:bg-gray-50 ${isMe ? 'bg-blue-50/50' : ''}`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Rank Icon */}
                      <div className="w-8 flex justify-center flex-shrink-0">
                        {renderRankIcon(index)}
                      </div>

                      <div className={`w-10 h-10 rounded-full border flex items-center justify-center overflow-hidden flex-shrink-0 ${isMe ? 'border-primary' : 'border-gray-200'}`}>
                        {u.avatar_url ? (
                          <img 
                            src={u.avatar_url} 
                            alt={u.full_name} 
                            className="w-full h-full object-cover" 
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-sm">
                            {getInitial(u.full_name)}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col">
                        <span className={`text-sm ${isMe ? 'text-primary font-bold' : 'text-gray-900 font-medium'} truncate max-w-[140px] md:max-w-sm`}>
                          {u.full_name || "Tanpa Nama"} {isMe && "(Anda)"}
                        </span>
                        <span className="text-[10px] md:text-xs text-gray-400">
                          {u.level_name || "Pemula"}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="block font-bold text-orange-600 text-sm md:text-base">
                        {u.xp.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-gray-400 hidden md:inline">Total XP</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-300">
                  <Trophy size={32} />
                </div>
                <p className="text-gray-400 text-sm">Belum ada data peringkat.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}