"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FileText, Lock, RotateCcw, Phone, MessageCircle } from "lucide-react";
import { SITE, POLICY } from "@/lib/site";

// t = heading, p = paragraph, list = bullet points
const SECTIONS = [
  {
    id: "privacy",
    title: "Privacy Policy",
    short: "Privacy",
    icon: Lock,
    intro:
      "We collect only what we need to take your order, deliver it and support you afterwards.",
    items: [
      {
        t: "Information we collect",
        list: [
          "Your name, mobile number, optional email, delivery address and district.",
          "The products you order and any note you add to the order.",
          "The order number and phone number you enter on the Order Tracking page.",
        ],
      },
      {
        t: "How we use it",
        list: [
          "To confirm, pack and deliver your order.",
          "To contact you about your order, delivery, warranty or support request.",
          "To keep records needed for accounting, warranty and legal reasons.",
        ],
      },
      {
        t: "Sharing",
        p: "We do not sell your personal data. We share only what is needed (such as your name, phone number and address) with courier and delivery partners, and with the service providers that run our store and website. We may also share information if the law requires it.",
      },
      {
        t: "Cart and browser storage",
        p: "Your shopping cart is saved in your own browser (local storage) so it is still there when you return. We do not need an account to place an order. You can clear this data at any time from your browser settings.",
      },
      {
        t: "Security",
        p: "We take reasonable steps to protect your information. For example, prices are verified on our server at checkout, and your phone number is partly hidden on the order tracking page. No online system is completely secure, so we cannot guarantee absolute security.",
      },
      {
        t: "Retention",
        p: "We keep order records for as long as needed for warranty, accounting and legal purposes.",
      },
      {
        t: "Your choices",
        p: `You can ask us to correct your information, or to delete it where the law and our record-keeping duties allow. Contact us at ${SITE.email}.`,
      },
    ],
  },
  {
    id: "terms",
    title: "Terms & Conditions",
    short: "Terms",
    icon: FileText,
    intro: `By browsing or placing an order on ${SITE.name}, you agree to the terms below. If you do not agree, please do not use the site.`,
    items: [
      {
        t: "Products and pricing",
        list: [
          "All prices are in Bangladeshi Taka (৳) and may change without notice.",
          "We work to keep prices, stock and specifications accurate, but mistakes can happen. If a product is listed at a wrong price, we may correct it or cancel the affected order after informing you.",
          "Product images are for illustration. Packaging or appearance may vary slightly by batch. Please rely on the model name and specifications on the product page.",
        ],
      },
      {
        t: "Orders",
        p: "An order is a request to buy until we confirm it, usually by a phone call. We may decline or cancel an order if the item is out of stock, the address cannot be served, or the details cannot be verified. If you have already paid anything, it will be refunded in full.",
      },
      {
        t: "Payment",
        p: "We currently accept Cash on Delivery. You pay when you receive the product. Where possible, please check for visible damage or a wrong item before accepting the parcel. If other payment methods are added, their terms will be shown at checkout.",
      },
      {
        t: "Delivery",
        p: "Delivery usually takes 24-48 hours, depending on your location, product availability and the courier. Delivery charges, if any, are shown at checkout. Free-delivery offers apply as announced on the website. Please give a correct address and a phone number you can answer.",
      },
      {
        t: "Warranty",
        p: "Products carry the manufacturer or brand warranty stated on the product page. Warranty does not cover damage caused by wrong installation, misuse, water or fire, unauthorized repair, electrical faults outside the rated limits, or physical damage. Please keep your invoice and the original box.",
      },
      {
        t: "Installation and safety",
        p: "Solar and battery systems involve high-current electricity. Please have them installed by a qualified technician. We are not responsible for damage caused by improper installation that was not carried out or approved by us. Our free consultation can help you choose the right capacity.",
      },
      {
        t: "Limitation of liability",
        p: "To the extent permitted by law, our liability is limited to the value of the product you purchased. We are not liable for indirect losses, such as lost income during a power outage.",
      },
      {
        t: "Intellectual property",
        p: `The ${SITE.name} name, logo, website design and content belong to us. Brand names and logos of products belong to their respective owners.`,
      },
      {
        t: "Changes and governing law",
        p: "We may update these terms from time to time. The version on the website when you place your order applies to that order. These terms are governed by the laws of Bangladesh.",
      },
    ],
  },
  {
    id: "refund",
    title: "Return & Refund Policy",
    short: "Return & Refund",
    icon: RotateCcw,
    intro: `If something is not right, tell us within ${POLICY.returnDays} days of delivery and we will help.`,
    items: [
      {
        t: "When you can return",
        list: [
          "You received the wrong item.",
          "The product was damaged in transit.",
          "The product is defective or does not work on arrival.",
          "The product is materially different from its description.",
        ],
      },
      {
        t: "Conditions",
        p: "The item should be unused (unless the problem is a fault), with its original packaging, accessories and invoice, and the serial number or sticker intact.",
      },
      {
        t: "What cannot be returned",
        list: [
          "Items you changed your mind about after they were used, connected or installed.",
          "Damage caused by misuse, wrong installation, water, fire or power surges.",
          "Products without original packaging or serial number.",
          "Cables or wire cut to a custom length.",
        ],
      },
      {
        t: "How to request",
        p: "Call or WhatsApp us with your order number, and send clear photos or a short video of the product, the packaging and the problem. We may ask a technician to check the item before approving the request.",
      },
      {
        t: "What we will do",
        p: "Where the item qualifies, we will replace it. For faults covered by the brand warranty, we will arrange repair or replacement through the brand service channel. If a replacement is not available, we will refund you.",
      },
      {
        t: "Refunds",
        p: `Approved refunds are made within ${POLICY.refundDays} working days after we receive and inspect the item. For Cash on Delivery orders, we refund by bKash, Nagad or bank transfer to the account you give us. Delivery charges are refunded only if the mistake was ours.`,
      },
      {
        t: "Return shipping",
        p: "If the return is due to our mistake (wrong, damaged or defective item), we cover the return shipping. In other approved cases, return shipping is paid by the customer.",
      },
      {
        t: "Cancelling an order",
        p: "You can cancel for free before the order is dispatched - just contact us. Repeated refusal of confirmed Cash on Delivery orders may lead us to ask for advance payment on future orders.",
      },
    ],
  },
];

