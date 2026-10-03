"use client";

import { ShoppingCart } from "lucide-react";

import { useCart, formatBDT } from "@/context/CartContext";
function Badge({ count, className = "" }) {
  return (
    <span
      className={`absolute bg-[#00a651] text-white font-bold rounded-full flex items-center justify-center min-w-6 h-6 px-1 text-[11px] ${className}`}
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
        <Badge count={totalQty} className="-top-4 -right-3" />
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
          <ShoppingCart className="w-6 h-6 text-slate-700" />
          <Badge count={totalQty} className="-top-5 -right-3" />
        </span>
        <span>{formatBDT(subtotal)}</span>
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
        <ShoppingCart className="w-6 h-6 text-slate-700 hover:text-[#00a651] transition-colors" />
        <Badge count={totalQty} className="-top-5 -right-3" />
      </button>
      <span>{formatBDT(subtotal)}</span>
    </>
  );
}
