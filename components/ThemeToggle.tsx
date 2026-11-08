"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [gelap, setGelap] = useState(false);

  useEffect(() => setGelap(document.documentElement.classList.contains("dark")), []);

  const ganti = () => {
    const baru = !gelap;
    setGelap(baru);
    document.documentElement.classList.toggle("dark", baru);
    try { localStorage.setItem("tema", baru ? "gelap" : "terang"); } catch {}
  };

  return (
    <button onClick={ganti} aria-label={gelap ? "Pakai tema terang" : "Pakai tema gelap"}
      className="flex h-11 w-11 items-center justify-center rounded-full bg-white">
      {gelap ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}