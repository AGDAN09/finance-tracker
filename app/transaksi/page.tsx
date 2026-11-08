"use client";

import { useState } from "react";
import { Download, Search } from "lucide-react";
import MonthPicker from "@/components/MonthPicker";
import { useTx } from "@/components/TransaksiProvider";
import TxItem from "@/components/TxItem";
import { unduhCSV } from "@/lib/csv";
import { cariKategori } from "@/lib/kategori";
import type { Tipe } from "@/lib/types";

const TAB: { id: Tipe | "semua"; label: string }[] = [
  { id: "semua", label: "Semua" },
  { id: "keluar", label: "Keluar" },
  { id: "masuk", label: "Masuk" },
];

export default function Transaksi() {
  const { data, siap, bulan, hapus, buka, edit } = useTx();
  const [tab, setTab] = useState<Tipe | "semua">("semua");
  const [cari, setCari] = useState("");

  if (!siap) return null;

  const q = cari.trim().toLowerCase();
  const daftar = data
    .filter((t) => tab === "semua" || t.tipe === tab)
    .filter((t) =>
      q
        ? `${t.catatan} ${cariKategori(t.kategori).label}`.toLowerCase().includes(q)
        : t.tanggal.startsWith(bulan)
    )
    .sort((a, b) => b.tanggal.localeCompare(a.tanggal));

  return (
    <div className="space-y-5">
      <MonthPicker />

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3.5 h-4 w-4 text-malam/50" />
          <input value={cari} onChange={(e) => setCari(e.target.value)} placeholder="Cari catatan atau kategori" aria-label="Cari transaksi"
            className="min-h-11 w-full rounded-xl border border-malam/15 bg-white pl-9 pr-3 text-base" />
        </div>
        <button onClick={() => unduhCSV(daftar, q ? "transaksi-hasil-cari" : `transaksi-${bulan}`)} disabled={daftar.length === 0}
          className="flex min-h-11 items-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold disabled:opacity-40">
          <Download className="h-4 w-4" /> <span className="hidden sm:inline">Ekspor CSV</span>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-1 rounded-xl bg-white p-1">
        {TAB.map(({ id, label }) => (
          <button key={id} onClick={() => setTab(id)} aria-pressed={tab === id}
            className={`min-h-11 rounded-lg text-sm font-semibold ${tab === id ? "bg-malam text-white" : "text-malam/60"}`}>
            {label}
          </button>
        ))}
      </div>

      {q && <p className="text-sm text-malam/60">Hasil pencarian dari semua bulan: {daftar.length} transaksi.</p>}

      {daftar.length === 0 ? (
        <div className="py-10 text-center">
          <p className="text-malam/60">{q ? "Tidak ada transaksi yang cocok." : "Tidak ada transaksi di bulan ini."}</p>
          {!q && <button onClick={buka} className="mt-4 min-h-12 rounded-xl bg-emas px-6 font-bold">Catat transaksi</button>}
        </div>
      ) : (
        <>
          {!q && <p className="text-sm text-malam/60">Ketuk transaksi untuk mengubahnya.</p>}
          <ul className="divide-y divide-malam/10">
            {daftar.map((t) => (
              <TxItem key={t.id} t={t} onEdit={() => edit(t)} onHapus={() => confirm("Hapus transaksi ini?") && hapus(t.id)} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}