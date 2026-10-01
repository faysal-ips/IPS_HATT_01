"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Loader2,
  AlertCircle,
  ClipboardCheck,
  PackageCheck,
  Truck,
  CheckCircle2,
  XCircle,
  Undo2,
  Phone,
} from "lucide-react";

const fmt = (n) => `৳${Number(n || 0).toLocaleString("en-BD")}`;
const fmtDate = (d) =>
  d
    ? new Date(d).toLocaleString("en-GB", {
        timeZone: "Asia/Dhaka",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "";

const STEPS = [
  { label: "Order Received", sub: "Order peyechi", Icon: ClipboardCheck },
  { label: "Processing", sub: "Confirm o prostut hocche", Icon: PackageCheck },
  { label: "On the way", sub: "Courier-e pathano hoyeche", Icon: Truck },
  { label: "Delivered", sub: "Haate pouchheche", Icon: CheckCircle2 },
];

const inputCls =
  "w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-base text-slate-900 bg-white outline-none transition-colors placeholder:text-slate-400 focus:border-[#00a651]";

function Timeline({ step }) {
  return (
    <ol className="grid grid-cols-4 gap-2">
      {STEPS.map((s, i) => {
        const n = i + 1;
        const done = n < step || step === 4;
        const current = n === step && step !== 4;
        const Icon = s.Icon;
        return (
          <li
            key={s.label}
            className="flex flex-col items-center text-center relative"
          >
            {i > 0 && (
              <span
                className={`absolute top-5 right-1/2 w-full h-1 -z-0 ${
                  n <= step ? "bg-[#00a651]" : "bg-slate-200"
                }`}
              />
            )}
            <span
              className={`relative z-10 w-11 h-11 rounded-full flex items-center justify-center border-4 border-white shadow ${
                done
                  ? "bg-[#00a651] text-white"
                  : current
                  ? "bg-white text-[#00a651] ring-2 ring-[#00a651] animate-pulse"
                  : "bg-slate-200 text-slate-400"
              }`}
            >
              <Icon className="w-5 h-5" />
            </span>
            <span
              className={`mt-2 text-xs sm:text-sm font-bold ${
                done || current ? "text-slate-900" : "text-slate-400"
              }`}
            >
              {s.label}
            </span>
            <span className="hidden sm:block text-[11px] text-slate-500 mt-0.5">
              {s.sub}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export default function OrderTracker({ initialOrder = "" }) {
  const [order, setOrder] = useState(initialOrder);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError("");
    setData(null);
    try {
      const res = await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order, phone }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Kichu ekta bhul hoyeche.");
      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const isProblem = data && data.kind !== "progress";

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
      <nav className="text-sm text-slate-500 mb-4 flex items-center gap-2">
        <Link href="/" className="hover:text-[#00a651]">
          Home
        </Link>
        <span>/</span>
        <span className="text-slate-800 font-medium">Order Tracking</span>
      </nav>

      <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
        Order Tracking
      </h1>
      <p className="text-slate-600 mt-1.5 mb-6">
        Apnar order number ar order-e deya mobile number likhun.
      </p>

      <form
        onSubmit={onSubmit}
        noValidate
        className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 md:p-7 grid sm:grid-cols-2 gap-4"
      >
        <div>
          <label
            htmlFor="t-order"
            className="block text-sm font-bold text-slate-800 mb-1.5"
          >
            Order Number
          </label>
          <input
            id="t-order"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            inputMode="numeric"
            placeholder="Jemon: 7667"
            className={inputCls}
          />
        </div>
        <div>
          <label
            htmlFor="t-phone"
            className="block text-sm font-bold text-slate-800 mb-1.5"
          >
            Mobile Number
          </label>
          <input
            id="t-phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="01XXXXXXXXX"
            className={inputCls}
          />
        </div>

        <div className="sm:col-span-2">
          {error && (
            <div
              role="alert"
              className="mb-4 flex gap-2.5 rounded-xl bg-rose-50 border border-rose-200 p-3.5 text-sm text-rose-800"
            >
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto bg-[#00a651] hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold px-8 py-3 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Khujchi...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" /> Track Order
              </>
            )}
          </button>
        </div>
      </form>

      {data && (
        <div className="mt-6 bg-white rounded-2xl border border-slate-100 shadow-sm p-5 md:p-7 space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Order
              </p>
              <p className="text-xl font-extrabold text-slate-900">
                #{data.number}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                {fmtDate(data.date)}
              </p>
            </div>
            <span
              className={`px-3.5 py-1.5 rounded-full text-sm font-bold ${
                isProblem
                  ? "bg-rose-100 text-rose-800"
                  : data.step === 4
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-amber-100 text-amber-800"
              }`}
            >
              {data.statusLabel}
            </span>
          </div>

          {isProblem ? (
            <div className="flex gap-3 rounded-xl bg-rose-50 border border-rose-200 p-4 text-rose-900">
              {data.kind === "refunded" ? (
                <Undo2 className="w-6 h-6 shrink-0" />
              ) : (
                <XCircle className="w-6 h-6 shrink-0" />
              )}
              <p className="text-sm">
                {data.kind === "cancelled" && "Ei order cancel kora hoyeche."}
                {data.kind === "failed" && "Ei order complete hoyni."}
                {data.kind === "refunded" &&
                  "Ei order-er taka ferot deya hoyeche."}{" "}
                Proyojone call korun: <strong>+880 9611901250</strong>
              </p>
            </div>
          ) : (
            <Timeline step={data.step} />
          )}

          {data.tracking && (
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Courier Tracking
              </p>
              <p className="font-bold text-slate-900">
                {data.tracking.provider && `${data.tracking.provider}: `}
                {data.tracking.id}
              </p>
              {data.tracking.link && (
                <a
                  href={data.tracking.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-1 text-[#00a651] font-semibold hover:underline"
                >
                  Courier site-e dekhun
                </a>
              )}
            </div>
          )}

          {data.updates?.length > 0 && (
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-3">
                Updates
              </h2>
              <ul className="space-y-3 border-l-2 border-emerald-200 pl-4">
                {data.updates.map((u) => (
                  <li key={u.id}>
                    <p className="text-sm text-slate-800">{u.text}</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {fmtDate(u.date)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-2">
              Items
            </h2>
            <ul className="divide-y divide-slate-100">
              {data.items.map((it) => (
                <li key={it.id} className="flex justify-between gap-4 py-2.5">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-800">
                      {it.name}
                    </p>
                    <p className="text-xs text-slate-500">Qty: {it.qty}</p>
                  </div>
                  <span className="text-sm font-bold text-slate-900 whitespace-nowrap">
                    {fmt(it.total)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center border-t border-slate-200 mt-2 pt-3">
              <span className="font-bold text-slate-900">Total</span>
              <span className="text-xl font-black text-[#002147]">
                {fmt(data.total)}
              </span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 border-t border-slate-200 pt-5 text-sm">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Deliver To
              </p>
              <p className="font-semibold text-slate-800">{data.name}</p>
              <p className="text-slate-600">{data.district}</p>
              <p className="text-slate-600">{data.phone}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Payment
              </p>
              <p className="font-semibold text-slate-800">{data.payment}</p>
            </div>
          </div>

          <a
            href="tel:+8809611901250"
            className="flex items-center justify-center gap-2 border-2 border-slate-200 hover:border-[#00a651] hover:text-[#00a651] text-slate-700 font-semibold py-2.5 rounded-xl transition-colors text-sm"
          >
            <Phone className="w-4 h-4" /> Shahajyo lagbe? Call korun
          </a>
        </div>
      )}
    </div>
  );
}
