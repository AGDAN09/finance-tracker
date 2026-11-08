import { cariKategori } from "./kategori";
import type { Transaksi } from "./types";

// Teks yang diawali = + - @ diberi tanda ' agar tidak dijalankan sebagai rumus di Excel
const kutip = (s: string | number) => {
  const teks = typeof s === "string" && /^[=+\-@\t\r]/.test(s) ? `'${s}` : String(s);
  return `"${teks.replace(/"/g, '""')}"`;
};

export function unduhCSV(daftar: Transaksi[], nama: string) {
  const baris = [
    ["Tanggal", "Tipe", "Kategori", "Catatan", "Nominal"],
    ...daftar.map((t) => [
      t.tanggal,
      t.tipe === "masuk" ? "Pemasukan" : "Pengeluaran",
      cariKategori(t.kategori).label,
      t.catatan,
      t.nominal,
    ]),
  ];
  // BOM agar Excel membaca UTF-8, pemisah titik koma cocok untuk Excel berbahasa Indonesia
  const isi = "\uFEFF" + baris.map((r) => r.map(kutip).join(";")).join("\r\n");
  const url = URL.createObjectURL(new Blob([isi], { type: "text/csv;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = `${nama}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}