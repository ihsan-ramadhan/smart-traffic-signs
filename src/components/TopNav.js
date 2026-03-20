"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { User, LogIn, LogOut, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/context/AuthContext";
import LogoutModal from "@/components/ui/LogoutModal";

export default function TopNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, profile, loading } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogoutClick = () => {
    setIsDropdownOpen(false); 
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

  const levelName = profile?.level_name || "Pemula";
  const levelNum = profile?.level_number || 1;
  const levelText = isLoggedIn ? `Level ${levelNum} ${levelName}` : "Level 1 Pemula";

  const navLinkClass = (path) =>
    `text-sm font-medium transition-colors hover:text-primary ${
      pathname === path ? "text-primary font-bold" : "text-gray-500"
    }`;

  return (
    <>
      <nav className="hidden md:block sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="w-full px-6 md:px-10 h-16 flex justify-between items-center">
          
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold shadow-blue-200 shadow-md">
              R
            </div>
            <span className="font-bold text-xl text-gray-900 tracking-tight">RambuPintar</span>
          </Link>

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
                      <Image 
                        src={avatar} 
                        alt="Avatar" 
                        fill 
                        className="object-cover" 
                      />
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
                      onClick={handleLogoutClick}
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

      <LogoutModal 
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={confirmLogout}
      />
    </>
  );
}