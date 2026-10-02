import {
  Cpu,
  ShieldCheck,
  Sparkles,
  ListChecks,
  Package,
  Check,
} from "lucide-react";
import { parseDescription, decodeHtml } from "@/lib/html";

function pickIcon(title = "") {
  const t = title.toLowerCase();
  if (/feature|highlight/.test(t)) return Sparkles;
  if (/tech|spec/.test(t)) return Cpu;
  if (/warrant|deliver|support|service/.test(t)) return ShieldCheck;
  if (/box|package|include/.test(t)) return Package;
  return ListChecks;
}

// WooCommerce "Attributes" tab theke (client WordPress-e Name + Value dile-i hoy)
function attributeGroup(attributes) {
  const items = (attributes || [])
    .filter((a) => a && a.visible !== false && a.options?.length)
    .map((a) => ({
      label: decodeHtml(a.name),
      value: a.options.map(decodeHtml).join(", "),
    }));
  return items.length ? { title: "Specifications", items } : null;
}

export default function ProductSpecifications({
  htmlContent = "",
  attributes = [],
}) {
  const { overview, groups: parsed } = parseDescription(htmlContent);
  const attr = attributeGroup(attributes);
  const groups = attr ? [attr, ...parsed] : parsed;
  const hasStructured = groups.length > 0 || overview.length > 0;

  return (
    <section
      id="specifications"
      className="mt-6 md:mt-8 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-6 md:p-8"
    >
      {/* Heading (home page-er pattern) */}
      <div className="mb-6 border-b border-slate-200 pb-4 md:mb-8">
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#00a651]">
          Details
        </span>
        <h2 className="mt-1 text-2xl font-extrabold leading-tight text-slate-800 md:text-4xl">
          Product <span className="text-[#00a651]">Specifications</span>
        </h2>
      </div>

      {hasStructured ? (
        <div className="space-y-4 md:space-y-6">
          {overview.length > 0 && (
            <div className="space-y-3 text-base leading-relaxed text-slate-700 md:text-lg">
              {overview.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}

          {groups.map((g, gi) => {
            const Icon = pickIcon(g.title);
            return (
              <div
                key={`${g.title}-${gi}`}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >
                <div className="flex items-center gap-2.5 border-b border-slate-200 bg-slate-50 px-4 py-3 sm:px-5">
                  <Icon className="h-5 w-5 shrink-0 text-[#00a651]" />
                  <h3 className="text-base font-bold text-slate-800 sm:text-lg">
                    {g.title}
                  </h3>
                </div>

                <table className="w-full border-collapse text-left">
                  <tbody className="block sm:table-row-group">
                    {g.items.map((it, i) => (
                      <tr
                        key={`${it.label}-${i}`}
                        className="block border-b border-slate-100 last:border-0 even:bg-slate-50/60 sm:table-row"
                      >
                        {it.value ? (
                          <>
                            <th
                              scope="row"
                              className="block px-4 pt-3 pb-0.5 align-top text-[13px] font-bold uppercase tracking-wider text-slate-500 sm:table-cell sm:w-[32%] sm:px-5 sm:py-3.5 sm:text-base sm:font-semibold sm:normal-case sm:tracking-normal sm:text-slate-700"
                            >
                              {it.label}
                            </th>
                            <td className="block px-4 pb-3 text-[15px] leading-relaxed text-slate-900 sm:table-cell sm:px-5 sm:py-3.5 sm:text-base">
                              {it.value}
                            </td>
                          </>
                        ) : (
                          <td
                            colSpan={2}
                            className="block px-4 py-3 text-[15px] leading-relaxed text-slate-900 sm:table-cell sm:px-5 sm:py-3.5 sm:text-base"
                          >
                            <span className="flex gap-2.5">
                              <Check className="mt-1 h-4 w-4 shrink-0 text-[#00a651]" />
                              <span>{it.label}</span>
                            </span>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      ) : htmlContent ? (
        <div
          className="text-base leading-relaxed text-slate-800 [&_li]:mb-2 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-6"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      ) : (
        <p className="text-base text-slate-500">
          Detailed specifications for this product will be added soon.
        </p>
      )}
    </section>
  );
}
