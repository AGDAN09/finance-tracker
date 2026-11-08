"use client";

import { createContext, useContext, useState } from "react";
import type { Transaksi } from "@/lib/types";
import { bulanIni } from "@/lib/format";
import { useLocalStorage } from "@/lib/useLocalStorage";
import FormSheet from "./FormSheet";

const contoh: Transaksi[] = [
  { id: "a1", tipe: "masuk", nominal: 1500000, kategori: "uang-saku", tanggal: "2026-11-01", catatan: "Kiriman bulanan" },
  { id: "a2", tipe: "keluar", nominal: 18000, kategori: "makan", tanggal: "2026-11-06", catatan: "Nasi goreng" },
  { id: "a3", tipe: "keluar", nominal: 50000, kategori: "transport", tanggal: "2026-11-05", catatan: "Bensin" },
  { id: "a4", tipe: "keluar", nominal: 85000, kategori: "tagihan", tanggal: "2026-11-03", catatan: "Paket data" },
  { id: "a5", tipe: "keluar", nominal: 120000, kategori: "belanja", tanggal: "2026-11-02", catatan: "Buku catatan dan alat tulis" },
];

type Ctx = {
  data: Transaksi[];
  siap: boolean;
  bulan: string;
  setBulan: (b: string) => void;
  tambah: (t: Omit<Transaksi, "id">) => void;
  hapus: (id: string) => void;
  buka: () => void;
};

const TxContext = createContext<Ctx | null>(null);

export function useTx() {
  const c = useContext(TxContext);
  if (!c) throw new Error("useTx harus dipakai di dalam TransaksiProvider");
  return c;
}

export default function TransaksiProvider({ children }: { children: React.ReactNode }) {
  const [data, setData, siap] = useLocalStorage<Transaksi[]>("saku:transaksi", contoh);
  const [bulan, setBulan] = useState(bulanIni());
  const [terbuka, setTerbuka] = useState(false);

  const tambah = (t: Omit<Transaksi, "id">) => setData((l) => [{ id: crypto.randomUUID(), ...t }, ...l]);
  const hapus = (id: string) => setData((l) => l.filter((t) => t.id !== id));

  return (
    <TxContext.Provider value={{ data, siap, bulan, setBulan, tambah, hapus, buka: () => setTerbuka(true) }}>
      {children}
      {terbuka && <FormSheet onClose={() => setTerbuka(false)} />}
    </TxContext.Provider>
  );
}
