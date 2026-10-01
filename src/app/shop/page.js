import Link from "next/link";
import { redirect } from "next/navigation";
import {
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
  PackageSearch,
  Check,
} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import SortSelect from "@/components/SortSelect";
import {
  getCategories,
  getShopProducts,
  resolveCategory,
  SORTS,
  PER_PAGE,
} from "@/lib/shop";

const one = (v) => (Array.isArray(v) ? v[0] : v) ?? "";
const toInt = (v, max = 10000000) => {
  const n = parseInt(v, 10);
  return Number.isFinite(n) && n > 0 ? Math.min(n, max) : 0;
};

function parseParams(sp = {}) {
  let min = toInt(one(sp.min));
  let max = toInt(one(sp.max));
  if (min && max && min > max) [min, max] = [max, min];
  const sortRaw = String(one(sp.sort));
  return {
    search: String(one(sp.search)).trim().slice(0, 80),
    category: String(one(sp.category)).trim().slice(0, 80),
    sort: SORTS[sortRaw] ? sortRaw : "latest",
    page: Math.max(1, toInt(one(sp.page), 500)),
    min,
    max,
    instock: one(sp.instock) === "1",
  };
}

export async function generateMetadata({ searchParams }) {
  const p = parseParams(await searchParams);
  return {
    title: p.search ? `"${p.search}" - Search | IPS HATT` : "Shop | IPS HATT",
  };
}

function pageList(cur, total) {
  const nums = [...new Set([1, total, cur - 1, cur, cur + 1])]
    .filter((n) => n >= 1 && n <= total)
    .sort((a, b) => a - b);
  const out = [];
  nums.forEach((n, i) => {
    if (i && n - nums[i - 1] > 1) out.push("…");
    out.push(n);
  });
  return out;
}

