// "use client";

// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { FaFacebookF, FaWhatsapp, FaYoutube } from "react-icons/fa";
// import { usePathname } from "next/navigation";
// import SearchBox from "./SearchBox";
// import {
//   ShoppingCart,
//   Heart,
//   Menu,
//   ChevronRight,
//   User,
//   Sun,
//   Package,
//   BatteryCharging,
//   Zap,
//   SlidersHorizontal,
//   Plug,
//   Wrench,
//   Lightbulb,
//   Globe,
//   MoreHorizontal,
// } from "lucide-react";
// import HeaderCart from "./HeaderCart";
// export default function Header() {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState("menu"); // 'menu' or 'categories'
//   const pathname = usePathname();
//   const isActive = (href) =>
//     href === "/" ? pathname === "/" : href !== "#" && pathname.startsWith(href);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 80) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const navLinks = [
//     { title: "Home", href: "/" },
//     { title: "Shop", href: "/shop" },
//     { title: "About Us", href: "#" },
//     { title: "Order Tracking", href: "#" },
//     { title: "Term & Conditions", href: "#" },
//     { title: "Authenticity Checker", href: "#" },
//   ];

//    const categories = [
//     { name: "SOLAR PANEL", slug: "solar-panel", icon: Sun },
//     { name: "COMBO PACKAGE", slug: "combo-package", icon: Package },
//     { name: "SOLAR IPS", slug: "solar-ips", icon: BatteryCharging },
//     { name: "HOME IPS", slug: "home-ips", icon: Zap },
//     { name: "LITHIUM BATTERY", slug: "lithium-battery", icon: BatteryCharging },
//     { name: "SOLAR CHARGE CONTROLLER", slug: "solar-charge-controller", icon: SlidersHorizontal },
//     { name: "DC WIRE", slug: "dc-wire", icon: Plug },
//     { name: "SOLAR TOOLS", slug: "solar-tools", icon: Wrench },
//     { name: "STREET LIGHT", slug: "street-light", icon: Lightbulb },
//     { name: "AVR", slug: "avr", icon: Globe },
//     { name: "OTHERS", slug: "others", icon: MoreHorizontal },
//   ];

//   return (
//     <>
//       {/* 1. TOP ANNOUNCEMENT BAR */}
//       <div className="bg-[#00a651] text-white text-xs md:text-sm py-2.5 px-4 min-h-[40px] flex justify-between items-center whitespace-nowrap overflow-x-auto shadow-sm">
//         <span className="font-medium tracking-wide">IPS HATT-e shagotom!</span>

//         <span className="font-bold mx-2 tracking-wide">
//           Desher 64 jelay delivery charge free!
//         </span>

//         {/* Social Media Icons */}
//         <div className="hidden sm:flex items-center gap-4">
//           <a
//             href="#"
//             target="_blank"
//             rel="noopener noreferrer"
//             aria-label="Facebook"
//             className="p-2 shadow-lg bg-white/30 hover:bg-white/20 rounded-full transition-all duration-200"
//           >
//             <FaFacebookF className="w-4  h-4 text-white" />
//           </a>
//           <a
//             href="#"
//             target="_blank"
//             rel="noopener noreferrer"
//             aria-label="WhatsApp"
//             className="p-2  shadow-lg bg-white/30 hover:bg-white/20 rounded-full transition-all duration-200"
//           >
//             <FaWhatsapp className="w-4.5 h-4.5 text-white" />
//           </a>
//           <a
//             href="#"
//             target="_blank"
//             rel="noopener noreferrer"
//             aria-label="YouTube"
//             className="p-2  shadow-lg bg-white/30 hover:bg-white/20 rounded-full transition-all duration-200"
//           >
//             <FaYoutube className="w-4.5 h-4.5 text-white" />
//           </a>
//         </div>
//       </div>
//       {/* 2. MOBILE HEADER VIEW */}
//       <div className="lg:hidden bg-white border-b border-gray-200 px-3 py-2 space-y-2">
//         {/* Top Row: Menu Button, Logo, Cart */}
//         <div className="flex items-center justify-between">
//           <button
//             onClick={() => setIsMobileMenuOpen(true)}
//             className="flex items-center gap-1 text-slate-700 text-sm font-semibold focus:outline-none"
//           >
//             <Menu className="w-6 h-6 text-slate-700" />
//             <span>Menu</span>
//           </button>

