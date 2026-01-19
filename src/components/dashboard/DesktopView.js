import Link from "next/link";
import { Trophy, Star} from "lucide-react";
import { QRCodeSVG } from 'qrcode.react'; 

export default function DesktopView() {
  return (
    <div className="w-full">
        
        <div className="bg-white border-b border-gray-200">
          <div className="w-full px-6 md:px-10 py-8">
            <div className="flex justify-between items-center">
              
              <div>
                <div className="flex items-center gap-3 mb-2">
                   <span className="bg-blue-50 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                     <Trophy size={12} className="mb-[1px]" /> Level 5 Explorer
                   </span>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Selamat Pagi, Mahasiswa Teladan!
                </h1>
                <p className="text-gray-500 max-w-2xl leading-relaxed text-sm">
                  Siap berpetualang? Ayo jelajahi dan cari rambu-rambu.
                </p>
                
                <div className="flex gap-8 mt-6">
                   <div className="flex items-center gap-3 pr-8 border-r border-gray-100">
                      <div className="p-2 bg-yellow-50 rounded-lg text-yellow-600">
                         <Star size={20} fill="currentColor" />
                      </div>
                      <div>
                         <p className="text-[10px] text-gray-400 font-bold uppercase">Total Poin</p>
                         <p className="text-xl font-bold text-gray-900">1,250 <span className="text-xs font-normal text-gray-400">XP</span></p>
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                         <Trophy size={20} />
                      </div>
                      <div>
                         <p className="text-[10px] text-gray-400 font-bold uppercase">Peringkat</p>
                         <p className="text-xl font-bold text-gray-900">#24</p>
                      </div>
                   </div>
                </div>
              </div>

              <div className="bg-gray-900 text-white p-4 rounded-xl flex items-center gap-4 shadow-lg transform transition hover:-translate-y-1">
                 <div className="text-right">
                    <h3 className="font-bold text-sm">Mode Lapangan</h3>
                    <p className="text-gray-400 text-[10px]">Scan untuk buka di HP</p>
                 </div>
                 <div className="bg-white p-1.5 rounded-lg">
                    <QRCodeSVG value="https://rambupintar.vercel.app" size={60} />
                 </div>
              </div>

            </div>
          </div>
        </div>
    </div>
  );
}