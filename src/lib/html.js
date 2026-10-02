const NAMED = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  hellip: "…",
  ndash: "–",
  mdash: "—",
  lsquo: "‘",
  rsquo: "’",
  ldquo: "“",
  rdquo: "”",
  times: "×",
  deg: "°",
  plusmn: "±",
  trade: "™",
  reg: "®",
  copy: "©",
  frac12: "½",
};

const cp = (n) => {
  try {
    return String.fromCodePoint(n);
  } catch {
    return "";
  }
};

export function decodeHtml(str = "") {
  return String(str)
    .replace(/&#(\d+);/g, (_, n) => cp(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => cp(parseInt(h, 16)))
    .replace(/&([a-z0-9]+);/gi, (m, e) => NAMED[e.toLowerCase()] ?? m);
}

// HTML theke plain text
const text = (s = "") =>
  decodeHtml(
    String(s)
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<\/(p|div|li|tr|h[1-6])>/gi, " ")
      .replace(/<[^>]+>/g, "")
  )
    .replace(/\s+/g, " ")
    .trim();

/**
 * WooCommerce description theke dynamic spec groups banay.
 * Support kore: heading/paragraph + <ul><li><strong>Label:</strong> value</li></ul>,
 * <table> (label | value), ar "Label: value" lekha paragraph.
 * Return: { overview: string[], groups: [{ title, items: [{ label, value }] }] }
 */
export function parseDescription(html = "") {
  const overview = [];
  const groups = [];
  let title = "Details";
  let current = null;

  const setTitle = (t) => {
    const clean = t.replace(/[:：]\s*$/, "").trim();
    if (!clean) return;
    title = clean;
    current = null;
  };

  const addItem = (label, value = "") => {
    label = label.replace(/[:：]\s*$/, "").trim();
    value = value.trim();
    if (!label) return;
    if (!current) {
      current = { title, items: [] };
      groups.push(current);
    }
    if (current.items.some((i) => i.label === label && i.value === value))
      return;
    current.items.push({ label, value });
  };

  const handleSegment = (seg) => {
    const t = text(seg);
    if (!t) return;
    const bold = /^\s*<(strong|b)\b[^>]*>[\s\S]*<\/\1>\s*$/i.test(seg);
    const pair = t.match(/^([^:]{2,40}):\s*(\S[\s\S]*)$/);
    if (pair) addItem(pair[1], pair[2]);
    else if (!/[.!?]$/.test(t) && (t.length <= 60 || (bold && t.length <= 80)))
      setTitle(t);
    else overview.push(t);
  };

  const handleInline = (inner) =>
    String(inner)
      .split(/<br\s*\/?>/i)
      .forEach(handleSegment);

  const handleList = (inner) => {
    for (const li of inner.matchAll(/<li(?=[\s>])[^>]*>([\s\S]*?)<\/li>/gi)) {
      const raw = li[1];
      const b = raw.match(
        /^\s*<(?:strong|b)\b[^>]*>([\s\S]*?)<\/(?:strong|b)>([\s\S]*)$/i
      );
      if (b) {
        addItem(text(b[1]), text(b[2]).replace(/^[:\-–—]\s*/, ""));
        continue;
      }
      const t = text(raw);
      const i = t.indexOf(":");
      if (i > 0 && i <= 40 && t.slice(i + 1).trim())
        addItem(t.slice(0, i), t.slice(i + 1));
      else addItem(t);
    }
  };

  const handleTable = (inner) => {
    for (const tr of inner.matchAll(/<tr(?=[\s>])[^>]*>([\s\S]*?)<\/tr>/gi)) {
      const cells = [
        ...tr[1].matchAll(/<(td|th)(?=[\s>])[^>]*>([\s\S]*?)<\/\1>/gi),
      ].map((c) => ({ tag: c[1].toLowerCase(), t: text(c[2]) }));
      if (!cells.length || cells.every((c) => c.tag === "th")) continue; // header row
      const label = cells[0].t;
      const value = cells
        .slice(1)
        .map((c) => c.t)
        .filter(Boolean)
        .join(" ");
      addItem(label, value);
    }
  };

  const gap = (s) =>
    s
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<[^>]+>/g, "")
      .split(/\n+/)
      .forEach(handleSegment);

  const src = String(html || "");
  const re =
    /<(h[1-6]|p)(?=[\s>])[^>]*>([\s\S]*?)<\/\1>|<(ul|ol)(?=[\s>])[^>]*>([\s\S]*?)<\/\3>|<table(?=[\s>])[^>]*>([\s\S]*?)<\/table>/gi;

  let last = 0;
  let m;
  while ((m = re.exec(src))) {
    gap(src.slice(last, m.index));
    last = re.lastIndex;

    if (m[1]) {
      if (/^h/i.test(m[1])) {
        const t = text(m[2]);
        if (t.length <= 80) setTitle(t);
        else if (t) overview.push(t);
      } else {
        handleInline(m[2]);
      }
    } else if (m[3]) handleList(m[4]);
    else handleTable(m[5]);
  }
  gap(src.slice(last));

  return { overview, groups: groups.filter((g) => g.items.length) };
}

// Purono code-er jonno
export const parseSpecs = (html = "") => parseDescription(html).groups;
