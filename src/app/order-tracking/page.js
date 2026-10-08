import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";
import OrderTracker from "@/components/OrderTracker";
import { SITE } from "@/lib/site";

export const metadata = { title: "Order Tracking | IPS HATT" };

export default async function OrderTrackingPage({ searchParams }) {
  // No backend yet: show contact options instead of the tracking form
  if (process.env.NEXT_PUBLIC_ORDER_MODE !== "woocommerce") {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
          Order Status
        </h1>
        <p className="mt-3 text-slate-600">
          Online tracking is not available yet. To check the status of your
          order, please contact us with your order number.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`tel:${SITE.phones[0].tel}`}
            className="inline-flex items-center gap-2 bg-[#002147] hover:bg-slate-900 text-white font-bold px-6 py-3 rounded-xl transition-colors"
          >
            <Phone className="w-5 h-5" />
            {SITE.phones[0].label}
          </a>
          <a
            href={`https://wa.me/${SITE.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#00a651] hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp Us
          </a>
        </div>
        <div className="mt-6">
          <Link
            href="/"
            className="text-sm font-semibold text-[#00a651] hover:underline"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const sp = await searchParams;
  const raw = Array.isArray(sp?.order) ? sp.order[0] : sp?.order;
  const initial = String(raw || "")
    .replace(/\D/g, "")
    .slice(0, 12);

  return <OrderTracker initialOrder={initial} />;
}
