import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

export const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
  consumerKey: process.env.WORDPRESS_CONSUMER_KEY,
  consumerSecret: process.env.WORDPRESS_CONSUMER_SECRET,
  version: "wc/v3",
});

// Slug দিয়ে Single Product নিয়ে আসার ফাংশন
export async function getProductBySlug(slug) {
  try {
    const response = await api.get("products", {
      slug: slug,
    });

    if (response.data && response.data.length > 0) {
      return response.data[0];
    }
    return null;
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
}
