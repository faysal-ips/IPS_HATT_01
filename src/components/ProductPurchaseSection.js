"use client";

import { useState } from "react";
import { ShoppingCart, Zap, Plus, Minus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { decodeHtml } from "@/lib/html";

export default function ProductPurchaseSection({
  product,
  basePrice,
  regularPrice,
}) {
  const [quantity, setQuantity] = useState(1);
  const { addItem, buyNow } = useCart();

  const inStock = product.stock_status === "instock" || !product.stock_status;

  const incrementQty = () => setQuantity((prev) => Math.min(prev + 1, 99));
  const decrementQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const totalPrice = (basePrice * quantity).toLocaleString("en-BD");
  const totalRegularPrice = regularPrice
    ? (regularPrice * quantity).toLocaleString("en-BD")
    : null;

  const cartItem = {
    id: product.id,
    slug: product.slug,
    name: decodeHtml(product.name),
    price: basePrice,
    image: product.images?.[0]?.src || "/placeholder.svg",
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Dynamic Price Box */}
      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-wrap items-center gap-4">
        <span className="text-3xl md:text-4xl font-black text-[#002147]">
          ৳{totalPrice}
        </span>
        {totalRegularPrice && regularPrice !== basePrice && (
          <span className="text-lg text-slate-400 line-through font-medium">
            ৳{totalRegularPrice}
          </span>
        )}
        {quantity > 1 && (
          <span className="ml-auto text-xs font-bold text-slate-700 bg-white px-3 py-1.5 rounded-lg border border-slate-300 shadow-sm">
            ৳{basePrice.toLocaleString("en-BD")} x {quantity}
          </span>
        )}
      </div>

      {product.short_description && (
        <div
          className="text-slate-700 text-base leading-relaxed prose max-w-none"
          dangerouslySetInnerHTML={{ __html: product.short_description }}
        />
      )}

      {/* Quantity & Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center pt-2">
        <div className="flex items-center justify-between border-2 border-slate-200 rounded-xl bg-white p-1.5 w-full sm:w-40 h-13 shadow-sm">
          <button
            onClick={decrementQty}
            aria-label="Decrease Quantity"
            className="w-10 h-10 flex items-center justify-center text-slate-700 hover:bg-slate-100 rounded-lg transition-colors font-bold"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="font-extrabold text-slate-900 text-lg">
            {quantity}
          </span>
          <button
            onClick={incrementQty}
            aria-label="Increase Quantity"
            className="w-10 h-10 flex items-center justify-center text-slate-700 hover:bg-slate-100 rounded-lg transition-colors font-bold"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 flex gap-3 h-13">
          <button
            onClick={() => addItem(cartItem, quantity)}
            disabled={!inStock}
            className="flex-1 bg-[#00a651] hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 text-base px-4"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Add to Cart</span>
          </button>
          <button
            onClick={() => buyNow(cartItem, quantity)}
            disabled={!inStock}
            className="flex-1 bg-[#002147] hover:bg-slate-900 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 text-base px-4"
          >
            <Zap className="w-5 h-5 fill-current" />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}
