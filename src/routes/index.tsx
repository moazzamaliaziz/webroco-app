import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ExpandingPanels } from "../components/ExpandingPanels";
import { Preloader } from "../components/preloader";
import heroImg from "../assets/hero-webroco.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Webroco — We Build the Web. You Own the Results." },
      { name: "description", content: "Full-stack web development, SEO and UI/UX design that drives growth, performance and real results." },
      { property: "og:title", content: "Webroco — Senior-Level Web Studio" },
      { property: "og:description", content: "Full-stack web development, SEO and UI/UX design that drives growth, performance and real results." },
    ],
  }),
  component: Index,
});

function Index() {
  const [loaded, setLoaded] = useState(false);
  const handleComplete = useCallback(() => setLoaded(true), []);

  return (
    <div id="app" className="min-h-screen bg-background text-foreground font-['Plus_Jakarta_Sans',sans-serif] overflow-x-clip antialiased transition-[background] duration-700">
      <BackgroundMorph />
      <Preloader onComplete={handleComplete} />
      {loaded && (
        <>
          <Header />
          <Hero />
          <ImageDistortion />
          <PartnerMarquee />
          <About />
          <Work />
          <ServicesIntro />
          <ExpandingPanels />
          <CtaGuide />
          <Testimonials />
          <Marquee />
          <Awards />
          <Team />
          <BigMarquee />
          <Footer />
        </>
      )}
    </div>
  );
}

/* -------------------------------- BACK TO TOP ------------------------------- */

/* ----------------------------- BACKGROUND MORPH ----------------------------- */

function BackgroundMorph() {
  useEffect(() => {
    const app = document.getElementById("app");
    if (!app) return;

    const lightSections = document.querySelectorAll('[data-bg="light"]');
    const darkSections = document.querySelectorAll('[data-bg="dark"]');

    const lightObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            app.style.background = "#f5f0e8";
            app.style.color = "#111111";
          } else {
            const anyLight = [...lightSections].some((s) => (s as HTMLElement).dataset.visible === "true");
            if (!anyLight) {
              app.style.background = "";
              app.style.color = "";
            }
          }
          (e.target as HTMLElement).dataset.visible = e.isIntersecting ? "true" : "false";
        });
      },
      { threshold: 0.3 }
    );

    const darkObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            app.style.background = "";
            app.style.color = "";
          }
        });
      },
      { threshold: 0.3 }
    );

    lightSections.forEach((s) => lightObs.observe(s));
    darkSections.forEach((s) => darkObs.observe(s));

    return () => {
      lightObs.disconnect();
      darkObs.disconnect();
    };
  }, []);

  return null;
}

/* -------------------------------- REVEAL WORDS -------------------------------- */

