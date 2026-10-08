import { api } from "@/lib/woocommerce";
import { decodeHtml } from "@/lib/html";

export const PER_PAGE = 20;

export const SORTS = {
  latest: { label: "Newest", orderby: "date", order: "desc" },
  popular: { label: "Popularity", orderby: "popularity", order: "desc" },
  "price-asc": { label: "Price: Low to High", orderby: "price", order: "asc" },
  "price-desc": {
    label: "Price: High to Low",
    orderby: "price",
    order: "desc",
  },
  name: { label: "Name: A-Z", orderby: "title", order: "asc" },
};

export const slugify = (s = "") =>
  decodeHtml(s)
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// API theke array na ashle faka list dey, build crash kore na
const list = (d) => (Array.isArray(d) ? d : []);

export async function getCategories() {
  try {
    const { data } = await api.get("products/categories", {
      per_page: 100,
      hide_empty: true,
      orderby: "name",
      order: "asc",
    });
    // API block korle (HTML ashle) log-e dekha jabe
    if (!Array.isArray(data)) {
      console.error("Categories not array:", String(data).slice(0, 200));
    }
    return list(data)
      .filter((c) => c.slug !== "uncategorized")
      .map((c) => ({
        id: c.id,
        name: decodeHtml(c.name),
        slug: c.slug,
        parent: c.parent,
        count: c.count,
      }));
  } catch (err) {
    console.error("Categories error:", err?.response?.data || err);
    return [];
  }
}

// URL-er slug WooCommerce slug-er sathe milbe, na hole naam-er slug diye
export function resolveCategory(categories, param) {
  const p = String(param || "").toLowerCase();
  return (
    categories.find((c) => c.slug === p) ||
    categories.find((c) => slugify(c.name) === p) ||
    null
  );
}

export async function getShopProducts({
  search,
  categoryId,
  sort,
  page,
  min,
  max,
  inStock,
}) {
  const s = SORTS[sort] || SORTS.latest;
  const params = {
    status: "publish",
    per_page: PER_PAGE,
    page,
    orderby: s.orderby,
    order: s.order,
  };
  if (search) params.search = search;
  if (categoryId) params.category = String(categoryId);
  if (min) params.min_price = String(min);
  if (max) params.max_price = String(max);
  if (inStock) params.stock_status = "instock";

  try {
    const res = await api.get("products", params);
    // API block korle (HTML ashle) log-e dekha jabe
    if (!Array.isArray(res.data)) {
      console.error("Products not array:", String(res.data).slice(0, 200));
    }
    const products = list(res.data);
    const h = res.headers || {};
    return {
      products,
      total: parseInt(h["x-wp-total"], 10) || products.length,
      totalPages: parseInt(h["x-wp-totalpages"], 10) || 1,
    };
  } catch (err) {
    // page number onek boro hole WooCommerce 400 dey
    if (err?.response?.status === 400 && page > 1) {
      return { products: [], total: 0, totalPages: 1, invalidPage: true };
    }
    console.error("Shop products error:", err?.response?.data || err);
    return { products: [], total: 0, totalPages: 1, failed: true };
  }
}
