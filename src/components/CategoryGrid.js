import Link from "next/link";
import {
  Sun,
  Battery,
  Zap,
  Sliders,
  Power,
  Wrench,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { getCategories, slugify } from "@/lib/shop";

// terms: WooCommerce category-r slug/naam-e ei shobdo thakle match hobe
const CATEGORY_CONFIG = [
  { title: "Solar Panels", icon: Sun, terms: ["solar-panel"] },
  {
    title: "Lithium Battery",
    icon: Battery,
    terms: ["lithium-battery", "lithium"],
  },
  { title: "Solar Inverter", icon: Zap, terms: ["solar-inverter"] },
  { title: "Charge Controller", icon: Sliders, terms: ["charge-controller"] },
  { title: "IPS & UPS", icon: Power, terms: ["ips-and-ups", "ips-ups"] },
  { title: "Accessories", icon: Wrench, terms: ["accessor"] },
];

function findCategory(categories, terms) {
  const norm = (c) => [c.slug, slugify(c.name)];
  // age exact match, na hole "includes"
  return (
    categories.find((c) => norm(c).some((v) => terms.includes(v))) ||
    categories.find((c) =>
      norm(c).some((v) => terms.some((t) => v.includes(t)))
    ) ||
    null
  );
}

export default async function CategoryGrid() {
  const categories = await getCategories();

  const items = CATEGORY_CONFIG.map((cfg) => {
    const match = findCategory(categories, cfg.terms);
    return {
      ...cfg,
      href: match
        ? `/shop?category=${match.slug}`
        : `/shop?search=${encodeURIComponent(cfg.title)}`,
      count: match ? `${match.count} Items` : "Browse",
    };
  });

  return (
    <div>
      {/* Heading (ProductGrid-er sathe ekoi style) */}
      <div className="flex items-end justify-between gap-4 mb-6 md:mb-8 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#00a651]">
            Categories
          </span>
          <h2 className="mt-1 text-2xl md:text-4xl font-extrabold text-slate-800 leading-tight">
            Explore <span className="text-[#00a651]">Categories</span>
          </h2>
          <p className="mt-1.5 text-sm md:text-base text-slate-500 font-medium">
            Find the right energy products for your needs
          </p>
        </div>

        <Link
          href="/shop"
          className="shrink-0 inline-flex items-center gap-1.5 rounded-full border-2 border-slate-200 hover:border-[#00a651] hover:text-[#00a651] bg-white px-4 py-2 text-sm font-bold text-slate-700 transition-colors group"
        >
          View All
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        {items.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.title}
              href={cat.href}
              className="group relative isolate overflow-hidden flex flex-col rounded-2xl bg-white border border-slate-200/80 p-4 md:p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#00a651]/40 transition-all duration-300"
            >
              {/* Hover-e upore green line baam theke daane tane */}
              <span className="absolute top-0 left-0 h-1 w-0 group-hover:w-full bg-gradient-to-r from-[#00a651] to-emerald-300 transition-all duration-500" />

              {/* Kone-r boro halka watermark icon */}
              <Icon
                aria-hidden="true"
                className="absolute -right-4 -bottom-4 -z-10 w-24 h-24 md:w-28 md:h-28 text-slate-900 opacity-[0.04] group-hover:opacity-[0.09] group-hover:-rotate-12 group-hover:scale-110 transition-all duration-500"
              />

              {/* Icon + arrow */}
              <div className="flex items-start justify-between">
                <span className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 text-[#00a651] group-hover:from-[#00a651] group-hover:to-emerald-600 group-hover:text-white shadow-inner flex items-center justify-center transition-all duration-300">
                  <Icon className="w-6 h-6 md:w-7 md:h-7" />
                </span>
                <ArrowUpRight className="w-4 h-4 text-slate-300 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-[#00a651] transition-all duration-300" />
              </div>

              {/* Title */}
              <h3 className="mt-4 text-sm md:text-base font-extrabold text-slate-800 group-hover:text-[#00a651] transition-colors leading-snug line-clamp-1">
                {cat.title}
              </h3>

              {/* Count pill */}
              <span className="mt-2 self-start rounded-full bg-slate-100 group-hover:bg-emerald-50 px-2.5 py-0.5 text-[11px] md:text-xs font-bold text-slate-500 group-hover:text-emerald-700 transition-colors">
                {cat.count}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
