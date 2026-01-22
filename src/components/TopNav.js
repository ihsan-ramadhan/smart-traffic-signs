"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, LogIn, LogOut, ChevronDown } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function TopNav() {
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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
      }
      setLoading(false);
    }
    getData();

    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    const confirm = window.confirm("Yakin ingin keluar akun?");
    if (confirm) {
      await supabase.auth.signOut();
      window.location.reload();
    }
  };

  const isLoggedIn = !!user;
  const name = isLoggedIn ? user.user_metadata.full_name : "Tamu";
  const avatar = isLoggedIn ? user.user_metadata.avatar_url : null;
  const initial = name.charAt(0).toUpperCase();

  const levelName = profile?.level_name || "Pemula";
  const levelNum = profile?.level_number || 1;
  const levelText = isLoggedIn ? `Level ${levelNum} ${levelName}` : "Level 1 Pemula";

  const navLinkClass = (path) =>
    `text-sm font-medium transition-colors hover:text-primary ${
      pathname === path ? "text-primary font-bold" : "text-gray-500"
    }`;

  return (
    <nav className="hidden md:block sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="w-full px-6 md:px-10 h-16 flex justify-between items-center">
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold shadow-blue-200 shadow-md">
            R
          </div>
          <span className="font-bold text-xl text-gray-900 tracking-tight">RambuPintar</span>
        </div>

        <div className="flex items-center gap-8">
          <Link href="/" className={navLinkClass("/")}>Beranda</Link>
          <Link href="/peta" className={navLinkClass("/peta")}>Peta</Link>
          <Link href="/koleksi" className={navLinkClass("/koleksi")}>Koleksi</Link>
          <Link href="/leaderboard" className={navLinkClass("/leaderboard")}>Peringkat</Link>
        </div>

        <div className="flex items-center gap-4 relative" ref={dropdownRef}>
            {loading ? (
                <div className="flex items-center gap-3 opacity-50">
                    <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
            ) : isLoggedIn ? (
                <>
                    <button 
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center gap-3 cursor-pointer focus:outline-none p-1 rounded-full hover:bg-gray-50 transition"
                    >
                        <div className="flex flex-col items-end mr-1">
                            <span className="text-xs font-bold text-gray-700">{name}</span>
                            <span className="text-[10px] text-gray-400">{levelText}</span>
                        </div>
                        <div className="w-10 h-10 rounded-full border border-gray-200 overflow-hidden relative shadow-sm">
                           {avatar ? (
                               <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                           ) : (
                               <div className="w-full h-full bg-accent flex items-center justify-center text-yellow-900 font-bold">
                                   {initial}
                               </div>
                           )}
                        </div>
                        <ChevronDown size={14} className={`text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute top-14 right-0 w-40 bg-white rounded-xl shadow-xl border border-gray-100 py-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                          <button 
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors cursor-pointer font-medium"
                          >
                            <LogOut size={16} />
                            Keluar Akun
                          </button>
                      </div>
                    )}
                </>
            ) : (
                <Link href="/login" className="flex items-center gap-3 group hover:opacity-80 transition cursor-pointer">
                    <div className="flex flex-col items-end mr-1">
                        <span className="text-xs font-bold text-gray-700">Tamu</span>
                        <span className="text-[10px] text-primary font-bold flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded-full">
                           Masuk <LogIn size={10} />
                        </span>
                    </div>
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200 text-gray-400 group-hover:bg-primary group-hover:text-white transition-colors shadow-sm">
                        <User size={20} />
                    </div>
                </Link>
            )}
        </div>

      </div>
    </nav>
  );
}