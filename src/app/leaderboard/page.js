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
    return <span className="font-bold text-gray-500 w-6 text-center">{index + 1}</span>;
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
    <div className="w-full bg-gray-50 min-h-[calc(100vh-6rem)] overflow-x-hidden pb-10 md:pb-0">
      
      <div className="bg-primary text-white pt-10 pb-20 px-6 rounded-b-[2.5rem] relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-10 -mt-10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-10 -mb-10 blur-2xl"></div>
        
        <div className="relative z-10 text-center">
          <h1 className="text-xl font-bold mb-1">Peringkat</h1>
          <p className="text-blue-100 text-xs">Top 50 Peringkat Global</p>
        </div>
      </div>

      <div className="px-4 md:px-0 max-w-3xl mx-auto -mt-12 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-wider">
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
                    className={`flex items-center justify-between px-5 py-3 transition hover:bg-gray-50 ${isMe ? 'bg-blue-50/60' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 flex justify-center flex-shrink-0">
                        {renderRankIcon(index)}
                      </div>
                      <div className={`w-9 h-9 rounded-full border flex items-center justify-center overflow-hidden flex-shrink-0 ${isMe ? 'border-primary' : 'border-gray-200'}`}>
                        {u.avatar_url ? (
                          <img src={u.avatar_url} alt={u.full_name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs">
                            {getInitial(u.full_name)}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col">
                        <span className={`text-sm ${isMe ? 'text-primary font-bold' : 'text-gray-800 font-medium'} truncate max-w-[120px]`}>
                          {u.full_name || "Tanpa Nama"} {isMe && "(Anda)"}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {u.level_name || "Pemula"}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="block font-bold text-orange-600 text-sm">
                        {u.xp.toLocaleString()}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-10">
                <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-300">
                  <Trophy size={28} />
                </div>
                <p className="text-gray-400 text-xs">Belum ada data peringkat.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="text-center mt-6 text-gray-300 text-[10px] px-6 pb-6">
        <p>Terus scan rambu untuk naik peringkat!</p>
      </div>

    </div>
  );
}