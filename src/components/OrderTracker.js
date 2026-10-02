"use client";

import { useEffect, useRef, useState } from "react";
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
  MessageCircle,
  Hash,
  Smartphone,
  RotateCcw,
  Info,
} from "lucide-react";
import { normalizePhone } from "@/lib/checkout";
import { SITE } from "@/lib/site";

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
  { label: "Order Received", sub: "We have your order", Icon: ClipboardCheck },
  { label: "Processing", sub: "Confirming and preparing", Icon: PackageCheck },
  { label: "On the Way", sub: "Handed to the courier", Icon: Truck },
  { label: "Delivered", sub: "Received by you", Icon: CheckCircle2 },
];

const STATUS_NOTE = {
  1: "We have received your order. Our team will call you shortly to confirm it.",
  2: "Your order is confirmed and is being prepared for dispatch.",
  3: "Your order is on its way. Please keep your phone nearby for the delivery call.",
  4: "Your order has been delivered. Thank you for shopping with IPS HATT!",
};

const PROBLEM_NOTE = {
  cancelled: "This order has been cancelled.",
  failed: "This order could not be completed.",
  refunded: "The payment for this order has been refunded.",
};

const inputCls = (err) =>
  `w-full rounded-xl border-2 pl-11 pr-4 py-3 text-base text-slate-900 bg-white outline-none transition-colors placeholder:text-slate-400 ${
    err
      ? "border-rose-400 focus:border-rose-500"
      : "border-slate-200 focus:border-[#00a651]"
  }`;

const circleCls = (done, current) =>
  `relative z-10 w-11 h-11 shrink-0 rounded-full flex items-center justify-center border-4 border-white shadow ${
    done
      ? "bg-[#00a651] text-white"
      : current
      ? "bg-white text-[#00a651] ring-2 ring-[#00a651] animate-pulse"
      : "bg-slate-200 text-slate-400"
  }`;

