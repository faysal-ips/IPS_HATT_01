"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Lock,
  Truck,
  ShieldCheck,
  Banknote,
  ShoppingBag,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useCart, formatBDT } from "@/context/CartContext";
import { DISTRICTS, validateCheckout } from "@/lib/checkout";

const PLACEHOLDER = "/placeholder.svg";

const inputCls = (err) =>
  `w-full rounded-xl border-2 px-4 py-3 text-base text-slate-900 bg-white outline-none transition-colors placeholder:text-slate-400 ${
    err
      ? "border-rose-400 focus:border-rose-500"
      : "border-slate-200 focus:border-[#00a651]"
  }`;

function Field({ id, label, required, error, hint, children }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-bold text-slate-800 mb-1.5"
      >
        {label} {required && <span className="text-rose-500">*</span>}
        {!required && (
          <span className="text-slate-400 font-medium"> (optional)</span>
        )}
      </label>
      {children}
      {error ? (
        <p className="mt-1.5 text-sm text-rose-600 font-medium">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-slate-500">{hint}</p>
      ) : null}
    </div>
  );
}

export default function CheckoutForm() {
  const router = useRouter();
  const { items, hydrated, subtotal, totalQty, clearCart, openCart } =
    useCart();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    district: "",
    address: "",
    note: "",
    website: "", // honeypot
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [placed, setPlaced] = useState(false);

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  async function onSubmit(e) {
    e.preventDefault();
    if (submitting) return;

    const errs = validateCheckout(form);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      document.getElementById(`f-${first}`)?.focus();
      return;
    }

    setSubmitting(true);
    setServerError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: items.map((i) => ({ id: i.id, qty: i.qty })),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        throw new Error(data.error || "Order place kora jayni.");
      }
      setPlaced(true);
      clearCart();
      router.push(
        `/order-success?order=${data.id}&key=${encodeURIComponent(data.key)}`
      );
    } catch (err) {
      setServerError(err.message);
      setSubmitting(false);
    }
  }

  // cart browser theke load hocche
  if (!hydrated) {
    return (
      <div className="max-w-[1600px] mx-auto px-4 py-10">
        <div className="h-8 w-48 bg-slate-200 rounded animate-pulse mb-6" />
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 h-96 bg-white rounded-2xl animate-pulse" />
          <div className="lg:col-span-5 h-96 bg-white rounded-2xl animate-pulse" />
        </div>
      </div>
    );
  }

  // order hoye gele redirect howar moddhe
  if (placed) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3 text-slate-600">
        <Loader2 className="w-8 h-8 animate-spin text-[#00a651]" />
        <p className="font-semibold">Order confirm hocche...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-[1600px] mx-auto px-4 py-20 flex flex-col items-center text-center gap-3">
        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center">
          <ShoppingBag className="w-9 h-9 text-slate-400" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-800">
          Apnar cart faka
        </h1>
        <p className="text-slate-500">
          Checkout korar age kichu product add korun.
        </p>
        <Link
          href="/"
          className="mt-2 bg-[#00a651] hover:bg-emerald-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
        >
          Shopping Shuru Korun
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-6 md:py-10">
      <nav className="text-sm text-slate-500 mb-4 flex items-center gap-2">
        <Link href="/" className="hover:text-[#00a651]">
          Home
        </Link>
        <span>/</span>
        <span className="text-slate-800 font-medium">Checkout</span>
      </nav>

      <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6">
        Checkout
      </h1>

      <form
        onSubmit={onSubmit}
        noValidate
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
      >
        {/* LEFT: details */}
        <div className="lg:col-span-7 space-y-6">
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 md:p-7">
            <h2 className="text-lg font-extrabold text-slate-900 mb-5 flex items-center gap-2.5">
              <span className="w-1.5 h-6 bg-[#00a651] rounded-full" />
              Delivery Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                id="f-name"
                label="Poorno Naam"
                required
                error={errors.name}
              >
                <input
                  id="f-name"
                  value={form.name}
                  onChange={set("name")}
                  autoComplete="name"
                  placeholder="Apnar naam"
                  className={inputCls(errors.name)}
                />
              </Field>

              <Field
                id="f-phone"
                label="Mobile Number"
                required
                error={errors.phone}
              >
                <input
                  id="f-phone"
                  value={form.phone}
                  onChange={set("phone")}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="01XXXXXXXXX"
                  className={inputCls(errors.phone)}
                />
              </Field>

              <Field id="f-email" label="Email" error={errors.email}>
                <input
                  id="f-email"
                  value={form.email}
                  onChange={set("email")}
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={inputCls(errors.email)}
                />
              </Field>

              <Field
                id="f-district"
                label="District"
                required
                error={errors.district}
              >
                <select
                  id="f-district"
                  value={form.district}
                  onChange={set("district")}
                  className={inputCls(errors.district)}
                >
                  <option value="">District select korun</option>
                  {DISTRICTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </Field>

              <div className="sm:col-span-2">
                <Field
                  id="f-address"
                  label="Puro Thikana"
                  required
                  error={errors.address}
                  hint="Bari/flat, road, area, thana - sob likhun."
                >
                  <textarea
                    id="f-address"
                    value={form.address}
                    onChange={set("address")}
                    rows={3}
                    autoComplete="street-address"
                    placeholder="Jemon: House 12, Road 5, Mirpur-10, Dhaka"
                    className={inputCls(errors.address)}
                  />
                </Field>
              </div>

              <div className="sm:col-span-2">
                <Field id="f-note" label="Order Note" error={errors.note}>
                  <textarea
                    id="f-note"
                    value={form.note}
                    onChange={set("note")}
                    rows={2}
                    placeholder="Delivery shomporke kono nirdesh thakle likhun"
                    className={inputCls(errors.note)}
                  />
                </Field>
              </div>
            </div>

            {/* Honeypot: manush dekhbe na */}
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={set("website")}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
            />
          </section>

          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 md:p-7">
            <h2 className="text-lg font-extrabold text-slate-900 mb-4 flex items-center gap-2.5">
              <span className="w-1.5 h-6 bg-[#00a651] rounded-full" />
              Payment Method
            </h2>
            <div className="flex items-start gap-3 rounded-xl border-2 border-[#00a651] bg-emerald-50/60 p-4">
              <span className="mt-0.5 w-5 h-5 shrink-0 rounded-full border-[6px] border-[#00a651] bg-white" />
              <div>
                <p className="font-bold text-slate-900 flex items-center gap-2">
                  <Banknote className="w-5 h-5 text-[#00a651]" />
                  Cash on Delivery
                </p>
                <p className="text-sm text-slate-600 mt-1">
                  Product haate peye taka din. Agey kono payment lagbe na.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT: summary */}
        <aside className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 md:p-7">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-extrabold text-slate-900">
                Order Summary{" "}
                <span className="text-slate-400 font-semibold">
                  ({totalQty})
                </span>
              </h2>
              <button
                type="button"
                onClick={openCart}
                className="text-sm font-semibold text-[#00a651] hover:underline"
              >
                Cart edit
              </button>
            </div>

            <ul className="divide-y divide-slate-100 max-h-[340px] overflow-y-auto pr-1">
              {items.map((item) => {
                const img = item.image || PLACEHOLDER;
                return (
                  <li key={item.id} className="flex gap-3 py-3">
                    <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden border border-slate-100 bg-slate-50">
                      <Image
                        src={img}
                        alt={item.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                        unoptimized={img === PLACEHOLDER}
                      />
                      <span className="absolute -top-0 -right-0 bg-slate-800 text-white text-[10px] font-bold min-w-5 h-5 px-1 rounded-bl-lg flex items-center justify-center">
                        {item.qty}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 line-clamp-2">
                        {item.name}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {formatBDT(item.price)} x {item.qty}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-slate-900 whitespace-nowrap">
                      {formatBDT(item.price * item.qty)}
                    </span>
                  </li>
                );
              })}
            </ul>

            <dl className="mt-4 pt-4 border-t border-slate-200 space-y-2.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-600">Subtotal</dt>
                <dd className="font-semibold text-slate-900">
                  {formatBDT(subtotal)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-600">Delivery</dt>
                <dd className="font-semibold text-[#00a651]">Free</dd>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                <dt className="text-base font-bold text-slate-900">Total</dt>
                <dd className="text-2xl font-black text-[#002147]">
                  {formatBDT(subtotal)}
                </dd>
              </div>
            </dl>

            {serverError && (
              <div
                role="alert"
                className="mt-4 flex gap-2.5 rounded-xl bg-rose-50 border border-rose-200 p-3.5 text-sm text-rose-800"
              >
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p>{serverError}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-5 w-full bg-[#00a651] hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-base py-3.5 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Lock className="w-4.5 h-4.5" />
                  Place Order - {formatBDT(subtotal)}
                </>
              )}
            </button>

            <p className="mt-3 text-xs text-center text-slate-500">
              Order korle apni amader{" "}
              <Link href="#" className="underline hover:text-[#00a651]">
                Terms & Conditions
              </Link>
              -e sommoti dicchen.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#00a651]" /> 24-48 hours
                delivery
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#00a651]" /> 100% genuine
              </div>
            </div>
          </div>
        </aside>
      </form>
    </div>
  );
}
