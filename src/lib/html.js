export function decodeHtml(str = "") {
  return String(str)
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) =>
      String.fromCodePoint(parseInt(h, 16))
    )
    .replace(
      /&(amp|lt|gt|quot|apos|nbsp);/g,
      (_, e) =>
        ({ amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " }[e])
    );
}

const strip = (s = "") =>
  decodeHtml(s.replace(/<[^>]+>/g, ""))
    .replace(/\s+/g, " ")
    .trim();

/**
 * WooCommerce description theke groups baniye dey:
 * [{ title: "Technical Specifications", items: [{ label, value }] }]
 * Format: heading/paragraph-er por <ul><li><strong>Label:</strong> value</li></ul>
 */
export function parseSpecs(html = "") {
  const groups = [];
  const re = /<(h[1-6]|p)[^>]*>([\s\S]*?)<\/\1>|<ul[^>]*>([\s\S]*?)<\/ul>/gi;
  let title = "Details";
  let m;

  while ((m = re.exec(html || ""))) {
    if (m[3] !== undefined) {
      const items = [...m[3].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)]
        .map((li) => {
          const raw = li[1];
          const b = raw.match(
            /^\s*<(?:strong|b)[^>]*>([\s\S]*?)<\/(?:strong|b)>([\s\S]*)$/i
          );
          if (b) {
            return {
              label: strip(b[1]).replace(/:$/, ""),
              value: strip(b[2]).replace(/^:\s*/, ""),
            };
          }
          const t = strip(raw);
          const i = t.indexOf(":");
          return i > 0 && i < 40
            ? { label: t.slice(0, i), value: t.slice(i + 1).trim() }
            : { label: t, value: "" };
        })
        .filter((x) => x.label);
      if (items.length) groups.push({ title, items });
    } else {
      const t = strip(m[2]);
      if (t && t.length <= 60) title = t.replace(/:$/, "");
    }
  }
  return groups;
}
