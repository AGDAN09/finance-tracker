import { ImageResponse } from "next/og";

export function GET(_: Request, { params }: { params: { size: string } }) {
  const s = Math.min(1024, Math.max(48, Number(params.size) || 192));
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#1B1F3B" }}>
        <div style={{ width: s * 0.58, height: s * 0.58, borderRadius: "50%", background: "#F2B84B", color: "#1B1F3B", display: "flex", alignItems: "center", justifyContent: "center", fontSize: s * 0.26, fontWeight: 800 }}>
          Rp
        </div>
      </div>
    ),
    { width: s, height: s }
  );
}