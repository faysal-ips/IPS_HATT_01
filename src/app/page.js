import { api } from "./lib/woocommerce";
import HeroSlider from "@/components/HeroSlider";
import ProductGrid from "@/components/ProductGrid";
import CategoryGrid from "@/components/CategoryGrid";
import PromoBanner from "@/components/PromoBanner";
import WhyChooseUs from "@/components/WhyChoose";
import BrandMarquee from "@/components/BrandMarquee";
import TrustBadges from "@/components/TrustBadges";
import ProjectShowcase from "@/components/ProjectShowcase";
import HeroMarqee from "@/components/HeroMarqee";

export default async function HomePage() {
  let products = [];
  try {
    const res = await api.get("products", { per_page: 20 });
    products = res.data;
  } catch (error) {
    console.error("Error fetching WooCommerce products:", error);
  }

  return (
    <main className="min-h-screen bg-slate-50 py-4 px-3 md:px-6">
      {/* 1600px Max-Width Wrapper */}
      <div className="max-w-[1600px] mx-auto space-y-8">
        {/* 1. Hero Banner Slider */}
        <HeroSlider />
        <HeroMarqee />
        <CategoryGrid />

        <ProductGrid products={products} />
        <PromoBanner />
        <BrandMarquee />
        <WhyChooseUs />
        <ProjectShowcase />
        <TrustBadges />
      </div>
    </main>
  );
}
