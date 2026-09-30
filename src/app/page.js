import HeroSlider from "@/components/HeroSlider";
import CategoryGrid from "@/components/CategoryGrid";
import ProductGrid from "@/components/ProductGrid";
import PromoBanner from "@/components/PromoBanner";
import BrandMarquee from "@/components/BrandMarquee";
import WhyChoose from "@/components/WhyChoose";
import ProjectShowcase from "@/components/ProjectShowcase";
import TrustBadges from "@/components/TrustBadges";
import { api } from "@/lib/woocommerce";

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

async function getProducts() {
  try {
    const response = await api.get("products", {
      per_page: 10,
      status: "publish",
    });
    return response.data || [];
  } catch (error) {
    console.error("Error fetching products for Home Page:", error);
    return [];
  }
}

const WRAP = "container mx-auto px-4 max-w-[1600px]";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-slate-50/50 space-y-10 pb-12">
      {/* 1. Hero Banner Slider */}
      <section className="pt-4">
        <HeroSlider />
      </section>

      {/* 2. Explore Categories */}
      <section className={WRAP}>
        <CategoryGrid />
      </section>

      {/* 3. Featured Products Grid */}
      <section className={WRAP}>
        <ProductGrid products={products} />
      </section>

      {/* 4. Promotional Banner (24-Hour Delivery) */}
      <section className={WRAP}>
        <PromoBanner />
      </section>

      {/* 5. Official Brand Partners Marquee */}
      <section className={WRAP}>
        <BrandMarquee />
      </section>

      {/* 6. Why Choose IPS HATT */}
      <section className={WRAP}>
        <WhyChoose />
      </section>

      {/* 7. Engineered for Real Projects */}
      <section className={WRAP}>
        <ProjectShowcase />
      </section>

      {/* 8. Bottom Trust & Security Badges */}
      <section className={`${WRAP} pt-4`}>
        <TrustBadges />
      </section>
    </div>
  );
}
