import Link from "next/link";
import Image from "next/image";

// Logo file ta public/logo.png (ba logo.svg) e rakho
const LOGO_SRC = "/banners/brand logo.jpeg";
// Logo-r asol width/height (px) dao, jate ratio thik thake
const LOGO_W = 180;
const LOGO_H = 60;

// Height diye size control hoy, width auto
const SIZES = {
  sm: "h-7",
  md: "h-9",
  ll: "h-16",
  lg: "h-24",
};

export default function Logo({ size = "md", className = "", onClick }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="IPS HATT - Home"
      className={`inline-flex shrink-0 items-center ${className}`}
    >
      <Image
        src={LOGO_SRC}
        alt="IPS HATT"
        width={LOGO_W}
        height={LOGO_H}
        priority
        unoptimized={LOGO_SRC.endsWith(".svg")}
        className={`${SIZES[size]} w-auto object-cover rounded-[4px]`}
      />
    </Link>
  );
}
