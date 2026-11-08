import { Trash2 } from "lucide-react";
import { cariKategori } from "@/lib/kategori";
import { rupiah, tanggalPendek } from "@/lib/format";
import type { Transaksi } from "@/lib/types";

export default function TxItem({ t, onEdit, onHapus }: { t: Transaksi; onEdit?: () => void; onHapus?: () => void }) {
  const k = cariKategori(t.kategori);
  const Icon = k.icon;
  const masuk = t.tipe === "masuk";
  const nama = t.catatan || k.label;

  const isi = (
    <>
      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${masuk ? "bg-mint-soft text-mint" : "bg-koral-soft text-koral"}`}>
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-semibold">{nama}</span>
        <span className="block text-sm text-malam/60">{k.label} · {tanggalPendek(t.tanggal)}</span>
      </span>
      <span className={`font-bold ${masuk ? "text-mint" : "text-koral"}`}>{masuk ? "+" : "-"}{rupiah(t.nominal)}</span>
    </>
  );

  return (
    <li className="flex items-center gap-1">
      {onEdit ? (
        <button onClick={onEdit} aria-label={`Ubah ${nama}`} className="flex min-h-16 min-w-0 flex-1 items-center gap-3 rounded-xl text-left hover:bg-white/60">{isi}</button>
      ) : (
        <div className="flex min-h-16 min-w-0 flex-1 items-center gap-3">{isi}</div>
      )}
      {onHapus && (
        <button onClick={onHapus} aria-label={`Hapus ${nama}`} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-malam/50 hover:bg-koral-soft hover:text-koral">
          <Trash2 className="h-4 w-4" />
        </button>
      )}
    </li>
  );
}