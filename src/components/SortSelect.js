"use client";

import { useRouter } from "next/navigation";

export default function SortSelect({ value, options }) {
  const router = useRouter();

  return (
    <label className="flex items-center gap-2 text-sm text-slate-600">
      <span className="hidden sm:inline font-medium">Sort by</span>
      <select
        value={value}
        onChange={(e) => {
          const o = options.find((x) => x.value === e.target.value);
          if (o) router.push(o.href);
        }}
        className="rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-[#00a651]"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
