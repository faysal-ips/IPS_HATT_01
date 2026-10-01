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
} from "lucide-react";

// color = card-er nijer rong (icon, glow, hover border)
const FEATURES = [
  {
    title: "Authentic Gear",
    subtitle: "Original & Guaranteed",
    icon: ShieldCheck,
    color: "#00a651",
  },
  {
    title: "Smart Advice",
    subtitle: "Calculated load support",
    icon: Lightbulb,
    color: "#f59e0b",
  },
  {
    title: "Brand Warranty",
    subtitle: "Hassle-free service",
    icon: Award,
    color: "#0ea5e9",
  },
  {
    title: "Expert Setup",
    subtitle: "Certified technician",
    icon: Wrench,
    color: "#7c3aed",
  },
  {
    title: "Nationwide Care",
    subtitle: "Always active support",
    icon: Headset,
    color: "#e11d48",
  },
  {
    title: "Best Value Price",
    subtitle: "Fair market cost",
    icon: TrendingUp,
    color: "#0d9488",
  },
];

const STATS = [
  { value: "64", label: "Districts Covered" },
  { value: "24-48h", label: "Fast Delivery" },
  { value: "100%", label: "Genuine Products" },
];

export default function WhyChooseUs() {
  return (
    <div className="relative isolate overflow-hidden rounded-2xl md:rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-emerald-50/70 px-4 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14 shadow-sm">
      {/* Background effect: halka grid + glow (kono dark rong nai) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_85%)]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,23,42,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.07) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-20 -z-10 w-[320px] h-[320px] md:w-[420px] md:h-[420px] rounded-full bg-emerald-300/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-28 -left-20 -z-10 w-[300px] h-[300px] md:w-[380px] md:h-[380px] rounded-full bg-sky-300/25 blur-3xl"
      />

      {/* Heading */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-7 md:mb-10 pb-5 border-b border-slate-200">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#00a651]">
            Why Us
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
            Why Choose <span className="text-[#00a651]">IPS HATT?</span>
          </h2>
          <p className="mt-2 text-sm md:text-base text-slate-600 font-medium">
            More than products - we deliver complete peace of mind
          </p>
        </div>

        <Link
          href="/about"
          className="group w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#00a651] hover:bg-emerald-700 text-white px-5 py-2.5 text-sm font-bold shadow-md shadow-emerald-600/25 transition-colors"
        >
          Learn More About Us
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-stretch">
        {/* Feature cards */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
          {FEATURES.map(({ title, subtitle, icon: Icon, color }, i) => (
            <div
              key={title}
              style={{ "--c": color }}
              className="group relative overflow-hidden flex flex-row sm:flex-col items-center sm:items-start gap-4 sm:gap-0 rounded-2xl bg-white border border-slate-200 p-4 sm:p-5 md:p-6 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_8px_24px_-12px_rgba(15,23,42,0.18)] hover:-translate-y-1 hover:border-[var(--c)] hover:shadow-[0_1px_2px_rgba(15,23,42,0.06),0_22px_44px_-18px_rgba(15,23,42,0.32)] transition-all duration-300"
            >
              {/* Kone-r rongin glow */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-12 -right-12 w-36 h-36 rounded-full opacity-20 group-hover:opacity-45 blur-2xl transition-opacity duration-300"
                style={{ background: color }}
              />
              {/* Boro number watermark */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-1 right-3 text-5xl md:text-6xl font-black opacity-[0.07] group-hover:opacity-[0.16] transition-opacity select-none"
                style={{ color }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Icon box */}
              <span
                className="relative w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-xl text-white flex items-center justify-center group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-300"
                style={{
                  background: `linear-gradient(135deg, ${color}, ${color}cc)`,
                  boxShadow: `0 10px 20px -8px ${color}99`,
                }}
              >
                <Icon className="w-6 h-6 md:w-7 md:h-7" strokeWidth={1.75} />
              </span>

              <div className="relative min-w-0 sm:mt-4">
                <h3 className="text-base md:text-lg font-extrabold text-slate-900 leading-snug">
                  {title}
                </h3>
                <p className="mt-0.5 text-sm text-slate-500 font-medium">
                  {subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Banner card */}
        <div className="lg:col-span-4 relative rounded-2xl overflow-hidden min-h-[220px] sm:min-h-[280px] lg:min-h-full bg-slate-100 border border-slate-200 shadow-[0_12px_32px_-14px_rgba(15,23,42,0.35)] group">
          <Image
            src="/banners/why chosse.png"
            alt="Let's build a green Bangladesh"
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>
      </div>

      {/* Stats strip */}
      <div className="mt-6 md:mt-10 grid grid-cols-3 rounded-2xl bg-white border border-slate-200 shadow-[0_8px_24px_-14px_rgba(15,23,42,0.25)] py-4 md:py-6">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`text-center px-2 ${
              i > 0 ? "border-l border-slate-200" : ""
            }`}
          >
            <p className="text-2xl md:text-4xl font-black text-[#00a651] leading-none">
              {s.value}
            </p>
            <p className="mt-1.5 text-xs md:text-sm font-semibold text-slate-600 leading-snug">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
