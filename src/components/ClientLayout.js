"use client";
import { usePathname } from "next/navigation";
import { AuthProvider } from "@/context/AuthContext";
import TopNav from "./TopNav";
import BottomNav from "./BottomNav";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  
  const isFullScreenPage = pathname === "/login" || pathname === "/auth/error";
  const isMapPage = pathname === "/peta";

  return (
    <AuthProvider>
      {isFullScreenPage ? (
        children
      ) : (
        <>
          <TopNav />
          <main className={isMapPage ? "h-[calc(100vh-4.1rem)] overflow-hidden" : "min-h-screen pb-24 md:pb-10"}>
            {children}
          </main>
          <div className="md:hidden">
            <BottomNav />
          </div>
        </>
      )}
    </AuthProvider>
  );
}