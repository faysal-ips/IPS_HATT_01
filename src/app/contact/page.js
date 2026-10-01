import { Phone, MessageCircle, Mail, MapPin, ArrowUpRight } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "Contact Us | IPS HATT",
  description:
    "Call, WhatsApp or message IPS HATT for product advice, orders and warranty support.",
};

function InfoCard({ icon: Icon, title, children, href, external }) {
  const Wrapper = href ? "a" : "div";
  const props = href
    ? {
        href,
        ...(external ? { target: "_blank", rel: "noopener noreferrer" } : {}),
      }
    : {};
  return (
    <Wrapper
      {...props}
      className="group flex gap-4 rounded-2xl bg-white border border-slate-100 shadow-sm p-5 hover:shadow-lg hover:border-[#00a651] transition-all"
    >
      <span className="w-12 h-12 shrink-0 rounded-xl bg-emerald-50 text-[#00a651] group-hover:bg-[#00a651] group-hover:text-white flex items-center justify-center transition-colors">
        <Icon className="w-6 h-6" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
          {title}
        </p>
        <div className="mt-0.5 font-bold text-slate-900 break-words">
          {children}
        </div>
      </div>
      {href && (
        <ArrowUpRight className="w-5 h-5 ml-auto shrink-0 text-slate-300 group-hover:text-[#00a651] transition-colors" />
      )}
    </Wrapper>
  );
}

export default function ContactPage() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    SITE.mapQuery
  )}&output=embed`;
  const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    SITE.mapQuery
  )}`;

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-4 md:py-6 space-y-10 pb-16">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl bg-[#002147] text-white px-6 sm:px-10 lg:px-16 py-14 md:py-20">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute -top-24 -right-20 w-[380px] h-[380px] rounded-full bg-[#00a651]/30 blur-3xl" />
        <div className="relative max-w-3xl">
          <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-300">
            Contact Us
          </span>
          <h1 className="mt-5 text-4xl md:text-5xl font-black leading-tight">
            Let&apos;s find the{" "}
            <span className="text-[#00e07a]">right power solution</span> for you
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            Product advice, order help or warranty support - reach us the way
            that is easiest for you.
          </p>
        </div>
      </section>

      {/* INFO + FORM */}
      <section className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        <div className="lg:col-span-5 space-y-4">
          <InfoCard
            icon={Phone}
            title="Call Us"
            href={`tel:${SITE.phones[0].tel}`}
          >
            <span className="block">{SITE.phones[0].label}</span>
            <span className="block">{SITE.phones[1].label}</span>
          </InfoCard>
          <InfoCard
            icon={MessageCircle}
            title="WhatsApp"
            href={`https://wa.me/${SITE.whatsapp}`}
            external
          >
            Chat with us on WhatsApp
          </InfoCard>
          <InfoCard icon={Mail} title="Email" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </InfoCard>
          <InfoCard
            icon={MapPin}
            title="Visit Our Office"
            href={directions}
            external
          >
            <span className="font-semibold leading-relaxed">
              {SITE.address}
            </span>
          </InfoCard>
        </div>

        <div className="lg:col-span-7 rounded-3xl bg-white border border-slate-100 shadow-sm p-6 md:p-9">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
            Send us a message
          </h2>
          <p className="mt-1.5 mb-6 text-slate-600">
            Apnar proyojon likhun - amader team shirshi-i apnar shathe jogajog
            korbe.
          </p>
          <ContactForm />
        </div>
      </section>

      {/* MAP */}
      <section className="rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-white">
        <iframe
          title="IPS HATT office location"
          src={mapSrc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-[360px] md:h-[440px] border-0"
          allowFullScreen
        />
      </section>
    </div>
  );
}