//           <Link href="/" className="text-xl font-black text-slate-800">
//             IPS <span className="text-[#00a651]">HATT</span>
//           </Link>

//           {/* <div className="relative text-slate-700">
//             <ShoppingCart className="w-6 h-6 text-slate-700" />
//             <span className="absolute -top-1 -right-2 bg-[#00a651] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
//               0
//             </span>
//           </div> */}
//           <HeaderCart variant="mobile" />
//         </div>

//         {/* Bottom Row: Mobile Search Bar */}
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search for products"
//             className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-xs focus:outline-none focus:border-[#00a651]"
//           />
//           <button className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-700">
//             <Search className="w-4 h-4 text-slate-700" />
//           </button>
//         </div>
//       </div>

//       {/* 3. DESKTOP MAIN HEADER */}
//       <header className="hidden lg:block w-full bg-white">
//         <div className="max-w-[1600px] mx-auto px-4 py-4 flex items-center justify-between gap-4">
//           <Link
//             href="/"
//             className="text-2xl font-black text-slate-800 tracking-tight flex-shrink-0"
//           >
//             IPS <span className="text-[#00a651]">HATT</span>
//           </Link>

//           <div className="flex-1 max-w-xl mx-4">
//             <div className="relative flex items-center">
//               <input
//                 type="text"
//                 placeholder="Search for products..."
//                 className="w-full border border-gray-300 rounded-l-md px-4 py-2 text-sm focus:outline-none focus:border-[#00a651]"
//               />
//               <button className="bg-[#00a651] text-white px-5 py-2.5 rounded-r-md text-sm font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center">
//                 <Search className="w-4 h-4 text-white" />
//               </button>
//             </div>
//           </div>

//           <div className="flex items-center gap-4 text-sm font-semibold text-slate-700">
//             <Link
//               href="#"
//               className="border rounded-full px-4 py-1.5 border-gray-300 hover:border-[#00a651] hover:text-[#00a651] transition-colors text-xs"
//             >
//               Login / Register
//             </Link>
//             <div className="flex items-center gap-3 font-bold text-[#00a651] text-sm">
//               <span className="relative cursor-pointer">
//                 <Heart className="w-5 h-5 text-slate-700 hover:text-[#00a651] transition-colors" />
//                 <span className="absolute -top-1.5 -right-2 bg-[#00a651] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
//                   0
//                 </span>
//               </span>
//               {/* <span className="relative cursor-pointer">
//                 <ShoppingCart className="w-5 h-5 text-slate-700 hover:text-[#00a651] transition-colors" />
//                 <span className="absolute -top-1.5 -right-2 bg-[#00a651] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
//                   0
//                 </span>
//               </span>
//               <span>0.00৳</span> */}
//               <HeaderCart variant="desktop" />
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* 4. DESKTOP STICKY NAV BAR */}
//       <nav className="hidden lg:block sticky top-0 z-40 bg-white border-y border-gray-200 shadow-sm transition-all duration-200">
//         <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between min-h-[44px]">
//           <div className="w-32 flex-shrink-0">
//             {isScrolled && (
//               <Link
//                 href="/"
//                 className="text-lg font-black text-slate-800 flex items-center transition-opacity duration-300"
//               >
//                 IPS <span className="text-[#00a651]">HATT</span>
//               </Link>
//             )}
//           </div>

//           <div className="flex justify-center items-center gap-8 text-sm font-semibold text-slate-700 flex-1">
//             {navLinks.map((link, idx) => (
//               <Link
//                 key={idx}
//                 href={link.href}
//                 className={
//                   idx === 0
//                     ? "text-[#00a651] border-b-2 border-[#00a651] pb-0.5"
//                     : "hover:text-[#00a651] transition-colors pb-0.5"
//                 }
//               >
//                 {link.title}
//               </Link>
//             ))}
//           </div>

