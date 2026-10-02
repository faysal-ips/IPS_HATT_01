import { Leaf, ShieldCheck, Wrench } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { SITE } from "@/lib/site";

const VALUES = [
  {
    icon: Leaf,
    title: "Clean energy for everyone",
    text: "Making solar and storage accessible for homes and businesses across the country.",
  },
  {
    icon: ShieldCheck,
    title: "Trust before sales",
    text: "We would rather recommend the right product than the priciest one.",
  },
  {
    icon: Wrench,
    title: "Support that stays",
    text: "Our relationship does not end at delivery. We are here for warranty and technical help.",
  },
];

export default function AboutStory() {
  return (
    <section className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start">
      <div>
        <SectionHeading
          eyebrow="Our Story"
          title="Energy you can depend on,"
          highlight="advice you can trust"
          className="mb-5 md:mb-6"
        />
        <div className="space-y-4 text-slate-700 text-base md:text-lg leading-relaxed">
          <p>
            Power cuts, rising electricity bills and confusing technical choices
            make buying solar and backup equipment harder than it should be.{" "}
            {SITE.name} exists to make it simple: genuine products, clear
            information and people who will actually pick up the phone.
          </p>
          <p>
            From a single home IPS to a complete solar and battery setup, we
            help you choose the right capacity for your load and budget, deliver
            it quickly, and stand behind it after the sale.
          </p>
        </div>
      </div>

      <div className="grid gap-3 md:gap-4">
        {VALUES.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="flex gap-4 rounded-2xl bg-white border border-slate-200 p-4 md:p-6 shadow-sm hover:border-slate-300 hover:shadow-md transition-all"
          >
            <span className="w-11 h-11 md:w-12 md:h-12 shrink-0 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center">
              <Icon className="w-5 h-5 md:w-6 md:h-6" />
            </span>
            <div className="min-w-0">
              <h3 className="text-base md:text-lg font-extrabold text-slate-900 leading-snug">
                {title}
              </h3>
              <p className="mt-1 text-sm md:text-base text-slate-600 leading-relaxed">
                {text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
