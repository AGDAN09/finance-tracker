import {
  Car, CircleDollarSign, Gamepad2, Gift, GraduationCap, HeartPulse, MoreHorizontal,
  ReceiptText, ShoppingBag, Utensils, Wallet, type LucideIcon,
} from "lucide-react";
import type { Tipe } from "./types";

export type Kategori = { id: string; label: string; tipe: Tipe; icon: LucideIcon };

export const KATEGORI: Kategori[] = [
  { id: "makan", label: "Makan", tipe: "keluar", icon: Utensils },
  { id: "transport", label: "Transport", tipe: "keluar", icon: Car },
  { id: "belanja", label: "Belanja", tipe: "keluar", icon: ShoppingBag },
  { id: "tagihan", label: "Tagihan", tipe: "keluar", icon: ReceiptText },
  { id: "hiburan", label: "Hiburan", tipe: "keluar", icon: Gamepad2 },
  { id: "kuliah", label: "Kuliah", tipe: "keluar", icon: GraduationCap },
  { id: "kesehatan", label: "Kesehatan", tipe: "keluar", icon: HeartPulse },
  { id: "lain-keluar", label: "Lainnya", tipe: "keluar", icon: MoreHorizontal },
  { id: "uang-saku", label: "Uang saku", tipe: "masuk", icon: Wallet },
  { id: "gaji", label: "Gaji", tipe: "masuk", icon: CircleDollarSign },
  { id: "hadiah", label: "Hadiah", tipe: "masuk", icon: Gift },
  { id: "lain-masuk", label: "Lainnya", tipe: "masuk", icon: MoreHorizontal },
];

export const cariKategori = (id: string) => KATEGORI.find((k) => k.id === id) ?? KATEGORI[7];
