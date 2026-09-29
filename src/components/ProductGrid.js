"use client";

import Image from "next/image";

const PLACEHOLDER_IMAGE = "/placeholder.svg";

export default function ProductGrid({ products }) {
  return (
    <div className="max-w-[1600px] mx-auto py-6">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            const imgSrc =
              product.images && product.images.length > 0
                ? product.images[0].src
                : PLACEHOLDER_IMAGE;

            return (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow"
              >
                <div className="relative w-full h-48 mb-4 bg-slate-100 rounded-lg overflow-hidden">
                  <Image
                    src={imgSrc}
                    alt={product.name || "Product"}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="font-semibold text-slate-800 text-base mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mt-auto pt-2">
                  <span className="text-lg font-bold text-[#00a651]">
                    ৳{product.price || "0.00"}
                  </span>
                  <button className="bg-[#00a651] text-white px-3 py-1.5 rounded-md text-xs font-semibold hover:bg-emerald-700 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
