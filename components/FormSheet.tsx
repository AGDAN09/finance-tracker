"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { KATEGORI } from "@/lib/kategori";
import { hariIni, rupiah } from "@/lib/format";
import type { Tipe, Transaksi } from "@/lib/types";
import { useTx } from "./TransaksiProvider";

export default function FormSheet({ awal, onClose }: { awal: Transaksi | null; onClose: () => void }) {
  const { tambah, ubah, setBulan } = useTx();
  const [tipe, setTipe] = useState<Tipe>(awal?.tipe ?? "keluar");
  const [nominal, setNominal] = useState(awal ? String(awal.nominal) : "");
  const [kategori, setKategori] = useState(awal?.kategori ?? "makan");
  const [tanggal, setTanggal] = useState(awal?.tanggal ?? hariIni());
  const [catatan, setCatatan] = useState(awal?.catatan ?? "");

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  const ganti = (t: Tipe) => {
    setTipe(t);
    setKategori(KATEGORI.find((k) => k.tipe === t)!.id);
  };

  const kirim = (e: React.FormEvent) => {
    e.preventDefault();
    const n = Number(nominal);
    if (n <= 0 || !tanggal) return;
    const isi = { tipe, nominal: n, kategori, tanggal, catatan: catatan.trim() };
    if (awal) ubah(awal.id, isi);
    else tambah(isi);
    setBulan(tanggal.slice(0, 7));
    onClose();
  };

  const field = "w-full rounded-xl border border-malam/15 bg-white px-4 py-3 text-base";

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-malam/50 md:items-center md:justify-center" onClick={onClose} role="dialog" aria-modal="true" aria-label={awal ? "Ubah transaksi" : "Catat transaksi"}>
      <form onClick={(e) => e.stopPropagation()} onSubmit={kirim}
        className="max-h-[92dvh] w-full overflow-y-auto rounded-t-3xl bg-white p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] md:max-w-md md:rounded-3xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">{awal ? "Ubah transaksi" : "Catat transaksi"}</h2>
          <button type="button" onClick={onClose} aria-label="Tutup" className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-kabut"><X className="h-5 w-5" /></button>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-1 rounded-xl bg-kabut p-1">
          {(["keluar", "masuk"] as const).map((t) => (
            <button key={t} type="button" onClick={() => ganti(t)} aria-pressed={tipe === t}
              className={`min-h-11 rounded-lg text-sm font-semibold ${tipe === t ? (t === "keluar" ? "bg-koral text-white" : "bg-mint text-white") : "text-malam/60"}`}>
              {t === "keluar" ? "Pengeluaran" : "Pemasukan"}
            </button>
          ))}
        </div>

        <label className="mt-4 block text-sm font-medium">Nominal
          <input className={`${field} mt-1 text-2xl font-bold`} inputMode="numeric" autoFocus={!awal} placeholder="0" value={nominal}
            onChange={(e) => setNominal(e.target.value.replace(/\D/g, ""))} />
        </label>
        {Number(nominal) > 0 && <p className="mt-1 text-sm text-malam/60">{rupiah(Number(nominal))}</p>}

        <p className="mt-4 text-sm font-medium">Kategori</p>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {KATEGORI.filter((k) => k.tipe === tipe).map(({ id, label, icon: Icon }) => (
            <button key={id} type="button" onClick={() => setKategori(id)} aria-pressed={kategori === id}
              className={`flex min-h-16 flex-col items-center justify-center gap-1 rounded-xl border text-xs font-medium ${kategori === id ? "border-malam bg-malam text-white" : "border-malam/15"}`}>
              <Icon className="h-5 w-5" /> {label}
            </button>
          ))}
        </div>

        <label className="mt-4 block text-sm font-medium">Tanggal
          <input className={`${field} mt-1`} type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} />
        </label>
        <label className="mt-4 block text-sm font-medium">Catatan (opsional)
          <input className={`${field} mt-1`} value={catatan} onChange={(e) => setCatatan(e.target.value)} placeholder="Contoh: makan siang" />
        </label>

        <button disabled={Number(nominal) <= 0} className="mt-5 min-h-12 w-full rounded-xl bg-malam text-base font-bold text-white disabled:opacity-40">
          {awal ? "Simpan perubahan" : "Simpan transaksi"}
        </button>
      </form>
    </div>
  );
}