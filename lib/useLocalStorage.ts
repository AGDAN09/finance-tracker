"use client";

import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, awal: T) {
  const [value, setValue] = useState<T>(awal);
  const [siap, setSiap] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setValue(JSON.parse(raw));
    } catch {}
    setSiap(true);
  }, [key]);

  useEffect(() => {
    if (!siap) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value, siap]);

  return [value, setValue, siap] as const;
}
