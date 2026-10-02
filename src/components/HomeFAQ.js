import Link from "next/link";
import { Plus } from "lucide-react";
import { POLICY } from "@/lib/site";

const FAQS = [
  {
    q: "Which IPS or inverter size do I need?",
    a: "Add up the watts of everything you want to run at the same time, then add about 20-25% as a safety margin. A fridge, water pump or AC needs extra power to start, so it needs a larger size. Use the calculator above for a quick estimate, or call us and we will size it for you free of charge.",
  },
  {
    q: "Lithium or tubular battery: which one should I choose?",
    a: "Lithium (LiFePO4) batteries last much longer, are lighter, need no maintenance and can use more of their stored energy, but cost more upfront. Tubular batteries are cheaper to buy, but need regular care, are heavy and wear out sooner. If you have frequent daily outages, lithium is usually the better long-term value.",
  },
  {
    q: "Can an IPS run an AC?",
    a: "Most home IPS units are meant for lights, fans, TV, router and a fridge. An AC draws a lot of power and needs a large inverter and battery bank, so it needs a properly sized system. Tell us your AC size and we will advise what is realistic.",
  },

  {
    q: "Can I return a product?",
    a: `If you receive a wrong, damaged or defective item, tell us within ${POLICY.returnDays} days of delivery and we will arrange a replacement or refund as per our Return & Refund Policy.`,
  },
];

export default function HomeFAQ() {
  // Google-er FAQ rich result-er jonno (visible text-er sathe mile)
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />

      {/* Heading (majhkhane) */}
      <div className="mx-auto mb-6 max-w-3xl border-b border-slate-200 pb-4 text-center md:mb-8">
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#00a651]">
          FAQ
        </span>
        <h2 className="mt-1 text-2xl font-extrabold leading-tight text-slate-800 md:text-4xl">
          Frequently Asked <span className="text-[#00a651]">Questions</span>
        </h2>
        <p className="mt-2 text-slate-700 text-base md:text-lg leading-relaxed">
          Quick answers to what customers ask us most
        </p>
      </div>

      {/* Questions: ek column, majhkhane */}
      <div className="mx-auto max-w-3xl space-y-3">
        {FAQS.map((f, i) => (
          <details
            key={f.q}
            open={i === 0}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors open:border-[#00a651]/40"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 sm:px-6 sm:py-5 [&::-webkit-details-marker]:hidden">
              <span className="text-base font-bold leading-snug text-slate-900 sm:text-lg">
                {f.q}
              </span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition-all group-open:rotate-45 group-open:bg-[#00a651] group-open:text-white">
                <Plus className="h-4 w-4" />
              </span>
            </summary>
            <div className="px-4 pb-5 text-sm md:text-base text-slate-700 leading-relaxed">
              {f.a}
            </div>
          </details>
        ))}

        <p className="pt-3 text-center text-sm text-slate-500">
          More details in our{" "}
          <Link
            href="/policy"
            className="font-bold text-[#00a651] hover:underline"
          >
            policies
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
