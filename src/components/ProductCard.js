"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Phone } from "lucide-react";
import { useCart, formatBDT } from "@/context/CartContext";
import { decodeHtml } from "@/lib/html";
import { SITE } from "@/lib/site";

const PLACEHOLDER = "/placeholder.svg";

export default function ProductCard({ product, priority = false }) {
  const { addItem } = useCart();

  const name = decodeHtml(product.name);
  const category = decodeHtml(product.categories?.[0]?.name || "");
  const firstImage = product.images?.[0]?.src || PLACEHOLDER;
  const [imgSrc, setImgSrc] = useState(firstImage);

  const price = parseFloat(product.sale_price || product.price) || 0;
  const regular = parseFloat(product.regular_price) || 0;
  const onSale = price > 0 && regular > price;
  const off = onSale ? Math.round((1 - price / regular) * 100) : 0;
  const inStock = product.stock_status === "instock" || !product.stock_status;
  const href = `/product/${product.slug || product.id}`;

  const handleAdd = () =>
    addItem({
      id: product.id,
      slug: product.slug,
      name,
      price,
      image: firstImage,
    });

  return (
    <article className="group h-full flex flex-col bg-white rounded-2xl border border-slate-200/70 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
      {/* Image */}
      <Link
        href={href}
        aria-label={name}
        className="relative block aspect-square bg-slate-50 overflow-hidden"
      >
        <Image
          src={imgSrc}
          alt={name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
          className={`object-contain transition-transform duration-500 group-hover:scale-105 ${
            inStock ? "" : "opacity-60"
          }`}
          unoptimized={imgSrc === PLACEHOLDER}
          onError={() => setImgSrc(PLACEHOLDER)}
        />

        {off > 0 && (
          <span className="absolute top-2.5 left-2.5 bg-rose-600 text-white text-[11px] md:text-xs font-bold px-2.5 py-1 rounded-full shadow">
            -{off}%
          </span>
        )}
        {!inStock && (
          <span className="absolute top-2.5 right-2.5 bg-slate-900 text-white text-[11px] md:text-xs font-bold px-2.5 py-1 rounded-full shadow">
            Out of Stock
          </span>
        )}
      </Link>

      {/* Body */}
      <div className="flex flex-col flex-1 p-3 md:p-4">
        {category && (
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 line-clamp-1">
            {category}
          </p>
        )}

        <Link href={href}>
          <h3 className="mt-1 text-sm md:text-[15px] font-semibold text-slate-800 leading-snug line-clamp-2 min-h-[2.6rem] group-hover:text-[#00a651] transition-colors">
            {name}
          </h3>
        </Link>

        <p
          className={`mt-1.5 flex items-center gap-1.5 text-xs font-semibold ${
            inStock ? "text-emerald-700" : "text-rose-600"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              inStock ? "bg-emerald-500" : "bg-rose-500"
            }`}
          />
          {inStock ? "In Stock" : "Out of Stock"}
        </p>

        {/* Price */}
        <div className="mt-auto pt-3 min-h-[4.25rem]">
          {price > 0 ? (
            <>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-lg md:text-xl font-extrabold text-[#00a651]">
                  {formatBDT(price)}
                </span>
                {onSale && (
                  <span className="text-xs md:text-sm text-slate-400 line-through">
                    {formatBDT(regular)}
                  </span>
                )}
              </div>
              {onSale && (
                <p className="text-[11px] md:text-xs font-semibold text-rose-600">
                  Save {formatBDT(regular - price)}
                </p>
              )}
            </>
          ) : (
            <span className="text-sm font-bold text-slate-600">
              Price on request
            </span>
          )}
        </div>

        {/* Action */}
        {price > 0 ? (
          <button
            onClick={handleAdd}
            disabled={!inStock}
            aria-label={`Add ${name} to cart`}
            className="mt-3 w-full h-10 flex items-center justify-center gap-2 bg-[#00a651] hover:bg-emerald-700 active:scale-[0.98] disabled:bg-slate-200 disabled:text-slate-500 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl transition-all"
          >
            <ShoppingCart className="w-4 h-4" />
            {inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        ) : (
          <a
            href={`tel:${SITE.phones[0].tel}`}
            className="mt-3 w-full h-10 flex items-center justify-center gap-2 border-2 border-[#00a651] text-[#00a651] hover:bg-emerald-50 text-sm font-bold rounded-xl transition-colors"
          >
            <Phone className="w-4 h-4" />
            Call for Price
          </a>
        )}
      </div>
    </article>
  );
}
