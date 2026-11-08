export const rupiah = (n: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);

export const hariIni = () => new Date().toLocaleDateString("sv-SE");
export const bulanIni = () => hariIni().slice(0, 7);

export const tanggalPendek = (iso: string) =>
  new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short" }).format(new Date(iso));

export const labelBulan = (kunci: string) =>
  new Intl.DateTimeFormat("id-ID", { month: "long", year: "numeric" }).format(new Date(`${kunci}-01T00:00:00`));

export const geserBulan = (kunci: string, d: number) => {
  const [y, m] = kunci.split("-").map(Number);
  const t = new Date(y, m - 1 + d, 1);
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}`;
};
