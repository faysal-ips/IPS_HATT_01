import Link from "next/link";

import Logo from "./Logo";
import SearchBox from "../SearchBox";
import HeaderCart from "../HeaderCart";
import { Phone } from "lucide-react";
import { SITE } from "@/lib/site";
export default function DesktopHeader() {
  return (
    <header className="hidden w-full bg-white lg:block">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-1">
        <Logo className="min-w-[180px]" size="lg" />

        <div className="mx-4 max-w-xl flex-1">
          <SearchBox variant="desktop" />
        </div>

        <div className="flex items-center gap-4 text-sm font-semibold text-slate-700">
          {/* <a
            href={`tel:${SITE.phones[0].tel}`}
            className="hidden xl:flex items-center gap-2.5 text-slate-700 hover:text-[#00a651] transition-colors"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-[#00a651]">
              <Phone className="h-4 w-4" />
            </span>
            <span className="leading-tight">
              <span className="block text-[11px] font-medium text-slate-500">
                Hotline
              </span>
              <span className="block text-sm font-bold">
                {SITE.phones[0].label}
              </span>
            </span>
          </a> */}
          <div className="flex items-center gap-3 text-base font-bold text-[#00a651]">
            <HeaderCart variant="desktop" />
          </div>
        </div>
      </div>
    </header>
  );
}