function Timeline({ step }) {
  const delivered = step === 4;
  return (
    <>
      {/* Tablet / desktop: horizontal */}
      <ol className="hidden sm:grid grid-cols-4 gap-2">
        {STEPS.map((s, i) => {
          const n = i + 1;
          const done = delivered || n < step;
          const current = n === step && !delivered;
          const Icon = s.Icon;
          return (
            <li
              key={s.label}
              aria-current={current ? "step" : undefined}
              className="relative flex flex-col items-center text-center"
            >
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className={`absolute top-5 right-1/2 w-full h-1 ${
                    delivered || n <= step ? "bg-[#00a651]" : "bg-slate-200"
                  }`}
                />
              )}
              <span className={circleCls(done, current)}>
                <Icon className="w-5 h-5" />
              </span>
              <span
                className={`mt-2.5 text-sm font-bold ${
                  done || current ? "text-slate-900" : "text-slate-400"
                }`}
              >
                {s.label}
              </span>
              <span className="mt-0.5 text-xs text-slate-500">{s.sub}</span>
            </li>
          );
        })}
      </ol>

      {/* Mobile: vertical */}
      <ol className="sm:hidden">
        {STEPS.map((s, i) => {
          const n = i + 1;
          const done = delivered || n < step;
          const current = n === step && !delivered;
          const last = i === STEPS.length - 1;
          const Icon = s.Icon;
          return (
            <li
              key={s.label}
              aria-current={current ? "step" : undefined}
              className={`relative flex gap-4 ${last ? "" : "pb-6"}`}
            >
              {!last && (
                <span
                  aria-hidden="true"
                  className={`absolute left-[22px] top-11 bottom-0 w-1 -translate-x-1/2 ${
                    done ? "bg-[#00a651]" : "bg-slate-200"
                  }`}
                />
              )}
              <span className={circleCls(done, current)}>
                <Icon className="w-5 h-5" />
              </span>
              <div className="pt-0.5">
                <p
                  className={`text-base font-bold ${
                    done || current ? "text-slate-900" : "text-slate-400"
                  }`}
                >
                  {s.label}
                </p>
                <p className="text-sm text-slate-500">{s.sub}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </>
  );
}

function Field({ id, label, icon: Icon, error, hint, children }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-bold text-slate-800 mb-1.5"
      >
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
        {children}
      </div>
      {error ? (
        <p
          id={`${id}-error`}
          className="mt-1.5 text-sm text-rose-600 font-medium"
        >
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-slate-500">{hint}</p>
      ) : null}
    </div>
  );
}

export default function OrderTracker({ initialOrder = "" }) {
  const [order, setOrder] = useState(initialOrder);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [data, setData] = useState(null);

  const orderRef = useRef(null);
  const phoneRef = useRef(null);
  const resultRef = useRef(null);

  // Result ashle oikhane scroll kore (mobile-e dorkari)
  useEffect(() => {
    if (data) {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [data]);

  function validate() {
    const e = {};
    const digits = order.replace(/\D/g, "");
    if (!digits) e.order = "Please enter your order number.";
    else if (digits.length > 12) e.order = "This order number looks too long.";
    if (!/^01[3-9]\d{8}$/.test(normalizePhone(phone)))
      e.phone = "Enter a valid mobile number, for example 01712345678.";
    setFieldErrors(e);
    if (e.order) orderRef.current?.focus();
    else if (e.phone) phoneRef.current?.focus();
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev) {
    ev.preventDefault();
    if (loading) return;
    setError("");
    setData(null);
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order, phone }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok)
        throw new Error(
          json.error || "Something went wrong. Please try again."
        );
      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setData(null);
    setError("");
    setOrder("");
    setPhone("");
    setFieldErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => orderRef.current?.focus(), 300);
  }

  const isProblem = data && data.kind !== "progress";
  const delivered = data && !isProblem && data.step === 4;
  const itemCount = data
    ? data.items.reduce((s, it) => s + (it.qty || 0), 0)
    : 0;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 md:py-10">
      <nav className="text-sm text-slate-500 mb-4 flex items-center gap-2">
        <Link href="/" className="hover:text-[#00a651]">
          Home
        </Link>
        <span>/</span>
        <span className="text-slate-800 font-medium">Order Tracking</span>
      </nav>

      {/* Heading (home page-er pattern) */}
      <div className="pb-4 mb-6 border-b border-slate-200">
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#00a651]">
          Order Tracking
        </span>
        <h1 className="mt-1 text-2xl md:text-4xl font-extrabold text-slate-800 leading-tight">
          Track Your <span className="text-[#00a651]">Order</span>
        </h1>
        <p className="mt-2 text-sm md:text-base text-slate-500 font-medium">
          Enter your order number and the mobile number you used at checkout.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={onSubmit}
        noValidate
        className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 md:p-7"
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <Field
            id="t-order"
            label="Order Number"
            icon={Hash}
            error={fieldErrors.order}
            hint="Shown on your order confirmation page."
          >
            <input
              ref={orderRef}
              id="t-order"
              value={order}
              onChange={(e) => {
                setOrder(e.target.value);
                if (fieldErrors.order)
                  setFieldErrors((p) => ({ ...p, order: undefined }));
              }}
              inputMode="numeric"
              placeholder="e.g. 7667"
              aria-invalid={Boolean(fieldErrors.order)}
              aria-describedby={fieldErrors.order ? "t-order-error" : undefined}
              className={inputCls(fieldErrors.order)}
            />
          </Field>

          <Field
            id="t-phone"
            label="Mobile Number"
            icon={Smartphone}
            error={fieldErrors.phone}
            hint="The number you gave when placing the order."
          >
            <input
              ref={phoneRef}
              id="t-phone"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (fieldErrors.phone)
                  setFieldErrors((p) => ({ ...p, phone: undefined }));
              }}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="01XXXXXXXXX"
              aria-invalid={Boolean(fieldErrors.phone)}
              aria-describedby={fieldErrors.phone ? "t-phone-error" : undefined}
              className={inputCls(fieldErrors.phone)}
            />
          </Field>
        </div>

        {error && (
          <div
            role="alert"
            className="mt-4 flex gap-2.5 rounded-xl bg-rose-50 border border-rose-200 p-3.5 text-sm text-rose-800"
          >
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-5 w-full sm:w-auto bg-[#00a651] hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-base font-bold px-8 py-3 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Searching...
            </>
          ) : (
            <>
              <Search className="w-5 h-5" /> Track Order
            </>
          )}
        </button>
      </form>

      {/* Result */}
      {data && (
        <div
          ref={resultRef}
          className="scroll-mt-24 mt-6 bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 md:p-7 space-y-6"
        >
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Order
              </p>
              <p className="text-2xl font-extrabold text-slate-900">
                #{data.number}
              </p>
              <p className="text-sm text-slate-500 mt-0.5">
                Placed on {fmtDate(data.date)}
              </p>
            </div>
            <span
              className={`px-3.5 py-1.5 rounded-full text-sm font-bold ${
                isProblem
                  ? "bg-rose-100 text-rose-800"
                  : delivered
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-amber-100 text-amber-800"
              }`}
            >
              {data.statusLabel}
            </span>
          </div>

          {/* Quick facts */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {[
              { label: "Items", value: itemCount },
              { label: "Total", value: fmt(data.total) },
              { label: "Payment", value: data.payment },
            ].map((x) => (
              <div
                key={x.label}
                className="rounded-xl bg-slate-50 border border-slate-200 px-2.5 py-3 sm:px-4 text-center sm:text-left"
              >
                <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                  {x.label}
                </p>
                <p className="mt-0.5 text-sm sm:text-base font-extrabold text-slate-900 break-words leading-snug">
                  {x.value}
                </p>
              </div>
            ))}
          </div>

          {/* Status message + timeline */}
          {isProblem ? (
            <div className="flex gap-3 rounded-xl bg-rose-50 border border-rose-200 p-4 text-rose-900">
              {data.kind === "refunded" ? (
                <Undo2 className="w-6 h-6 shrink-0" />
              ) : (
                <XCircle className="w-6 h-6 shrink-0" />
              )}
              <p className="text-sm sm:text-base leading-relaxed">
                {PROBLEM_NOTE[data.kind] ||
                  "There is a problem with this order."}{" "}
                If you need help, call us at{" "}
                <a
                  href={`tel:${SITE.phones[0].tel}`}
                  className="font-bold underline"
                >
                  {SITE.phones[0].label}
                </a>
                .
              </p>
            </div>
          ) : (
            <>
              <div
                className={`flex gap-3 rounded-xl border p-4 ${
                  delivered
                    ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                    : "bg-slate-50 border-slate-200 text-slate-700"
                }`}
              >
                {delivered ? (
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                ) : (
                  <Info className="w-5 h-5 shrink-0 mt-0.5" />
                )}
                <p className="text-sm sm:text-base leading-relaxed">
                  {STATUS_NOTE[data.step]}
                </p>
              </div>
              <Timeline step={data.step} />
            </>
          )}

          {/* Courier */}
          {data.tracking && (
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Courier Tracking
              </p>
              <p className="text-base font-bold text-slate-900 break-all">
                {data.tracking.provider && `${data.tracking.provider}: `}
                {data.tracking.id}
              </p>
              {data.tracking.link && (
                <a
                  href={data.tracking.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-1 text-sm text-[#00a651] font-semibold hover:underline"
                >
                  Track on the courier website
                </a>
              )}
            </div>
          )}

          {/* Updates */}
          {data.updates?.length > 0 && (
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-3">
                Updates
              </h2>
              <ul className="space-y-4 border-l-2 border-slate-200 pl-4">
                {data.updates.map((u) => (
                  <li key={u.id} className="relative">
                    <span className="absolute -left-[22px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#00a651] ring-4 ring-white" />
                    <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
                      {u.text}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {fmtDate(u.date)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Items */}
          <div>
            <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-2">
              Items
            </h2>
            <ul className="divide-y divide-slate-100">
              {data.items.map((it) => (
                <li key={it.id} className="flex justify-between gap-4 py-3">
                  <div className="min-w-0">
                    <p className="text-sm sm:text-base font-semibold text-slate-800">
                      {it.name}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-500">
                      Qty: {it.qty}
                    </p>
                  </div>
                  <span className="text-sm sm:text-base font-bold text-slate-900 whitespace-nowrap">
                    {fmt(it.total)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center border-t border-slate-200 mt-1 pt-3">
              <span className="font-bold text-slate-900">Total</span>
              <span className="text-xl sm:text-2xl font-black text-[#002147]">
                {fmt(data.total)}
              </span>
            </div>
          </div>

          {/* Delivery details */}
          <div className="border-t border-slate-200 pt-5">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Delivering To
            </p>
            <p className="text-base font-bold text-slate-900">{data.name}</p>
            <p className="text-sm sm:text-base text-slate-600">
              {data.district}
            </p>
            <p className="text-sm sm:text-base text-slate-600">{data.phone}</p>
          </div>

          {/* Actions */}
          <div className="grid sm:grid-cols-3 gap-3 border-t border-slate-200 pt-5">
            <button
              type="button"
              onClick={reset}
              className="flex items-center justify-center gap-2 border-2 border-slate-200 hover:border-[#00a651] hover:text-[#00a651] text-slate-700 font-bold py-2.5 rounded-xl transition-colors text-sm"
            >
              <RotateCcw className="w-4 h-4" /> Track Another Order
            </button>
            <a
              href={`tel:${SITE.phones[0].tel}`}
              className="flex items-center justify-center gap-2 border-2 border-slate-200 hover:border-[#00a651] hover:text-[#00a651] text-slate-700 font-bold py-2.5 rounded-xl transition-colors text-sm"
            >
              <Phone className="w-4 h-4" /> Call Us
            </a>
            <a
              href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
                `Hello IPS HATT, I need help with my order #${data.number}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#00a651] hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl transition-colors text-sm"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp Us
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
