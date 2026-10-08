import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Lightbulb,
  Award,
  Wrench,
  Headset,
  TrendingUp,
  ArrowRight,
  BadgeCheck,
} from "lucide-react";

const FEATURES = [
  {
    title: "Authentic Solar Gear",
    subtitle: "100% original & guaranteed",
    desc: "Panels, inverters and batteries straight from authorized brands.",
    icon: ShieldCheck,
  },
  {
    title: "Smart Load Advice",
    subtitle: "Right size, no overspending",
    desc: "We calculate your real load so you buy exactly what you need.",
    icon: Lightbulb,
  },
  {
    title: "Brand Warranty",
    subtitle: "Hassle-free service",
    desc: "Genuine brand warranty with quick claim and replacement support.",
    icon: Award,
  },
  {
    title: "Expert Installation",
    subtitle: "Certified technicians",
    desc: "Safe, clean and proper setup done by trained professionals.",
    icon: Wrench,
  },
  {
    title: "Nationwide Care",
    subtitle: "Always active support",
    desc: "Call or message us anytime, we stay with you after delivery.",
    icon: Headset,
  },
  {
    title: "Best Value Price",
    subtitle: "Fair market cost",
    desc: "Honest pricing with no hidden charges and regular offers.",
    icon: TrendingUp,
  },
];

const STATS = [
  { value: "64", label: "Districts Covered" },
  { value: "24-48h", label: "Fast Delivery" },
  { value: "100%", label: "Genuine Products" },
  { value: "24/7", label: "Customer Support" },
];

export default function WhyChooseUs() {
  return (
    <section className="relative isolate overflow-hidden rounded-2xl md:rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white via-white to-emerald-50/60 px-4 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.25)]">
      {/* Soft grid that fades out smoothly */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_65%)]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Glows: radial gradients fade to transparent, so no hard edges */}
      <div
        aria-hidden="true"
        className="absolute -top-32 -right-24 -z-10 h-[420px] w-[420px] rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(circle, rgba(0,166,81,0.22) 0%, rgba(0,166,81,0.08) 40%, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -left-24 -z-10 h-[380px] w-[380px] rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(14,165,233,0.16) 0%, rgba(14,165,233,0.05) 45%, transparent 70%)",
        }}
      />

      {/* Heading */}
      <div className="mb-8 md:mb-10 flex flex-wrap items-end justify-between gap-4 pb-6 border-b border-transparent [border-image:linear-gradient(90deg,rgba(148,163,184,0.5),rgba(148,163,184,0.15),transparent)_1]">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50/80 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#00a651]">
            <BadgeCheck className="h-3.5 w-3.5" />
            Why Us
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-[#00a651] to-emerald-500 bg-clip-text text-transparent">
              IPS HATT?
            </span>
          </h2>
          <p className="mt-2 text-slate-700 text-base md:text-lg leading-relaxed">
            More than products - we deliver complete peace of mind
          </p>
        </div>

        <Link
          href="/about"
          className="group w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-b from-[#00b85c] to-[#00a651] hover:from-[#00a651] hover:to-[#008f45] text-white px-5 py-2.5 text-sm font-bold shadow-[0_10px_24px_-10px_rgba(0,166,81,0.7)] transition-all duration-300"
        >
          Learn More About Us
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-stretch">
        {/* Feature cards */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {FEATURES.map(({ title, subtitle, desc, icon: Icon }, i) => (
            <div
              key={title}
              className="group relative overflow-hidden flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur-sm p-4 sm:p-5 shadow-[0_1px_2px_rgba(15,23,42,0.05),0_10px_28px_-18px_rgba(15,23,42,0.2)] transition-all duration-500 hover:-translate-y-1 hover:border-[#00a651]/40 hover:shadow-[0_1px_2px_rgba(15,23,42,0.05),0_24px_44px_-22px_rgba(0,166,81,0.4)]"
            >
              {/* Corner glow: fades in smoothly on hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-16 -right-16 h-44 w-44 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle, rgba(0,166,81,0.2) 0%, rgba(0,166,81,0.06) 45%, transparent 70%)",
                }}
              />
              {/* Big number watermark */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-4 top-2 select-none text-5xl font-black text-slate-900 opacity-[0.04] transition-all duration-500 group-hover:text-[#00a651] group-hover:opacity-[0.12]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              {/* Bottom light line */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-[#00a651] to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-70"
              />

              <span className="relative flex h-12 w-12 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/70 text-[#00a651] ring-1 ring-emerald-200/70 transition-all duration-500 group-hover:from-[#00b85c] group-hover:to-[#008f45] group-hover:text-white group-hover:ring-transparent group-hover:shadow-[0_10px_20px_-8px_rgba(0,166,81,0.6)]">
                <Icon className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.75} />
              </span>

              <div className="relative min-w-0">
                <h3 className="text-base md:text-xl font-semibold text-slate-800 leading-snug">
                  {title}
                </h3>
                <p className="mt-0.5 text-sm font-semibold uppercase tracking-wide text-[#00a651]/90">
                  {subtitle}
                </p>
                <p className="mt-2 text-sm md:text-base text-slate-700 leading-relaxed">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Banner card */}
        <div className="group relative lg:col-span-4 min-h-[240px] sm:min-h-[300px] lg:min-h-full overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100 shadow-[0_20px_40px_-20px_rgba(15,23,42,0.35)]">
          <Image
            src="/banners/why chosse.jpg"
            alt="Let's build a green Bangladesh"
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Soft fade at bottom so image blends in */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          />
        </div>
      </div>

      {/* Stats strip */}
      <div className="mt-6 md:mt-8 grid grid-cols-2 md:grid-cols-4 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur-sm shadow-[0_10px_30px_-18px_rgba(15,23,42,0.25)]">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`px-3 py-4 md:py-6 text-center ${
              i % 2 === 1 ? "border-l border-slate-200/80" : ""
            } ${i > 1 ? "border-t md:border-t-0 border-slate-200/80" : ""} ${
              i > 0 ? "md:border-l md:border-slate-200/80" : ""
            }`}
          >
            <p className="bg-gradient-to-b from-[#00b85c] to-[#007a3d] bg-clip-text text-2xl md:text-4xl font-black leading-none text-transparent">
              {s.value}
            </p>
            <p className="mt-1.5 text-xs md:text-sm font-semibold text-slate-600">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
