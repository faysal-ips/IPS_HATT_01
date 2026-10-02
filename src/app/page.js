import HeroSlider from "@/components/HeroSlider";
import CategoryGrid from "@/components/CategoryGrid";
import ProductGrid from "@/components/ProductGrid";
import PromoBanner from "@/components/PromoBanner";
import WhyChoose from "@/components/WhyChoose";
import BackupCalculator from "@/components/BackupCalculator";
import HomeFAQ from "@/components/HomeFAQ";
import AboutCTA from "@/components/about/AboutCTA";
import TrustBadges from "@/components/TrustBadges";
import { api } from "@/lib/woocommerce";
import { Section } from "lucide-react";
import CustomerReviews from "@/components/CustomerReviews";

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
    <div className="min-h-screen bg-slate-50/50 space-y-10 md:space-y-14 pb-12">
      {/* 1. Hero Banner Slider */}
      <section className="pt-4">
        <HeroSlider />
      </section>

      {/* 2. Explore Categories */}
      <section className={WRAP}>
        <CategoryGrid />
      </section>

      {/* 3. Featured Products */}
      <section className={WRAP}>
        <ProductGrid products={products} />
      </section>

      {/* 4. Promotional Banner (24-Hour Delivery) */}
      <section className={WRAP}>
        <PromoBanner />
      </section>

      {/* 5. Why Choose IPS HATT */}
      <section className={WRAP}>
        <WhyChoose />
      </section>
      <section className={`${WRAP} pt-2`}>
        <CustomerReviews />
      </section>
      {/* 6. Backup Power Calculator */}
      <section className={WRAP}>
        <BackupCalculator />
      </section>

      {/* 8. Free Consultation CTA */}
      <section className={WRAP}>
        <AboutCTA />
      </section>

      {/* 9. Bottom Trust Badges */}
      <section className={`${WRAP} pt-2`}>
        <TrustBadges />
      </section>

      {/* 7. FAQ */}
      <section className={WRAP}>
        <HomeFAQ />
      </section>
    </div>
  );
}
