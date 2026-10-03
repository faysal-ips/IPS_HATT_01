import { FaFacebookF, FaWhatsapp, FaYoutube } from "react-icons/fa";

const SOCIALS = [
  { label: "Facebook", href: "#", icon: FaFacebookF },
  { label: "WhatsApp", href: "#", icon: FaWhatsapp },
  { label: "YouTube", href: "#", icon: FaYoutube },
];
import { Phone } from "lucide-react";
import { SITE } from "@/lib/site";
export default function TopBar() {
  return (
    <div className="bg-[#00a651] text-white text-xs md:text-sm shadow-sm">
      <div className="mx-auto flex min-h-[40px] max-w-[1600px] items-center justify-center gap-3 px-3 py-2 sm:justify-between sm:px-4">
        {/* Welcome text: shudhu md+ screen-e */}
        <a
          href={`tel:${SITE.phones[0].tel}`}
          className="hidden xl:flex items-center gap-2.5 text-slate-100 hover:text-[#00a651] transition-colors"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-[#00a651]">
            <Phone className="h-4 w-4" />
          </span>
          <span className="leading-tight">
            <span className="block text-[11px] font-medium text-slate-100">
              Hotline
            </span>
            <span className="block text-sm font-bold">
              {SITE.phones[0].label}
            </span>
          </span>
        </a>

        <span className="text-center font-bold tracking-wide">
          Desher 64 jelay delivery charge free!
        </span>

        {/* Social icons: sm+ screen-e */}
        <div className="hidden items-center gap-3 sm:flex">
          {SOCIALS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="rounded-full bg-white  p-2 transition-colors duration-200 hover:bg-white/40"
            >
              <Icon className="h-[15px] w-[15px] text-[#00a651]" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
