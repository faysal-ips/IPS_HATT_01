import { Phone, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";

export default function AboutCTA() {
  return (
    <section className="relative isolate overflow-hidden rounded-2xl md:rounded-3xl bg-[#002147] text-white px-4 py-10 sm:px-8 sm:py-14 text-center">
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
        className="absolute -top-24 -right-20 -z-10 w-[280px] h-[280px] md:w-[340px] md:h-[340px] rounded-full bg-[#00a651]/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-28 -left-20 -z-10 w-[260px] h-[260px] md:w-[320px] md:h-[320px] rounded-full bg-sky-400/20 blur-3xl"
      />

      <div className="max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">
          Free Consultation
        </span>
        <h2 className="mt-1 text-2xl md:text-4xl font-extrabold leading-tight">
          Not sure which system{" "}
          <span className="text-[#00e07a]">fits your home?</span>
        </h2>
        <p className="mt-3 text-base md:text-lg text-slate-300">
          Tell us your load and budget. We will suggest the right setup, free of
          charge.
        </p>

        <div className="mt-7 flex flex-col sm:flex-row sm:justify-center gap-3">
          <a
            href={`tel:${SITE.phones[0].tel}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-[#002147] hover:bg-slate-100 px-6 py-3 text-base font-bold transition-colors"
          >
            <Phone className="w-5 h-5" /> Call {SITE.phones[0].label}
          </a>
          <a
            href={`https://wa.me/${SITE.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00a651] hover:bg-emerald-600 px-6 py-3 text-base font-bold transition-colors"
          >
            <MessageCircle className="w-5 h-5" /> WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}