function CategoryItem({ c, depth, categories, activeCat, link }) {
  const children = categories.filter((x) => x.parent === c.id);
  const isActive = activeCat?.id === c.id;
  return (
    <li>
      <Link
        href={link({ category: c.slug })}
        style={{ paddingLeft: 12 + depth * 14 }}
        className={`flex items-center justify-between gap-2 rounded-lg pr-3 py-2 text-sm transition-colors ${
          isActive
            ? "bg-emerald-50 text-[#00a651] font-bold"
            : "text-slate-700 hover:bg-slate-50"
        }`}
      >
        <span className="truncate">{c.name}</span>
        <span className="text-xs text-slate-400">{c.count}</span>
      </Link>
      {children.length > 0 && (
        <ul>
          {children.map((ch) => (
            <CategoryItem
              key={ch.id}
              c={ch}
              depth={depth + 1}
              categories={categories}
              activeCat={activeCat}
              link={link}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

function Filters({ categories, activeCat, p, link }) {
  const tops = categories.filter(
    (c) => !c.parent || !categories.some((x) => x.id === c.parent)
  );
  const inputCls =
    "w-full rounded-lg border-2 border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#00a651]";

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-2">
          Categories
        </h3>
        <ul className="space-y-0.5">
          <li>
            <Link
              href={link({ category: "" })}
              className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                !p.category
                  ? "bg-emerald-50 text-[#00a651] font-bold"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              All Products
            </Link>
          </li>
          {tops.map((c) => (
            <CategoryItem
              key={c.id}
              c={c}
              depth={0}
              categories={categories}
              activeCat={activeCat}
              link={link}
            />
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-2">
          Price (৳)
        </h3>
        <form action="/shop" method="get" className="space-y-3">
          {p.search && <input type="hidden" name="search" value={p.search} />}
          {activeCat && (
            <input type="hidden" name="category" value={activeCat.slug} />
          )}
          {p.sort !== "latest" && (
            <input type="hidden" name="sort" value={p.sort} />
          )}
          {p.instock && <input type="hidden" name="instock" value="1" />}
          <div className="flex items-center gap-2">
            <input
              name="min"
              type="number"
              min="0"
              inputMode="numeric"
              defaultValue={p.min || ""}
              placeholder="Min"
              className={inputCls}
            />
            <span className="text-slate-400">-</span>
            <input
              name="max"
              type="number"
              min="0"
              inputMode="numeric"
              defaultValue={p.max || ""}
              placeholder="Max"
              className={inputCls}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#00a651] hover:bg-emerald-700 text-white text-sm font-bold py-2 rounded-lg transition-colors"
          >
            Apply
          </button>
        </form>
      </div>

      <div>
        <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-2">
          Availability
        </h3>
        <Link
          href={link({ instock: p.instock ? "" : "1" })}
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
        >
          <span
            className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${
              p.instock
                ? "bg-[#00a651] border-[#00a651]"
                : "border-slate-300 bg-white"
            }`}
          >
            {p.instock && (
              <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
            )}
          </span>
          In stock only
        </Link>
      </div>
    </div>
  );
}

export default async function ShopPage({ searchParams }) {
  const p = parseParams(await searchParams);
  const categories = await getCategories();

  const activeCat = p.category ? resolveCategory(categories, p.category) : null;
  const categoryMissing = Boolean(p.category) && !activeCat;

  // Filter change hole page 1-e ferot jay
  const link = (changes = {}) => {
    const next = {
      search: p.search,
      category: activeCat?.slug || (categoryMissing ? p.category : ""),
      sort: p.sort === "latest" ? "" : p.sort,
      min: p.min,
      max: p.max,
      instock: p.instock ? "1" : "",
      page: "",
      ...changes,
    };
    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(next)) if (v) qs.set(k, String(v));
    const s = qs.toString();
    return s ? `/shop?${s}` : "/shop";
  };

  const result = categoryMissing
    ? { products: [], total: 0, totalPages: 1 }
    : await getShopProducts({
        search: p.search,
        categoryId: activeCat?.id,
        sort: p.sort,
        page: p.page,
        min: p.min,
        max: p.max,
        inStock: p.instock,
      });

  if (result.invalidPage) redirect(link());

  const { products, total, totalPages, failed } = result;
  const from = total ? (p.page - 1) * PER_PAGE + 1 : 0;
  const to = Math.min(p.page * PER_PAGE, total);

  const title = p.search
    ? `Search: “${p.search}”`
    : activeCat
    ? activeCat.name
    : "All Products";

  const sortOptions = Object.entries(SORTS).map(([value, s]) => ({
    value,
    label: s.label,
    href: link({ sort: value === "latest" ? "" : value }),
  }));

  const chips = [];
  if (p.search)
    chips.push({ label: `Search: ${p.search}`, href: link({ search: "" }) });
  if (p.category)
    chips.push({
      label: activeCat ? activeCat.name : p.category,
      href: link({ category: "" }),
    });
  if (p.min || p.max) {
    const label =
      p.min && p.max
        ? `৳${p.min} - ৳${p.max}`
        : p.min
        ? `৳${p.min}+`
        : `Up to ৳${p.max}`;
    chips.push({ label, href: link({ min: "", max: "" }) });
  }
  if (p.instock)
    chips.push({ label: "In stock only", href: link({ instock: "" }) });

  const filtersEl = (
    <Filters categories={categories} activeCat={activeCat} p={p} link={link} />
  );

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-6 md:py-8">
      <nav className="text-sm text-slate-500 mb-4 flex items-center gap-2">
        <Link href="/" className="hover:text-[#00a651]">
          Home
        </Link>
        <span>/</span>
        <span className="text-slate-800 font-medium">Shop</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-64 shrink-0 sticky top-24">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 max-h-[calc(100vh-7rem)] overflow-y-auto">
            {filtersEl}
          </div>
        </aside>

        <div className="flex-1 min-w-0 w-full">
          {/* Mobile filters */}
          <details className="lg:hidden mb-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <summary className="flex items-center gap-2 px-4 py-3 font-bold text-slate-800 cursor-pointer list-none">
              <SlidersHorizontal className="w-4 h-4 text-[#00a651]" />
              Filters
              {chips.length > 0 && (
                <span className="bg-[#00a651] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {chips.length}
                </span>
              )}
            </summary>
            <div className="px-4 pb-4">{filtersEl}</div>
          </details>

          {/* Title + sort */}
          <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                {title}
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                {total > 0
                  ? `Showing ${from}-${to} of ${total} products`
                  : "0 products"}
              </p>
            </div>
            <SortSelect value={p.sort} options={sortOptions} />
          </div>

          {/* Active filter chips */}
          {chips.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-5">
              {chips.map((c) => (
                <Link
                  key={c.label}
                  href={c.href}
                  className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-semibold pl-3 pr-2 py-1.5 rounded-full hover:bg-emerald-100 transition-colors"
                >
                  {c.label}
                  <X className="w-3.5 h-3.5" />
                </Link>
              ))}
              <Link
                href="/shop"
                className="text-xs font-semibold text-slate-500 hover:text-rose-600 ml-1"
              >
                Clear all
              </Link>
            </div>
          )}

          {/* Grid / states */}
          {failed ? (
            <div className="bg-white rounded-2xl border border-slate-100 py-16 px-6 text-center">
              <PackageSearch className="w-12 h-12 mx-auto text-slate-400 mb-3" />
              <h2 className="text-lg font-bold text-slate-800">
                Product load kora jayni
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Ektu por abar chesta korun.
              </p>
            </div>
          ) : products.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-100 py-16 px-6 text-center">
              <PackageSearch className="w-12 h-12 mx-auto text-slate-400 mb-3" />
              <h2 className="text-lg font-bold text-slate-800">
                Kono product paowa jayni
              </h2>
              <p className="text-slate-500 text-sm mt-1 max-w-md mx-auto">
                {categoryMissing
                  ? "Ei category-te ekhon kono product nei."
                  : p.search
                  ? `“${p.search}”-er jonno kichu milen. Onno shobdo diye chesta korun, ba filter shoriye dekhun.`
                  : "Ei filter-e kono product nei. Filter shoriye dekhun."}
              </p>
              {chips.length > 0 && (
                <Link
                  href="/shop"
                  className="inline-block mt-4 bg-[#00a651] hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
                >
                  Sob filter muchhun
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 md:gap-5">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <nav
              aria-label="Pagination"
              className="mt-10 flex flex-wrap items-center justify-center gap-2"
            >
              {p.page > 1 && (
                <Link
                  href={link({ page: p.page - 1 > 1 ? p.page - 1 : "" })}
                  rel="prev"
                  className="flex items-center gap-1 px-3 h-10 rounded-lg border-2 border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:border-[#00a651] hover:text-[#00a651] transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Prev
                </Link>
              )}
              {pageList(p.page, totalPages).map((n, i) =>
                n === "…" ? (
                  <span key={`dots-${i}`} className="px-1 text-slate-400">
                    …
                  </span>
                ) : (
                  <Link
                    key={n}
                    href={link({ page: n > 1 ? n : "" })}
                    aria-current={n === p.page ? "page" : undefined}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg border-2 text-sm font-bold transition-colors ${
                      n === p.page
                        ? "bg-[#00a651] border-[#00a651] text-white"
                        : "bg-white border-slate-200 text-slate-700 hover:border-[#00a651] hover:text-[#00a651]"
                    }`}
                  >
                    {n}
                  </Link>
                )
              )}
              {p.page < totalPages && (
                <Link
                  href={link({ page: p.page + 1 })}
                  rel="next"
                  className="flex items-center gap-1 px-3 h-10 rounded-lg border-2 border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:border-[#00a651] hover:text-[#00a651] transition-colors"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </Link>
              )}
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}