function RevealWords({
  text,
  className = "",
  baseDelay = 0,
  once = true,
  animateOnMount = false,
}: {
  text: string;
  className?: string;
  baseDelay?: number;
  once?: boolean;
  animateOnMount?: boolean;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            {...(animateOnMount
              ? { animate: { y: "0%" } }
              : { whileInView: { y: "0%" }, viewport: { once, margin: "0px 0px -10% 0px" } })}
            transition={{
              delay: baseDelay + i * 0.08,
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* -------------------------------- REVEAL CHARS -------------------------------- */

function RevealChars({ text, baseDelay = 0 }: { text: string; baseDelay?: number }) {
  const chars = text.split("");
  return (
    <span>
      {chars.map((ch, i) => (
        <span key={i} className="inline-block overflow-hidden" style={{ perspective: "200px" }}>
          <motion.span
            className="inline-block"
            initial={{ y: "120%", rotateX: -80, opacity: 0, filter: "blur(8px)" }}
            animate={{ y: "0%", rotateX: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{
              delay: baseDelay + i * 0.035,
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* -------------------------------- HERO (exact heynesh.com match) -------------------------------- */

const HERO_NAV = [
  { label: "Home", to: "/", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { label: "About", to: "/about", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
  { label: "Services", to: "/service", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  { label: "Portfolio", to: "/portfolio", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
  { label: "Blog", to: "/blog", icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" },
  { label: "Contact", to: "/contact", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
];

function Hero() {
  const [emailCopied, setEmailCopied] = useState(false);
  const copyEmail = () => {
    navigator.clipboard.writeText("hello@webroco.xyz");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <section id="hero" className="relative h-[300vh]">
      {/* Sticky container — pinned for 3x viewport scroll */}
      <div className="hero-sticky sticky top-0 h-screen flex flex-col justify-end overflow-hidden">

        {/* ─── CENTER IMAGE (like heynesh person photo) ─── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
        >
          <div className="w-[65%] h-[75%] mt-8 rounded-2xl overflow-hidden">
            <img src={heroImg} alt="Webroco" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        {/* ─── WEBROCO Logo + Socials (like NESH® top bar) ─── */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-5 md:px-10 py-5 md:py-7"
        >
          <a href="/" className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold uppercase tracking-[-0.03em] text-xl md:text-2xl">
            webroco<span className="text-accent">.</span>
          </a>
          <div className="flex items-center gap-4 md:gap-6">
            {["LinkedIn", "Instagram", "GitHub"].map((s) => (
              <a key={s} href="#" target="_blank" rel="noopener noreferrer" className="text-[10px] tracking-[0.2em] text-foreground/35 uppercase hover:text-accent transition-colors duration-300 relative group">
                {s}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* ─── Left Sidebar Nav (heynesh-style) ─── */}
        <motion.nav
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-0.5"
        >
          <div className="absolute inset-0 -inset-x-3 -inset-y-2 bg-foreground/[0.03] backdrop-blur-sm rounded-2xl border border-foreground/[0.06]" />
          {HERO_NAV.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.to}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5 + i * 0.07, duration: 0.5 }}
              className="group relative flex items-center gap-3 px-4 py-2.5 rounded-xl overflow-hidden z-10"
            >
              <span className="absolute inset-0 bg-foreground/[0.06] rounded-xl scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300" />
              <svg className="w-3.5 h-3.5 text-foreground/35 group-hover:text-accent transition-colors duration-300 relative z-10 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              <span className="relative overflow-hidden h-[16px] w-[72px] z-10">
                <span className="block text-[10px] tracking-[0.15em] text-foreground/45 uppercase transition-all duration-300 group-hover:-translate-y-full group-hover:opacity-0">{item.label}</span>
                <span className="block absolute top-full left-0 text-[10px] tracking-[0.15em] text-accent uppercase transition-all duration-300 group-hover:top-0">{item.label}</span>
              </span>
            </motion.a>
          ))}
        </motion.nav>

        {/* ─── Bottom Content (anchored to bottom, overlapping image — like heynesh) ─── */}
        <div className="relative z-20 w-full px-5 md:px-10 pb-8 md:pb-12">
          <div className="max-w-[1400px] mx-auto flex items-end justify-between gap-6">
            
            {/* Left: small text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="hidden md:block max-w-[170px] shrink-0"
            >
              <p className="text-[10px] tracking-[0.2em] text-foreground/35 uppercase leading-[1.9]">
                Senior-Level<br />Web Studio.<br />
                <span className="text-foreground/60">That&apos;s Webroco.</span>
              </p>
            </motion.div>

            {/* Center: Headline + CTAs */}
            <div className="flex-1 flex flex-col items-center text-center max-w-2xl mx-auto">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold uppercase tracking-[-0.04em] leading-[0.88] text-[10vw] md:text-[5.5vw] lg:text-[4vw]"
              >
                We Build the Web,<br />
                <span className="text-foreground/30">You Own the Results.</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="mt-7 flex flex-wrap items-center justify-center gap-3"
              >
                <a href="mailto:hello@webroco.xyz" className="group relative inline-flex items-center gap-2 h-11 px-7 rounded-full bg-foreground text-background text-sm font-medium overflow-hidden transition-transform hover:scale-[1.03]">
                  <span className="relative z-10">Let&apos;s Talk</span>
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="relative z-10 group-hover:translate-x-0.5 transition-transform"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <span className="absolute inset-0 bg-accent translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300" />
                </a>
                <a href="/about" className="inline-flex items-center h-11 px-6 rounded-full border border-foreground/15 text-sm font-medium text-foreground/55 hover:text-foreground hover:border-foreground/40 transition-all duration-300">
                  About Us
                </a>
              </motion.div>
            </div>

            {/* Right: description + email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="hidden lg:block max-w-[230px] shrink-0 text-right"
            >
              <p className="text-[12px] leading-[1.7] text-foreground/45">
                Full-stack web development, SEO & UI/UX design that drive growth, performance, and real results.
              </p>
              <button onClick={copyEmail} className="mt-3 text-[10px] tracking-[0.15em] text-foreground/35 uppercase hover:text-accent transition-colors cursor-pointer">
                {emailCopied ? "Copied!" : "hello@webroco.xyz"}
              </button>
            </motion.div>
          </div>
        </div>

        {/* ─── Fixed Stats Cards (position:fixed — stays while content scrolls) ─── */}
        <div className="fixed top-1/2 right-[8%] -translate-y-1/2 z-20 pointer-events-none hidden lg:flex flex-col gap-3">
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="bg-foreground/[0.05] backdrop-blur-md border border-foreground/[0.08] rounded-xl p-5 min-w-[160px]"
          >
            <div className="flex items-end gap-6">
              <div>
                <div className="text-3xl font-extrabold tracking-tight">11+</div>
                <div className="text-[9px] tracking-[0.2em] text-foreground/35 uppercase mt-0.5">Projects</div>
              </div>
              <div>
                <div className="text-xl font-extrabold tracking-tight">1+</div>
                <div className="text-[9px] tracking-[0.2em] text-foreground/35 uppercase mt-0.5">Year</div>
              </div>
            </div>
          </motion.div>
          {/* Traits */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="bg-foreground/[0.05] backdrop-blur-md border border-foreground/[0.08] rounded-xl p-4 min-w-[110px]"
          >
            <div className="flex flex-col gap-1.5">
              {["Creative", "Reliable", "Strategist", "Builder", "Efficient"].map((t, i) => (
                <motion.span key={t} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.4 + i * 0.06, duration: 0.4 }} className="text-[10px] tracking-[0.15em] text-foreground/40 uppercase">{t}</motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ─── Custom Scroll Indicator (animated) ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
        >
          <span className="text-[9px] tracking-[0.35em] text-foreground/25 uppercase">Scroll</span>
          <motion.div
            className="w-px h-10 relative overflow-hidden"
          >
            <motion.span
              className="absolute top-0 left-0 w-full bg-foreground/30"
              animate={{ height: ["0%", "100%", "0%"], y: ["0%", "0%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ display: "block", width: "100%" }}
            />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

/* ---------------------------- IMAGE DISTORTION --------------------------- */

function ImageDistortion() {
  return (
    <section className="relative h-[420px] overflow-hidden" style={{ background: "linear-gradient(180deg, #0a0a0a 0%, #1a1008 100%)" }}>
      <div className="distort-lines">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="distort-col"
            style={{
              animationDelay: `${i * 0.07}s`,
              opacity: 0.3 + Math.random() * 0.5,
            }}
          />
        ))}
      </div>
      <div className="absolute top-5 right-10 text-[11px] tracking-[2px] text-white/40 uppercase">Selected Works</div>
    </section>
  );
}

/* ---------------------------- PARTNER MARQUEE ---------------------------- */

const PARTNERS = ["dokey.", "SendGrid", "pingdom", "miro", "webflow", "Voiceflow", "monday", "Notion", "Slack", "Figma"];

function PartnerMarquee() {
  const row = [...PARTNERS, ...PARTNERS];
  return (
    <section className="relative py-16 md:py-20 border-t border-white/5 overflow-hidden">
      <p className="text-center text-sm md:text-base text-foreground/65 mb-10 md:mb-14">
        Help to brands growing up and show their<br />success stories to the world
      </p>
      <div className="relative">
        <motion.div
          className="flex gap-5 md:gap-8 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity }}
        >
          {row.map((l, i) => (
            <span
              key={i}
              className="shrink-0 px-8 md:px-12 h-16 md:h-20 rounded-full border border-white/15 flex items-center justify-center text-lg md:text-xl text-foreground/55 font-medium hover:text-foreground hover:border-foreground/40 transition-colors"
            >
              {l}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ----------------------------- ABOUT SECTION ----------------------------- */

function RevealTextScrub({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const wordEls = el.querySelectorAll(".reveal-word");

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            wordEls.forEach((w, i) => {
              setTimeout(() => {
                (w as HTMLElement).style.color = "rgba(0,0,0,0.85)";
              }, i * 40);
            });
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i} className="reveal-word inline transition-colors duration-100" style={{ color: "rgba(0,0,0,0.25)" }}>
          {w}{" "}
        </span>
      ))}
    </div>
  );
}

function About() {
  const milestones = [
    {
      year: "'17",
      title: "Founded in Pakistan",
      desc: "Webroco was born out of a passion for building exceptional digital experiences. Starting as a small team with big ambitions, we set out to help brands transform their online presence with clean code and bold design.",
      tag: "@webroco",
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    },
    {
      year: "'19",
      title: "First Major Client",
      desc: "Landing our first enterprise client was a turning point. We delivered a full-stack e-commerce platform that doubled their online revenue within six months, proving our senior-level execution could compete with any agency.",
      tag: "@ecommerce",
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    },
    {
      year: "'21",
      title: "Expanding Services",
      desc: "We broadened our expertise into SEO strategy and UI/UX design, offering clients a complete digital solution. This expansion allowed us to take on more complex projects and deliver measurable growth across every channel.",
      tag: "@seo",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    },
    {
      year: "'23",
      title: "Global Reach",
      desc: "Our reputation crossed borders. We began working with international clients from the US, UK, and UAE, bringing the same dedicated approach and senior-level craftsmanship to every project regardless of time zone.",
      tag: "@global",
      img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    },
    {
      year: "'25",
      title: "Present Day",
      desc: "With 11+ projects delivered and a growing roster of satisfied clients, Webroco continues to push boundaries. We are a senior-level team that treats every project like our own — building, optimizing, and launching with precision.",
      tag: "@webroco",
      img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section data-bg="light" className="relative px-5 md:px-10 py-28 md:py-40 border-t border-black/5">
      <div className="max-w-[1500px] mx-auto">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2.5 mb-8 md:mb-10"
        >
          <span className="w-8 h-[2px] bg-[#6d5dfc] shrink-0" />
          <span className="text-[11px] tracking-[0.14em] uppercase text-black/40">About Us</span>
        </motion.div>

        {/* Heading */}
        <h2 className="font-['Instrument_Sans',sans-serif] font-normal text-[8vw] md:text-[4.5vw] leading-[1.04] tracking-[-0.02em] max-w-5xl mb-16 md:mb-24">
          <RevealWords text="Our Journey (&) What We Do" />
        </h2>

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-base md:text-lg leading-relaxed text-black/60 max-w-2xl mb-20 md:mb-28"
        >
          Founded in 2017 in Pakistan, Webroco is a full-stack web development agency that delivers senior-level execution across development, SEO, and UI/UX design. We help brands build digital experiences that perform.
        </motion.p>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical SVG line */}
          <div className="absolute left-[20px] md:left-[32px] top-0 bottom-0 w-px bg-black/10" />

          <div className="space-y-16 md:space-y-24">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.8, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-12 md:pl-20 grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-8 md:gap-14 items-start"
              >
                {/* Year dot */}
                <div className="absolute left-0 md:left-[16px] top-1.5 w-[10px] h-[10px] rounded-full bg-[#6d5dfc] ring-4 ring-[#6d5dfc]/20" />

                {/* Left: Year + Title */}
                <div>
                  <span className="font-['Instrument_Sans',sans-serif] text-[4rem] md:text-[5.5rem] leading-none font-bold tracking-[-0.04em] text-black/[0.06]">
                    {m.year}
                  </span>
                  <h3 className="font-['Instrument_Sans',sans-serif] text-2xl md:text-3xl font-semibold tracking-tight mt-2 text-black/90">
                    {m.title}
                  </h3>
                  <span className="inline-block mt-3 text-xs tracking-wider uppercase text-[#6d5dfc]/70 font-medium">
                    {m.tag}
                  </span>
                </div>

                {/* Right: Description + Image */}
                <div className="space-y-5">
                  <p className="text-base md:text-lg leading-relaxed text-black/60">
                    {m.desc}
                  </p>
                  <div className="overflow-hidden rounded-xl aspect-[16/10] bg-black/5">
                    <img
                      src={m.img}
                      alt={m.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.04]"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- WORK SECTION ----------------------------- */

const WORK = [
  { title: "E-Commerce Platform", year: "2025", cat: "Development", img: "https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?auto=format&fit=crop&w=1200&q=80", ratio: "aspect-[4/3]" },
  { title: "SaaS Dashboard", year: "2025", cat: "Design", img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80", ratio: "aspect-[4/3]" },
  { title: "AI Landing Page", year: "2025", cat: "Development", img: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=1200&q=80", ratio: "aspect-[4/5]" },
  { title: "Corporate Rebrand", year: "2025", cat: "Design", img: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80", ratio: "aspect-[4/3]" },
  { title: "SEO Campaign", year: "2025", cat: "SEO", img: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=1200&q=80", ratio: "aspect-[4/3]" },
  { title: "Mobile App UI", year: "2025", cat: "Design", img: "https://images.unsplash.com/photo-1592434134753-a70baf7979d5?auto=format&fit=crop&w=1200&q=80", ratio: "aspect-[4/3]" },
  { title: "Marketing Site", year: "2025", cat: "Development", img: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1200&q=80", ratio: "aspect-[4/3]" },
  { title: "Brand Identity", year: "2025", cat: "Design", img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80", ratio: "aspect-[4/3]" },
];

function Work() {
  return (
    <section data-bg="dark" className="relative px-5 md:px-10 py-28 md:py-36 border-t border-white/5">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="max-w-[1600px] mx-auto h-full grid grid-cols-4 md:grid-cols-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="border-l border-dashed border-[var(--hero-line)] h-full" />
          ))}
        </div>
      </div>

      <div className="relative max-w-[1500px] mx-auto">
        {/* Header row */}
        <div className="flex items-end justify-between mb-16 md:mb-24">
          <span className="text-xs sm:text-sm md:text-base uppercase tracking-[0.2em] text-foreground/60 font-medium">Selected</span>
          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold uppercase tracking-[-0.04em] text-[12vw] md:text-[6vw] leading-none">
            <RevealWords text="Work" />
          </h2>
          <a href="/portfolio" className="text-xs sm:text-sm md:text-base uppercase tracking-[0.2em] text-foreground/60 font-medium hover:text-foreground transition-colors duration-300">
            Browse More <span className="text-foreground/40">(08)</span>
          </a>
        </div>

        {/* Staggered 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 lg:gap-x-10 gap-y-12">
          {[0, 1, 2].map((col) => (
            <div
              key={col}
              className={`flex flex-col gap-16 md:gap-24 ${
                col === 0 ? "md:pt-40" : col === 1 ? "md:pt-0" : "md:pt-24"
              }`}
            >
              {WORK.filter((_, i) => i % 3 === col).map((w, i) => (
                <WorkCard key={w.title} w={w} index={col + i} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkCard({ w, index }: { w: typeof WORK[number]; index: number }) {
  return (
    <motion.a
      href="#"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{
        duration: 0.9,
        delay: (index % 3) * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group block cursor-pointer"
    >
      <div className={`relative overflow-hidden rounded-2xl ${w.ratio} bg-white/5`}>
        {/* Image */}
        <img
          src={w.img}
          alt={w.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
        />

        {/* Gradient overlay — always present but subtle, intensifies on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-40 group-hover:opacity-80 transition-opacity duration-500" />

        {/* Bottom content — title + category, slides up on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
          <span className="inline-block px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white text-[11px] font-medium uppercase tracking-wider mb-2.5">
            {w.cat}
          </span>
          <h3 className="text-white text-lg md:text-xl font-semibold tracking-tight leading-tight">
            {w.title}
          </h3>
          <p className="text-white/60 text-sm mt-1">{w.year}</p>
        </div>
      </div>

      {/* Below-card info — always visible */}
      <h3 className="mt-4 text-lg md:text-xl font-semibold tracking-tight group-hover:text-foreground/90 transition-colors duration-300">
        {w.title}
      </h3>
      <div className="mt-1 text-sm text-foreground/50">{w.cat}</div>
    </motion.a>
  );
}

function ServicesIntro() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const capabilities = [
    {
      num: "01",
      title: "Web Development",
      description: "Full-stack React, Next.js, and TanStack Start applications built for scale and speed.",
      icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
    },
    {
      num: "02",
      title: "UI/UX Design",
      description: "User-centered design systems and interfaces that feel intuitive and look premium.",
      icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",
    },
    {
      num: "03",
      title: "SEO & Growth",
      description: "Technical SEO, Core Web Vitals optimization, and content strategy that drives organic traffic.",
      icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
    },
    {
      num: "04",
      title: "Brand Identity",
      description: "Logo systems, visual guidelines, and brand strategy that make you memorable.",
      icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
    },
    {
      num: "05",
      title: "E-Commerce",
      description: "Shopify builds, custom stores, and payment integrations that convert browsers into buyers.",
      icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z",
    },
    {
      num: "06",
      title: "Performance",
      description: "Speed optimization, monitoring, and analytics that keep your site lightning fast.",
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
    },
  ];

  return (
    <section ref={sectionRef} className="relative px-5 md:px-10 py-24 md:py-32 border-t border-white/5">
      {/* Background grid lines */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="max-w-[1600px] mx-auto h-full grid grid-cols-4 md:grid-cols-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="border-l border-dashed border-[var(--hero-line)] h-full" />
          ))}
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto relative">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-8 h-[2px] bg-[var(--primary)]" />
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--muted-foreground)]">
            What We Offer
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-['Plus_Jakarta_Sans',sans-serif] font-normal text-[7.5vw] md:text-[4vw] leading-[1.05] tracking-[-0.02em] max-w-5xl mb-8 md:mb-12"
        >
          <RevealWords text="Our Capabilities" />
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-foreground/55 text-base md:text-lg leading-relaxed max-w-2xl mb-16 md:mb-24"
        >
          From pixel-perfect design to production-grade code, we deliver end-to-end digital
          solutions that drive real business results. Every service is backed by senior-level
          expertise and a relentless focus on quality.
        </motion.p>

        {/* Capabilities List */}
        <div className="space-y-0">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.num}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
              className="group border-t border-white/10 last:border-b"
            >
              <div className="flex items-start gap-6 md:gap-10 py-8 md:py-12 px-4 md:px-8 -mx-4 md:-mx-8 rounded-2xl hover:bg-white/[0.02] transition-colors duration-500 cursor-default">
                {/* Number */}
                <span className="text-[var(--primary)] font-['Sequel_Sans_Roman_Body','Instrument_Sans',sans-serif] text-3xl md:text-5xl font-light tracking-[-0.03em] shrink-0 w-20 md:w-28">
                  {cap.num}
                </span>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-xl md:text-3xl font-medium tracking-[-0.02em] mb-3 group-hover:text-[var(--primary)] transition-colors duration-300">
                    {cap.title}
                  </h3>
                  <p className="text-foreground/45 text-sm md:text-base leading-relaxed max-w-xl">
                    {cap.description}
                  </p>
                </div>

                {/* Arrow */}
                <div className="shrink-0 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-5 h-5 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ----------------------------- CTA GUIDE -------------------------------- */

function CtaGuide() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-40, 80]);

  return (
    <section ref={ref} className="relative px-5 md:px-10 pb-32 md:pb-48 overflow-hidden">
      <div className="max-w-[1500px] mx-auto relative">
        <motion.div
          style={{ y: y1 }}
          className="hidden md:block absolute left-[42%] top-0 w-[18%] aspect-[4/3] rounded-[12px] overflow-hidden shadow-[0_20px_50px_-20px_rgba(0,0,0,0.3)]"
        >
          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="" className="w-full h-full object-cover" />
        </motion.div>
        <motion.div
          style={{ y: y2 }}
          className="hidden md:block absolute right-[6%] top-20 w-[22%] aspect-[5/4] rounded-[12px] overflow-hidden shadow-[0_20px_50px_-20px_rgba(0,0,0,0.3)]"
        >
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80" alt="" className="w-full h-full object-cover" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-start pt-10 md:pt-20">
          <div className="max-w-md space-y-6 text-foreground/65 text-base md:text-lg leading-relaxed">
            <p>A practical guide explaining how and why Webroco should be part of every project to ensure high quality and seamless user experience.</p>
            <p>Continue scrolling to see our process, or click below to explore our services.</p>
            <a href="/services" className="inline-flex items-center h-12 px-7 rounded-full border border-foreground/20 text-foreground text-sm font-medium hover:bg-foreground hover:text-background transition-colors">
              View All Services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const TESTIMONIALS = [
  {
    quote: "Webroco transformed our online presence. Strategy, craft and care from kick-off to launch — the results speak for themselves.",
    name: "Jonathan Reed",
    role: "CEO",
    company: "Northwind",
    companyUrl: "#",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
  },
  {
    quote: "A rare team that pairs taste with execution. Every shipped pixel felt considered and perfectly aligned with our brand.",
    name: "Amelia Chen",
    role: "Head of Design",
    company: "Lumen",
    companyUrl: "#",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
  },
  {
    quote: "Senior-level partners — not vendors. They challenged our assumptions, then delivered beyond the brief.",
    name: "Marcus Hollis",
    role: "Founder",
    company: "Northshore",
    companyUrl: "#",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
  },
  {
    quote: "The attention to detail and strategic thinking elevated our entire digital experience. Highly recommend.",
    name: "Sarah Kim",
    role: "CTO",
    company: "Elevate",
    companyUrl: "#",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
  },
];

function Testimonials() {
  return (
    <section data-bg="light" className="relative px-5 md:px-10 py-24 md:py-32 border-t border-white/5">
      <div className="max-w-[1500px] mx-auto">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="text-sm tracking-[0.2em] uppercase text-foreground/50 font-medium">Testimonials</span>
          <div className="w-12 h-px bg-foreground/20" />
        </motion.div>

        {/* Heading */}
        <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-normal text-[7.5vw] md:text-[4vw] leading-[1.05] tracking-[-0.02em] max-w-5xl mb-16 md:mb-24">
          <RevealWords text="What Our Clients Say" />
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{
                duration: 0.8,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative rounded-2xl p-8 md:p-10 border border-foreground/10 bg-foreground/[0.02] hover:bg-foreground/[0.05] transition-colors duration-500"
            >
              {/* Quote mark */}
              <div className="text-5xl md:text-6xl leading-none text-foreground/10 font-serif mb-4 select-none">&ldquo;</div>

              {/* Quote text */}
              <blockquote className="text-lg md:text-xl leading-relaxed text-foreground/80 mb-8 font-light">
                {t.quote}
              </blockquote>

              {/* Client info */}
              <div className="flex items-center gap-4">
                <img
                  src={t.photo}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-foreground/10"
                  loading="lazy"
                />
                <div>
                  <div className="text-sm font-semibold text-foreground">{t.name}</div>
                  <div className="text-xs text-foreground/50">
                    {t.role},{" "}
                    <a
                      href={t.companyUrl}
                      className="underline decoration-foreground/30 underline-offset-2 hover:text-foreground hover:decoration-foreground/60 transition-colors"
                    >
                      {t.company}
                    </a>
                  </div>
                </div>
              </div>

              {/* Subtle corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-2xl pointer-events-none">
                <div className="absolute top-0 right-0 w-px h-8 bg-gradient-to-b from-foreground/15 to-transparent" />
                <div className="absolute top-0 right-0 w-8 h-px bg-gradient-to-l from-foreground/15 to-transparent" />
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- MARQUEE ------------------------------- */

const LOGOS = ["React", "Next.js", "TypeScript", "Node.js", "Tailwind", "Figma", "Vercel", "Stripe", "PostgreSQL", "AWS"];

function Marquee() {
  const row = [...LOGOS, ...LOGOS];
  return (
    <section className="relative py-20 md:py-28 border-t border-white/5 overflow-hidden">
      <p className="text-center text-sm md:text-base text-foreground/65 mb-10 md:mb-14">
        Technologies we use to build<br />exceptional digital experiences
      </p>
      <div className="relative group/marquee">
        <motion.div
          className="flex gap-5 md:gap-8 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, ease: "linear", repeat: Infinity }}
          style={{ animationPlayState: "running" }}
          onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
          onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}
        >
          {row.map((l, i) => (
            <span
              key={i}
              className="shrink-0 px-8 md:px-12 h-16 md:h-20 rounded-full border border-white/15 flex items-center justify-center text-lg md:text-xl text-foreground/55 font-medium hover:text-foreground hover:border-foreground/40 transition-colors"
            >
              {l}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------- AWARDS -------------------------------- */

const AWARDS = [];

function Awards() {
  return (
    <section data-bg="dark" className="relative px-5 md:px-10 py-28 md:py-40 border-t border-white/5">
      <div className="max-w-[1500px] mx-auto text-center">
        <div className="w-12 h-[2px] bg-accent/50 mx-auto mb-10" />
        <h2 className="font-['Instrument_Sans',sans-serif] text-[7vw] md:text-[3.8vw] leading-[1.1] tracking-[-0.02em] max-w-3xl mx-auto mb-8">
          <RevealWords text="We believe in quality, not quantity, that's why we deliver exceptional results." />
        </h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-foreground/50 text-lg md:text-xl max-w-xl mx-auto leading-relaxed"
        >
          Every project we deliver is an award-winning experience.
        </motion.p>
        <div className="w-12 h-[2px] bg-accent/50 mx-auto mt-10" />
      </div>
    </section>
  );
}

/* -------------------------------- TEAM ---------------------------------- */

const TEAM = [
  { name: "Moazzam Ali", role: "Founder & Lead Developer", gradient: "from-accent/30 to-accent/5" },
  { name: "Sarah Chen", role: "Lead Designer", gradient: "from-blue-500/30 to-blue-500/5" },
  { name: "Alex Rivera", role: "SEO Specialist", gradient: "from-emerald-500/30 to-emerald-500/5" },
  { name: "Jordan Park", role: "Project Manager", gradient: "from-purple-500/30 to-purple-500/5" },
];

function Team() {
  return (
    <section data-bg="dark" className="relative px-5 md:px-10 py-24 md:py-32 border-t border-white/5">
      <div className="max-w-[1500px] mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 mb-16 md:mb-24 items-end">
          <p className="text-foreground/65 text-base md:text-lg max-w-sm leading-relaxed">
            A skilled and talented team behind the creativity and your amazing digital craft.
          </p>
          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-normal text-[8vw] md:text-[3.6vw] leading-[1.05] tracking-[-0.02em]">
            <RevealWords text="Meet the talented squad behind the creativity" />
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7">
          {TEAM.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.9, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group cursor-default"
            >
              <div className={"overflow-hidden rounded-[12px] aspect-[3/4] bg-gradient-to-b " + m.gradient + " transition-all duration-500 ease-out group-hover:shadow-[0_8px_40px_-12px_rgba(255,255,255,0.08)] group-hover:scale-[1.02]"}>
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-foreground/20 text-5xl md:text-6xl font-['Instrument_Sans',sans-serif] font-bold select-none">
                    {m.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </div>
              <h3 className="mt-5 text-xl md:text-2xl font-semibold tracking-tight group-hover:text-accent transition-colors duration-300">{m.name}</h3>
              <p className="text-sm text-foreground/55 mt-1">{m.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ BIG MARQUEE ----------------------------- */

function BigMarquee() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden border-t border-white/5">
      <motion.div
        className="flex gap-12 w-max whitespace-nowrap"
        animate={{ x: ["-50%", "0%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold uppercase tracking-[-0.04em] text-[14vw] leading-none text-foreground/15"
          >
            Let&apos;s Work Together —
          </span>
        ))}
      </motion.div>
    </section>
  );
}

/* -------------------------------- FOOTER -------------------------------- */

// Footer replaced by shared Footer component