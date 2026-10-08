// Local WooCommerce theke product, category ar image export kore
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
const fs = require("fs");
const path = require("path");

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
  consumerKey: process.env.WORDPRESS_CONSUMER_KEY,
  consumerSecret: process.env.WORDPRESS_CONSUMER_SECRET,
  version: "wc/v3",
});

(async () => {
  const p = await api.get("products", { per_page: 100, status: "publish" });
  const c = await api.get("products/categories", { per_page: 100 });
  const products = p.data;

  // Image gulo public/products e download kore src bodle dey
  fs.mkdirSync("public/products", { recursive: true });
  for (const prod of products) {
    for (let i = 0; i < (prod.images || []).length; i++) {
      const img = prod.images[i];
      try {
        const ext = path.extname(new URL(img.src).pathname) || ".jpg";
        const file = `${prod.id}-${i}${ext}`;
        const res = await fetch(img.src);
        if (!res.ok) throw new Error(String(res.status));
        fs.writeFileSync(
          `public/products/${file}`,
          Buffer.from(await res.arrayBuffer())
        );
        img.src = `/products/${file}`;
      } catch (e) {
        console.log("Image skip:", prod.name, "-", e.message);
      }
    }
  }

  fs.mkdirSync("src/data", { recursive: true });
  fs.writeFileSync("src/data/products.json", JSON.stringify(products, null, 2));
  fs.writeFileSync("src/data/categories.json", JSON.stringify(c.data, null, 2));
  console.log("products:", products.length, "| categories:", c.data.length);
})().catch((e) => console.error(e.response?.data || e));
