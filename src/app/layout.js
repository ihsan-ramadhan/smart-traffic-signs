import "./globals.css";
import BottomNav from "@/components/BottomNav";

export const metadata = {
  title: "Rambu Pintar (Mobile Dev)",
  description: "Prototype Mobile View",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-gray-800 md:bg-gray-100 text-gray-900">
        
        <main className="min-h-screen">
          {children}
        </main>

        <BottomNav />

      </body>
    </html>
  );
}