//           <div className="w-44 flex-shrink-0 flex justify-end">
//             {isScrolled && (
//               <div className="flex items-center gap-3 text-xs font-semibold transition-opacity duration-300">
//                 <Link
//                   href="#"
//                   className="border border-gray-300 rounded-full px-3 py-1 text-slate-700 hover:border-[#00a651] hover:text-[#00a651] transition-colors"
//                 >
//                   Login
//                 </Link>
//                 {/* <div className="flex items-center gap-1.5 font-bold text-[#00a651]">
//                   <span className="relative">
//                     <ShoppingCart className="w-4 h-4 text-slate-700" />
//                     <span className="absolute -top-1 -right-1.5 bg-[#00a651] text-white text-[8px] w-3 h-3 rounded-full flex items-center justify-center">
//                       0
//                     </span>
//                   </span>
//                   <span>0.00৳</span>
//                 </div> */}
//                 <HeaderCart variant="sticky" />
//               </div>
//             )}
//           </div>
//         </div>
//       </nav>

//       {/* 5. MOBILE OFF-CANVAS SIDEBAR DRAWER */}
//       {isMobileMenuOpen && (
//         <div className="fixed inset-0 z-50 lg:hidden flex">
//           {/* Backdrop Overlay */}
//           <div
//             onClick={() => setIsMobileMenuOpen(false)}
//             className="fixed inset-0 bg-black/50 transition-opacity"
//           />

//           {/* Drawer Content */}
//           <div className="relative w-[80%] max-w-[320px] bg-white h-full shadow-xl flex flex-col z-10 overflow-y-auto">
//             {/* Drawer Header Search */}
//             <div className="p-3 border-b border-gray-200">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search for products"
//                   className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-[#00a651]"
//                 />
//                 <button className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-700">
//                   <Search className="w-3.5 h-3.5 text-slate-700" />
//                 </button>
//               </div>
//             </div>

//             {/* Two Tabs: MENU | CATEGORIES */}
//             <div className="flex border-b border-gray-200 bg-gray-50 text-xs font-bold uppercase tracking-wider">
//               <button
//                 onClick={() => setActiveTab("menu")}
//                 className={`flex-1 py-3 text-center transition-colors ${
//                   activeTab === "menu"
//                     ? "bg-white text-[#00a651] border-b-2 border-[#00a651]"
//                     : "text-gray-500 hover:text-gray-800"
//                 }`}
//               >
//                 Menu
//               </button>
//               <button
//                 onClick={() => setActiveTab("categories")}
//                 className={`flex-1 py-3 text-center transition-colors ${
//                   activeTab === "categories"
//                     ? "bg-white text-[#00a651] border-b-2 border-[#00a651]"
//                     : "text-gray-500 hover:text-gray-800"
//                 }`}
//               >
//                 Categories
//               </button>
//             </div>

//             {/* Tab Content List */}
//             <div className="flex-1 divide-y divide-gray-100 text-xs font-bold text-gray-700">
//               {activeTab === "menu" ? (
//                 /* MENU TAB ITEMS */
//                 <>
//                   {navLinks.map((item, index) => (
//                     <Link
//                       key={index}
//                       href={item.href}
//                       onClick={() => setIsMobileMenuOpen(false)}
//                       className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 uppercase"
//                     >
//                       <span>{item.title}</span>
//                     </Link>
//                   ))}
//                   <Link
//                     href="#"
//                     onClick={() => setIsMobileMenuOpen(false)}
//                     className="flex items-center gap-2 px-4 py-3 text-[#00a651] uppercase"
//                   >
//                     <User className="w-4 h-4 text-[#00a651]" />
//                     <span>Login / Register</span>
//                   </Link>
//                 </>
//               ) : (
//                 /* CATEGORIES TAB ITEMS */
//                 categories.map((cat, index) => {
//                   const Icon = cat.icon;
//                   return (
//                     <Link
//                       key={index}
//                       href="#"
//                       onClick={() => setIsMobileMenuOpen(false)}
//                       className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 uppercase"
//                     >
//                       <div className="flex items-center gap-3">
//                         <Icon className="w-4 h-4 text-slate-700 stroke-[2]" />
//                         <span>{cat.name}</span>
//                       </div>
//                       <ChevronRight className="w-4 h-4 text-gray-400" />
//                     </Link>
//                   );
//                 })
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FaFacebookF, FaWhatsapp, FaYoutube } from "react-icons/fa";
import {
  Heart,
  Menu,
  ChevronRight,
  User,
  Sun,
  Package,
  BatteryCharging,
  Zap,
  SlidersHorizontal,
  Plug,
  Wrench,
  Lightbulb,
  Globe,
  MoreHorizontal,
} from "lucide-react";
import SearchBox from "./SearchBox";
import HeaderCart from "./HeaderCart";

