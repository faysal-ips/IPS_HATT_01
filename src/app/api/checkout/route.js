import { NextResponse } from "next/server";
import { api } from "@/lib/woocommerce";
import { validateCheckout, normalizePhone } from "@/lib/checkout";
import { SITE } from "@/lib/site";

const fail = (error, status = 400, extra = {}) =>
  NextResponse.json({ error, ...extra }, { status });

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return fail("Invalid request.");
  }

  // Honeypot: reject bots
  if (body.website) return fail("Invalid request.");

  const errors = validateCheckout(body);
  if (Object.keys(errors).length) {
    return fail("Please check the form.", 422, { errors });
  }

  // Sanitize cart items and merge duplicates
  const map = new Map();
  for (const it of Array.isArray(body.items) ? body.items.slice(0, 50) : []) {
    const id = Number.parseInt(it?.id, 10);
    const qty = Number.parseInt(it?.qty, 10);
    if (!Number.isInteger(id) || id <= 0) continue;
    if (!Number.isInteger(qty) || qty < 1 || qty > 99) continue;
    map.set(id, Math.min(99, (map.get(id) || 0) + qty));
  }
  if (map.size === 0) return fail("Your cart is empty.");

  try {
    // Verify real products (price and stock)
    const ids = [...map.keys()];
    const { data: products } = await api.get("products", {
      include: ids.join(","),
      per_page: 100,
      status: "publish",
    });

    const byId = new Map(products.map((p) => [p.id, p]));
    for (const [id, qty] of map) {
      const p = byId.get(id);
      if (!p)
        return fail(
          "A product in your cart is no longer available. Please update your cart."
        );
      if (p.stock_status !== "instock")
        return fail(`"${p.name}" is currently out of stock.`);
      if (p.manage_stock && p.stock_quantity != null && p.stock_quantity < qty)
        return fail(`Only ${p.stock_quantity} of "${p.name}" left in stock.`);
    }

    const name = body.name.trim();
    const phone = normalizePhone(body.phone);
    const email = String(body.email || "").trim();
    const address = body.address.trim();

    const orderData = {
      payment_method: "cod",
      payment_method_title: "Cash on Delivery",
      set_paid: false,
      status: "processing",
      billing: {
        first_name: name,
        address_1: address,
        city: body.district,
        state: body.district,
        country: "BD",
        phone,
        ...(email ? { email } : {}),
      },
      shipping: {
        first_name: name,
        address_1: address,
        city: body.district,
        state: body.district,
        country: "BD",
        phone,
      },
      customer_note: String(body.note || "").trim(),
      line_items: ids.map((id) => ({ product_id: id, quantity: map.get(id) })),
      shipping_lines: [
        {
          method_id: "free_shipping",
          method_title: "Free Delivery",
          total: "0",
        },
      ],
      meta_data: [{ key: "_ordered_from", value: "ipshatt-frontend" }],
    };

    const { data: order } = await api.post("orders", orderData);

    return NextResponse.json({
      id: order.id,
      number: order.number,
      key: order.order_key,
    });
  } catch (err) {
    console.error("Checkout error:", err?.response?.data || err);
    return fail(
      `We could not place your order. Please try again or call ${SITE.phones[0].label}.`,
      500
    );
  }
}
