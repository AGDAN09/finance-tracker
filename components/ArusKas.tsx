"use client";

import { useMemo } from "react";
import { geserBulan } from "@/lib/format";
import { useTx } from "./TransaksiProvider";

const singkat = (k: string) => new Intl.DateTimeFormat("id-ID", { month: "short" }).format(new Date(`${k}-01T00:00:00`));
const ringkas = (n: number) => (n >= 1_000_000 ? `${+(n / 1_000_000).toFixed(1)} jt` : n >= 1000 ? `${Math.round(n / 1000)} rb` : String(n));

export default function ArusKas() {
  const { data, bulan } = useTx();

  const baris = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => geserBulan(bulan, i - 5)).map((k) => {
        const d = data.filter((t) => t.tanggal.startsWith(k));
        const jumlah = (tipe: string) => d.filter((t) => t.tipe === tipe).reduce((a, t) => a + t.nominal, 0);
        return { k, masuk: jumlah("masuk"), keluar: jumlah("keluar") };
      }),
    [data, bulan]
  );

  const maks = Math.max(1, ...baris.flatMap((r) => [r.masuk, r.keluar]));
  const tinggi = (n: number) => (n / maks) * 130;

  return (
    <div>
      <svg viewBox="0 0 360 190" className="w-full" role="img" aria-label="Grafik pemasukan dan pengeluaran 6 bulan terakhir">
        <text x="0" y="10" fontSize="11" className="fill-malam/60">Maks. {ringkas(maks)}</text>
        <line x1="0" x2="360" y1="150" y2="150" className="stroke-malam/15" />
        {baris.map((r, i) => {
          const x = 10 + i * 58;
          return (
            <g key={r.k}>
              <title>{`${singkat(r.k)}: masuk ${ringkas(r.masuk)}, keluar ${ringkas(r.keluar)}`}</title>
              <rect x={x} y={150 - tinggi(r.masuk)} width="24" height={tinggi(r.masuk)} rx="4" className="fill-mint" />
              <rect x={x + 26} y={150 - tinggi(r.keluar)} width="24" height={tinggi(r.keluar)} rx="4" className="fill-koral" />
              <text x={x + 25} y="170" fontSize="12" textAnchor="middle" className={r.k === bulan ? "fill-malam font-bold" : "fill-malam/60"}>{singkat(r.k)}</text>
            </g>
          );
        })}
      </svg>
      <p className="mt-1 flex gap-4 text-sm text-malam/70">
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-mint" /> Masuk</span>
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-koral" /> Keluar</span>
      </p>
    </div>
  );
}