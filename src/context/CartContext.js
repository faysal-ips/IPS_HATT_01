"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "ipshatt_cart_v1";
const MAX_QTY = 99;

const CartContext = createContext(null);

export const formatBDT = (n) => `৳${Number(n || 0).toLocaleString("en-BD")}`;
export const formatTaka = (n) =>
  `${Number(n || 0).toLocaleString("en-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}৳`;

const clamp = (q) => Math.max(1, Math.min(MAX_QTY, Number(q) || 1));

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Browser theke cart load
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {}
    setHydrated(true);
  }, []);

  // Cart change hole save (load shesh howar por)
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, hydrated]);

  // Onno tab-e cart bodlale sync
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key !== STORAGE_KEY || !e.newValue) return;
      try {
        setItems(JSON.parse(e.newValue));
      } catch {}
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  // Item add (thakle quantity barbe) + drawer open
  const addItem = useCallback((item, qty = 1) => {
    setItems((prev) => {
      const i = prev.findIndex((p) => p.id === item.id);
      if (i === -1) return [...prev, { ...item, qty: clamp(qty) }];
      const next = [...prev];
      next[i] = { ...next[i], ...item, qty: clamp(next[i].qty + qty) };
      return next;
    });
    setIsOpen(true);
  }, []);

  // Buy Now: quantity thik oi songkha set hobe (double add hobe na)
  const buyNow = useCallback((item, qty = 1) => {
    setItems((prev) => {
      const i = prev.findIndex((p) => p.id === item.id);
      if (i === -1) return [...prev, { ...item, qty: clamp(qty) }];
      const next = [...prev];
      next[i] = { ...next[i], ...item, qty: clamp(qty) };
      return next;
    });
    setIsOpen(true);
  }, []);

  const updateQty = useCallback((id, qty) => {
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, qty: clamp(qty) } : p))
    );
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const { totalQty, subtotal } = useMemo(
    () => ({
      totalQty: items.reduce((s, p) => s + p.qty, 0),
      subtotal: items.reduce((s, p) => s + p.price * p.qty, 0),
    }),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      isOpen,
      hydrated,
      totalQty,
      subtotal,
      openCart,
      closeCart,
      addItem,
      buyNow,
      updateQty,
      removeItem,
      clearCart,
    }),
    [
      items,
      isOpen,
      hydrated,
      totalQty,
      subtotal,
      openCart,
      closeCart,
      addItem,
      buyNow,
      updateQty,
      removeItem,
      clearCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
