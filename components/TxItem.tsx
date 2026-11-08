import { Trash2 } from "lucide-react";
import { cariKategori } from "@/lib/kategori";
import { rupiah, tanggalPendek } from "@/lib/format";
import type { Transaksi } from "@/lib/types";

export default function TxItem({ t, onHapus }: { t: Transaksi; onHapus?: () => void }) {
  const k = cariKategori(t.kategori);
  const Icon = k.icon;
  const masuk = t.tipe === "masuk";
  return (
    <li className="flex items-center gap-3 py-3">
      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${masuk ? "bg-mint-soft text-mint" : "bg-koral-soft text-koral"}`}>
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold">{t.catatan || k.label}</p>
        <p className="text-sm text-malam/60">{k.label} · {tanggalPendek(t.tanggal)}</p>
      </div>
      <p className={`font-bold ${masuk ? "text-mint" : "text-koral"}`}>{masuk ? "+" : "-"}{rupiah(t.nominal)}</p>
      {onHapus && (
        <button onClick={onHapus} aria-label={`Hapus ${t.catatan || k.label}`} className="flex h-11 w-11 items-center justify-center rounded-full text-malam/50 hover:bg-koral-soft hover:text-koral">
          <Trash2 className="h-4 w-4" />
        </button>
      )}
    </li>
  );
}
