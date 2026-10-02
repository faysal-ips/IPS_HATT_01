"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Lightbulb,
  Fan,
  Tv,
  Laptop,
  Wifi,
  Refrigerator,
  Droplets,
  Wind,
  Plug,
  Plus,
  Minus,
  MessageCircle,
  Phone,
  RotateCcw,
  Info,
} from "lucide-react";
import { SITE } from "@/lib/site";

// Tubular (lead-acid) battery option dekhate na chaile false koro
const SHOW_TUBULAR = true;

// watt = typical running watt, surge = starting power multiplier (motor load hole)
const APPLIANCES = [
  { id: "light", name: "LED Light", watt: 10, surge: 1, icon: Lightbulb },
  { id: "fan", name: "Ceiling Fan", watt: 75, surge: 1, icon: Fan },
  { id: "stand", name: "Table / Stand Fan", watt: 60, surge: 1, icon: Wind },
  { id: "tv", name: "LED TV", watt: 80, surge: 1, icon: Tv },
  { id: "laptop", name: "Laptop / Desktop", watt: 65, surge: 1, icon: Laptop },
  { id: "router", name: "Wi-Fi Router", watt: 15, surge: 1, icon: Wifi },
  {
    id: "fridge",
    name: "Refrigerator",
    watt: 150,
    surge: 3,
    icon: Refrigerator,
  },
  {
    id: "pump",
    name: "Water Pump (0.5 HP)",
    watt: 370,
    surge: 3,
    icon: Droplets,
  },
  { id: "ac", name: "AC (1.5 Ton)", watt: 1400, surge: 3, icon: Wind },
];

const PRESETS = [
  { label: "Small Flat", qty: { light: 4, fan: 2, tv: 1, router: 1 } },
  {
    label: "Family Home",
    qty: { light: 6, fan: 4, tv: 1, router: 1, laptop: 1, fridge: 1 },
  },
  { label: "Small Shop", qty: { light: 4, fan: 2, laptop: 1, router: 1 } },
];

const SIZES = [
  500, 650, 850, 1100, 1400, 1800, 2200, 3000, 3500, 5000, 6000, 8000, 10000,
];
const HOURS = [2, 4, 6, 8, 10, 12];
const MAX_QTY = 30;

function calculate(qty, customW, hours) {
  const rows = APPLIANCES.filter((a) => (qty[a.id] || 0) > 0).map((a) => ({
    ...a,
    q: qty[a.id],
  }));
  const custom = Math.max(0, Math.min(20000, Number(customW) || 0));
  const running = rows.reduce((s, a) => s + a.watt * a.q, 0) + custom;
  if (running <= 0) return null;

  // Ekta motor ekshathe start hoy dhore largest start-up extra load
  const extra = Math.max(0, ...rows.map((a) => a.watt * (a.surge - 1)));
  const peak = running + extra;

  // Inverter: 20% safety margin, short-time 150% overload, 0.8 power factor
  const needVA = Math.max(running * 1.2, peak / 1.5) / 0.8;
  const size = SIZES.find((s) => s >= needVA) || null;
  const volt = size == null ? 48 : size <= 1100 ? 12 : size <= 2200 ? 24 : 48;

  // Battery: 85% inverter efficiency
  const wh = (running * hours) / 0.85;
  const step = volt / 12;
  const tubularUnits = Math.max(
    step,
    Math.ceil(Math.ceil(wh / 0.5 / 1200) / step) * step
  );
  const lithiumKwh = wh / 0.9 / 1000;
  const lithiumUnits = Math.max(1, Math.ceil(lithiumKwh / 5.12));

  return {
    rows,
    custom,
    running,
    size,
    volt,
    tubularUnits,
    lithiumKwh,
    lithiumUnits,
    hasMotor: rows.some((a) => a.surge > 1),
  };
}

