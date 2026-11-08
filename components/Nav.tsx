"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ListOrdered, PiggyBank, Plus } from "lucide-react";
import { useTx } from "./TransaksiProvider";

const menu = [
  { href: "/", label: "Ringkasan", icon: LayoutDashboard },
  { href: "/transaksi", label: "Transaksi", icon: ListOrdered },
];

export default function Nav() {
  const path = usePathname();
  const { buka } = useTx();
  const aktif = (h: string) => (h === "/" ? path === "/" : path.startsWith(h));

  return (
    <>
      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 items-end border-t border-malam/10 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
        <Link href="/" aria-current={aktif("/") ? "page" : undefined}
          className={`flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs font-medium ${aktif("/") ? "text-malam" : "text-malam/50"}`}>
          <LayoutDashboard className="h-5 w-5" /> Ringkasan
        </Link>
        <button onClick={buka} aria-label="Catat transaksi"
          className="mx-auto -mt-6 mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-emas text-malam shadow-lg">
          <Plus className="h-7 w-7" />
        </button>
        <Link href="/transaksi" aria-current={aktif("/transaksi") ? "page" : undefined}
          className={`flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs font-medium ${aktif("/transaksi") ? "text-malam" : "text-malam/50"}`}>
          <ListOrdered className="h-5 w-5" /> Transaksi
        </Link>
      </nav>

      <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col bg-malam p-5 text-white md:flex">
        <div className="flex items-center gap-2 pb-8 text-xl font-bold"><PiggyBank className="h-6 w-6 text-emas" /> Finance Tracker</div>
        <div className="flex flex-col gap-1">
          {menu.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} aria-current={aktif(href) ? "page" : undefined}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${aktif(href) ? "bg-emas text-malam" : "text-white/75 hover:bg-white/10"}`}>
              <Icon className="h-5 w-5" /> {label}
            </Link>
          ))}
        </div>
        <button onClick={buka} className="mt-6 flex items-center justify-center gap-2 rounded-lg bg-emas px-4 py-2.5 text-sm font-bold text-malam">
          <Plus className="h-4 w-4" /> Catat transaksi
        </button>
      </aside>
    </>
  );
}
