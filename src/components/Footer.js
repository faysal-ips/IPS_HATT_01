"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";
import { Phone, Mail, MapPin, ArrowUp, Banknote } from "lucide-react";
import { SITE } from "@/lib/site";

const WA_LINK = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
  "Hello IPS HATT, ami ekta product shomporke jante chai."
)}`;

// Facebook, Instagram, YouTube-er asol link ekhane boshao ("#" thakle click-e kichu hobe na)
const SOCIALS = [
  {
    name: "Facebook",
    href: "#",
    Icon: FaFacebookF,
    hover: "hover:bg-blue-600 hover:border-blue-600",
  },
  {
    name: "Instagram",
    href: "#",
    Icon: FaInstagram,
    hover: "hover:bg-pink-600 hover:border-pink-600",
  },
  {
    name: "YouTube",
    href: "#",
    Icon: FaYoutube,
    hover: "hover:bg-red-600 hover:border-red-600",
  },
  {
    name: "WhatsApp",
    href: WA_LINK,
    Icon: FaWhatsapp,
    hover: "hover:bg-emerald-500 hover:border-emerald-500",
  },
];

// slug gulo WooCommerce category slug-er sathe milte hobe
const CATEGORIES = [
  { name: "Solar Panel", href: "/shop?category=solar-panel" },
  { name: "Solar Inverter", href: "/shop?category=solar-inverter" },
  { name: "Home UPS / IPS", href: "/shop?category=home-ips" },
  { name: "Lithium & IPS Battery", href: "/shop?category=lithium-battery" },
  {
    name: "Solar Charge Controller",
    href: "/shop?category=solar-charge-controller",
  },
];

const USEFUL_LINKS = [
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
  { name: "Order Tracking", href: "/order-tracking" },
  { name: "Policy", href: "/policy" },
];

const linkCls =
  "hover:text-[#00a651] hover:translate-x-1 transition-all duration-200 inline-block";

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <footer className="py-6 w-full">
        <div className="relative max-w-[1600px] mx-auto bg-[#002147] text-white pt-12 pb-6 px-6 sm:px-10 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-slate-700/60">
            {/* Column 1: Brand Info & Social */}
            <div className="lg:col-span-4 space-y-4">
              <h3 className="text-2xl font-black tracking-wider text-white">
                IPS <span className="text-[#00a651]">HATT</span>
              </h3>
              <p className="text-xs md:text-base text-slate-100 leading-relaxed font-normal">
                Welcome to IPS HATT. We are the leading solar and power
                equipment provider in Bangladesh. We deliver premium imported
                Solar Panels, Inverters, Lithium Batteries, and Smart Backup
                Systems directly to your doorstep.
              </p>

              <div className="pt-2">
                <h4 className="text-xs uppercase font-bold tracking-widest text-slate-400 mb-3">
                  Connect With Us
                </h4>
                <div className="flex items-center gap-2.5">
                  {SOCIALS.map(({ name, href, Icon, hover }) => {
                    const external = href.startsWith("http");
                    return (
                      <a
                        key={name}
                        href={href}
                        {...(external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        aria-label={name}
                        className={`w-9 h-9 rounded-full bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-slate-200 transition-all duration-300 hover:scale-110 ${hover}`}
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Column 2: Categories */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#00a651]">
                Categories
              </h4>
              <ul className="space-y-2.5 text-xs md:text-base font-medium text-slate-200">
                {CATEGORIES.map((cat) => (
                  <li key={cat.name}>
                    <Link href={cat.href} className={linkCls}>
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Useful Links */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#00a651]">
                Useful Links
              </h4>
              <ul className="space-y-2.5 text-sm md:text-base font-medium text-slate-200">
                {USEFUL_LINKS.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className={linkCls}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#00a651]">
                Contact Us
              </h4>
              <div className="space-y-3 text-sm md:text-base font-medium text-slate-200">
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#00a651] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    {SITE.phones.map((p) => (
                      <p key={p.tel}>
                        <a
                          href={`tel:${p.tel}`}
                          className="hover:text-[#00a651] transition-colors"
                        >
                          {p.label}
                        </a>
                      </p>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#00a651] shrink-0" />
                  <a
                    href={`mailto:${SITE.email}`}
                    className="hover:text-[#00a651] transition-colors break-all"
                  >
                    {SITE.email}
                  </a>
                </div>

                <div className="flex items-start gap-3 leading-relaxed">
                  <MapPin className="w-4 h-4 text-[#00a651] shrink-0 mt-0.5" />
                  <span>{SITE.address}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-400 font-medium text-center md:text-left">
              © {new Date().getFullYear()}{" "}
              <span className="text-white font-bold">IPS HATT</span>. All Rights
              Reserved.
            </p>

            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-slate-200 text-xs font-semibold px-3.5 py-2 rounded-full">
              <Banknote className="w-4 h-4 text-[#00a651]" />
              Cash on Delivery Available
            </span>
          </div>
        </div>
      </footer>

      {/* Floating buttons: sob page-e screen-er niche dan kone fixed */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-center gap-3">
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          tabIndex={showTop ? 0 : -1}
          className={`w-11 h-11 rounded-full bg-[#002147] hover:bg-slate-800 text-white flex items-center justify-center shadow-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00a651] ${
            showTop
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-3 pointer-events-none"
          }`}
        >
          <ArrowUp className="w-5 h-5 stroke-[2.5]" />
        </button>

        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="group relative flex items-center justify-center"
        >
          {/* Hover tooltip (shudhu desktop-e) */}
          <span className="hidden sm:block absolute right-full mr-3 whitespace-nowrap rounded-lg bg-slate-900 px-3 py-2 text-xs font-bold text-white shadow-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none">
            Chat with us
          </span>

          {/* Pulse ring */}
          <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-40 animate-ping" />

          <span className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1ebe5a] text-white flex items-center justify-center shadow-xl transition-transform duration-200 group-hover:scale-110">
            <FaWhatsapp className="w-8 h-8" />
          </span>
        </a>
      </div>
    </>
  );
}
