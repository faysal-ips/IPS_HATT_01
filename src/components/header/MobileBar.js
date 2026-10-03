import { Menu } from "lucide-react";
import Logo from "./Logo";
import SearchBox from "../SearchBox";
import HeaderCart from "../HeaderCart";

export default function MobileBar({ onMenuClick, menuOpen }) {
  return (
    <div className="space-y-2 border-b border-gray-200 bg-white px-3 py-2 lg:hidden">
      {/* 3 column grid: logo always perfectly center-e thake */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          className="flex h-10 items-center gap-1.5 justify-self-start rounded-md pr-2 text-sm font-semibold text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00a651]"
        >
          <Menu className="h-6 w-6" />
        </button>

        <Logo className="min-w-[120px]" size="ll" />

        <div className="justify-self-end">
          <HeaderCart variant="mobile" />
        </div>
      </div>

      <SearchBox variant="mobile" />
    </div>
  );
}
