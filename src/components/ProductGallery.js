"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

const PLACEHOLDER = "/placeholder.svg";

export default function ProductGallery({
  images = [],
  productName = "Product",
}) {
  // Duplicate bad diye clean list
  const list = useMemo(() => {
    const seen = new Set();
    const out = [];
    for (const img of images || []) {
      const src = img?.src;
      if (!src || seen.has(src)) continue;
      seen.add(src);
      out.push({ src, alt: img.alt || "" });
    }
    if (!out.length) out.push({ src: PLACEHOLDER, alt: "" });
    return out.map((im, i) => ({
      ...im,
      alt:
        im.alt ||
        (out.length > 1 ? `${productName} - image ${i + 1}` : productName),
    }));
  }, [images, productName]);

  const total = list.length;
  const multi = total > 1;

  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [broken, setBroken] = useState({});
  const stripRef = useRef(null);
  const thumbRefs = useRef([]);
  const closeRef = useRef(null);
  const touchX = useRef(null);

  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + total) % total),
    [total]
  );

  const at = Math.min(index, total - 1);
  const cur = list[at];
  const srcOf = (im) => (broken[im.src] ? PLACEHOLDER : im.src);
  const markBroken = (im) => setBroken((b) => ({ ...b, [im.src]: true }));

  // Thumbnail strip-e active image-ke majhkhane ana (page scroll hoy na)
  useEffect(() => {
    const box = stripRef.current;
    const el = thumbRefs.current[at];
    if (!box || !el) return;
    const left = el.offsetLeft - (box.clientWidth - el.clientWidth) / 2;
    box.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [at]);

  // Fullscreen viewer: ESC, arrow key, scroll lock
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, next, prev]);

  // Mobile swipe
  const swipe = multi
    ? {
        onTouchStart: (e) => {
          touchX.current = e.touches[0].clientX;
        },
        onTouchEnd: (e) => {
          if (touchX.current == null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 45) dx < 0 ? next() : prev();
        },
      }
    : {};

  const arrowCls =
    "absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white border border-slate-200 shadow text-slate-800 flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00a651]";

  return (
    <div className="lg:sticky lg:top-24">
      {/* Main image */}
      <div
        {...swipe}
        className="relative aspect-square overflow-hidden rounded-2xl border border-slate-200 bg-white"
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open image viewer"
          className="absolute inset-0 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#00a651]"
        >
          <Image
            key={cur.src}
            src={srcOf(cur)}
            alt={cur.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-contain"
            unoptimized={srcOf(cur) === PLACEHOLDER}
            onError={() => markBroken(cur)}
          />
        </button>

        {multi && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              className={`${arrowCls} left-2`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className={`${arrowCls} right-2`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <span className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-slate-900/70 px-2.5 py-1 text-xs font-bold text-white">
              {at + 1} / {total}
            </span>
          </>
        )}

        <span className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-white/90 border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-sm">
          <ZoomIn className="w-3.5 h-3.5" /> Zoom
        </span>
      </div>

      {/* Thumbnails */}
      {multi && (
        <div
          ref={stripRef}
          className="relative mt-3 flex gap-2.5 overflow-x-auto pb-1.5 snap-x [scrollbar-width:thin]"
        >
          {list.map((im, i) => {
            const active = i === at;
            return (
              <button
                key={im.src}
                ref={(el) => (thumbRefs.current[i] = el)}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show image ${i + 1} of ${total}`}
                aria-current={active ? "true" : undefined}
                className={`relative shrink-0 snap-start w-16 h-16 sm:w-20 sm:h-20 overflow-hidden rounded-xl border-2 bg-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00a651] ${
                  active
                    ? "border-[#00a651] ring-2 ring-[#00a651]/20"
                    : "border-slate-200 opacity-75 hover:opacity-100 hover:border-slate-400"
                }`}
              >
                <Image
                  src={srcOf(im)}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-contain"
                  unoptimized={srcOf(im) === PLACEHOLDER}
                  onError={() => markBroken(im)}
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Fullscreen viewer */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${productName} images`}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[120] flex flex-col bg-slate-950/95"
        >
          <div className="flex items-center justify-between px-4 py-3 text-white">
            <p className="text-sm font-semibold">
              {multi ? `${at + 1} / ${total}` : productName}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
              aria-label="Close image viewer"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative flex-1 min-h-0 px-2 sm:px-12" {...swipe}>
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative mx-auto h-full w-full max-w-5xl"
            >
              <Image
                key={`lb-${cur.src}`}
                src={srcOf(cur)}
                alt={cur.alt}
                fill
                sizes="100vw"
                className="object-contain"
                unoptimized={srcOf(cur) === PLACEHOLDER}
                onError={() => markBroken(cur)}
              />
            </div>

            {multi && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  aria-label="Previous image"
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  aria-label="Next image"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {multi && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex justify-center gap-2 overflow-x-auto px-4 py-3"
            >
              {list.map((im, i) => (
                <button
                  key={`lbt-${im.src}`}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show image ${i + 1} of ${total}`}
                  aria-current={i === at ? "true" : undefined}
                  className={`relative shrink-0 w-14 h-14 overflow-hidden rounded-lg border-2 bg-white ${
                    i === at
                      ? "border-[#00e07a]"
                      : "border-white/20 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={srcOf(im)}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-contain"
                    unoptimized={srcOf(im) === PLACEHOLDER}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
