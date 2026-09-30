"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart, formatBDT } from "@/context/CartContext";

const CHECKOUT_URL = "/checkout";
const PLACEHOLDER = "/placeholder.svg";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQty,
    removeItem,
    clearCart,
    totalQty,
    subtotal,
  } = useCart();

  // ESC diye bondho + drawer khola thakle page scroll lock
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && closeCart();
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, closeCart]);

  return (
    <div
      className={`fixed inset-0 z-[100] ${isOpen ? "" : "pointer-events-none"}`}
      inert={!isOpen}
    >
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-slate-900/50 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`absolute right-0 top-0 h-full w-full max-w-[420px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#00a651]" />
            <h2 className="text-lg font-extrabold text-slate-900">Your Cart</h2>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded-full">
              {totalQty}
            </span>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="w-9 h-9 flex items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-8 gap-3">
            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center">
              <ShoppingBag className="w-9 h-9 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              Apnar cart faka
            </h3>
            <p className="text-sm text-slate-500">
              Kono product add korun, ekhane dekhte paben.
            </p>
            <button
              onClick={closeCart}
              className="mt-2 bg-[#00a651] hover:bg-emerald-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.map((item) => {
                const img = item.image || PLACEHOLDER;
                const href = item.slug ? `/product/${item.slug}` : "#";
                return (
                  <li
                    key={item.id}
                    className="flex gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/60"
                  >
                    <Link
                      href={href}
                      onClick={closeCart}
                      className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-white border border-slate-100"
                    >
                      <Image
                        src={img}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                        unoptimized={img === PLACEHOLDER}
                      />
                    </Link>

                    <div className="flex-1 min-w-0 flex flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={href}
                          onClick={closeCart}
                          className="text-sm font-semibold text-slate-800 line-clamp-2 hover:text-[#00a651] transition-colors"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remove ${item.name}`}
                          className="shrink-0 p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs text-slate-500 mt-0.5">
                        {formatBDT(item.price)} each
                      </p>

                      <div className="flex items-center justify-between mt-auto pt-2">
                        <div className="flex items-center border border-slate-200 rounded-lg bg-white">
                          <button
                            onClick={() => updateQty(item.id, item.qty - 1)}
                            disabled={item.qty <= 1}
                            aria-label="Decrease quantity"
                            className="w-8 h-8 flex items-center justify-center text-slate-700 hover:bg-slate-100 rounded-l-lg disabled:opacity-40 disabled:hover:bg-transparent"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm font-bold text-slate-900">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => updateQty(item.id, item.qty + 1)}
                            aria-label="Increase quantity"
                            className="w-8 h-8 flex items-center justify-center text-slate-700 hover:bg-slate-100 rounded-r-lg"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="font-extrabold text-[#00a651]">
                          {formatBDT(item.price * item.qty)}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Footer */}
            <div className="border-t border-slate-200 p-5 space-y-3 bg-white">
              <div className="flex items-center justify-between">
                <span className="text-slate-600 font-medium">Subtotal</span>
                <span className="text-2xl font-black text-[#002147]">
                  {formatBDT(subtotal)}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Delivery charge checkout-e calculate hobe.
              </p>

              <Link
                href={CHECKOUT_URL}
                onClick={closeCart}
                className="block w-full text-center bg-[#00a651] hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow-md transition-colors"
              >
                Checkout
              </Link>
              <div className="flex gap-3">
                <button
                  onClick={closeCart}
                  className="flex-1 border-2 border-slate-200 hover:border-[#00a651] hover:text-[#00a651] text-slate-700 font-semibold py-2.5 rounded-xl transition-colors text-sm"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={clearCart}
                  className="px-4 text-sm font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
