import Link from "next/link";
import { Trophy, Star, ArrowRight, MapPin} from "lucide-react";
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

        <div className="w-full px-6 md:px-10 py-8">
          <div className="grid grid-cols-12 gap-8">
            
            <div className="col-span-8 space-y-6">
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                       <h3 className="font-bold text-gray-800">
                        Misi Hari Ini 🎯
                       </h3>
                       <p className="text-gray-500 text-sm mt-1">Temukan 3 rambu peringatan lagi untuk bonus poin!</p>
                    </div>
                    <span className="bg-blue-50 text-primary font-bold px-3 py-1 rounded-lg text-xs">
                      2/5 Rambu
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3 mb-2">
                    <div className="bg-primary h-full rounded-full w-[40%] shadow-lg shadow-blue-500/30"></div>
                  </div>
               </div>

               <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-gray-800">Riwayat Scan</h3>
                    <Link href="/koleksi" className="text-sm text-primary font-bold hover:underline flex items-center gap-1">
                      Lihat Semua <ArrowRight size={16} />
                    </Link>
                  </div>
                  <div className="space-y-2">
                     <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition cursor-pointer">
                         <div className="flex items-center gap-4">
                           <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">⛔</div>
                           <div>
                             <h4 className="font-bold text-gray-800 text-sm">Dilarang Masuk</h4>
                             <p className="text-xs text-gray-500">Jl. Ganesha • 2 jam lalu</p>
                           </div>
                         </div>
                         <div className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                           +10 Poin
                         </div>
                     </div>
                     <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition cursor-pointer">
                         <div className="flex items-center gap-4">
                           <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">🅿️</div>
                           <div>
                             <h4 className="font-bold text-gray-800 text-sm">Tempat Parkir</h4>
                             <p className="text-xs text-gray-400">Jl. Dago • 5 jam lalu</p>
                           </div>
                         </div>
                         <div className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                           +10 Poin
                         </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="col-span-4 space-y-6">
               <Link href="/peta" className="block bg-green-50 p-6 rounded-2xl border border-green-100 hover:shadow-md transition group">
                  <div className="flex items-start justify-between">
                     <div>
                        <h3 className="font-bold text-green-900">Cari Rambu Terdekat</h3>
                        <p className="text-sm text-green-700/80 mt-1">Cek lokasi di sekitarmu.</p>
                     </div>
                     <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-green-600 shadow-sm group-hover:scale-110 transition">
                        <MapPin size={20} />
                     </div>
                  </div>
               </Link>

               <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                     <Trophy size={18} className="text-orange-600" /> Peringkat
                  </h3>
                   <div className="space-y-4">
                     <div className="flex items-center justify-between text-sm">
                        <span className="font-bold text-gray-400">1</span>
                        <div className="flex items-center gap-2 flex-1 ml-3">
                           <div className="w-6 h-6 bg-blue-100 rounded-full"></div>
                           <span className="font-medium">Dilan</span>
                        </div>
                        <span className="font-bold text-orange-600">2400</span>
                     </div>
                     <div className="flex items-center justify-between text-sm">
                        <span className="font-bold text-gray-400">2</span>
                        <div className="flex items-center gap-2 flex-1 ml-3">
                           <div className="w-6 h-6 bg-pink-100 rounded-full"></div>
                           <span className="font-medium">Milea</span>
                        </div>
                        <span className="font-bold text-orange-600">2150</span>
                     </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
    </div>
  );
}