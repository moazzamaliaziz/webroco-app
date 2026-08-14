import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Webroco" },
      { name: "description", content: "Frequently asked questions about Webroco's services, process, pricing and timelines." },
      { property: "og:title", content: "FAQ — Webroco" },
      { property: "og:description", content: "Frequently asked questions about Webroco's services, process, pricing and timelines." },
    ],
  }),
  component: FaqPage,
});

const FAQ_DATA = [
  {
    category: "General",
    items: [
      {
        q: "What does Webroco do?",
        a: "We're a full-stack web studio. We design, build and grow digital products — websites, web apps, e-commerce stores and brand identities. From a single landing page to a complex SaaS platform, we handle the entire lifecycle.",
      },
      {
        q: "Who do you work with?",
        a: "Startups, scale-ups and established businesses across Pakistan, the UAE and globally. We work best with teams who value craft and want a long-term partner, not just a vendor.",
      },
      {
        q: "How big is your team?",
        a: "We're a lean, senior-heavy team. Every person you interact with has 5+ years of hands-on experience. We keep the team small so quality stays high and communication stays direct.",
      },
    ],
  },
  {
    category: "Process",
    items: [
      {
        q: "How does a typical project work?",
        a: "We start with discovery — understanding your goals, users and constraints. Then we move to design (wireframes → high-fidelity), development (iterative sprints with weekly demos) and launch. Post-launch we offer support and growth retainers.",
      },
      {
        q: "How long does a project take?",
        a: "A landing page or small site: 2–4 weeks. A full web app or e-commerce build: 6–12 weeks. We'll give you a clear timeline after discovery. We never promise what we can't deliver.",
      },
      {
        q: "Do you work with international clients?",
        a: "Yes. We've worked with clients across the US, Europe and the Middle East. We're comfortable with async communication, timezone overlap calls and distributed workflows.",
      },
    ],
  },
  {
    category: "Pricing",
    items: [
      {
        q: "How do you price projects?",
        a: "We price based on scope and complexity, not hours. After discovery, we provide a fixed-price quote with clear deliverables. For ongoing work, we offer monthly retainers.",
      },
      {
        q: "What's your minimum project size?",
        a: "Our minimum engagement is $5,000. This ensures we can allocate senior talent and give your project the attention it deserves. For smaller needs, we can recommend trusted freelancers.",
      },
      {
        q: "Do you offer payment plans?",
        a: "Yes. We typically split payments into milestones — 40% upfront, 30% at design approval, 30% at launch. For retainer clients, we bill monthly in advance.",
      },
    ],
  },
  {
    category: "Technical",
    items: [
      {
        q: "What technologies do you use?",
        a: "React, Next.js, TanStack Start, Node.js, TypeScript, Tailwind CSS, Framer Motion and more. We choose the stack based on your needs, not our preferences. We always pick the right tool for the job.",
      },
      {
        q: "Do you handle SEO and performance?",
        a: "Absolutely. Technical SEO (Core Web Vitals, structured data, sitemaps) is baked into every project. We don't treat it as an afterthought — it's part of the build from day one.",
      },
      {
        q: "Can you work with our existing codebase?",
        a: "Yes. We do audits, refactors and feature additions on existing projects. We'll assess your codebase first and give you an honest opinion on the best path forward.",
      },
    ],
  },
];

const CATEGORIES = ["All", ...FAQ_DATA.map((c) => c.category)];

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
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

function FaqPage() {
  return (
    <main className="bg-background text-foreground overflow-x-hidden">
      <Header />
      <PageTitle />
      <FaqSection />
      <CtaSection />
      <Footer />
    </main>
  );
}

function PageTitle() {
  return (
    <section className="pt-28 md:pt-36 pb-10">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <FadeIn>
          <h1 className="display text-[clamp(3rem,10vw,10rem)] leading-[0.85]">Questions</h1>
        </FadeIn>
      </div>
    </section>
  );
}

function FaqSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const filteredFaqs = activeCategory === "All"
    ? FAQ_DATA
    : FAQ_DATA.filter((c) => c.category === activeCategory);

  const toggle = (key: string) => {
    setOpenIndex((prev) => (prev === key ? null : key));
  };

  return (
    <section className="pb-16 md:pb-24">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <FadeIn className="mb-12 md:mb-16">
          <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase">FAQ</span>
          <h2 className="display text-[clamp(2rem,5vw,5rem)] leading-[0.95] mt-4 max-w-4xl">
            Learn some common answers about our projects
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-10 lg:gap-16">
          {/* Left — Category Filter */}
          <FadeIn delay={0.1}>
            <div className="lg:sticky lg:top-28 self-start">
              <div className="flex flex-row flex-wrap lg:flex-col gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
                    className={`text-left px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                      activeCategory === cat
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Right — Accordion */}
          <div>
            {filteredFaqs.map((group) => (
              <div key={group.category} className="mb-8 last:mb-0">
                {activeCategory === "All" && (
                  <FadeIn>
                    <h3 className="text-xs tracking-[0.2em] text-accent uppercase mb-4">{group.category}</h3>
                  </FadeIn>
                )}
                <div className="border-t border-border/50">
                  {group.items.map((item, i) => {
                    const key = `${group.category}-${i}`;
                    const isOpen = openIndex === key;
                    return (
                      <FadeIn key={key} delay={i * 0.04}>
                        <div className="border-b border-border/50">
                          <button
                            onClick={() => toggle(key)}
                            className="w-full flex items-center justify-between gap-4 py-5 md:py-6 text-left group"
                          >
                            <span className={`text-base md:text-lg transition-colors duration-300 ${isOpen ? "text-accent" : "text-foreground group-hover:text-accent"}`}>
                              {item.q}
                            </span>
                            <motion.span
                              animate={{ rotate: isOpen ? 45 : 0 }}
                              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                              className="shrink-0 text-2xl text-muted-foreground"
                            >
                              +
                            </motion.span>
                          </button>
                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                className="overflow-hidden"
                              >
                                <p className="pb-6 text-muted-foreground leading-relaxed max-w-3xl">
                                  {item.a}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </FadeIn>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="py-24 md:py-32 border-t border-border/50">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 text-center">
        <FadeIn>
          <h2 className="display text-[clamp(2rem,6vw,6rem)] leading-[0.9]">
            Still have questions?
          </h2>
          <p className="mt-6 text-muted-foreground text-lg max-w-md mx-auto">
            We&apos;d love to hear from you. Reach out and we&apos;ll get back within 24 hours.
          </p>
          <div className="mt-10">
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full bg-foreground text-background text-sm font-medium overflow-hidden transition-transform hover:scale-[1.03]"
            >
              <span className="relative z-10">Get in Touch</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="relative z-10 group-hover:translate-x-1 transition-transform">
                <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
