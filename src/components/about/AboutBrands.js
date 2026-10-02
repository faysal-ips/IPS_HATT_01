import SectionHeading from "./SectionHeading";

const BRANDS = [
  "Growatt",
  "Solis",
  "Jinko",
  "Luminous",
  "Microtek",
  "Smarten",
  "Genixgreen",
  "LVTOPSUN",
  "Long Ran Gold",
];

export default function AboutBrands() {
  return (
    <section>
      <SectionHeading
        eyebrow="Brands"
        title="Brands"
        highlight="We Carry"
        text="Trusted names across solar, storage and backup power."
      />

      <div className="flex flex-wrap gap-2.5 md:gap-3">
        {BRANDS.map((b) => (
          <span
            key={b}
            className="rounded-full bg-white border border-slate-200 px-4 py-2 md:px-6 md:py-3 text-sm md:text-base font-extrabold text-slate-800 shadow-sm hover:border-slate-400 transition-colors"
          >
            {b}
          </span>
        ))}
      </div>
    </section>
  );
}
