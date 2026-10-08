"use client";

import { useEffect, useState } from "react";

export default function WhatsAppResend({ order }) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    try {
      const saved = JSON.parse(
        sessionStorage.getItem("ips-wa-order") || "null"
      );
      if (saved?.ref === order) setUrl(saved.url);
    } catch {}
  }, [order]);

  if (!url) return null;

  return (
    <p className="mt-5 text-sm text-slate-500">
      WhatsApp did not open?{" "}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold text-[#00a651] hover:underline"
      >
        Tap here to send your order
      </a>
    </p>
  );
}
