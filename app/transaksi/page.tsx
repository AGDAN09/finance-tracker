"use client";

import { useState } from "react";
import MonthPicker from "@/components/MonthPicker";
import { useTx } from "@/components/TransaksiProvider";
import TxItem from "@/components/TxItem";
import type { Tipe } from "@/lib/types";

const TAB: { id: Tipe | "semua"; label: string }[] = [
  { id: "semua", label: "Semua" },
  { id: "keluar", label: "Keluar" },
  { id: "masuk", label: "Masuk" },
];

export default function Transaksi() {
  const { data, siap, bulan, hapus, buka } = useTx();
  const [tab, setTab] = useState<Tipe | "semua">("semua");

  if (!siap) return null;

  const daftar = data
    .filter((t) => t.tanggal.startsWith(bulan) && (tab === "semua" || t.tipe === tab))
    .sort((a, b) => b.tanggal.localeCompare(a.tanggal));

  return (
    <div className="space-y-5">
      <MonthPicker />

      <div className="grid grid-cols-3 gap-1 rounded-xl bg-white p-1">
        {TAB.map(({ id, label }) => (
          <button key={id} onClick={() => setTab(id)} aria-pressed={tab === id}
            className={`min-h-11 rounded-lg text-sm font-semibold ${tab === id ? "bg-malam text-white" : "text-malam/60"}`}>
            {label}
          </button>
        ))}
      </div>

      {daftar.length === 0 ? (
        <div className="py-10 text-center">
          <p className="text-malam/60">Tidak ada transaksi di bulan ini.</p>
          <button onClick={buka} className="mt-4 min-h-12 rounded-xl bg-emas px-6 font-bold">Catat Transaksi</button>
        </div>
      ) : (
        <ul className="divide-y divide-malam/10">
          {daftar.map((t) => (
            <TxItem key={t.id} t={t} onHapus={() => confirm("Hapus transaksi ini?") && hapus(t.id)} />
          ))}
        </ul>
      )}
    </div>
  );
}
