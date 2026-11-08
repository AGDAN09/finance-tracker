"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { KATEGORI } from "@/lib/kategori";
import { useTx } from "./TransaksiProvider";

export default function BudgetSheet({ onClose }: { onClose: () => void }) {
  const { budget, setBudget } = useTx();
  const [nilai, setNilai] = useState<Record<string, string>>(() =>
    Object.fromEntries(Object.entries(budget).map(([k, v]) => [k, String(v)]))
  );

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  const simpan = (e: React.FormEvent) => {
    e.preventDefault();
    const baru: Record<string, number> = {};
    Object.entries(nilai).forEach(([k, v]) => { if (Number(v) > 0) baru[k] = Number(v); });
    setBudget(baru);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-malam/50 md:items-center md:justify-center" onClick={onClose} role="dialog" aria-modal="true" aria-label="Atur budget">
      <form onClick={(e) => e.stopPropagation()} onSubmit={simpan}
        className="max-h-[92dvh] w-full overflow-y-auto rounded-t-3xl bg-white p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] md:max-w-md md:rounded-3xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Atur budget per bulan</h2>
          <button type="button" onClick={onClose} aria-label="Tutup" className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-kabut"><X className="h-5 w-5" /></button>
        </div>
        <p className="mt-1 text-sm text-malam/60">Batas pengeluaran tiap kategori. Kosongkan kalau tidak perlu.</p>

        <ul className="mt-4 space-y-3">
          {KATEGORI.filter((k) => k.tipe === "keluar").map(({ id, label, icon: Icon }) => (
            <li key={id} className="flex items-center gap-3">
              <Icon className="h-5 w-5 shrink-0" />
              <label htmlFor={`b-${id}`} className="w-24 shrink-0 text-sm font-medium">{label}</label>
              <input id={`b-${id}`} inputMode="numeric" placeholder="Tanpa batas" value={nilai[id] ?? ""}
                onChange={(e) => setNilai({ ...nilai, [id]: e.target.value.replace(/\D/g, "") })}
                className="min-h-11 w-full rounded-xl border border-malam/15 px-3 text-base" />
            </li>
          ))}
        </ul>

        <button className="mt-5 min-h-12 w-full rounded-xl bg-malam text-base font-bold text-white">Simpan budget</button>
      </form>
    </div>
  );
}