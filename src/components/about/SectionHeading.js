// Home page-er heading pattern: eyebrow + title + green highlight
export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  text,
  className = "mb-6 md:mb-8",
}) {
  return (
    <div className={`pb-4 border-b border-slate-200 ${className}`}>
      <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#00a651]">
        {eyebrow}
      </span>
      <h2 className="mt-1 text-2xl md:text-4xl font-extrabold text-slate-800 leading-tight">
        {title}
        {highlight && <span className="text-[#00a651]"> {highlight}</span>}
      </h2>
      {text && (
        <p className="mt-2 text-slate-700 text-base md:text-lg leading-relaxed">
          {text}
        </p>
      )}
    </div>
  );
}
