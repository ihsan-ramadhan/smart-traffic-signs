# TRAFFIC CHAMP 🚥🏆

**TRAFFIC CHAMP** (Traffic Challenge and Map for People) adalah platform edukasi rambu lalu lintas interaktif berbasis gamifikasi yang dikembangkan untuk program **PKM-PI (Program Kreativitas Mahasiswa - Penerapan Iptek)** di Kota Bandung.

Proyek ini bertujuan untuk meningkatkan kesadaran dan pemahaman masyarakat terhadap rambu lalu lintas melalui pengalaman digital yang menyenangkan, kompetitif, dan informatif.

**Live Demo**: [https://smart-traffic-signs.vercel.app/](https://smart-traffic-signs.vercel.app/)

## ✨ Fitur Utama

- **QR Scanner Canggih**: Pindai kode QR yang terpasang pada rambu lalu lintas fisik untuk mendapatkan informasi edukasi secara instan.
- **Edukasi Sinematik (Lottie)**: Penjelasan makna rambu menggunakan animasi Lottie yang interaktif, ringan, dan modern.
- **Sistem Gamifikasi**: Dapatkan **XP (Experience Points)** setiap kali menemukan rambu baru dan tingkatkan **Level** profilmu.
- **Koleksi Digital**: Kumpulkan seluruh jenis rambu lalu lintas (Peringatan, Larangan, Perintah) dalam galeri koleksi pribadimu.
- **Leaderboard Global**: Bersaing dengan seluruh pengguna lain di Kota Bandung untuk menjadi "Traffic Champion".
- **Dashboard Dual-View**: Antarmuka desktop yang komprehensif dan antarmuka mobile yang dioptimalkan untuk penggunaan di lapangan.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Database & Auth**: [Supabase](https://supabase.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [LottieFiles](https://lottiefiles.com/)
- **Deployment**: [Vercel](https://vercel.com/)

## 🚀 Memulai

### Prasyarat

- Node.js terinstall
- Akun Supabase (untuk Database & Auth)

### Instalasi

1. Clone repositori:

   ```bash
   git clone https://github.com/ihsan-ramadhan/smart-traffic-signs
   cd smart-traffic-signs
   ```
2. Instal dependensi:

   ```bash
   npm install
   ```
3. Konfigurasi Environment Variables:
   Buat file `.env.local` dan masukkan kredensial Supabase Anda:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Jalankan server pengembangan:

   ```bash
   npm run dev
   ```
5. Buka [http://localhost:3000](http://localhost:3000) di browser Anda.
