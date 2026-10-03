"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronRight, ArrowRight, User, X } from "lucide-react";
import Logo from "./Logo";
import SearchBox from "../SearchBox";
import { navLinks, drawerCategories } from "./Config";

export default function MobileDrawer({ open, onClose, isActive }) {
  const [activeTab, setActiveTab] = useState("menu"); // 'menu' | 'categories'

  // Drawer khola thakle: page scroll lock + Escape diye close
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const tabClass = (tab) =>
    `flex-1 py-3 text-center transition-colors ${
      activeTab === tab
        ? "border-b-2 border-[#00a651] bg-white text-[#00a651]"
        : "text-gray-500 hover:text-gray-800"
    }`;

  const rowClass =
    "flex items-center justify-between px-4 py-3.5 text-[13px] font-bold uppercase text-gray-700 transition-colors hover:bg-gray-50";

  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden transition-[visibility] duration-300 ${
        open ? "visible" : "invisible"
      }`}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
        className={`absolute left-0 top-0 flex h-[100dvh] w-[85%] max-w-[340px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Top: logo + close */}
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <Logo size="ll" onClick={onClose} />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search */}
        <div className="border-b border-gray-200 p-3">
          <SearchBox variant="mobile" onNavigate={onClose} />
        </div>

        {/* Tabs */}
        <div
          role="tablist"
          className="flex border-b border-gray-200 bg-gray-50 text-xs font-bold uppercase tracking-wider"
        >
          <button
            role="tab"
            aria-selected={activeTab === "menu"}
            onClick={() => setActiveTab("menu")}
            className={tabClass("menu")}
          >
            Menu
          </button>
          <button
            role="tab"
            aria-selected={activeTab === "categories"}
            onClick={() => setActiveTab("categories")}
            className={tabClass("categories")}
          >
            Categories
          </button>
        </div>

        {/* List (shudhu eta scroll hoy) */}
        <div className="min-h-0 flex-1 divide-y divide-gray-100 overflow-y-auto overscroll-contain pb-[env(safe-area-inset-bottom)]">
          {activeTab === "menu" ? (
            <>
              {navLinks.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={onClose}
                  className={`${rowClass} ${
                    isActive(item.href) ? "text-[#00a651]" : ""
                  }`}
                >
                  <span>{item.title}</span>
                </Link>
              ))}
              <Link
                href="#"
                onClick={onClose}
                className="flex items-center gap-2 px-4 py-3.5 text-[13px] font-bold uppercase text-[#00a651]"
              >
                <User className="h-4 w-4" />
                <span>Login / Register</span>
              </Link>
            </>
          ) : (
            <>
              {drawerCategories.map(({ name, slug, icon: Icon }) => (
                <Link
                  key={slug}
                  href={`/shop?category=${slug}`}
                  onClick={onClose}
                  className={rowClass}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-slate-700" strokeWidth={2} />
                    {name}
                  </span>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
              ))}
              <Link
                href="/shop"
                onClick={onClose}
                className="flex items-center justify-between px-4 py-3.5 text-[13px] font-bold uppercase text-[#00a651]"
              >
                <span>All Products</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </>
          )}
        </div>
      </aside>
    </div>
  );
}
