"use client";

import { useMemo } from "react";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import MonthPicker from "@/components/MonthPicker";
import { useTx } from "@/components/TransaksiProvider";
import TxItem from "@/components/TxItem";
import { cariKategori } from "@/lib/kategori";
import { rupiah } from "@/lib/format";

export default function Ringkasan() {
  const { data, siap, bulan, buka } = useTx();

  const { masuk, keluar, perKat, terbaru } = useMemo(() => {
    const bln = data.filter((t) => t.tanggal.startsWith(bulan)).sort((a, b) => b.tanggal.localeCompare(a.tanggal));
    const jumlah = (tipe: string) => bln.filter((t) => t.tipe === tipe).reduce((a, t) => a + t.nominal, 0);
    const map = new Map<string, number>();
    bln.filter((t) => t.tipe === "keluar").forEach((t) => map.set(t.kategori, (map.get(t.kategori) ?? 0) + t.nominal));
    return { masuk: jumlah("masuk"), keluar: jumlah("keluar"), perKat: [...map].sort((a, b) => b[1] - a[1]), terbaru: bln.slice(0, 5) };
  }, [data, bulan]);

  if (!siap) return null;
  const saldo = masuk - keluar;

  return (
    <div className="space-y-6">
      <MonthPicker />

      <section className="rounded-3xl bg-malam p-6 text-white">
        <p className="text-sm text-white/70">Sisa uang bulan ini</p>
        <p className={`mt-1 text-4xl font-extrabold ${saldo < 0 ? "text-koral" : ""}`}>{rupiah(saldo)}</p>
        <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-2xl bg-white/10 p-3">
            <p className="flex items-center gap-1 text-white/70"><ArrowDownLeft className="h-4 w-4 text-mint" /> Masuk</p>
            <p className="mt-1 text-lg font-bold">{rupiah(masuk)}</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-3">
            <p className="flex items-center gap-1 text-white/70"><ArrowUpRight className="h-4 w-4 text-koral" /> Keluar</p>
            <p className="mt-1 text-lg font-bold">{rupiah(keluar)}</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-bold">Uang keluar per kategori</h2>
        {perKat.length === 0 ? (
          <p className="mt-2 text-malam/60">Belum ada pengeluaran bulan ini.</p>
        ) : (
          <ul className="mt-3 space-y-4">
            {perKat.map(([id, total]) => {
              const k = cariKategori(id);
              const Icon = k.icon;
              return (
                <li key={id}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 font-medium"><Icon className="h-4 w-4" /> {k.label}</span>
                    <span className="font-semibold">{rupiah(total)} <span className="font-normal text-malam/60">({Math.round((total / keluar) * 100)}%)</span></span>
                  </div>
                  <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-malam/10">
                    <div className="h-full rounded-full bg-koral" style={{ width: `${(total / keluar) * 100}%` }} />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section>
        <h2 className="font-bold">Transaksi terbaru</h2>
        {terbaru.length === 0 ? (
          <button onClick={buka} className="mt-3 min-h-12 w-full rounded-xl bg-emas px-4 font-bold">Catat Transaksi Pertama</button>
        ) : (
          <ul className="mt-1 divide-y divide-malam/10">{terbaru.map((t) => <TxItem key={t.id} t={t} />)}</ul>
        )}
      </section>
    </div>
  );
}
