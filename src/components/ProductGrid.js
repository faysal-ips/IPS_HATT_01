"use client";
import { useCart } from "@/context/CartContext";
import { decodeHtml } from "@/lib/html";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link"; // Next.js Link import kora hoyeche

const PLACEHOLDER_IMAGE = "/placeholder.svg";

function ProductCard({ product }) {
  const initialSrc = product.images?.[0]?.src || PLACEHOLDER_IMAGE;
  const [imgSrc, setImgSrc] = useState(initialSrc);
  const isPlaceholder = imgSrc === PLACEHOLDER_IMAGE;

  const price = product.sale_price || product.price || "0";
  const { addItem } = useCart();
  const handleAdd = () =>
    addItem({
      id: product.id,
      slug: product.slug,
      name: decodeHtml(product.name),
      price: parseFloat(price) || 0,
      image: product.images?.[0]?.src || PLACEHOLDER_IMAGE,
    });
  const productSlug = product.slug || product.id; // slug na thakle id use hobe

  return (
    <div className="flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow group">
      {/* Image Link */}
      <Link
        href={`/product/${product.slug || product.id}`}
        className="block relative w-full aspect-square mb-4 bg-slate-100 rounded-lg overflow-hidden"
      >
        <Image
          src={imgSrc}
          alt={product.name || "Product"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          unoptimized={isPlaceholder}
          onError={() => setImgSrc(PLACEHOLDER_IMAGE)}
        />
      </Link>

      {/* Title Link */}
      <Link href={`/product/${productSlug}`}>
        <h3 className="font-semibold text-slate-800 text-base mb-2 line-clamp-2 hover:text-[#00a651] transition-colors">
          {product.name}
        </h3>
      </Link>

      <div className="flex items-center justify-between mt-auto pt-2">
        <div className="flex flex-col leading-tight">
          <span className="text-lg font-bold text-[#00a651]">৳{price}</span>
          {product.sale_price && product.regular_price && (
            <span className="text-xs text-gray-400 line-through">
              ৳{product.regular_price}
            </span>
          )}
        </div>
        <button
          onClick={handleAdd}
          className="bg-[#00a651] text-white px-3 py-1.5 rounded-md text-xs font-semibold hover:bg-emerald-700 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default function ProductGrid({ products = [] }) {
  return (
    <div className="max-w-[1600px] mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-slate-800">
          IPS HATT <span className="text-[#00a651]">Products</span>
        </h1>
        <span className="bg-emerald-100 text-emerald-800 font-semibold px-3 py-1 rounded-full text-sm">
          Total: {products.length} Products
        </span>
      </div>

      {products.length === 0 ? (
        <p className="text-center text-gray-500 py-12">
          No products found or connection failed.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
