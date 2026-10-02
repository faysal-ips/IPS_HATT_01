import { Star, Quote, BadgeCheck, MapPin } from "lucide-react";

// NOTE: ekhane placeholder review ache, real customer review diye replace koro
const REVIEWS = [
  {
    name: "Rafiqul Islam",
    location: "Sirajganj",
    product: "5kW Solar System",
    text: "Load calculate kore exact size suggest korse. Installation ek diner moddhe sesh, ekhon bijli bill prai nai.",
    rating: 5,
  },
  {
    name: "Nasrin Akter",
    location: "Bogura",
    product: "Hybrid Inverter",
    text: "Original product, warranty card shoho peyechi. Support team onek helpful, call dile sathe sathe response dey.",
    rating: 5,
  },
  {
    name: "Mahmudul Hasan",
    location: "Dhaka",
    product: "Solar Panel 550W",
    text: "Dam onno jaygar cheye fair chilo. Delivery 2 diner moddhe peyechi, packaging o khub bhalo chilo.",
    rating: 5,
  },
  {
    name: "Shahidul Alam",
    location: "Rajshahi",
    product: "Lithium Battery",
    text: "Load shedding-e ekhon ar chinta nai. Technician ra onek professional, kaj porishkar kore gese.",
    rating: 4,
  },
  {
    name: "Farhana Yeasmin",
    location: "Pabna",
    product: "Solar Street Light",
    text: "Dokan-er jonno nilam, rate-e raat ekdom jhokjhoke. Brand warranty niye kono jhamela hoy nai.",
    rating: 5,
  },
  {
    name: "Abdul Karim",
    location: "Rangpur",
    product: "3kW Off-grid System",
    text: "Gram-e thaki, bhablam setup hobe kina. Tara nijei eshe set kore dilo, ekhon sob thik moto cholche.",
    rating: 5,
  },
];

function ReviewCard({ name, location, product, text, rating }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  return (
    <article className="group relative w-[300px] sm:w-[360px] shrink-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-[0_1px_2px_rgba(15,23,42,0.05),0_12px_30px_-18px_rgba(15,23,42,0.25)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#00a651]/40 hover:shadow-[0_24px_44px_-22px_rgba(0,166,81,0.4)]">
      {/* hover glow */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -right-16 h-44 w-44 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle, rgba(0,166,81,0.2) 0%, rgba(0,166,81,0.06) 45%, transparent 70%)",
        }}
      />
      <Quote
        aria-hidden="true"
        className="absolute right-4 top-4 h-10 w-10 text-[#00a651] opacity-[0.08] transition-opacity duration-500 group-hover:opacity-20"
      />

      {/* stars */}
      <div
        className="relative flex items-center gap-0.5"
        aria-label={`${rating} out of 5`}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating
                ? "fill-amber-400 text-amber-400"
                : "fill-slate-200 text-slate-200"
            }`}
          />
        ))}
      </div>

      <p className="relative mt-3 text-sm md:text-base text-slate-700 leading-relaxed">
        {text}
      </p>

      <span className="relative mt-4 inline-block rounded-full border border-emerald-200 bg-emerald-50/80 px-2.5 py-1 text-[11px] font-bold text-[#00a651]">
        {product}
      </span>

      <div className="relative mt-4 flex items-center gap-3 border-t border-slate-100 pt-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#00b85c] to-[#008f45] text-sm font-bold text-white shadow-[0_8px_16px_-8px_rgba(0,166,81,0.7)]">
          {initials}
        </span>
        <div className="min-w-0">
          <h3 className="flex items-center gap-1 truncate text-sm font-bold text-slate-900">
            {name}
            <BadgeCheck className="h-4 w-4 shrink-0 text-[#00a651]" />
          </h3>
          <p className="flex items-center gap-1 text-xs font-medium text-slate-500">
            <MapPin className="h-3 w-3" />
            {location}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function CustomerReviews() {
  // mask: dui pashe smoothly transparent hoye jabe
  const mask =
    "linear-gradient(90deg, transparent 0%, #000 12%, #000 88%, transparent 100%)";

  return (
    <section className="relative isolate overflow-hidden rounded-2xl md:rounded-3xl     py-8 sm:py-10 lg:py-12  ">
      {/* marquee keyframes (self-contained, tailwind config lagbe na) */}
      <style>{`
        @keyframes reviews-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .reviews-track { animation: reviews-marquee 40s linear infinite; }
        .reviews-viewport:hover .reviews-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .reviews-track { animation: none; }
        }
      `}</style>

      {/* Heading */}
      <div className="mb-8 px-4 text-center sm:px-8 md:mb-10">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50/80 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#00a651]">
          <Star className="h-3.5 w-3.5 fill-[#00a651]" />
          Customer Reviews
        </span>
        <h2 className="mt-3 text-2xl font-extrabold leading-tight text-slate-900 sm:text-3xl md:text-4xl">
          Loved by{" "}
          <span className="bg-gradient-to-r from-[#00a651] to-emerald-500 bg-clip-text text-transparent">
            Our Customers
          </span>
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-slate-700 text-base md:text-lg leading-relaxed">
          Real feedback from homes and shops powered by IPS HATT
        </p>
      </div>

      {/* Marquee */}
      <div
        className="reviews-viewport overflow-hidden py-3"
        style={{ maskImage: mask, WebkitMaskImage: mask }}
      >
        <div className="reviews-track flex w-max">
          {/* group 1 */}
          <div className="flex shrink-0 gap-4 pr-4">
            {REVIEWS.map((r) => (
              <ReviewCard key={r.name} {...r} />
            ))}
          </div>
          {/* group 2 (duplicate, seamless loop-er jonno) */}
          <div className="flex shrink-0 gap-4 pr-4" aria-hidden="true">
            {REVIEWS.map((r) => (
              <ReviewCard key={`${r.name}-copy`} {...r} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
