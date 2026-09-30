"use client";

import { ShoppingCart } from "lucide-react";
import { useCart, formatTaka } from "@/context/CartContext";

function Badge({ count, className = "" }) {
  return (
    <span
      className={`absolute bg-[#00a651] text-white font-bold rounded-full flex items-center justify-center min-w-4 h-4 px-1 text-[9px] ${className}`}
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}

export default function HeaderCart({ variant = "desktop" }) {
  const { totalQty, subtotal, openCart } = useCart();

  if (variant === "mobile") {
    return (
      <button
        onClick={openCart}
        aria-label="Open cart"
        className="relative text-slate-700"
      >
        <ShoppingCart className="w-6 h-6" />
        <Badge count={totalQty} className="-top-1.5 -right-2.5" />
      </button>
    );
  }

  if (variant === "sticky") {
    return (
      <button
        onClick={openCart}
        aria-label="Open cart"
        className="flex items-center gap-1.5 font-bold text-[#00a651]"
      >
        <span className="relative">
          <ShoppingCart className="w-4 h-4 text-slate-700" />
          <Badge count={totalQty} className="-top-1.5 -right-2" />
        </span>
        <span>{formatTaka(subtotal)}</span>
      </button>
    );
  }

  // desktop
  return (
    <>
      <button
        onClick={openCart}
        aria-label="Open cart"
        className="relative cursor-pointer"
      >
        <ShoppingCart className="w-5 h-5 text-slate-700 hover:text-[#00a651] transition-colors" />
        <Badge count={totalQty} className="-top-1.5 -right-2.5" />
      </button>
      <span>{formatTaka(subtotal)}</span>
    </>
  );
}
