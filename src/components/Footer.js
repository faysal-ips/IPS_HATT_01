"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const categories = [
    { name: "Solar Panel", href: "/category/solar-panel" },
    { name: "Solar Inverter", href: "/category/solar-inverter" },
    { name: "Home UPS / IPS", href: "/category/home-ups-ips" },
    { name: "Lithium & IPS Battery", href: "/category/battery" },
    {
      name: "Solar Charge Controller",
      href: "/category/solar-charge-controller",
    },
  ];

  const usefulLinks = [
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Return & Refund Policy", href: "/refund-policy" },
    { name: "Privacy Policy", href: "/privacy-policy" },
  ];

  return (
    <footer className="py-6 w-full">
      {/* 1600px Boxed Wrapper with Dark Navy Background */}
      <div className="relative max-w-[1600px] mx-auto bg-[#002147] text-white pt-12 pb-6 px-6 sm:px-10 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-slate-700/60">
          {/* Column 1: Brand Info & Social Icons */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-2xl font-black tracking-wider text-white">
              IPS <span className="text-[#00a651]">HATT</span>
            </h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-normal">
              Welcome to IPS HATT. We are the leading solar and power equipment
              provider in Bangladesh. We deliver premium imported Solar Panels,
              Inverters, Lithium Batteries, and Smart Backup Systems directly to
              your doorstep.
            </p>

            {/* Social Media Links */}
            <div className="pt-2">
              <h4 className="text-xs uppercase font-bold tracking-widest text-slate-400 mb-3">
                Connect With Us
              </h4>
              <div className="flex items-center gap-2.5">
                {/* Facebook */}
                <a
                  href="#"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-slate-200 hover:bg-blue-600 hover:border-blue-600 transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="#"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-slate-200 hover:bg-pink-600 hover:border-pink-600 transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* Youtube */}
                <a
                  href="#"
                  aria-label="YouTube"
                  className="w-9 h-9 rounded-full bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-slate-200 hover:bg-red-600 hover:border-red-600 transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>

                {/* WhatsApp */}
                <a
                  href="#"
                  aria-label="WhatsApp"
                  className="w-9 h-9 rounded-full bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-slate-200 hover:bg-emerald-500 hover:border-emerald-500 transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Categories */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#00a651]">
              Categories
            </h4>
            <ul className="space-y-2.5 text-xs md:text-sm font-medium text-slate-300">
              {categories.map((cat, idx) => (
                <li key={idx}>
                  <Link
                    href={cat.href}
                    className="hover:text-[#00a651] hover:translate-x-1 transition-all duration-200 inline-block"
                  >
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
            <ul className="space-y-2.5 text-xs md:text-sm font-medium text-slate-300">
              {usefulLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="hover:text-[#00a651] hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#00a651]">
              Contact Us
            </h4>
            <div className="space-y-3 text-xs md:text-sm text-slate-300 font-medium">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#00a651] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p>+880 9611901250</p>
                  <p>+880 1316308733</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#00a651] shrink-0" />
                <span>support@ipshatt.com</span>
              </div>

              <div className="flex items-start gap-3 leading-relaxed">
                <MapPin className="w-4 h-4 text-[#00a651] shrink-0 mt-0.5" />
                <span>
                  Technohaven Tower, House #3, 5th Floor, Road #2, Motijheel,
                  Dhaka-1000, Bangladesh
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Gateway Logos */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 font-medium text-center md:text-left">
            © {new Date().getFullYear()}{" "}
            <span className="text-white font-bold">IPS HATT</span>. All Rights
            Reserved.
          </p>

          <div className="relative w-full md:w-auto max-w-md h-8 bg-white/90 rounded-md px-3 py-1 flex items-center justify-center shadow-inner">
            <Image
              src="/payments/sslcommerz-banner.png"
              alt="Supported Payment Options - SSLCommerz"
              width={350}
              height={24}
              className="object-contain max-h-6"
            />
          </div>
        </div>

        {/* Floating Call Specialist & Back to Top (Positioned inside the container) */}
        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
          <a
            href="tel:+8801316308733"
            className="hidden sm:flex items-center gap-2 bg-slate-900/90 backdrop-blur-md border border-slate-700 text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-lg hover:border-[#00a651] transition-all"
          >
            <Phone className="w-3.5 h-3.5 text-[#00a651]" />
            <span>Call Our Solar Specialist</span>
          </a>

          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="w-10 h-10 bg-[#00a651] hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all transform hover:scale-105 focus:outline-none"
          >
            <ArrowUp className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
