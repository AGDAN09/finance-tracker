"use client";

import { useMemo, useState } from "react";
import { ArrowDownLeft, ArrowUpRight, Target } from "lucide-react";
import ArusKas from "@/components/ArusKas";
import BudgetSheet from "@/components/BudgetSheet";
import MonthPicker from "@/components/MonthPicker";
import { useTx } from "@/components/TransaksiProvider";
import TxItem from "@/components/TxItem";
import { cariKategori } from "@/lib/kategori";
import { rupiah } from "@/lib/format";

export default function Ringkasan() {
  const { data, siap, bulan, budget, buka, edit } = useTx();
  const [atur, setAtur] = useState(false);

  const { masuk, keluar, baris, terbaru } = useMemo(() => {
    const bln = data.filter((t) => t.tanggal.startsWith(bulan)).sort((a, b) => b.tanggal.localeCompare(a.tanggal));
    const jumlah = (tipe: string) => bln.filter((t) => t.tipe === tipe).reduce((a, t) => a + t.nominal, 0);
    const map = new Map<string, number>();
    bln.filter((t) => t.tipe === "keluar").forEach((t) => map.set(t.kategori, (map.get(t.kategori) ?? 0) + t.nominal));
    const ids = new Set([...map.keys(), ...Object.keys(budget)]);
    const baris = [...ids]
      .map((id) => ({ id, total: map.get(id) ?? 0, batas: budget[id] ?? 0 }))
      .sort((a, b) => b.total - a.total);
    return { masuk: jumlah("masuk"), keluar: jumlah("keluar"), baris, terbaru: bln.slice(0, 5) };
  }, [data, bulan, budget]);

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
        <h2 className="font-bold">Arus kas 6 bulan</h2>
        <div className="mt-2"><ArusKas /></div>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="font-bold">Uang keluar per kategori</h2>
          <button onClick={() => setAtur(true)} className="flex min-h-11 items-center gap-1.5 rounded-full bg-white px-4 text-sm font-semibold">
            <Target className="h-4 w-4" /> Atur budget
          </button>
        </div>
        {baris.length === 0 ? (
          <p className="mt-2 text-malam/60">Belum ada pengeluaran atau budget bulan ini.</p>
        ) : (
          <ul className="mt-3 space-y-4">
            {baris.map(({ id, total, batas }) => {
              const k = cariKategori(id);
              const Icon = k.icon;
              const rasio = batas ? total / batas : keluar ? total / keluar : 0;
              const warna = !batas || rasio > 1 ? "bg-koral" : rasio >= 0.8 ? "bg-emas" : "bg-mint";
              return (
                <li key={id}>
                  <div className="flex items-center justify-between gap-2 text-sm">
                    <span className="flex items-center gap-2 font-medium"><Icon className="h-4 w-4" /> {k.label}</span>
                    <span className="font-semibold">
                      {rupiah(total)}
                      {batas > 0 && <span className="font-normal text-malam/60"> dari {rupiah(batas)}</span>}
                    </span>
                  </div>
                  <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-malam/10">
                    <div className={`h-full rounded-full ${warna}`} style={{ width: `${Math.min(100, rasio * 100)}%` }} />
                  </div>
                  {batas > 0 && total > batas && <p className="mt-1 text-xs font-semibold text-koral">Lebih {rupiah(total - batas)} dari budget</p>}
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section>
        <h2 className="font-bold">Transaksi terbaru</h2>
        {terbaru.length === 0 ? (
          <button onClick={buka} className="mt-3 min-h-12 w-full rounded-xl bg-emas px-4 font-bold">Catat transaksi pertama</button>
        ) : (
          <ul className="mt-1 divide-y divide-malam/10">{terbaru.map((t) => <TxItem key={t.id} t={t} onEdit={() => edit(t)} />)}</ul>
        )}
      </section>

      {atur && <BudgetSheet onClose={() => setAtur(false)} />}
    </div>
  );
}