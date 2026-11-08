"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { geserBulan, labelBulan } from "@/lib/format";
import { useTx } from "./TransaksiProvider";

export default function MonthPicker() {
  const { bulan, setBulan } = useTx();
  const tombol = "flex h-11 w-11 items-center justify-center rounded-full bg-white hover:bg-white/70";
  return (
    <div className="flex items-center justify-between">
      <button className={tombol} onClick={() => setBulan(geserBulan(bulan, -1))} aria-label="Bulan sebelumnya"><ChevronLeft className="h-5 w-5" /></button>
      <p className="text-base font-bold capitalize">{labelBulan(bulan)}</p>
      <button className={tombol} onClick={() => setBulan(geserBulan(bulan, 1))} aria-label="Bulan berikutnya"><ChevronRight className="h-5 w-5" /></button>
    </div>
  );
}
