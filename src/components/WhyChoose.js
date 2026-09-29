"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Lightbulb,
  Award,
  Wrench,
  Headset,
  TrendingUp,
} from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      title: "Authentic Gear",
      subtitle: "Original & Guaranteed",
      icon: ShieldCheck,
    },
    {
      title: "Smart Advice",
      subtitle: "Calculated load support",
      icon: Lightbulb,
    },
    {
      title: "Brand Warranty",
      subtitle: "Hassle-free service",
      icon: Award,
    },
    {
      title: "Expert Setup",
      subtitle: "Certified technician",
      icon: Wrench,
    },
    {
      title: "Nationwide Care",
      subtitle: "Always active support",
      icon: Headset,
    },
    {
      title: "Best Value Price",
      subtitle: "Fair market cost",
      icon: TrendingUp,
    },
  ];

  return (
    <section className="py-6">
      {/* Container matching image background and border style */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Heading & Learn More Button */}
          <div className="lg:col-span-3 space-y-3 text-left">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
              Why Choose <br className="hidden sm:block" />
              <span className="text-[#00a651]">IPS HATT?</span>
            </h2>
            <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed">
              More than products – we deliver complete peace of mind
            </p>
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-1 bg-[#00a651] hover:bg-emerald-700 text-white font-bold text-xs md:text-sm px-4 py-2.5 rounded-lg transition-colors shadow-sm"
              >
                Learn More About Us ›
              </Link>
            </div>
          </div>

          {/* Middle Column: 6 Features Grid (3 Cols x 2 Rows) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {features.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center gap-3">
                  <div className="text-[#00a651] shrink-0">
                    <Icon className="w-8 h-8 md:w-9 md:h-9 stroke-[1.5]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm md:text-base leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5 font-medium">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Promotional Call-out Banner Card */}
          <div className="lg:col-span-3 relative rounded-xl overflow-hidden min-h-[200px] md:min-h-[220px] flex flex-col justify-between p-6 bg-slate-900 text-white shadow-sm">
            <Image
              src="/banners/why chosse.png"
              alt="Let's build a green Bangladesh"
              fill
              className="object-cover "
            />

            {/* <div className="relative z-10 space-y-2">
              <h3 className="text-lg md:text-xl font-bold leading-snug">
                Let&apos;s build a green Bangladesh
              </h3>
              <p className="text-xs text-slate-200 line-clamp-2 font-medium">
                Reliable solar solutions for homes, businesses and industries
              </p>
            </div>

            <div className="relative z-10 pt-3">
              <Link
                href="/contact"
                className="inline-block bg-[#00a651] hover:bg-emerald-600 text-white font-bold text-xs px-3.5 py-2 rounded-lg transition-colors shadow-sm"
              >
                Discuss Your Project ›
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
