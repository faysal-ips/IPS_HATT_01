"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sun,
  BatteryCharging,
  Zap,
  SlidersHorizontal,
  Cpu,
  Plug,
  Menu,
} from "lucide-react";

const categories = [
  { name: "Solar Panels", icon: Sun, href: "/shop?category=solar-panel" },
  {
    name: "Lithium Battery",
    icon: BatteryCharging,
    href: "/shop?category=lithium-battery",
  },
  { name: "Solar Inverter", icon: Zap, href: "/shop?category=solar-inverter" },
  {
    name: "Charge Controller",
    icon: SlidersHorizontal,
    href: "/shop?category=charge-controller",
  },
  { name: "IPS & UPS", icon: Cpu, href: "/shop?category=ips-and-ups" },
  { name: "Accessories", icon: Plug, href: "/shop?category=accessories" },
];

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={`fixed left-0 top-0 h-full bg-white border-r border-slate-200 z-50 transition-all duration-300 shadow-lg flex flex-col justify-between ${
        isExpanded ? "w-56" : "w-16"
      }`}
    >
      <div>
        {/* Toggle / Brand Header */}
        <div className="h-14 w-14 rounded-full bg-[#00a651] flex items-center justify-center text-white cursor-pointer shadow-sm">
          <Menu className="w-6 h-6" />
        </div>

        {/* Category List */}
        <ul className="mt-4 space-y-1.5 px-2">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <li key={index}>
                <Link
                  href={cat.href}
                  className="flex items-center gap-4 p-3 text-slate-700 hover:bg-emerald-50 hover:text-[#00a651] rounded-xl transition-all duration-200 whitespace-nowrap overflow-hidden group"
                >
                  <Icon className="w-5 h-5 flex-shrink-0 text-slate-700 group-hover:text-[#00a651] transition-colors stroke-[2]" />
                  <span
                    className={`font-bold text-xs md:text-sm tracking-wide transition-opacity duration-200 ${
                      isExpanded ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {cat.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
