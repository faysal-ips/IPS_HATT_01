import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  Headphones,
  BadgeCheck,
  Wrench,
  Sun,
  Battery,
  Zap,
  Sliders,
  Power,
  Phone,
  MessageCircle,
  ArrowRight,
  ClipboardList,
  PackageCheck,
  Leaf,
  CheckCircle2,
} from "lucide-react";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "About Us | IPS HATT",
  description:
    "IPS HATT - genuine solar panels, inverters, lithium batteries and IPS/UPS systems, delivered across Bangladesh.",
};

const STATS = [
  { value: "64", label: "Districts Covered", sub: "Nationwide delivery" },
  { value: "24-48h", label: "Fast Delivery", sub: "Across Bangladesh" },
  { value: "100%", label: "Genuine Products", sub: "Brand authentic" },
  { value: "Free", label: "Solar Consultation", sub: "Right-size your system" },
];

const OFFERS = [
  {
    title: "Solar Panels",
    icon: Sun,
    text: "High-efficiency mono and bifacial panels for homes, shops and factories.",
    q: "solar panel",
  },
  {
    title: "Lithium Batteries",
    icon: Battery,
    text: "LiFePO4 wall and rack batteries with smart BMS and long cycle life.",
    q: "lithium",
  },
  {
    title: "Solar Inverters",
    icon: Zap,
    text: "Hybrid and energy-storage inverters that make the most of every sunny hour.",
    q: "inverter",
  },
  {
    title: "Charge Controllers",
    icon: Sliders,
    text: "Reliable MPPT and PWM controllers to protect and charge your batteries.",
    q: "controller",
  },
  {
    title: "IPS & UPS",
    icon: Power,
    text: "Pure sine wave home IPS so your lights and fans keep running during load-shedding.",
    q: "ips",
  },
  {
    title: "Accessories",
    icon: Wrench,
    text: "Cables, mounting and everything else to complete a clean, safe installation.",
    q: "wire",
  },
];

const BRANDS = [
  "Growatt",
  "Solis",
  "Jinko",
  "Luminous",
  "Microtek",
  "Smarten",
  "Genixgreen",
  "LVTOPSUN",
  "Long Ran Gold",
];

const WHY = [
  {
    icon: BadgeCheck,
    title: "100% Genuine",
    text: "Every product is sourced to be authentic, with the brand details visible on the product page.",
  },
  {
    icon: ShieldCheck,
    title: "Warranty Backed",
    text: "Products come with the warranty stated on the product page, and we help you with claims.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    text: "24-48 hour delivery nationwide, with free delivery offers across the 64 districts.",
  },
  {
    icon: Headphones,
    title: "Expert Guidance",
    text: "Not sure what capacity you need? Talk to us - the consultation is free.",
  },
  {
    icon: Leaf,
    title: "Built for Real Use",
    text: "We recommend what suits your load and budget, not simply the most expensive option.",
  },
  {
    icon: Wrench,
    title: "After-Sales Support",
    text: "We stay reachable after delivery for setup questions and service.",
  },
];

const STEPS = [
  {
    icon: ClipboardList,
    title: "Tell us your need",
    text: "Share your load, backup hours and budget - by call, WhatsApp or the website.",
  },
  {
    icon: Headphones,
    title: "Get expert advice",
    text: "We suggest the right panel, inverter and battery combination.",
  },
  {
    icon: PackageCheck,
    title: "Order & delivery",
    text: "Confirm your order and receive it at your door within 24-48 hours.",
  },
  {
    icon: ShieldCheck,
    title: "Support after sale",
    text: "Warranty and technical help whenever you need it.",
  },
];

