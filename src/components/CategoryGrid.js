"use client";

import Link from "next/link";
import { Sun, Battery, Zap, Sliders, Power, Wrench } from "lucide-react";

export default function CategoryGrid() {
  const categories = [
    { title: "Solar Panels", icon: Sun, count: "12 Items" },
    { title: "Lithium Battery", icon: Battery, count: "10 Items" },
    { title: "Solar Inverter", icon: Zap, count: "15 Items" },
    { title: "Charge Controller", icon: Sliders, count: "6 Items" },
    { title: "IPS & UPS", icon: Power, count: "8 Items" },
    { title: "Accessories", icon: Wrench, count: "9 Items" },
  ];

  return (
    <section className="py-8  ">
      {/* Centered Heading with 48px Font Size */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-[48px] font-extrabold text-slate-800 leading-tight">
          Explore <span className="text-[#00a651]">Categories</span>
        </h2>
        <p className="text-sm md:text-base text-slate-500 mt-2 font-medium">
          Find the right energy products for your needs
        </p>
      </div>

      {/* 1 Row Grid with 6 Categories */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
        {categories.map((cat, index) => {
          const Icon = cat.icon;
          return (
            <Link
              key={index}
              href="#"
              className="group flex flex-col items-center justify-center p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#00a651] transition-all duration-300 text-center"
            >
              {/* Icon Box with Uniform Black Icon Color */}
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-slate-100 flex items-center justify-center mb-4 group-hover:bg-[#00a651]/10 group-hover:scale-110 transition-all duration-300">
                <Icon className="w-8 h-8 md:w-10 md:h-10 text-slate-900 group-hover:text-[#00a651] transition-colors" />
              </div>

              {/* Title */}
              <h3 className="text-base md:text-lg font-bold text-slate-800 group-hover:text-[#00a651] transition-colors line-clamp-1">
                {cat.title}
              </h3>

              {/* Item Count */}
              <span className="text-xs md:text-sm text-slate-400 mt-1 font-semibold">
                {cat.count}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
