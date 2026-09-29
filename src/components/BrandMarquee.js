"use client";

export default function BrandMarquee() {
  // SVG Text/Vector based Brand Logos (Zero external image dependence & fast load)
  const brands = [
    { name: "LUMINOUS", tag: "POWER BACKUP" },
    { name: "EASTERN", tag: "BATTERIES" },
    { name: "TRINA SOLAR", tag: "ENERGY" },
    { name: "GROWATT", tag: "INVERTERS" },
    { name: "HAMKO", tag: "POWER SOLUTION" },
    { name: "SOLIS", tag: "SOLAR TECH" },
    { name: "VOLTIN", tag: "LITHIUM TECH" },
  ];

  // Marquee seamless loop er jonno array 2 bar duplicate kora holo
  const marqueeList = [...brands, ...brands];

  return (
    <section className="py-6">
      <div className="bg-white border border-slate-200/80 rounded-2xl py-8 px-4 shadow-sm text-center">
        {/* Title Section */}
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-800">
            Official <span className="text-[#00a651]">Brand Partners</span>
          </h2>
          <p className="text-xs md:text-sm text-slate-500 mt-1 font-medium">
            We collaborate with industry leaders to guarantee quality and
            authenticity
          </p>
        </div>

        {/* Marquee Wrapper with CSS Masking (Left & Right Fade Effect) */}
        <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,_transparent_0%,_black_10%,_black_90%,_transparent_100%)]">
          <div className="flex w-max animate-marquee space-x-4 hover:[animation-play-state:paused]">
            {marqueeList.map((brand, index) => (
              <div
                key={index}
                className="w-44 md:w-52 h-20 shrink-0 bg-slate-50 border border-emerald-500/30 rounded-xl flex flex-col items-center justify-center p-3 hover:border-[#00a651] hover:bg-emerald-50/40 hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <span className="text-base md:text-lg font-black tracking-wider text-slate-800">
                  {brand.name}
                </span>
                <span className="text-[10px] font-bold text-[#00a651] tracking-widest uppercase mt-0.5">
                  {brand.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tailwind Custom Marquee Animation */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </section>
  );
}
