// DEMO MODE: data local JSON file theke ashe, WordPress lagbe na.
// Real backend e jete hole woocommerce.real.js ke eta-r jaygay copy korun.
import productsData from "@/data/products.json";
import categoriesData from "@/data/categories.json";

const num = (v) => parseFloat(v) || 0;

function listProducts(params = {}) {
  let items = [...productsData];

  if (params.slug) items = items.filter((p) => p.slug === params.slug);
  if (params.search) {
    const q = String(params.search).toLowerCase();
    items = items.filter((p) => p.name.toLowerCase().includes(q));
  }
  if (params.category) {
    const id = Number(params.category);
    items = items.filter((p) => (p.categories || []).some((c) => c.id === id));
  }
  if (params.min_price)
    items = items.filter((p) => num(p.price) >= num(params.min_price));
  if (params.max_price)
    items = items.filter((p) => num(p.price) <= num(params.max_price));
  if (params.stock_status)
    items = items.filter((p) => p.stock_status === params.stock_status);
  if (params.featured !== undefined) {
    const want = params.featured === true || params.featured === "true";
    items = items.filter((p) => !!p.featured === want);
  }
  if (params.include) {
    const ids = String(params.include).split(",").map(Number);
    items = items.filter((p) => ids.includes(p.id));
  }
  if (params.exclude) {
    const ids = String(params.exclude).split(",").map(Number);
    items = items.filter((p) => !ids.includes(p.id));
  }

  // Sort
  const dir = params.order === "asc" ? 1 : -1;
  const keys = {
    price: (p) => num(p.price),
    title: (p) => p.name.toLowerCase(),
    popularity: (p) => p.total_sales || 0,
    date: (p) => p.date_created || "",
  };
  const key = keys[params.orderby] || keys.date;
  items.sort((a, b) => (key(a) > key(b) ? 1 : key(a) < key(b) ? -1 : 0) * dir);

  // Pagination
  const perPage = Number(params.per_page) || 10;
  const page = Number(params.page) || 1;
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  if (page > 1 && page > totalPages) {
    const err = new Error("invalid page");
    err.response = { status: 400 };
    throw err;
  }
  return {
    data: items.slice((page - 1) * perPage, page * perPage),
    headers: {
      "x-wp-total": String(total),
      "x-wp-totalpages": String(totalPages),
    },
  };
}

export const api = {
  async get(endpoint, params = {}) {
    if (endpoint === "products") return listProducts(params);
    if (endpoint === "products/categories")
      return { data: categoriesData, headers: {} };
    const m = endpoint.match(/^products\/(\d+)$/);
    if (m) {
      const p = productsData.find((x) => x.id === Number(m[1]));
      if (p) return { data: p, headers: {} };
    }
    throw new Error(`Demo mode: "${endpoint}" not available yet`);
  },
  async post(endpoint) {
    throw new Error(`Demo mode: cannot POST to ${endpoint}`);
  },
  async put(endpoint) {
    throw new Error(`Demo mode: cannot PUT to ${endpoint}`);
  },
  async delete(endpoint) {
    throw new Error(`Demo mode: cannot DELETE ${endpoint}`);
  },
};

// Slug দিয়ে Single Product নিয়ে আসার ফাংশন
export async function getProductBySlug(slug) {
  try {
    const response = await api.get("products", { slug });
    if (Array.isArray(response.data) && response.data.length > 0) {
      return response.data[0];
    }
    return null;
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
}