function SectionTitle({ eyebrow, title, text, center = true }) {
  return (
    <div className={center ? "text-center max-w-2xl mx-auto mb-10" : "mb-6"}>
      <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-[#00a651] mb-2">
        {eyebrow}
      </span>
      <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
        {title}
      </h2>
      {text && (
        <p className="mt-3 text-slate-600 text-base md:text-lg">{text}</p>
      )}
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="max-w-[1600px] mx-auto px-4 py-4 md:py-6 space-y-16 md:space-y-24 pb-16">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl bg-[#002147] text-white">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute -top-28 -right-24 w-[440px] h-[440px] rounded-full bg-[#00a651]/30 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 w-[400px] h-[400px] rounded-full bg-sky-400/20 blur-3xl" />

        <div className="relative px-6 sm:px-10 lg:px-16 py-16 md:py-24 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-300">
              <Sun className="w-4 h-4" /> About {SITE.name}
            </span>
            <h1 className="mt-5 text-4xl md:text-5xl xl:text-6xl font-black leading-[1.08]">
              Reliable Solar &amp; Backup Power,{" "}
              <span className="text-[#00e07a]">
                Delivered Across Bangladesh
              </span>
            </h1>
            <p className="mt-5 text-lg text-slate-300 max-w-2xl leading-relaxed">
              We bring genuine solar panels, inverters, lithium batteries and
              IPS systems directly to your doorstep - with honest advice and
              support you can reach.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 rounded-xl bg-[#00a651] hover:bg-emerald-600 px-6 py-3.5 font-bold shadow-lg transition-colors"
              >
                Shop Now <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/5 hover:bg-white/15 px-6 py-3.5 font-bold transition-colors"
              >
                Talk to an Expert
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-white/15 bg-white/[0.07] backdrop-blur p-6 md:p-8 space-y-4 shadow-2xl">
              <p className="text-sm font-bold uppercase tracking-widest text-slate-300">
                What you can count on
              </p>
              {[
                "Genuine, brand-authentic products",
                "Warranty as stated on every product",
                "24-48 hour nationwide delivery",
                "Free solar consultation",
              ].map((t) => (
                <div key={t} className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#00e07a] shrink-0" />
                  <span className="text-base md:text-lg font-medium">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS (hero-r upor halka overlap) */}
      <section className="-mt-24 md:-mt-28 relative z-10 px-2 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl bg-white border border-slate-100 shadow-lg p-5 md:p-7 text-center"
            >
              <p className="text-3xl md:text-5xl font-black text-[#00a651]">
                {s.value}
              </p>
              <p className="mt-1 font-bold text-slate-900">{s.label}</p>
              <p className="text-xs md:text-sm text-slate-500">{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STORY */}
      <section className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <SectionTitle
            center={false}
            eyebrow="Our Story"
            title="Energy you can depend on, advice you can trust"
          />
          <div className="space-y-4 text-slate-700 text-base md:text-lg leading-relaxed">
            <p>
              Power cuts, rising electricity bills and confusing technical
              choices make buying solar and backup equipment harder than it
              should be. {SITE.name} exists to make it simple: genuine products,
              clear information and people who will actually pick up the phone.
            </p>
            <p>
              From a single home IPS to a complete solar and battery setup, we
              help you choose the right capacity for your load and budget,
              deliver it quickly, and stand behind it after the sale.
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          {[
            {
              icon: Leaf,
              title: "Clean energy for everyone",
              text: "Making solar and storage accessible for homes and businesses across the country.",
            },
            {
              icon: ShieldCheck,
              title: "Trust before sales",
              text: "We would rather recommend the right product than the priciest one.",
            },
            {
              icon: Wrench,
              title: "Support that stays",
              text: "Our relationship does not end at delivery. We are here for warranty and technical help.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="flex gap-4 rounded-2xl bg-white border border-slate-100 shadow-sm p-5 md:p-6 hover:shadow-md transition-shadow"
            >
              <span className="w-12 h-12 shrink-0 rounded-xl bg-emerald-50 text-[#00a651] flex items-center justify-center">
                <Icon className="w-6 h-6" />
              </span>
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg">
                  {title}
                </h3>
                <p className="text-slate-600 mt-1">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section>
        <SectionTitle
          eyebrow="What We Offer"
          title="Everything for a complete energy setup"
          text="Choose a category to browse products in our shop."
        />
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {OFFERS.map(({ title, icon: Icon, text, q }) => (
            <Link
              key={title}
              href={`/shop?search=${encodeURIComponent(q)}`}
              className="group rounded-2xl bg-white border border-slate-100 shadow-sm p-6 md:p-7 hover:shadow-xl hover:border-[#00a651] transition-all duration-300"
            >
              <span className="w-14 h-14 rounded-2xl bg-slate-100 group-hover:bg-[#00a651] text-slate-900 group-hover:text-white flex items-center justify-center transition-colors">
                <Icon className="w-7 h-7" />
              </span>
              <h3 className="mt-5 text-xl font-extrabold text-slate-900">
                {title}
              </h3>
              <p className="mt-2 text-slate-600">{text}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#00a651]">
                Explore{" "}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* BRANDS */}
      <section className="rounded-3xl bg-slate-100/70 border border-slate-200/70 px-6 py-10 md:py-14">
        <SectionTitle
          eyebrow="Brands"
          title="Brands we carry"
          text="Trusted names across solar, storage and backup power."
        />
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {BRANDS.map((b) => (
            <span
              key={b}
              className="rounded-full bg-white border border-slate-200 px-6 py-3 text-base md:text-lg font-extrabold text-slate-800 shadow-sm hover:border-[#00a651] hover:text-[#00a651] transition-colors"
            >
              {b}
            </span>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section>
        <SectionTitle
          eyebrow="Why Choose Us"
          title={`Why customers choose ${SITE.name}`}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {WHY.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6 md:p-7 hover:shadow-md transition-shadow"
            >
              <span className="w-12 h-12 rounded-xl bg-emerald-50 text-[#00a651] flex items-center justify-center">
                <Icon className="w-6 h-6" />
              </span>
              <h3 className="mt-4 text-lg font-extrabold text-slate-900">
                {title}
              </h3>
              <p className="mt-1.5 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section>
        <SectionTitle
          eyebrow="How It Works"
          title="From enquiry to installation-ready, in 4 steps"
        />
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <li
              key={title}
              className="relative rounded-2xl bg-white border border-slate-100 shadow-sm p-6 pt-9"
            >
              <span className="absolute -top-4 left-6 w-9 h-9 rounded-full bg-[#00a651] text-white font-black flex items-center justify-center shadow-md">
                {i + 1}
              </span>
              <Icon className="w-8 h-8 text-[#002147]" />
              <h3 className="mt-3 text-lg font-extrabold text-slate-900">
                {title}
              </h3>
              <p className="mt-1.5 text-slate-600 text-sm md:text-base">
                {text}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#002147] to-[#003b2c] text-white px-6 sm:px-10 py-12 md:py-16 text-center">
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#00a651]/30 blur-3xl" />
        <div className="relative max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black">
            Not sure which system fits your home?
          </h2>
          <p className="mt-3 text-slate-300 text-lg">
            Tell us your load and budget. We will suggest the right setup, free
            of charge.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={`tel:${SITE.phones[0].tel}`}
              className="inline-flex items-center gap-2 rounded-xl bg-white text-[#002147] hover:bg-slate-100 px-6 py-3.5 font-bold transition-colors"
            >
              <Phone className="w-5 h-5" /> Call {SITE.phones[0].label}
            </a>
            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#00a651] hover:bg-emerald-600 px-6 py-3.5 font-bold transition-colors"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