const navLinks = [
  { title: "Home", href: "/" },
  { title: "Shop", href: "/shop" },
  { title: "About Us", href: "/about" },
  { title: "Order Tracking", href: "/order-tracking" },
  { title: "Contact Us", href: "/contact" },
];

// slug gulo WooCommerce-er asol category slug-er sathe milte hobe
const categories = [
  { name: "SOLAR PANEL", slug: "solar-panel", icon: Sun },
  { name: "COMBO PACKAGE", slug: "combo-package", icon: Package },
  { name: "SOLAR IPS", slug: "solar-ips", icon: BatteryCharging },
  { name: "HOME IPS", slug: "home-ips", icon: Zap },
  { name: "LITHIUM BATTERY", slug: "lithium-battery", icon: BatteryCharging },
  {
    name: "SOLAR CHARGE CONTROLLER",
    slug: "solar-charge-controller",
    icon: SlidersHorizontal,
  },
  { name: "DC WIRE", slug: "dc-wire", icon: Plug },
  { name: "SOLAR TOOLS", slug: "solar-tools", icon: Wrench },
  { name: "STREET LIGHT", slug: "street-light", icon: Lightbulb },
  { name: "AVR", slug: "avr", icon: Globe },
  { name: "OTHERS", slug: "others", icon: MoreHorizontal },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("menu"); // 'menu' or 'categories'
  const pathname = usePathname();

  const isActive = (href) => {
    const base = href.split("#")[0];
    if (!base) return false;
    return base === "/" ? pathname === "/" : pathname.startsWith(base);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Page bodlale mobile menu bondho
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#00a651] text-white text-xs md:text-sm py-2.5 px-4 min-h-[40px] flex justify-between items-center whitespace-nowrap overflow-x-auto shadow-sm">
        <span className="font-medium tracking-wide">IPS HATT-e shagotom!</span>

        <span className="font-bold mx-2 tracking-wide">
          Desher 64 jelay delivery charge free!
        </span>

        {/* Social Media Icons */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="p-2 shadow-lg bg-white/30 hover:bg-white/20 rounded-full transition-all duration-200"
          >
            <FaFacebookF className="w-4 h-4 text-white" />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="p-2 shadow-lg bg-white/30 hover:bg-white/20 rounded-full transition-all duration-200"
          >
            <FaWhatsapp className="w-4.5 h-4.5 text-white" />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="p-2 shadow-lg bg-white/30 hover:bg-white/20 rounded-full transition-all duration-200"
          >
            <FaYoutube className="w-4.5 h-4.5 text-white" />
          </a>
        </div>
      </div>

      {/* 2. MOBILE HEADER VIEW */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-3 py-2 space-y-2">
        {/* Top Row: Menu Button, Logo, Cart */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex items-center gap-1 text-slate-700 text-sm font-semibold focus:outline-none"
          >
            <Menu className="w-6 h-6 text-slate-700" />
            <span>Menu</span>
          </button>

          <Link href="/" className="text-xl font-black text-slate-800">
            IPS <span className="text-[#00a651]">HATT</span>
          </Link>

          <HeaderCart variant="mobile" />
        </div>

        {/* Bottom Row: Mobile Search Bar */}
        <SearchBox variant="mobile" />
      </div>

      {/* 3. DESKTOP MAIN HEADER */}
      <header className="hidden lg:block w-full bg-white">
        <div className="max-w-[1600px] mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="text-2xl font-black text-slate-800 tracking-tight flex-shrink-0"
          >
            IPS <span className="text-[#00a651]">HATT</span>
          </Link>

          <div className="flex-1 max-w-xl mx-4">
            <SearchBox variant="desktop" />
          </div>

          <div className="flex items-center gap-4 text-sm font-semibold text-slate-700">
            <Link
              href="#"
              className="border rounded-full px-4 py-1.5 border-gray-300 hover:border-[#00a651] hover:text-[#00a651] transition-colors text-base"
            >
              Login / Register
            </Link>
            <div className="flex items-center gap-3 font-bold text-[#00a651] text-base">
              <span className="relative cursor-pointer">
                <Heart className="w-5 h-5 text-slate-700 hover:text-[#00a651] transition-colors" />
                <span className="absolute -top-1.5 -right-2 bg-[#00a651] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                  0
                </span>
              </span>
              <HeaderCart variant="desktop" />
            </div>
          </div>
        </div>
      </header>

      {/* 4. DESKTOP STICKY NAV BAR */}
      <nav className="hidden lg:block sticky top-0 z-40 bg-white border-y border-gray-200 shadow-sm transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between min-h-[44px]">
          <div className="w-32 flex-shrink-0">
            {isScrolled && (
              <Link
                href="/"
                className="text-lg font-black text-slate-800 flex items-center transition-opacity duration-300"
              >
                IPS <span className="text-[#00a651]">HATT</span>
              </Link>
            )}
          </div>

          <div className="flex justify-center items-center gap-8 text-base font-semibold text-slate-700 flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className={
                  isActive(link.href)
                    ? "text-[#00a651] border-b-2 border-[#00a651] pb-0.5"
                    : "hover:text-[#00a651] transition-colors pb-0.5"
                }
              >
                {link.title}
              </Link>
            ))}
          </div>

          <div className="w-44 flex-shrink-0 flex justify-end">
            {isScrolled && (
              <div className="flex items-center gap-3 text-xs font-semibold transition-opacity duration-300">
                <Link
                  href="#"
                  className="border border-gray-300 rounded-full px-3 py-1 text-slate-700 hover:border-[#00a651] hover:text-[#00a651] transition-colors"
                >
                  Login
                </Link>
                <HeaderCart variant="sticky" />
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* 5. MOBILE OFF-CANVAS SIDEBAR DRAWER */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop Overlay */}
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/50 transition-opacity"
          />

          {/* Drawer Content */}
          <div className="relative w-[80%] max-w-[320px] bg-white h-full shadow-xl flex flex-col z-10 overflow-y-auto">
            {/* Drawer Header Search */}
            <div className="p-3 border-b border-gray-200">
              <SearchBox
                variant="mobile"
                onNavigate={() => setIsMobileMenuOpen(false)}
              />
            </div>

            {/* Two Tabs: MENU | CATEGORIES */}
            <div className="flex border-b border-gray-200 bg-gray-50 text-xs font-bold uppercase tracking-wider">
              <button
                onClick={() => setActiveTab("menu")}
                className={`flex-1 py-3 text-center transition-colors ${
                  activeTab === "menu"
                    ? "bg-white text-[#00a651] border-b-2 border-[#00a651]"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                Menu
              </button>
              <button
                onClick={() => setActiveTab("categories")}
                className={`flex-1 py-3 text-center transition-colors ${
                  activeTab === "categories"
                    ? "bg-white text-[#00a651] border-b-2 border-[#00a651]"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                Categories
              </button>
            </div>

            {/* Tab Content List */}
            <div className="flex-1 divide-y divide-gray-100 text-xs font-bold text-gray-700">
              {activeTab === "menu" ? (
                /* MENU TAB ITEMS */
                <>
                  {navLinks.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 hover:bg-gray-50 uppercase ${
                        isActive(item.href) ? "text-[#00a651]" : ""
                      }`}
                    >
                      <span>{item.title}</span>
                    </Link>
                  ))}
                  <Link
                    href="#"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 text-[#00a651] uppercase"
                  >
                    <User className="w-4 h-4 text-[#00a651]" />
                    <span>Login / Register</span>
                  </Link>
                </>
              ) : (
                /* CATEGORIES TAB ITEMS */
                categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <Link
                      key={cat.slug}
                      href={`/shop?category=${cat.slug}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 uppercase"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-slate-700 stroke-[2]" />
                        <span>{cat.name}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </Link>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
