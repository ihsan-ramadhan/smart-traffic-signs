import MobileView from "@/components/dashboard/MobileView";
import DesktopView from "@/components/dashboard/DesktopView";

export default function Home() {
  return (
    <div>
      
      <div className="hidden md:block">
        <DesktopView />
      </div>

      <div className="md:hidden">
        <MobileView />
      </div>

    </div>
  );
}