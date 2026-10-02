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
      count: match
        ? `${match.count} ${match.count === 1 ? "Item" : "Items"}`
        : "Browse",
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
          <p className="mt-2 text-slate-700 text-base md:text-lg leading-relaxed">
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

      {/* Cards: centered tile, jate wide screen-e dane faka na thake */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        {items.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.title}
              href={cat.href}
              className="group relative flex flex-col items-center rounded-2xl bg-gradient-to-b from-white to-slate-50/80 border border-slate-200 px-3 py-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#00a651]/50 hover:shadow-[0_18px_32px_-18px_rgba(0,166,81,0.45)]"
            >
              <span className="flex w-14 h-14 items-center justify-center rounded-2xl bg-emerald-50 text-[#00a651] ring-1 ring-emerald-100 transition-all duration-300 group-hover:bg-[#00a651] group-hover:text-white group-hover:ring-[#00a651] group-hover:shadow-[0_10px_20px_-8px_rgba(0,166,81,0.6)]">
                <Icon className="w-6 h-6" strokeWidth={1.75} />
              </span>

              <h3 className="mt-4 text-sm md:text-lg font-semibold text-slate-700 leading-snug transition-colors duration-300 group-hover:text-[#00a651]">
                {cat.title}
              </h3>

              {/* count + arrow: hover-e count-er jaygay "Shop now" fade hoy */}
              <div className="relative mt-1 h-5 w-full">
                <p className="absolute inset-0 text-base font-medium text-slate-600 transition-all duration-300 group-hover:-translate-y-1 group-hover:opacity-0">
                  {cat.count}
                </p>
                <span className="absolute inset-0 inline-flex translate-y-1 items-center justify-center gap-1 text-xs font-bold text-[#00a651] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  Shop now
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
