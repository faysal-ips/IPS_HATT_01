"use client";

import {
  Zap,
  ShieldCheck,
  Truck,
  Award,
  Headphones,
  CheckCircle2,
} from "lucide-react";

export default function HeroMarqee() {
  const marqueeItems = [
    {
      icon: Award,
      text: "Welcome to IPS HATT - Bangladesh's Most Trusted Solar & IPS Provider",
    },
    {
      icon: ShieldCheck,
      text: "100% Authentic Products & Manufacturer Warranty Guarantee",
    },
    {
      icon: Truck,
      text: "Free Home Delivery Across 64 Districts in Bangladesh",
    },
    {
      icon: Zap,
      text: "High-Efficiency Solar Panels & Long-Lasting Lithium Batteries",
    },
    {
      icon: Headphones,
      text: "24/7 Dedicated Customer Care & Technical Support",
    },
    {
      icon: CheckCircle2,
      text: "Authenticity Checker Available for All Imported Products",
    },
  ];

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 py-3">
      {/* Main Container Container with Image Card Style */}
      <div className="relative flex overflow-x-hidden bg-white rounded-xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)] py-3 px-2 group">
        {/* Left Edge Fade Effect */}
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none rounded-l-xl" />

        {/* Marquee Track 1 */}
        <div className="flex shrink-0 items-center space-x-12 animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]">
          {marqueeItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-2.5 text-slate-800 text-xs md:text-sm font-semibold tracking-wide"
              >
                <Icon className="w-4 h-4 md:w-4.5 md:h-4.5 text-[#00a651] shrink-0 stroke-[2.2]" />
                <span>{item.text}</span>
              </div>
            );
          })}
        </div>

        {/* Marquee Track 2 (Duplicate for Seamless Loop) */}
        <div className="flex shrink-0 items-center space-x-12 animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused] aria-hidden:true pl-12">
          {marqueeItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={`dup-${index}`}
                className="flex items-center gap-2.5 text-slate-800 text-xs md:text-sm font-semibold tracking-wide"
              >
                <Icon className="w-4 h-4 md:w-4.5 md:h-4.5 text-[#00a651] shrink-0 stroke-[2.2]" />
                <span>{item.text}</span>
              </div>
            );
          })}
        </div>

        {/* Right Edge Fade Effect */}
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none rounded-r-xl" />
      </div>
    </div>
  );
}
