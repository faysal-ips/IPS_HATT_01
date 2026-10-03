"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import TopBar from "./TopBar";
import MobileBar from "./MobileBar";
import DesktopHeader from "./DesktopHeader";
import DesktopNav from "./DesktopNav";
import MobileDrawer from "./MobileDrawer";
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href) => {
    const base = href.split("#")[0];
    if (!base) return false;
    return base === "/" ? pathname === "/" : pathname.startsWith(base);
  };

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Page bodlale mobile menu bondho
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <TopBar />
      <MobileBar
        menuOpen={isMenuOpen}
        onMenuClick={() => setIsMenuOpen(true)}
      />
      <DesktopHeader />
      <DesktopNav isScrolled={isScrolled} isActive={isActive} />
      <MobileDrawer open={isMenuOpen} onClose={closeMenu} isActive={isActive} />
    </>
  );
}
