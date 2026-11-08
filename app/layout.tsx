import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import Nav from "@/components/Nav";
import TransaksiProvider from "@/components/TransaksiProvider";
import "./globals.css";

const font = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-brico" });

export const metadata: Metadata = { title: "Finance Tracker - Catatan Keuangan" };
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#1B1F3B" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={font.variable}>
      <body className="font-sans">
        <TransaksiProvider>
          <Nav />
          <main className="px-4 pb-32 pt-[max(1.5rem,env(safe-area-inset-top))] md:ml-60 md:px-10 md:pb-10">
            <div className="mx-auto max-w-2xl">{children}</div>
          </main>
        </TransaksiProvider>
      </body>
    </html>
  );
}
