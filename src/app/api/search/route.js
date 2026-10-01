import { NextResponse } from "next/server";
import { api } from "@/lib/woocommerce";
import { decodeHtml } from "@/lib/html";

export async function GET(req) {
  const q = (new URL(req.url).searchParams.get("q") || "").trim().slice(0, 60);
  if (q.length < 2) return NextResponse.json({ results: [] });

  try {
    const { data } = await api.get("products", {
      search: q,
      per_page: 6,
      status: "publish",
    });

    const results = (data || []).map((p) => ({
      id: p.id,
      slug: p.slug,
      name: decodeHtml(p.name),
      price: parseFloat(p.sale_price || p.price) || 0,
      image: p.images?.[0]?.src || "",
      inStock: p.stock_status === "instock" || !p.stock_status,
    }));

    return NextResponse.json(
      { results },
      {
        headers: {
          "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
        },
      }
    );
  } catch (err) {
    console.error("Search API error:", err?.response?.data || err);
    return NextResponse.json({ results: [] });
  }
}
