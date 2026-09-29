"use client";

import { ShieldCheck, Headset, Lock, Truck } from "lucide-react";

export default function TrustBadges() {
  const badges = [
    {
      title: "GENUINE PRODUCTS",
      subtitle: "100% authentic energy gear",
      icon: ShieldCheck,
    },
    {
      title: "EXPERT ASSISTANCE",
      subtitle: "Dedicated 24/7 technical help",
      icon: Headset,
    },
    {
      title: "SAFE CHECKOUT",
      subtitle: "Encrypted & secure payments",
      icon: Lock,
    },
    {
      title: "SWIFT DELIVERY",
      subtitle: "Fast nationwide logistics",
      icon: Truck,
    },
  ];

  return (
    <section className="py-4">
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
          {badges.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-center gap-4 group">
                {/* Green Icon Circle matching the design */}
                <div className="w-12 h-12 rounded-full border-2 border-[#00a651] text-[#00a651] flex items-center justify-center shrink-0 group-hover:bg-[#00a651] group-hover:text-white transition-all duration-300">
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-extrabold text-slate-800 text-sm md:text-base tracking-wide uppercase">
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
      </div>
    </section>
  );
}
