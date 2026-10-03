import { Sun, Battery, Zap, Sliders, Power, Wrench } from "lucide-react";

export const navLinks = [
  { title: "Home", href: "/" },
  { title: "Shop", href: "/shop" },
  { title: "About Us", href: "/about" },
  { title: "Order Tracking", href: "/order-tracking" },
  { title: "Contact Us", href: "/contact" },
];

// Mobile drawer-er categories: homepage CategoryGrid-er 6 ta category-r sathe same.
// IMPORTANT: slug gulo WooCommerce-er asol category slug hote hobe.
// Slug khuje pete: homepage category card-er link dekho (/shop?category=XXXX).
export const drawerCategories = [
  { name: "Solar Panels", slug: "solar-panel", icon: Sun },
  { name: "Lithium Battery", slug: "lithium-battery", icon: Battery },
  { name: "Solar Inverter", slug: "solar-inverter", icon: Zap },
  { name: "Charge Controller", slug: "charge-controller", icon: Sliders },
  { name: "IPS & UPS", slug: "ips-and-ups", icon: Power },
  { name: "Accessories", slug: "accessories", icon: Wrench },
];
