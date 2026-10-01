"use client";

// Brand-er list ekhane bodlao. color = card-er halka rong
const BRANDS = [
  { name: "LUMINOUS", tag: "POWER BACKUP", color: "#1d4ed8" },
  { name: "EASTERN", tag: "BATTERIES", color: "#dc2626" },
  { name: "TRINA SOLAR", tag: "ENERGY", color: "#0ea5e9" },
  { name: "GROWATT", tag: "INVERTERS", color: "#16a34a" },
  { name: "HAMKO", tag: "POWER SOLUTION", color: "#f59e0b" },
  { name: "SOLIS", tag: "SOLAR TECH", color: "#f97316" },
  { name: "VOLTIN", tag: "LITHIUM TECH", color: "#7c3aed" },
];

function BrandCard({ brand }) {
  return (
    <div
      style={{
        "--c": brand.color,
        background: `linear-gradient(135deg, ${brand.color}14, rgba(255,255,255,0.7) 65%)`,
      }}
      className="group relative w-44 md:w-56 h-20 md:h-24 shrink-0 overflow-hidden rounded-2xl border border-white/80 ring-1 ring-slate-200/70 backdrop-blur-sm flex flex-col items-center justify-center px-3 shadow-sm hover:-translate-y-1 hover:shadow-lg hover:ring-[var(--c)] transition-all duration-300 cursor-default"
    >
      {/* Brand-er rongin dot */}
      <span
        className="absolute top-3 left-3 w-2 h-2 rounded-full opacity-70 group-hover:opacity-100 group-hover:scale-125 transition-all"
        style={{ backgroundColor: brand.color }}
      />
      <span className="text-base md:text-lg font-black tracking-wider text-slate-700 group-hover:text-slate-900 transition-colors">
        {brand.name}
      </span>
      <span
        className="mt-0.5 text-[10px] font-bold tracking-widest uppercase"
        style={{ color: brand.color }}
      >
        {brand.tag}
      </span>
    </div>
  );
}

export default function BrandMarquee() {
  return (
    <div>
      {/* Heading (baki section-er sathe ekoi style) */}
      <div className="mb-6 md:mb-8 pb-4 border-b border-slate-200">
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#00a651]">
          Partners
        </span>
        <h2 className="mt-1 text-2xl md:text-4xl font-extrabold text-slate-800 leading-tight">
          Official <span className="text-[#00a651]">Brand Partners</span>
        </h2>
        <p className="mt-1.5 text-sm md:text-base text-slate-500 font-medium">
          We collaborate with industry leaders to guarantee quality and
          authenticity
        </p>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white via-slate-50 to-emerald-50/50 py-8 md:py-10 shadow-sm">
        {/* Halka rongin glow */}
        <div className="pointer-events-none absolute -top-16 left-1/4 w-64 h-64 rounded-full bg-emerald-300/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 right-1/4 w-64 h-64 rounded-full bg-sky-300/20 blur-3xl" />

        {/* Marquee */}
        <div className="relative">
          <div className="brand-track flex w-max hover:[animation-play-state:paused]">
            <div className="flex shrink-0 gap-4 pr-4">
              {BRANDS.map((b) => (
                <BrandCard key={b.name} brand={b} />
              ))}
            </div>
            {/* Duplicate: seamless loop-er jonno, screen reader-e dekhabe na */}
            <div className="flex shrink-0 gap-4 pr-4" aria-hidden="true">
              {BRANDS.map((b) => (
                <BrandCard key={`dup-${b.name}`} brand={b} />
              ))}
            </div>
          </div>

          {/* Baam edge: fade + blur + halka green tint (blur nijeo dhire mile jay) */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 md:w-44 backdrop-blur-md bg-gradient-to-r from-white/90 via-emerald-50/50 to-transparent [mask-image:linear-gradient(to_right,black_30%,transparent)]" />
          {/* Daan edge */}
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 md:w-44 backdrop-blur-md bg-gradient-to-l from-white/90 via-emerald-50/50 to-transparent [mask-image:linear-gradient(to_left,black_30%,transparent)]" />
        </div>
      </div>

      <style jsx global>{`
        @keyframes brand-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .brand-track {
          animation: brand-marquee 35s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .brand-track {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
