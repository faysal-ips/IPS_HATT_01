import { Cpu, ShieldCheck, Sparkles, ListChecks } from "lucide-react";
import { parseSpecs } from "@/lib/html";

function pickIcon(title) {
  const t = title.toLowerCase();
  if (/feature/.test(t)) return Sparkles;
  if (/tech|spec/.test(t)) return Cpu;
  if (/warrant|deliver/.test(t)) return ShieldCheck;
  return ListChecks;
}

export default function ProductSpecifications({ htmlContent }) {
  const groups = parseSpecs(htmlContent);

  return (
    <section className="mt-8 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-200">
        <span className="w-2 h-8 bg-[#00a651] rounded-full inline-block" />
        <h2 className="text-2xl font-extrabold text-slate-900">
          Product Specifications & Details
        </h2>
      </div>

      {groups.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {groups.map((group, idx) => {
            const Icon = pickIcon(group.title);
            const wide = group.items.some((i) => i.value.length > 70);
            return (
              <div
                key={idx}
                className={`rounded-2xl border border-slate-200 overflow-hidden bg-slate-50/70 ${
                  wide ? "lg:col-span-2" : ""
                }`}
              >
                <div className="bg-slate-100 px-5 py-3.5 border-b border-slate-200 flex items-center gap-2.5">
                  <Icon className="w-5 h-5 text-[#00a651]" />
                  <h3 className="text-lg font-bold text-slate-800">
                    {group.title}
                  </h3>
                </div>
                <table className="w-full text-left text-base border-collapse">
                  <tbody>
                    {group.items.map((item, i) => (
                      <tr
                        key={i}
                        className="border-b border-slate-200/80 last:border-0 hover:bg-white transition-colors"
                      >
                        {item.value ? (
                          <>
                            <td className="py-3.5 px-5 font-semibold text-slate-700 w-2/5 bg-slate-100/50 align-top">
                              {item.label}
                            </td>
                            <td className="py-3.5 px-5 text-slate-900 align-top">
                              {item.value}
                            </td>
                          </>
                        ) : (
                          <td
                            colSpan={2}
                            className="py-3.5 px-5 text-slate-900"
                          >
                            {item.label}
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
      ) : (
        <div
          className="text-slate-800 text-base leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-2 [&_p]:mb-3"
          dangerouslySetInnerHTML={{
            __html:
              htmlContent || "<p>No detailed specification available.</p>",
          }}
        />
      )}
    </section>
  );
}
