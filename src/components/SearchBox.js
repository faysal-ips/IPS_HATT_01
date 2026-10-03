"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import { startNavProgress } from "@/components/NavProgress";
const PLACEHOLDER = "/placeholder.svg";
const fmt = (n) => `৳${Number(n || 0).toLocaleString("en-BD")}`;

function SearchBoxInner({ variant = "desktop", onNavigate }) {
  const router = useRouter();
  const urlQuery = useSearchParams().get("search") || "";

  const [q, setQ] = useState(urlQuery);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [doneFor, setDoneFor] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const boxRef = useRef(null);
  const inputRef = useRef(null);

  const term = q.trim();

  // URL bodlale (jemon filter chip clear korle) input sync hobe
  useEffect(() => {
    setQ(urlQuery);
  }, [urlQuery]);

  // Live suggestions (300ms debounce)
  useEffect(() => {
    if (!open || term.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }
    const ctrl = new AbortController();
    setLoading(true);
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(term)}`, {
          signal: ctrl.signal,
        });
        const data = await res.json();
        setResults(Array.isArray(data.results) ? data.results : []);
        setActive(-1);
        setDoneFor(term);
      } catch (e) {
        if (e.name !== "AbortError") setResults([]);
      } finally {
        if (!ctrl.signal.aborted) setLoading(false);
      }
    }, 300);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [term, open]);

  // Baire click korle dropdown bondho
  useEffect(() => {
    const onDown = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const close = () => {
    setOpen(false);
    onNavigate?.();
  };

  const go = (href) => {
    inputRef.current?.blur();
    close();
    startNavProgress();
    router.push(href);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (active >= 0 && results[active])
      return go(`/product/${results[active].slug}`);
    go(term ? `/shop?search=${encodeURIComponent(term)}` : "/shop");
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") setOpen(false);
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, -1));
    }
  };

  const showDropdown =
    open &&
    term.length >= 2 &&
    (loading || results.length > 0 || doneFor === term);

  const inputProps = {
    ref: inputRef,
    value: q,
    onChange: (e) => {
      setQ(e.target.value);
      setOpen(true);
    },
    onFocus: () => setOpen(true),
    onKeyDown,
    type: "text",
    placeholder:
      variant === "desktop" ? "Search for products..." : "Search for products",
    autoComplete: "off",
    enterKeyHint: "search",
    "aria-label": "Search products",
  };

  return (
    <div ref={boxRef} className="relative w-full">
      {variant === "desktop" ? (
        <form
          onSubmit={onSubmit}
          role="search"
          className="relative flex items-center"
        >
          <input
            {...inputProps}
            className="w-full border border-gray-300 rounded-l-md px-4 py-3 text-sm focus:outline-none focus:border-[#00a651]"
          />
          <button
            type="submit"
            aria-label="Search"
            className="bg-[#00a651] text-white px-5 py-3 h-[46px]  rounded-r-md hover:bg-emerald-700 transition-colors flex items-center justify-center"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
          </button>
        </form>
      ) : (
        <form onSubmit={onSubmit} role="search" className="relative">
          <input
            {...inputProps}
            className="w-full border border-gray-300 rounded-md pl-3 pr-9 py-1.5 text-xs focus:outline-none focus:border-[#00a651]"
          />
          <button
            type="submit"
            aria-label="Search"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-700"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
          </button>
        </form>
      )}

      {showDropdown && (
        <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden">
          {results.length > 0 ? (
            <>
              <ul role="listbox">
                {results.map((r, i) => (
                  <li key={r.id} role="option" aria-selected={i === active}>
                    <Link
                      href={`/product/${r.slug}`}
                      onClick={close}
                      onMouseEnter={() => setActive(i)}
                      className={`flex items-center gap-3 px-3 py-2.5 ${
                        i === active ? "bg-emerald-50" : "hover:bg-slate-50"
                      }`}
                    >
                      <span className="relative w-11 h-11 shrink-0 rounded-lg overflow-hidden bg-slate-100 border border-slate-100">
                        <Image
                          src={r.image || PLACEHOLDER}
                          alt=""
                          fill
                          sizes="44px"
                          className="object-cover"
                          unoptimized={!r.image}
                        />
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block text-sm font-semibold text-slate-800 line-clamp-1">
                          {r.name}
                        </span>
                        <span className="block text-xs mt-0.5">
                          <span className="font-bold text-[#00a651]">
                            {r.price > 0 ? fmt(r.price) : "Call for price"}
                          </span>
                          {!r.inStock && (
                            <span className="ml-2 text-rose-600 font-semibold">
                              Out of stock
                            </span>
                          )}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={`/shop?search=${encodeURIComponent(term)}`}
                onClick={close}
                className="block text-center text-sm font-bold text-[#00a651] hover:bg-emerald-50 px-3 py-2.5 border-t border-slate-100"
              >
                Sob result dekhun
              </Link>
            </>
          ) : loading ? (
            <p className="px-4 py-3 text-sm text-slate-500">Khujchi...</p>
          ) : (
            <p className="px-4 py-3 text-sm text-slate-500">
              "{term}"-er jonno kono product paowa jayni.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default function SearchBox(props) {
  const skeleton = props.variant === "mobile" ? "h-[34px]" : "h-[42px]";
  return (
    <Suspense
      fallback={
        <div
          className={`${skeleton} w-full rounded-md border border-gray-300 bg-white`}
        />
      }
    >
      <SearchBoxInner {...props} />
    </Suspense>
  );
}
