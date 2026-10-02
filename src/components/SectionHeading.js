// Sob section-e ei ekoi heading use koro, tahole highlight color sobkhane same thakbe
export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  center = false,
}) {
  return (
    <div className={center ? "text-center" : ""}>
      {eyebrow && (
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#00a651]">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-1 text-2xl md:text-4xl font-extrabold text-slate-900 leading-tight">
        {title} <span className="text-[#00a651]">{highlight}</span>
      </h2>
      {subtitle && (
        <p
          className={`mt-2 text-slate-700 text-base md:text-lg leading-relaxed ${
            center ? "mx-auto max-w-2xl" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
