import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const client = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
  consumerKey: process.env.WORDPRESS_CONSUMER_KEY,
  consumerSecret: process.env.WORDPRESS_CONSUMER_SECRET,
  version: "wc/v3",
  axiosConfig: {
    // Browser-er moto User-Agent, jate free hosting bot bhule block na kore
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
    },
  },
});

// Proti request-e ?i=1 jog hobe (InfinityFree-r bot check skip korar jonno)
export const api = {
  get: (endpoint, params = {}) => client.get(endpoint, { ...params, i: 1 }),
  post: (endpoint, data, params = {}) =>
    client.post(endpoint, data, { ...params, i: 1 }),
  put: (endpoint, data, params = {}) =>
    client.put(endpoint, data, { ...params, i: 1 }),
  delete: (endpoint, params = {}) =>
    client.delete(endpoint, { ...params, i: 1 }),
};

// Slug দিয়ে Single Product নিয়ে আসার ফাংশন
export async function getProductBySlug(slug) {
  try {
    const response = await api.get("products", {
      slug: slug,
    });

    if (Array.isArray(response.data) && response.data.length > 0) {
      return response.data[0];
    }
    if (!Array.isArray(response.data)) {
      console.error("Product not array:", String(response.data).slice(0, 200));
    }
    return null;
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
}
