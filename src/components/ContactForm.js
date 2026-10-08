"use client";

import { useState } from "react";
import { MessageCircle, Mail, CheckCircle2, AlertCircle } from "lucide-react";
import { normalizePhone } from "@/lib/checkout";
import { SITE } from "@/lib/site";

const TOPICS = [
  "Product enquiry",
  "Order help",
  "Warranty / Service",
  "Bulk or project quote",
  "Other",
];

const inputCls = (err) =>
  `w-full rounded-xl border-2 px-4 py-3 text-base text-slate-900 bg-white outline-none transition-colors placeholder:text-slate-400 ${
    err
      ? "border-rose-400 focus:border-rose-500"
      : "border-slate-200 focus:border-[#00a651]"
  }`;

function Field({ id, label, required, error, children }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-bold text-slate-800 mb-1.5"
      >
        {label}{" "}
        {required ? (
          <span className="text-rose-500">*</span>
        ) : (
          <span className="text-slate-400 font-medium">(optional)</span>
        )}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-sm text-rose-600 font-medium">{error}</p>
      )}
    </div>
  );
}

export default function ContactForm() {
  const [f, setF] = useState({
    name: "",
    phone: "",
    email: "",
    topic: TOPICS[0],
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState("");

  const set = (k) => (e) => {
    setF((p) => ({ ...p, [k]: e.target.value }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  function validate() {
    const e = {};
    if (f.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^01[3-9]\d{8}$/.test(normalizePhone(f.phone)))
      e.phone = "Enter a valid mobile number, for example 01712345678.";
    if (f.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim()))
      e.email = "Enter a valid email address.";
    if (f.message.trim().length < 10)
      e.message = "Please write a message of at least 10 characters.";
    if (f.message.length > 1000)
      e.message = "Message must be 1000 characters or fewer.";
    setErrors(e);
    if (Object.keys(e).length) {
      document.getElementById(`c-${Object.keys(e)[0]}`)?.focus();
      return false;
    }
    return true;
  }

  const buildText = () =>
    [
      `Hello ${SITE.name},`,
      `Topic: ${f.topic}`,
      `Name: ${f.name.trim()}`,
      `Phone: ${normalizePhone(f.phone)}`,
      f.email.trim() && `Email: ${f.email.trim()}`,
      "",
      f.message.trim(),
    ]
      .filter((x) => x !== "" && x !== false && x !== undefined)
      .join("\n");

  function viaWhatsApp(e) {
    e.preventDefault();
    if (!validate()) return;
    const url = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
      buildText()
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSent("WhatsApp");
  }

  function viaEmail() {
    if (!validate()) return;
    const subject = `${f.topic} - ${f.name.trim()}`;
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(buildText())}`;
    setSent("Email");
  }

  return (
    <form onSubmit={viaWhatsApp} noValidate className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field id="c-name" label="Full Name" required error={errors.name}>
          <input
            id="c-name"
            value={f.name}
            onChange={set("name")}
            autoComplete="name"
            placeholder="Your full name"
            className={inputCls(errors.name)}
          />
        </Field>
        <Field id="c-phone" label="Mobile Number" required error={errors.phone}>
          <input
            id="c-phone"
            value={f.phone}
            onChange={set("phone")}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="01XXXXXXXXX"
            className={inputCls(errors.phone)}
          />
        </Field>
        <Field id="c-email" label="Email" error={errors.email}>
          <input
            id="c-email"
            value={f.email}
            onChange={set("email")}
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={inputCls(errors.email)}
          />
        </Field>
        <Field id="c-topic" label="Topic" required>
          <select
            id="c-topic"
            value={f.topic}
            onChange={set("topic")}
            className={inputCls(false)}
          >
            {TOPICS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        id="c-message"
        label="Your Message"
        required
        error={errors.message}
      >
        <textarea
          id="c-message"
          value={f.message}
          onChange={set("message")}
          rows={5}
          placeholder="e.g. Which inverter and battery do I need for a 5 kW solar system?"
          className={inputCls(errors.message)}
        />
      </Field>

      <div className="flex flex-col sm:flex-row gap-3 pt-1">
        <button
          type="submit"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-[#00a651] hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-colors"
        >
          <MessageCircle className="w-5 h-5" /> Send via WhatsApp
        </button>
        <button
          type="button"
          onClick={viaEmail}
          className="flex-1 inline-flex items-center justify-center gap-2 border-2 border-slate-200 hover:border-[#00a651] hover:text-[#00a651] text-slate-700 font-bold py-3.5 rounded-xl transition-colors"
        >
          <Mail className="w-5 h-5" /> Send via Email
        </button>
      </div>

      {sent ? (
        <div
          className="flex gap-2.5 rounded-xl bg-emerald-50 border border-emerald-200 p-3.5 text-sm text-emerald-900"
          role="status"
        >
          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
          <p>
            Your message is ready in {sent}. Tap <strong>Send</strong> there to
            deliver it. If the app does not open, call us at{" "}
            <a
              className="font-bold underline"
              href={`tel:${SITE.phones[0].tel}`}
            >
              {SITE.phones[0].label}
            </a>
          </p>
        </div>
      ) : (
        <p className="flex items-start gap-2 text-xs text-slate-500">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          Your message will open ready to send in your WhatsApp or email app.
          Tap Send there to deliver it.
        </p>
      )}
    </form>
  );
}
