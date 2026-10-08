import { NextResponse } from "next/server";
import { api } from "@/lib/woocommerce";
import { normalizePhone } from "@/lib/checkout";
import { decodeHtml } from "@/lib/html";
import { SITE } from "@/lib/site";
const NOT_FOUND =
  "We could not find an order with these details. Please check your order number and mobile number.";

const fail = (error, status = 400) => NextResponse.json({ error }, { status });

// Simple rate limit (server restart hole reset hoy, tai eta best-effort)
const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < 60_000);
  arr.push(now);
  hits.set(ip, arr);
  if (hits.size > 5000) hits.clear();
  return arr.length > 8;
}

const strip = (s = "") =>
  decodeHtml(String(s).replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();

const maskPhone = (p = "") =>
  p.length >= 7 ? `${p.slice(0, 3)}****${p.slice(-3)}` : "***";

// WooCommerce status -> timeline step (1..4)
function mapStatus(status = "") {
  if (status === "cancelled")
    return { kind: "cancelled", step: 0, label: "Cancelled" };
  if (status === "failed") return { kind: "failed", step: 0, label: "Failed" };
  if (status === "refunded")
    return { kind: "refunded", step: 0, label: "Refunded" };
  if (status === "completed")
    return { kind: "progress", step: 4, label: "Delivered" };
  if (/ship|transit|dispatch|courier|delivery/.test(status))
    return { kind: "progress", step: 3, label: "On the Way" };
  if (status === "processing")
    return { kind: "progress", step: 2, label: "Processing" };
  // pending, on-hold, onno kono custom status
  return { kind: "progress", step: 1, label: "Order Received" };
}

// Courier tracking ID: order meta theke best-effort khuje ber kora
function findTracking(meta = []) {
  for (const m of meta) {
    const key = String(m.key || "");
    if (!/tracking|consignment/i.test(key)) continue;
    const v = m.value;
    if (typeof v === "string" && v.trim() && v.length < 100) {
      return { id: v.trim(), provider: "" };
    }
    if (Array.isArray(v) && v[0] && typeof v[0] === "object") {
      const t = v[0];
      const id = t.tracking_number || t.consignment_id;
      if (id) {
        return {
          id: String(id),
          provider: String(
            t.tracking_provider || t.custom_tracking_provider || ""
          ),
          link: typeof t.tracking_link === "string" ? t.tracking_link : "",
        };
      }
    }
  }
  return null;
}

export async function POST(req) {
  // WhatsApp mode-e online tracking nai
  if ((process.env.ORDER_MODE || "whatsapp") !== "woocommerce") {
    return fail(
      `Online tracking is not available yet. Please contact us on WhatsApp or call ${SITE.phones[0].label} for your order status.`,
      503
    );
  }

  const ip = (req.headers.get("x-forwarded-for") || "unknown")
    .split(",")[0]
    .trim();
  if (limited(ip))
    return fail("Too many attempts. Please wait a minute and try again.", 429);

  let body;
  try {
    body = await req.json();
  } catch {
    return fail("Invalid request.");
  }

  const orderNo = String(body.order || "").replace(/[^\d]/g, "");
  const phone = normalizePhone(body.phone);

  if (!orderNo || orderNo.length > 12)
    return fail("Please enter your order number.");
  if (!/^01[3-9]\d{8}$/.test(phone))
    return fail("Please enter a valid mobile number, for example 01712345678.");

  try {
    const { data: order } = await api.get(`orders/${orderNo}`);

    const orderPhone = normalizePhone(order?.billing?.phone || "");
    const shipPhone = normalizePhone(order?.shipping?.phone || "");
    if (phone !== orderPhone && phone !== shipPhone)
      return fail(NOT_FOUND, 404);

    // Admin-er "customer note" gulo update hishebe dekhano hobe
    let updates = [];
    try {
      const { data: notes } = await api.get(`orders/${orderNo}/notes`);
      updates = (notes || [])
        .filter((n) => n.customer_note)
        .slice(0, 10)
        .map((n) => ({
          id: n.id,
          text: strip(n.note),
          date: n.date_created_gmt ? `${n.date_created_gmt}Z` : n.date_created,
        }));
    } catch {}

    const st = mapStatus(order.status);
    const b = order.billing || {};

    return NextResponse.json({
      number: order.number,
      status: order.status,
      kind: st.kind,
      step: st.step,
      statusLabel: st.label,
      date: order.date_created_gmt
        ? `${order.date_created_gmt}Z`
        : order.date_created,
      total: order.total,
      payment: order.payment_method_title,
      name: b.first_name || "",
      district: b.city || b.state || "",
      phone: maskPhone(orderPhone || phone),
      items: (order.line_items || []).map((li) => ({
        id: li.id,
        name: decodeHtml(li.name),
        qty: li.quantity,
        total: li.total,
      })),
      tracking: findTracking(order.meta_data),
      updates,
    });
  } catch (err) {
    if (err?.response?.status === 404) return fail(NOT_FOUND, 404);
    console.error("Track error:", err?.response?.data || err);
    return fail(
      "We cannot load the order status right now. Please try again shortly.",
      500
    );
  }
}
