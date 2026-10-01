import Link from "next/link";
import { ArrowRight, PackageSearch } from "lucide-react";
import ProductCard from "@/components/ProductCard";

export default function ProductGrid({ products = [] }) {
  return (
    <div>
      <div className="flex items-end justify-between gap-4 mb-6 md:mb-8 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#00a651]">
            Shop
          </span>
          <h2 className="mt-1 text-2xl md:text-4xl font-extrabold text-slate-800 leading-tight">
            Featured <span className="text-[#00a651]">Products</span>
          </h2>
        </div>

        <Link
          href="/shop"
          className="shrink-0 inline-flex items-center gap-1.5 rounded-full border-2 border-slate-200 hover:border-[#00a651] hover:text-[#00a651] bg-white px-4 py-2 text-sm font-bold text-slate-700 transition-colors group"
        >
          View All
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 py-14 px-6 text-center">
          <PackageSearch className="w-12 h-12 mx-auto text-slate-400 mb-3" />
          <p className="font-bold text-slate-800">
            Ekhon kono product dekhano jachchhe na
          </p>
          <p className="text-sm text-slate-500 mt-1">
            Ektu por abar chesta korun.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-5">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} priority={i < 4} />
          ))}
        </div>
      )}
    </div>
  );
}
