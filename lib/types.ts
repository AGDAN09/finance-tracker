export type Tipe = "masuk" | "keluar";
export type Transaksi = { id: string; tipe: Tipe; nominal: number; kategori: string; tanggal: string; catatan: string };
