"use client";
import { MapPin } from "lucide-react";

export default function ScanHistoryItem({ scan }) {
  const { sign_locations, points_earned, created_at } = scan;
  const traffic_sign = sign_locations?.traffic_signs;
  
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Larangan': return '⛔';
      case 'Peringatan': return '⚠️';
      case 'Perintah': return '🔵';
      default: return '🚥';
    }
  };

  return (
    <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition shadow-sm group">
      <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition shrink-0">
        {getCategoryIcon(traffic_sign?.category)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h4 className="font-bold text-gray-800 text-sm capitalize truncate">
            {traffic_sign?.name || "Rambu Misterius"}
          </h4>
          <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded shrink-0 ml-2">
            +{points_earned} XP
          </span>
        </div>
        <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1 truncate">
          <MapPin size={10} />
          {sign_locations?.location_name || "Lokasi tidak terdeteksi"}
        </p>
        <p className="text-[10px] text-gray-400 mt-1">
          {new Date(created_at).toLocaleDateString('id-ID', { 
            day: 'numeric', 
            month: 'short', 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </p>
      </div>
    </div>
  );
}
