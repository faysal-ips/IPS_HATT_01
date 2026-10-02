"use client";

import SectionHeading from "./SectionHeading";

// Brand-er list ekhane bodlao
const BRANDS = [
  { name: "LUMINOUS", tag: "Power Backup" },
  { name: "EASTERN", tag: "Batteries" },
  { name: "TRINA SOLAR", tag: "Energy" },
  { name: "GROWATT", tag: "Inverters" },
  { name: "HAMKO", tag: "Power Solution" },
  { name: "SOLIS", tag: "Solar Tech" },
  { name: "VOLTIN", tag: "Lithium Tech" },
];

const FADE_MASK =
  "linear-gradient(to right, transparent, black 12%, black 88%, transparent)";

function BrandCard({ brand }) {
  return (
    <div className="group w-44 md:w-56 h-20 md:h-24 shrink-0 flex flex-col items-center justify-center rounded-xl bg-white border border-slate-200 shadow-sm hover:border-[#00a651] hover:shadow-md transition-all duration-200 cursor-default">
      <span className="text-base md:text-lg font-extrabold tracking-wider text-slate-800">
        {brand.name}
      </span>
      <span className="mt-1 text-[11px] font-semibold tracking-wide text-[#00a651]">
        {brand.tag}
      </span>
    </div>
  );
}

export default function BrandMarquee() {
  return (
    <section>
      <div className="mb-8 md:mb-10">
        <SectionHeading
          center
          eyebrow="Partners"
          title="Official"
          highlight="Brand Partners"
          subtitle="We collaborate with industry leaders to guarantee quality and authenticity"
        />
      </div>

      {/* Marquee - no border/rounded, edges fade with mask */}
      <div
        className="overflow-hidden py-2"
        style={{ maskImage: FADE_MASK, WebkitMaskImage: FADE_MASK }}
      >
        <div className="brand-track flex w-max hover:[animation-play-state:paused]">
          <div className="flex shrink-0 gap-4 pr-4">
            {BRANDS.map((b) => (
              <BrandCard key={b.name} brand={b} />
            ))}
          </div>
          {/* Duplicate: seamless loop-er jonno */}
          <div className="flex shrink-0 gap-4 pr-4" aria-hidden="true">
            {BRANDS.map((b) => (
              <BrandCard key={`dup-${b.name}`} brand={b} />
            ))}
          </div>
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
    </section>
  );
}