const IDS = SECTIONS.map((s) => s.id);

export default function PolicyTabs() {
  const [active, setActive] = useState(IDS[0]);
  const tabRefs = useRef({});

  // URL-er #terms / #privacy / #refund onujayi tab khola (checkout-er link-o kaj korbe)
  useEffect(() => {
    const read = () => {
      const h = window.location.hash.replace("#", "");
      if (IDS.includes(h)) setActive(h);
    };
    read();
    window.addEventListener("hashchange", read);
    window.addEventListener("popstate", read);
    return () => {
      window.removeEventListener("hashchange", read);
      window.removeEventListener("popstate", read);
    };
  }, []);

  const select = (id, focus = false) => {
    setActive(id);
    window.history.replaceState(null, "", `#${id}`);
    if (focus) tabRefs.current[id]?.focus();
  };

  const onKeyDown = (e) => {
    const i = IDS.indexOf(active);
    if (e.key === "ArrowRight") {
      e.preventDefault();
      select(IDS[(i + 1) % IDS.length], true);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      select(IDS[(i - 1 + IDS.length) % IDS.length], true);
    }
  };

  return (
    <div className="max-w-[1100px] mx-auto px-4 py-4 md:py-6 pb-16">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl bg-[#002147] text-white px-6 sm:px-10 py-10 md:py-14 mb-6 text-center">
        <div className="absolute -top-24 -right-20 w-[320px] h-[320px] rounded-full bg-[#00a651]/30 blur-3xl" />
        <div className="relative">
          <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-300">
            Policy
          </span>
          <h1 className="mt-4 text-3xl md:text-5xl font-black leading-tight">
            Our Policies
          </h1>
          <p className="mt-3 text-slate-300 text-base md:text-lg">
            Clear rules, in plain language. Last updated: {POLICY.updated}.
          </p>
        </div>
      </section>

      {/* TABS */}
      <div
        role="tablist"
        aria-label="Policies"
        onKeyDown={onKeyDown}
        className="grid grid-cols-3 gap-2 md:gap-3 mb-5"
      >
        {SECTIONS.map((s) => {
          const Icon = s.icon;
          const on = active === s.id;
          return (
            <button
              key={s.id}
              ref={(el) => (tabRefs.current[s.id] = el)}
              role="tab"
              id={`tab-${s.id}`}
              aria-selected={on}
              aria-controls={`panel-${s.id}`}
              tabIndex={on ? 0 : -1}
              onClick={() => select(s.id)}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2.5 rounded-2xl border-2 px-2 sm:px-5 py-3 sm:py-4 text-center font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00a651] ${
                on
                  ? "bg-[#00a651] border-[#00a651] text-white shadow-md"
                  : "bg-white border-slate-200 text-slate-700 hover:border-[#00a651] hover:text-[#00a651]"
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="text-xs sm:text-base leading-tight">
                <span className="sm:hidden">{s.short}</span>
                <span className="hidden sm:inline">{s.title}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* PANELS: sob HTML-e thake (SEO), shudhu active-ta dekha jay */}
      {SECTIONS.map((s) => {
        const Icon = s.icon;
        return (
          <section
            key={s.id}
            id={`panel-${s.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${s.id}`}
            hidden={active !== s.id}
            className="rounded-3xl bg-white border border-slate-100 shadow-sm p-6 md:p-10"
          >
            <div className="flex items-start gap-4 pb-6 mb-6 border-b border-slate-200">
              <span className="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-2xl bg-emerald-50 text-[#00a651] flex items-center justify-center">
                <Icon className="w-6 h-6 md:w-7 md:h-7" />
              </span>
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                  {s.title}
                </h2>
                <p className="mt-1.5 text-slate-600 text-base md:text-lg">
                  {s.intro}
                </p>
              </div>
            </div>

            <ol className="space-y-7">
              {s.items.map((it, i) => (
                <li key={it.t} className="flex gap-4">
                  <span className="w-8 h-8 shrink-0 rounded-full bg-slate-100 text-slate-700 text-sm font-extrabold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-slate-900">{it.t}</h3>
                    {it.p && (
                      <p className="mt-1.5 text-slate-700 leading-relaxed">
                        {it.p}
                      </p>
                    )}
                    {it.list && (
                      <ul className="mt-2 space-y-2">
                        {it.list.map((li) => (
                          <li
                            key={li}
                            className="flex gap-2.5 text-slate-700 leading-relaxed"
                          >
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#00a651] shrink-0" />
                            <span>{li}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>
        );
      })}

      {/* Help box */}
      <div className="mt-6 rounded-3xl bg-[#002147] text-white p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div>
          <p className="text-xl font-extrabold">Kono proshno ache?</p>
          <p className="text-slate-300 text-sm mt-1">
            Ei policy-r kono ongsho bujhte na parle amader jiggesh korun.{" "}
            <Link href="/contact" className="underline hover:text-emerald-300">
              Contact page
            </Link>
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href={`tel:${SITE.phones[0].tel}`}
            className="inline-flex items-center gap-2 rounded-xl bg-white text-[#002147] hover:bg-slate-100 px-5 py-2.5 text-sm font-bold transition-colors"
          >
            <Phone className="w-4 h-4" /> Call Us
          </a>
          <a
            href={`https://wa.me/${SITE.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-[#00a651] hover:bg-emerald-600 px-5 py-2.5 text-sm font-bold transition-colors"
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
