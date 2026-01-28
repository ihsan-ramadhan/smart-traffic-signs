"use client";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
      Memuat Peta...
    </div>
  ),
});

export default function PetaPage() {
  return (
    <div className="w-full h-[calc(100vh-6rem)] relative z-0">
       <Map />
    </div>
  );
}