import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import Nav from "@/components/Nav";
import PwaRegister from "@/components/PwaRegister";
import ThemeToggle from "@/components/ThemeToggle";
import TransaksiProvider from "@/components/TransaksiProvider";
import "./globals.css";

const font = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-brico" });

export const metadata: Metadata = {
  title: "Finance Tracker - Catatan Keuangan",
  icons: { icon: "/pwa-icon/192", apple: "/pwa-icon/180" },
  appleWebApp: { capable: true, title: "Finance Tracker", statusBarStyle: "default" },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#1B1F3B" };

// Pasang tema sebelum halaman tampil, supaya tidak berkedip
const skripTema = `try{var t=localStorage.getItem("tema");if(t==="gelap"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={font.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: skripTema }} />
      </head>
      <body className="font-sans">
        <TransaksiProvider>
          <Nav />
          <main className="px-4 pb-32 pt-[max(1.5rem,env(safe-area-inset-top))] md:ml-60 md:px-10 md:pb-10">
            <div className="mx-auto max-w-2xl">
              <header className="mb-4 flex items-center justify-between md:justify-end">
                <span className="text-lg font-bold md:hidden">Finance Tracker</span>
                <ThemeToggle />
              </header>
              {children}
              <footer className="mt-10 text-center text-xs text-malam/50 md:hidden">
                Dibuat oleh Agdan Wirayudha · Teknik Informatika Untag 25
              </footer>
            </div>
          </main>
        </TransaksiProvider>
        <PwaRegister />
      </body>
    </html>
  );
}