export default function BackupCalculator() {
  const [qty, setQty] = useState({});
  const [custom, setCustom] = useState("");
  const [hours, setHours] = useState(4);

  const r = useMemo(() => calculate(qty, custom, hours), [qty, custom, hours]);

  const setQ = (id, delta) =>
    setQty((p) => {
      const next = Math.max(0, Math.min(MAX_QTY, (p[id] || 0) + delta));
      return { ...p, [id]: next };
    });

  const reset = () => {
    setQty({});
    setCustom("");
    setHours(4);
  };

  const waText = () => {
    if (!r) return "";
    const lines = [
      "Hello IPS HATT, I would like advice on a backup power system.",
      "",
      "My load:",
      ...r.rows.map((a) => `- ${a.name} x${a.q}`),
      r.custom > 0 ? `- Other load: ${r.custom} W` : null,
      "",
      `Total load: ${r.running} W`,
      `Backup needed: ${hours} hours`,
      `Calculator suggests: ${
        r.size ? `${r.size} VA IPS` : "custom system"
      } (about ${r.volt}V system)`,
      SHOW_TUBULAR ? `Tubular option: ${r.tubularUnits} x 12V 100Ah` : null,
      `Lithium option: about ${r.lithiumKwh.toFixed(1)} kWh`,
    ].filter((x) => x !== null);
    return lines.join("\n");
  };

  return (
    <div>
      {/* Heading (baki section-er sathe ekoi pattern) */}
      <div className="mb-6 border-b border-slate-200 pb-4 md:mb-8">
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#00a651]">
          Backup Calculator
        </span>
        <h2 className="mt-1 text-2xl font-extrabold leading-tight text-slate-800 md:text-4xl">
          Find Your <span className="text-[#00a651]">Perfect IPS</span>
        </h2>
        <p className="mt-2 text-slate-700 text-base md:text-lg leading-relaxed">
          Select what you want to run during a power cut. We will estimate the
          IPS and battery you need.
        </p>
      </div>

      <div className="grid items-start gap-5 lg:grid-cols-12 lg:gap-8">
        {/* LEFT: inputs */}
        <div className="space-y-4 lg:col-span-7">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-base font-extrabold text-slate-900 sm:text-lg">
                1. Choose your appliances
              </h3>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition-colors hover:text-rose-600"
              >
                <RotateCcw className="h-4 w-4" /> Reset
              </button>
            </div>

            {/* Presets */}
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="self-center text-sm font-semibold text-slate-500">
                Quick start:
              </span>
              {PRESETS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setQty({ ...p.qty })}
                  className="rounded-full border-2 border-slate-200 bg-white px-3.5 py-1.5 text-sm font-bold text-slate-700 transition-colors hover:border-[#00a651] hover:text-[#00a651]"
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Appliance list */}
            <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {APPLIANCES.map((a) => {
                const q = qty[a.id] || 0;
                const Icon = a.icon;
                return (
                  <div
                    key={a.id}
                    className={`flex items-center justify-between gap-3 rounded-xl border-2 p-3 transition-colors ${
                      q > 0
                        ? "border-[#00a651] bg-emerald-50/50"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                          q > 0
                            ? "bg-[#00a651] text-white"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-base  font-semibold leading-snug text-slate-800">
                          {a.name}
                        </p>
                        <p className="text-base text-slate-700">
                          {a.watt} W each
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center rounded-xl border-2 border-slate-200 bg-white">
                      <button
                        type="button"
                        onClick={() => setQ(a.id, -1)}
                        disabled={q === 0}
                        aria-label={`Decrease ${a.name}`}
                        className="flex h-10 w-10 items-center justify-center rounded-l-lg text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center text-base font-extrabold text-slate-900">
                        {q}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQ(a.id, 1)}
                        disabled={q >= MAX_QTY}
                        aria-label={`Increase ${a.name}`}
                        className="flex h-10 w-10 items-center justify-center rounded-r-lg text-slate-700 hover:bg-slate-100 disabled:opacity-30"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Custom load */}
            <div className="mt-3 flex items-center gap-3 rounded-xl border-2 border-dashed border-slate-300 p-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                <Plug className="h-5 w-5" />
              </span>
              <label
                htmlFor="bc-custom"
                className="min-w-0 flex-1 text-[15px] font-bold leading-snug text-slate-900"
              >
                Other load
                <span className="block text-[13px] font-medium text-slate-500">
                  Total watts of anything else
                </span>
              </label>
              <div className="relative w-28 shrink-0">
                <input
                  id="bc-custom"
                  type="number"
                  inputMode="numeric"
                  min="0"
                  max="20000"
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                  placeholder="0"
                  className="w-full rounded-xl border-2 border-slate-200 py-2.5 pl-3 pr-8 text-base font-bold text-slate-900 outline-none focus:border-[#00a651]"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                  W
                </span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <h3 className="text-base font-extrabold text-slate-900 sm:text-lg">
              2. How long do you need backup?
            </h3>
            <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
              {HOURS.map((h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => setHours(h)}
                  aria-pressed={hours === h}
                  className={`rounded-xl border-2 py-2.5 text-base font-bold transition-colors ${
                    hours === h
                      ? "border-[#00a651] bg-[#00a651] text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:border-[#00a651] hover:text-[#00a651]"
                  }`}
                >
                  {h} hr
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: result */}
        <aside className="lg:sticky lg:top-24 lg:col-span-5" aria-live="polite">
          <div className="overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-md">
            <div className="border-b border-emerald-100 bg-gradient-to-br from-emerald-50 to-white px-4 py-4 sm:px-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#00a651]">
                Your Recommendation
              </p>
            </div>

            {!r ? (
              <div className="px-4 py-10 text-center sm:px-6">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                  <Plug className="h-7 w-7" />
                </span>
                <p className="mt-3 text-base font-bold text-slate-800">
                  Nothing selected yet
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Add your appliances on the left to see the recommended IPS and
                  battery.
                </p>
              </div>
            ) : (
              <div className="space-y-5 px-4 py-5 sm:px-6">
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { label: "Total Load", value: `${r.running} W` },
                    { label: "Backup Time", value: `${hours} hours` },
                    {
                      label: "Recommended IPS",
                      value: r.size ? `${r.size} VA` : "Custom",
                    },
                    { label: "System Voltage", value: `${r.volt}V` },
                  ].map((x) => (
                    <div
                      key={x.label}
                      className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3"
                    >
                      <p className="text-[12px] font-bold uppercase tracking-wider text-slate-500">
                        {x.label}
                      </p>
                      <p className="mt-0.5 text-xl font-black leading-tight text-[#002147]">
                        {x.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div>
                  <p className="mb-2 text-sm font-extrabold uppercase tracking-wider text-slate-900">
                    Battery options
                  </p>
                  <ul className="space-y-2">
                    {SHOW_TUBULAR && (
                      <li className="flex items-start justify-between gap-3 rounded-xl border border-slate-200 p-3">
                        <div>
                          <p className="text-[15px] font-bold text-slate-900">
                            Tubular (lead-acid)
                          </p>
                          <p className="text-[13px] text-slate-500">
                            Lower upfront cost
                          </p>
                        </div>
                        <p className="text-right text-[15px] font-extrabold text-slate-900">
                          {r.tubularUnits} x 12V 100Ah
                        </p>
                      </li>
                    )}
                    <li className="flex items-start justify-between gap-3 rounded-xl border-2 border-[#00a651] bg-emerald-50/40 p-3">
                      <div>
                        <p className="text-[15px] font-bold text-slate-900">
                          Lithium (LiFePO4)
                        </p>
                        <p className="text-[13px] text-slate-500">
                          Longer life, no maintenance
                        </p>
                      </div>
                      <p className="text-right text-[15px] font-extrabold text-slate-900">
                        ~{r.lithiumKwh.toFixed(1)} kWh
                        <span className="block text-[13px] font-medium text-slate-500">
                          = {r.lithiumUnits} x 5.12 kWh unit
                          {r.lithiumUnits > 1 ? "s" : ""}
                        </span>
                      </p>
                    </li>
                  </ul>
                </div>

                {r.size == null && (
                  <p className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-[13px] text-amber-900">
                    Your load is above our standard sizes. Please contact us for
                    a custom system.
                  </p>
                )}

                <div className="flex gap-2.5 rounded-xl bg-slate-50 p-3 text-[13px] leading-relaxed text-slate-600">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                  <p>
                    {r.hasMotor &&
                      "Fridge, pump and AC need extra starting power; this is included. "}
                    This is a simplified estimate. Actual needs depend on your
                    appliance models and usage. We confirm the exact setup for
                    free.
                  </p>
                </div>

                <div className="space-y-2.5">
                  <a
                    href={`https://wa.me/${
                      SITE.whatsapp
                    }?text=${encodeURIComponent(waText())}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#00a651] py-3 text-base font-bold text-white shadow-md transition-colors hover:bg-emerald-700"
                  >
                    <MessageCircle className="h-5 w-5" /> Get Exact Quote on
                    WhatsApp
                  </a>
                  <div className="grid grid-cols-2 gap-2.5">
                    <a
                      href={`tel:${SITE.phones[0].tel}`}
                      className="flex items-center justify-center gap-2 rounded-xl border-2 border-slate-200 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:border-[#00a651] hover:text-[#00a651]"
                    >
                      <Phone className="h-4 w-4" /> Call Us
                    </a>
                    <Link
                      href="/shop?search=ips"
                      className="flex items-center justify-center rounded-xl border-2 border-slate-200 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:border-[#00a651] hover:text-[#00a651]"
                    >
                      Browse IPS
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
