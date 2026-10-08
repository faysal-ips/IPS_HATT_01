import Link from "next/link";
import { CheckCircle2, PackageSearch } from "lucide-react";
import { api } from "@/lib/woocommerce";
import { SITE } from "@/lib/site";
import WhatsAppResend from "@/components/WhatsAppResend";

export const metadata = { title: "Order Confirmed | IPS HATT" };

const fmt = (n) => `৳${Number(n || 0).toLocaleString("en-BD")}`;

export default async function OrderSuccessPage({ searchParams }) {
  const { order: id, key } = await searchParams;

  // Order sent through WhatsApp (no backend)
  if (key === "received" && /^IH-\d{8}$/.test(String(id || ""))) {
    return (
      <div className="max-w-xl mx-auto px-4 py-14 md:py-20 text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-5">
          <CheckCircle2 className="w-11 h-11 text-[#00a651]" />
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
          Thank you for your order!
        </h1>
        <p className="mt-3 text-slate-600">
          Please make sure you tapped <b>Send</b> in WhatsApp. Our team will
          call you shortly to confirm your order.
        </p>
        <p className="mt-4 inline-block bg-slate-100 text-slate-800 font-bold px-4 py-1.5 rounded-full text-sm">
          Order #{id}
        </p>
        <WhatsAppResend order={id} />
        <p className="mt-6 text-sm text-slate-500">
          Need help? Call us at{" "}
          <a
            href={`tel:${SITE.phones[0].tel}`}
            className="font-bold text-slate-800 hover:text-[#00a651]"
          >
            {SITE.phones[0].label}
          </a>
        </p>
        <Link
          href="/"
          className="inline-block mt-8 bg-[#00a651] hover:bg-emerald-700 text-white font-semibold px-7 py-3 rounded-xl transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  // WooCommerce mode: load the saved order
  let order = null;
  if (id && key && /^\d+$/.test(id)) {
    try {
      const { data } = await api.get(`orders/${id}`);
      if (data?.order_key === key) order = data;
    } catch (err) {
      console.error("Order fetch error:", err?.response?.data || err);
    }
  }

  if (!order) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <PackageSearch className="w-14 h-14 mx-auto text-slate-400 mb-4" />
        <h1 className="text-2xl font-extrabold text-slate-800 mb-2">
          Order not found
        </h1>
        <p className="text-slate-500 mb-6">
          This link is invalid or has expired. If you need help with your order,
          call us at {SITE.phones[0].label}.
        </p>
        <Link
          href="/"
          className="inline-block bg-[#00a651] hover:bg-emerald-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const b = order.billing || {};

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-11 h-11 text-[#00a651]" />
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
          Your order has been placed!
        </h1>
        <p className="text-slate-600 mt-2">
          Thank you, {b.first_name}. Our team will call you shortly to confirm
          your order.
        </p>
        <p className="mt-3 inline-block bg-slate-100 text-slate-800 font-bold px-4 py-1.5 rounded-full text-sm">
          Order #{order.number}
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 md:p-7 space-y-6">
        <ul className="divide-y divide-slate-100">
          {order.line_items.map((li) => (
            <li
              key={li.id}
              className="flex items-start justify-between gap-4 py-3"
            >
              <div className="min-w-0">
                <p className="font-semibold text-slate-800">{li.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Qty: {li.quantity}
                </p>
              </div>
              <span className="font-bold text-slate-900 whitespace-nowrap">
                {fmt(li.total)}
              </span>
            </li>
          ))}
        </ul>

        <div className="border-t border-slate-200 pt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-600">Delivery</span>
            <span className="font-semibold text-[#00a651]">Free</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-base font-bold text-slate-900">Total</span>
            <span className="text-2xl font-black text-[#002147]">
              {fmt(order.total)}
            </span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 border-t border-slate-200 pt-5 text-sm">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Delivery Address
            </p>
            <p className="font-semibold text-slate-800">{b.first_name}</p>
            <p className="text-slate-600">{b.address_1}</p>
            <p className="text-slate-600">{b.city}</p>
            <p className="text-slate-600">{b.phone}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Payment
            </p>
            <p className="font-semibold text-slate-800">
              {order.payment_method_title}
            </p>
            <p className="text-slate-600">
              Pay in cash when you receive your products.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href={`/order-tracking?order=${order.number}`}
          className="inline-block bg-[#002147] hover:bg-slate-900 text-white font-semibold px-7 py-3 rounded-xl transition-colors"
        >
          Track Order
        </Link>
        <Link
          href="/"
          className="inline-block bg-[#00a651] hover:bg-emerald-700 text-white font-semibold px-7 py-3 rounded-xl transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
