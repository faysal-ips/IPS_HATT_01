import Link from "next/link";
import Logo from "./Logo";
import HeaderCart from "../HeaderCart";
import { navLinks } from "./Config";

export default function DesktopNav({ isScrolled, isActive }) {
  return (
    <nav className="sticky top-0 z-40 hidden border-y border-gray-200 bg-white shadow-sm lg:block">
      <div className="mx-auto flex min-h-[48px] max-w-[1600px] items-center justify-between px-4 py-2">
        {/* Left: scroll korle chhoto logo ashe */}
        <div className="flex w-64 shrink-0 items-center">
          {isScrolled && <Logo size="lg" />}
        </div>

        {/* Center: nav links */}
        <div className="flex flex-1 items-center justify-center gap-5 text-base font-semibold text-slate-700 xl:gap-8">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.title}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`whitespace-nowrap pb-0.5 transition-colors ${
                  active
                    ? "border-b-2 border-[#00a651] text-[#00a651]"
                    : "hover:text-[#00a651]"
                }`}
              >
                {link.title}
              </Link>
            );
          })}
        </div>

        {/* Right: scroll korle login + cart ashe */}
        <div className="flex w-44 shrink-0 justify-end">
          {isScrolled && (
            <div className="flex items-center gap-3 text-base font-semibold">
              <HeaderCart variant="sticky" />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
