import OrderTracker from "@/components/OrderTracker";

export const metadata = { title: "Order Tracking | IPS HATT" };

export default async function OrderTrackingPage({ searchParams }) {
  const sp = await searchParams;
  const raw = Array.isArray(sp?.order) ? sp.order[0] : sp?.order;
  const initial = String(raw || "")
    .replace(/\D/g, "")
    .slice(0, 12);

  return <OrderTracker initialOrder={initial} />;
}
