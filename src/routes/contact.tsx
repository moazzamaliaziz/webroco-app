import { createFileRoute } from "@tanstack/react-router";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Webroco" },
      { name: "description", content: "Get in touch with Webroco. Let's start something special together." },
      { property: "og:title", content: "Contact Us — Webroco" },
      { property: "og:description", content: "Get in touch with Webroco. Let's start something special together." },
    ],
  }),
  component: ContactPage,
});

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ContactPage() {
  return (
    <main className="bg-background text-foreground overflow-x-hidden">
      <Header />
      <PageTitle />
      <ContactSection />
      <Footer />
    </main>
  );
}

function PageTitle() {
  return (
    <section className="pt-28 md:pt-36 pb-10">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <FadeIn>
          <h1 className="display text-[clamp(3rem,10vw,10rem)] leading-[0.85]">Contact</h1>
        </FadeIn>
      </div>
    </section>
  );
}

const SOCIALS = [
  { label: "Facebook", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Dribbble", href: "#" },
  { label: "Behance", href: "#" },
];

const BUDGET_OPTIONS = [
  "5,000 - 10,000",
  "10,000 - 15,000",
  "15,000 - 20,000",
  "20,000 - 25,000",
  "25,000 - Above",
];

function ContactSection() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", company: "", budget: "", solution: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: "", email: "", phone: "", company: "", budget: "", solution: "", message: "" });
  };

  return (
    <section className="pb-24 md:pb-32">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <FadeIn className="mb-16 md:mb-24">
          <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase">Contact</span>
          <h2 className="display text-[clamp(2rem,5vw,5rem)] leading-[0.95] mt-4 max-w-4xl">
            Let&apos;s drop us a line and get the project started.
          </h2>
        </FadeIn>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24">
          {/* Left Column — Info */}
          <FadeIn delay={0.1}>
            <div className="space-y-12">
              {/* Get in Touch */}
              <div>
                <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase mb-4">Get in touch</p>
                <p className="text-lg md:text-xl leading-relaxed max-w-md">
                  We&apos;re excited to hear from you and let&apos;s start something special together.
                </p>
                <a
                  href="mailto:hello@webroco.com"
                  className="inline-block mt-4 text-lg underline underline-offset-4 hover:text-accent transition-colors"
                >
                  hello@webroco.com
                </a>
              </div>

              {/* Social Links */}
              <div>
                <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase mb-4">Follow</p>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      className="text-sm hover:text-accent transition-colors relative group"
                    >
                      {s.label}
                      <span className="absolute -bottom-px left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Address */}
              <div>
                <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase mb-4">Office</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Rawalpindi, Pakistan<br />
                  Islamabad, Pakistan<br />
                  Dubai, UAE<br />
                  Remote Worldwide
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Right Column — Form */}
          <FadeIn delay={0.2}>
            <form onSubmit={handleSubmit} className="space-y-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <InputField name="name" placeholder="Name*" value={form.name} onChange={handleChange} />
                <InputField name="email" placeholder="Email*" value={form.email} onChange={handleChange} type="email" />
                <InputField name="phone" placeholder="Phone*" value={form.phone} onChange={handleChange} type="tel" />
                <InputField name="company" placeholder="Company" value={form.company} onChange={handleChange} />
                <SelectField name="budget" value={form.budget} onChange={handleChange} options={BUDGET_OPTIONS} />
                <InputField name="solution" placeholder="Solution*" value={form.solution} onChange={handleChange} />
              </div>
              <div className="mt-0">
                <textarea
                  name="message"
                  placeholder="Message*"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-transparent border border-border px-6 py-4 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-accent transition-colors resize-none"
                />
              </div>
              <div className="mt-8">
                <button
                  type="submit"
                  className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full bg-foreground text-background text-sm font-medium overflow-hidden transition-transform hover:scale-[1.03]"
                >
                  <span className="relative z-10">{submitted ? "Sent!" : "Send Message"}</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="relative z-10 group-hover:translate-x-1 transition-transform">
                    <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
              </div>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function InputField({
  name, placeholder, value, onChange, type = "text",
}: {
  name: string; placeholder: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; type?: string;
}) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full bg-transparent border border-border px-6 py-4 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-accent transition-colors"
    />
  );
}

function SelectField({
  name, value, onChange, options,
}: {
  name: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; options: string[];
}) {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full bg-transparent border border-border px-6 py-4 text-sm text-foreground outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
    >
      <option value="" disabled>Budget*</option>
      {options.map((opt) => (
        <option key={opt} value={opt} className="bg-background text-foreground">{opt}</option>
      ))}
    </select>
  );
}
