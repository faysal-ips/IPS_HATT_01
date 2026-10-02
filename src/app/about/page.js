import AboutHero from "@/components/about/AboutHero";
import AboutStory from "@/components/about/AboutStory";
import AboutBrands from "@/components/about/AboutBrands";
import AboutCTA from "@/components/about/AboutCTA";

export const metadata = {
  title: "About Us | IPS HATT",
  description:
    "IPS HATT - genuine solar panels, inverters, lithium batteries and IPS/UPS systems, delivered across Bangladesh.",
};

export default function AboutPage() {
  return (
    <div className="max-w-[1600px] mx-auto px-4 py-4 md:py-6 pb-12 md:pb-16 space-y-10 md:space-y-16">
      <AboutHero />
      <AboutStory />
      <AboutBrands />
      <AboutCTA />
    </div>
  );
}
