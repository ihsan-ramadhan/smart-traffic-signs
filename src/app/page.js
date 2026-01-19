import MobileView from "@/components/dashboard/MobileView";
import DesktopView from "@/components/dashboard/DesktopView";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* TAMPILAN DESKTOP */}
      <div className="hidden md:block">
        <DesktopView />
      </div>

      {/* TAMPILAN MOBILE */}
      <div className="md:hidden">
        <MobileView />
      </div>

    </div>
  );
}