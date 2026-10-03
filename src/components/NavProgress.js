"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const START_EVENT = "nav:start";

// router.push() use kora jaygay (search, sort) eta call korle bar shuru hoy
export function startNavProgress() {
  if (typeof window !== "undefined")
    window.dispatchEvent(new Event(START_EVENT));
}

function Bar() {
  const pathname = usePathname();
  const search = useSearchParams().toString();

  const [value, setValue] = useState(0);
  const [visible, setVisible] = useState(false);

  const running = useRef(false);
  const tick = useRef(null);
  const safety = useRef(null);
  const hide = useRef(null);

  const finish = useCallback(() => {
    if (!running.current) return;
    running.current = false;
    clearInterval(tick.current);
    clearTimeout(safety.current);
    setValue(100);
    hide.current = setTimeout(() => {
      setVisible(false);
      setValue(0);
    }, 300);
  }, []);

  const start = useCallback(() => {
    if (running.current) return;
    running.current = true;
    clearTimeout(hide.current);
    setVisible(true);
    setValue(10);
    // 90%-er dike dhire egoy, page na asa porjonto 90%-e thake
    tick.current = setInterval(() => setValue((v) => v + (90 - v) * 0.1), 200);
    // Kono karone navigation na hole bar jeno atke na thake
    safety.current = setTimeout(finish, 10000);
  }, [finish]);

  // URL bodlale (page ese gele) bar shesh
  useEffect(() => {
    finish();
  }, [pathname, search, finish]);

  useEffect(() => {
    const onClick = (e) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return;
      const a =
        e.target instanceof Element ? e.target.closest("a[href]") : null;
      if (!a) return;
      if (a.target && a.target !== "_self") return;
      if (a.hasAttribute("download")) return;

      let url;
      try {
        url = new URL(a.href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return; // tel:, mailto:, onno site
      if (
        url.pathname === window.location.pathname &&
        url.search === window.location.search
      )
        return; // same page ba shudhu #hash

      start();
    };

    // capture = true: Next.js Link-er handler-er agei dhora jay
    document.addEventListener("click", onClick, true);
    window.addEventListener(START_EVENT, start);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener(START_EVENT, start);
      clearInterval(tick.current);
      clearTimeout(safety.current);
      clearTimeout(hide.current);
    };
  }, [start]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[200] h-1"
    >
      <div
        className="h-full rounded-r-full bg-[#00a651] shadow-[0_0_10px_rgba(0,166,81,0.7)] transition-[width,opacity] duration-200 ease-out"
        style={{ width: `${value}%`, opacity: visible ? 1 : 0 }}
      />
    </div>
  );
}

export default function NavProgress() {
  // useSearchParams-er jonno Suspense lage
  return (
    <Suspense fallback={null}>
      <Bar />
    </Suspense>
  );
}
