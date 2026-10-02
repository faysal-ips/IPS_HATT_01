import Link from "next/link";
import { Sun, ArrowRight, CheckCircle2 } from "lucide-react";
import { SITE } from "@/lib/site";

const POINTS = [
  "Genuine, brand-authentic products",
  "Warranty as stated on every product",
  "24-48 hour nationwide delivery",
  "Free solar consultation",
];

export default function AboutHero() {
  return (
    <section className="relative isolate overflow-hidden rounded-2xl md:rounded-3xl bg-[#002147] text-white">
      {/* Background effect */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -top-28 -right-24 -z-10 w-[320px] h-[320px] md:w-[440px] md:h-[440px] rounded-full bg-[#00a651]/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -left-24 -z-10 w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-sky-400/20 blur-3xl"
      />

      <div className="px-4 py-10 sm:px-8 sm:py-14 lg:px-16 lg:py-20 grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        <div className="lg:col-span-7">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">
            <Sun className="w-4 h-4" /> About {SITE.name}
          </span>

          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.12]">
            Reliable Solar &amp; Backup Power,{" "}
            <span className="text-[#00e07a]">Delivered Across Bangladesh</span>
          </h1>

          <p className="mt-4 text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed">
            We bring genuine solar panels, inverters, lithium batteries and IPS
            systems directly to your doorstep - with honest advice and support
            you can reach.
          </p>

          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00a651] hover:bg-emerald-600 px-6 py-3 text-base font-bold shadow-lg transition-colors"
            >
              Shop Now <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/5 hover:bg-white/15 px-6 py-3 text-base font-bold transition-colors"
            >
              Talk to an Expert
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-2xl border border-white/15 bg-white/[0.07] backdrop-blur p-5 sm:p-6 md:p-8 space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-300">
              What you can count on
            </p>
            {POINTS.map((t) => (
              <div key={t} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-[#00e07a] shrink-0 mt-0.5" />
                <span className="text-base md:text-lg font-medium leading-snug">
                  {t}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
